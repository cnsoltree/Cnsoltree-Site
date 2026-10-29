import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { createGitPublisher, gitBlobSha, manifestFromFiles } from '../src/lib/admin-publish.mjs';

const hash = (letter) => letter.repeat(40);
const head = hash('a'),
  baseTree = hash('b'),
  newTree = hash('c'),
  commit = hash('d');
const productPath = 'src/content/products/MCB-AC-1P.json';
const articlePath = 'src/content/articles/selection-guide.json';
const taxonomyPath = 'src/content/settings/taxonomy.json';
const product = { id: 'MCB-AC-1P', name: 'Original product', published: true };
const article = { slug: 'selection-guide', title: 'Original guide', published: true };
const original = new Map([
  [productPath, JSON.stringify(product)],
  [articlePath, JSON.stringify(article)],
  [
    taxonomyPath,
    fs.readFileSync(new URL('../src/content/settings/taxonomy.json', import.meta.url), 'utf8'),
  ],
]);
const baseline = manifestFromFiles(original);
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aH2cAAAAASUVORK5CYII=',
  'base64',
);
const asset = {
  path: `public/images/uploads/${createHash('sha256').update(png).digest('hex')}.png`,
  content: png.toString('base64'),
  sha: gitBlobSha(png),
};
const json = (value, status = 200) =>
  new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });
