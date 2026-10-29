import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { createTaxonomyAdminHandler } from './taxonomy-admin-api.mjs';
import {
  sortTaxonomyRecords,
  reorderTaxonomyRecords,
  reorderSharedTaxonomyRecords,
} from '../src/admin/group-manager.js';
import {
  validateTaxonomy,
  getTaxonomyGroups,
  matchesTaxonomyProduct,
  matchesTaxonomyArticle,
  matchesTaxonomyArticleGroup,
} from '../src/lib/taxonomy-model.mjs';

const clone = (value) => structuredClone(value);
const placement = (order = 0) => ({ visible: true, order });
const category = (slug) => ({
  slug,
  name: slug.replaceAll('-', ' '),
  shortDescription: 'Category summary.',
  description: 'Category description.',
  image: '/images/categories/fixture.png',
});
const item = (slug, category, type, order = 0) => ({
  slug,
  name: slug.toUpperCase(),
  category,
  ...(type ? { type } : {}),
  products: placement(order),
  articles: placement(order),
});
const group = (slug, items, order = 0) => ({
  slug,
  name: slug.replaceAll('-', ' '),
  description: 'Product family description.',
  icon: 'M3 3h18v18H3Z',
  products: placement(order),
  articles: placement(order),
  items,
});
const original = {
  version: 1,
  categories: ['circuit-breaker', 'surge-protector-device', 'fire-suppression', 'unused'].map(
    category,
  ),
  groups: [
    group('circuit-protection', [
      item('mcb', 'circuit-breaker', 'MCB'),
      item('mccb', 'circuit-breaker', 'MCCB', 1),
      item('rccb', 'circuit-breaker', 'RCCB', 2),
      item('surge-protector', 'surge-protector-device', undefined, 3),
    ]),
    group(
      'solar-pv-components',
      [
        item('dc-circuit-breaker', 'circuit-breaker', 'DC'),
        item('dc-surge-protector', 'surge-protector-device', 'DC', 1),
      ],
      1,
    ),
    group('fire-suppression', [item('aerosol', 'fire-suppression')], 2),
    group('unused-group', [item('unused-item', 'unused')], 3),
  ],
};
const reorderFixture = [
  group('a', [], 1),
  { ...group('b', [], 2), products: { visible: false, order: 2 } },
  group('c', [], 3),
  { ...group('retired', [], 4), deletedAt: '2026-10-27T00:00:00.000Z' },
];
const reorderOriginal = clone(reorderFixture);
const reordered = reorderTaxonomyRecords(reorderFixture, 'products', 'c', 'a');
assert.deepEqual(
  sortTaxonomyRecords(reordered, 'products').map(({ slug }) => slug),
  ['c', 'a', 'b', 'retired'],
);
assert.deepEqual(
  reordered.map(({ articles }) => articles),
  reorderOriginal.map(({ articles }) => articles),
);
assert.deepEqual(reordered.at(-1), reorderOriginal.at(-1));
assert.deepEqual(
  reorderFixture,
  reorderOriginal,
  'Reordering must preserve its input and include hidden siblings',
);
validateTaxonomy(original);
const shared = reorderSharedTaxonomyRecords(reorderFixture, 'c', 'a');
assert.deepEqual(
  sortTaxonomyRecords(shared, 'products').map(({ slug }) => slug),
  ['c', 'a', 'b', 'retired'],
);
assert.deepEqual(
  sortTaxonomyRecords(shared, 'articles').map(({ slug }) => slug),
  ['c', 'a', 'b', 'retired'],
);
assert.deepEqual(
  shared.at(-1),
  reorderOriginal.at(-1),
  'Shared moves must preserve deleted records',
);
assert.deepEqual(
  shared.map(({ products }) => products.visible),
  reorderOriginal.map(({ products }) => products.visible),
  'Shared moves must retain independent visibility',
);
assert.deepEqual(reorderFixture, reorderOriginal, 'Shared moves must not mutate their input');
assert.equal(reorderSharedTaxonomyRecords(reorderFixture, 'missing', 'a'), reorderFixture);
const selected = clone(original);
selected.groups[0].products.visible = false;
selected.groups[1].articles.order = 5;
selected.groups[2].articles.order = 0;
selected.groups[1].items[0].articles.visible = false;
assert(!getTaxonomyGroups(selected, 'products').some(({ slug }) => slug === 'circuit-protection'));
assert.equal(getTaxonomyGroups(selected, 'articles')[0].slug, 'circuit-protection');
assert.equal(getTaxonomyGroups(selected, 'articles')[1].slug, 'fire-suppression');
assert.equal(getTaxonomyGroups(selected, 'articles').at(-1).items[0].slug, 'dc-surge-protector');
assert.equal(getTaxonomyGroups(selected, 'products', false).length, 4);
assert.equal(
  selected.groups[1].items.length,
  2,
  'Selecting navigation must not mutate the document',
);
assert(
  matchesTaxonomyProduct(
    { categorySlug: 'circuit-breaker', name: '6A MCB' },
    original.groups[0].items[0],
  ),
);
assert(
  !matchesTaxonomyProduct(
    { categorySlug: 'circuit-breaker', name: 'MCB', productTypes: ['DC'] },
    original.groups[0].items[0],
  ),
);
assert(
  matchesTaxonomyArticle(
    { relatedCategorySlug: 'circuit-breaker', tags: ['mcb'] },
    original.groups[0].items[0],
  ),
);
assert(matchesTaxonomyArticleGroup({ relatedCategorySlug: 'circuit-breaker' }, original.groups[0]));
assert(
  !matchesTaxonomyArticleGroup({ relatedCategorySlug: 'circuit-breaker' }, original.groups[1]),
);
assert(!matchesTaxonomyProduct({}, original.groups[0].items[0]));
assert(!matchesTaxonomyArticle({}, original.groups[0].items[0]));
const invalid = clone(original);
invalid.groups[0].items.push(clone(invalid.groups[0].items[0]));
assert.throws(() => validateTaxonomy(invalid));
const malformed = clone(original);
malformed.groups[0].items[0].category = 'unknown';
assert.throws(() => validateTaxonomy(malformed));

