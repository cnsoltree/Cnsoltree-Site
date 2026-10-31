/**
 * 多语言：英文是根路径的源语言，其他语言放在 /{lang}/ 子目录。
 * 界面文案以英文原文为键（src/i18n/{lang}/ui.json），缺失时回退英文；
 * 界面文案可拆成多个 ui*.json（如 ui-about.json），按语言合并。
 * 产品/文章/分类译文在 src/i18n/{lang}/products、articles 与 taxonomy.json，
 * 只有已翻译的产品和文章才生成该语言页面。
 * 新增语言：在 locales 加一项，并补齐对应目录下的译文。
 */
import {
  products as sourceProducts,
  categories as sourceCategories,
  blogPosts as sourcePosts,
  type Product,
  type Category,
  type BlogPost,
} from '@/lib/data';
import {
  productGroups as sourceGroups,
  allProductGroups,
  articleGroups as sourceArticleGroups,
  allArticleGroups,
} from '@/lib/taxonomy';
import { matchesBlogGroup } from '@/lib/blog-taxonomy';
import { articleSummary } from '@/lib/article-excerpt.mjs';
import { redirects } from '@/lib/redirects.mjs';
import type { ArticleTranslation, ProductTranslation } from './source-hash.mjs';

export const locales = {
  en: { label: 'English', hreflang: 'en', ogLocale: 'en_US', dir: 'ltr', name: 'English' },
  // 目标市场是拉美，Open Graph 使用拉美西语
  es: { label: 'Español', hreflang: 'es', ogLocale: 'es_LA', dir: 'ltr', name: 'Spanish' },
} as const;
export type Lang = keyof typeof locales;
export const defaultLang: Lang = 'en';
export const translatedLangs: Lang[] = (Object.keys(locales) as Lang[]).filter(
  (l) => l !== defaultLang,
);

interface TaxonomyTranslation {
  categories?: Record<string, { name?: string; shortDescription?: string; description?: string }>;
  groups?: Record<string, { name?: string; description?: string }>;
  items?: Record<string, string>;
}

const uiFiles = import.meta.glob<Record<string, string>>('./*/ui*.json', {
  eager: true,
  import: 'default',
});
const taxonomyFiles = import.meta.glob<TaxonomyTranslation>('./*/taxonomy.json', {
  eager: true,
  import: 'default',
});
const productFiles = import.meta.glob<ProductTranslation>('./*/products/*.json', {
  eager: true,
  import: 'default',
});
const articleFiles = import.meta.glob<ArticleTranslation>('./*/articles/*.json', {
  eager: true,
  import: 'default',
});
const uiCache = new Map<Lang, Record<string, string>>();
function ui(lang: Lang) {
  if (!uiCache.has(lang))
    uiCache.set(
      lang,
      Object.assign(
        {},
        ...Object.entries(uiFiles)
          .filter(([file]) => file.startsWith(`./${lang}/`))
          .map(([, strings]) => strings),
      ),
    );
  return uiCache.get(lang)!;
}
const taxonomyText = (lang: Lang) => taxonomyFiles[`./${lang}/taxonomy.json`] ?? {};

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && Object.hasOwn(locales, value);
}

/** 当前页面语言：取路径第一段，非已知语言即英文。 */
export function langFromUrl(url: URL): Lang {
  const first = url.pathname.split('/')[1];
  return isLang(first) ? first : defaultLang;
}

/** 去掉语言前缀后的英文路径，用于语言切换与 hreflang。 */
export function basePath(url: URL) {
  const lang = langFromUrl(url);
  if (lang === defaultLang) return url.pathname;
  return url.pathname.slice(lang.length + 1) || '/';
}

const reported = new Set<string>();
/** 翻译界面文案；{name} 占位符按 vars 替换。缺失译文时回退英文，并在构建日志提示一次。 */
export function t(lang: Lang, text: string, vars: Record<string, string | number> = {}) {
  const translated = lang === defaultLang ? text : ui(lang)[text];
  if (translated === undefined && !reported.has(lang + text)) {
    reported.add(lang + text);
    console.warn(`[i18n] ${lang} missing: ${JSON.stringify(text)}`);
  }
  const value = translated ?? text;
  return value.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match));
}

function translation(lang: Lang, id: string) {
  return productFiles[`./${lang}/products/${id}.json`];
}

function localizeCategory<T extends Pick<Category, 'slug' | 'name'>>(lang: Lang, category: T): T {
  const text = taxonomyText(lang).categories?.[category.slug];
  return text ? { ...category, ...dropEmpty(text) } : category;
}

function dropEmpty<T extends object>(value: T): Partial<T> {
  return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== '' && v != null)) as T;
}

export function getCategories(lang: Lang): Category[] {
  return sourceCategories.map((category) => localizeCategory(lang, category));
}

function localizeGroups(lang: Lang, groups: typeof sourceGroups) {
  const text = taxonomyText(lang);
  return groups.map((group) => ({
    ...group,
    ...dropEmpty(text.groups?.[group.slug] ?? {}),
    items: group.items.map((item) => ({ ...item, name: text.items?.[item.slug] || item.name })),
  }));
}

export function getProductGroups(lang: Lang) {
  return localizeGroups(lang, sourceGroups);
}

export function getAllProductGroups(lang: Lang) {
  return localizeGroups(lang, allProductGroups);
}

