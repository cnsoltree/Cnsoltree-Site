import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import { validateTaxonomy, getTaxonomyGroups } from '../src/lib/taxonomy-model.mjs';
import { safeAdminDestination } from '../src/admin/login.js';
import { safePublishedUrl, validPublication } from '../src/admin/online-publish.js';
import { createOnlineBackend } from '../src/admin/online-backend.js';

assert.equal(
  safeAdminDestination('/admin?view=seo#/collections/articles'),
  '/admin?view=seo#/collections/articles',
);
for (const value of [
  'https://evil.example/admin',
  '//evil.example/admin',
  '/admin/../api/admin/session',
  '/administrator',
  '/admin/login?next=//evil.example',
  'javascript:alert(1)',
  null,
])
  assert.equal(safeAdminDestination(value), '/admin');
const origin = 'https://www.elesoltree.com';
assert.equal(safePublishedUrl('/', origin), `${origin}/`);
assert.equal(safePublishedUrl(`${origin}/products`, origin), `${origin}/products`);
for (const value of [
  'https://evil.example/',
  'http://www.elesoltree.com/',
  'https://user:pass@www.elesoltree.com/',
  'javascript:alert(1)',
  null,
])
  assert.equal(safePublishedUrl(value, origin), null);

// Load the actual config against real taxonomy helpers, without mounting Decap or changing files.
const taxonomy = validateTaxonomy(
  JSON.parse(
    await fs.readFile(new URL('../src/content/settings/taxonomy.json', import.meta.url), 'utf8'),
  ),
);
const configSource = ts.transpileModule(
  await fs.readFile(new URL('../src/admin/config.ts', import.meta.url), 'utf8'),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
const configModule = { exports: {} };
new Function('module', 'exports', 'require', configSource)(
  configModule,
  configModule.exports,
  () => ({
    allProductGroups: getTaxonomyGroups(taxonomy, 'products', false),
    allArticleGroups: getTaxonomyGroups(taxonomy, 'articles', false),
    categories: taxonomy.categories.filter((entry) => !entry.deletedAt),
    validateTaxonomy,
    getTaxonomyGroups,
  }),
);
const { cmsConfig, categoryNames, configureOnlineCms } = configModule.exports;
assert.equal(cmsConfig.backend.name, 'git-gateway');
assert(cmsConfig.local_backend, 'Local mode keeps its existing backend.');
const updated = structuredClone(taxonomy);
updated.categories.push({
  slug: 'online-test',
  name: 'Online test',
  shortDescription: 'Test',
  description: 'Test category',
  image: '/images/logo.png',
});
updated.groups[0].items.push({
  slug: 'online-test',
  name: 'Online test',
  category: 'online-test',
  products: { visible: false, order: 100 },
  articles: { visible: false, order: 100 },
});
configureOnlineCms(updated, origin);
assert.equal(cmsConfig.backend.name, 'soltree-online');
assert.equal(cmsConfig.backend.proxy_url, '/api/admin/proxy');
assert.equal(cmsConfig.local_backend, undefined);
assert.equal(cmsConfig.site_url, origin);
assert.equal(categoryNames['online-test'], 'Online test');
for (const collection of cmsConfig.collections) {
  const field = collection.fields.find(
    (field) =>
      field.name === (collection.name === 'products' ? 'categorySlug' : 'relatedCategorySlug'),
  );
  assert(
    field.options.some((option) => option.value === 'online-test'),
    'New hidden cloud categories remain selectable.',
  );
}
const publicationId = 'a'.repeat(40);
assert(validPublication({ status: 'idle' }));
assert(validPublication({ status: 'building', message: 'Preparing publish' }));
assert(validPublication({ status: 'error', message: 'Preparation failed' }));
for (const status of ['queued', 'building', 'ready', 'error'])
  assert(validPublication({ id: publicationId, status, message: 'Actual backend status' }));
for (const value of [
  { status: 'ready' },
  { status: 'queued' },
  { status: 'ready', id: '../bad' },
  { status: 'published', id: publicationId },
  { status: 'idle', id: 'bad' },
  [],
])
  assert.equal(validPublication(value), false);

let response;
let received;
const a = 'a'.repeat(64),
  b = 'b'.repeat(64),
  c = 'c'.repeat(64);
class FakeProxy {
  constructor() {
    this.branch = 'main';
    this.mediaFolder = 'public/images/uploads';
  }
  async request(payload) {
    received = payload;
    if (response instanceof Error) throw response;
    return response;
  }
}
const Backend = createOnlineBackend(FakeProxy);
const backend = new Backend();
const filename = 'src/content/articles/example.json';
response = [{ file: { path: filename, id: a }, data: 'opened content' }];
await backend.request({ action: 'entriesByFolder', params: {} });
response = { file: { path: filename, id: a }, data: 'opened content' };
await backend.request({ action: 'getEntry', params: { path: filename } });
response = [{ file: { path: filename, id: b }, data: 'new remote version' }];
await backend.request({ action: 'entriesByFolder', params: {} });
response = { revisions: { [filename]: c } };
await backend.request({
  action: 'persistEntry',
  params: { dataFiles: [{ path: filename, raw: 'editor content' }] },
});
assert.equal(
  received.params.expected[filename],
  a,
  'A list refresh must not replace the revision actually edited.',
);
assert.equal(
  backend.fileRevisions.get(filename),
  c,
  'Successful save must advance the expected revision.',
);
response = {};
await backend.request({
  action: 'persistEntry',
  params: { dataFiles: [{ path: 'src/content/articles/new.json', raw: '{}' }] },
});
assert.equal(received.params.expected['src/content/articles/new.json'], null);
response = { file: { path: filename, id: b }, data: 'explicitly reopened content' };
await backend.request({ action: 'getEntry', params: { path: filename } });
response = Object.assign(new Error('conflict'), { status: 409 });
await assert.rejects(
  backend.request({
    action: 'persistEntry',
    params: { dataFiles: [{ path: filename, raw: '{}' }] },
  }),
  /conflict/,
);
assert.equal(backend.fileRevisions.get(filename), b, 'Failed saves retain the opened revision.');
response = [
  {
    id: a,
    name: 'photo.webp',
    path: 'public/images/uploads/photo.webp',
    url: '/images/uploads/photo.webp',
  },
];
assert.deepEqual(await backend.getMedia(), [
  {
    id: a,
    name: 'photo.webp',
    path: 'public/images/uploads/photo.webp',
    url: '/images/uploads/photo.webp',
    displayURL: '/images/uploads/photo.webp',
  },
]);
console.log(
  'PASS: admin return/website URLs, publication states, stale-editor revisions, successful-save advancement and metadata-only media.',
);