const tempParent = await fs.realpath(os.tmpdir());
const root = await fs.mkdtemp(path.join(tempParent, 'soltree-taxonomy-api-'));
const source = path.join(root, 'src/content/settings/taxonomy.json');
const originalRaw = `${JSON.stringify(original, null, 2)}\n`;
await fs.mkdir(path.dirname(source), { recursive: true });
await fs.writeFile(source, originalRaw);
const imageDirectory = path.join(root, 'public/images/categories');
await fs.mkdir(imageDirectory, { recursive: true });
await fs.writeFile(path.join(imageDirectory, 'fixture.png'), 'Existing image fixture');
await fs.writeFile(path.join(imageDirectory, 'alternate.png'), 'Alternate image fixture');
await fs.mkdir(path.join(imageDirectory, 'directory.png'));
const outsideImages = path.join(root, 'outside-images');
await fs.mkdir(outsideImages);
await fs.writeFile(path.join(outsideImages, 'outside.png'), 'Outside image fixture');
await fs.symlink(
  outsideImages,
  path.join(root, 'public/images/linked'),
  process.platform === 'win32' ? 'junction' : 'dir',
);
const products = [
  {
    id: 'P1',
    name: '6A MCB',
    categorySlug: 'circuit-breaker',
    additionalCategorySlugs: ['surge-protector-device'],
    published: true,
  },
  {
    id: 'P2',
    name: 'DC Breaker',
    categorySlug: 'circuit-breaker',
    productTypes: ['DC'],
    published: true,
  },
  { id: 'P3', name: 'MCCB draft', categorySlug: 'circuit-breaker', published: false },
  {
    id: 'P4',
    name: 'RCCB trash',
    categorySlug: 'circuit-breaker',
    published: false,
    deletedAt: '2026-10-27T00:00:00.000Z',
  },
];
const articles = [
  { slug: 'general-guide', relatedCategorySlug: 'circuit-breaker', published: true },
  {
    slug: 'draft-mcb-guide',
    relatedCategorySlug: 'circuit-breaker',
    tags: ['MCB'],
    published: false,
  },
  {
    slug: 'dc-guide',
    relatedCategorySlug: 'circuit-breaker',
    relatedProductTypes: ['DC'],
    published: true,
  },
  {
    slug: 'deleted-mccb-guide',
    relatedCategorySlug: 'circuit-breaker',
    tags: ['MCCB'],
    published: true,
    deletedAt: '2026-10-27T00:00:00.000Z',
  },
];
const pages = [{ href: '/solutions/aerosol', groupSlug: 'fire-suppression', topics: ['aerosol'] }];
for (const [collection, rows] of [
  ['products', products],
  ['articles', articles],
]) {
  const folder = path.join(root, 'src/content', collection);
  await fs.mkdir(folder, { recursive: true });
  await Promise.all(
    rows.map((record, index) =>
      fs.writeFile(path.join(folder, `${index}.json`), JSON.stringify(record)),
    ),
  );
}
const handler = createTaxonomyAdminHandler({ root, getLandingPages: async () => pages });
const server = http.createServer((req, res) => {
  req.url = req.url.replace(/^\/__cms\/taxonomy/, '') || '/';
  void handler(req, res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const site = `http://127.0.0.1:${server.address().port}`;
const endpoint = `${site}/__cms/taxonomy`;
async function read() {
  const response = await fetch(endpoint);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow');
  return response.json();
}
async function save(current, taxonomy, options = {}) {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Origin: site, 'Content-Type': 'application/json', ...options.headers },
    body: JSON.stringify({ revision: current.revision, taxonomy }),
  });
  return { status: response.status, data: await response.json() };
}
async function rejected(current, edit, status) {
  const candidate = clone(current.taxonomy);
  edit(candidate);
  const result = await save(current, candidate);
  assert.equal(result.status, status, result.data.error);
  assert.equal(
    (await read()).revision,
    current.revision,
    'Rejected changes must not modify the source',
  );
}
try {
  let current = await read();
  assert.deepEqual(current.taxonomy, original);
  assert.deepEqual(
    current.counts.groups['circuit-protection'],
    { products: 1, articles: 2 },
    'Count each record once, preserve general breaker article membership',
  );
  assert.deepEqual(current.counts.groups['solar-pv-components'], { products: 1, articles: 1 });
  assert.deepEqual(current.counts.items['circuit-protection/mcb'], { products: 1, articles: 0 });
  assert.deepEqual(current.counts.items['circuit-protection/rccb'], { products: 0, articles: 0 });
  assert.equal(
    current.usage.items['circuit-protection/rccb'].products,
    1,
    'Trash references still protect taxonomy identities',
  );
  assert.equal(current.usage.items['circuit-protection/mccb'].articles, 1);
  assert.equal(
    current.usage.items['circuit-protection/mcb'].articles,
    1,
    'Draft references still protect identities',
  );
  assert.equal(
    current.usage.categories['surge-protector-device'].products,
    1,
    'Include secondary product categories',
  );
  assert.equal(current.usage.groups['fire-suppression'].landingPages, 1);
  assert.equal(current.usage.items['fire-suppression/aerosol'].deletable, false);
  assert.equal(current.usage.categories['fire-suppression'].landingPages, 1);
  assert.equal(current.usage.groups['unused-group'].deletable, true);
  assert.equal(
    current.usage.categories.unused.deletable,
    false,
    'Retire attached unused topics before their category',
  );
  assert.equal(
    (await save(current, current.taxonomy, { headers: { Origin: 'https://foreign.example' } }))
      .status,
    403,
  );
  assert.equal(
    (
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      })
    ).status,
    403,
  );
  const foreignHostStatus = await new Promise((resolve, reject) => {
    http
      .get(endpoint, { headers: { Host: 'foreign.example' } }, (response) => {
        response.resume();
        response.once('end', () => resolve(response.statusCode));
      })
      .once('error', reject);
  });
  assert.equal(foreignHostStatus, 403);
  assert.equal(
    (
      await fetch(endpoint, {
        method: 'POST',
        headers: { Origin: site, 'Content-Type': 'application/json' },
        body: JSON.stringify({ padding: 'x'.repeat(262_144) }),
      })
    ).status,
    413,
  );
  await rejected(current, (doc) => doc.groups.pop(), 422);
  await rejected(current, (doc) => doc.categories.pop(), 422);
  await rejected(current, (doc) => doc.groups[0].items.pop(), 422);
  await rejected(
    current,
    (doc) => {
      const missing = category('missing-image');
      missing.image = '/images/categories/missing.png';
      doc.categories.push(missing);
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.categories[0].image = '/images/categories/directory.png';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.categories[0].image = '/images/linked/outside.png';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items[0].slug = 'renamed';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items[0].category = 'unused';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items[0].type = 'DC';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].name = '<script>';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items.push(clone(doc.groups[0].items[0]));
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items[0].category = 'missing';
    },
    422,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].deletedAt = new Date().toISOString();
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items[1].deletedAt = new Date().toISOString();
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[0].items[2].deletedAt = new Date().toISOString();
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[2].items[0].deletedAt = new Date().toISOString();
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups[2].deletedAt = new Date().toISOString();
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.categories[0].deletedAt = new Date().toISOString();
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.categories.at(-1).deletedAt = new Date().toISOString();
    },
    409,
  );

  const edited = clone(current.taxonomy);
  edited.groups[0].name = 'Electrical Protection';
  edited.groups[0].products.visible = false;
  edited.groups[0].articles.order = 7;
  edited.groups[0].items[0].name = 'Miniature Circuit Breakers';
  edited.groups[0].items[0].products.visible = false;
  edited.groups[0].items[1].products.order = 10;
  edited.categories[0].name = 'Circuit Breaker Updated';
  edited.categories[0].image = '/images/categories/alternate.png';
  let result = await save(current, edited);
  assert.equal(result.status, 200, result.data.error);
  const stale = current;
  current = result.data;
  assert.equal(current.taxonomy.groups[0].slug, 'circuit-protection');
  assert.equal(current.taxonomy.groups[0].items[0].slug, 'mcb', 'Labels must not alter topic URLs');
  assert.equal(current.taxonomy.categories[0].slug, 'circuit-breaker');
  assert.deepEqual(
    current.counts,
    stale.counts,
    'Visibility and labels must not change membership counts',
  );
  assert.equal(getTaxonomyGroups(current.taxonomy, 'articles').at(-1).slug, 'circuit-protection');
  assert.equal((await save(stale, stale.taxonomy)).status, 409);
  const backupFolders = await fs.readdir(path.join(root, '.content-backups'));
  assert.equal(backupFolders.length, 1);
  assert.equal(
    await fs.readFile(
      path.join(root, '.content-backups', backupFolders[0], 'src/content/settings/taxonomy.json'),
      'utf8',
    ),
    originalRaw,
  );

  const added = clone(current.taxonomy);
  added.categories.push(category('new-category'));
  added.groups.push(group('new-group', [item('new-item', 'new-category')], 4));
  result = await save(current, added);
  assert.equal(result.status, 200, result.data.error);
  current = result.data;
  assert.equal(current.taxonomy.groups.at(-1).items[0].category, 'new-category');
  assert.deepEqual(current.counts.groups['new-group'], { products: 0, articles: 0 });
  const retired = clone(current.taxonomy);
  retired.groups.at(-1).deletedAt = '2000-01-01T00:00:00.000Z';
  retired.groups.at(-1).items[0].deletedAt = '2000-01-01T00:00:00.000Z';
  retired.categories.at(-1).deletedAt = '2000-01-01T00:00:00.000Z';
  result = await save(current, retired);
  assert.equal(result.status, 200, result.data.error);
  current = result.data;
  assert.notEqual(
    current.taxonomy.groups.at(-1).deletedAt,
    retired.groups.at(-1).deletedAt,
    'Deletion timestamps come from the server',
  );
  assert.equal(current.taxonomy.groups.at(-1).products.visible, false);
  assert.equal(current.taxonomy.groups.at(-1).items[0].articles.visible, false);
  assert.equal(
    getTaxonomyGroups(current.taxonomy, 'products', false).length,
    5,
    'Soft deletion retains historical routes',
  );
  await rejected(
    current,
    (doc) => {
      delete doc.groups.at(-1).items[0].deletedAt;
    },
    409,
  );
  await rejected(
    current,
    (doc) => {
      doc.groups.at(-1).items.push(item('another-item', 'new-category'));
    },
    409,
  );
  const restored = clone(current.taxonomy);
  delete restored.groups.at(-1).deletedAt;
  delete restored.groups.at(-1).items[0].deletedAt;
  delete restored.categories.at(-1).deletedAt;
  result = await save(current, restored);
  assert.equal(result.status, 200, result.data.error);
  current = result.data;
  assert(!Object.hasOwn(current.taxonomy.groups.at(-1), 'deletedAt'));
  assert(!Object.hasOwn(current.taxonomy.groups.at(-1).items[0], 'deletedAt'));
  assert(!Object.hasOwn(current.taxonomy.categories.at(-1), 'deletedAt'));
  assert.equal(
    current.taxonomy.groups.at(-1).products.visible,
    false,
    'Restore keeps retired navigation hidden until explicitly shown',
  );
  const first = clone(current.taxonomy);
  const second = clone(current.taxonomy);
  first.groups.at(-1).name = 'First simultaneous edit';
  second.groups.at(-1).name = 'Second simultaneous edit';
  const parallel = await Promise.all([save(current, first), save(current, second)]);
  assert.deepEqual(parallel.map(({ status }) => status).sort(), [200, 409]);
  assert.equal((await fs.readdir(path.join(root, '.content-backups'))).length, 5);
  assert.equal(
    (await fs.readdir(path.dirname(source))).filter((name) => name.includes('.tmp-')).length,
    0,
  );
  for (const [collection, rows] of [
    ['products', products],
    ['articles', articles],
  ]) {
    for (const [index, record] of rows.entries())
      assert.deepEqual(
        JSON.parse(
          await fs.readFile(path.join(root, 'src/content', collection, `${index}.json`), 'utf8'),
        ),
        record,
        'Taxonomy saves must never rewrite product/article IDs, URLs or content',
      );
  }
  console.log(
    'PASS: taxonomy model/API, visibility/order, stable URLs, exact membership counts, draft/trash/landing references, local origin, revisions, backups, recoverable retirement and new categories/topics.',
  );
} finally {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  const resolved = await fs.realpath(root);
  assert.equal(path.dirname(resolved).toLowerCase(), tempParent.toLowerCase());
  assert(path.basename(resolved).startsWith('soltree-taxonomy-api-'));
  await fs.rm(resolved, { recursive: true, force: true });
}
