import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { adminOrigin, adminBody, createAdminAuth, ADMIN_EMAIL } from '../src/lib/admin-auth.mjs';
import { cloudProxy } from '../src/lib/admin-proxy.mjs';
import { imageUpload, createAdminMedia } from '../src/lib/admin-media.mjs';
import { supabaseServiceHeaders } from '../src/lib/supabase.mjs';

const origin = 'https://www.elesoltree.com';
assert.deepEqual(supabaseServiceHeaders('sb_secret_test'), { apikey: 'sb_secret_test' });
assert.deepEqual(supabaseServiceHeaders('legacy-jwt'), {
  apikey: 'legacy-jwt',
  Authorization: 'Bearer legacy-jwt',
});
const request = (body, headers = {}) =>
  new Request(`${origin}/api/admin/proxy`, {
    method: 'POST',
    headers: { origin, 'content-type': 'application/json', ...headers },
    body,
  });
adminOrigin(request('{}'));
assert.throws(() => adminOrigin(request('{}', { origin: 'https://evil.example' })), {
  status: 403,
});
assert.throws(() => adminOrigin(new Request('https://preview.example/api/admin/session')), {
  status: 403,
});
assert.deepEqual(await adminBody(request('{"value":"ok"}')), { value: 'ok' });
await assert.rejects(adminBody(request('[]')), { status: 400 });
await assert.rejects(adminBody(request('{"value":"too long"}'), 8), { status: 413 });
let authCalls = 0;
const auth = createAdminAuth({
  url: 'https://supabase.example',
  serviceKey: 'test-private-key',
  fetchImpl: async (url, options) => {
    authCalls++;
    assert.equal(options.headers.apikey, 'test-private-key');
    if (url.endsWith('/user'))
      return Response.json({ id: 'admin', email: ADMIN_EMAIL, email_confirmed_at: '2026-10-28' });
    return Response.json({
      access_token: 'access',
      refresh_token: 'refresh',
      expires_in: 3600,
      user: { id: 'admin', email: ADMIN_EMAIL, email_confirmed_at: '2026-10-28' },
    });
  },
});
await assert.rejects(auth.login('other@example.com', 'a-password'), { status: 401 });
assert.equal(authCalls, 0, 'Other accounts must be refused before requesting an auth token.');
assert.equal((await auth.login(ADMIN_EMAIL, 'a-password')).access_token, 'access');
assert.equal((await auth.user('access')).email, ADMIN_EMAIL);
assert.equal((await auth.refresh('refresh')).refresh_token, 'refresh');
for (const user of [
  { email: 'other@example.com', email_confirmed_at: 'yes' },
  { email: ADMIN_EMAIL },
]) {
  const rejected = createAdminAuth({
    url: 'https://supabase.example',
    serviceKey: 'key',
    fetchImpl: async () => Response.json(user),
  });
  await assert.rejects(rejected.user('access'), { status: 403 });
}

const filename = 'src/content/articles/cloud-check.json';
const article = {
  slug: 'cloud-check',
  title: 'Draft',
  published: false,
  content: '## Test\n\nPrivate draft.',
};
const raw = JSON.stringify(article);
const document = {
  version: 1,
  files: { [filename]: raw },
  media: {},
  publication: null,
  sourceManifest: {},
};
const options = {
  media: null,
  validateRecord: async () => {},
  publicMedia: [],
  readPublicMedia: null,
};
const loaded = await cloudProxy(
  { action: 'getEntry', params: { path: filename } },
  document,
  options,
);
assert.equal(loaded.response.file.id, createHash('sha256').update(raw).digest('hex'));
assert.equal(loaded.response.file.id.length, 64, 'Editor revisions are SHA256, not Git SHA1.');
const params = {
  dataFiles: [{ path: filename, raw: JSON.stringify({ ...article, title: 'Edited' }) }],
  assets: [],
  expected: { [filename]: loaded.response.file.id },
  options: { collectionName: 'articles', useWorkflow: false },
};
const saved = await cloudProxy({ action: 'persistEntry', params }, document, options);
assert(saved.changed);
assert.equal(JSON.parse(saved.document.files[filename]).title, 'Edited');
assert.equal(
  JSON.parse(document.files[filename]).title,
  'Draft',
  'A failed CAS must leave the original snapshot untouched.',
);
await assert.rejects(cloudProxy({ action: 'persistEntry', params }, saved.document, options), {
  status: 409,
});
params.expected[filename] = saved.response.revisions[filename];
assert(
  (await cloudProxy({ action: 'persistEntry', params }, saved.document, options)).changed,
  'A second save must advance the same editor revision.',
);
await assert.rejects(
  cloudProxy({ action: 'getEntry', params: { path: '.env.local' } }, document, options),
  { status: 404 },
);
await assert.rejects(
  cloudProxy({ action: 'deleteFiles', params: { paths: [filename] } }, document, options),
  { status: 409 },
);

const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+j1ioAAAAASUVORK5CYII=',
  'base64',
);
const asset = {
  path: 'public/images/uploads/upload.png',
  encoding: 'base64',
  content: png.toString('base64'),
};
const image = imageUpload(asset);
assert.match(image.path, /^public\/images\/uploads\/[a-f0-9]{64}\.png$/);
assert.throws(() => imageUpload({ ...asset, path: 'public/images/uploads/exploit.svg' }), {
  status: 422,
});
assert.throws(
  () => imageUpload({ ...asset, content: Buffer.from('<script>evil</script>').toString('base64') }),
  { status: 422 },
);
const media = createAdminMedia({
  url: 'https://supabase.example',
  serviceKey: 'key',
  fetchImpl: async (url, options) => {
    assert(!url.includes('/object/public/'), 'Draft media must use private object access.');
    return options.method === 'POST' ? Response.json({ Key: image.path }) : new Response(png);
  },
});
assert.equal((await media.upload(asset)).path, image.path);
assert.equal((await media.read(image.path, image.metadata)).metadata.sha, image.metadata.sha);
console.log(
  'PASS: same-origin auth, verified admin allowlist, bounded JSON, real 64-character editor revisions, stale-save refusal and private raster upload.',
);
