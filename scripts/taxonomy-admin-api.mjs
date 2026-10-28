import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { body, json, localOrigin, problem, revisionOf } from './product-admin-api.mjs';
import {
  validateTaxonomy,
  matchesTaxonomyProduct,
  matchesTaxonomyArticle,
  matchesTaxonomyArticleGroup,
} from '../src/lib/taxonomy-model.mjs';

const itemKey = (group, item) => `${group.slug}/${item.slug}`;
const active = (record) => record.published === true && !record.deletedAt;

function categoryReferences(record) {
  return [
    record.category,
    record.categorySlug,
    record.relatedCategorySlug,
    ...(Array.isArray(record.additionalCategorySlugs) ? record.additionalCategorySlugs : []),
  ];
}

function landingMatchesItem(page, group, item) {
  if (page.groupSlug !== group.slug) return false;
  return !Array.isArray(page.topics) || !page.topics.length || page.topics.includes(item.slug);
}

function statistics(taxonomy, products, articles, pages) {
  const counts = { groups: {}, items: {} };
  const usage = { groups: {}, items: {}, categories: {} };
  const metrics = (matchingProducts, matchingArticles, matchingPages, itemReferences = 0) => ({
    products: matchingProducts.length,
    articles: matchingArticles.length,
    landingPages: matchingPages.length,
    ...(itemReferences ? { items: itemReferences } : {}),
    deletable: !(
      matchingProducts.length ||
      matchingArticles.length ||
      matchingPages.length ||
      itemReferences
    ),
  });
  const membership = (matchingProducts, matchingArticles) => ({
    products: matchingProducts.filter(active).length,
    articles: matchingArticles.filter(active).length,
  });
  // Hidden navigation entries retain their membership; rows count records, never summed child totals.
  for (const group of taxonomy.groups) {
    const groupProducts = products.filter((record) =>
      group.items.some((item) => matchesTaxonomyProduct(record, item)),
    );
    const groupArticles = articles.filter((record) => matchesTaxonomyArticleGroup(record, group));
    counts.groups[group.slug] = membership(groupProducts, groupArticles);
    usage.groups[group.slug] = metrics(
      groupProducts,
      groupArticles,
      pages.filter((page) => page.groupSlug === group.slug),
    );
    for (const item of group.items) {
      const matchingProducts = products.filter((record) => matchesTaxonomyProduct(record, item));
      const matchingArticles = articles.filter((record) => matchesTaxonomyArticle(record, item));
      const key = itemKey(group, item);
      counts.items[key] = membership(matchingProducts, matchingArticles);
      usage.items[key] = metrics(
        matchingProducts,
        matchingArticles,
        pages.filter((page) => landingMatchesItem(page, group, item)),
      );
    }
  }
  for (const category of taxonomy.categories) {
    usage.categories[category.slug] = metrics(
      products.filter((record) => categoryReferences(record).includes(category.slug)),
      articles.filter((record) => categoryReferences(record).includes(category.slug)),
      pages.filter(
        (page) =>
          categoryReferences(page).includes(category.slug) ||
          taxonomy.groups.some((group) =>
            group.items.some(
              (item) => item.category === category.slug && landingMatchesItem(page, group, item),
            ),
          ),
      ),
      taxonomy.groups
        .flatMap((group) => group.items)
        .filter((item) => !item.deletedAt && item.category === category.slug).length,
    );
  }
  return { counts, usage };
}

function retainRecords(previous, next, label) {
  const candidates = new Map(next.map((record) => [record.slug, record]));
  for (const record of previous) {
    if (!candidates.has(record.slug))
      throw problem(422, `${label}标识不能修改或移除，请使用隐藏或删除功能保留原有链接。`);
  }
}

function protectIdentities(previous, next) {
  retainRecords(previous.categories, next.categories, '商品分类');
  retainRecords(previous.groups, next.groups, '一级分类');
  for (const group of previous.groups) {
    const nextGroup = next.groups.find((candidate) => candidate.slug === group.slug);
    retainRecords(group.items, nextGroup.items, '二级分类');
    for (const item of group.items) {
      const candidate = nextGroup.items.find((record) => record.slug === item.slug);
      if (candidate.category !== item.category || candidate.type !== item.type)
        throw problem(422, '现有二级分类对应的商品分类和产品类型不能修改，请新建二级分类。');
    }
  }
}

function normalizeRetirement(previous, next, usage, label, now) {
  const existing = new Map(previous.map((record) => [record.slug, record]));
  for (const record of next) {
    const before = existing.get(record.slug);
    if (!record.deletedAt) continue;
    if (!before?.deletedAt && usage[record.slug]?.deletable === false)
      throw problem(409, `${label}已有产品、文章、落地页或二级分类引用，请先隐藏该分类。`);
    record.deletedAt = before?.deletedAt ?? now;
    if (record.products) record.products.visible = false;
    if (record.articles) record.articles.visible = false;
  }
}

