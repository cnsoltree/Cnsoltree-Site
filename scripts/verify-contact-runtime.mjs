import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = new URL('../', import.meta.url);
const routeFile = new URL('src/pages/api/contact.ts', root);
const source = await fs.readFile(routeFile, 'utf8');
const helper = await fs.readFile(new URL('src/lib/contact.ts', root), 'utf8');
const moduleUrl = (code) => `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
const compile = (code, filename) =>
  ts.transpileModule(code, {
    fileName: filename,
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
const stateKey = Symbol.for('soltree-contact-runtime-test');
const originalFetch = globalThis.fetch;
const originalConsoleError = console.error;
const previousState = globalThis[stateKey];
const state = { secrets: {}, calls: [], logs: [], responses: [], secretReads: [] };
globalThis[stateKey] = state;
const envModule = moduleUrl(`export const getSecret = key => {
  const state = globalThis[Symbol.for('soltree-contact-runtime-test')];
  state.secretReads.push(key);
  return state.secrets[key];
};`);
const helperModule = moduleUrl(compile(helper, 'contact.ts'));
const compiled = compile(source, fileURLToPath(routeFile))
  .replace(/(['"])@\/lib\/contact\1/g, JSON.stringify(helperModule))
  .replace(/(['"])astro:env\/server\1/g, JSON.stringify(envModule));
assert(!compiled.includes('locals.runtime'), 'The handler must not depend on Cloudflare locals');
const { POST, GET, prerender } = await import(moduleUrl(compiled));
assert.equal(prerender, false);
globalThis.fetch = async (url, options) => {
  assert(
    [
      'https://api.resend.com/emails',
      'https://fixture.supabase.co/rest/v1/contact_messages',
    ].includes(String(url)),
    'Offline test forbids unexpected network destinations',
  );
  state.calls.push({ url: String(url), options, body: JSON.parse(options.body) });
  const next = state.responses.shift();
  assert(next, 'Every outbound request must have an explicit offline stub');
  if (next instanceof Error) throw next;
  return new Response(next.body ?? JSON.stringify(Object.hasOwn(next, 'json') ? next.json : {}), {
    status: next.status ?? 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
console.error = (...values) => state.logs.push(values);
const emailSecrets = { RESEND_API_KEY: 'fixture-email-secret' };
const databaseSecrets = {
  NEXT_PUBLIC_SUPABASE_URL: 'https://fixture.supabase.co',
  SUPABASE_SERVICE_ROLE_KEY: 'fixture-database-secret',
};
const lead = {
  name: 'Fixture Buyer',
  email: 'buyer@example.com',
  message: 'Please send the verified product datasheet.',
};
function reset(secrets = {}, responses = []) {
  state.secrets = { ...secrets };
  state.calls.length = 0;
  state.logs.length = 0;
  state.secretReads.length = 0;
  state.responses = [...responses];
}
async function submit(value, { raw = false } = {}) {
  const request = new Request('https://www.elesoltree.com/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw ? value : JSON.stringify(value),
  });
  // No locals object is passed: Vercel/dev resolve secrets via Astro's adapter-provided getSecret.
  const response = await POST({ request });
  assert.equal(response.headers.get('cache-control'), 'no-store');
  const text = await response.text();
  for (const key of [emailSecrets.RESEND_API_KEY, databaseSecrets.SUPABASE_SERVICE_ROLE_KEY])
    assert(!text.includes(key), 'Secret values must never appear in a browser response');
  return { status: response.status, data: JSON.parse(text) };
}
try {
  reset();
  assert.equal((await submit('{invalid', { raw: true })).status, 400);
  for (const invalid of [
    null,
    [],
    {},
    { ...lead, email: 'not-an-email' },
    { ...lead, message: 'short' },
    { ...lead, name: ' ' },
    { ...lead, phone: 123 },
  ])
    assert.equal((await submit(invalid)).status, 422);
  assert.equal(state.calls.length, 0);
  assert.deepEqual(await submit({ ...lead, website: 'bot.example' }), {
    status: 200,
    data: { success: true },
  });
  assert.equal(state.calls.length, 0, 'Honeypot submissions must not send email or write data');
  assert.equal(state.secretReads.length, 0);
  assert.equal((await submit(lead)).status, 503);
  assert.equal(state.calls.length, 0);

  reset(emailSecrets, [{ status: 401, json: { error: 'fixture-email-secret' } }]);
  assert.equal((await submit(lead)).status, 502);
  assert.equal(state.calls.length, 1);
  reset({ ...emailSecrets, ...databaseSecrets }, [new Error('fixture-email-secret')]);
  assert.equal((await submit(lead)).status, 502);
  assert.equal(state.calls.length, 1, 'Database writes cannot precede confirmed email delivery');
  for (const confirmation of [null, {}, { id: '' }, { id: '   ' }, { id: 123 }, { id: {} }]) {
    reset({ ...emailSecrets, ...databaseSecrets }, [{ json: confirmation }]);
    assert.equal((await submit(lead)).status, 502);
    assert.equal(state.calls.length, 1);
  }
  reset({ ...emailSecrets, ...databaseSecrets }, [{ body: '{not-json' }]);
  assert.equal((await submit(lead)).status, 502);
  assert.equal(state.calls.length, 1);

  reset(emailSecrets, [{ json: { id: 'fixture-confirmed-email-id' } }]);
  assert.deepEqual(await submit(lead), { status: 200, data: { success: true } });
  assert.equal(state.calls.length, 1, 'Supabase remains optional');
  const email = state.calls[0];
  assert.equal(email.options.headers.Authorization, 'Bearer fixture-email-secret');
  assert.equal(email.body.from, 'noreply@cnsoltree.com');
  assert.deepEqual(email.body.to, ['shawn@cnsoltree.com']);
  assert.equal(email.body.reply_to, lead.email);

  const detailedLead = {
    ...lead,
    name: '<Buyer & "Partners">',
    message: '<script>alert("x")</script> & Please send specifications.',
    company: "Buyer > Seller's <Co>",
    phone: '+1 555 123 4567',
    country: 'US & Canada',
    inquiry_type: 'MCB <OEM>',
  };
  reset(
    {
      ...emailSecrets,
      ...databaseSecrets,
      RESEND_FROM_EMAIL: 'sales@fixture.example',
      RESEND_ADMIN_EMAIL: 'admin@fixture.example',
    },
    [
      { json: { id: 'fixture-confirmed-email-id' } },
      { status: 500, json: { error: 'fixture-database-secret' } },
    ],
  );
  assert.deepEqual(await submit(detailedLead), { status: 200, data: { success: true } });
  assert.equal(state.calls.length, 2);
  assert.equal(state.calls[0].body.from, 'sales@fixture.example');
  assert.deepEqual(state.calls[0].body.to, ['admin@fixture.example']);
  const html = state.calls[0].body.html;
  assert(!html.includes('<script>'));
  assert(html.includes('&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;'));
  assert(html.includes('&lt;Buyer &amp; &quot;Partners&quot;&gt;'));
  assert(html.includes('Buyer &gt; Seller&#39;s &lt;Co&gt;'));
  assert(html.includes('US &amp; Canada'));
  assert(html.includes('MCB &lt;OEM&gt;'));
  const database = state.calls[1];
  assert.equal(database.options.headers.apikey, 'fixture-database-secret');
  assert.deepEqual(database.body, {
    name: detailedLead.name,
    email: detailedLead.email,
    message: [
      detailedLead.message,
      `company: ${detailedLead.company}`,
      `phone: ${detailedLead.phone}`,
      `country: ${detailedLead.country}`,
      `inquiry_type: ${detailedLead.inquiry_type}`,
    ].join('\n'),
  });
  assert.equal(
    state.logs.length,
    1,
    'Failed optional persistence is recorded without failing a sent enquiry',
  );
  reset({ ...emailSecrets, ...databaseSecrets }, [
    { json: { id: 'fixture-confirmed-email-id' } },
    new Error('fixture-database-secret'),
  ]);
  assert.deepEqual(await submit(lead), { status: 200, data: { success: true } });
  assert.equal(state.logs.length, 1);
  reset({ ...emailSecrets, ...databaseSecrets }, [
    { json: { id: 'fixture-confirmed-email-id' } },
    { status: 201 },
  ]);
  assert.deepEqual(await submit(lead), { status: 200, data: { success: true } });
  assert.equal(state.logs.length, 0);
  const get = await GET({ request: new Request('https://www.elesoltree.com/api/contact') });
  assert.equal(get.status, 405);

  // Read template variable NAMES only. Never inspect real .env files or deployment secret values.
  const names = (template) =>
    new Set([...template.matchAll(/^([A-Z][A-Z0-9_]*)=/gm)].map((match) => match[1]));
  const currentNames = names(await fs.readFile(new URL('.env.example', root), 'utf8'));
  // These names were checked against the old Next/Vercel template; this check also runs in a clean Astro-only checkout.
  for (const key of [
    'RESEND_API_KEY',
    'RESEND_FROM_EMAIL',
    'RESEND_ADMIN_EMAIL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
  ]) {
    assert(currentNames.has(key), `Astro example must document ${key}`);
    assert(state.secretReads.includes(key));
  }
  console.log(
    'PASS: actual contact handler without Cloudflare locals, offline secret/fetch injection, validation/honeypot, confirmed email delivery, best-effort database saves, lead details, HTML escaping and matching environment names.',
  );
} finally {
  globalThis.fetch = originalFetch;
  console.error = originalConsoleError;
  if (previousState === undefined) delete globalThis[stateKey];
  else globalThis[stateKey] = previousState;
}
