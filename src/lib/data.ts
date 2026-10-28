import { categories, allCategories } from './taxonomy';
import type { TaxonomyCategory as Category } from './taxonomy';
export type { Category }; // ─── Types ───────────────────────────────────────────────────────────────────

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  /** 可选：额外出现在其他类目页的类目 slug 列表（不影响主类目） */
  additionalCategorySlugs?: string[];
  categoryName: string;
  productTypes?: string[];
  published?: boolean;
  sortOrder?: number;
  /** Present for newly managed records; historical dates are not inferred. */
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  /**
   * 封面图（必填） – 用于产品列表卡片封面，也作为详情页第一张图
   * 路径示例 – /images/products/mcb-1p-c.jpg"
   */
  image: string;
  /**
   * 产品主图集（可选，最 – 8 张） – 在详情页顶部以缩略图 + 大图形式展示
   * 不填时详情页仅显 – image 封面 – * 示例 – *   images: [
   *     "/images/products/mcb-1p-c-1.jpg",
   *     "/images/products/mcb-1p-c-2.jpg",
   *     "/images/products/mcb-1p-c-3.jpg",
   *   ]
   */
  images?: string[];
  /**
   * 描述区图片（可选） – 显示在产品描述文字下方，支持多张
   * 适合放安装图、应用场景图、接线图 – * 示例 – *   descriptionImages: [
   *     "/images/products/mcb-1p-c-wiring.jpg",
   *     "/images/products/mcb-1p-c-application.jpg",
   *   ]
   */
  descriptionImages?: string[];
  badge?: 'New' | 'Hot' | 'Featured';
  /**
   * SEO 字段（可选） – 不填时自动用 name / shortDescription 生成兜底 – *
   * metaTitle – 浏览器标签页和搜索结果标题，建议格式 – *                  "产品 – | 品类关键 – | Soltree"
   *                  示例 – MCB 1P AC 6-63A Circuit Breaker | Miniature Circuit Breaker Supplier | Soltree"
   *
   * metaDescription – 搜索结果摘要，建 – 120 – 60 字符，包含核心关键词 + 行动 – *                  示例 – Buy MCB 1P AC 6-63A circuit breaker from Soltree. CE & RoHS certified, OEM available, ships worldwide."
   *
   * metaKeywords – 关键词列表（逗号分隔），3 – 个，覆盖产品型号、品类、应用场 – *                  示例 – MCB 1P, miniature circuit breaker, DIN rail MCB, circuit breaker supplier, CE certified MCB"
   *
   * imageAlts – 每张主图对应 – alt 文字，顺序与 images 数组一 – *                  好的 alt 应包含产品型 – + 视角/细节描述
   *                  示例：[
   *                    "MCB-AC-1P single pole circuit breaker front view",
   *                    "MCB-AC-1P circuit breaker side profile",
   *                    "MCB-AC-1P DIN rail mounting detail",
   *                  ]
   */
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  imageAlts?: string[];
}

export interface BlogPost {
  published?: boolean;
  sortOrder?: number;
  deletedAt?: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  /** ISO date of last modification — used for schema.org dateModified & freshness signals */
  dateModified?: string;
  author: string;
  image: string;
  tags: string[];
  readingTime: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  relatedCategorySlug?: string;
  /** Product types covered by the article, e.g. ['MCB', 'DC']; used for topic filters. */
  relatedProductTypes?: string[];
}

// ─── Categories ───────────────────────────────────────────────────────────────

export { categories, allCategories };

// ─── Products ─────────────────────────────────────────────────────────────────

const productsRecords = import.meta.glob('../content/products/*.json', {
  eager: true,
  import: 'default',
});
export const products = loadProducts(
  Object.entries(productsRecords).map(([file, value]) => contentFile(file, value, 'id')),
);

// ─── Blog Posts ───────────────────────────────────────────────────────────────

const blogPostsRecords = import.meta.glob('../content/articles/*.json', {
  eager: true,
  import: 'default',
});
export const blogPosts = loadBlogPosts(
  Object.entries(blogPostsRecords).map(([file, value]) => contentFile(file, value, 'slug')),
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function record(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error('Content must be a JSON object.');
  return value as Record<string, unknown>;
}

export function contentFile(file: string, value: unknown, key: 'id' | 'slug') {
  const content = record(value);
  const basename = file.split('/').pop();
  if (
    basename !== `${content[key]}.json` &&
    !(
      key === 'id' &&
      typeof content.id === 'string' &&
      basename === `${content.id.toLowerCase()}.json`
    )
  )
    throw new Error(
      `${file}: ${key} must match the existing filename. Create a new entry for a new URL.`,
    );
  return content;
}

function requireText(value: Record<string, unknown>, keys: string[], label: string) {
  for (const key of keys)
    if (typeof value[key] !== 'string' || !value[key].trim())
      throw new Error(`${label}: ${key} is required.`);
}

function requireStrings(value: unknown, label: string) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string'))
    throw new Error(`${label} must be a list of text values.`);
}

