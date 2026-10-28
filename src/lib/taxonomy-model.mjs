/** @typedef {'products' | 'articles'} TaxonomySurface */
/** @typedef {{visible: boolean, order: number}} TaxonomyPlacement */
/** @typedef {{slug: string, name: string, shortDescription: string, description: string, image: string, deletedAt?: string}} TaxonomyCategory */
/** @typedef {{slug: string, name: string, category: string, type?: string, deletedAt?: string, products: TaxonomyPlacement, articles: TaxonomyPlacement}} TaxonomyItem */
/** @typedef {{slug: string, name: string, description: string, icon: string, deletedAt?: string, products: TaxonomyPlacement, articles: TaxonomyPlacement, items: TaxonomyItem[]}} TaxonomyGroup */
/** @typedef {{version: 1, categories: TaxonomyCategory[], groups: TaxonomyGroup[]}} TaxonomyDocument */

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const typeCodes = new Set(['MCB', 'MCCB', 'RCCB', 'DC']);

function object(value, fields, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value))
    throw new Error(`${label} must be an object.`);
  for (const key of Object.keys(value))
    if (!fields.includes(key)) throw new Error(`${label}: unknown field ${key}.`);
  return value;
}

function text(value, label, limit = 120) {
  if (
    typeof value !== 'string' ||
    !value.trim() ||
    value.length > limit ||
    /[<>\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(value)
  )
    throw new Error(`${label} must be plain text of 1–${limit} characters.`);
}

function slug(value, label) {
  if (typeof value !== 'string' || value.length > 100 || !slugPattern.test(value))
    throw new Error(`${label} must use lowercase letters, numbers and single hyphens.`);
}

function retirement(value, label) {
  if (value === undefined) return;
  if (
    typeof value !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(value) ||
    !Number.isFinite(Date.parse(value))
  )
    throw new Error(`${label}.deletedAt must be an ISO UTC timestamp.`);
  const normalized = new Date(value).toISOString();
  if (normalized.slice(0, 19) !== value.slice(0, 19))
    throw new Error(`${label}.deletedAt must be a valid calendar timestamp.`);
}

function placement(value, label) {
  object(value, ['visible', 'order'], label);
  if (
    typeof value.visible !== 'boolean' ||
    !Number.isSafeInteger(value.order) ||
    value.order < 0 ||
    value.order > 1000000
  )
    throw new Error(`${label} requires visible:boolean and order:integer from 0 to 1000000.`);
}

function list(value, label, max) {
  if (!Array.isArray(value) || value.length > max)
    throw new Error(`${label} must be a list of at most ${max} entries.`);
}

/** Validate persisted taxonomy without modifying it. @param {unknown} input @returns {TaxonomyDocument} */
export function validateTaxonomy(input) {
  const document = object(input, ['version', 'categories', 'groups'], 'Taxonomy');
  if (document.version !== 1) throw new Error('Unsupported taxonomy version.');
  list(document.categories, 'Categories', 250);
  list(document.groups, 'Groups', 100);
  const categories = new Set();
  for (const category of document.categories) {
    object(
      category,
      ['slug', 'name', 'shortDescription', 'description', 'image', 'deletedAt'],
      'Category',
    );
    slug(category.slug, 'Category slug');
    if (categories.has(category.slug)) throw new Error(`Duplicate category: ${category.slug}`);
    categories.add(category.slug);
    text(category.name, 'Category name');
    text(category.shortDescription, 'Category summary', 500);
    text(category.description, 'Category description', 10000);
    if (
      typeof category.image !== 'string' ||
      category.image.length > 300 ||
      !/^\/images\/[A-Za-z0-9][A-Za-z0-9_./-]*\.(?:png|jpe?g|webp|avif)$/i.test(category.image) ||
      category.image.split('/').some((part) => part === '.' || part === '..')
    )
      throw new Error(`${category.slug}: image must be a local image under /images/.`);
    retirement(category.deletedAt, category.slug);
  }
  const groupSlugs = new Set();
  for (const group of document.groups) {
    object(
      group,
      ['slug', 'name', 'description', 'icon', 'deletedAt', 'products', 'articles', 'items'],
      'Group',
    );
    slug(group.slug, 'Group slug');
    if (groupSlugs.has(group.slug)) throw new Error(`Duplicate group: ${group.slug}`);
    groupSlugs.add(group.slug);
    text(group.name, 'Group name');
    text(group.description, 'Group description', 2000);
    if (
      typeof group.icon !== 'string' ||
      !group.icon ||
      group.icon.length > 2000 ||
      !/^[MmLlHhVvCcSsQqTtAaZz0-9eE+.,\s-]+$/.test(group.icon)
    )
      throw new Error(`${group.slug}: icon must contain SVG path data only.`);
    retirement(group.deletedAt, group.slug);
    placement(group.products, `${group.slug}.products`);
    placement(group.articles, `${group.slug}.articles`);
    list(group.items, `${group.slug}.items`, 100);
    const itemSlugs = new Set();
    for (const item of group.items) {
      object(
        item,
        ['slug', 'name', 'category', 'type', 'deletedAt', 'products', 'articles'],
        'Topic',
      );
      slug(item.slug, 'Topic slug');
      if (itemSlugs.has(item.slug))
        throw new Error(`Duplicate topic in ${group.slug}: ${item.slug}`);
      itemSlugs.add(item.slug);
      text(item.name, 'Topic name');
      if (!categories.has(item.category))
        throw new Error(`${group.slug}/${item.slug}: unknown category.`);
      if (item.type !== undefined && !typeCodes.has(item.type))
        throw new Error(`${group.slug}/${item.slug}: unknown product type.`);
      retirement(item.deletedAt, `${group.slug}/${item.slug}`);
      placement(item.products, `${group.slug}/${item.slug}.products`);
      placement(item.articles, `${group.slug}/${item.slug}.articles`);
    }
  }
  return /** @type {TaxonomyDocument} */ (document);
}

/** Select ordered navigation or all historic routes. Hidden entries keep their identities.
 * @param {TaxonomyDocument} document
 * @param {TaxonomySurface} surface
 * @param {boolean} [visibleOnly]
 * @returns {TaxonomyGroup[]}
 */
export function getTaxonomyGroups(document, surface, visibleOnly = true) {
  validateTaxonomy(document);
  if (!['products', 'articles'].includes(surface) || typeof visibleOnly !== 'boolean')
    throw new Error('Invalid taxonomy surface or visibility selection.');
  const retiredCategories = new Set(
    document.categories.filter((category) => category.deletedAt).map((category) => category.slug),
  );
  return document.groups
    .filter((group) => !visibleOnly || (!group.deletedAt && group[surface].visible))
    .map((group) => ({
      ...group,
      items: group.items
        .filter(
          (item) =>
            !visibleOnly ||
            (!item.deletedAt && item[surface].visible && !retiredCategories.has(item.category)),
        )
        .map((item) => ({ ...item }))
        .sort((a, b) => a[surface].order - b[surface].order),
    }))
    .sort((a, b) => a[surface].order - b[surface].order);
}

/** Match safely even when a local draft is incomplete. @param {Record<string, any>} product @param {TaxonomyItem} item */
export function matchesTaxonomyProduct(product, item) {
  const inCategory =
    product.categorySlug === item.category ||
    (Array.isArray(product.additionalCategorySlugs) &&
      product.additionalCategorySlugs.includes(item.category));
  const types = Array.isArray(product.productTypes) ? product.productTypes : [];
  return Boolean(
    inCategory &&
    (!item.type ||
      (types.length
        ? types.includes(item.type)
        : String(product.name ?? '')
            .toUpperCase()
            .split(/[^A-Z0-9]+/)
            .includes(item.type))),
  );
}

/** @param {Record<string, any>} post @param {TaxonomyItem} item */
export function matchesTaxonomyArticle(post, item) {
  if (post.relatedCategorySlug !== item.category) return false;
  return (
    !item.type ||
    (Array.isArray(post.relatedProductTypes) && post.relatedProductTypes.includes(item.type)) ||
    (Array.isArray(post.tags) &&
      post.tags.some((tag) => typeof tag === 'string' && tag.toUpperCase() === item.type))
  );
}

/** @param {Record<string, any>} post @param {{slug: string, items: TaxonomyItem[]}} group */
export function matchesTaxonomyArticleGroup(post, group) {
  if (group.slug === 'circuit-protection' && post.relatedCategorySlug === 'circuit-breaker')
    return true;
  return group.items.some((item) => matchesTaxonomyArticle(post, item));
}
