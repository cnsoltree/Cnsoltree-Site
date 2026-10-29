import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import ts from 'typescript';
import postcss from 'postcss';
import { is as matchesSelector } from 'css-select';
import { Element } from 'domhandler';
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
import {
  registerArticleCategory,
  registerAdditionalCategories,
} from '../src/admin/article-category.js';
import { registerArticleTags } from '../src/admin/article-tags.js';
import { articleSummary, articleExcerpt } from '../src/lib/article-excerpt.mjs';

assert.equal(
  articleSummary({
    metaDescription: 'Chosen description',
    content: 'Fallback paragraph.',
    excerpt: 'Old summary',
  }),
  'Chosen description',
);
assert.equal(
  articleSummary({
    metaDescription: '',
    content:
      '## Heading\n\n![Cover](/images/test.png)\n\nFirst **body** paragraph.\n\nSecond paragraph.',
  }),
  'First body paragraph.',
);
assert.equal(
  articleExcerpt(
    '<!-- soltree-richtext --><h2>Heading</h2><p><img src="x"></p><p>Hello <strong>world</strong> &amp; friends.</p>',
  ),
  'Hello world & friends.',
);
assert.equal(articleExcerpt('```js\nconsole.log(1)\n```'), '');
let tagControl;
registerArticleTags(
  {
    registerWidget: (_name, control) => {
      tagControl = control;
    },
  },
  (tag, props, ...children) => ({ tag, props, children }),
  (control) => control,
);
const tagWidget = {
  ...tagControl,
  state: tagControl.getInitialState(),
  setState(update) {
    this.state = { ...this.state, ...update };
  },
  props: {
    value: [],
    onChange(value) {
      tagWidget.props.value = value;
    },
  },
};
tagWidget.setState({ draft: '  Solar PV  ' });
tagWidget.add();
tagWidget.setState({ draft: 'solar pv' });
tagWidget.add();
assert.deepEqual(tagWidget.tags(), ['Solar PV']);
tagWidget.setState({ draft: '中文输入' });
let prevented = false;
tagWidget.render().children[0].props.onKeyDown({
  key: 'Enter',
  isComposing: true,
  preventDefault() {
    prevented = true;
  },
});
assert.equal(prevented, false);
assert.equal(tagWidget.tags().length, 1);
tagWidget.render().children[0].props.onKeyDown({
  key: 'Enter',
  preventDefault() {
    prevented = true;
  },
});
assert.equal(prevented, true);
assert.deepEqual(tagWidget.tags(), ['Solar PV', '中文输入']);
tagWidget.render().children[1].children[0].children[1].props.onClick();
assert.deepEqual(tagWidget.tags(), ['中文输入']);
import {
  articleDateInput,
  articleDateIso,
  registerArticleDates,
} from '../src/admin/article-dates.js';

assert.equal(articleDateInput('2026-10-29T13:31:00.000Z'), '2026-10-29T06:31');
assert.equal(articleDateInput('2026-04-27'), '2026-04-27T00:00');
assert.equal(articleDateInput(''), '');
assert.equal(articleDateIso('2026-10-29T06:31'), '2026-10-29T13:31:00.000Z');
assert.equal(articleDateIso('2026-01-15T06:31'), '2026-01-15T14:31:00.000Z');
assert.equal(articleDateIso('2026-03-08T02:30'), null);
assert.equal(articleDateIso('2026-02-30T12:00'), null);
const dateWidgets = {};
registerArticleDates(
  {
    registerWidget: (name, control) => {
      dateWidgets[name] = control;
    },
  },
  (_tag, props) => props,
  (control) => control,
);
assert.equal(dateWidgets['readonly-time'].render.call({ props: { value: '' } }).readOnly, true);
let dateWrites = 0;
dateWidgets['article-time'].componentDidMount.call({
  props: {
    value: '2026-04-27',
    getEntry: () => new Map([['newRecord', false]]),
    onChange: () => dateWrites++,
  },
});
assert.equal(dateWrites, 0, 'Opening an existing date must not rewrite it.');

