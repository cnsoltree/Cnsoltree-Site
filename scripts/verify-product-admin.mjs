import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { createProductAdminHandler, createArticleAdminHandler } from './product-admin-api.mjs';
import {
  filterProductRows,
  formatProductDate,
  normalizeProductListState,
} from '../src/admin/product-table.js';

const rows = [
  { id: 'MCB-A', name: 'Circuit Breaker', categorySlug: 'circuit-breaker', published: true },
  { id: 'ATS-B', name: 'Transfer Switch', categorySlug: 'ats-dual-power-switch', published: false },
  {
    id: 'MCB-C',
    name: 'Deleted Breaker',
    categorySlug: 'circuit-breaker',
    published: false,
    deletedAt: '2026-10-27T17:05:00.000Z',
  },
];
assert.deepEqual(
  filterProductRows(rows).map((row) => row.id),
  ['MCB-A', 'ATS-B'],
);
assert.deepEqual(
  filterProductRows(rows, { query: 'mcb' }).map((row) => row.id),
  ['MCB-A'],
);
assert.deepEqual(
  filterProductRows(rows, { category: 'ats-dual-power-switch' }).map((row) => row.id),
  ['ATS-B'],
);
assert.deepEqual(
  filterProductRows(rows, { status: 'published' }).map((row) => row.id),
  ['MCB-A'],
);
assert.deepEqual(
  filterProductRows(rows, { status: 'draft' }).map((row) => row.id),
  ['ATS-B'],
);
assert.deepEqual(
  filterProductRows(rows, { status: 'trash' }).map((row) => row.id),
  ['MCB-C'],
);
assert.equal(formatProductDate(undefined), null);
assert.equal(formatProductDate('invalid-date'), null);
assert.deepEqual(formatProductDate('2026-04-27'), { date: '2026-04-27', time: '' });
assert.deepEqual(formatProductDate('2026-10-27T17:05:00.000Z'), {
  date: '2026-10-27',
  time: '10:05',
});
const listState = {
  query: 'MCB',
  category: 'circuit-breaker',
  status: 'draft',
  pageSize: 50,
  page: 2,
};
assert.deepEqual(normalizeProductListState(listState), listState);
assert.deepEqual(
  normalizeProductListState({ category: '../invalid', status: 'unknown', pageSize: 0, page: -1 }),
  normalizeProductListState(),
);
assert.equal(normalizeProductListState({ query: 'x'.repeat(300) }).query.length, 256);
const articleRows = [
  { id: 'aerosol-guide', title: 'Electrical Cabinet Fire Guide', published: false },
];
assert.equal(filterProductRows(articleRows, { query: 'cabinet', status: 'draft' }).length, 1);
assert.equal(filterProductRows(articleRows, { query: 'aerosol' }).length, 1);
assert.equal(filterProductRows(articleRows, { status: 'published' }).length, 0);

