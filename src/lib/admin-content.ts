import { getSecret } from 'astro:env/server';
import imageIndex from '../admin/image-index.json';
import { adminStore } from './admin-server';
import { adminSeed } from './admin-seed';
import { adminProblem } from './admin-auth.mjs';
import {
  collectWorkspace,
  emptySeo,
  localHandler,
  withWorkspace,
  writableWorkspace,
} from './admin-workspace.mjs';
import { contentFile, loadBlogPosts, loadProducts } from './data';
import { validateCloudRecord } from './admin-validation';
import { validateTaxonomy } from './taxonomy-model.mjs';
import { landingPages } from './landing-pages';
import {
  createProductAdminHandler,
  createArticleAdminHandler,
} from '../../scripts/product-admin-api.mjs';
import { createTaxonomyAdminHandler } from '../../scripts/taxonomy-admin-api.mjs';
import { createSeoAdminHandler } from '../../scripts/seo-admin-api.mjs';
import { createSeoResearchProvider } from '../../scripts/seo-research-provider.mjs';

export const cloudContentPaths = new Set([
  'products',
  'articles',
  'taxonomy',
  'seo',
  'content-index',
]);
const seoPath = 'src/content/settings/seo-workspace.json';

/** The bundled seed contains public content only; private SEO data always starts empty. */
export async function loadCloudWorkspace() {
  const store = adminStore();
  const current = await store.load();
  if (current) return current;
  const initial = adminSeed();
  initial.files[seoPath] = emptySeo();
  return store.initialize(initial);
}

function records(document: any, collection: 'products' | 'articles') {
  try {
    return Object.entries(document.files as Record<string, string>)
      .filter(([filename]) => filename.startsWith(`src/content/${collection}/`))
      .map(([filename, raw]) => ({
        filename,
        entryKey: filename.split('/').pop()!.slice(0, -5),
        record: contentFile(filename, JSON.parse(raw), collection === 'products' ? 'id' : 'slug'),
      }));
  } catch {
    throw adminProblem(422, '云端产品或文章资料格式无效，请联系维护人员检查。');
  }
}

/** Callers must authorize previews before reading a draft or a retired record. */
export async function getCloudRecord(
  collection: 'products' | 'articles',
  id: string,
): Promise<Record<string, unknown> | null> {
  if (!['products', 'articles'].includes(collection) || typeof id !== 'string') return null;
  const current = await loadCloudWorkspace();
  const found = records(current.document, collection).find(
    ({ record }) => record[collection === 'products' ? 'id' : 'slug'] === id,
  );
  return found ? { ...found.record, entryKey: found.entryKey } : null;
}

function contentIndex(document: any) {
  const index: Record<string, any> = {
    products: {},
    articles: {},
    productMeta: {},
    articleMeta: {},
  };
  for (const collection of ['products', 'articles'] as const) {
    for (const { entryKey, record } of records(document, collection)) {
      index[collection][entryKey] = record[collection === 'products' ? 'id' : 'slug'];
      index[collection === 'products' ? 'productMeta' : 'articleMeta'][entryKey] =
        Object.fromEntries(
          (collection === 'products'
            ? ['createdAt', 'updatedAt', 'deletedAt']
            : ['dateModified', 'deletedAt']
          )
            .filter((field) => record[field])
            .map((field) => [field, record[field]]),
        );
    }
  }
  return index;
}

/** Reuse local action contracts on a disposable snapshot, then commit once with durable cloud CAS. */
export async function handleCloudContent(name: string, method: string, input?: unknown) {
  if (!cloudContentPaths.has(name)) throw adminProblem(404, '接口不存在。');
  if (!['GET', 'POST'].includes(method) || (name === 'content-index' && method !== 'GET'))
    throw adminProblem(405, '不支持此请求方式。');
  const current = await loadCloudWorkspace();
  if (name === 'content-index') return { status: 200, value: contentIndex(current.document) };
  if (method === 'POST') writableWorkspace(current.document);
  let taxonomy;
  try {
    taxonomy = validateTaxonomy(
      JSON.parse(current.document.files['src/content/settings/taxonomy.json']),
    );
  } catch {
    throw adminProblem(422, '云端分类资料格式无效，请联系维护人员检查。');
  }
  const categories = taxonomy.categories.filter((category) => !category.deletedAt);
  const store = adminStore();
  return withWorkspace(current.document, imageIndex, async (root: string) => {
    const handlers = {
      products: () =>
        createProductAdminHandler({
          root,
          getCategories: async () => categories,
          validateProduct: async (record: unknown) => {
            validateCloudRecord('products', record, current.document);
            return loadProducts([record], categories);
          },
        }),
      articles: () =>
        createArticleAdminHandler({
          root,
          getCategories: async () => categories,
          validateArticle: async (record: unknown) => {
            validateCloudRecord('articles', record, current.document);
            return loadBlogPosts([record], categories);
          },
        }),
      taxonomy: () =>
        createTaxonomyAdminHandler({ root, getLandingPages: async () => landingPages }),
      seo: () =>
        createSeoAdminHandler({
          root,
          ...createSeoResearchProvider({
            getConfig: () => ({
              apiKey: getSecret('SEO_OPENAI_API_KEY'),
              model: getSecret('SEO_OPENAI_MODEL'),
            }),
          }),
        }),
    };
    const handler = handlers[name as keyof typeof handlers]();
    const result = (await localHandler(handler, method, input)) as {
      status: number;
      value: unknown;
    };
    if (method === 'POST' && result.status >= 200 && result.status < 300) {
      const next = await collectWorkspace(root, current.document);
      await store.save(current.revision, next);
    }
    return result;
  });
}