function fixture(options = {}) {
  const calls = [];
  const tree = [...baseline].map(([path, sha]) => ({ path, sha, mode: '100644', type: 'blob' }));
  tree.push({ path: 'src/pages/index.astro', sha: hash('e'), mode: '100644', type: 'blob' });
  const fetchImpl = async (value, init) => {
    const url = new URL(value);
    assert.equal(url.origin, 'https://api.github.com');
    assert.equal(init.headers.Authorization, 'Bearer fixture-not-a-real-token');
    const endpoint = url.pathname.replace('/repos/cnsoltree/Cnsoltree-Site', '') + url.search;
    const method = init.method;
    const body = init.body === undefined ? undefined : JSON.parse(init.body);
    calls.push({ endpoint, method, body });
    if (options.fail?.(endpoint, method))
      return json({ message: options.failureMessage ?? 'Rejected' }, options.failureCode ?? 409);
    if (endpoint === '/git/ref/heads/main' && method === 'GET')
      return json({ object: { sha: head } });
    if (endpoint === `/git/commits/${head}` && method === 'GET')
      return json({ tree: { sha: baseTree } });
    if (endpoint === `/git/trees/${baseTree}?recursive=1` && method === 'GET')
      return json({ tree: options.tree ?? tree, truncated: options.truncated ?? false });
    if (endpoint === '/git/blobs' && method === 'POST') {
      assert.equal(body.encoding, 'base64');
      return json({ sha: options.blobSha ?? gitBlobSha(Buffer.from(body.content, 'base64')) });
    }
    if (endpoint === '/git/trees' && method === 'POST') return json({ sha: newTree });
    if (endpoint === '/git/commits' && method === 'POST') return json({ sha: commit });
    if (endpoint === '/git/refs/heads/main' && method === 'PATCH') {
      assert.equal(body.force, false);
      return json({ object: { sha: body.sha } });
    }
    if (endpoint === `/commits/${commit}/status` && method === 'GET')
      return json({ state: options.ci ?? 'pending' });
    if (endpoint === `/deployments?sha=${commit}&per_page=100` && method === 'GET')
      return json(options.deployments ?? []);
    const deployment = /^\/deployments\/(\d+)\/statuses\?per_page=100$/.exec(endpoint);
    if (deployment && method === 'GET') return json(options.statuses?.[deployment[1]] ?? []);
    throw new Error(`Unexpected fixture request: ${method} ${endpoint}`);
  };
  return {
    calls,
    tree,
    publisher: createGitPublisher({ token: 'fixture-not-a-real-token', fetchImpl }),
  };
}
const originalFetch = globalThis.fetch;
let realCalls = 0;
globalThis.fetch = async () => {
  realCalls++;
  throw new Error('Real network access is forbidden in this check.');
};
const rejects = (action, status) => assert.rejects(action, (error) => error.status === status);
try {
  assert.equal(gitBlobSha('hello\n'), 'ce013625030ba8dba906f756967f9e9ca394464a');
  assert.equal(gitBlobSha(Buffer.from('hello\n')), gitBlobSha('hello\n'));
  assert.equal(baseline.size, 3);
  const inspected = fixture();
  assert.deepEqual(await inspected.publisher.inspect(), {
    id: head,
    manifest: Object.fromEntries(baseline),
  });
  assert(inspected.calls.every((call) => call.method === 'GET'));
  const inspectConflict = fixture();
  inspectConflict.tree[0].sha = hash('f');
  assert.equal((await inspectConflict.publisher.inspect()).manifest[productPath], hash('f'));
  await rejects(() => fixture({ truncated: true }).publisher.inspect(), 502);
  await rejects(() => createGitPublisher().inspect(), 503);
  for (const [file, value] of [
    [productPath, { ...product, published: false }],
    [productPath, { ...product, deletedAt: '2026-10-28T12:00:00.000Z' }],
    [productPath, { ...product, privateNotes: 'must never become public' }],
    [productPath, { ...product, id: 'changed-url' }],
    ['src/content/settings/seo-workspace.json', { published: true }],
    ['src/content/products/../private.json', product],
    ['.env.local', { published: true }],
  ])
    assert.throws(
      () => manifestFromFiles(new Map([[file, JSON.stringify(value)]])),
      (error) => error.status === 400,
    );

  const changed = new Map(original);
  changed.set(productPath, JSON.stringify({ ...product, name: 'New public name' }));
  changed.delete(articlePath);
  const missingTaxonomy = new Map(original);
  missingTaxonomy.delete(taxonomyPath);
  await rejects(() => fixture().publisher.publish({ files: missingTaxonomy, baseline }), 400);
  const success = fixture();
  const published = await success.publisher.publish({ files: changed, baseline, assets: [asset] });
  assert.equal(published.id, commit);
  assert.equal(published.status, 'queued');
  assert.deepEqual(published.manifest, Object.fromEntries(manifestFromFiles(changed)));
  const treeWrite = success.calls.find(
    (call) => call.endpoint === '/git/trees' && call.method === 'POST',
  ).body;
  assert.equal(treeWrite.base_tree, baseTree);
  assert(
    treeWrite.tree.some(
      (row) => row.path === productPath && row.content === changed.get(productPath),
    ),
  );
  assert(treeWrite.tree.some((row) => row.path === articlePath && row.sha === null));
  assert(treeWrite.tree.some((row) => row.path === asset.path && row.sha === asset.sha));
  assert(!treeWrite.tree.some((row) => row.path === 'src/pages/index.astro'));
  assert.deepEqual(
    success.calls.find((call) => call.endpoint === '/git/commits' && call.method === 'POST').body
      .parents,
    [head],
  );
  assert.equal(success.calls.at(-1).method, 'PATCH');
  assert.equal(success.calls.at(-1).body.force, false);

  const unchanged = fixture();
  assert.equal((await unchanged.publisher.publish({ files: original, baseline })).id, head);
  assert(unchanged.calls.every((call) => call.method === 'GET'));
  const existingImage = fixture();
  existingImage.tree.push({ path: asset.path, mode: '100644', type: 'blob', sha: asset.sha });
  await existingImage.publisher.publish({ files: original, baseline, assets: [asset] });
  assert(existingImage.calls.every((call) => call.method === 'GET'));

  for (const mutate of [
    (tree) => {
      tree[0].sha = hash('f');
    },
    (tree) => {
      tree.push({
        path: 'src/content/articles/another-guide.json',
        type: 'blob',
        mode: '100644',
        sha: hash('f'),
      });
    },
    (tree) => {
      tree[0].mode = '120000';
    },
    (tree) => {
      tree.push({ path: asset.path, type: 'blob', mode: '100644', sha: hash('f') });
    },
  ]) {
    const conflict = fixture();
    mutate(conflict.tree);
    await rejects(
      () => conflict.publisher.publish({ files: changed, baseline, assets: [asset] }),
      409,
    );
    assert(conflict.calls.every((call) => call.method === 'GET'));
  }
  const truncated = fixture({ truncated: true });
  await rejects(() => truncated.publisher.publish({ files: changed, baseline }), 502);
  assert(truncated.calls.every((call) => call.method === 'GET'));
  for (const assets of [
    [{ ...asset, path: 'public/images/uploads/photo.png' }],
    [{ ...asset, content: 'not valid base64!' }],
    [{ ...asset, sha: hash('f') }],
    [asset, asset],
    Array(31).fill(asset),
    [{ ...asset, content: Buffer.alloc(2 * 1024 * 1024 + 1).toString('base64') }],
  ]) {
    const invalid = fixture();
    await rejects(() => invalid.publisher.publish({ files: changed, baseline, assets }), 400);
    assert.equal(invalid.calls.length, 0);
  }
  const wrongBlob = fixture({ blobSha: hash('f') });
  await rejects(
    () => wrongBlob.publisher.publish({ files: changed, baseline, assets: [asset] }),
    502,
  );
  assert(!wrongBlob.calls.some((call) => call.method === 'PATCH'));
  for (const options of [
    { failureCode: 409 },
    { failureCode: 403, failureMessage: 'GH006: Protected branch update failed' },
  ]) {
    const rejected = fixture({
      ...options,
      fail: (endpoint, method) => endpoint === '/git/refs/heads/main' && method === 'PATCH',
    });
    await rejects(() => rejected.publisher.publish({ files: changed, baseline }), 409);
    assert.equal(rejected.calls.filter((call) => call.method === 'PATCH').length, 1);
    assert.equal(rejected.calls.at(-1).body.force, false);
  }
  const unauthorized = fixture({
    fail: () => true,
    failureCode: 401,
    failureMessage: 'fixture-not-a-real-token',
  });
  await assert.rejects(
    () => unauthorized.publisher.publish({ files: original, baseline }),
    (error) => error.status === 503 && !error.message.includes('fixture-not-a-real-token'),
  );
  await rejects(() => createGitPublisher().publish({ files: original, baseline }), 503);

  const production = (id, extra = {}) => ({
    id,
    sha: commit,
    environment: 'Production',
    created_at: '2026-10-28T12:00:00Z',
    ...extra,
  });
  const ciOnly = fixture({ ci: 'success' });
  assert.equal((await ciOnly.publisher.status(commit)).status, 'building');
  const preview = fixture({
    ci: 'success',
    deployments: [production(10, { environment: 'Preview' })],
    statuses: { 10: [{ state: 'success' }] },
  });
  assert.equal((await preview.publisher.status(commit)).status, 'building');
  assert(!preview.calls.some((call) => call.endpoint.includes('/deployments/10/statuses')));
  const ready = fixture({
    ci: 'success',
    deployments: [production(11)],
    statuses: { 11: [{ state: 'success', environment_url: 'https://preview.example.invalid' }] },
  });
  const deployed = await ready.publisher.status(commit);
  assert.equal(deployed.status, 'ready');
  assert.equal(deployed.url, 'https://www.elesoltree.com');
  for (const [state, expected] of [
    ['queued', 'building'],
    ['in_progress', 'building'],
    ['error', 'error'],
    ['failure', 'error'],
    ['inactive', 'ready'],
  ]) {
    const pending = fixture({
      deployments: [production(12)],
      statuses: { 12: [{ state }, { state: 'success' }] },
    });
    assert.equal((await pending.publisher.status(commit)).status, expected);
  }
  const otherCommit = fixture({
    ci: 'success',
    deployments: [production(13, { sha: head })],
    statuses: { 13: [{ state: 'success' }] },
  });
  assert.equal((await otherCommit.publisher.status(commit)).status, 'building');
  const newer = fixture({
    deployments: [production(14), production(15, { created_at: '2026-10-28T13:00:00Z' })],
    statuses: { 14: [{ state: 'success' }], 15: [{ state: 'failure' }] },
  });
  assert.equal((await newer.publisher.status(commit)).status, 'error');
  assert.equal((await fixture({ ci: 'failure' }).publisher.status(commit)).status, 'error');
  await rejects(() => ciOnly.publisher.status('../main'), 400);
  assert.equal(realCalls, 0);
  console.log(
    'PASS: public-only Git snapshots, content conflicts, immutable image uploads, non-force commits, protected refs, production-only deployment readiness; no real network calls.',
  );
} finally {
  globalThis.fetch = originalFetch;
}
