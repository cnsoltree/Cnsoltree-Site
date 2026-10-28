import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import {
  initialWorkspaceView,
  workspaceGreeting,
  articleEditorMode,
} from '../src/admin/workspace.js';

assert(initialWorkspaceView(new URL('http://127.0.0.1:4323/admin')));
assert(
  initialWorkspaceView(new URL('http://127.0.0.1:4323/admin?view=workspace#/collections/products')),
);
assert(!initialWorkspaceView(new URL('http://127.0.0.1:4323/admin#/collections/articles')));
assert(
  !initialWorkspaceView(
    new URL('http://127.0.0.1:4323/admin#/collections/products/entries/MCB-AC-1P'),
  ),
);
assert.equal(workspaceGreeting(9), '老板，上午好');
assert.equal(workspaceGreeting(14), '老板，下午好');
assert.equal(workspaceGreeting(20), '老板，晚上好');
assert.equal(articleEditorMode('#/collections/articles/new'), 'new');
assert.equal(articleEditorMode('#/collections/articles/entries/aerosol-guide'), 'edit');
assert.equal(articleEditorMode('#/collections/articles/new?duplicate=true'), 'new');
assert.equal(articleEditorMode('#/collections/articles'), null);
assert.equal(articleEditorMode('#/collections/products/new'), null);

// Run with both `npm run admin` and the Astro development server active.
// Fixtures use reserved filenames and are removed even when an assertion fails.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = 'http://127.0.0.1:4323';
const proxy = 'http://127.0.0.1:8081/api/v1';
const productId = 'CMS-VERIFY-PRODUCT';
const articleSlug = 'cms-verify-article';
const productFile = `src/content/products/${productId}.json`;
const articleFile = `src/content/articles/${articleSlug}.json`;
const mediaFile = 'public/images/uploads/soltree-cms-verify.png';
const optimizedFile = 'src/assets/uploads/soltree-cms-verify.png';
const image = '/images/uploads/soltree-cms-verify.png';
const ownedFiles = [productFile, articleFile, mediaFile, optimizedFile].map((file) => {
  const absolute = path.resolve(root, file);
  assert(absolute.startsWith(`${root}${path.sep}`));
  return absolute;
});