function validTimestamp(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  const parts =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.exec(value);
  if (!parts || !Number.isFinite(Date.parse(value))) return false;
  const [, year, month, day, hour, minute, second] = parts.map(Number);
  return (
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= new Date(Date.UTC(year, month, 0)).getUTCDate() &&
    hour <= 23 &&
    minute <= 59 &&
    second <= 59
  );
}

function publishedRecords(records: unknown[], key: 'id' | 'slug') {
  const seen = new Set<string>();
  return records
    .map((value) => {
      const content = { ...record(value) };
      for (const field of ['metaTitle', 'metaDescription', 'metaKeywords', 'dateModified', 'badge'])
        if (content[field] === '' || content[field] === null) delete content[field];
      return content;
    })
    .filter((value) => {
      const id = value[key];
      const pattern = key === 'id' ? /^[A-Za-z0-9][A-Za-z0-9_-]*$/ : /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      if (typeof id !== 'string' || !pattern.test(id)) throw new Error(`Invalid content ${key}.`);
      if (seen.has(id.toLowerCase())) throw new Error(`Duplicate content ${key}: ${id}`);
      seen.add(id.toLowerCase());
      if (typeof value.published !== 'boolean')
        throw new Error(`${id}: published must be true or false.`);
      for (const field of ['metaTitle', 'metaDescription', 'metaKeywords'])
        if (value[field] !== undefined && typeof value[field] !== 'string')
          throw new Error(`${id}: ${field} must be text.`);
      if (
        value.sortOrder !== undefined &&
        (typeof value.sortOrder !== 'number' || !Number.isFinite(value.sortOrder))
      )
        throw new Error(`${id}: sort order must be a number.`);
      for (const field of key === 'id' ? ['createdAt', 'updatedAt', 'deletedAt'] : ['deletedAt'])
        if (value[field] !== undefined && !validTimestamp(value[field]))
          throw new Error(`${id}: ${field} must be a valid ISO timestamp.`);
      return value.published && !value.deletedAt;
    })
    .sort(
      (a, b) =>
        Number(a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
        Number(b.sortOrder ?? Number.MAX_SAFE_INTEGER),
    );
}

export function loadProducts(records: unknown[]): Product[] {
  return publishedRecords(records, 'id').map((value) => {
    const label = `Product ${value.id}`;
    requireText(
      value,
      ['name', 'slug', 'categorySlug', 'categoryName', 'shortDescription', 'description', 'image'],
      label,
    );
    const category = categories.find((category) => category.slug === value.categorySlug);
    if (!category) throw new Error(`${label}: unknown category.`);
    requireStrings(value.features, `${label}: features`);
    for (const key of [
      'additionalCategorySlugs',
      'images',
      'descriptionImages',
      'imageAlts',
      'productTypes',
    ])
      if (value[key] !== undefined) requireStrings(value[key], `${label}: ${key}`);
    if (
      value.additionalCategorySlugs &&
      (value.additionalCategorySlugs as string[]).some(
        (slug) => !categories.some((category) => category.slug === slug),
      )
    )
      throw new Error(`${label}: unknown additional category.`);
    if (
      value.productTypes &&
      (value.productTypes as string[]).some((type) => !['MCB', 'MCCB', 'RCCB', 'DC'].includes(type))
    )
      throw new Error(`${label}: unknown product type.`);
    if (!Array.isArray(value.specs)) throw new Error(`${label}: specs must be a list.`);
    const names = new Set<string>();
    const specs = Object.fromEntries(
      value.specs.map((spec) => {
        const pair = record(spec);
        requireText(pair, ['name', 'value'], `${label} specification`);
        if (names.has(pair.name as string))
          throw new Error(`${label}: duplicate specification ${pair.name}.`);
        names.add(pair.name as string);
        return [pair.name as string, pair.value as string];
      }),
    );
    return { ...value, categoryName: category.name, specs } as unknown as Product;
  });
}

export function loadBlogPosts(records: unknown[]): BlogPost[] {
  return publishedRecords(records, 'slug').map((value) => {
    const label = `Article ${value.slug}`;
    requireText(
      value,
      ['title', 'excerpt', 'content', 'date', 'author', 'image', 'relatedCategorySlug'],
      label,
    );
    if (!categories.some((category) => category.slug === value.relatedCategorySlug))
      throw new Error(`${label}: unknown category.`);
    for (const key of ['date', 'dateModified']) {
      if (
        value[key] !== undefined &&
        (typeof value[key] !== 'string' || !Number.isFinite(Date.parse(value[key] as string)))
      )
        throw new Error(`${label}: invalid ${key}.`);
    }
    requireStrings(value.tags, `${label}: tags`);
    if (value.relatedProductTypes !== undefined)
      requireStrings(value.relatedProductTypes, `${label}: product types`);
    if (!Number.isFinite(value.readingTime) || Number(value.readingTime) < 1)
      throw new Error(`${label}: reading time must be a positive number.`);
    return value as unknown as BlogPost;
  });
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return allCategories.find((c) => c.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(
    (p) => p.categorySlug === categorySlug || p.additionalCategorySlugs?.includes(categorySlug),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge).slice(0, 6);
}

export function getLatestBlogPosts(count = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}