/** Mount at /__cms/taxonomy in the local development server only. */
export function createTaxonomyAdminHandler({ root, getLandingPages = async () => [] }) {
  const source = path.resolve(root, 'src/content/settings/taxonomy.json');
  // ponytail: a local process queue plus revision checks; multiple writers need a shared lock/store.
  let mutationQueue = Promise.resolve();

  async function snapshot() {
    const raw = await fs.readFile(source, 'utf8');
    try {
      return { raw, taxonomy: validateTaxonomy(JSON.parse(raw)), revision: revisionOf(raw) };
    } catch {
      throw problem(422, '现有分类设置格式不正确，请联系维护人员检查。');
    }
  }

  async function records(collection) {
    const directory = path.resolve(root, 'src/content', collection);
    const entries = await fs.readdir(directory, { withFileTypes: true }).catch((error) => {
      if (error.code === 'ENOENT') return [];
      throw error;
    });
    return Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
        .map(async (entry) => {
          try {
            const record = JSON.parse(await fs.readFile(path.join(directory, entry.name), 'utf8'));
            if (!record || typeof record !== 'object' || Array.isArray(record)) throw new Error();
            return record;
          } catch {
            throw problem(422, '产品或文章资料格式不正确，请检查后再管理分类。');
          }
        }),
    );
  }

  async function references() {
    const [products, articles, pages] = await Promise.all([
      records('products'),
      records('articles'),
      getLandingPages(),
    ]);
    if (!Array.isArray(pages)) throw problem(422, '落地页分类资料格式不正确。');
    return { products, articles, pages };
  }

  function response(current, refs) {
    return {
      taxonomy: current.taxonomy,
      revision: current.revision,
      ...statistics(current.taxonomy, refs.products, refs.articles, refs.pages),
    };
  }

  async function validateImages(previous, next) {
    for (const category of next.categories) {
      if (
        previous.categories.find((record) => record.slug === category.slug)?.image ===
        category.image
      )
        continue;
      try {
        const directory = await fs.realpath(path.resolve(root, 'public/images'));
        const file = await fs.realpath(path.resolve(root, 'public', `.${category.image}`));
        const relative = path.relative(directory, file);
        if (
          !relative ||
          relative.startsWith('..') ||
          path.isAbsolute(relative) ||
          !(await fs.stat(file)).isFile()
        )
          throw new Error();
      } catch {
        throw problem(422, '分类图片不存在或位置不正确，请选择 images 文件夹内的有效图片。');
      }
    }
  }

  async function mutate(input) {
    if (
      Object.keys(input).some((key) => !['revision', 'taxonomy'].includes(key)) ||
      typeof input.revision !== 'string' ||
      !/^[a-f0-9]{64}$/.test(input.revision)
    )
      throw problem(400, '提交参数不正确，请刷新分类设置后重试。');
    let next;
    try {
      next = validateTaxonomy(input.taxonomy);
    } catch {
      throw problem(422, '分类设置无效，请检查名称、唯一标识、图片、产品类型和显示顺序。');
    }
    const current = await snapshot();
    if (current.revision !== input.revision)
      throw problem(409, '分类设置刚刚被修改，请刷新后重试。');
    protectIdentities(current.taxonomy, next);
    await validateImages(current.taxonomy, next);
    const refs = await references();
    const now = new Date().toISOString();
    // Evaluate proposed active item references too, so a category and its last unused item can retire together.
    const nextUsage = statistics(next, refs.products, refs.articles, refs.pages).usage;
    normalizeRetirement(
      current.taxonomy.categories,
      next.categories,
      nextUsage.categories,
      '商品分类',
      now,
    );
    normalizeRetirement(current.taxonomy.groups, next.groups, nextUsage.groups, '一级分类', now);
    for (const group of next.groups) {
      const before = current.taxonomy.groups.find((candidate) => candidate.slug === group.slug);
      const itemUsage = Object.fromEntries(
        group.items.map((item) => [item.slug, nextUsage.items[itemKey(group, item)]]),
      );
      normalizeRetirement(before?.items ?? [], group.items, itemUsage, '二级分类', now);
    }
    const retiredCategories = new Set(
      next.categories.filter((category) => category.deletedAt).map((category) => category.slug),
    );
    if (
      next.groups.some((group) =>
        group.items.some((item) => !item.deletedAt && retiredCategories.has(item.category)),
      )
    )
      throw problem(409, '二级分类对应的商品分类已删除，请先恢复商品分类，再恢复或新增二级分类。');
    validateTaxonomy(next);
    const backup = path.resolve(
      root,
      '.content-backups',
      `${now.replace(/[:.]/g, '-')}-taxonomy-${randomUUID().slice(0, 8)}`,
      'src/content/settings/taxonomy.json',
    );
    await fs.mkdir(path.dirname(backup), { recursive: true });
    await fs.writeFile(backup, current.raw, { flag: 'wx' });
    if (revisionOf(await fs.readFile(source, 'utf8')) !== input.revision)
      throw problem(409, '分类设置刚刚被修改，请刷新后重试。');
    const raw = `${JSON.stringify(next, null, 2)}\n`;
    const temporary = `${source}.tmp-${randomUUID()}`;
    try {
      await fs.writeFile(temporary, raw, { flag: 'wx' });
      await fs.rename(temporary, source);
    } finally {
      await fs.unlink(temporary).catch((error) => {
        if (error.code !== 'ENOENT') throw error;
      });
    }
    return response({ taxonomy: next, revision: revisionOf(raw) }, refs);
  }

  return async (req, res) => {
    try {
      const origin = localOrigin(req);
      if (!origin || (req.method !== 'GET' && req.headers.origin !== origin))
        throw problem(403, '仅允许从本机后台执行此操作。');
      if (!['', '/'].includes((req.url ?? '').split('?')[0])) throw problem(404, '接口不存在。');
      if (req.method === 'GET') {
        const [current, refs] = await Promise.all([snapshot(), references()]);
        return json(res, 200, response(current, refs));
      }
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'GET, POST');
        throw problem(405, '不支持此请求方式。');
      }
      if (!req.headers['content-type']?.toLowerCase().startsWith('application/json'))
        throw problem(415, '请使用 JSON 提交分类设置。');
      const input = await body(req, 262_144);
      const pending = mutationQueue.then(() => mutate(input));
      mutationQueue = pending.catch(() => {});
      return json(res, 200, await pending);
    } catch (error) {
      json(res, Number.isInteger(error.status) ? error.status : 500, {
        error: Number.isInteger(error.status) ? error.message : '保存分类设置未完成，请稍后重试。',
      });
    }
  };
}
