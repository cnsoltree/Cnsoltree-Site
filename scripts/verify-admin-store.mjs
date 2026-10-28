import assert from 'node:assert/strict';
import {
  createAdminStore,
  validateAdminDocument,
  ADMIN_STORE_MAX_BYTES,
} from '../src/lib/admin-store.mjs';

const initial = {
  version: 1,
  files: { 'src/content/articles/first-guide.json': '{"slug":"first-guide","published":false}' },
  media: {},
  publication: null,
  sourceManifest: { 'src/content/articles/first-guide.json': 'a'.repeat(40) },
};
const document = (title) => ({
  ...structuredClone(initial),
  files: {
    ...initial.files,
    'src/content/products/MCB-ONE.json': JSON.stringify({
      id: 'MCB-ONE',
      name: title,
      published: false,
    }),
  },
});
const url = 'https://fixture.supabase.co';
const key = 'fixture-service-role-never-echo';
const calls = [];
let current = null;
const backups = [];
let fail;
const response = (value, status = 200) =>
  new Response(status === 204 ? null : JSON.stringify(value), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
// This fixture models the documented atomic REST/RPC contract; it never connects to Supabase or applies SQL.
async function fetchImpl(target, options) {
  assert.equal(new URL(target).origin, url);
  assert.equal(options.headers.apikey, key);
  assert.equal(options.headers.Authorization, `Bearer ${key}`);
  assert(options.signal instanceof AbortSignal);
  calls.push({ target, options });
  if (fail) {
    const failure = fail;
    fail = undefined;
    if (failure instanceof Error) throw failure;
    return failure;
  }
  if (target.endsWith('?key=eq.main&select=revision,document&limit=1')) {
    assert.equal(options.method, undefined);
    return response(current ? [structuredClone(current)] : []);
  }
  if (target.endsWith('/rest/v1/soltree_admin_workspace?on_conflict=key')) {
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Prefer, 'resolution=ignore-duplicates,return=minimal');
    const value = JSON.parse(options.body);
    assert.equal(value.key, 'main');
    if (!current) current = { revision: 1, document: value.document };
    return response(null, 204);
  }
  assert(target.endsWith('/rest/v1/rpc/soltree_admin_save'));
  assert.equal(options.method, 'POST');
  const value = JSON.parse(options.body);
  if (!current || current.revision !== value.expected_revision)
    return response({ code: '40001', message: key }, 500);
  backups.push(structuredClone(current));
  if (backups.length > 20) backups.shift();
  current = { revision: current.revision + 1, document: value.next_document };
  return response([structuredClone(current)]);
}
const store = createAdminStore({ url, serviceKey: key, fetchImpl });
const otherInstance = createAdminStore({ url, serviceKey: key, fetchImpl });
async function rejects(operation, status) {
  await assert.rejects(operation, (error) => {
    assert.equal(error.status, status);
    assert(!error.message.includes(key), 'Provider messages and secrets must not reach the client');
    return true;
  });
}

assert.equal(await store.load(), null);
const [first, second] = await Promise.all([
  store.initialize(initial),
  otherInstance.initialize(document('Competing initialization')),
]);
assert.deepEqual(first, second);
assert.deepEqual(first.document, initial);
assert.equal(first.revision, 1);
const created = await store.save(1, document('First save'));
assert.equal(created.revision, 2);
assert.deepEqual(backups[0].document, initial);
await rejects(() => otherInstance.save(1, document('Stale overwrite')), 409);
assert.deepEqual((await store.load()).document, document('First save'));
const parallel = await Promise.allSettled([
  store.save(2, document('Editor A')),
  otherInstance.save(2, document('Editor B')),
]);
assert.equal(parallel.filter(({ status }) => status === 'fulfilled').length, 1);
assert.equal(parallel.find(({ status }) => status === 'rejected').reason.status, 409);
let latest = await store.load();
assert.equal(latest.revision, 3, 'CAS must apply across separate store instances');
assert.equal(
  (await store.initialize(initial)).revision,
  3,
  'Initialization must never overwrite existing content',
);
for (let index = 0; index < 22; index++)
  latest = await store.save(latest.revision, document(`Saved ${index}`));
assert.equal(backups.length, 20);
assert.equal(backups.at(-1).revision, latest.revision - 1);
latest.document.files['src/content/products/MCB-ONE.json'] = '{"name":"caller edited local copy"}';
assert.notDeepEqual(
  (await store.load()).document,
  latest.document,
  'Returned document edits must not mutate persisted state',
);

