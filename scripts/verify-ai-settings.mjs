import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { createAiSettings } from '../src/lib/admin-ai.mjs';
import { createAiCloudStore } from '../src/lib/admin-ai-store.mjs';
import { createAiLocalStore } from '../src/lib/admin-ai-local.mjs';

const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'soltree-ai-test-'));
const apiKey = `sk-${'fixture-not-a-real-key'.repeat(3)}`;
const replacement = `sk-${'replacement-fixture'.repeat(3)}`;
const calls = [];
let upstreamStatus = 200;
const fetchImpl = async (url, options) => {
  calls.push({ url, options });
  assert(url.startsWith('https://api.openai.com/v1/'));
  assert.equal(options.redirect, 'error');
  if (upstreamStatus !== 200)
    return new Response(JSON.stringify({ error: { message: apiKey } }), { status: upstreamStatus });
  return Response.json(
    url.endsWith('/models')
      ? {
          data: [
            { id: 'gpt-test' },
            { id: 'o3' },
            { id: 'gpt-test' },
            { id: 'gpt-audio' },
            { id: 'text-embedding-3-small' },
          ],
        }
      : {
          status: 'completed',
          output: [{ type: 'message', content: [{ type: 'output_text', text: 'OK' }] }],
        },
  );
};
try {
  const local = createAiLocalStore(directory);
  const service = createAiSettings({ ...local, fetchImpl });
  assert.deepEqual(await service.read(), {
    revision: 0,
    configured: false,
    keyHint: '',
    model: '',
  });
  const listed = await service.act({ action: 'models', apiKey });
  assert('models' in listed);
  assert.deepEqual(listed.models, ['gpt-test', 'o3']);
  assert.equal(
    (await service.read()).configured,
    false,
    'Fetching models must not save draft credentials.',
  );
  assert.equal((await service.act({ action: 'test', apiKey, model: 'gpt-test' })).ok, true);
  const testBody = JSON.parse(calls.at(-1).options.body);
  assert.equal(testBody.store, false);
  assert.equal(testBody.max_output_tokens, 512);
  assert.equal(testBody.model, 'gpt-test');
  const saved = await service.act({ action: 'save', revision: 0, apiKey, model: 'gpt-test' });
  assert.equal(saved.revision, 1);
  assert(!JSON.stringify(saved).includes(apiKey));
  assert(!fs.readFileSync(path.join(directory, 'ai-settings.json'), 'utf8').includes(apiKey));
  const reopened = createAiSettings({ ...createAiLocalStore(directory), fetchImpl });
  assert.equal((await reopened.credentials()).apiKey, apiKey);
  await reopened.act({ action: 'save', revision: 1, apiKey: '', model: 'o3' });
  assert.equal(
    (await reopened.credentials()).apiKey,
    apiKey,
    'Blank key preserves the saved secret.',
  );
  await assert.rejects(service.act({ action: 'save', revision: 1, model: 'gpt-test' }), {
    status: 409,
  });
  await reopened.act({ action: 'save', revision: 2, apiKey: replacement, model: 'gpt-test' });
  assert.equal((await reopened.credentials()).apiKey, replacement);
  await assert.rejects(
    service.act({ action: 'save', revision: 3, apiKey: 'bad', model: 'gpt-test' }),
    { status: 422 },
  );
  await assert.rejects(service.act({ action: 'models', apiKey, baseUrl: 'https://evil.example' }), {
    status: 422,
  });
  for (const status of [401, 403, 429, 500]) {
    upstreamStatus = status;
    await assert.rejects(
      service.act({ action: 'test', apiKey, model: 'gpt-test' }),
      (error) => error.status === 502 && !error.message.includes(apiKey),
    );
  }
  assert.equal((await service.read()).revision, 3, 'Failed tests must not alter saved settings.');
  const wrongKey = createAiSettings({
    store: local.store,
    encryptionKey: randomBytes(32).toString('base64'),
    fetchImpl,
  });
  await assert.rejects(wrongKey.read(), { status: 503 });
  assert.equal((await service.read()).revision, 3);
  const row = local.store.load();
  const corrupted = structuredClone(row);
  corrupted.payload.tag = randomBytes(16).toString('base64');
  const tampered = createAiSettings({
    store: { load: () => corrupted },
    encryptionKey: local.encryptionKey,
  });
  await assert.rejects(tampered.read(), { status: 503 });
  assert.equal((await service.act({ action: 'delete', revision: 3 })).configured, false);
  assert.equal((await service.credentials()).apiKey, '');

  let cloudRow;
  const cloud = createAiCloudStore({
    url: 'https://private-storage.test',
    serviceKey: 'sb_secret_fixture',
    fetchImpl: async (url, options) => {
      assert.equal(options.headers.apikey, 'sb_secret_fixture');
      assert(!options.headers.Authorization);
      const parsed = new URL(url);
      if (!options.method) return Response.json(cloudRow ? [cloudRow] : []);
      const next = JSON.parse(options.body);
      if (
        options.method === 'POST'
          ? Boolean(cloudRow)
          : Number(parsed.searchParams.get('revision').slice(3)) !== cloudRow.revision
      )
        return Response.json([]);
      cloudRow = next;
      return Response.json([cloudRow]);
    },
  });
  assert.equal(await cloud.load(), null);
  await cloud.save(0, row.payload);
  await assert.rejects(cloud.save(0, row.payload), { status: 409 });
  await cloud.save(1, row.payload);
  await assert.rejects(cloud.save(1, row.payload), { status: 409 });
  assert.equal((await cloud.load()).revision, 2);
  console.log(
    'PASS: encrypted local persistence, masked reads, draft tests, models, key preservation/replacement/deletion, redacted upstream failures, tamper detection and cloud CAS. No real API calls.',
  );
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
