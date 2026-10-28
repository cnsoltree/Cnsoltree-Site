import type { ProductSubcategory } from './product-taxonomy';

/** Published commercial landing pages. Add new pages here to include them in the directory. */
export const landingPages = [
  {
    title: 'Aerosol Fire Extinguisher',
    href: '/solutions/aerosol-fire-extinguisher',
    groupSlug: 'fire-suppression',
    topics: ['aerosol-fire-extinguisher'],
    description:
      'Explore compact aerosol fire suppression for electrical cabinets, with product options and OEM support.',
  },
];

export function resourceCategoryHref(group: string) {
  return `/resources/category/${group}`;
}

export function resourceTopicSlug(item: ProductSubcategory) {
  return item.slug;
}

export function resourceTopicHref(group: string, item: ProductSubcategory) {
  return `${resourceCategoryHref(group)}/${resourceTopicSlug(item)}`;
}

export function matchesResource(
  page: (typeof landingPages)[number],
  group: string,
  topic?: string,
) {
  return page.groupSlug === group && (!topic || page.topics.includes(topic));
}
