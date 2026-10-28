import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import ts from 'typescript';
import { createRequire } from 'node:module';

const sourceCache = new Map();

function sourceModule(file) {
  file = path.resolve(file);
  if (sourceCache.has(file)) return sourceCache.get(file);
  const input = fs
    .readFileSync(file, 'utf8')
    .replace(/import\.meta\.glob\('([^']+)',\s*\{[^}]+\}\)/g, (_, pattern) => {
      const directory = path.resolve(path.dirname(file), pattern.replace(/\/\*\.json$/, ''));
      return JSON.stringify(
        Object.fromEntries(
          fs
            .readdirSync(directory)
            .filter((name) => name.endsWith('.json'))
            .map((name) => [name, JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'))]),
        ),
      );
    });
  const source = ts.transpileModule(input, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const module = { exports: {} };
  sourceCache.set(file, module.exports);
  const nativeRequire = createRequire(file);
  const localRequire = (specifier) => {
    if (!specifier.startsWith('.')) return nativeRequire(specifier);
    const target = path.resolve(path.dirname(file), specifier);
    if (target.endsWith('.ts')) return sourceModule(target);
    if (!path.extname(target) && fs.existsSync(`${target}.ts`)) return sourceModule(`${target}.ts`);
    return nativeRequire(specifier);
  };
  new Function('module', 'exports', 'require', source)(module, module.exports, localRequire);
  return module.exports;
}
const { products, blogPosts, loadProducts, loadBlogPosts, contentFile } =
  sourceModule('src/lib/data.ts');
assert.deepEqual(loadProducts([{ id: 'draft-product', published: false }]), []);
assert.deepEqual(loadBlogPosts([{ slug: 'draft-article', published: false }]), []);
assert.deepEqual(
  loadBlogPosts([
    { slug: 'deleted-article', published: true, deletedAt: '2026-10-27T12:00:00.000Z' },
  ]),
  [],
);
for (const deletedAt of ['yesterday', '2026-02-30T00:00:00.000Z', null])
  assert.throws(
    () => loadBlogPosts([{ slug: 'invalid-article-deletion', published: false, deletedAt }]),
    /valid ISO timestamp/,
  );
if (blogPosts.length) {
  const article = { ...blogPosts[0], dateModified: '2026-10-27T12:00:00.000Z' };
  const loaded = loadBlogPosts([article])[0];
  assert.equal(loaded.date, blogPosts[0].date);
  assert.equal(loaded.dateModified, article.dateModified);
  assert.equal(loaded.deletedAt, undefined);
  assert.equal(Object.hasOwn(loaded, 'createdAt'), false);
}
assert.deepEqual(
  loadProducts([{ id: 'deleted-product', published: true, deletedAt: '2026-10-27T12:00:00.000Z' }]),
  [],
);
for (const field of ['createdAt', 'updatedAt', 'deletedAt']) {
  assert.throws(
    () => loadProducts([{ id: 'invalid-product-date', published: false, [field]: 'yesterday' }]),
    /valid ISO timestamp/,
  );
  assert.throws(
    () =>
      loadProducts([
        { id: 'invalid-product-date', published: false, [field]: '2026-02-30T00:00:00.000Z' },
      ]),
    /valid ISO timestamp/,
  );
}
assert.throws(
  () =>
    loadProducts([
      { id: 'duplicate', published: false },
      { id: 'duplicate', published: false },
    ]),
  /Duplicate/,
);
assert.throws(() => loadBlogPosts([{ slug: '../bad-route', published: false }]), /Invalid/);
assert.throws(() => contentFile('original.json', { slug: 'changed' }, 'slug'), /filename/);
assert.equal(contentFile('mcb-new.json', { id: 'MCB-NEW' }, 'id').id, 'MCB-NEW');
assert.throws(
  () =>
    loadProducts([
      { id: 'MCB-NEW', published: false },
      { id: 'mcb-new', published: false },
    ]),
  /Duplicate/,
);
if (products.length) {
  const storedProduct = {
    ...products[0],
    specs: Object.entries(products[0].specs).map(([name, value]) => ({ name, value })),
  };
  const normalized = loadProducts([{ ...storedProduct, metaTitle: '', metaDescription: null }])[0];
  assert.equal(normalized.metaTitle, undefined);
  assert.equal(normalized.metaDescription, undefined);
  const historical = { ...storedProduct };
  delete historical.createdAt;
  delete historical.updatedAt;
  delete historical.deletedAt;
  assert.equal(loadProducts([historical])[0].createdAt, undefined);
  assert.equal(loadProducts([historical])[0].updatedAt, undefined);
  const dated = loadProducts([
    { ...historical, createdAt: '2026-10-27T12:00:00.000Z', updatedAt: '2026-10-27T13:00:00Z' },
  ])[0];
  assert.equal(dated.createdAt, '2026-10-27T12:00:00.000Z');
  assert.equal(dated.updatedAt, '2026-10-27T13:00:00Z');
}
const {
  allProductGroups: productGroups,
  allArticleGroups,
  allCategories,
  matchesSubcategory,
} = sourceModule('src/lib/product-taxonomy.ts');
const { validContact, contactHtml } = sourceModule('src/lib/contact.ts');
const { companyLinks } = sourceModule('src/lib/company-navigation.ts');
const {
  landingPages,
  resourceCategoryHref,
  resourceTopicHref,
  resourceTopicSlug,
  matchesResource,
} = sourceModule('src/lib/landing-pages.ts');
assert.equal(new Set(landingPages.map((page) => page.href)).size, landingPages.length);
assert(
  landingPages.every((page) =>
    productGroups.some(
      (group) =>
        group.slug === page.groupSlug &&
        group.items.some((item) => matchesResource(page, group.slug, resourceTopicSlug(item))),
    ),
  ),
);
assert.equal(companyLinks.length, 8);
assert.equal(new Set(companyLinks.map((link) => link.href)).size, 8);
const { matchesBlogGroup, matchesBlogTopic, blogCategoryHref, blogTopicHref } = sourceModule(
  'src/lib/blog-taxonomy.ts',
);
assert(
  blogPosts.every((post) => allArticleGroups.some((group) => matchesBlogGroup(post, group))),
  'Every article needs a product family',
);
const solarGroup = {
  slug: 'solar-pv-components',
  items: [
    {
      slug: 'dc-circuit-breaker',
      name: 'DC Circuit Breaker',
      category: 'circuit-breaker',
      type: 'DC',
    },
  ],
};
const acGuide = {
  relatedCategorySlug: 'circuit-breaker',
  tags: ['MCB'],
  relatedProductTypes: ['MCB'],
};
assert(!matchesBlogGroup(acGuide, solarGroup), 'A general MCB guide must not be classified as DC');
assert(matchesBlogGroup({ ...acGuide, relatedProductTypes: ['MCB', 'DC'] }, solarGroup));
assert(!matchesBlogTopic(acGuide, solarGroup.items[0]));
assert.equal(new Set(productGroups.map((group) => group.slug)).size, productGroups.length);
assert.equal(new Set(products.map((product) => product.id)).size, products.length);
assert(
  products.every((product) =>
    productGroups.some((group) => group.items.some((item) => matchesSubcategory(product, item))),
  ),
);
const dc = productGroups
  .find((group) => group.slug === 'solar-pv-components')
  .items.filter((item) => item.type === 'DC');
for (const item of dc) {
  const matches = products.filter((product) => matchesSubcategory(product, item));
  assert(
    matches.every(
      (product) => product.productTypes?.includes('DC') || !product.id.includes('-AC-'),
    ),
  );
}
assert(!validContact({ name: 'Test', email: 'invalid', message: 'hello' }));
assert(!validContact({ name: 'Test', email: 'test@example.com', message: 'short' }));
assert(
  validContact({
    name: 'Test',
    email: 'test@example.com',
    message: 'Test enquiry for a product',
    phone: '+1 555 0100',
    country: 'US',
  }),
);
assert(
  contactHtml({
    name: '<script>',
    email: 'test@example.com',
    message: '<img src=x onerror=alert(1)>',
    phone: '123',
  }).includes('&lt;script&gt;'),
);
const routes = [
  '/',
  '/products',
  '/blog',
  '/resources',
  ...productGroups.map((group) => resourceCategoryHref(group.slug)),
  ...productGroups.flatMap((group) =>
    group.items.map((item) => resourceTopicHref(group.slug, item)),
  ),
  ...allArticleGroups.map((group) => blogCategoryHref(group.slug)),
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/solutions/aerosol-fire-extinguisher',
  ...products.map((product) => `/products/${product.id}`),
  ...allCategories.map((category) => `/categories/${category.slug}`),
  ...blogPosts.map((post) => `/blog/${post.slug}`),
];
const root = path.resolve('.vercel/output/static');
const outputConfig = JSON.parse(fs.readFileSync('.vercel/output/config.json', 'utf8'));
const redirects = (outputConfig.routes ?? []).filter((route) =>
  [301, 302, 307, 308].includes(route.status),
);
// Directory entries preserve exact casing even on Windows, matching Vercel's Linux filesystem.
const publicFiles = new Set(
  fs
    .readdirSync(root, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map(
      (entry) =>
        '/' +
        path
          .relative(root, path.join(entry.parentPath ?? entry.path, entry.name))
          .split(path.sep)
          .join('/'),
    ),
);
const exists = (url) => {
  let pathname = decodeURIComponent(url.split(/[?#]/)[0]);
  for (let i = 0; i < 8; i++) {
    const redirect = redirects.find((route) => route.src && new RegExp(route.src).test(pathname));
    const location = Object.entries(redirect?.headers ?? {}).find(
      ([key]) => key.toLowerCase() === 'location',
    )?.[1];
    if (!location) break;
    pathname = location;
  }
  return publicFiles.has(pathname) || publicFiles.has(path.posix.join(pathname, 'index.html'));
};
const missing = new Set();
for (const link of companyLinks) {
  const [route, anchor] = link.href.split('#');
  assert(exists(route), `Missing company destination: ${route}`);
  if (anchor)
    assert(
      fs.readFileSync(path.join(root, route, 'index.html'), 'utf8').includes(`id="${anchor}"`),
      `Missing company section: ${anchor}`,
    );
}
const htmlFiles = [];
for (const route of routes) {
  const file = path.join(root, route, 'index.html');
  assert(fs.existsSync(file), `Missing route ${route}`);
  htmlFiles.push(file);
  const html = fs.readFileSync(file, 'utf8');
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `Expected one h1: ${route}`);
  assert(html.includes('rel="canonical"'), `Missing canonical: ${route}`);
  assert(!html.includes('/_next/'), `Next assets remain: ${route}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"#?]*)/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (!url.startsWith('/api/') && !exists(url)) missing.add(url);
  }
  for (const script of html.matchAll(
    /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  ))
    JSON.parse(script[1]);
}
assert.equal(missing.size, 0, `Broken local links/assets: ${[...missing].join(', ')}`);
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
for (const group of productGroups) {
  const hasResources = landingPages.some((page) => matchesResource(page, group.slug));
  const html = fs.readFileSync(
    path.join(root, resourceCategoryHref(group.slug), 'index.html'),
    'utf8',
  );
  assert.equal(
    sitemap.includes(`https://www.elesoltree.com${resourceCategoryHref(group.slug)}</loc>`),
    hasResources,
  );
  if (!hasResources)
    assert(html.includes('noindex') && html.includes('No resources in this topic yet'));
}
for (const group of allArticleGroups) {
  const count = blogPosts.filter((post) => matchesBlogGroup(post, group)).length;
  const html = fs.readFileSync(path.join(root, blogCategoryHref(group.slug), 'index.html'), 'utf8');
  assert.equal(
    sitemap.includes(`https://www.elesoltree.com${blogCategoryHref(group.slug)}</loc>`),
    count > 0,
  );
  if (count === 0)
    assert(html.includes('noindex') && html.includes('No articles in this category yet'));
  assert(
    !html.includes('aria-label="Article topics"'),
    'Public Blog uses primary categories only.',
  );
  assert(
    !/href="\/blog\/category\/[^"/]+\/[^"/?#]+/.test(html),
    'No secondary category links in Blog navigation or cards.',
  );
  for (const topic of group.items)
    assert(
      !sitemap.includes(`https://www.elesoltree.com${blogTopicHref(group.slug, topic)}</loc>`),
      'Legacy secondary category redirects must not appear in the sitemap.',
    );
}
assert(
  fs.readFileSync(path.join(root, 'robots.txt'), 'utf8').includes('www.elesoltree.com/sitemap.xml'),
);
const jsFiles = fs.readdirSync(path.join(root, '_astro')).filter((file) => file.endsWith('.js'));
const clientJs = jsFiles
  .map((file) => fs.readFileSync(path.join(root, '_astro', file), 'utf8'))
  .join('\n');
// The authenticated editor may use Decap/React; public pages keep their small native scripts.
const publicScripts = new Set();
const visitScript = (filename) => {
  if (publicScripts.has(filename)) return;
  assert(filename.startsWith(root + path.sep), 'Public script must stay inside the static output.');
  publicScripts.add(filename);
  const source = fs.readFileSync(filename, 'utf8');
  for (const match of source.matchAll(/\b(?:from\s*|import\s*\(\s*)["'](\.?\/[^"']+\.js)["']/g))
    visitScript(path.resolve(path.dirname(filename), match[1]));
};
for (const file of htmlFiles)
  for (const match of fs
    .readFileSync(file, 'utf8')
    .matchAll(/<script\b[^>]*\bsrc="(\/_astro\/[^"?]+\.js)"/g))
    visitScript(path.join(root, match[1]));
const publicJs = [...publicScripts].map((filename) => fs.readFileSync(filename, 'utf8')).join('\n');
assert(
  !publicJs.includes('react-dom') && !publicJs.includes('react.production'),
  'Unexpected React runtime',
);
if (fs.existsSync('.env.local'))
  for (const line of fs.readFileSync('.env.local', 'utf8').split('\n')) {
    const match = line.match(
      /^(RESEND_API_KEY|SUPABASE_SERVICE_ROLE_KEY|SEO_OPENAI_API_KEY|ADMIN_GITHUB_TOKEN)=(.*)$/,
    );
    if (!match) continue;
    const value = match[2].trim().replace(/^['"]|['"]$/g, '');
    if (value.length > 8) {
      assert(!clientJs.includes(value), 'Secret found in client JS');
      for (const file of htmlFiles)
        assert(!fs.readFileSync(file, 'utf8').includes(value), 'Secret found in static HTML');
    }
  }
console.log(
  `PASS: ${routes.length} pages, ${products.length} products, ${blogPosts.length} articles, ${productGroups.length} product groups, zero broken local links/assets, safe form validation, no React runtime or client secrets.`,
);
console.log(
  `Public external JavaScript: ${Buffer.byteLength(publicJs)} bytes across ${publicScripts.size} files (before compression; admin-only bundles excluded).`,
);