// Markdown's RawEditorContainer must stay in document flow inside the fixed editor shell.
const rawEditor = new Element('div', { class: 'css-test-RawEditorContainer e12tj7710' });
const markdown = new Element('div', { class: 'cms-editor-raw' }, [rawEditor]);
const editorShell = new Element('div', { class: 'css-test-EditorContainer e1nx103k5' }, [markdown]);
const cmsRoot = new Element('div', { id: 'nc-root' }, [editorShell]);
const editorBody = new Element('body', { class: 'soltree-admin', 'data-editor': 'article' }, [
  cmsRoot,
]);
for (const parent of [editorBody, cmsRoot, editorShell, markdown])
  for (const child of parent.children) child.parent = parent;
const theme = postcss.parse(
  await fs.readFile(new URL('../src/admin/theme.css', import.meta.url), 'utf8'),
);
let fixedShell = false;
let fixedMarkdown = false;
theme.walkRules((rule) => {
  if (!rule.nodes.some((node) => node.prop === 'position' && node.value === 'fixed')) return;
  if (matchesSelector(editorShell, rule.selector)) fixedShell = true;
  if (matchesSelector(rawEditor, rule.selector)) fixedMarkdown = true;
});
assert(!fixedMarkdown, 'Markdown must not inherit the fixed editor-shell layout.');
assert(fixedShell, 'The outer editor must retain its fixed workspace layout.');

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
const articleFields = cmsConfig.collections.find((item) => item.name === 'articles').fields;
const productFields = cmsConfig.collections.find((item) => item.name === 'products').fields;
assert.equal(productFields.find((field) => field.name === 'images').widget, 'product-gallery');
assert.equal(productFields.find((field) => field.name === 'image').widget, 'hidden');
assert.equal(productFields.find((field) => field.name === 'imageAlts').widget, 'hidden');
const productCategoryField = productFields.find((field) => field.name === 'categorySlug');
assert.equal(productCategoryField.widget, 'article-category');
assert.equal(productCategoryField.required, false);
assert.equal(productFields.find((field) => field.name === 'productTypes').widget, 'hidden');
assert(
  productCategoryField.groups.some((group) =>
    group.options.some((option) => option.value === 'circuit-breaker'),
  ),
);
assert(!articleFields.some((field) => field.name === 'excerpt'));
assert.equal(articleFields.find((field) => field.name === 'tags').widget, 'article-tags');
assert.equal(articleFields.find((field) => field.name === 'date').widget, 'article-time');
assert.equal(articleFields.find((field) => field.name === 'date').required, true);
assert.equal(articleFields.find((field) => field.name === 'metaTitle').label, 'Meta Title');
assert.equal(
  articleFields.find((field) => field.name === 'metaDescription').label,
  'Meta Description',
);
assert.equal(articleFields.find((field) => field.name === 'slug').label, '文章网址（URL Slug）');
assert.equal(articleFields.find((field) => field.name === 'focusKeyword').required, false);
assert.equal(articleFields.find((field) => field.name === 'content').widget, 'rich-article');
assert(
  articleFields.findIndex((field) => field.name === 'title') <
    articleFields.findIndex((field) => field.name === 'image'),
);
assert(
  articleFields.findIndex((field) => field.name === 'image') <
    articleFields.findIndex((field) => field.name === 'content'),
);
assert.equal(cmsConfig.backend.name, 'git-gateway');
assert(cmsConfig.local_backend, 'Local mode keeps its existing backend.');
const articleField = cmsConfig.collections
  .find((item) => item.name === 'articles')
  .fields.find((field) => field.name === 'relatedCategorySlug');