const beforeInvalid = calls.length;
const mediaName = `public/images/uploads/${'b'.repeat(64)}.png`;
const media = {
  objectKey: `uploads/${'b'.repeat(64)}.png`,
  sha: 'c'.repeat(40),
  contentType: 'image/png',
  size: 2048,
};
assert.deepEqual(
  validateAdminDocument({
    ...structuredClone(initial),
    media: { [mediaName]: media },
    publication: {
      id: 'locking-token',
      phase: 'preparing',
      snapshotManifest: initial.sourceManifest,
    },
  }).media[mediaName],
  media,
);
const legacy = structuredClone(initial);
delete legacy.media;
assert.deepEqual(
  validateAdminDocument(legacy).media,
  {},
  'Older documents without media receive an empty metadata map',
);
for (const invalidMedia of [
  { [mediaName]: { ...media, objectKey: '../outside.png' } },
  { [mediaName]: { ...media, contentType: 'text/html' } },
  { [mediaName]: { ...media, size: 0 } },
  { [mediaName]: { ...media, sha: 'bad-sha' } },
  { [mediaName]: { ...media, binary: 'not-allowed' } },
  { 'public/images/uploads/unsafe.svg': media },
])
  await rejects(() => store.save(25, { ...structuredClone(initial), media: invalidMedia }), 422);
for (const path of [
  '../private.json',
  '/src/content/articles/a.json',
  'src/content/articles/../settings/seo-workspace.json',
  'src/content/articles/Bad_Slug.json',
  'public/images/uploads/secret.json',
  'src/content/settings/config.json',
  'src\\content\\products\\A.json',
])
  await rejects(
    () => store.save(25, { ...structuredClone(initial), files: { [path]: '{}' } }),
    422,
  );
await rejects(
  () =>
    store.save(25, { ...structuredClone(initial), files: { 'src/content/articles/a.json': '[]' } }),
  422,
);
await rejects(
  () =>
    store.save(25, {
      ...structuredClone(initial),
      files: { 'src/content/articles/a.json': '{bad' },
    }),
  422,
);
await rejects(
  () =>
    store.save(25, {
      ...structuredClone(initial),
      sourceManifest: { 'src/content/settings/seo-workspace.json': 'a'.repeat(40) },
    }),
  422,
);
await rejects(
  () =>
    store.save(25, {
      ...structuredClone(initial),
      sourceManifest: { 'src/content/articles/a.json': 'not-a-sha' },
    }),
  422,
);
await rejects(() => store.save(25, { ...structuredClone(initial), publication: [] }), 422);
await rejects(
  () => store.save(25, { ...structuredClone(initial), publication: { invalid: undefined } }),
  422,
);
await rejects(() => store.save(0, initial), 422);
await rejects(() => store.save('25', initial), 422);
assert.equal(calls.length, beforeInvalid, 'Invalid state must be rejected before any REST call');
assert.throws(
  () =>
    validateAdminDocument({
      ...structuredClone(initial),
      publication: { text: 'x'.repeat(ADMIN_STORE_MAX_BYTES) },
    }),
  (error) => error.status === 413,
);
assert.deepEqual(
  validateAdminDocument({
    ...structuredClone(initial),
    files: {
      'src/content/settings/seo-workspace.json':
        '{"version":1,"knowledge":[],"batches":[],"tasks":[]}',
    },
    publication: { id: 'release-id', status: 'pending', base: 25 },
    sourceManifest: { 'src/content/articles/new.json': null },
  }).publication,
  { id: 'release-id', status: 'pending', base: 25 },
);
assert.throws(
  () => createAdminStore({ url: 'http://untrusted.example', serviceKey: key, fetchImpl }),
  (error) => error.status === 503,
);
assert.throws(
  () => createAdminStore({ url, serviceKey: '', fetchImpl }),
  (error) => error.status === 503,
);

fail = response({ code: 'PGRST202', message: key }, 404);
await rejects(() => store.load(), 503);
fail = response({ message: key }, 403);
await rejects(() => store.load(), 503);
fail = response({ code: '23514', details: key }, 400);
await rejects(() => store.save(25, initial), 422);
fail = new Error(key);
await rejects(() => store.load(), 503);
fail = new Response('{invalid-json', { status: 200 });
await rejects(() => store.load(), 502);
fail = response([{ revision: Number.MAX_SAFE_INTEGER + 1, document: initial }]);
await rejects(() => store.load(), 502);
fail = response([{ revision: 25, document: { version: 999 } }]);
await rejects(() => store.load(), 502);
fail = response([{ revision: '25', document: initial }]);
assert.equal((await store.load()).revision, 25);
console.log(
  'PASS: private admin store REST contract, conflict-safe initialization, cross-instance CAS conflicts, retained revision backups, validated paths/documents, bounded payloads and sanitized failures. SQL migration is not executed by this offline check.',
);
