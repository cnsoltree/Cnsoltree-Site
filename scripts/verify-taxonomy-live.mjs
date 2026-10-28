import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { revisionOf } from './product-admin-api.mjs';

// Local integration check: the original registry is restored exactly, with a revision guard.
const root = fileURLToPath(new URL('../', import.meta.url));
const file = path.resolve(root, 'src/content/settings/taxonomy.json');
const site = 'http://127.0.0.1:4323';
const originalRaw = await fs.readFile(file, 'utf8');
const initial = await (await fetch(`${site}/__cms/taxonomy`)).json();
assert.equal(initial.revision, revisionOf(originalRaw));
const next = structuredClone(initial.taxonomy);
const visible = next.groups.filter((group) => !group.deletedAt && group.products.visible);
assert(visible.length >= 2, 'This local integration check needs two product groups.');
const source = visible.find((group) => group.items.some((item) => !item.deletedAt));
assert(source, 'This check needs an existing topic.');
const topic = source.items.find((item) => !item.deletedAt);
const oldTopicSlug = topic.slug;
const moved = visible.filter((group) => group !== source).at(-1);
const order = [moved, ...visible.filter((group) => group !== moved)];
order.forEach((group, index) => {
  group.products.order = index + 1;
});
source.articles.visible = false;
topic.name = 'CMS Taxonomy Display Check';
const category = next.categories.find((record) => record.slug === topic.category);
category.name = 'CMS Taxonomy Category Check';
const reserved = 'cms-taxonomy-sync-check';
assert(!next.categories.some((record) => record.slug === reserved));
assert(!next.groups.some((record) => record.slug === reserved));
next.categories.push({
  slug: reserved,
  name: 'CMS New Category Check',
  shortDescription: 'Temporary taxonomy check.',
  description: 'Temporary taxonomy integration check.',
  image: '/images/logo.png',
});
next.groups.push({
  slug: reserved,
  name: 'CMS New Group Check',
  description: 'Temporary taxonomy integration check.',
  icon: source.icon,
  products: { visible: true, order: 10000 },
  articles: { visible: true, order: 10000 },
  items: [
    {
      slug: reserved,
      name: 'CMS New Topic Check',
      category: reserved,
      products: { visible: true, order: 1 },
      articles: { visible: true, order: 1 },
    },
  ],
});
let writtenRevision;
async function html(route) {
  const response = await fetch(site + route, { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, route);
  return response.text();
}
async function eventually(check) {
  const until = Date.now() + 45000;
  let failure;
  do {
    try {
      return await check();
    } catch (error) {
      failure = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  } while (Date.now() < until);
  throw failure;
}
async function contentDigest() {
  const records = [];
  for (const collection of ['products', 'articles']) {
    const folder = path.join(root, 'src/content', collection);
    for (const name of (await fs.readdir(folder)).filter((name) => name.endsWith('.json')).sort())
      records.push(`${collection}/${name}\n${await fs.readFile(path.join(folder, name), 'utf8')}`);
  }
  return revisionOf(records.join('\n'));
}
const beforeContents = await contentDigest();
try {
  const response = await fetch(`${site}/__cms/taxonomy`, {
    method: 'POST',
    headers: { Origin: site, 'Content-Type': 'application/json' },
    body: JSON.stringify({ revision: initial.revision, taxonomy: next }),
  });
  const result = await response.json();
  assert.equal(response.status, 200, result.error);
  writtenRevision = result.revision;
  assert.deepEqual(
    result.taxonomy.groups
      .slice(0, initial.taxonomy.groups.length)
      .map((group) => group.articles.order),
    initial.taxonomy.groups.map((group) => group.articles.order),
    'Product sorting must not change article sorting',
  );
  await eventually(async () => {
    const products = await html('/products');
    const sidebar = products.match(
      /<nav\b[^>]*aria-label="Product categories"[^>]*>([\s\S]*?)<\/nav>/,
    )?.[1];
    assert(sidebar, 'Product category navigation');
    assert(
      sidebar.indexOf(`data-parent="${moved.slug}"`) <
        sidebar.indexOf(`data-parent="${source.slug}"`),
      'Product order must match the saved registry',
    );
    assert(sidebar.includes('CMS Taxonomy Display Check'));
    const blog = await html('/blog');
    const blogSidebar = blog.match(
      /<nav\b[^>]*aria-label="Blog categories"[^>]*>([\s\S]*?)<\/nav>/,
    )?.[1];
    assert(
      blogSidebar && !blogSidebar.includes(`/blog/category/${source.slug}"`),
      'Article hiding must only remove its navigation entry',
    );
    const legacy = await fetch(`${site}/blog/category/${source.slug}/${oldTopicSlug}`, {
      redirect: 'manual',
    });
    assert.equal(
      legacy.status,
      301,
      'Existing topic URL redirects to its primary category after label edits or hiding.',
    );
    assert.equal(legacy.headers.get('location'), `/blog/category/${source.slug}`);
    assert((await html(`/categories/${reserved}`)).includes('CMS New Category Check'));
    const newTopic = await fetch(`${site}/blog/category/${reserved}/${reserved}`, {
      redirect: 'manual',
    });
    assert.equal(newTopic.status, 301);
    assert.equal(newTopic.headers.get('location'), `/blog/category/${reserved}`);
    assert((await html(`/blog/category/${reserved}`)).includes('CMS New Group Check'));
    assert(
      (await html(`/resources/category/${reserved}/${reserved}`)).includes('CMS New Topic Check'),
    );
    const list = await (await fetch(`${site}/__cms/products`)).json();
    assert(
      list.categories.some((record) => record.slug === reserved),
      'New category must be available in the content backend',
    );
    const renamed = list.products.filter((record) => record.categorySlug === category.slug);
    assert(renamed.every((record) => record.categoryName === category.name));
    assert(
      (await html('/')).includes('CMS Taxonomy Display Check'),
      'Header navigation must follow group edits',
    );
  });
  assert.equal(
    await contentDigest(),
    beforeContents,
    'Group edits must not rewrite products or articles',
  );
  console.log(
    'PASS: live taxonomy save updates product/header order, independent article visibility, stable URLs, new category/topic archives and CMS options; content stays unchanged.',
  );
} finally {
  if (writtenRevision) {
    const currentRaw = await fs.readFile(file, 'utf8');
    assert.equal(
      revisionOf(currentRaw),
      writtenRevision,
      'Settings changed during verification; refusing to overwrite another edit',
    );
    const temporary = `${file}.verify-${randomUUID()}`;
    try {
      await fs.writeFile(temporary, originalRaw, { flag: 'wx' });
      await fs.rename(temporary, file);
    } finally {
      await fs.unlink(temporary).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
    }
    assert.equal(await fs.readFile(file, 'utf8'), originalRaw);
    console.log('Original taxonomy restored exactly.');
  }
}
