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
  /** Listed in Resources but kept out of the sitemap (page itself is noindex). */
  noindex?: boolean;
  description: string;
}[] = [
  {
    title: 'Custom PV Combiner Boxes for Solar Projects',
    href: '/pv-combiner-box',
    groupSlug: 'solar-pv-components',
    topics: ['pv-combiner-box'],
    nav: true,
    description:
      'Plan custom PV combiner boxes for solar projects, from circuit configuration and enclosure layout to OEM branding and project supply.',
  },
  {
    title: '金属光伏汇流箱选型（中文）',
    href: '/cn/steel-combiner-box-selector',
    groupSlug: 'solar-pv-components',
    topics: ['pv-combiner-box'],
    noindex: true,
    description:
      'ST 系列冷轧钢板汇流箱选型计算器：按电压、单串 Isc 和路数推荐型号，并匹配熔丝、断路器和 SPD。',
  },
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
