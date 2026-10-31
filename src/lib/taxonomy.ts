import source from '../content/settings/taxonomy.json';
import { validateTaxonomy, getTaxonomyGroups } from './taxonomy-model.mjs';

export type {
  TaxonomyDocument,
  TaxonomyCategory,
  TaxonomyGroup,
  TaxonomyItem,
  TaxonomyPlacement,
  TaxonomySurface,
} from './taxonomy-model.mjs';
export { validateTaxonomy, getTaxonomyGroups } from './taxonomy-model.mjs';

export const taxonomy = validateTaxonomy(source);
export const allCategories = taxonomy.categories;
export const categories = allCategories.filter((category) => !category.deletedAt);
// “all” = hidden groups included (noindex pages); groups in the recycle bin never get pages.
export const allProductGroups = getTaxonomyGroups(taxonomy, 'products', false).filter(
  (group) => !group.deletedAt,
);
export const productGroups = getTaxonomyGroups(taxonomy, 'products');
export const allArticleGroups = getTaxonomyGroups(taxonomy, 'articles', false).filter(
  (group) => !group.deletedAt,
);
export const articleGroups = getTaxonomyGroups(taxonomy, 'articles');