export function getArticleGroups(lang: Lang) {
  return localizeGroups(lang, sourceArticleGroups);
}

export function getAllArticleGroups(lang: Lang) {
  return localizeGroups(lang, allArticleGroups);
}

function validTranslation(id: string, value: ProductTranslation) {
  const label = `Translation ${id}`;
  for (const key of ['name', 'shortDescription', 'description'] as const)
    if (typeof value[key] !== 'string' || !value[key].trim())
      throw new Error(`${label}: ${key} is required.`);
  if (!Array.isArray(value.features) || value.features.some((f) => typeof f !== 'string'))
    throw new Error(`${label}: features must be a list of text values.`);
  if (
    !Array.isArray(value.specs) ||
    value.specs.some((s) => typeof s?.name !== 'string' || typeof s?.value !== 'string')
  )
    throw new Error(`${label}: specs must be a list of name/value pairs.`);
}

const productCache = new Map<Lang, Product[]>();
/** 英文返回全部产品；其他语言只返回已翻译的产品，避免生成英文重复页面。 */
export function getProducts(lang: Lang): Product[] {
  if (lang === defaultLang) return sourceProducts;
  const cached = productCache.get(lang);
  if (cached) return cached;
  const categories = getCategories(lang);
  const localized = sourceProducts.flatMap((product) => {
    const text = translation(lang, product.id);
    if (!text) return [];
    validTranslation(product.id, text);
    const { sourceHash: _hash, specs, ...fields } = text;
    return [
      {
        ...product,
        ...dropEmpty(fields),
        specs: Object.fromEntries(specs.map((spec) => [spec.name, spec.value])),
        categoryName:
          categories.find((c) => c.slug === product.categorySlug)?.name ?? product.categoryName,
      } as Product,
    ];
  });
  productCache.set(lang, localized);
  return localized;
}

const postCache = new Map<Lang, BlogPost[]>();
/** 英文返回全部文章；其他语言只返回已翻译的文章。 */
export function getBlogPosts(lang: Lang): BlogPost[] {
  if (lang === defaultLang) return sourcePosts;
  const cached = postCache.get(lang);
  if (cached) return cached;
  const localized = sourcePosts.flatMap((post) => {
    const text = articleFiles[`./${lang}/articles/${post.slug}.json`];
    if (!text) return [];
    for (const key of ['title', 'content'] as const)
      if (typeof text[key] !== 'string' || !text[key].trim())
        throw new Error(`Article translation ${post.slug}: ${key} is required.`);
    if (!Array.isArray(text.tags)) throw new Error(`Article translation ${post.slug}: tags.`);
    const { sourceHash: _hash, ...fields } = text;
    const merged = { ...post, ...dropEmpty(fields) };
    return [{ ...merged, excerpt: articleSummary(merged) } as BlogPost];
  });
  postCache.set(lang, localized);
  return localized;
}

/** 文章正文里的站内链接改指向当前语言页面（没有对应页面的保持英文）。 */
export function localizeLinks(lang: Lang, html: string) {
  if (lang === defaultLang) return html;
  return html.replace(/href="(\/[^"]*)"/g, (_, path: string) => {
    // 跳转地址先换成目标页，否则译文页会跳回英文
    const [clean, rest = ''] = path.split(/(?=[?#])/);
    const target = (redirects as Record<string, string>)[clean];
    return `href="${href(lang, target ? target + rest : path)}"`;
  });
}

const staticPages = [
  '/',
  '/products',
  '/contact',
  '/about',
  '/privacy',
  '/terms',
  '/solutions/aerosol-fire-extinguisher',
];

/** 某个英文路径在该语言下是否有页面。 */
export function hasPage(lang: Lang, path: string) {
  if (lang === defaultLang) return true;
  const clean = path.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  if (staticPages.includes(clean)) return true;
  // 博客首页在该语言没有任何文章时是 noindex，不作为语言版本
  if (clean === '/blog') return getBlogPosts(lang).length > 0;
  const category = /^\/categories\/([^/]+)$/.exec(clean)?.[1];
  if (category) return sourceCategories.some((c) => c.slug === category);
  const product = /^\/products\/([^/]+)$/.exec(clean)?.[1];
  if (product) return getProducts(lang).some((p) => p.id === product);
  const group = /^\/blog\/category\/([^/]+)$/.exec(clean)?.[1];
  if (group) {
    const family = allArticleGroups.find((g) => g.slug === group);
    // 没有译文文章的分类页是 noindex，不作为语言版本
    return Boolean(family && getBlogPosts(lang).some((post) => matchesBlogGroup(post, family)));
  }
  const post = /^\/blog\/([^/]+)$/.exec(clean)?.[1];
  if (post) return getBlogPosts(lang).some((p) => p.slug === post);
  return false;
}

/** 站内链接：该语言有对应页面时加前缀，否则指向英文页面。 */
export function href(lang: Lang, path: string) {
  if (lang === defaultLang || !path.startsWith('/') || !hasPage(lang, path)) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path.replace(/^\/(?=[?#])/, '')}`;
}

/** 当前页面的全部语言版本（只含真实存在的页面）。 */
export function alternates(path: string) {
  return (Object.keys(locales) as Lang[])
    .filter((lang) => hasPage(lang, path))
    .map((lang) => ({ lang, hreflang: locales[lang].hreflang, path: href(lang, path) }));
}
