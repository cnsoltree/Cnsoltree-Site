import type { ProductSubcategory } from './product-taxonomy';

/**
 * Published commercial landing pages. Add new pages here to include them in the directory.
 * `nav: true` points the matching product-menu entry at the landing page instead of the category.
 */
export const landingPages: {
  title: string;
  href: string;
  groupSlug: string;
  topics: string[];
  nav?: boolean;
  description: string;
}[] = [
  {
    title: 'AC MCB Miniature Circuit Breakers',
    href: '/ac-mcb',
    groupSlug: 'circuit-protection',
    topics: ['mcb'],
    nav: true,
    description:
      'Compare AC miniature circuit breakers, STA/STB/STC series and 1P to 4P options for distribution projects.',
  },
  {
    title: 'DC MCB for Solar PV & DC Circuits',
    href: '/dc-mcb',
    groupSlug: 'solar-pv-components',
    topics: ['dc-circuit-breaker'],
    nav: true,
    description:
      'Compare 1P to 4P DC miniature circuit breakers, review listed ratings and plan compatible PV and DC circuit protection.',
  },
  {
    title: 'DC Surge Protector for Solar PV',
    href: '/dc-surge-protector',
    groupSlug: 'solar-pv-components',
    topics: ['dc-surge-protector'],
    nav: true,
    description:
      'Choose Type 2 DC surge protectors for 500V to 1500V PV systems, compare materials and request an OEM quote.',
  },
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
