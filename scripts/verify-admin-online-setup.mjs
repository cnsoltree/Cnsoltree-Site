import assert from 'node:assert/strict';

const originalFetch = globalThis.fetch;
const originalLoadEnvFile = process.loadEnvFile;
globalThis.fetch = async () => {
  throw new Error('Real network calls are forbidden in this offline check.');
};
process.loadEnvFile = () => {
  throw new Error('Local credential files must not be read in this offline check.');
};
try {
  const { ensurePrivateMediaBucket } = await import('./admin-online-setup.mjs');
  const missing = () =>
    Response.json(
      { code: 'NoSuchBucket', statusCode: '404', error: 'Bucket not found' },
      { status: 400 },
    );
  const legacyMissing = () =>
    Response.json(
      { statusCode: 'NoSuchBucket', error: 'Bucket not found', message: 'Bucket not found' },
      { status: 400 },
    );
  function fixture(responses) {
    const calls = [];
    return {
      calls,
      async call(pathname, options = {}) {
        calls.push({ pathname, options });
        assert(responses.length, 'Every call must have an explicit offline response.');
        return responses.shift();
      },
    };
  }
  for (const missingResponse of [
    missing(),
    legacyMissing(),
    new Response('Not found', { status: 404 }),
  ]) {
    const test = fixture([
      missingResponse,
      Response.json({ name: 'soltree-admin-media' }, { status: 201 }),
      Response.json({ public: false }),
    ]);
    assert.equal(await ensurePrivateMediaBucket(test.call, true), true);
    assert.equal(test.calls.length, 3);
    assert.equal(test.calls[1].pathname, '/storage/v1/bucket');
    assert.equal(test.calls[1].options.method, 'POST');
    assert.deepEqual(JSON.parse(test.calls[1].options.body), {
      id: 'soltree-admin-media',
      name: 'soltree-admin-media',
      public: false,
      file_size_limit: 2097152,
      allowed_mime_types: ['image/jpeg', 'image/png', 'image/webp'],
    });
  }
  const noPrepare = fixture([missing()]);
  assert.equal(await ensurePrivateMediaBucket(noPrepare.call), false);
  assert.equal(noPrepare.calls.length, 1);
  for (const response of [
    Response.json({ code: 'NoSuchBucket', statusCode: '404' }, { status: 401 }),
    Response.json({ code: 'NoSuchBucket', statusCode: '404' }, { status: 403 }),
    Response.json({ statusCode: 'NoSuchBucket' }, { status: 401 }),
    Response.json({ statusCode: 'NoSuchBucket' }, { status: 403 }),
    Response.json({ statusCode: 'InvalidRequest' }, { status: 400 }),
    Response.json({ statusCode: '404' }, { status: 400 }),
    new Response('Invalid response', { status: 400 }),
  ]) {
    const denied = fixture([response]);
    assert.equal(await ensurePrivateMediaBucket(denied.call, true), false);
    assert.equal(
      denied.calls.length,
      1,
      'Authentication and unrelated errors must not trigger bucket creation.',
    );
  }
  const exists = fixture([Response.json({ public: false })]);
  assert.equal(await ensurePrivateMediaBucket(exists.call, true), true);
  assert.equal(exists.calls.length, 1);
  const concurrent = fixture([
    missing(),
    Response.json({ message: 'Already exists' }, { status: 409 }),
    Response.json({ public: false }),
  ]);
  assert.equal(await ensurePrivateMediaBucket(concurrent.call, true), true);
  const failed = fixture([missing(), Response.json({ message: 'Denied' }, { status: 403 })]);
  await assert.rejects(
    () => ensurePrivateMediaBucket(failed.call, true),
    /creation failed \(403\)/,
  );
  for (const responses of [
    [Response.json({ public: true })],
    [missing(), Response.json({}, { status: 201 }), Response.json({ public: true })],
    [Response.json({ name: 'missing privacy setting' })],
  ])
    await assert.rejects(
      () => ensurePrivateMediaBucket(fixture(responses).call, true),
      /must be private/,
    );
  console.log(
    'PASS: NoSuchBucket/400 and 404 preparation, explicit opt-in, unchanged auth failures, concurrent creation and mandatory private-bucket verification; no credentials or network used.',
  );
} finally {
  globalThis.fetch = originalFetch;
  process.loadEnvFile = originalLoadEnvFile;
}
