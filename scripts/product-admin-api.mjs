import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash, randomUUID } from 'node:crypto';
import { articleSummary } from '../src/lib/article-excerpt.mjs';

const idPattern = /^[A-Za-z0-9][A-Za-z0-9_-]{0,159}$/;
const actions = new Set(['publish', 'unpublish', 'delete', 'restore']);
export const revisionOf = (raw) => createHash('sha256').update(raw).digest('hex');
export const problem = (status, message) => Object.assign(new Error(message), { status });

export function json(res, status, value) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.end(JSON.stringify(value));
}

export function localOrigin(req) {
  try {
    const host = new URL(`http://${req.headers.host}`);
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(host.hostname)) return null;
    if (host.username || host.password || host.pathname !== '/') return null;
    return host.origin;
  } catch {
    return null;
  }
}

export function body(req, limit = 16_384) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size <= limit) chunks.push(chunk);
      else chunks.length = 0;
    });
    req.on('error', () => reject(problem(400, '请求未完成，请重试。')));
    req.on('end', () => {
      if (size > limit) return reject(problem(413, '请求内容过大。'));
      try {
        const value = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error();
        resolve(value);
      } catch {
        reject(problem(400, '请求格式不正确。'));
      }
    });
  });
}

function tableImage(record, images) {
  let image = typeof record.image === 'string' ? record.image : '';
  if (image.startsWith('/images/')) {
    try {
      const url = new URL(image, 'http://local.invalid');
      const actual = images?.get(decodeURIComponent(url.pathname).toLowerCase());
      if (actual) image = actual + url.search + url.hash;
    } catch {}
  }
  return image;
}

function tableProduct({ record, raw, filename }, images, categories) {
  return {
    id: record.id,
    entryKey: filename.slice(0, -5),
    name: typeof record.name === 'string' ? record.name : '',
    image: tableImage(record, images),
    categorySlug: record.categorySlug ?? '',
    categoryName:
      categories.find((category) => category.slug === record.categorySlug)?.name ??
      record.categoryName ??
      '',
    published: record.published === true && !record.deletedAt,
    createdAt: record.createdAt ?? null,
    updatedAt: record.updatedAt ?? null,
    deletedAt: record.deletedAt ?? null,
    sortOrder: Number.isFinite(record.sortOrder) ? record.sortOrder : null,
    revision: revisionOf(raw),
  };
}

function tableArticle({ record, raw, filename }, images, categories) {
  return {
    id: record.slug,
    slug: record.slug,
    entryKey: filename.slice(0, -5),
    title: typeof record.title === 'string' ? record.title : '',
    excerpt: articleSummary(record),
    image: tableImage(record, images),
    categorySlug: record.relatedCategorySlug ?? '',
    categoryName:
      categories.find((category) => category.slug === record.relatedCategorySlug)?.name ?? '',
    published: record.published === true && !record.deletedAt,
    date: record.date ?? null,
    dateModified: record.dateModified ?? null,
    deletedAt: record.deletedAt ?? null,
    sortOrder: Number.isFinite(record.sortOrder) ? record.sortOrder : null,
    revision: revisionOf(raw),
  };
}

