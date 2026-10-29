import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import { validateTaxonomy, getTaxonomyGroups } from '../src/lib/taxonomy-model.mjs';
import { safeAdminDestination } from '../src/admin/login.js';
import {
  parseAdminUrl,
  adminEntryHref,
  adminPathFromCmsPath,
  adminLoginHref,
} from '../src/admin/routes.mjs';
import { safePublishedUrl, validPublication } from '../src/admin/online-publish.js';
import { registerOnlineBackend } from '../src/admin/online-backend.js';

assert.equal(safeAdminDestination('/admin?view=seo#/collections/articles'), '/admin/seo');
assert.equal(
  safeAdminDestination('/admin', '#/collections/products/entries/Aerosol-DIN-Rail'),
  '/admin/products/Aerosol-DIN-Rail/edit',
);
assert.equal(safeAdminDestination('/admin', '#/collections/articles/new'), '/admin/articles/new');
assert.equal(
  safeAdminDestination('/admin?view=articles', '#/collections/articles/entries/fire-safety'),
  '/admin/articles/fire-safety/edit',
);
assert.equal(safeAdminDestination('/admin/seo', '#/collections/articles/new'), '/admin/seo');
assert.equal(
  safeAdminDestination('/admin#/collections/products', '#/collections/articles/new'),
  '/admin/products',
);
assert.equal(safeAdminDestination('/admin', '#/collections/products/entries/%2F%2Fevil'), '/admin');
assert.equal(safeAdminDestination('/admin', '#//evil.example'), '/admin');
assert.deepEqual(parseAdminUrl('/admin/products/%41erosol-DIN-Rail/edit'), {
  view: 'products',
  collection: 'products',
  mode: 'edit',
  entryKey: 'Aerosol-DIN-Rail',
  path: '/admin/products/Aerosol-DIN-Rail/edit',
  hash: '#/collections/products/entries/Aerosol-DIN-Rail',
});
assert.deepEqual(parseAdminUrl('/admin/articles/new'), {
  view: 'articles',
  collection: 'articles',
  mode: 'new',
  entryKey: null,
  path: '/admin/articles/new',
  hash: '#/collections/articles/new',
});
assert.equal(parseAdminUrl('/admin/analytics?view=products').view, 'analytics');
assert.equal(
  adminPathFromCmsPath('/collections/articles/entries/fire-safety'),
  '/admin/articles/fire-safety/edit',
);
assert.equal(
  adminEntryHref('products', 'Aerosol-DIN-Rail'),
  '/admin/products/Aerosol-DIN-Rail/edit',
);
assert.equal(adminEntryHref('products', '../private'), null);
assert.equal(adminEntryHref('other', 'entry'), null);
assert.equal(adminPathFromCmsPath('/collections/other/new'), null);
assert.equal(adminLoginHref('/admin'), '/admin/login');
assert.equal(
  adminLoginHref('/admin/products/example/edit'),
  '/admin/login?next=%2Fadmin%2Fproducts%2Fexample%2Fedit',
);
assert.equal(
  adminLoginHref('/admin#/collections/articles/entries/example'),
  '/admin/login?next=%2Fadmin%2Farticles%2Fexample%2Fedit',
);
assert.equal(adminLoginHref('/api/admin/session'), '/admin/login');
for (const pathname of [
  '/admin',
  '/admin/analytics',
  '/admin/seo',
  '/admin/products',
  '/admin/articles',
  '/admin/groups',
  '/admin/knowledge',
  '/admin/products/new',
  '/admin/articles/new',
  '/admin/products/Aerosol-DIN-Rail/edit',
  '/admin/articles/fire-safety/edit',
])
  assert.equal(safeAdminDestination(pathname), pathname);
for (const value of [
  'https://evil.example/admin',
  '//evil.example/admin',
  '/admin/../api/admin/session',
  '/administrator',
  '/admin/login?next=//evil.example',
  '/admin/unknown',
  '/admin/products/item/delete',
  '/admin/products/%2F%2Fevil.example/edit',
  '/admin/products/%5Cevil.example/edit',
  '/admin/product-preview/example',
  '/admin/article-preview/example',
  '/admin/seo\\evil.example',
  '/admin/seo\n',
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
let nativeMounts = 0;
class BundledAuthComponent {
  constructor(props) {
    this.props = props;
  }
  componentDidMount() {
    nativeMounts += 1;
  }
  render() {
    return 'Native auth and retry UI';
  }
}
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
  authComponent() {
    return BundledAuthComponent;
  }
}
const registry = new Map([['proxy', { BackendClass: FakeProxy }]]);
registerOnlineBackend({
  getBackend: (name) => registry.get(name),
  registerBackend: (name, BackendClass) => registry.set(name, { BackendClass }),
});
const Backend = registry.get('soltree-online').BackendClass;
assert.equal(Object.getPrototypeOf(Backend), FakeProxy, 'Reuse the CMS-bundled backend class.');
const backend = new Backend();
const SessionAuth = backend.authComponent();
assert.equal(
  Object.getPrototypeOf(SessionAuth),
  BundledAuthComponent,
  'Auth UI retains the bundled React runtime.',
);
let sessionLogins = 0;
const authPage = new SessionAuth({
  onLogin: () => {
    sessionLogins += 1;
  },
});
authPage.componentDidMount();
authPage.componentDidMount();
assert.equal(sessionLogins, 1, 'The existing server session starts Decap login once.');
assert.equal(nativeMounts, 2, 'Native auth lifecycle remains active.');
assert.equal(authPage.render(), 'Native auth and retry UI');
assert.throws(
  () => registerOnlineBackend({ getBackend: () => undefined }),
  /bundled content editor Proxy backend is unavailable/,
);
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
  'PASS: admin return/website URLs, bundled backend React runtime, publication states, stale-editor revisions, successful-save advancement and metadata-only media.',
);