assert.equal(articleField.label, '文章分类');
assert.equal(articleField.required, false);
assert.equal(articleField.widget, 'article-category');
let categoryControl;
registerArticleCategory(
  {
    registerWidget(name, control) {
      assert.equal(name, 'article-category');
      categoryControl = control;
    },
  },
  (tag, props, ...children) => ({ tag, props, children }),
  (definition) => definition,
);
const picker = {
  ...categoryControl,
  state: categoryControl.getInitialState(),
  props: {
    field: { get: () => ({ toJS: () => articleField.groups }) },
    value: '',
    forID: 'article-category-test',
    onChange(value) {
      picker.props.value = value;
    },
  },
  setState(state) {
    this.state = { ...this.state, ...state };
  },
};
const controls = () => picker.render().children.map((level) => level.children[1]);
assert.equal(controls()[0].props.value, '');
assert.equal(controls()[1].props.disabled, true);
controls()[0].props.onChange({ target: { value: 'fire-suppression' } });
assert(controls()[1].children.some((option) => option.props.value === 'aerosol-fire-extinguisher'));
assert(!controls()[1].children.some((option) => option.props.value === 'circuit-breaker'));
controls()[1].props.onChange({ target: { value: 'aerosol-fire-extinguisher' } });
assert.equal(picker.props.value, 'aerosol-fire-extinguisher');
picker.state.group = '';
assert.equal(
  controls()[0].props.value,
  'fire-suppression',
  'Existing categories restore their group.',
);
controls()[0].props.onChange({ target: { value: 'solar-pv-components' } });
assert.equal(picker.props.value, '', 'Changing group clears the old category.');
controls()[1].props.onChange({ target: { value: 'pv-combiner-box' } });
assert.equal(
  controls()[0].props.value,
  'solar-pv-components',
  'Shared categories retain the current group.',
);
controls()[0].props.onChange({ target: { value: '' } });
assert.equal(picker.props.value, '');
assert.equal(controls()[1].props.disabled, true);
picker.props.value = 'retired-category';
assert(controls()[1].children.some((option) => option.props.value === 'retired-category'));
assert.equal(
  picker.props.value,
  'retired-category',
  'Opening an old entry never rewrites its category.',
);
const updated = structuredClone(taxonomy);
const additionalField = productFields.at(-1);
assert.equal(additionalField.name, 'additionalCategorySlugs');
assert.equal(additionalField.widget, 'additional-categories');
let additionalControl;
registerAdditionalCategories(
  { registerWidget: (_name, control) => (additionalControl = control) },
  (tag, props, ...children) => ({ tag, props, children }),
  (definition) => definition,
);
const additionalPicker = {
  ...additionalControl,
  props: {
    field: { get: () => ({ toJS: () => additionalField.groups }) },
    value: ['retired-category'],
    onChange(value) {
      additionalPicker.props.value = value;
    },
  },
};
assert.deepEqual(additionalPicker.props.value, ['retired-category']);
const additionalCategory = additionalField.groups[0].options[0].value;
additionalPicker.render().children[0].props.onChange(additionalCategory);
additionalPicker.render().children[0].props.onChange(additionalCategory);
assert.deepEqual(additionalPicker.props.value, ['retired-category', additionalCategory]);
additionalPicker.render().children[0].props.onChange('');
assert.equal(additionalPicker.props.value.length, 2, 'Changing group retains selected categories.');
additionalPicker.render().children[1].children[0].children[1].props.onClick();
assert.deepEqual(additionalPicker.props.value, [additionalCategory]);
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
updated.categories.push({ ...updated.categories.at(-1), slug: 'ungrouped-test' });
updated.groups[1].deletedAt = '2026-10-29T00:00:00.000Z';
configureOnlineCms(updated, origin);
assert.equal(cmsConfig.backend.name, 'soltree-online');
assert.equal(cmsConfig.backend.proxy_url, '/api/admin/proxy');
assert.equal(cmsConfig.local_backend, undefined);
assert.equal(cmsConfig.site_url, origin);
assert.equal(categoryNames['online-test'], 'Online test');
assert.deepEqual(
  additionalField.groups,
  productCategoryField.groups,
  'Supplemental categories refresh from cloud taxonomy.',
);
assert(
  productCategoryField.groups.some((group) =>
    group.options.some((option) => option.value === 'online-test'),
  ),
  'Product cascading categories must refresh from cloud taxonomy too.',
);
assert(
  articleField.groups[0].options.some((item) => item.value === 'online-test'),
  'The cascading picker uses fresh cloud taxonomy, including hidden categories.',
);
assert(!articleField.groups.some((group) => group.slug === updated.groups[1].slug));
assert(
  articleField.groups
    .find((group) => group.slug === '__ungrouped')
    .options.some((option) => option.value === 'ungrouped-test'),
  'Unassigned categories remain selectable.',
);
picker.props.isDisabled = true;
assert(controls().every((control) => control.props.disabled));
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