function createContentAdminHandler({
  root,
  validateRecord,
  getCategories = async () => [],
  collection,
}) {
  const article = collection === 'articles';
  const key = article ? 'slug' : 'id';
  const pattern = article ? /^[a-z0-9]+(?:-[a-z0-9]+)*$/ : idPattern;
  const label = article ? '文章' : '产品';
  const singular = article ? 'article' : 'product';
  const tableRow = article ? tableArticle : tableProduct;
  const directory = path.resolve(root, 'src/content', collection);
  // ponytail: this queue covers one local process; shared multi-process editing needs a shared lock/store.
  let mutationQueue = Promise.resolve();

  async function imagePaths() {
    const directory = path.resolve(root, 'public/images');
    const entries = await fs
      .readdir(directory, { recursive: true, withFileTypes: true })
      .catch((error) => {
        if (error.code === 'ENOENT') return [];
        throw error;
      });
    return new Map(
      entries
        .filter((entry) => entry.isFile())
        .flatMap((entry) => {
          const relative = path.relative(
            directory,
            path.join(entry.parentPath ?? entry.path, entry.name),
          );
          if (relative.startsWith('..') || path.isAbsolute(relative)) return [];
          const pathname = `/images/${relative.split(path.sep).join('/')}`;
          return [[pathname.toLowerCase(), pathname.split('/').map(encodeURIComponent).join('/')]];
        }),
    );
  }

  async function records() {
    const entries = await fs.readdir(directory, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.json'));
    const seen = new Set();
    return Promise.all(
      files.map(async (entry) => {
        if (!/^[A-Za-z0-9][A-Za-z0-9_-]*\.json$/.test(entry.name))
          throw problem(422, `${label}文件名不正确，请联系维护人员检查。`);
        const raw = await fs.readFile(path.join(directory, entry.name), 'utf8');
        let record;
        try {
          record = JSON.parse(raw);
        } catch {
          throw problem(422, `${label}资料格式不正确，请联系维护人员检查。`);
        }
        if (
          !record ||
          typeof record !== 'object' ||
          typeof record[key] !== 'string' ||
          !pattern.test(record[key]) ||
          (article
            ? entry.name.slice(0, -5) !== record[key]
            : entry.name.slice(0, -5).toLowerCase() !== record[key].toLowerCase())
        )
          throw problem(422, `${label} ID 与文件名不一致，请联系维护人员检查。`);
        if (seen.has(record[key].toLowerCase()))
          throw problem(422, `${label} ID 重复，请联系维护人员检查。`);
        seen.add(record[key].toLowerCase());
        return { record, raw, filename: entry.name };
      }),
    );
  }

  async function mutate(input) {
    if (
      typeof input.id !== 'string' ||
      !pattern.test(input.id) ||
      !actions.has(input.action) ||
      typeof input.revision !== 'string' ||
      !/^[a-f0-9]{64}$/.test(input.revision)
    )
      throw problem(400, '操作参数不正确，请刷新列表后重试。');
    const current = (await records()).find(({ record }) => record[key] === input.id);
    if (!current) throw problem(404, `${label}不存在，请刷新列表。`);
    if (revisionOf(current.raw) !== input.revision)
      throw problem(409, `${label}刚刚被修改，请刷新列表后重试。`);
    const next = { ...current.record };
    const now = new Date().toISOString();
    if (input.action === 'publish') {
      if (next.deletedAt) throw problem(409, `请先从回收站恢复${label}，再发布。`);
      next.published = true;
      try {
        await validateRecord(next);
      } catch {
        throw problem(
          422,
          article
            ? '文章资料尚未完善，请编辑并补全标题、分类、封面、摘要、正文、作者和发布日期后再发布。'
            : '产品资料尚未完善，请编辑并补全分类、封面、简介、详情和参数后再发布。',
        );
      }
    } else if (input.action === 'unpublish') {
      next.published = false;
    } else if (input.action === 'delete') {
      if (next.deletedAt) throw problem(409, `${label}已在回收站中。`);
      next.deletedAt = now;
      next.published = false;
    } else {
      if (!next.deletedAt) throw problem(409, `${label}不在回收站中。`);
      delete next.deletedAt;
      next.published = false;
    }
    next[article ? 'dateModified' : 'updatedAt'] = now;
    const source = path.join(directory, current.filename);
    const backup = path.resolve(
      root,
      '.content-backups',
      `${now.replace(/[:.]/g, '-')}-${input.action}-${randomUUID().slice(0, 8)}`,
      'src/content',
      collection,
      current.filename,
    );
    await fs.mkdir(path.dirname(backup), { recursive: true });
    await fs.writeFile(backup, current.raw, { flag: 'wx' });
    // The CMS editor is a separate writer. Check again after validation/backup before committing.
    if (revisionOf(await fs.readFile(source, 'utf8')) !== input.revision)
      throw problem(409, `${label}刚刚被修改，请刷新列表后重试。`);
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
    return tableRow(
      { record: next, raw, filename: current.filename },
      await imagePaths(),
      await getCategories(),
    );
  }

  return async (req, res) => {
    try {
      const origin = localOrigin(req);
      if (!origin || (req.method !== 'GET' && req.headers.origin !== origin))
        throw problem(403, '仅允许从本机后台执行此操作。');
      if (!['', '/'].includes((req.url ?? '').split('?')[0])) throw problem(404, '接口不存在。');
      if (req.method === 'GET') {
        const [all, categories, images] = await Promise.all([
          records(),
          getCategories(),
          imagePaths(),
        ]);
        return json(res, 200, {
          [collection]: all.map((record) => tableRow(record, images, categories)),
          categories: categories.map(({ slug, name }) => ({ slug, name })),
        });
      }
      if (req.method !== 'POST') {
        res.setHeader('Allow', 'GET, POST');
        throw problem(405, '不支持此请求方式。');
      }
      if (!req.headers['content-type']?.toLowerCase().startsWith('application/json'))
        throw problem(415, '请使用 JSON 提交操作。');
      const input = await body(req);
      const pending = mutationQueue.then(() => mutate(input));
      mutationQueue = pending.catch(() => {});
      return json(res, 200, { [singular]: await pending });
    } catch (error) {
      json(res, Number.isInteger(error.status) ? error.status : 500, {
        error: Number.isInteger(error.status) ? error.message : '操作未完成，请稍后重试。',
      });
    }
  };
}

/** Mount at /__cms/products in the development server only. */
export function createProductAdminHandler({ root, validateProduct, getCategories }) {
  return createContentAdminHandler({
    root,
    validateRecord: validateProduct,
    getCategories,
    collection: 'products',
  });
}

/** Article actions preserve publication date/slug and update only the real modification timestamp. */
export function createArticleAdminHandler({ root, validateArticle, getCategories }) {
  return createContentAdminHandler({
    root,
    validateRecord: validateArticle,
    getCategories,
    collection: 'articles',
  });
}
