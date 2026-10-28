import { adminProblem } from './admin-auth.mjs';
import { loadProducts, loadBlogPosts } from './data';
import { validateTaxonomy } from './taxonomy-model.mjs';
import imageIndex from '../admin/image-index.json';

/** The same content and media checks apply to editor saves, list publication actions and final export. */
export function validateCloudRecord(
  collection: 'products' | 'articles',
  record: any,
  document: any,
) {
  const taxonomy = validateTaxonomy(
    JSON.parse(document.files['src/content/settings/taxonomy.json']),
  );
  const categories = taxonomy.categories.filter((item) => !item.deletedAt);
  if (collection === 'products')
    record.categoryName = categories.find((item) => item.slug === record.categorySlug)?.name ?? '';
  try {
    if (collection === 'products') loadProducts([record], categories);
    else loadBlogPosts([record], categories);
    for (const key of collection === 'products'
      ? [
          'features',
          'images',
          'descriptionImages',
          'imageAlts',
          'additionalCategorySlugs',
          'productTypes',
        ]
      : ['tags', 'relatedProductTypes'])
      if (
        record[key] !== undefined &&
        (!Array.isArray(record[key]) ||
          record[key].some((value: unknown) => typeof value !== 'string'))
      )
        throw new Error();
  } catch {
    throw adminProblem(422, '内容资料无效，请核对分类、标题、图片、正文与必填信息。');
  }
  for (const name of [
    record.image,
    ...(record.images ?? []),
    ...(record.descriptionImages ?? []),
  ]) {
    if (!name && !record.published) continue;
    if (
      typeof name !== 'string' ||
      !name.startsWith('/images/') ||
      !(
        imageIndex.some((known) => known.toLowerCase() === name.toLowerCase()) ||
        Object.hasOwn(document.media, `public${name}`)
      )
    )
      throw adminProblem(422, '图片尚未上传成功，请通过图片选择器重新选择。');
  }
}