const tempParent = await fs.realpath(os.tmpdir());
const root = await fs.mkdtemp(path.join(tempParent, 'soltree-product-api-'));
const folder = path.join(root, 'src/content/products');
await fs.mkdir(folder, { recursive: true });
const original = {
  id: 'MCB-LEGACY',
  name: 'Legacy MCB',
  categorySlug: 'circuit-breaker',
  categoryName: 'Circuit Breaker',
  image: '/images/products/case-cover.jpg',
  published: false,
  metaTitle: 'Original SEO title',
  features: ['Keep commas, exactly'],
  specs: [{ name: 'Voltage', value: '230V' }],
  images: ['/images/original.png'],
  customData: { keep: true },
};
const filename = path.join(folder, 'mcb-legacy.json');
const coverDirectory = path.join(root, 'public/images/products');
await fs.mkdir(coverDirectory, { recursive: true });
await fs.writeFile(
  path.join(coverDirectory, 'CASE-COVER.JPG'),
  'Case-sensitive image-path fixture',
);
const originalRaw = `${JSON.stringify(original, null, 2)}\n`;
await fs.writeFile(filename, originalRaw);
await fs.writeFile(
  path.join(folder, 'invalid-draft.json'),
  JSON.stringify({ id: 'invalid-draft', published: false }),
);
const articleFolder = path.join(root, 'src/content/articles');
await fs.mkdir(articleFolder, { recursive: true });
const article = {
  slug: 'circuit-breaker-guide',
  title: 'Circuit Breaker Selection Guide',
  relatedCategorySlug: 'circuit-breaker',
  excerpt: 'An article fixture.',
  content: '## Selection\n\nKeep the original article body.\n',
  image: original.image,
  date: '2026-05-01',
  author: 'Original Author',
  tags: ['MCB', 'Selection'],
  readingTime: 2,
  published: false,
  metaTitle: 'Original article SEO title',
  customData: { preserve: true },
};
const articleFile = path.join(articleFolder, `${article.slug}.json`);
const articleRaw = `${JSON.stringify(article, null, 2)}\n`;
await fs.writeFile(articleFile, articleRaw);
await fs.writeFile(
  path.join(articleFolder, 'invalid-article.json'),
  JSON.stringify({ slug: 'invalid-article', published: false }),
);
let categoryName = 'Circuit Breaker';
const handler = createProductAdminHandler({
  root,
  getCategories: async () => [
    { slug: 'circuit-breaker', name: categoryName, internal: 'not returned' },
  ],
  validateProduct: async (record) => {
    if (!record.name || !record.image || !record.categorySlug) throw new Error('Missing content');
  },
});
const articleHandler = createArticleAdminHandler({
  root,
  getCategories: async () => [{ slug: 'circuit-breaker', name: 'Circuit Breaker' }],
  validateArticle: async (record) => {
    if (!record.title || !record.content || !record.relatedCategorySlug || !record.date)
      throw new Error('Missing article content');
  },
});
const server = http.createServer((req, res) => {
  if (req.url.startsWith('/__cms/articles')) {
    req.url = req.url.replace(/^\/__cms\/articles/, '') || '/';
    void articleHandler(req, res);
    return;
  }
  req.url = req.url.replace(/^\/__cms\/products/, '') || '/';
  void handler(req, res);
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const site = `http://127.0.0.1:${server.address().port}`;
async function list(collection = 'products') {
  const response = await fetch(`${site}/__cms/${collection}`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  return response.json();
}
async function action(product, operation, options = {}) {
  const response = await fetch(`${site}/__cms/${options.collection ?? 'products'}`, {
    method: 'POST',
    headers: { Origin: options.origin ?? site, 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: product.id, revision: product.revision, action: operation }),
  });
  return { status: response.status, data: await response.json() };
}
try {
  let all = await list();
  assert.equal(all.products.length, 2);
  assert.deepEqual(all.categories, [{ slug: 'circuit-breaker', name: 'Circuit Breaker' }]);
  let product = all.products.find((record) => record.id === original.id);
  assert.equal(
    product.image,
    '/images/products/CASE-COVER.JPG',
    'Table thumbnails must use the actual on-disk filename case',
  );
  assert.equal(
    JSON.parse(await fs.readFile(filename, 'utf8')).image,
    original.image,
    'Resolving thumbnail URLs must not rewrite source content',
  );
  assert.equal(product.entryKey, 'mcb-legacy');
  assert.equal(product.createdAt, null);
  assert.equal(product.updatedAt, null);
  assert.equal(
    (await action(product, 'publish', { origin: 'https://foreign.example' })).status,
    403,
  );
  const noOrigin = await fetch(`${site}/__cms/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: original.id }),
  });
  assert.equal(noOrigin.status, 403);
  const oversized = await fetch(`${site}/__cms/products`, {
    method: 'POST',
    headers: { Origin: site, 'Content-Type': 'application/json' },
    body: JSON.stringify({ padding: 'x'.repeat(16_384) }),
  });
  assert.equal(oversized.status, 413);
  const invalid = all.products.find((record) => record.id === 'invalid-draft');
  assert.equal((await action(invalid, 'publish')).status, 422);
  assert.equal(
    JSON.parse(await fs.readFile(path.join(folder, 'invalid-draft.json'), 'utf8')).published,
    false,
  );
  const oldRevision = product.revision;
  let result = await action(product, 'publish');
  assert.equal(result.status, 200);
  product = result.data.product;
  assert.equal(product.image, '/images/products/CASE-COVER.JPG');
  assert.equal(product.published, true);
  assert.equal(product.createdAt, null, 'Legacy creation time must not be fabricated');
  assert(Number.isFinite(Date.parse(product.updatedAt)));
  assert.notEqual(product.revision, oldRevision);
  const stored = JSON.parse(await fs.readFile(filename, 'utf8'));
  for (const key of ['metaTitle', 'features', 'specs', 'images', 'customData'])
    assert.deepEqual(stored[key], original[key]);
  assert.equal((await action({ ...product, revision: oldRevision }, 'delete')).status, 409);
  categoryName = 'Updated Circuit Protection';
  assert.equal(
    (await list()).products.find((record) => record.id === original.id).categoryName,
    categoryName,
    'Taxonomy category label edits must update existing product rows without rewriting products',
  );
  result = await action(product, 'unpublish');
  assert.equal(result.status, 200);
  product = result.data.product;
  assert.equal(
    product.categoryName,
    categoryName,
    'Action responses must use the current category label',
  );
  assert.equal(product.published, false);
  result = await action(product, 'delete');
  assert.equal(result.status, 200);
  product = result.data.product;
  assert(Number.isFinite(Date.parse(product.deletedAt)));
  assert.equal((await action(product, 'publish')).status, 409);
  result = await action(product, 'restore');
  assert.equal(result.status, 200);
  product = result.data.product;
  assert.equal(product.published, false);
  assert.equal(product.deletedAt, null);
  assert(!Object.hasOwn(JSON.parse(await fs.readFile(filename, 'utf8')), 'deletedAt'));
  const backups = await fs.readdir(path.join(root, '.content-backups'));
  assert.equal(backups.length, 4);
  const publishBackup = backups.find((name) => name.includes('-publish-'));
  assert.equal(
    await fs.readFile(
      path.join(root, '.content-backups', publishBackup, 'src/content/products/mcb-legacy.json'),
      'utf8',
    ),
    originalRaw,
  );
  // Concurrent row actions cannot both commit the same revision.
  const concurrent = await Promise.all([action(product, 'publish'), action(product, 'delete')]);
  assert.deepEqual(concurrent.map((response) => response.status).sort(), [200, 409]);

  const articles = await list('articles');
  assert.equal(articles.articles.length, 2);
  let articleRow = articles.articles.find((record) => record.slug === article.slug);
  assert.equal(articleRow.id, article.slug, 'Article IDs must be real slugs');
  assert.equal(articleRow.entryKey, article.slug);
  assert.equal(articleRow.title, article.title);
  assert.equal(articleRow.image, '/images/products/CASE-COVER.JPG');
  assert.equal(articleRow.categorySlug, article.relatedCategorySlug);
  assert.equal(articleRow.categoryName, 'Circuit Breaker');
  assert.equal(articleRow.date, article.date);
  assert.equal(articleRow.dateModified, null, 'Do not manufacture historical modification dates');
  assert(!Object.hasOwn(articleRow, 'createdAt'));
  const articleAction = (record, operation, options = {}) =>
    action(record, operation, { ...options, collection: 'articles' });
  assert.equal(
    (await articleAction(articleRow, 'publish', { origin: 'https://foreign.example' })).status,
    403,
  );
  const invalidArticle = articles.articles.find((record) => record.id === 'invalid-article');
  assert.equal((await articleAction(invalidArticle, 'publish')).status, 422);
  const originalArticleRevision = articleRow.revision;
  let articleResult = await articleAction(articleRow, 'publish');
  assert.equal(articleResult.status, 200);
  articleRow = articleResult.data.article;
  assert.equal(articleRow.published, true);
  assert.equal(articleRow.date, article.date);
  assert(Number.isFinite(Date.parse(articleRow.dateModified)));
  const storedArticle = JSON.parse(await fs.readFile(articleFile, 'utf8'));
  for (const key of [
    'slug',
    'date',
    'title',
    'content',
    'author',
    'tags',
    'metaTitle',
    'customData',
  ])
    assert.deepEqual(storedArticle[key], article[key]);
  assert.equal(
    (await articleAction({ ...articleRow, revision: originalArticleRevision }, 'delete')).status,
    409,
  );
  articleResult = await articleAction(articleRow, 'unpublish');
  assert.equal(articleResult.status, 200);
  articleRow = articleResult.data.article;
  assert.equal(articleRow.published, false);
  articleResult = await articleAction(articleRow, 'delete');
  assert.equal(articleResult.status, 200);
  articleRow = articleResult.data.article;
  assert(Number.isFinite(Date.parse(articleRow.deletedAt)));
  assert.equal((await articleAction(articleRow, 'publish')).status, 409);
  articleResult = await articleAction(articleRow, 'restore');
  assert.equal(articleResult.status, 200);
  articleRow = articleResult.data.article;
  assert.equal(articleRow.deletedAt, null);
  assert.equal(articleRow.published, false);
  assert.equal(articleRow.date, article.date);
  assert.equal(articleRow.slug, article.slug);
  assert(!Object.hasOwn(JSON.parse(await fs.readFile(articleFile, 'utf8')), 'deletedAt'));
  const allBackups = await fs.readdir(path.join(root, '.content-backups'));
  const articleBackups = [];
  for (const backup of allBackups) {
    const file = path.join(
      root,
      '.content-backups',
      backup,
      'src/content/articles',
      `${article.slug}.json`,
    );
    if (
      await fs.access(file).then(
        () => true,
        () => false,
      )
    )
      articleBackups.push({ backup, file });
  }
  assert.equal(articleBackups.length, 4);
  assert.equal(
    await fs.readFile(
      articleBackups.find(({ backup }) => backup.includes('-publish-')).file,
      'utf8',
    ),
    articleRaw,
  );
  console.log(
    'PASS: product/article table APIs, origin protection, publication validation, revisions, recoverable deletion, preserved metadata/slugs/publication dates, honest timestamps and backups.',
  );
} finally {
  server.closeAllConnections();
  await new Promise((resolve) => server.close(resolve));
  const resolved = await fs.realpath(root);
  assert.equal(path.dirname(resolved).toLowerCase(), tempParent.toLowerCase());
  assert(path.basename(resolved).startsWith('soltree-product-api-'));
  await fs.rm(resolved, { recursive: true, force: true });
}
