import type { Product } from './data';
import type { TaxonomyItem } from './taxonomy';
import { allProductGroups } from './taxonomy';
import { matchesTaxonomyProduct } from './taxonomy-model.mjs';
export * from './taxonomy';
export type ProductSubcategory = TaxonomyItem;

export function groupHref(slug: string) {
  return `/products?group=${slug}`;
}

export function subcategoryHref(item: ProductSubcategory, group: string) {
  const query = new URLSearchParams({ group });
  if (item.type) query.set('type', item.type);
  return `/categories/${item.category}?${query}`;
}

export function matchesSubcategory(product: Product, item: ProductSubcategory) {
  return matchesTaxonomyProduct(product, item);
}

export function getProductGroup(slug?: string | string[]) {
  return allProductGroups.find((group) => group.slug === slug);
}

export function getCategorySelection(
  category: string,
  type?: string | string[],
  groupSlug?: string | string[],
) {
  const requestedGroup = getProductGroup(groupSlug);
  const findItem = (group: (typeof allProductGroups)[number]) =>
    group.items.find(
      (item: ProductSubcategory) => item.category === category && item.type === type,
    );
  const group =
    requestedGroup && findItem(requestedGroup)
      ? requestedGroup
      : (allProductGroups.find(findItem) ??
        allProductGroups.find((candidate) =>
          candidate.items.some((item) => item.category === category),
        ));
  return { group, item: group ? findItem(group) : undefined };
}