async function present(file) {
  return fs.access(file).then(
    () => true,
    () => false,
  );
}
async function call(action, params, origin = site) {
  return fetch(proxy, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: origin },
    body: JSON.stringify({ action, ...(params ? { params } : {}) }),
    signal: AbortSignal.timeout(12000),
  });
}
async function accepted(action, params) {
  const response = await call(action, params);
  assert.equal(response.status, 200, `Proxy ${action}: ${await response.text()}`);
}
async function save(collection, filename, slug, record) {
  await accepted('persistEntry', {
    branch: 'main',
    dataFiles: [{ path: filename, slug, raw: JSON.stringify(record, null, 2) + '\n' }],
    assets: [],
    options: {
      collectionName: collection,
      commitMessage: 'Temporary local CMS verification fixture',
      useWorkflow: false,
      status: 'draft',
    },
  });
}
async function page(route) {
  const response = await fetch(`${site}${route}`, { signal: AbortSignal.timeout(12000) });
  return { status: response.status, html: await response.text() };
}
async function eventually(check, label, timeout = 20000) {
  const until = Date.now() + timeout;
  let last;
  do {
    try {
      return await check();
    } catch (error) {
      last = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  } while (Date.now() < until);
  throw new Error(`${label}: ${last?.message ?? 'timed out'}`, { cause: last });
}
async function assertDraftAbsent() {
  for (const route of [`/products/${productId}`, `/blog/${articleSlug}`]) {
    assert.equal((await page(route)).status, 404, `Draft has a public route: ${route}`);
  }
  for (const route of ['/products', '/blog', '/sitemap.xml', '/rss.xml']) {
    const { status, html } = await page(route);
    assert.equal(status, 200, route);
    assert(!html.includes(productId), `Draft product leaked into ${route}`);
    assert(!html.includes(articleSlug), `Draft article leaked into ${route}`);
  }
}

assert((await call('info')).ok, 'Start the local CMS proxy before running this check.');
assert.equal((await call('info', undefined, 'https://foreign-origin.example')).status, 403);
const admin = await fetch(`${site}/admin`, { signal: AbortSignal.timeout(12000) });
assert.equal(admin.status, 200, 'Start the Astro development server on 127.0.0.1:4323.');
assert(admin.headers.get('x-robots-tag')?.includes('noindex'));
assert(admin.headers.get('cache-control')?.includes('no-store'));
const adminHtml = await admin.text();
const adminHead = adminHtml.slice(0, adminHtml.indexOf('</head>'));
assert(
  /<style\b[^>]*>[\s\S]*?\.studio-brand img\s*\{[^}]*width\s*:/.test(adminHead),
  'Admin shell sizing must be included in the HTML head, before JavaScript loads.',
);
assert(
  adminHead.indexOf('.studio-brand img') < adminHead.indexOf('/__cms/decap-cms.js'),
  'Admin styling must precede the CMS bundle.',
);
assert(
  /<main\b(?=[^>]*id="studio-workspace")(?=[^>]*\bhidden)[^>]*>/.test(adminHtml),
  'Do not flash the workbench before the requested CMS route is initialized.',
);
assert(!(await page('/sitemap.xml')).html.includes('/admin'));
for (const file of ownedFiles) assert(!(await present(file)), `Refusing to overwrite ${file}`);

// Source fixture content is deliberately small; existing products/articles remain untouched.
const product = {
  id: productId,
  slug: 'cms-verify-product',
  name: 'CMS verification MCB',
  categorySlug: 'circuit-breaker',
  categoryName: 'Circuit Breaker',
  productTypes: ['MCB'],
  shortDescription: 'Temporary local content pipeline verification.',
  description: 'Temporary local product used to verify persistent content and SEO metadata.',
  features: ['Temporary fixture'],
  specs: [{ name: 'Test', value: 'Local only' }],
  image,
  published: false,
  metaTitle: 'CMS product SEO verification',
  metaDescription: 'This temporary product verifies the local CMS content pipeline.',
};
const article = {
  slug: articleSlug,
  title: 'CMS article verification',
  excerpt: 'Temporary local content pipeline verification.',
  content: '## Temporary verification\n\nThis local fixture verifies saved article content.\n',
  date: new Date().toISOString().slice(0, 10),
  dateModified: new Date().toISOString(),
  author: 'Soltree verification',
  image,
  tags: ['Verification'],
  readingTime: 1,
  relatedCategorySlug: 'circuit-breaker',
  relatedProductTypes: ['MCB'],
  published: false,
  metaTitle: 'CMS article SEO verification',
  metaDescription: 'This temporary article verifies the local CMS content pipeline.',
};

try {
  const png = await sharp({ create: { width: 4, height: 4, channels: 3, background: '#16854c' } })
    .png()
    .toBuffer();
  await accepted('persistMedia', {
    branch: 'main',
    asset: { path: mediaFile, content: png.toString('base64'), encoding: 'base64' },
    options: { commitMessage: 'Temporary local CMS image verification' },
  });
  assert.deepEqual(await fs.readFile(ownedFiles[2]), png);
  await eventually(async () => {
    assert.deepEqual(await fs.readFile(ownedFiles[3]), png);
  }, 'Uploaded image must be copied into the Astro optimization assets');
  await save('products', productFile, productId, product);
  await save('articles', articleFile, articleSlug, article);
  assert.equal(JSON.parse(await fs.readFile(ownedFiles[0], 'utf8')).published, false);
  assert.equal(JSON.parse(await fs.readFile(ownedFiles[1], 'utf8')).published, false);
  await eventually(assertDraftAbsent, 'Saved drafts must remain outside public content');
  await eventually(async () => {
    const response = await fetch(`${site}/admin/product-preview/${productId}`);
    assert.equal(response.status, 200, 'A saved draft must have a local preview');
    assert(response.headers.get('x-robots-tag')?.includes('noindex'));
    assert(response.headers.get('cache-control')?.includes('no-store'));
    const html = await response.text();
    assert(html.includes(`<title>${product.metaTitle} | Soltree</title>`));
    assert(html.includes('name="robots" content="noindex'));
    assert(html.includes(`https://www.elesoltree.com/admin/product-preview/${productId}`));
  }, 'Saved draft preview must be rendered and excluded from indexing');
  await eventually(async () => {
    const response = await fetch(`${site}/admin/article-preview/${articleSlug}`);
    assert.equal(response.status, 200, 'A saved article draft must have a local preview');
    assert(response.headers.get('x-robots-tag')?.includes('noindex'));
    assert(response.headers.get('cache-control')?.includes('no-store'));
    const html = await response.text();
    assert(html.includes(`<title>${article.metaTitle} | Soltree</title>`));
    assert(html.includes('name="robots" content="noindex'));
    assert(html.includes(`https://www.elesoltree.com/admin/article-preview/${articleSlug}`));
    assert(html.includes('This local fixture verifies saved article content.'));
  }, 'Article draft preview must use the actual article template and stay private');

  await save('products', productFile, productId, { ...product, published: true });
  await save('articles', articleFile, articleSlug, { ...article, published: true });
  for (const [route, title] of [
    [`/products/${productId}`, product.metaTitle],
    [`/blog/${articleSlug}`, article.metaTitle],
  ]) {
    await eventually(async () => {
      const { status, html } = await page(route);
      assert.equal(status, 200, `Published local route ${route}`);
      assert(html.includes(`<title>${title} | Soltree</title>`), `SEO title missing: ${route}`);
      assert(html.includes(`https://www.elesoltree.com${route}`), `Canonical missing: ${route}`);
      assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, route);
      assert(html.includes('application/ld+json'), `Structured data missing: ${route}`);
    }, `Published ${route} should be prerenderable with SEO metadata`);
  }
  const sitemap = (await page('/sitemap.xml')).html;
  assert(sitemap.includes(`/products/${productId}</loc>`));
  assert(sitemap.includes(`/blog/${articleSlug}</loc>`));
  assert((await page('/rss.xml')).html.includes(`/blog/${articleSlug}`));
  assert((await page('/products')).html.includes(productId));
  assert((await page('/blog/category/circuit-protection/mcb')).html.includes(articleSlug));

  await save('products', productFile, productId, product);
  await save('articles', articleFile, articleSlug, article);
  await eventually(assertDraftAbsent, 'Unpublishing must remove routes and SEO listings');

  async function tableRow(collection = 'products') {
    const response = await fetch(`${site}/__cms/${collection}`);
    assert.equal(response.status, 200, `${collection} table list must be available locally`);
    const data = await response.json();
    assert(data.categories.some((category) => category.slug === product.categorySlug));
    const id = collection === 'products' ? productId : articleSlug;
    const row = data[collection].find((record) => record.id === id);
    assert(row, 'The table must include saved drafts');
    assert.equal(row.entryKey, id);
    return row;
  }
  async function tableAction(row, action, collection = 'products') {
    const response = await fetch(`${site}/__cms/${collection}`, {
      method: 'POST',
      headers: { Origin: site, 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: row.id, revision: row.revision, action }),
    });
    const result = await response.json();
    assert.equal(response.status, 200, `${action}: ${result.error ?? 'Request failed'}`);
    return result[collection === 'products' ? 'product' : 'article'];
  }
  let row = await tableRow();
  assert.equal(row.published, false);
  assert.equal(row.createdAt, null, 'Legacy/missing creation times must not be invented');
  assert.equal(row.updatedAt, null);
  row = await tableAction(row, 'publish');
  assert.equal(row.published, true);
  assert(Number.isFinite(Date.parse(row.updatedAt)));
  assert.equal(row.createdAt, null);
  await eventually(async () => {
    const { status, html } = await page(`/products/${productId}`);
    assert.equal(status, 200);
    assert(
      html.includes(`rel="canonical" href="https://www.elesoltree.com/products/${productId}"`),
    );
    assert((await page('/sitemap.xml')).html.includes(`/products/${productId}</loc>`));
  }, 'Publishing through table action must update the real product page and sitemap');
  row = await tableAction(row, 'unpublish');
  assert.equal(row.published, false);
  await eventually(assertDraftAbsent, 'Table unpublish must remove public product content');
  row = await tableAction(row, 'delete');
  assert(row.deletedAt);
  assert.equal((await tableRow()).deletedAt, row.deletedAt);
  await eventually(async () => {
    assert.equal((await page(`/admin/product-preview/${productId}`)).status, 404);
  }, 'Deleted products must no longer have a local preview');
  await eventually(assertDraftAbsent, 'Soft-deleted products must stay out of public content');
  row = await tableAction(row, 'restore');
  assert.equal(row.deletedAt, null);
  assert.equal(row.published, false, 'Restoring must not automatically republish a product');
  assert(!Object.hasOwn(JSON.parse(await fs.readFile(ownedFiles[0], 'utf8')), 'deletedAt'));
  await eventually(async () => {
    assert.equal((await page(`/admin/product-preview/${productId}`)).status, 200);
  }, 'Restored drafts must be previewable again');
  await eventually(assertDraftAbsent, 'Restored drafts must remain private');
  let articleRow = await tableRow('articles');
  assert.equal(articleRow.published, false);
  assert.equal(articleRow.title, article.title);
  assert.equal(articleRow.categorySlug, article.relatedCategorySlug);
  assert.equal(articleRow.date, article.date);
  articleRow = await tableAction(articleRow, 'publish', 'articles');
  assert.equal(articleRow.published, true);
  assert.equal(
    articleRow.date,
    article.date,
    'Publishing must preserve the authored publication date',
  );
  assert(Number.isFinite(Date.parse(articleRow.dateModified)));
  await eventually(async () => {
    assert.equal((await page(`/blog/${articleSlug}`)).status, 200);
    assert((await page('/sitemap.xml')).html.includes(`/blog/${articleSlug}</loc>`));
    assert((await page('/rss.xml')).html.includes(`/blog/${articleSlug}`));
    assert((await page('/blog/category/circuit-protection/mcb')).html.includes(articleSlug));
  }, 'Article publish must update the actual public article, categories, sitemap and RSS');
  articleRow = await tableAction(articleRow, 'unpublish', 'articles');
  assert.equal(articleRow.published, false);
  await eventually(assertDraftAbsent, 'Article unpublish must remove public content');
  articleRow = await tableAction(articleRow, 'delete', 'articles');
  assert(articleRow.deletedAt);
  assert.equal((await tableRow('articles')).deletedAt, articleRow.deletedAt);
  await eventually(async () => {
    assert.equal((await page(`/admin/article-preview/${articleSlug}`)).status, 404);
  }, 'Deleted articles must no longer have local previews');
  articleRow = await tableAction(articleRow, 'restore', 'articles');
  assert.equal(articleRow.deletedAt, null);
  assert.equal(articleRow.published, false, 'Restore must leave articles unpublished');
  assert(!Object.hasOwn(JSON.parse(await fs.readFile(ownedFiles[1], 'utf8')), 'deletedAt'));
  await eventually(async () => {
    assert.equal((await page(`/admin/article-preview/${articleSlug}`)).status, 200);
  }, 'Restored article drafts must be previewable');
  await eventually(assertDraftAbsent, 'Restored articles must remain private');
  console.log(
    'PASS: local proxy origin guard, persisted drafts, product/article table publication/unpublication/delete/restore, private draft previews, category listings, SEO metadata, sitemap/RSS and uploaded-image optimization sync.',
  );
} finally {
  // Only these four reserved fixtures can be removed. Never recursively delete content folders.
  for (const file of ownedFiles) await fs.rm(file, { force: true });
}
