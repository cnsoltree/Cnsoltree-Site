// ─── Types ───────────────────────────────────────────────────────────────────

export interface Category {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  /** 可选：额外出现在其他类目页的类目 slug 列表（不影响主类目） */
  additionalCategorySlugs?: string[];
  categoryName: string;
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
  badge?: "New" | "Hot" | "Featured";
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
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    slug: "circuit-breaker",
    name: "Circuit Breaker",
    shortDescription: "Reliable overcurrent and short-circuit protection for LV systems.",
    description:
      "Our circuit breakers deliver dependable protection for low-voltage distribution systems across industrial, commercial, and residential applications. Engineered for long service life and compliance with IEC/EN standards.",
    image: "/images/categories/circuit-breaker.png",
  },
  {
    slug: "surge-protector-device",
    name: "Surge Protector Device",
    shortDescription: "Transient overvoltage suppression for sensitive equipment.",
    description:
      "Soltree surge protective devices (SPDs) safeguard electrical installations and connected equipment from lightning-induced surges and switching transients, meeting IEC 61643 Type 1/2/3 requirements.",
    image: "/images/categories/surge-protector-device.png",
  },
  {
    slug: "dc-fuse-holder",
    name: "DC Fuse Holder",
    shortDescription: "Safe and compact fuse mounting for DC circuits up to 1500V.",
    description:
      "Designed for photovoltaic and battery storage systems, our DC fuse holders ensure secure fuse mounting with IP-rated protection, touch-safe operation, and compatibility with standard cylindrical fuses.",
    image: "/images/categories/dc-fuse-holder.png",
  },
  {
    slug: "over-voltage-protector",
    name: "Over Voltage Protector",
    shortDescription: "Automatic load disconnection against sustained overvoltage.",
    description:
      "Our overvoltage protection relays continuously monitor supply voltage and disconnect loads instantly upon detecting dangerous voltage levels, protecting motors, appliances, and electronic equipment.",
    image: "/images/categories/over-voltage-protector.png",
  },
  {
    slug: "power-meter",
    name: "Power Meter",
    shortDescription: "Precision energy measurement for industrial and commercial use.",
    description:
      "Multifunction DIN-rail power meters measure voltage, current, power, energy, power factor, and harmonics. Suitable for energy management, cost allocation, and demand monitoring in smart buildings.",
    image: "/images/categories/power-meter.png",
  },
  {
    slug: "wifi-smart-low-voltage-device",
    name: "Wifi Smart Low Voltage Device",
    shortDescription: "IoT-enabled low-voltage devices for smart building control.",
    description:
      "Integrate low-voltage switching and monitoring into your smart building or energy management platform via Wi-Fi. Compatible with popular home automation protocols and cloud dashboards.",
    image: "/images/categories/wifi-smart-low-voltage-device.png",
  },
  {
    slug: "pv-combiner-box",
    name: "PV Combiner Box",
    shortDescription: "String combiner solutions for solar PV arrays.",
    description:
      "Our PV combiner boxes consolidate multiple PV string inputs into a single output, incorporating overcurrent protection, surge protection, and DC disconnection for safe and efficient solar installations.",
    image: "/images/categories/pv-combiner-box.png",
  },
  {
    slug: "ats-dual-power-switch",
    name: "ATS Dual Power Switch",
    shortDescription: "Automatic transfer switching for uninterrupted power supply.",
    description:
      "Automatic Transfer Switches (ATS) provide seamless changeover between two independent power sources, ensuring continuous supply to critical loads. Available for single-phase and three-phase systems.",
    image: "/images/categories/ats-dual-power-switch.png",
  },
  {
    slug: "aerosol-fire-extinguisher",
    name: "Aerosol Fire Extinguisher",
    shortDescription: "Compact aerosol-based fire suppression for rapid response protection.",
    description:
      "Soltree aerosol fire extinguishers provide fast, effective fire suppression using environmentally friendly aerosol agents. Suitable for electrical cabinets, vehicles, server rooms, and industrial enclosures. No pressure vessel required – –  safe, easy to install, and maintenance-free.",
    image: "/images/categories/Aerosol-Fire-Extinguishe.png",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // Circuit Breaker
  {
    id: "MCB-AC-1P",
    name: "MCB 1P AC 6 – 63A Circuit breaker",
    slug: "MCB-1P-AC-6 – 63A-Circuit-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Single-pole miniature circuit breaker, 6 – 63A, B/C/D-curve, ideal for residential lighting and socket circuit protection.",
    description:
      "The Soltree 1 Pole MCB is engineered for residential and light commercial single-phase circuits, providing reliable overload and short-circuit protection for lighting branches, socket outlets, and small appliances. Its slim single-module width (18mm) allows maximum circuit density in compact distribution boards. Manufactured in our ISO 9001 certified facility with 18 years of expertise, each unit undergoes 100% electrical testing before shipment. Available in B, C, and D trip curves to suit different load characteristics – B curve for sensitive resistive loads, C curve for general use, D curve for high-inrush equipment.",
    features: [
      "Slim 18mm single-module width – maximises circuit density in compact boards",
      "B / C / D trip curve options – covers lighting, general, and motor loads",
      "Ideal for residential distribution boards and socket circuit protection",
      "CE & RoHS certified – accepted in EU, UK, and global markets",
      "100% factory electrical test before shipment",
      "OEM / ODM customization available – logo, color, rating label",
      "18-year ISO 9001 certified manufacturing facility",
    ],
    specs: {
      "Poles": "1P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A Customed",
      "Rated Voltage": "120V / 230V AC",
      "Breaking Capacity": "4.5 kA, 6 kA Customed",
      "Trip Curve": "C, B, D Customed",
      "Housing Material": "Flame-Retardant Thermoplastic",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60898-1",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "High-Conductivity Copper Alloy",
    },
    image: "/images/products/MCB-AC-1P-01.jpg",
    images: [
      "/images/products/MCB-AC-1P-01.jpg",
      "/images/products/MCB-AC-1P-02.jpg",
      "/images/products/MCB-AC-1P-03.jpg",
      "/images/products/MCB-AC-1P-04.jpg",
      "/images/products/MCB-AC-1P-05.jpg",
      "/images/products/MCB-AC-1P-06.jpg",
      "/images/products/MCB-AC-1P-07.jpg",
    ],
    metaTitle: "1 Pole MCB 6A-63A AC Circuit Breaker | DIN Rail Single Pole MCB | Soltree",
    metaDescription: "Soltree 1 pole MCB 6A to 63A, rated 120V/230V AC, B/C/D trip curve, CE & RoHS certified. ISO 9001 factory, OEM available, bulk orders shipped worldwide.",
    metaKeywords: "1 pole MCB, single pole circuit breaker, MCB 6A 63A, DIN rail MCB, miniature circuit breaker supplier, CE certified MCB, AC circuit breaker wholesale",
    imageAlts: [
      "Soltree 1 pole MCB 6-63A single pole miniature circuit breaker front view",
      "MCB-AC-1P single pole circuit breaker side view showing DIN rail clip",
      "MCB-AC-1P trip curve B C D selection detail",
      "MCB-AC-1P terminal connection and wiring diagram",
      "MCB-AC-1P installed on 35mm DIN rail in distribution board",
      "MCB-AC-1P product dimensions and size drawing",
      "MCB-AC-1P CE RoHS certification label and packaging",
    ],
  },
  {
    id: "MCB-AC-2P",
    name: "MCB 2P AC 6 – 63A Circuit breaker",
    slug: "mcb-2p-ac-6-63a-circuit-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Double-pole miniature circuit breaker, 6 – 63A, B/C/D-curve, simultaneously disconnects live and neutral for full circuit isolation.",
    description:
      "The Soltree 2 Pole MCB provides complete single-phase circuit isolation by simultaneously breaking both the live and neutral conductors – a critical safety requirement for bathroom circuits, outdoor installations, and any application where full disconnection is mandatory. Rated at 120V/230V AC across 6A to 63A, it is the preferred choice for TT earthing systems and markets requiring double-pole protection by regulation (IEC 60364, BS 7671). Manufactured under ISO 9001 quality management, the robust flame-retardant housing and high-conductivity copper alloy contacts ensure consistent performance over 20,000 mechanical operations.",
    features: [
      "Simultaneous live + neutral disconnection – full circuit isolation in one operation",
      "Mandatory for bathroom, outdoor, and TT system installations",
      "Complies with IEC 60364 and BS 7671 double-pole protection requirements",
      "CE & RoHS certified – accepted in EU, UK, and global markets",
      "High-conductivity copper alloy contacts – 20,000 mechanical operations rated",
      "OEM / ODM customization available – logo, color, rating label",
      "18-year ISO 9001 certified manufacturing facility",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A Customed",
      "Rated Voltage": "120V / 230V AC",
      "Breaking Capacity": "4.5 kA, 6 kA Customed",
      "Trip Curve": "C, B, D Customed",
      "Housing Material": "Flame-Retardant Thermoplastic",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60898-1",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "High-Conductivity Copper Alloy",
    },
    image: "/images/products/MCB-AC-2P-01.jpg",
    images: [
      "/images/products/MCB-AC-2P-01.jpg",
      "/images/products/MCB-AC-2P-02.jpg",
      "/images/products/MCB-AC-2P-03.jpg",
      "/images/products/MCB-AC-2P-04.jpg",
      "/images/products/MCB-AC-2P-05.jpg",
      "/images/products/MCB-AC-2P-06.jpg",
      "/images/products/MCB-AC-2P-07.jpg",
    ],
    metaTitle: "2 Pole MCB 6A-63A AC Circuit Breaker | Double Pole DIN Rail MCB | Soltree",
    metaDescription: "Soltree 2 pole MCB 6A to 63A, rated 120V/230V AC, B/C/D trip curve, CE & RoHS certified. ISO 9001 factory, OEM available, bulk orders shipped worldwide.",
    metaKeywords: "2 pole MCB, double pole circuit breaker, MCB 2P 6A 63A, DIN rail double pole MCB, miniature circuit breaker supplier, CE certified MCB, AC circuit breaker wholesale",
    imageAlts: [
      "Soltree 2 pole MCB 6-63A double pole miniature circuit breaker front view",
      "MCB-AC-2P double pole circuit breaker side view showing DIN rail clip",
      "MCB-AC-2P trip curve B C D selection detail",
      "MCB-AC-2P terminal connection and wiring diagram",
      "MCB-AC-2P installed on 35mm DIN rail in distribution board",
      "MCB-AC-2P product dimensions and size drawing",
      "MCB-AC-2P CE RoHS certification label and packaging",
    ],
  },
  {
    id: "MCB-AC-3P",
    name: "MCB 3P AC 6 – 63A Circuit breaker",
    slug: "mcb-3p-ac-6-63a-circuit-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Three-pole miniature circuit breaker, 6 – 63A, B/C/D-curve, designed for three-phase industrial equipment and motor protection.",
    description:
      "The Soltree 3 Pole MCB is purpose-built for three-phase industrial and commercial applications, protecting motors, HVAC equipment, pumps, and three-phase distribution sub-boards from overload and short-circuit faults. All three poles trip simultaneously on fault detection, preventing single-phasing damage to connected three-phase motors – a common cause of motor burnout. The D-curve option accommodates high inrush currents during motor start-up without nuisance tripping. With a compact 3-module DIN-rail footprint and CE-certified breaking capacity up to 6kA, it delivers industrial-grade protection in a space-efficient package suited to panel builders and system integrators worldwide.",
    features: [
      "Simultaneous three-phase disconnection – prevents single-phasing motor damage",
      "D-curve option for high inrush motor and transformer loads",
      "Ideal for HVAC, pumps, compressors, and three-phase sub-boards",
      "CE & RoHS certified – accepted in EU, UK, and global markets",
      "Compact 3-module DIN footprint – optimises panel space in industrial enclosures",
      "OEM / ODM customization available – logo, color, rating label",
      "18-year ISO 9001 certified manufacturing facility",
    ],
    specs: {
      "Poles": "3P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A Customed",
      "Rated Voltage": "120V / 230V AC",
      "Breaking Capacity": "4.5 kA, 6 kA Customed",
      "Trip Curve": "C, B, D Customed",
      "Housing Material": "Flame-Retardant Thermoplastic",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60898-1",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "High-Conductivity Copper Alloy",
    },
    image: "/images/products/MCB-AC-3P-01.jpg",
    images: [
      "/images/products/MCB-AC-3P-01.jpg",
      "/images/products/MCB-AC-3P-02.jpg",
      "/images/products/MCB-AC-3P-03.jpg",
      "/images/products/MCB-AC-3P-04.jpg",
      "/images/products/MCB-AC-3P-05.jpg",
      "/images/products/MCB-AC-3P-06.jpg",
      "/images/products/MCB-AC-3P-07.jpg",
    ],
    metaTitle: "3 Pole MCB 6A-63A AC Circuit Breaker | Three Phase DIN Rail MCB | Soltree",
    metaDescription: "Soltree 3 pole MCB 6A to 63A, rated 120V/230V AC, B/C/D trip curve, CE & RoHS certified. Ideal for three-phase industrial systems. OEM available, ships worldwide.",
    metaKeywords: "3 pole MCB, three pole circuit breaker, MCB 3P 6A 63A, three phase DIN rail MCB, miniature circuit breaker supplier, CE certified MCB, industrial circuit breaker wholesale",
    imageAlts: [
      "Soltree 3 pole MCB 6-63A three pole miniature circuit breaker front view",
      "MCB-AC-3P three pole circuit breaker side view showing DIN rail clip",
      "MCB-AC-3P trip curve B C D selection detail",
      "MCB-AC-3P three phase terminal connection and wiring diagram",
      "MCB-AC-3P installed on 35mm DIN rail in three-phase distribution board",
      "MCB-AC-3P product dimensions and size drawing",
      "MCB-AC-3P CE RoHS certification label and packaging",
    ],
  },
  {
    id: "MCB-AC-4P",
    name: "MCB 4P AC 6 – 63A Circuit breaker",
    slug: "mcb-4p-ac-6-63a-circuit-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Four-pole miniature circuit breaker, 6 – 63A, B/C/D-curve, full three-phase + neutral protection for TN-S and TN-C-S systems.",
    description:
      "The Soltree 4 Pole MCB delivers complete protection for three-phase four-wire (3P+N) systems by simultaneously isolating all three phase conductors and the neutral – the highest level of circuit isolation available in a miniature circuit breaker. It is the code-compliant choice for TN-S and TN-C-S earthing systems where neutral switching is required, including commercial buildings, data centres, hospitals, and industrial facilities with sensitive electronic loads. The 4-pole design eliminates the risk of neutral voltage rise during asymmetric faults, protecting downstream equipment from damaging overvoltage. Available from 6A to 63A with B, C, and D trip curves to match any load profile.",
    features: [
      "Full 3P+N simultaneous disconnection – highest isolation level for four-wire systems",
      "Required for TN-S and TN-C-S systems where neutral switching is mandated",
      "Eliminates neutral voltage rise risk during asymmetric fault conditions",
      "Ideal for data centres, hospitals, and commercial buildings with sensitive loads",
      "CE & RoHS certified – accepted in EU, UK, and global markets",
      "OEM / ODM customization available – logo, color, rating label",
      "18-year ISO 9001 certified manufacturing facility",
    ],
    specs: {
      "Poles": "4P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A Customed",
      "Rated Voltage": "120V / 230V AC",
      "Breaking Capacity": "4.5 kA, 6 kA Customed",
      "Trip Curve": "C, B, D Customed",
      "Housing Material": "Flame-Retardant Thermoplastic",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60898-1",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "High-Conductivity Copper Alloy",
    },
    image: "/images/products/MCB-AC-4P-01.jpg",
    images: [
      "/images/products/MCB-AC-4P-01.jpg",
      "/images/products/MCB-AC-4P-02.jpg",
      "/images/products/MCB-AC-4P-03.jpg",
      "/images/products/MCB-AC-4P-04.jpg",
      "/images/products/MCB-AC-4P-05.jpg",
      "/images/products/MCB-AC-4P-06.jpg",
      "/images/products/MCB-AC-4P-07.jpg",
    ],
    metaTitle: "4 Pole MCB 6A-63A AC Circuit Breaker | Four Pole DIN Rail MCB | Soltree",
    metaDescription: "Soltree 4 pole MCB 6A to 63A, rated 120V/230V AC, B/C/D trip curve, CE & RoHS certified. Ideal for three-phase + neutral systems. OEM available, ships worldwide.",
    metaKeywords: "4 pole MCB, four pole circuit breaker, MCB 4P 6A 63A, four pole DIN rail MCB, miniature circuit breaker supplier, CE certified MCB, three phase neutral circuit breaker",
    imageAlts: [
      "Soltree 4 pole MCB 6-63A four pole miniature circuit breaker front view",
      "MCB-AC-4P four pole circuit breaker side view showing DIN rail clip",
      "MCB-AC-4P trip curve B C D selection detail",
      "MCB-AC-4P four pole terminal connection and wiring diagram",
      "MCB-AC-4P installed on 35mm DIN rail in distribution board",
      "MCB-AC-4P product dimensions and size drawing",
      "MCB-AC-4P CE RoHS certification label and packaging",
    ],
  },
  {
    id: "MCB-DC-1P",
    name: "MCB 1P DC 6 – 63A Circuit Breaker",
    slug: "1p-dc-mcb-solar-circuit-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Ultra-compact single-pole DC breaker for solar PV string protection – only 18mm wide, 500V DC rated.",
    description:
      "The Soltree 1 Pole DC MCB is the most space-efficient solution for protecting individual photovoltaic strings and single-line DC branch circuits. At just 18mm wide, it fits where multi-pole breakers cannot – making it the go-to choice for densely packed combiner boxes and compact off-grid battery enclosures. Rated at 500V DC with enhanced magnetic arc quenching, this breaker reliably interrupts stubborn DC arcs that would damage conventional AC-rated devices. Every unit leaves our ISO 9001 certified factory only after passing 100% electrical verification, giving installers confidence in consistent trip accuracy across the full 6 – 63A range. Whether you are wiring a rooftop solar array, a 48V telecom rack, or an RV leisure battery, the 1P DC MCB delivers code-compliant overcurrent protection without wasting valuable panel space.",
    features: [
      "Ultra-compact 18mm single-module width – saves critical DIN-rail space in crowded combiner boxes.",
      "500V DC arc-quenching chamber – safely extinguishes persistent DC arcs that standard AC breakers cannot handle.",
      "9 current ratings (6A – 63A) – one SKU family covers everything from small off-grid setups to large string inverters.",
      "100% factory electrical testing – every unit verified for correct trip curve before shipment.",
      "Full OEM/ODM program – custom printing, private-label packaging, and modified trip curves available.",
      "Thermal-magnetic dual protection – fast short-circuit response plus reliable overload tripping.",
      "Snap-on 35mm DIN rail mount – tool-free installation and removal for rapid field service.",
    ],
    specs: {
      "Poles": "1P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A (DC)",
      "Rated Voltage": "500V DC",
      "Breaking Capacity": "6 kA DC",
      "Trip Curve": "C (DC)",
      "Housing Material": "Flame-Retardant Thermoplastic, UV Resistant",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60947-2, TÜV (for PV)",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "Silver Alloy Contacts",
      "Application": "Solar PV System, DC Power Distribution, Marine Electrical System",
      "Arc Extinguishing System": "Enhanced Magnetic Arc Quenching for DC",
      "Wiring Method": "Screw Terminal, Compatible with Soft Silicone Wire (with Copper Crimp)",
      "Operating Temperature": "-25°C to +70°C",
      "IP Rating": "IP20",
    },
    image: "/images/products/MCB-DC-1P-01.jpg",
    images: [
      "/images/products/MCB-DC-1P-01.jpg",
      "/images/products/MCB-DC-1P-02.jpg",
      "/images/products/MCB-DC-1P-03.jpg",
      "/images/products/MCB-DC-1P-04.jpg",
      "/images/products/MCB-DC-1P-05.jpg",
      "/images/products/MCB-DC-1P-06.jpg",
      "/images/products/MCB-DC-1P-07.jpg",
    ],
    metaTitle: "1P DC MCB 6 – 63A 500V Solar Circuit Breaker | Soltree",
    metaDescription: "Buy Soltree 1 Pole DC MCB – 500V rated, 6kA breaking capacity, CE & TÜV certified for solar PV. Ultra-compact 18mm design. OEM welcome. Get a quote today!",
    metaKeywords: "1P DC MCB, single pole DC circuit breaker, 500V DC breaker, solar PV MCB, photovoltaic circuit breaker, DC miniature circuit breaker, DIN rail DC breaker",
    imageAlts: [
      "Soltree 1P DC MCB 500V solar circuit breaker front view",
      "Single pole DC miniature circuit breaker side profile showing DIN rail clip",
      "MCB-DC-1P breaker terminal detail with screw connections",
      "1 pole DC MCB internal arc-quenching chamber close-up",
      "Soltree 1P DC circuit breaker mounted on 35mm DIN rail",
      "MCB-DC-1P product label showing CE TÜV certification marks",
      "Single pole 500V DC MCB packaging and accessories",
    ],
  },
  {
    id: "MCB-DC-2P",
    name: "MCB 2P DC 6 – 63A Circuit Breaker",
    slug: "2p-dc-mcb-battery-disconnect-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Two-pole DC breaker with simultaneous positive/negative disconnection – the industry standard for residential solar and battery storage.",
    description:
      "The Soltree 2 Pole DC MCB is the most widely specified DC breaker for residential solar installations and battery energy storage systems. By breaking both the positive and negative conductors simultaneously, it provides complete galvanic isolation in a single switching action – eliminating the shock hazard that remains when only one pole is opened. Rated at 500V DC with 6kA breaking capacity, it handles the demanding fault currents generated by lithium-ion battery banks and high-voltage PV strings alike. The linked toggle mechanism guarantees that both poles trip together under overload or short-circuit conditions, meeting the safety requirements of IEC 60947-2 and TÜV PV certification. Backed by 18 years of manufacturing expertise and 100% pre-shipment electrical testing, the 2P DC MCB is available in nine current ratings from 6A to 63A – ready for everything from a single residential inverter feed to a parallel battery rack.",
    features: [
      "Simultaneous 2-pole disconnection – breaks positive and negative lines together for full galvanic isolation.",
      "500V DC rated with 6kA breaking capacity – handles high fault currents from lithium battery banks.",
      "Linked toggle mechanism – both poles always trip together, preventing dangerous single-pole open states.",
      "Ideal for residential solar and ESS – the most popular configuration for home PV inverter protection.",
      "9 current ratings (6A – 63A) – covers single-inverter feeds through parallel battery strings.",
      "100% factory-tested trip accuracy – consistent C-curve performance across every production batch.",
      "OEM/ODM ready – custom branding, bilingual labels, and modified specifications for your market.",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A (DC)",
      "Rated Voltage": "500V DC",
      "Breaking Capacity": "6 kA DC",
      "Trip Curve": "C (DC)",
      "Housing Material": "Flame-Retardant Thermoplastic, UV Resistant",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60947-2, TÜV (for PV)",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "Silver Alloy Contacts",
      "Application": "Solar PV System, DC Power Distribution, Marine Electrical System",
      "Arc Extinguishing System": "Enhanced Magnetic Arc Quenching for DC",
      "Wiring Method": "Screw Terminal, Compatible with Soft Silicone Wire (with Copper Crimp)",
      "Operating Temperature": "-25°C to +70°C",
      "IP Rating": "IP20",
    },
    image: "/images/products/MCB-DC-2P-01.jpg",
    images: [
      "/images/products/MCB-DC-2P-01.jpg",
      "/images/products/MCB-DC-2P-02.jpg",
      "/images/products/MCB-DC-2P-03.jpg",
      "/images/products/MCB-DC-2P-04.jpg",
      "/images/products/MCB-DC-2P-05.jpg",
      "/images/products/MCB-DC-2P-06.jpg",
      "/images/products/MCB-DC-2P-07.jpg",
    ],
    metaTitle: "2P DC MCB 6 – 63A Solar & Battery Disconnect Breaker | Soltree",
    metaDescription: "Soltree 2 Pole DC MCB disconnects positive & negative simultaneously. 500V DC, 6kA, TÜV certified for solar PV & battery storage. Request OEM pricing now!",
    metaKeywords: "2P DC MCB, two pole DC circuit breaker, solar battery disconnect, DC isolator breaker, PV combiner box breaker, 500V DC breaker 2 pole, residential solar MCB",
    imageAlts: [
      "Soltree 2P DC MCB 500V solar battery disconnect breaker front view",
      "Two pole DC circuit breaker side profile with linked toggle mechanism",
      "MCB-DC-2P dual terminal detail for positive and negative conductors",
      "2 pole DC MCB arc-quenching system internal view",
      "Soltree 2P DC breaker installed in residential solar combiner box",
      "MCB-DC-2P certification label showing CE TÜV IEC 60947-2 marks",
      "Two pole 500V DC MCB retail packaging with wiring diagram",
    ],
  },
  {
    id: "MCB-DC-3P",
    name: "MCB 3P DC 6 – 63A Circuit Breaker",
    slug: "3p-dc-mcb-commercial-solar-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Three-pole DC breaker for commercial PV arrays and high-voltage DC bus protection – 500V per pole, series-stackable.",
    description:
      "The Soltree 3 Pole DC MCB is purpose-built for commercial and industrial photovoltaic installations where higher system voltages demand multi-pole series protection. By connecting three poles in series, system designers can achieve safe interruption at voltages well beyond the single-pole 500V DC rating – a critical requirement for large rooftop arrays and ground-mount solar farms feeding high-voltage DC buses. Each pole contains an independent enhanced magnetic arc-quenching chamber, ensuring that even at elevated voltages the DC arc is reliably extinguished within milliseconds. The three-pole configuration also suits marine DC power networks and EV charging infrastructure where three-wire DC distribution is used. With 6kA DC breaking capacity, TÜV PV certification, and nine selectable current ratings from 6A to 63A, this breaker gives project engineers the flexibility to standardize on a single product family across diverse commercial DC applications. Every unit is 100% electrically tested in our ISO 9001 facility before shipping worldwide.",
    features: [
      "3-pole series connection – enables safe switching at system voltages far above single-pole limits.",
      "Independent arc chamber per pole – each pole extinguishes its own DC arc for maximum reliability.",
      "Built for commercial solar – protects high-voltage DC buses on rooftop and ground-mount PV farms.",
      "Marine and EV-ready – suits three-wire DC distribution in vessels and charging stations.",
      "6kA DC breaking capacity – interrupts high fault currents from parallel-connected PV strings.",
      "TÜV PV + IEC 60947-2 certified – meets international standards for photovoltaic DC protection.",
      "Full OEM/ODM customization – voltage markings, trip curve variants, and private-label packaging available.",
    ],
    specs: {
      "Poles": "3P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A (DC)",
      "Rated Voltage": "500V DC",
      "Breaking Capacity": "6 kA DC",
      "Trip Curve": "C (DC)",
      "Housing Material": "Flame-Retardant Thermoplastic, UV Resistant",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60947-2, TÜV (for PV)",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "Silver Alloy Contacts",
      "Application": "Solar PV System, DC Power Distribution, Marine Electrical System",
      "Arc Extinguishing System": "Enhanced Magnetic Arc Quenching for DC",
      "Wiring Method": "Screw Terminal, Compatible with Soft Silicone Wire (with Copper Crimp)",
      "Operating Temperature": "-25°C to +70°C",
      "IP Rating": "IP20",
    },
    image: "/images/products/MCB-DC-3P-01.jpg",
    images: [
      "/images/products/MCB-DC-3P-01.jpg",
      "/images/products/MCB-DC-3P-02.jpg",
      "/images/products/MCB-DC-3P-03.jpg",
      "/images/products/MCB-DC-3P-04.jpg",
      "/images/products/MCB-DC-3P-05.jpg",
      "/images/products/MCB-DC-3P-06.jpg",
      "/images/products/MCB-DC-3P-07.jpg",
    ],
    metaTitle: "3P DC MCB 6 – 63A Commercial Solar PV Breaker | Soltree",
    metaDescription: "Soltree 3 Pole DC MCB for commercial solar and high-voltage DC bus. Series-stackable 500V/pole, 6kA, TÜV certified. Ideal for PV farms. Get a free quote!",
    metaKeywords: "3P DC MCB, three pole DC circuit breaker, commercial solar breaker, high voltage DC MCB, PV farm circuit breaker, 3 pole DC isolator, marine DC breaker",
    imageAlts: [
      "Soltree 3P DC MCB commercial solar circuit breaker front view",
      "Three pole DC breaker side profile showing triple arc chambers",
      "MCB-DC-3P terminal block detail for series-connected DC wiring",
      "3 pole DC MCB three independent arc-quenching chambers close-up",
      "Soltree 3P DC circuit breaker in commercial PV distribution board",
      "MCB-DC-3P rating plate with TÜV PV and IEC 60947-2 certification",
      "Three pole 500V DC MCB export packaging with installation guide",
    ],
  },
  {
    id: "MCB-DC-4P",
    name: "MCB 4P DC 6 – 63A Circuit Breaker",
    slug: "4p-dc-mcb-industrial-pv-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Four-pole DC breaker for industrial solar plants and bipolar DC networks – maximum isolation safety with 500V per pole.",
    description:
      "The Soltree 4 Pole DC MCB delivers the highest level of DC circuit isolation available in a compact DIN-rail package. Designed for industrial-scale solar plants, utility-grade energy storage, and bipolar DC distribution networks, the four-pole configuration allows engineers to protect both the positive and negative buses of a bipolar system – or to achieve the maximum series voltage rating for extra-high-voltage DC strings. All four poles share a common linked toggle that guarantees simultaneous disconnection, a safety requirement in large installations where maintenance personnel must achieve a verified zero-energy state. With four independent enhanced magnetic arc chambers, the breaker can handle the extreme energy of industrial DC faults at up to 6kA. Each unit carries CE, TÜV PV, and IEC 60947-2 certification and is backed by Soltree's 18-year track record of 100% electrical testing. Available in 6A through 63A with full OEM customization, it is the professional's choice when no compromise on DC safety is acceptable.",
    features: [
      "4-pole simultaneous disconnection – guarantees verified zero-energy state for safe maintenance lockout.",
      "Bipolar DC network compatible – protects both positive and negative buses in bipolar distribution systems.",
      "Maximum series voltage capability – four poles in series for extra-high-voltage DC string protection.",
      "Industrial-grade 6kA breaking capacity – handles extreme fault energy from large PV arrays and battery farms.",
      "Four independent arc chambers – each pole extinguishes DC arcs independently for redundant safety.",
      "CE + TÜV PV + IEC 60947-2 – fully certified for utility-scale solar and industrial DC applications.",
      "Complete OEM/ODM program – custom ratings, branded enclosures, and project-specific documentation available.",
    ],
    specs: {
      "Poles": "4P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A (DC)",
      "Rated Voltage": "500V DC",
      "Breaking Capacity": "6 kA DC",
      "Trip Curve": "C (DC)",
      "Housing Material": "Flame-Retardant Thermoplastic, UV Resistant",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60947-2, TÜV (for PV)",
      "Mounting Method": "DIN Rail Mounting (35mm)",
      "Contact Material": "Silver Alloy Contacts",
      "Application": "Solar PV System, DC Power Distribution, Marine Electrical System",
      "Arc Extinguishing System": "Enhanced Magnetic Arc Quenching for DC",
      "Wiring Method": "Screw Terminal, Compatible with Soft Silicone Wire (with Copper Crimp)",
      "Operating Temperature": "-25°C to +70°C",
      "IP Rating": "IP20",
    },
    image: "/images/products/MCB-DC-4P-01.jpg",
    images: [
      "/images/products/MCB-DC-4P-01.jpg",
      "/images/products/MCB-DC-4P-02.jpg",
      "/images/products/MCB-DC-4P-03.jpg",
      "/images/products/MCB-DC-4P-04.jpg",
      "/images/products/MCB-DC-4P-05.jpg",
      "/images/products/MCB-DC-4P-06.jpg",
      "/images/products/MCB-DC-4P-07.jpg",
    ],
    metaTitle: "4P DC MCB 6 – 63A Industrial Solar & Bipolar Breaker | Soltree",
    metaDescription: "Soltree 4 Pole DC MCB for industrial PV plants and bipolar DC networks. 500V/pole, 6kA, TÜV + CE certified. Full OEM support. Request bulk pricing today!",
    metaKeywords: "4P DC MCB, four pole DC circuit breaker, industrial solar breaker, bipolar DC MCB, utility scale PV breaker, 4 pole DC isolator, energy storage DC breaker",
    imageAlts: [
      "Soltree 4P DC MCB industrial solar circuit breaker front view",
      "Four pole DC breaker side profile showing linked 4-pole toggle",
      "MCB-DC-4P quad terminal block for bipolar DC wiring",
      "4 pole DC MCB four independent arc-quenching chambers detail",
      "Soltree 4P DC circuit breaker in industrial PV distribution panel",
      "MCB-DC-4P nameplate with CE TÜV IEC 60947-2 certification marks",
      "Four pole 500V DC MCB bulk packaging for industrial projects",
    ],
  },
  // Surge Protector Device
  {
    id: "SPD-AC-1P-Grey",
    name: "1P AC Surge Protector 385V 40kA - TN-S Neutral-Ground SPD for Sub-distribution & Lightning Boxes",
    slug: "spd-ac-1p-385v-40ka-tn-s-neutral-ground",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "1-pole 385VAC surge protector for TN-S neutral-ground (N-PE) protection. 40kA max discharge current, – .0kV protection level, <25ns response – modular hot-swappable DIN rail design for sub-distribution and combined lightning boxes.",
    description:
      "The SPD-AC-1P-Grey is a single-pole AC surge protection device designed specifically for neutral-ground (N-PE) protection in TN-S low-voltage distribution systems. It safeguards the neutral line of single-phase systems against surge transients caused by lightning or switching events, with a maximum discharge current of 40kA and a nominal discharge current of 20kA. The voltage protection level of – .0kV ensures downstream equipment is kept within safe limits during transient events. At its core is a metal oxide varistor (MOV) that responds in under 25 nanoseconds – effectively instantaneous suppression. The grey flame-retardant PC housing (UL94 V-0 rated) snaps onto a standard 35mm DIN rail and features a modular, hot-swappable design, allowing replacement under live conditions without rewiring. Suitable for installation in sub-distribution boxes and combined lightning boxes.",
    features: [
      "1-pole N-PE protection for TN-S low-voltage distribution systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .0kV – protects neutral line from transient overvoltage",
      "<25ns ultra-fast response time – instantaneous transient suppression",
      "Metal oxide varistor (MOV) core – excellent conductivity and corrosion resistance",
      "Modular hot-swappable design – replace without rewiring",
      "Flame-retardant PC housing (UL94 V-0), grey, 35mm DIN rail mounting",
      "Suitable for sub-distribution boxes and combined lightning boxes",
    ],
    specs: {
      "Poles": "1P",
      "Max. Continuous Operating Voltage (Uc)": "385V AC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .0kV",
      "System Type": "TN-S Low-voltage Distribution System",
      "Protection Mode": "N-PE (Neutral to Ground)",
      "Wiring": "Top: Neutral / Bottom: Ground (PE)",
      "Core Component": "Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), Grey",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "Sub-distribution Box, Combined Lightning Box",
    },
    image: "/images/products/SPD-AC-1P-Grey-1.jpg",
    images: [
      "/images/products/SPD-AC-1P-Grey-1.jpg",
      "/images/products/SPD-AC-1P-Grey-2.jpg",
      "/images/products/SPD-AC-1P-Grey-3.jpg",
      "/images/products/SPD-AC-1P-Grey-4.jpg",
      "/images/products/SPD-AC-1P-Grey-5.jpg",
      "/images/products/SPD-AC-1P-Grey-6.jpg",
      "/images/products/SPD-AC-1P-Grey-7.jpg",
    ],
    metaTitle: "1P SPD 385V 40kA TN-S | Neutral-Ground AC Surge Protector | Soltree",
    metaDescription: "1-pole 385VAC AC surge protector for TN-S neutral-ground (N-PE) protection. 40kA max discharge, – .0kV protection level, <25ns response. DIN rail, hot-swappable. For sub-distribution and lightning boxes.",
    metaKeywords: "AC surge protector, 1P SPD, 385V SPD, TN-S SPD, neutral ground SPD, N-PE surge protector, 40kA SPD, DIN rail SPD, combined lightning box SPD, MOV surge protector",
    imageAlts: [
      "SPD-AC-1P-Grey 1-pole AC surge protector front view – grey DIN rail SPD",
      "SPD-AC-1P-Grey wiring diagram – top Neutral, bottom Ground (PE) connection",
      "SPD-AC-1P-Grey MOV core component detail – metal oxide varistor",
      "SPD-AC-1P-Grey 385V 40kA N-PE surge protection module close-up",
      "SPD-AC-1P-Grey modular hot-swappable design on 35mm DIN rail",
      "SPD-AC-1P-Grey flame-retardant PC housing UL94 V-0 detail",
      "SPD-AC-1P-Grey installed in sub-distribution box combined lightning box",
    ],
  },
  {
    id: "SPD-AC-2P-Grey",
    name: "2P AC Surge Protector 385V 40kA - Full Mode L-N/L-PE/N-PE SPD for Residential & Industrial Circuits",
    slug: "spd-ac-2p-385v-40ka-full-mode",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "2-pole 385VAC full-mode surge protector covering L-N, L-PE and N-PE protection. 40kA max discharge, – .0kV protection level, <25ns response – modular hot-swappable DIN rail SPD for residential and small industrial distribution boxes.",
    description:
      "The SPD-AC-2P-Grey is a 2-pole AC surge protection device providing full-mode protection across all three paths – L-N, L-PE, and N-PE – in a single module. This comprehensive coverage ensures that single-phase electrical devices and precision instruments are shielded from surge transients regardless of which conductor the overvoltage appears on. The maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is kept at – .0kV. At its core, a metal oxide varistor (MOV) responds in under 25 nanoseconds for instantaneous suppression. Compatible with single-phase AC and IT systems, the SPD-AC-2P connects via L (In/Out) and N (In/Out) terminals and clips onto a standard 35mm DIN rail. The grey flame-retardant PC housing (UL94 V-0) features a modular, hot-swappable design for maintenance without rewiring. Suitable for main distribution boxes, sub-distribution boxes, and small industrial circuit panels.",
    features: [
      "2-pole full-mode protection: L-N, L-PE and N-PE in a single module",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .0kV – protects single-phase devices and precision instruments",
      "<25ns ultra-fast response time – instantaneous transient suppression",
      "Metal oxide varistor (MOV) core – excellent conductivity and corrosion resistance",
      "Compatible with single-phase AC systems and IT systems",
      "Modular hot-swappable design – replace without rewiring",
      "Flame-retardant PC housing (UL94 V-0), grey, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "2P",
      "Max. Continuous Operating Voltage (Uc)": "385V AC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .0kV",
      "System Type": "Single-phase AC System, IT System",
      "Protection Mode": "L-N, L-PE, N-PE (Full Mode)",
      "Wiring": "L (In/Out), N (In/Out)",
      "Core Component": "Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), Grey",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "Main Distribution Box, Sub-distribution Box, Small Industrial Circuits",
    },
    image: "/images/products/SPD-AC-2P-Grey-1.jpg",
    images: [
      "/images/products/SPD-AC-2P-Grey-1.jpg",
      "/images/products/SPD-AC-2P-Grey-2.jpg",
      "/images/products/SPD-AC-2P-Grey-3.jpg",
      "/images/products/SPD-AC-2P-Grey-4.jpg",
      "/images/products/SPD-AC-2P-Grey-5.jpg",
      "/images/products/SPD-AC-2P-Grey-6.jpg",
      "/images/products/SPD-AC-2P-Grey-7.jpg",
    ],
    metaTitle: "2P SPD 385V 40kA Full Mode | L-N L-PE N-PE AC Surge Protector | Soltree",
    metaDescription: "2-pole 385VAC full-mode AC surge protector – L-N, L-PE and N-PE protection in one module. 40kA max discharge, – .0kV, <25ns response. DIN rail, hot-swappable. For residential and industrial distribution boxes.",
    metaKeywords: "2P AC surge protector, full mode SPD, L-N L-PE N-PE SPD, 385V SPD, 40kA SPD, single phase SPD, residential SPD, DIN rail surge protector, MOV SPD, IT system SPD",
    imageAlts: [
      "SPD-AC-2P-Grey 2-pole AC surge protector front view – grey DIN rail SPD",
      "SPD-AC-2P-Grey wiring diagram – L and N in/out terminal connection",
      "SPD-AC-2P-Grey full-mode protection paths – L-N, L-PE and N-PE",
      "SPD-AC-2P-Grey MOV core component detail – metal oxide varistor",
      "SPD-AC-2P-Grey 385V 40kA full-mode surge protection module close-up",
      "SPD-AC-2P-Grey modular hot-swappable design on 35mm DIN rail",
      "SPD-AC-2P-Grey installed in residential main distribution box",
    ],
  },
  {
    id: "SPD-AC-3P-Grey",
    name: "3P AC Surge Protector 385V 40kA - Three-Phase L-PE SPD for Industrial Equipment & Motor Control",
    slug: "spd-ac-3p-385v-40ka-three-phase-lpe",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "3-pole 385VAC surge protector for three-phase 3-wire systems (no neutral). Independent L1-PE, L2-PE, L3-PE protection per phase. 40kA max discharge, – .5kV protection level, <25ns response – for industrial power equipment and motor control panels.",
    description:
      "The SPD-AC-3P-Grey is a 3-pole AC surge protection device for three-phase 3-wire low-voltage systems without neutral. It provides independent phase-to-earth (L-PE) protection on each of the three phases – L1-PE, L2-PE, and L3-PE – shielding industrial power devices and three-phase loads from surge transients caused by lightning strikes or switching events. The maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is – .5kV per phase. A metal oxide varistor (MOV) core delivers sub-25ns response for instantaneous transient clamping. The grey flame-retardant PC housing (UL94 V-0) mounts directly on a 35mm DIN rail with a modular, hot-swappable design – modules can be replaced individually during maintenance without full rewiring. Suitable for installation in power distribution cabinets and equipment control boxes serving three-phase industrial loads.",
    features: [
      "3-pole independent L-PE protection per phase: L1-PE, L2-PE, L3-PE",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .5kV per phase – for three-phase industrial loads",
      "<25ns ultra-fast response time – instantaneous transient suppression",
      "Metal oxide varistor (MOV) core – excellent conductivity and corrosion resistance",
      "Three-phase 3-wire system (no neutral) – suitable for industrial installations",
      "Modular hot-swappable design – individual module replacement without rewiring",
      "Flame-retardant PC housing (UL94 V-0), grey, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "3P",
      "Max. Continuous Operating Voltage (Uc)": "385V AC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .5kV",
      "System Type": "Three-phase 3-wire Low-voltage System (No Neutral)",
      "Protection Mode": "L1-PE, L2-PE, L3-PE",
      "Wiring": "3 Phase Lines (L1, L2, L3), No Neutral",
      "Core Component": "Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), Grey",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "Power Distribution Cabinet, Equipment Control Box",
    },
    image: "/images/products/SPD-AC-3P-Grey-1.jpg",
    images: [
      "/images/products/SPD-AC-3P-Grey-1.jpg",
      "/images/products/SPD-AC-3P-Grey-2.jpg",
      "/images/products/SPD-AC-3P-Grey-3.jpg",
      "/images/products/SPD-AC-3P-Grey-4.jpg",
      "/images/products/SPD-AC-3P-Grey-5.jpg",
      "/images/products/SPD-AC-3P-Grey-6.jpg",
      "/images/products/SPD-AC-3P-Grey-7.jpg",
    ],
    metaTitle: "3P SPD 385V 40kA Three-Phase | L-PE AC Surge Protector | Soltree",
    metaDescription: "3-pole 385VAC three-phase L-PE surge protector for 3-wire systems. Independent L1-PE, L2-PE, L3-PE protection. 40kA max discharge, – .5kV, <25ns response. DIN rail, hot-swappable. For industrial equipment and motor control.",
    metaKeywords: "3P AC surge protector, three-phase SPD, L-PE SPD, 385V 3 phase SPD, 40kA industrial SPD, motor control SPD, power distribution cabinet SPD, DIN rail SPD, MOV three-phase surge protector",
    imageAlts: [
      "SPD-AC-3P-Grey 3-pole AC surge protector front view – grey three-phase DIN rail SPD",
      "SPD-AC-3P-Grey wiring diagram – L1 L2 L3 phase line connections",
      "SPD-AC-3P-Grey independent L-PE protection per phase detail",
      "SPD-AC-3P-Grey MOV core component detail – metal oxide varistor",
      "SPD-AC-3P-Grey 385V 40kA three-phase surge protection module close-up",
      "SPD-AC-3P-Grey modular hot-swappable design on 35mm DIN rail",
      "SPD-AC-3P-Grey installed in industrial power distribution cabinet",
    ],
  },
  {
    id: "SPD-AC-4P-Grey",
    name: "4P AC Surge Protector 385V 40kA - Full Mode Three-Phase+N SPD for Factory, Data Center & Large Buildings",
    slug: "spd-ac-4p-385v-40ka-three-phase-neutral-full-mode",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "4-pole 385VAC full-mode surge protector for TT/TN-S three-phase 4-wire systems. L1-PE, L2-PE, L3-PE and N-PE protection in one unit. 40kA max discharge, – .5kV, <25ns response – for factory main cabinets, data centers and large building entry panels.",
    description:
      "The SPD-AC-4P-Grey is a 4-pole AC surge protection device providing complete full-mode protection across all four conductors – L1-PE, L2-PE, L3-PE and N-PE – in three-phase 4-wire TT and TN-S low-voltage systems. By covering all three phases and the neutral line simultaneously, it shields three-phase electrical devices, precision instruments, and the neutral conductor from surge transients caused by lightning or switching events. The maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is – .5kV per mode. A metal oxide varistor (MOV) core responds in under 25 nanoseconds for instantaneous clamping of transient overvoltages. The grey flame-retardant PC housing (UL94 V-0) mounts on a standard 35mm DIN rail and features a modular, hot-swappable design for easy on-site maintenance. Designed for the highest level of entry-point protection in factory main distribution cabinets, data centers, and large commercial building entry panels.",
    features: [
      "4-pole full-mode protection: L1-PE, L2-PE, L3-PE and N-PE in one unit",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .5kV – covers all phases and neutral",
      "<25ns ultra-fast response time – instantaneous transient suppression",
      "Metal oxide varistor (MOV) core – excellent conductivity and corrosion resistance",
      "Compatible with TT and TN-S three-phase 4-wire low-voltage systems",
      "Modular hot-swappable design – individual module replacement without rewiring",
      "Flame-retardant PC housing (UL94 V-0), grey, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "4P",
      "Max. Continuous Operating Voltage (Uc)": "385V AC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .5kV",
      "System Type": "Three-phase 4-wire Low-voltage System (TT / TN-S)",
      "Protection Mode": "L1-PE, L2-PE, L3-PE, N-PE (Full Mode)",
      "Wiring": "3 Phase Lines (L1, L2, L3) + Neutral (N)",
      "Core Component": "Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), Grey",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "Factory Main Cabinet, Data Center, Large Building Entry Panel",
    },
    image: "/images/products/SPD-AC-4P-Grey-1.jpg",
    images: [
      "/images/products/SPD-AC-4P-Grey-1.jpg",
      "/images/products/SPD-AC-4P-Grey-2.jpg",
      "/images/products/SPD-AC-4P-Grey-3.jpg",
      "/images/products/SPD-AC-4P-Grey-4.jpg",
      "/images/products/SPD-AC-4P-Grey-5.jpg",
      "/images/products/SPD-AC-4P-Grey-6.jpg",
      "/images/products/SPD-AC-4P-Grey-7.jpg",
    ],
    metaTitle: "4P SPD 385V 40kA Full Mode | Three-Phase+N AC Surge Protector | Soltree",
    metaDescription: "4-pole 385VAC full-mode AC surge protector for TT/TN-S three-phase 4-wire systems. L1-PE, L2-PE, L3-PE and N-PE protection. 40kA max discharge, – .5kV, <25ns response. For factory cabinets, data centers and large buildings.",
    metaKeywords: "4P AC surge protector, three-phase neutral SPD, full mode SPD, TT TN-S SPD, 385V 4 pole SPD, 40kA SPD, factory cabinet SPD, data center SPD, large building SPD, DIN rail surge protector",
    imageAlts: [
      "SPD-AC-4P-Grey 4-pole AC surge protector front view – grey three-phase+N DIN rail SPD",
      "SPD-AC-4P-Grey wiring diagram – L1 L2 L3 phase lines and Neutral connection",
      "SPD-AC-4P-Grey full-mode protection paths – L1-PE L2-PE L3-PE and N-PE",
      "SPD-AC-4P-Grey MOV core component detail – metal oxide varistor",
      "SPD-AC-4P-Grey 385V 40kA four-pole surge protection module close-up",
      "SPD-AC-4P-Grey modular hot-swappable design on 35mm DIN rail",
      "SPD-AC-4P-Grey installed in factory main distribution cabinet",
    ],
  },
  {
    id: "SPD-DC-1P-White",
    name: "1P DC Surge Protector 500V/1000V 40kA - PV Solar SPD for RV & Residential Solar Systems",
    slug: "spd-dc-1p-500v-1000v-40ka-pv",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "1-pole DC surge protector supporting 500VDC and 1000VDC PV systems. 40kA max discharge current, fast response – protects solar electrical systems and load equipment from lightning and transient overvoltage. For RVs and residential solar installations.",
    description:
      "The SPD-DC-1P-White is a single-pole DC surge protection device engineered specifically for photovoltaic systems, supporting both 500VDC and 1000VDC operating voltages. It protects solar electrical systems and connected load equipment against lightning-induced surges, switching transients, and overvoltage events, with a maximum discharge current of 40kA and a nominal of 20kA. The voltage protection level is 2.8kV at 500VDC and 3.6kV at 1000VDC, adapting to the system voltage in use. Built with a copper core for excellent conductivity and corrosion resistance, the device is housed in a white flame-retardant PC enclosure (flame-retardant rated) that snaps onto a standard 35mm DIN rail. Compatible with PV systems and circuit breakers, it is designed for installation inside distribution boxes on RV solar setups and residential rooftop solar systems.",
    features: [
      "1-pole DC surge protection for PV photovoltaic systems",
      "Dual voltage: supports 500VDC and 1000VDC systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level: 2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Lightning protection, surge suppression and transient overvoltage clamping",
      "Copper core – excellent conductivity and corrosion resistance",
      "Compatible with PV systems and DC circuit breakers",
      "White flame-retardant PC housing, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "1P",
      "Max. Continuous Operating Voltage (Uc)": "500VDC / 1000VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": "2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Application System": "Photovoltaic (PV) System",
      "Protection Function": "Lightning Protection, Surge Suppression, Transient Overvoltage",
      "Core Material": "Copper",
      "Housing Material": "Flame-retardant PC, White",
      "Mounting": "35mm DIN Rail",
      "Compatibility": "PV Systems, DC Circuit Breakers",
      "Installation Location": "Distribution Box",
      "Applications": "RVs, Residential Solar Systems",
    },
    image: "/images/products/SPD-DC-1P-White-1.jpg",
    images: [
      "/images/products/SPD-DC-1P-White-1.jpg",
      "/images/products/SPD-DC-1P-White-2.jpg",
      "/images/products/SPD-DC-1P-White-3.jpg",
      "/images/products/SPD-DC-1P-White-4.jpg",
      "/images/products/SPD-DC-1P-White-5.jpg",
      "/images/products/SPD-DC-1P-White-6.jpg",
      "/images/products/SPD-DC-1P-White-7.jpg",
      "/images/products/SPD-DC-1P-White-8.jpg",
    ],
    metaTitle: "1P DC SPD 500V/1000V 40kA PV | Solar Surge Protector for RV & Home | Soltree",
    metaDescription: "1-pole DC surge protector for 500V and 1000V PV solar systems. 40kA max discharge, 2.8kV/3.6kV protection level, copper core, fast response. DIN rail, white housing. For RV and residential solar installations.",
    metaKeywords: "DC surge protector, 1P DC SPD, PV solar SPD, 500V DC SPD, 1000V DC SPD, 40kA solar SPD, RV solar surge protector, residential solar SPD, photovoltaic SPD, DIN rail DC SPD",
    imageAlts: [
      "SPD-DC-1P-White 1-pole DC surge protector front view – white PV solar SPD",
      "SPD-DC-1P-White supporting 500VDC and 1000VDC PV system voltage",
      "SPD-DC-1P-White copper core component detail – excellent conductivity",
      "SPD-DC-1P-White 40kA surge discharge and voltage protection level detail",
      "SPD-DC-1P-White wiring connection in distribution box",
      "SPD-DC-1P-White white flame-retardant PC housing close-up",
      "SPD-DC-1P-White on 35mm DIN rail in solar distribution box",
      "SPD-DC-1P-White installed in RV and residential solar PV system",
    ],
  },
  {
    id: "SPD-DC-2P-White",
    name: "2P DC Surge Protector 500V/1000V 40kA - PV Solar SPD for RV & Residential Solar Systems",
    slug: "spd-dc-2p-500v-1000v-40ka-pv",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "2-pole DC surge protector supporting 500VDC and 1000VDC PV systems. Simultaneously protects both positive and negative conductors. 40kA max discharge, fast response – for RV and residential solar distribution boxes.",
    description:
      "The SPD-DC-2P-White is a 2-pole DC surge protection device for photovoltaic systems, supporting both 500VDC and 1000VDC operating voltages. By switching both poles simultaneously, it provides complete protection of both the positive and negative conductors in a DC circuit – shielding solar electrical systems and connected load equipment from lightning-induced surges, switching transients, and overvoltage events. Maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is 2.8kV at 500VDC and 3.6kV at 1000VDC. The copper core ensures excellent conductivity and corrosion resistance for reliable long-term outdoor operation. The white flame-retardant PC housing clips onto a standard 35mm DIN rail and is compatible with PV systems and DC circuit breakers. Ideal for distribution boxes in RV solar setups and residential rooftop solar installations.",
    features: [
      "2-pole DC surge protection – simultaneous positive and negative conductor protection",
      "Dual voltage: supports 500VDC and 1000VDC PV systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level: 2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Lightning protection, surge suppression and transient overvoltage clamping",
      "Copper core – excellent conductivity and corrosion resistance",
      "Compatible with PV systems and DC circuit breakers",
      "White flame-retardant PC housing, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "2P",
      "Max. Continuous Operating Voltage (Uc)": "500VDC / 1000VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": "2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Application System": "Photovoltaic (PV) System",
      "Protection Function": "Lightning Protection, Surge Suppression, Transient Overvoltage",
      "Core Material": "Copper",
      "Housing Material": "Flame-retardant PC, White",
      "Mounting": "35mm DIN Rail",
      "Compatibility": "PV Systems, DC Circuit Breakers",
      "Installation Location": "Distribution Box",
      "Applications": "RVs, Residential Solar Systems",
    },
    image: "/images/products/SPD-DC-2P-White-1.jpg",
    images: [
      "/images/products/SPD-DC-2P-White-1.jpg",
      "/images/products/SPD-DC-2P-White-2.jpg",
      "/images/products/SPD-DC-2P-White-3.jpg",
      "/images/products/SPD-DC-2P-White-4.jpg",
      "/images/products/SPD-DC-2P-White-5.jpg",
      "/images/products/SPD-DC-2P-White-6.jpg",
      "/images/products/SPD-DC-2P-White-7.jpg",
      "/images/products/SPD-DC-2P-White-8.jpg",
    ],
    metaTitle: "2P DC SPD 500V/1000V 40kA PV | Solar Surge Protector for RV & Home | Soltree",
    metaDescription: "2-pole DC surge protector for 500V and 1000V PV solar systems. Protects positive and negative conductors simultaneously. 40kA max discharge, 2.8kV/3.6kV protection level, copper core. For RV and residential solar.",
    metaKeywords: "2P DC surge protector, PV solar SPD, 500V DC SPD, 1000V DC SPD, 40kA solar SPD, two pole DC SPD, RV solar surge protector, residential solar SPD, photovoltaic SPD, DIN rail DC SPD",
    imageAlts: [
      "SPD-DC-2P-White 2-pole DC surge protector front view – white PV solar SPD",
      "SPD-DC-2P-White 2-pole positive and negative conductor protection diagram",
      "SPD-DC-2P-White supporting 500VDC and 1000VDC PV system voltage",
      "SPD-DC-2P-White copper core component detail – excellent conductivity",
      "SPD-DC-2P-White 40kA surge discharge and voltage protection level detail",
      "SPD-DC-2P-White wiring connection in distribution box",
      "SPD-DC-2P-White on 35mm DIN rail in solar distribution box",
      "SPD-DC-2P-White installed in RV and residential solar PV system",
    ],
  },
  {
    id: "SPD-DC-3P-White",
    name: "3P DC Surge Protector 1000V/1500V 40kA - Full Mode PV SPD for Inverter DC Side & Solar Power Stations",
    slug: "spd-dc-3p-1000v-1500v-40ka-pv-full-mode",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "3-pole high-voltage DC surge protector for 1000VDC and 1500VDC PV systems. Full-mode protection: DC+/PE, DC-/PE and DC+/DC-. 40kA max discharge, – .0kV protection level – for PV combiner boxes, inverter DC sides, and solar power stations.",
    description:
      "The SPD-DC-3P-White is a 3-pole high-voltage DC surge protection device for utility and commercial-scale photovoltaic systems, supporting both 1000VDC and 1500VDC operating voltages. It provides full-mode protection across all three DC protection paths simultaneously – DC+ to PE, DC- to PE, and DC+ to DC- – ensuring that inverters, PV arrays, and DC loads are comprehensively shielded against lightning-induced surges, switching transients, and overvoltage events regardless of which conductor is affected. The maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is – .0kV. At its core is a high-energy metal oxide varistor (MOV) that responds in under 25 nanoseconds. The modular, hot-swappable design allows individual modules to be replaced without rewiring, minimizing downtime in live installations. The white flame-retardant PC housing (UL94 V-0) mounts on a standard 35mm DIN rail and is suitable for installation in DC distribution cabinets and PV combiner boxes at solar power stations.",
    features: [
      "3-pole full-mode DC protection: DC+/PE, DC-/PE and DC+/DC- in one unit",
      "High voltage: supports 1000VDC and 1500VDC PV systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .0kV – for high-voltage PV arrays and inverters",
      "<25ns ultra-fast response – high-energy MOV core for instantaneous clamping",
      "Protects inverters, PV arrays and DC loads from lightning and transient overvoltage",
      "Modular hot-swappable design – minimize downtime in live solar installations",
      "White flame-retardant PC housing (UL94 V-0), 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "3P",
      "Max. Continuous Operating Voltage (Uc)": "1000VDC / 1500VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .0kV",
      "Application System": "Photovoltaic DC System",
      "Protection Mode": "DC+/PE, DC-/PE, DC+/DC- (Full Mode)",
      "Wiring": "3 Terminals: DC+, DC-, PE",
      "Core Component": "High-energy Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), White",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "PV Combiner Box, Inverter DC Side, Solar Power Station",
    },
    image: "/images/products/SPD-DC-3P-White-1.jpg",
    images: [
      "/images/products/SPD-DC-3P-White-1.jpg",
      "/images/products/SPD-DC-3P-White-2.jpg",
      "/images/products/SPD-DC-3P-White-3.jpg",
      "/images/products/SPD-DC-3P-White-4.jpg",
      "/images/products/SPD-DC-3P-White-5.jpg",
      "/images/products/SPD-DC-3P-White-6.jpg",
      "/images/products/SPD-DC-3P-White-7.jpg",
      "/images/products/SPD-DC-3P-White-8.jpg",
    ],
    metaTitle: "3P DC SPD 1000V/1500V 40kA Full Mode | PV Solar Surge Protector | Soltree",
    metaDescription: "3-pole DC surge protector for 1000V and 1500V PV systems. Full-mode DC+/PE, DC-/PE and DC+/DC- protection. 40kA max discharge, – .0kV, <25ns response. For PV combiner boxes, inverter DC side and solar power stations.",
    metaKeywords: "3P DC surge protector, 1000V DC SPD, 1500V DC SPD, full mode DC SPD, PV combiner box SPD, inverter DC SPD, solar power station SPD, high voltage DC SPD, MOV DC surge protector",
    imageAlts: [
      "SPD-DC-3P-White 3-pole DC surge protector front view – white high-voltage PV SPD",
      "SPD-DC-3P-White full-mode protection paths – DC+/PE, DC-/PE and DC+/DC-",
      "SPD-DC-3P-White 3 terminal wiring – DC+, DC- and PE connection",
      "SPD-DC-3P-White high-energy MOV core for 1000V/1500V DC protection",
      "SPD-DC-3P-White 40kA surge discharge and – .0kV protection level detail",
      "SPD-DC-3P-White modular hot-swappable design on 35mm DIN rail",
      "SPD-DC-3P-White installed in PV combiner box at solar power station",
      "SPD-DC-3P-White on inverter DC side of commercial PV system",
    ],
  },
  {
    id: "SPD-DC-4P-White",
    name: "4P DC Surge Protector 1000V/1500V 40kA - Dual-Input PV SPD for Dual MPPT Inverters & Energy Storage",
    slug: "spd-dc-4p-1000v-1500v-40ka-dual-mppt",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "4-pole dual-input DC surge protector for 1000VDC/1500VDC PV systems. Independent protection on two DC circuits (DC1+/PE, DC1-/PE, DC2+/PE, DC2-/PE). 40kA max discharge – for dual MPPT inverters, PV combiner boxes, and energy storage systems.",
    description:
      "The SPD-DC-4P-White is a 4-pole high-voltage DC surge protection device designed for photovoltaic systems with dual DC inputs, supporting both 1000VDC and 1500VDC. Unlike single-input DC SPDs, it provides two completely independent protection circuits – DC1 (DC1+/PE and DC1-/PE) and DC2 (DC2+/PE and DC2-/PE) – allowing a single unit to simultaneously protect both input channels of a dual MPPT inverter or two separate PV arrays in a combiner box. Maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is – .0kV per channel. The high-energy metal oxide varistor (MOV) core responds in under 25 nanoseconds. The modular hot-swappable design allows individual pole modules to be replaced without rewiring. The white flame-retardant PC housing (UL94 V-0) mounts on a standard 35mm DIN rail and is built for installation in DC distribution cabinets and at inverter DC inputs in solar power and energy storage systems.",
    features: [
      "4-pole dual-input protection: two independent DC circuits in one module",
      "Protects DC1 (DC1+/PE, DC1-/PE) and DC2 (DC2+/PE, DC2-/PE) simultaneously",
      "High voltage: supports 1000VDC and 1500VDC PV systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .0kV per channel",
      "<25ns ultra-fast response – high-energy MOV core for instantaneous clamping",
      "Ideal for dual MPPT inverters, PV combiner boxes and energy storage systems",
      "Modular hot-swappable design, white flame-retardant PC housing, 35mm DIN rail",
    ],
    specs: {
      "Poles": "4P",
      "Max. Continuous Operating Voltage (Uc)": "1000VDC / 1500VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .0kV",
      "Application System": "Photovoltaic DC System (Dual Input)",
      "Protection Mode": "DC1+/PE, DC1-/PE, DC2+/PE, DC2-/PE (Dual Independent)",
      "Wiring": "4 Terminals: DC1+, DC1-, DC2+, DC2-",
      "Core Component": "High-energy Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), White",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "Dual MPPT Inverters, PV Combiner Boxes, Energy Storage Systems",
    },
    image: "/images/products/SPD-DC-4P-White-1.jpg",
    images: [
      "/images/products/SPD-DC-4P-White-1.jpg",
      "/images/products/SPD-DC-4P-White-2.jpg",
      "/images/products/SPD-DC-4P-White-3.jpg",
      "/images/products/SPD-DC-4P-White-4.jpg",
      "/images/products/SPD-DC-4P-White-5.jpg",
      "/images/products/SPD-DC-4P-White-6.jpg",
      "/images/products/SPD-DC-4P-White-7.jpg",
      "/images/products/SPD-DC-4P-White-8.jpg",
    ],
    metaTitle: "4P DC SPD 1000V/1500V 40kA Dual MPPT | PV Surge Protector | Soltree",
    metaDescription: "4-pole dual-input DC surge protector for 1000V/1500V PV systems. Independent DC1 and DC2 channel protection. 40kA max discharge, – .0kV, <25ns. For dual MPPT inverters, PV combiner boxes and energy storage systems.",
    metaKeywords: "4P DC surge protector, dual MPPT SPD, dual input DC SPD, 1000V DC SPD, 1500V DC SPD, PV combiner box SPD, energy storage SPD, inverter DC input SPD, high voltage DC surge protector",
    imageAlts: [
      "SPD-DC-4P-White 4-pole dual-input DC surge protector front view – white PV SPD",
      "SPD-DC-4P-White dual circuit protection – DC1 and DC2 independent channels",
      "SPD-DC-4P-White 4 terminal wiring – DC1+, DC1-, DC2+, DC2- connection",
      "SPD-DC-4P-White high-energy MOV core for 1000V/1500V DC dual-input protection",
      "SPD-DC-4P-White 40kA surge discharge and – .0kV protection level detail",
      "SPD-DC-4P-White modular hot-swappable design on 35mm DIN rail",
      "SPD-DC-4P-White installed on dual MPPT inverter DC input",
      "SPD-DC-4P-White in PV combiner box and energy storage system",
    ],
  },
  {
    id: "SPD-DC-1P-Orange",
    name: "1P DC Surge Protector 500V/1000V 40kA - PV Solar SPD for RV & Residential Solar Systems",
    slug: "spd-dc-1p-500v-1000v-40ka-pv-orange",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "1-pole DC surge protector supporting 500VDC and 1000VDC PV systems. 40kA max discharge current, fast response – protects solar electrical systems and load equipment from lightning and transient overvoltage. For RVs and residential solar installations.",
    description:
      "The SPD-DC-1P-Orange is a single-pole DC surge protection device engineered specifically for photovoltaic systems, supporting both 500VDC and 1000VDC operating voltages. It protects solar electrical systems and connected load equipment against lightning-induced surges, switching transients, and overvoltage events, with a maximum discharge current of 40kA and a nominal of 20kA. The voltage protection level is 2.8kV at 500VDC and 3.6kV at 1000VDC, adapting to the system voltage in use. Built with a copper core for excellent conductivity and corrosion resistance, the device is housed in an orange flame-retardant PC enclosure that snaps onto a standard 35mm DIN rail. Compatible with PV systems and circuit breakers, it is designed for installation inside distribution boxes on RV solar setups and residential rooftop solar systems.",
    features: [
      "1-pole DC surge protection for PV photovoltaic systems",
      "Dual voltage: supports 500VDC and 1000VDC systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level: 2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Lightning protection, surge suppression and transient overvoltage clamping",
      "Copper core – excellent conductivity and corrosion resistance",
      "Compatible with PV systems and DC circuit breakers",
      "Orange flame-retardant PC housing, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "1P",
      "Max. Continuous Operating Voltage (Uc)": "500VDC / 1000VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": "2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Application System": "Photovoltaic (PV) System",
      "Protection Function": "Lightning Protection, Surge Suppression, Transient Overvoltage",
      "Core Material": "Copper",
      "Housing Material": "Flame-retardant PC, Orange",
      "Mounting": "35mm DIN Rail",
      "Compatibility": "PV Systems, DC Circuit Breakers",
      "Installation Location": "Distribution Box",
      "Applications": "RVs, Residential Solar Systems",
    },
    image: "/images/products/SPD-DC-1P-Orange-1.jpg",
    images: [
      "/images/products/SPD-DC-1P-Orange-1.jpg",
      "/images/products/SPD-DC-1P-Orange-2.jpg",
      "/images/products/SPD-DC-1P-Orange-3.jpg",
      "/images/products/SPD-DC-1P-Orange-4.jpg",
      "/images/products/SPD-DC-1P-Orange-5.jpg",
      "/images/products/SPD-DC-1P-Orange-6.jpg",
      "/images/products/SPD-DC-1P-Orange-7.jpg",
      "/images/products/SPD-DC-1P-Orange-8.jpg",
    ],
    metaTitle: "1P Orange DC Surge Protector 500V/1000V 40kA | PV Solar SPD | Soltree",
    metaDescription: "Single-pole orange DC SPD for 500VDC and 1000VDC photovoltaic systems. Protects one DC conductor from lightning surges and switching transients. 40kA Imax, 2.8kV/3.6kV Up, copper core. Orange housing for visual identification. Suits RV solar and residential rooftop PV distribution boxes.",
    metaKeywords: "DC surge protector, 1P DC SPD, PV solar SPD, 500V DC SPD, 1000V DC SPD, 40kA solar SPD, RV solar surge protector, residential solar SPD, photovoltaic SPD, orange DC SPD",
    imageAlts: [
      "SPD-DC-1P-Orange 1-pole DC surge protector front view – orange PV solar SPD",
      "SPD-DC-1P-Orange supporting 500VDC and 1000VDC PV system voltage",
      "SPD-DC-1P-Orange copper core component detail – excellent conductivity",
      "SPD-DC-1P-Orange 40kA surge discharge and voltage protection level detail",
      "SPD-DC-1P-Orange wiring connection in distribution box",
      "SPD-DC-1P-Orange orange flame-retardant PC housing close-up",
      "SPD-DC-1P-Orange on 35mm DIN rail in solar distribution box",
      "SPD-DC-1P-Orange installed in RV and residential solar PV system",
    ],
  },
  {
    id: "SPD-DC-2P-Orange",
    name: "2P DC Surge Protector 500V/1000V 40kA - PV Solar SPD for RV & Residential Solar Systems",
    slug: "spd-dc-2p-500v-1000v-40ka-pv-orange",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "2-pole DC surge protector supporting 500VDC and 1000VDC PV systems. Simultaneously protects both positive and negative conductors. 40kA max discharge, fast response – for RV and residential solar distribution boxes.",
    description:
      "The SPD-DC-2P-Orange is a 2-pole DC surge protection device for photovoltaic systems, supporting both 500VDC and 1000VDC operating voltages. By switching both poles simultaneously, it provides complete protection of both the positive and negative conductors in a DC circuit – shielding solar electrical systems and connected load equipment from lightning-induced surges, switching transients, and overvoltage events. Maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is 2.8kV at 500VDC and 3.6kV at 1000VDC. The copper core ensures excellent conductivity and corrosion resistance for reliable long-term outdoor operation. The orange flame-retardant PC housing clips onto a standard 35mm DIN rail and is compatible with PV systems and DC circuit breakers. Ideal for distribution boxes in RV solar setups and residential rooftop solar installations.",
    features: [
      "2-pole DC surge protection – simultaneous positive and negative conductor protection",
      "Dual voltage: supports 500VDC and 1000VDC PV systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level: 2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Lightning protection, surge suppression and transient overvoltage clamping",
      "Copper core – excellent conductivity and corrosion resistance",
      "Compatible with PV systems and DC circuit breakers",
      "Orange flame-retardant PC housing, 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "2P",
      "Max. Continuous Operating Voltage (Uc)": "500VDC / 1000VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": "2.8kV (500VDC) / 3.6kV (1000VDC)",
      "Application System": "Photovoltaic (PV) System",
      "Protection Function": "Lightning Protection, Surge Suppression, Transient Overvoltage",
      "Core Material": "Copper",
      "Housing Material": "Flame-retardant PC, Orange",
      "Mounting": "35mm DIN Rail",
      "Compatibility": "PV Systems, DC Circuit Breakers",
      "Installation Location": "Distribution Box",
      "Applications": "RVs, Residential Solar Systems",
    },
    image: "/images/products/SPD-DC-2P-Orange-1.jpg",
    images: [
      "/images/products/SPD-DC-2P-Orange-1.jpg",
      "/images/products/SPD-DC-2P-Orange-2.jpg",
      "/images/products/SPD-DC-2P-Orange-3.jpg",
      "/images/products/SPD-DC-2P-Orange-4.jpg",
      "/images/products/SPD-DC-2P-Orange-5.jpg",
      "/images/products/SPD-DC-2P-Orange-6.jpg",
      "/images/products/SPD-DC-2P-Orange-7.jpg",
      "/images/products/SPD-DC-2P-Orange-8.jpg",
    ],
    metaTitle: "2P Orange DC Surge Protector 500V/1000V 40kA | PV Solar SPD | Soltree",
    metaDescription: "Two-pole orange DC SPD for 500VDC and 1000VDC PV systems. Dual-pole simultaneous protection on both DC+ and DC – conductors in a single circuit loop. 40kA Imax, 2.8kV/3.6kV Up, copper core. Orange housing aids cable identification. For two-wire DC circuits in RV and home solar installations.",
    metaKeywords: "2P DC surge protector, PV solar SPD, 500V DC SPD, 1000V DC SPD, 40kA solar SPD, two pole DC SPD, RV solar surge protector, residential solar SPD, orange DC SPD, DIN rail DC SPD",
    imageAlts: [
      "SPD-DC-2P-Orange 2-pole DC surge protector front view – orange PV solar SPD",
      "SPD-DC-2P-Orange 2-pole positive and negative conductor protection diagram",
      "SPD-DC-2P-Orange supporting 500VDC and 1000VDC PV system voltage",
      "SPD-DC-2P-Orange copper core component detail – excellent conductivity",
      "SPD-DC-2P-Orange 40kA surge discharge and voltage protection level detail",
      "SPD-DC-2P-Orange wiring connection in distribution box",
      "SPD-DC-2P-Orange on 35mm DIN rail in solar distribution box",
      "SPD-DC-2P-Orange installed in RV and residential solar PV system",
    ],
  },
  {
    id: "SPD-DC-3P-Orange",
    name: "3P DC Surge Protector 1000V/1500V 40kA - Full Mode PV SPD for Inverter DC Side & Solar Power Stations",
    slug: "spd-dc-3p-1000v-1500v-40ka-pv-full-mode-orange",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "3-pole high-voltage DC surge protector for 1000VDC and 1500VDC PV systems. Full-mode protection: DC+/PE, DC-/PE and DC+/DC-. 40kA max discharge, – .0kV protection level – for PV combiner boxes, inverter DC sides, and solar power stations.",
    description:
      "The SPD-DC-3P-Orange is a 3-pole high-voltage DC surge protection device for utility and commercial-scale photovoltaic systems, supporting both 1000VDC and 1500VDC operating voltages. It provides full-mode protection across all three DC protection paths simultaneously – DC+ to PE, DC- to PE, and DC+ to DC- – ensuring that inverters, PV arrays, and DC loads are comprehensively shielded against lightning-induced surges, switching transients, and overvoltage events regardless of which conductor is affected. The maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is – .0kV. At its core is a high-energy metal oxide varistor (MOV) that responds in under 25 nanoseconds. The modular, hot-swappable design allows individual modules to be replaced without rewiring, minimizing downtime in live installations. The orange flame-retardant PC housing (UL94 V-0) mounts on a standard 35mm DIN rail and is suitable for installation in DC distribution cabinets and PV combiner boxes at solar power stations.",
    features: [
      "3-pole full-mode DC protection: DC+/PE, DC-/PE and DC+/DC- in one unit",
      "High voltage: supports 1000VDC and 1500VDC PV systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .0kV – for high-voltage PV arrays and inverters",
      "<25ns ultra-fast response – high-energy MOV core for instantaneous clamping",
      "Protects inverters, PV arrays and DC loads from lightning and transient overvoltage",
      "Modular hot-swappable design – minimize downtime in live solar installations",
      "Orange flame-retardant PC housing (UL94 V-0), 35mm DIN rail mounting",
    ],
    specs: {
      "Poles": "3P",
      "Max. Continuous Operating Voltage (Uc)": "1000VDC / 1500VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .0kV",
      "Application System": "Photovoltaic DC System",
      "Protection Mode": "DC+/PE, DC-/PE, DC+/DC- (Full Mode)",
      "Wiring": "3 Terminals: DC+, DC-, PE",
      "Core Component": "High-energy Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), Orange",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "PV Combiner Box, Inverter DC Side, Solar Power Station",
    },
    image: "/images/products/SPD-DC-3P-Orange-1.jpg",
    images: [
      "/images/products/SPD-DC-3P-Orange-1.jpg",
      "/images/products/SPD-DC-3P-Orange-2.jpg",
      "/images/products/SPD-DC-3P-Orange-3.jpg",
      "/images/products/SPD-DC-3P-Orange-4.jpg",
      "/images/products/SPD-DC-3P-Orange-5.jpg",
      "/images/products/SPD-DC-3P-Orange-6.jpg",
      "/images/products/SPD-DC-3P-Orange-7.jpg",
      "/images/products/SPD-DC-3P-Orange-8.jpg",
    ],
    metaTitle: "3P Orange DC Surge Protector 1000V/1500V 40kA Full Mode | PV SPD | Soltree",
    metaDescription: "Three-pole full-mode orange DC SPD for 1000VDC and 1500VDC PV systems. Covers all DC protection paths simultaneously – DC+/PE, DC – PE and DC+/DC – 40kA Imax, – .0kV Up, <25ns MOV response. Modular DIN rail mount. For inverter DC inputs, PV string combiner boxes and large solar arrays.",
    metaKeywords: "3P DC surge protector, 1000V DC SPD, 1500V DC SPD, full mode DC SPD, PV combiner box SPD, inverter DC SPD, solar power station SPD, high voltage DC SPD, orange DC SPD, MOV DC surge protector",
    imageAlts: [
      "SPD-DC-3P-Orange 3-pole DC surge protector front view – orange high-voltage PV SPD",
      "SPD-DC-3P-Orange full-mode protection paths – DC+/PE, DC-/PE and DC+/DC-",
      "SPD-DC-3P-Orange 3 terminal wiring – DC+, DC- and PE connection",
      "SPD-DC-3P-Orange high-energy MOV core for 1000V/1500V DC protection",
      "SPD-DC-3P-Orange 40kA surge discharge and – .0kV protection level detail",
      "SPD-DC-3P-Orange modular hot-swappable design on 35mm DIN rail",
      "SPD-DC-3P-Orange installed in PV combiner box at solar power station",
      "SPD-DC-3P-Orange on inverter DC side of commercial PV system",
    ],
  },
  {
    id: "SPD-DC-4P-Orange",
    name: "4P DC Surge Protector 1000V/1500V 40kA - Dual-Input PV SPD for Dual MPPT Inverters & Energy Storage",
    slug: "spd-dc-4p-1000v-1500v-40ka-dual-mppt-orange",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "4-pole dual-input DC surge protector for 1000VDC/1500VDC PV systems. Independent protection on two DC circuits (DC1+/PE, DC1-/PE, DC2+/PE, DC2-/PE). 40kA max discharge – for dual MPPT inverters, PV combiner boxes, and energy storage systems.",
    description:
      "The SPD-DC-4P-Orange is a 4-pole high-voltage DC surge protection device designed for photovoltaic systems with dual DC inputs, supporting both 1000VDC and 1500VDC. Unlike single-input DC SPDs, it provides two completely independent protection circuits – DC1 (DC1+/PE and DC1-/PE) and DC2 (DC2+/PE and DC2-/PE) – allowing a single unit to simultaneously protect both input channels of a dual MPPT inverter or two separate PV arrays in a combiner box. Maximum discharge current is 40kA with a nominal of 20kA, and the voltage protection level is – .0kV per channel. The high-energy metal oxide varistor (MOV) core responds in under 25 nanoseconds. The modular hot-swappable design allows individual pole modules to be replaced without rewiring. The orange flame-retardant PC housing (UL94 V-0) mounts on a standard 35mm DIN rail and is built for installation in DC distribution cabinets and at inverter DC inputs in solar power and energy storage systems.",
    features: [
      "4-pole dual-input protection: two independent DC circuits in one module",
      "Protects DC1 (DC1+/PE, DC1-/PE) and DC2 (DC2+/PE, DC2-/PE) simultaneously",
      "High voltage: supports 1000VDC and 1500VDC PV systems",
      "40kA max discharge current (Imax), 20kA nominal discharge current (In)",
      "Voltage protection level – .0kV per channel",
      "<25ns ultra-fast response – high-energy MOV core for instantaneous clamping",
      "Ideal for dual MPPT inverters, PV combiner boxes and energy storage systems",
      "Modular hot-swappable design, orange flame-retardant PC housing, 35mm DIN rail",
    ],
    specs: {
      "Poles": "4P",
      "Max. Continuous Operating Voltage (Uc)": "1000VDC / 1500VDC",
      "Nominal Discharge Current (In)": "20kA",
      "Max. Discharge Current (Imax)": "40kA",
      "Voltage Protection Level (Up)": " – .0kV",
      "Application System": "Photovoltaic DC System (Dual Input)",
      "Protection Mode": "DC1+/PE, DC1-/PE, DC2+/PE, DC2-/PE (Dual Independent)",
      "Wiring": "4 Terminals: DC1+, DC1-, DC2+, DC2-",
      "Core Component": "High-energy Metal Oxide Varistor (MOV)",
      "Response Time": "<25ns",
      "Housing Material": "Flame-retardant PC (UL94 V-0), Orange",
      "Mounting": "35mm DIN Rail",
      "Design": "Modular, Hot-swappable",
      "Applications": "Dual MPPT Inverters, PV Combiner Boxes, Energy Storage Systems",
    },
    image: "/images/products/SPD-DC-4P-Orange-1.jpg",
    images: [
      "/images/products/SPD-DC-4P-Orange-1.jpg",
      "/images/products/SPD-DC-4P-Orange-2.jpg",
      "/images/products/SPD-DC-4P-Orange-3.jpg",
      "/images/products/SPD-DC-4P-Orange-4.jpg",
      "/images/products/SPD-DC-4P-Orange-5.jpg",
      "/images/products/SPD-DC-4P-Orange-6.jpg",
      "/images/products/SPD-DC-4P-Orange-7.jpg",
      "/images/products/SPD-DC-4P-Orange-8.jpg",
    ],
    metaTitle: "4P Orange DC Surge Protector 1000V/1500V 40kA Dual MPPT | PV SPD | Soltree",
    metaDescription: "Four-pole dual-input orange DC SPD for 1000VDC and 1500VDC PV systems. Two independent protection circuits – DC1 (+/PE and – PE) and DC2 (+/PE and – PE) – in one DIN rail module. 40kA Imax, – .0kV per channel, <25ns MOV. Designed for dual MPPT inverters and battery storage systems.",
    metaKeywords: "4P DC surge protector, dual MPPT SPD, dual input DC SPD, 1000V DC SPD, 1500V DC SPD, PV combiner box SPD, energy storage SPD, inverter DC input SPD, orange DC SPD, high voltage DC surge protector",
    imageAlts: [
      "SPD-DC-4P-Orange 4-pole dual-input DC surge protector front view – orange PV SPD",
      "SPD-DC-4P-Orange dual circuit protection – DC1 and DC2 independent channels",
      "SPD-DC-4P-Orange 4 terminal wiring – DC1+, DC1-, DC2+, DC2- connection",
      "SPD-DC-4P-Orange high-energy MOV core for 1000V/1500V DC dual-input protection",
      "SPD-DC-4P-Orange 40kA surge discharge and – .0kV protection level detail",
      "SPD-DC-4P-Orange modular hot-swappable design on 35mm DIN rail",
      "SPD-DC-4P-Orange installed on dual MPPT inverter DC input",
      "SPD-DC-4P-Orange in PV combiner box and energy storage system",
    ],
  },
  // DC Fuse Holder
  {
    id: "RT18-32X-1P",
    name: "RT18-32X 1P DIN Rail Fuse Holder 32A 690V",
    slug: "dc-fuse-holder-rt18-32x-1p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Single-pole 32A 690V DIN rail fuse holder for 10x38mm fuse links — the most compact RT18-32X option, ideal for single-phase control circuits, lighting distribution boards, and individual equipment protection.",
    description:
      "When a single-phase control circuit or lighting branch needs reliable fuse protection without consuming extra rail space, the Soltree RT18-32X 1P is the go-to choice. At just one DIN rail module wide, it is the most space-efficient configuration in the RT18-32X series — fitting tight control cabinets where every millimeter counts. Built with a flame-retardant PVC housing and high-conductivity copper contacts, it ensures minimal contact resistance and stable current transmission under continuous load. Rated at 32A and 500V–690V AC, it accepts standard 10x38mm ceramic fuse links for dependable overload and short-circuit protection. The integrated red LED indicator lights up immediately when the fuse blows, allowing maintenance staff to locate the fault at a glance without probing live terminals. A snap-on 35mm DIN rail design and screw terminals complete a fast, tool-free installation. Note: fuse links are sold separately.",
    features: [
      "Single-pole 1-module design — most space-efficient RT18-32X option",
      "Rated 32A / 500V–690V AC — suitable for single-phase control and lighting circuits",
      "Compatible with standard 10x38mm ceramic fuse links",
      "Red LED indicator — lights up instantly on fuse blowout for quick fault detection",
      "Flame-retardant PVC housing — safe under fault and overload conditions",
      "High-conductivity copper contacts — stable current transmission, low heat generation",
      "Snap-on 35mm DIN rail mounting — tool-free installation",
      "Screw terminals — secure wiring connections",
      "IP20 finger-safe protection",
      "Compliant with IEC 60269 and GB 13539",
      "CE & RoHS certified",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "Fuse Holder",
      "Model Number": "RT18-32X",
      "Pole Configuration": "1P (Single Pole)",
      "Rated Current": "32A",
      "Rated Voltage": "500V–690V AC",
      "Compatible Fuse Size": "10x38mm",
      "Mounting Type": "35mm DIN Rail",
      "Housing Material": "Flame-retardant PVC (V0 Rating)",
      "Contact Material": "High-conductivity Copper",
      "Indicator": "LED (lights up on fuse blowout)",
      "Protection Degree": "IP20",
      "Operating Temperature": "-25°C to +60°C",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "Single-phase control circuits, lighting distribution boards",
      "Installation": "Snap-on DIN rail",
      "Weight": "Approx. 80g",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-32X-1P-1.jpg",
    images: [
      "/images/products/RT18-32X-1P-1.jpg",
      "/images/products/RT18-32X-1P-2.jpg",
      "/images/products/RT18-32X-1P-3.jpg",
      "/images/products/RT18-32X-1P-4.jpg",
      "/images/products/RT18-32X-1P-5.jpg",
      "/images/products/RT18-32X-1P-6.jpg",
      "/images/products/RT18-32X-1P-7.jpg",
    ],
    metaTitle: "RT18-32X 1P Fuse Holder 32A 690V DIN Rail | Soltree",
    metaDescription: "RT18-32X 1P single-pole DIN rail fuse holder 32A 690V for 10x38mm ceramic fuses. Compact single-module design for control circuits and lighting boards. LED blowout indicator, CE & RoHS.",
    metaKeywords: "RT18-32X 1P fuse holder, single pole fuse holder 32A, 10x38mm fuse holder, DIN rail fuse holder 690V, control circuit fuse holder, lighting circuit fuse base, single phase fuse holder LED indicator",
    imageAlts: [
      "Soltree RT18-32X 1P single-pole DIN rail fuse holder 32A 690V front view",
      "RT18-32X 1P fuse holder side profile with DIN rail clip",
      "RT18-32X 1P fuse holder LED indicator close-up",
      "RT18-32X 1P fuse holder screw terminal wiring detail",
      "RT18-32X 1P fuse holder installed on 35mm DIN rail in control panel",
      "RT18-32X 1P fuse holder with 10x38mm ceramic fuse link",
      "RT18-32X 1P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-32X-2P",
    name: "RT18-32X 2P DC Fuse Holder 32A 500V",
    slug: "dc-fuse-holder-rt18-32x-2p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Double-pole 32A 500V DC fuse holder for 10x38mm fuse links — simultaneous positive and negative line protection for PV arrays, battery banks, and DC control circuits, with red LED fault indication.",
    description:
      "DC systems differ from AC in one critical way: both the positive and negative conductors carry fault current, which means single-pole fusing leaves a live conductor unprotected during a fault. The Soltree RT18-32X 2P is designed specifically for two-wire DC circuits — protecting both lines simultaneously in a single compact module. It is widely used in photovoltaic string protection, battery bank feeds, DC power supplies, and DC control panels where safe isolation of both conductors is required. Constructed with flame-retardant PVC housing and high-purity copper contacts, it maintains low contact resistance and stable transmission under continuous DC load. Rated at 32A and 500V DC, it accepts standard 10x38mm fuse links. The built-in red LED indicator lights up the moment a fuse blows, pinpointing the fault without tools. A 35mm DIN rail snap-on design and screw terminals allow fast installation in solar inverter cabinets, energy storage enclosures, and DC distribution panels. Note: fuse links are sold separately.",
    features: [
      "Double-pole design — simultaneous positive and negative conductor protection in DC circuits",
      "Rated 32A / 500V DC — purpose-built for two-wire direct current systems",
      "Compatible with standard 10x38mm fuse links",
      "Red LED indicator — instant visual fault detection on either pole",
      "Flame-retardant PVC housing — safe under DC arc fault conditions",
      "High-purity copper contacts — low resistance, stable DC transmission",
      "Snap-on 35mm DIN rail mounting — fast installation in PV and battery enclosures",
      "Screw terminal block — secure wiring for DC applications",
      "IP20 touch-safe protection",
      "Suitable for PV arrays, battery storage, and DC power supplies",
      "Compliant with IEC 60269 and GB 13539",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "DC Fuse Holder Base",
      "Model Number": "RT18-32X",
      "Pole Configuration": "2P (Double Pole)",
      "Rated Current": "32A",
      "Rated Voltage": "500V DC",
      "Compatible Fuse Size": "10x38mm",
      "Mounting Type": "35mm DIN Rail (TH35)",
      "Housing Material": "Flame-retardant PVC (V0 Rating)",
      "Contact Material": "High-purity Copper",
      "Indicator Type": "LED Visual Indicator (Red)",
      "Indicator Function": "Lights up when fuse blows",
      "Connection Type": "Screw terminal block",
      "Wire Capacity": "2.5mm² – 10mm²",
      "Protection Degree": "IP20",
      "Ambient Temperature": "-5°C to +40°C",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "PV Systems, Battery Storage, DC Power Supply",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-32X-2P-1.jpg",
    images: [
      "/images/products/RT18-32X-2P-1.jpg",
      "/images/products/RT18-32X-2P-2.jpg",
      "/images/products/RT18-32X-2P-3.jpg",
      "/images/products/RT18-32X-2P-4.jpg",
      "/images/products/RT18-32X-2P-5.jpg",
      "/images/products/RT18-32X-2P-6.jpg",
      "/images/products/RT18-32X-2P-7.jpg",
    ],
    metaTitle: "RT18-32X 2P DC Fuse Holder 32A 500V DIN Rail | Soltree",
    metaDescription: "RT18-32X 2P DC fuse holder 32A 500V for 10x38mm fuses. Dual-pole positive and negative protection for PV arrays, battery banks, and DC circuits. LED fault indicator, CE & RoHS.",
    metaKeywords: "RT18-32X 2P DC fuse holder, double pole DC fuse holder 32A, 10x38mm DC fuse base, PV string fuse holder, battery storage fuse holder 500V DC, solar fuse holder DIN rail, DC circuit fuse protection",
    imageAlts: [
      "Soltree RT18-32X 2P double-pole DC fuse holder 32A 500V front view",
      "RT18-32X 2P DC fuse holder side profile with DIN rail clip",
      "RT18-32X 2P DC fuse holder red LED indicator close-up",
      "RT18-32X 2P DC fuse holder screw terminal wiring detail",
      "RT18-32X 2P DC fuse holder installed in PV solar panel junction box",
      "RT18-32X 2P DC fuse holder with 10x38mm fuse link",
      "RT18-32X 2P DC fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-32X-3P",
    name: "RT18-32X 3P DIN Rail Fuse Holder 32A 690V",
    slug: "dc-fuse-holder-rt18-32x-3p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Three-pole 32A 690V DIN rail fuse holder for 10x38mm fuse links — per-phase fuse isolation for three-phase motors and industrial control panels, with LED fuse-blow indication per phase.",
    description:
      "Three-phase motor starters, machinery control panels, and industrial distribution circuits require independent per-phase fuse protection — a blown fuse on one phase without isolation can leave the other two phases energizing a damaged motor. The Soltree RT18-32X 3P addresses this directly: three independent fuse positions in one compact 35mm DIN rail module, each with its own red LED indicator, so maintenance teams can identify exactly which phase has tripped without a multimeter. Rated at 32A and 500V–690V AC, it accepts standard 10x38mm ceramic fuse links suited to smaller three-phase loads, control transformers, and auxiliary circuits in motor control centers. Flame-retardant PVC housing and high-conductivity copper contacts maintain stable performance under continuous load, and the tool-free DIN rail clip allows fast installation in any standard control cabinet. Note: fuse links are sold separately.",
    features: [
      "Three-pole design — independent per-phase fuse protection for three-phase circuits",
      "Rated 32A / 500V–690V AC — suitable for smaller three-phase loads and control circuits",
      "Compatible with standard 10x38mm ceramic fuse links",
      "Individual LED indicator per phase — instantly identify which phase fuse has blown",
      "Flame-retardant PVC housing — safe under fault conditions",
      "High-conductivity copper contacts — stable three-phase current transmission",
      "Tool-free 35mm DIN rail clip mounting",
      "Compact modular structure — saves panel space in motor control centers",
      "IP20 finger-safe design",
      "Compliant with IEC 60269 and GB 13539",
      "CE & RoHS certified",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "Three-Phase Fuse Holder",
      "Model Number": "RT18-32X",
      "Pole Configuration": "3P (Three Pole)",
      "Rated Current": "32A",
      "Rated Voltage": "500V–690V AC",
      "Compatible Fuse Size": "10x38mm",
      "Mounting Type": "35mm DIN Rail",
      "Housing Material": "Flame-retardant PVC (V0 Grade)",
      "Contact Material": "High-Purity Copper",
      "Indicator Type": "LED Fault Indicator (per phase)",
      "Operating Temperature": "-25°C to +70°C",
      "Protection Rating": "IP20 (Finger-Safe)",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "Three-Phase Motor Circuits, Industrial Control Panels",
      "Installation": "Tool-Free DIN Rail Clip",
      "Dimensions (per pole)": "18mm (W) x 78mm (H) x 65mm (D)",
      "Weight": "Approx. 85g",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-32X-3P-1.jpg",
    images: [
      "/images/products/RT18-32X-3P-1.jpg",
      "/images/products/RT18-32X-3P-2.jpg",
      "/images/products/RT18-32X-3P-3.jpg",
      "/images/products/RT18-32X-3P-4.jpg",
      "/images/products/RT18-32X-3P-5.jpg",
      "/images/products/RT18-32X-3P-6.jpg",
      "/images/products/RT18-32X-3P-7.jpg",
    ],
    metaTitle: "RT18-32X 3P Fuse Holder 32A 690V Three-Phase DIN Rail | Soltree",
    metaDescription: "RT18-32X 3P three-phase DIN rail fuse holder 32A 690V for 10x38mm fuses. Per-phase LED fault indicator for motor starters and industrial control panels. CE & RoHS, OEM available.",
    metaKeywords: "RT18-32X 3P fuse holder, three phase fuse holder 32A, 10x38mm three phase fuse base, motor control fuse holder DIN rail, industrial three phase fuse holder 690V, per phase LED fuse indicator, control panel fuse protection",
    imageAlts: [
      "Soltree RT18-32X 3P three-pole DIN rail fuse holder 32A 690V front view",
      "RT18-32X 3P fuse holder side profile with DIN rail clip",
      "RT18-32X 3P fuse holder per-phase LED indicators close-up",
      "RT18-32X 3P fuse holder screw terminal wiring detail",
      "RT18-32X 3P fuse holder installed in industrial motor control panel",
      "RT18-32X 3P fuse holder with 10x38mm ceramic fuse links",
      "RT18-32X 3P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-32X-4P",
    name: "RT18-32X 4P DIN Rail Fuse Holder 32A 690V",
    slug: "dc-fuse-holder-rt18-32x-4p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Four-pole 32A 690V DIN rail fuse holder for 10x38mm fuse links — complete 3P+N fuse disconnection for TN-S systems and commercial distribution boards, with LED fault indication on each pole.",
    description:
      "In TN-S and TN-C-S wiring systems, complete circuit isolation requires fusing all three phase conductors and the neutral — leaving the neutral unfused creates a voltage shift hazard under unbalanced loads. The Soltree RT18-32X 4P provides full 3P+N fuse protection in a single four-module housing, making it the correct choice for commercial lighting distribution panels, small HVAC control boards, and any four-wire installation where total disconnection is required by local wiring regulations or system design. Each of the four poles has an independent red LED indicator, so a faulty neutral fuse is just as easy to identify as a phase fault. Rated at 32A and 500V–690V AC, it accepts standard 10x38mm ceramic fuse links and installs tool-free on any 35mm DIN rail. Flame-retardant PVC housing and screw terminals ensure safe, vibration-resistant operation. Note: fuse links are sold separately.",
    features: [
      "Four-pole 3P+N design — complete phase and neutral fuse protection in one module",
      "Rated 32A / 500V–690V AC — suitable for commercial distribution and 4-wire control systems",
      "Compatible with standard 10x38mm ceramic fuse links",
      "Individual LED indicator on each pole — including neutral fault detection",
      "Flame-retardant PVC housing — safe under fault conditions",
      "High-conductivity copper contacts — stable performance on all four poles",
      "Tool-free 35mm DIN rail mounting",
      "Compact 4-module structure — efficient use of panel space",
      "IP20 finger-safe design",
      "Compliant with IEC 60269 and GB 13539",
      "CE & RoHS certified",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "Four-Pole Fuse Holder",
      "Model Number": "RT18-32X",
      "Pole Configuration": "4P (Four Pole / 3P+N)",
      "Rated Current": "32A",
      "Rated Voltage": "500V–690V AC",
      "Compatible Fuse Size": "10x38mm",
      "Mounting Type": "35mm DIN Rail",
      "Housing Material": "Flame-retardant PVC (V0 Grade)",
      "Contact Material": "High-conductivity Copper",
      "Indicator Type": "LED (per pole, including neutral)",
      "Protection Level": "IP20 (Finger-safe)",
      "Operating Temperature": "-5°C to +40°C",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "3P+N Systems, Commercial Distribution Boards, TN-S Installations",
      "Installation": "Tool-free DIN rail clip",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-32X-4P-1.jpg",
    images: [
      "/images/products/RT18-32X-4P-1.jpg",
      "/images/products/RT18-32X-4P-2.jpg",
      "/images/products/RT18-32X-4P-3.jpg",
      "/images/products/RT18-32X-4P-4.jpg",
      "/images/products/RT18-32X-4P-5.jpg",
      "/images/products/RT18-32X-4P-6.jpg",
      "/images/products/RT18-32X-4P-7.jpg",
    ],
    metaTitle: "RT18-32X 4P Fuse Holder 32A 690V 3P+N DIN Rail | Soltree",
    metaDescription: "RT18-32X 4P DIN rail fuse holder 32A 690V for 10x38mm fuses. Complete 3P+N fuse disconnection for TN-S systems and commercial distribution boards. LED per-pole indicator, CE & RoHS.",
    metaKeywords: "RT18-32X 4P fuse holder, 3P+N fuse holder 32A, four pole fuse holder DIN rail, TN-S fuse disconnection, neutral fuse holder, commercial distribution fuse base, four wire fuse holder 690V",
    imageAlts: [
      "Soltree RT18-32X 4P four-pole DIN rail fuse holder 32A 690V front view",
      "RT18-32X 4P fuse holder side profile with DIN rail clip",
      "RT18-32X 4P fuse holder four LED indicators close-up",
      "RT18-32X 4P fuse holder screw terminal wiring detail",
      "RT18-32X 4P fuse holder installed in commercial distribution board",
      "RT18-32X 4P fuse holder with 10x38mm ceramic fuse links",
      "RT18-32X 4P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-63X-1P",
    name: "RT18-63X 1P DIN Rail Fuse Holder 63A 690V",
    slug: "dc-fuse-holder-rt18-63x-1p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Single-pole 63A 690V DIN rail fuse holder for 14x51mm fuse links — high-current protection for single-phase main circuits, sub-distribution boards, and heavy-duty equipment feeds, with LED fuse-blow indication.",
    description:
      "When a single-phase circuit carries heavy loads — main feeder taps, sub-distribution boards, large HVAC units, or high-power machine tools — a 32A fuse holder is not enough. The Soltree RT18-63X 1P is rated at 63A and designed for 14x51mm cylindrical fuse links, making it the right choice for high-current single-phase applications that require robust overload and short-circuit protection. Its flame-retardant PVC housing and high-purity copper contacts ensure low contact resistance, minimal heat generation, and stable performance under continuous heavy load at up to 690V AC. The integrated red LED indicator lights up the moment the fuse blows, so maintenance staff can identify and clear the fault quickly without test equipment. A snap-on 35mm DIN rail design and screw terminals — rated for 4mm²–16mm² wire — allow straightforward installation in main distribution boards and industrial control cabinets. Note: fuse links are sold separately.",
    features: [
      "Single-pole design for high-current single-phase circuit protection",
      "Rated 63A / 500V–690V AC — handles main circuits and heavy-duty equipment",
      "Compatible with standard 14x51mm cylindrical fuse links",
      "Red LED indicator — instant visual fuse-blow detection",
      "Flame-retardant PVC housing — safe under high-current fault conditions",
      "High-purity copper contacts — low resistance for stable heavy-load transmission",
      "Snap-on 35mm DIN rail mounting",
      "Screw terminals rated for 4mm²–16mm² wire",
      "IP20 finger-safe protection",
      "Compliant with IEC 60269 and GB 13539",
      "CE & RoHS certified",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "High-Current Fuse Holder",
      "Model Number": "RT18-63X",
      "Pole Configuration": "1P (Single Pole)",
      "Rated Current": "63A",
      "Rated Voltage": "500V–690V AC",
      "Compatible Fuse Size": "14x51mm",
      "Mounting Type": "35mm DIN Rail",
      "Housing Material": "Flame-retardant PVC (V0 Rating)",
      "Contact Material": "High-Purity Copper",
      "Indicator Type": "LED Visual Indicator (Red)",
      "Indicator Function": "Illuminates on fuse blowout",
      "Connection Type": "Screw terminals",
      "Wire Capacity": "4mm² – 16mm²",
      "Protection Degree": "IP20",
      "Operating Temperature": "-25°C to +70°C",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "Main circuits, sub-distribution boards, high-power equipment",
      "Installation": "Snap-on DIN rail mounting",
      "Weight": "Approx. 95g",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-63X-1P-1.jpg",
    images: [
      "/images/products/RT18-63X-1P-1.jpg",
      "/images/products/RT18-63X-1P-2.jpg",
      "/images/products/RT18-63X-1P-3.jpg",
      "/images/products/RT18-63X-1P-4.jpg",
      "/images/products/RT18-63X-1P-5.jpg",
      "/images/products/RT18-63X-1P-6.jpg",
      "/images/products/RT18-63X-1P-7.jpg",
    ],
    metaTitle: "RT18-63X 1P Fuse Holder 63A 690V High-Current DIN Rail | Soltree",
    metaDescription: "RT18-63X 1P single-pole DIN rail fuse holder 63A 690V for 14x51mm fuses. High-current protection for main circuits and sub-distribution boards. LED blowout indicator, CE & RoHS.",
    metaKeywords: "RT18-63X 1P fuse holder, single pole fuse holder 63A, 14x51mm fuse holder, high current DIN rail fuse base, main circuit fuse holder 690V, heavy duty single phase fuse holder, sub-distribution board fuse protection",
    imageAlts: [
      "Soltree RT18-63X 1P single-pole high-current DIN rail fuse holder 63A 690V front view",
      "RT18-63X 1P fuse holder side profile with DIN rail clip",
      "RT18-63X 1P fuse holder LED indicator close-up",
      "RT18-63X 1P fuse holder screw terminal wiring detail for 14x51mm fuse",
      "RT18-63X 1P fuse holder installed in main distribution board",
      "RT18-63X 1P fuse holder with 14x51mm cylindrical fuse link",
      "RT18-63X 1P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-63X-2P",
    name: "RT18-63X 2P DIN Rail Fuse Holder 63A 690V",
    slug: "dc-fuse-holder-rt18-63x-2p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Double-pole 63A DIN rail fuse holder for 14x51mm fuse links — high-current dual-line protection for large PV arrays, battery storage systems, and heavy-duty dual-line AC/DC circuits, with LED fault indication.",
    description:
      "Large-scale photovoltaic arrays, high-capacity battery storage banks, and heavy-duty dual-line industrial circuits demand a fuse holder that can carry 63A continuously while protecting both conductors simultaneously. The Soltree RT18-63X 2P delivers exactly that: two independent 63A fuse positions in one compact module, rated at 690V AC or 500V DC, accommodating 14x51mm cylindrical fuse links. Compared to the RT18-32X 2P, the larger 14x51mm fuse format allows selection of higher-breaking-capacity fuse elements suited to the elevated fault currents found in large PV string combiners and battery inverter feeds. The reinforced flame-retardant PVC housing handles the thermal demands of high sustained currents, while high-conductivity copper contacts with optional tin plating minimize oxidation and contact resistance over time. A red LED status indicator on each pole gives immediate visual fault confirmation. Snap-on 35mm DIN rail mounting and 4mm²–16mm² screw clamp terminals support both quick installation and robust cable connections. Note: fuse links are sold separately.",
    features: [
      "Double-pole design — simultaneous high-current protection on both conductors",
      "Rated 63A / 690V AC or 500V DC — suited for large PV arrays and battery storage",
      "Compatible with standard 14x51mm cylindrical fuse links",
      "LED indicator per pole — instant fault detection on either conductor",
      "Reinforced flame-retardant PVC housing — handles high sustained current loads",
      "High-conductivity copper contacts — low oxidation, stable long-term DC performance",
      "Snap-on 35mm DIN rail mounting",
      "Screw clamp terminals for 4mm²–16mm² cables",
      "IP20 touch-safe protection",
      "Suitable for large PV arrays, battery inverter feeds, dual-line AC/DC circuits",
      "Compliant with IEC 60269 and GB/T 13539",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "High-Current Fuse Holder Base",
      "Model Number": "RT18-63X",
      "Pole Configuration": "2P (Double Pole)",
      "Rated Current": "63A",
      "Rated Voltage": "690V AC / 500V DC",
      "Compatible Fuse Size": "14x51mm",
      "Mounting Type": "35mm DIN Rail (Top-hat)",
      "Housing Material": "Flame-retardant PVC (UL94 V-0)",
      "Contact Material": "High-conductivity Copper (Tin-plated optional)",
      "Indicator Type": "LED Status Light (Red, per pole)",
      "Indicator Logic": "Lights up upon fuse failure",
      "Connection Method": "Screw clamp terminals",
      "Suitable Wire Size": "4mm² – 16mm² (AWG 12-6)",
      "Protection Class": "IP20 (Touch-safe)",
      "Operating Temperature": "-25°C to +60°C",
      "Standards Compliance": "IEC 60269, GB/T 13539",
      "Application": "Large PV Arrays, Battery Storage, Heavy-Duty Dual-Line Circuits",
      "Installation": "Snap-on mounting",
      "Weight": "Approx. 160g",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-63X-2P-1.jpg",
    images: [
      "/images/products/RT18-63X-2P-1.jpg",
      "/images/products/RT18-63X-2P-2.jpg",
      "/images/products/RT18-63X-2P-3.jpg",
      "/images/products/RT18-63X-2P-4.jpg",
      "/images/products/RT18-63X-2P-5.jpg",
      "/images/products/RT18-63X-2P-6.jpg",
      "/images/products/RT18-63X-2P-7.jpg",
    ],
    metaTitle: "RT18-63X 2P Fuse Holder 63A 690V High-Current DIN Rail | Soltree",
    metaDescription: "RT18-63X 2P DIN rail fuse holder 63A 690V/500V DC for 14x51mm fuses. High-current double-pole protection for large PV arrays and battery storage. LED indicator, CE & RoHS.",
    metaKeywords: "RT18-63X 2P fuse holder, double pole fuse holder 63A, 14x51mm DC fuse holder, large PV array fuse base, battery storage fuse holder 63A, high current dual pole fuse holder, solar inverter fuse protection 690V",
    imageAlts: [
      "Soltree RT18-63X 2P double-pole high-current DIN rail fuse holder 63A front view",
      "RT18-63X 2P fuse holder side profile with DIN rail clip",
      "RT18-63X 2P fuse holder dual LED indicators close-up",
      "RT18-63X 2P fuse holder screw clamp terminal for 14x51mm fuse",
      "RT18-63X 2P fuse holder installed in large PV combiner box",
      "RT18-63X 2P fuse holder with 14x51mm cylindrical fuse link",
      "RT18-63X 2P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-63X-3P",
    name: "RT18-63X 3P DIN Rail Fuse Holder 63A 690V",
    slug: "dc-fuse-holder-rt18-63x-3p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Three-pole 63A 690V DIN rail fuse holder for 14x51mm fuse links — high-current per-phase protection for large industrial motors, compressors, and heavy three-phase machinery, with LED fault indication per phase.",
    description:
      "Large industrial motors, air compressors, pump stations, and heavy three-phase machinery draw sustained currents that exceed the capacity of 32A fuse holders. The Soltree RT18-63X 3P is rated at 63A per phase and accepts 14x51mm cylindrical fuse links — the correct fuse format for high-breaking-capacity elements that can safely interrupt the large fault currents generated by big inductive loads. Three independent fuse positions, each with its own red LED indicator, allow maintenance engineers to identify a faulted phase instantly and replace only the blown fuse, minimizing downtime on production equipment. The compact 35mm DIN rail design fits standard motor control center (MCC) panels and industrial distribution boards without requiring a dedicated enclosure. Flame-retardant PVC housing and screw-terminal wiring rated for up to 16mm² cables handle the wiring demands of high-current three-phase circuits. Note: fuse links are sold separately.",
    features: [
      "Three-pole design — independent high-current protection per phase",
      "Rated 63A / 500V–690V AC — designed for large motors, compressors, and heavy machinery",
      "Compatible with standard 14x51mm cylindrical fuse links",
      "Individual red LED indicator per phase — fast phase-fault identification",
      "Flame-retardant PVC housing — safe under high-current fault conditions",
      "High-conductivity copper contacts — stable performance under heavy three-phase loads",
      "Tool-free 35mm DIN rail clip mounting",
      "Screw-terminal wiring for up to 16mm² cables",
      "IP20 finger-safe design",
      "Compliant with IEC 60269 and GB 13539",
      "CE & RoHS certified",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "Three-Phase High-Current Fuse Holder",
      "Model Number": "RT18-63X",
      "Pole Configuration": "3P (Three Pole)",
      "Rated Current": "63A",
      "Rated Voltage": "500V–690V AC",
      "Compatible Fuse Size": "14x51mm",
      "Mounting Type": "35mm DIN Rail",
      "Housing Material": "Flame-retardant PVC (V0 Grade)",
      "Contact Material": "High-Purity Copper",
      "Indicator Type": "LED Fault Indicator (Red, per phase)",
      "Operating Temperature": "-25°C to +70°C",
      "Protection Rating": "IP20 (Finger-Safe)",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "Large Industrial Motors, Compressors, Heavy Three-Phase Machinery",
      "Installation": "Tool-Free DIN Rail Clip",
      "Dimensions (Total Width)": "Approx. 54mm (3 modules x 18mm)",
      "Weight": "Approx. 240g",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-63X-3P-1.jpg",
    images: [
      "/images/products/RT18-63X-3P-1.jpg",
      "/images/products/RT18-63X-3P-2.jpg",
      "/images/products/RT18-63X-3P-3.jpg",
      "/images/products/RT18-63X-3P-4.jpg",
      "/images/products/RT18-63X-3P-5.jpg",
      "/images/products/RT18-63X-3P-6.jpg",
      "/images/products/RT18-63X-3P-7.jpg",
    ],
    metaTitle: "RT18-63X 3P Fuse Holder 63A 690V Heavy-Duty Three-Phase | Soltree",
    metaDescription: "RT18-63X 3P DIN rail fuse holder 63A 690V for 14x51mm fuses. High-current per-phase protection for large motors, compressors and industrial machinery. LED phase indicator, CE & RoHS.",
    metaKeywords: "RT18-63X 3P fuse holder, three phase fuse holder 63A, 14x51mm three phase fuse base, large motor protection fuse holder, industrial compressor fuse base, heavy duty three phase fuse holder 690V, MCC fuse holder 63A",
    imageAlts: [
      "Soltree RT18-63X 3P three-pole high-current DIN rail fuse holder 63A 690V front view",
      "RT18-63X 3P fuse holder side profile with DIN rail clip",
      "RT18-63X 3P fuse holder per-phase LED indicators close-up",
      "RT18-63X 3P fuse holder screw terminal wiring for 14x51mm fuse",
      "RT18-63X 3P fuse holder installed in industrial motor control center",
      "RT18-63X 3P fuse holder with 14x51mm cylindrical fuse links",
      "RT18-63X 3P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-63X-4P",
    name: "RT18-63X 4P DIN Rail Fuse Holder 63A 690V",
    slug: "dc-fuse-holder-rt18-63x-4p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Four-pole 63A 690V DIN rail fuse holder for 14x51mm fuse links — complete high-current 3P+N fuse disconnection for large commercial buildings, data centers, and industrial 4-wire distribution panels, with LED fault indication per pole.",
    description:
      "Large commercial buildings, data centers, industrial HVAC systems, and high-power 4-wire distribution panels require complete fuse protection across all three phases and the neutral simultaneously — and at currents that exceed the capacity of standard 32A holders. The Soltree RT18-63X 4P meets this requirement: four independent 63A fuse positions in a single compact housing, rated at 690V AC and accepting 14x51mm high-breaking-capacity cylindrical fuse links. Unlike the RT18-32X 4P, the 63A rating and larger 14x51mm fuse format are suited to main feeder protection, large HVAC main circuits, and heavy industrial four-wire loads where fault currents can be substantial. Each pole has its own red LED indicator, so even a neutral fuse failure is immediately visible without any test equipment. A tool-free 35mm DIN rail design, screw clamp terminals for cables up to 16mm², and IP20 finger-safe protection complete a solution engineered for demanding large-scale electrical installations. Note: fuse links are sold separately.",
    features: [
      "Four-pole 3P+N design — complete high-current protection across all phases and neutral",
      "Rated 63A / 500V–690V AC — suited for large commercial and industrial 4-wire systems",
      "Compatible with standard 14x51mm high-breaking-capacity cylindrical fuse links",
      "Individual red LED indicator per pole — detects phase and neutral fuse failures",
      "Flame-retardant PVC housing — handles high sustained current loads safely",
      "High-conductivity copper contacts — stable performance on all four poles",
      "Tool-free 35mm DIN rail mounting",
      "Screw clamp terminals for cables up to 16mm²",
      "IP20 finger-safe protection",
      "Ideal for data centers, large HVAC, and industrial 4-wire distribution",
      "Compliant with IEC 60269 and GB 13539",
      "Fuse links sold separately",
    ],
    specs: {
      "Product Type": "Four-Pole High-Current Fuse Holder",
      "Model Number": "RT18-63X",
      "Pole Configuration": "4P (Four Pole / 3P+N)",
      "Rated Current": "63A",
      "Rated Voltage": "500V–690V AC",
      "Compatible Fuse Size": "14x51mm",
      "Mounting Type": "35mm DIN Rail",
      "Housing Material": "Flame-retardant PVC (V0 Grade)",
      "Contact Material": "High-Purity Copper",
      "Indicator Type": "LED (Red, per pole)",
      "Protection Level": "IP20 (Finger-safe)",
      "Operating Temperature": "-25°C to +70°C",
      "Standards Compliance": "IEC 60269, GB 13539",
      "Application": "Large Commercial Buildings, Data Centers, Industrial 4-Wire Distribution",
      "Installation": "Tool-free DIN Rail Clip",
      "Dimensions (Total Width)": "Approx. 72mm (4 modules x 18mm)",
      "Weight": "Approx. 300g",
      "Certification": "CE, RoHS",
      "Fuse Inclusion": "Fuse links NOT included — sold separately",
    },
    image: "/images/products/RT18-63X-4P-1.jpg",
    images: [
      "/images/products/RT18-63X-4P-1.jpg",
      "/images/products/RT18-63X-4P-2.jpg",
      "/images/products/RT18-63X-4P-3.jpg",
      "/images/products/RT18-63X-4P-4.jpg",
      "/images/products/RT18-63X-4P-5.jpg",
      "/images/products/RT18-63X-4P-6.jpg",
      "/images/products/RT18-63X-4P-7.jpg",
    ],
    metaTitle: "RT18-63X 4P Fuse Holder 63A 690V 3P+N High-Current | Soltree",
    metaDescription: "RT18-63X 4P DIN rail fuse holder 63A 690V for 14x51mm fuses. Complete 3P+N high-current fuse disconnection for large commercial buildings, data centers and industrial 4-wire panels. CE & RoHS.",
    metaKeywords: "RT18-63X 4P fuse holder, four pole fuse holder 63A, 14x51mm 3P+N fuse holder, high current 4P DIN rail fuse base, data center fuse protection, large commercial building fuse holder, industrial 4-wire fuse disconnection 690V",
    imageAlts: [
      "Soltree RT18-63X 4P four-pole high-current DIN rail fuse holder 63A 690V front view",
      "RT18-63X 4P fuse holder side profile with DIN rail clip",
      "RT18-63X 4P fuse holder four LED indicators close-up",
      "RT18-63X 4P fuse holder screw terminal wiring for 14x51mm fuse",
      "RT18-63X 4P fuse holder installed in large commercial distribution panel",
      "RT18-63X 4P fuse holder with 14x51mm cylindrical fuse links",
      "RT18-63X 4P fuse holder product dimensions drawing",
    ],
  },
  {
    id: "RT18-125AM-1P",
    name: "RT18-125AM 1P DIN Rail Fuse Holder 125A 690V",
    slug: "dc-fuse-holder-rt18-125am-1p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Single-pole 125A 690V DIN rail fuse holder for Φ22×58mm fuse links — the most compact RT18-125AM option at 35mm wide, one module per rail slot, ideal for single-phase lighting circuits and individual equipment protection.",
    description:
      "When a single-phase circuit needs reliable cylindrical fuse protection without consuming extra rail space, the Soltree RT18-125AM 1P is the go-to choice. At just 35mm wide (one DIN rail module), it is the most space-efficient configuration in the RT18-125AM series — fitting tight control cabinets where every millimeter counts. Typical applications include single-phase lighting distribution boards, individual machine tool circuits, HVAC compressor feeds and any installation where per-circuit fuse isolation on a single live conductor is required. The flame-retardant, high-temperature resistant housing pairs with thickened copper conductors (conductivity >98%) to keep contact resistance below 5mΩ and current transmission efficiency above 99.5%. Rated 125A / 690V, it accepts standard Φ22×58mm cylindrical fuse links (63A / 80A / 100A / 125A, sold separately) and clips onto any 35mm DIN rail in seconds. A yellow fuse status window enables visual fault checks at a glance, and oversized wiring terminals with premium screws lock down vibration-resistant connections. Every unit is 100% electrically tested before leaving our ISO 9001 certified facility. Note: fuse links are NOT included.",
    features: [
      "Rated 125A / 690V — handles demanding single-phase industrial loads",
      "Fits standard Φ22×58mm cylindrical fuse links — globally sourced spares",
      "Thickened copper conductors, conductivity >98% — efficient power transmission",
      "Contact resistance <5mΩ, current transmission efficiency >99.5% — minimal heat loss",
      "Yellow fuse status indicator window — instant visual fault diagnosis",
      "35mm DIN rail clip mounting — fast deployment in any control cabinet",
      "Flame-retardant, high-temperature resistant insulated housing — safe under fault conditions",
      "Oversized wiring terminals + premium screws — secure, vibration-resistant connections",
      "CE & RoHS certified — accepted in EU, UK, and global markets",
      "OEM / ODM customization available — logo, label, packaging",
      "15-year ISO 9001 certified factory, 200+ projects delivered in 10+ countries",
    ],
    specs: {
      "Product Model": "RT18-125AM",
      "Pole Configuration": "1P (Single Pole)",
      "Rated Current": "125A",
      "Rated Voltage": "690V",
      "Compatible Fuse Size": "Φ22×58mm",
      "Optional Fuse Ratings": "63A / 80A / 100A / 125A (sold separately)",
      "Fuse Inclusion": "Fuse link NOT included — purchased separately",
      "Housing Material": "High Flame-Retardant & High-Temperature Resistant Insulated Material",
      "Conductor Material": "Thickened Copper",
      "Conductivity": ">98%",
      "Contact Resistance": "<5mΩ",
      "Current Transmission Efficiency": ">99.5%",
      "Mounting Method": "35mm Standard DIN Rail",
      "Product Dimensions": "35mm (W) × 127mm (H) × 76mm (D)",
      "Fuse Indication": "Yellow Status Indicator Window",
      "Wiring Design": "Large Wiring Terminals + High-Quality Screws",
      "Safety Features": "Flame Retardant, High-Temperature Resistant, Safe Insulation",
      "Application": "Industrial Control Cabinets, Distribution Boxes, Switchgear",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/RT18-125AM-1P-1.jpg",
    images: [
      "/images/products/RT18-125AM-1P-1.jpg",
      "/images/products/RT18-125AM-1p-2.jpg",
      "/images/products/RT18-125AM-1p-3.jpg",
      "/images/products/RT18-125AM-1p-4.jpg",
      "/images/products/RT18-125AM-1p-5.jpg",
      "/images/products/RT18-125AM-1p-6.jpg",
    ],
    metaTitle: "RT18-125AM 1P Fuse Holder 125A 690V DIN Rail | Soltree",
    metaDescription: "RT18-125AM 1P single-pole DIN rail fuse holder, 125A 690V, Φ22×58mm. Most compact 35mm-wide option for single-phase lighting & machine circuits. CE & RoHS, OEM available.",
    metaKeywords: "RT18-125AM 1P fuse holder, single pole fuse holder 125A, single phase fuse base DIN rail, 1P cylindrical fuse holder 690V, lighting circuit fuse holder, 22x58 single pole fuse base, single pole fuse holder supplier",
    imageAlts: [
      "Soltree RT18-125AM 1P DIN rail fuse holder 125A 690V front view",
      "RT18-125AM single pole fuse holder side profile with DIN rail clip",
      "RT18-125AM 1P fuse holder yellow fuse status indicator window close-up",
      "RT18-125AM 1P fuse holder wiring terminals and screw detail",
      "RT18-125AM 1P fuse holder installed on 35mm DIN rail in distribution box",
      "RT18-125AM 1P fuse holder product dimensions 35x127x76mm drawing",
    ],
  },
  {
    id: "RT18-125AM-2P",
    name: "RT18-125AM 2P DIN Rail Fuse Holder 125A 690V",
    slug: "dc-fuse-holder-rt18-125am-2p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Double-pole 125A 690V DIN rail fuse holder for Φ22×58mm fuse links — simultaneous line + neutral disconnection, compliant with IEC 60364 / BS 7671 double-pole protection requirements, ideal for TT earthing systems and outdoor circuits.",
    description:
      "Certain installations demand more than single-pole fuse protection — TT earthing systems, bathroom circuits, outdoor distribution boards and any project governed by IEC 60364 or BS 7671 all require double-pole disconnection on the live and neutral conductors simultaneously. The Soltree RT18-125AM 2P is built precisely for these applications. By fusing both line and neutral in a single 70mm-wide (2-module) housing, it satisfies the regulatory requirement for complete single-phase isolation without additional switching components. The flame-retardant housing integrates thickened copper conductors (conductivity >98%), keeping contact resistance below 5mΩ and transmission efficiency above 99.5%. Rated 125A / 690V, it takes standard Φ22×58mm cylindrical fuse links (63A / 80A / 100A / 125A, sold separately) and snaps onto any 35mm DIN rail. A yellow indicator window on each pole gives independent per-conductor status at a glance, while oversized terminals and premium screws ensure vibration-proof connections in demanding environments. Every unit passes 100% electrical testing at our ISO 9001 certified facility before shipment. Note: fuse links are NOT included.",
    features: [
      "Dual-pole design — simultaneous line + neutral fuse protection in one unit",
      "Complies with IEC 60364 / BS 7671 double-pole protection requirements",
      "Rated 125A / 690V — handles demanding single-phase industrial loads",
      "Fits standard Φ22×58mm cylindrical fuse links — globally sourced spares",
      "Thickened copper conductors, conductivity >98% — efficient power transmission",
      "Contact resistance <5mΩ, current transmission efficiency >99.5% — minimal heat loss",
      "Yellow fuse status indicator window on each pole — instant visual fault diagnosis",
      "2-module 70mm wide, 35mm DIN rail clip mounting — fast deployment",
      "Flame-retardant, high-temperature resistant insulated housing — safe under fault conditions",
      "Oversized wiring terminals + premium screws — secure, vibration-resistant connections",
      "CE & RoHS certified — accepted in EU, UK, and global markets",
      "OEM / ODM customization available — logo, label, packaging",
      "15-year ISO 9001 certified factory, 200+ projects delivered in 10+ countries",
    ],
    specs: {
      "Product Model": "RT18-125AM",
      "Pole Configuration": "2P (Double Pole)",
      "Rated Current": "125A",
      "Rated Voltage": "690V",
      "Compatible Fuse Size": "Φ22×58mm",
      "Optional Fuse Ratings": "63A / 80A / 100A / 125A (sold separately)",
      "Fuse Inclusion": "Fuse link NOT included — purchased separately",
      "Housing Material": "High Flame-Retardant & High-Temperature Resistant Insulated Material",
      "Conductor Material": "Thickened Copper",
      "Conductivity": ">98%",
      "Contact Resistance": "<5mΩ",
      "Current Transmission Efficiency": ">99.5%",
      "Mounting Method": "35mm Standard DIN Rail",
      "Product Dimensions": "70mm (W) × 127mm (H) × 76mm (D)",
      "Fuse Indication": "Yellow Status Indicator Window (per pole)",
      "Wiring Design": "Large Wiring Terminals + High-Quality Screws",
      "Safety Features": "Flame Retardant, High-Temperature Resistant, Safe Insulation",
      "Application": "TT Earthing Systems, Outdoor Circuits, Bathroom Installations, Double-Pole Compliance Boards",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/RT18-125AM-2p-1.jpg",
    images: [
      "/images/products/RT18-125AM-2p-1.jpg",
      "/images/products/RT18-125AM-2p-2.jpg",
      "/images/products/RT18-125AM-2p-3.jpg",
      "/images/products/RT18-125AM-2p-4.jpg",
      "/images/products/RT18-125AM-2p-5.jpg",
      "/images/products/RT18-125AM-2p-6.jpg",
    ],
    metaTitle: "RT18-125AM 2P Fuse Holder 125A 690V Double-Pole DIN Rail | Soltree",
    metaDescription: "RT18-125AM 2P double-pole DIN rail fuse holder 125A 690V — simultaneous line + neutral fuse protection, IEC 60364 / BS 7671 compliant. For TT earthing & outdoor circuits. CE & RoHS, OEM available.",
    metaKeywords: "RT18-125AM 2P fuse holder, double pole fuse holder 125A, line neutral fuse protection, IEC 60364 fuse holder, BS 7671 double pole fuse base, TT earthing fuse holder, outdoor circuit fuse holder 690V, 2P cylindrical fuse base",
    imageAlts: [
      "Soltree RT18-125AM 2P double pole DIN rail fuse holder 125A 690V front view",
      "RT18-125AM 2P fuse holder side profile with DIN rail clip",
      "RT18-125AM 2P fuse holder dual yellow fuse status indicator windows close-up",
      "RT18-125AM 2P fuse holder wiring terminals and screw detail",
      "RT18-125AM 2P fuse holder installed on 35mm DIN rail in distribution box",
      "RT18-125AM 2P fuse holder product dimensions 70x127x76mm drawing",
    ],
  },
  {
    id: "RT18-125AM-3P",
    name: "RT18-125AM 3P DIN Rail Fuse Holder 125A 690V",
    slug: "dc-fuse-holder-rt18-125am-3p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Three-pole 125A 690V DIN rail fuse holder for Φ22×58mm fuse links — independent per-phase fuse protection for three-phase motors and industrial machinery, individual yellow status indicators for rapid phase-fault diagnosis.",
    description:
      "Three-phase motor starters, industrial machinery feeds and manufacturing plant distribution boards all share a common requirement: per-phase fuse protection that lets maintenance teams pinpoint a blown fuse on one phase without shutting down the entire system. The Soltree RT18-125AM 3P is engineered for exactly this workflow. Three independent fuse positions — each with its own yellow status indicator window — let operators identify a fault phase in seconds, minimizing downtime on production lines and motor control centers. The 105mm-wide (3-module) housing fits standard 35mm DIN rails and accommodates Φ22×58mm cylindrical fuse links at 125A / 690V (fuse links sold separately: 63A / 80A / 100A / 125A). Thickened copper conductors (conductivity >98%) and sub-5mΩ contact resistance maintain over 99.5% transmission efficiency even at sustained high currents typical of motor loads. Flame-retardant housing and large wiring terminals with premium screws complete the assembly for safe, vibration-resistant operation in harsh industrial environments. Every unit is 100% electrically tested in our ISO 9001 certified facility. Note: fuse links are NOT included.",
    features: [
      "Three-pole design — independent fuse protection for each phase in one unit",
      "Rated 125A / 690V — handles demanding three-phase industrial loads",
      "Fits standard Φ22×58mm cylindrical fuse links — globally sourced spares",
      "Thickened copper conductors, conductivity >98% — efficient power transmission",
      "Contact resistance <5mΩ, current transmission efficiency >99.5% — minimal heat loss",
      "Individual yellow fuse status indicator window per phase — instant per-phase fault diagnosis",
      "3-module 105mm wide, 35mm DIN rail clip mounting — fast deployment",
      "Flame-retardant, high-temperature resistant insulated housing — safe under fault conditions",
      "Large wiring terminals + premium screws — secure, vibration-resistant connections",
      "CE & RoHS certified — accepted in EU, UK, and global markets",
      "OEM / ODM customization available — logo, label, packaging",
      "15-year ISO 9001 certified factory, 200+ projects delivered in 10+ countries",
    ],
    specs: {
      "Product Model": "RT18-125AM",
      "Pole Configuration": "3P (Three Pole)",
      "Rated Current": "125A",
      "Rated Voltage": "690V",
      "Compatible Fuse Size": "Φ22×58mm",
      "Optional Fuse Ratings": "63A / 80A / 100A / 125A (sold separately)",
      "Fuse Inclusion": "Fuse links NOT included — purchased separately",
      "Housing Material": "High Flame-Retardant & High-Temperature Resistant Insulated Material",
      "Conductor Material": "Thickened Copper",
      "Conductivity": ">98%",
      "Contact Resistance": "<5mΩ",
      "Current Transmission Efficiency": ">99.5%",
      "Mounting Method": "35mm Standard DIN Rail",
      "Product Dimensions": "105mm (W) × 127mm (H) × 76mm (D)",
      "Fuse Indication": "Yellow Status Indicator Window (per phase)",
      "Wiring Design": "Large Wiring Terminals + High-Quality Screws",
      "Safety Features": "Flame Retardant, High-Temperature Resistant, Safe Insulation",
      "Application": "Three-Phase Industrial Circuits, Motor Protection, Distribution Boxes",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/RT18-125AM-3p-1.jpg",
    images: [
      "/images/products/RT18-125AM-3p-1.jpg",
      "/images/products/RT18-125AM-3p-2.jpg",
      "/images/products/RT18-125AM-3p-3.jpg",
      "/images/products/RT18-125AM-3p-4.jpg",
      "/images/products/RT18-125AM-3p-5.jpg",
      "/images/products/RT18-125AM-3p-6.jpg",
    ],
    metaTitle: "RT18-125AM 3P Fuse Holder 125A 690V Three-Phase DIN Rail | Soltree",
    metaDescription: "RT18-125AM 3P three-phase DIN rail fuse holder 125A 690V — per-phase fuse isolation for motor starters & industrial machinery, individual yellow phase indicators. CE & RoHS, OEM available.",
    metaKeywords: "RT18-125AM 3P fuse holder, three phase fuse holder 125A, 3 pole motor protection fuse base, three phase MCC fuse holder, motor starter fuse holder DIN rail, 3P cylindrical fuse base 690V, industrial three phase fuse protection",
    imageAlts: [
      "Soltree RT18-125AM 3P three pole DIN rail fuse holder 125A 690V front view",
      "RT18-125AM 3P fuse holder side profile with DIN rail clip",
      "RT18-125AM 3P fuse holder three yellow fuse status indicator windows close-up",
      "RT18-125AM 3P fuse holder wiring terminals and screw detail",
      "RT18-125AM 3P fuse holder installed on 35mm DIN rail in distribution box",
      "RT18-125AM 3P fuse holder product dimensions 105x127x76mm drawing",
    ],
  },
  {
    id: "RT18-125AM-4P",
    name: "RT18-125AM 4P DIN Rail Fuse Holder 125A 690V",
    slug: "dc-fuse-holder-rt18-125am-4p",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "Four-pole 125A 690V DIN rail fuse holder for Φ22×58mm fuse links — complete 3P+N fuse disconnection for TN-S/TN-C-S systems, four independent yellow status indicators, ideal for large HVAC, MCC and complex four-wire distribution boards.",
    description:
      "In TN-S and TN-C-S distribution systems, complete isolation means disconnecting all three phase conductors and the neutral — leaving any one unfused creates a hazard when the neutral shifts under unbalanced load. The Soltree RT18-125AM 4P solves this with four independent fuse positions in one 140mm-wide (4-module) housing, providing full 3P+N fuse protection in a single DIN rail component. Typical applications include large HVAC system feeds, motor control centers serving unbalanced loads, main distribution boards in commercial buildings and any switchgear where full four-wire fuse isolation is required by the system design or local wiring regulations. Four yellow indicator windows — one per pole — allow maintenance teams to identify a faulty phase or neutral fuse without probing live conductors. Thickened copper conductors (conductivity >98%) hold contact resistance below 5mΩ and transmission efficiency above 99.5% across all four poles simultaneously. Rated 125A / 690V, it accepts Φ22×58mm cylindrical fuse links (63A / 80A / 100A / 125A, sold separately). Large wiring terminals and premium screws provide secure, vibration-resistant connections. Every unit is 100% electrically tested at our ISO 9001 certified facility before shipment. Note: fuse links are NOT included.",
    features: [
      "Four-pole 3P+N design — independent fuse protection for three phases and neutral in one unit",
      "Rated 125A / 690V — handles demanding three-phase four-wire industrial loads",
      "Fits standard Φ22×58mm cylindrical fuse links — globally sourced spares",
      "Thickened copper conductors, conductivity >98% — efficient power transmission",
      "Contact resistance <5mΩ, current transmission efficiency >99.5% — minimal heat loss",
      "Four independent yellow fuse status indicator windows — instant per-pole fault diagnosis",
      "4-module 140mm wide, 35mm DIN rail clip mounting — fast deployment",
      "Flame-retardant, high-temperature resistant insulated housing — safe under fault conditions",
      "Large wiring terminals + premium screws — secure, vibration-resistant connections",
      "CE & RoHS certified — accepted in EU, UK, and global markets",
      "OEM / ODM customization available — logo, label, packaging",
      "15-year ISO 9001 certified factory, 200+ projects delivered in 10+ countries",
    ],
    specs: {
      "Product Model": "RT18-125AM",
      "Pole Configuration": "4P (Four Pole / 3P+N)",
      "Rated Current": "125A",
      "Rated Voltage": "690V",
      "Compatible Fuse Size": "Φ22×58mm",
      "Optional Fuse Ratings": "63A / 80A / 100A / 125A (sold separately)",
      "Fuse Inclusion": "Fuse links NOT included — purchased separately",
      "Housing Material": "High Flame-Retardant & High-Temperature Resistant Insulated Material",
      "Conductor Material": "Thickened Copper",
      "Conductivity": ">98%",
      "Contact Resistance": "<5mΩ",
      "Current Transmission Efficiency": ">99.5%",
      "Mounting Method": "35mm Standard DIN Rail",
      "Product Dimensions": "140mm (W) × 127mm (H) × 76mm (D)",
      "Fuse Indication": "Yellow Status Indicator Window (per pole, 4 positions)",
      "Wiring Design": "Large Wiring Terminals + High-Quality Screws",
      "Safety Features": "Flame Retardant, High-Temperature Resistant, Safe Insulation",
      "Application": "Three-Phase Four-Wire Systems, Industrial Control Cabinets, Distribution Boxes",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/RT18-125AM-4p-1.jpg",
    images: [
      "/images/products/RT18-125AM-4p-1.jpg",
      "/images/products/RT18-125AM-4p-2.jpg",
      "/images/products/RT18-125AM-4p-3.jpg",
      "/images/products/RT18-125AM-4p-4.jpg",
      "/images/products/RT18-125AM-4p-5.jpg",
      "/images/products/RT18-125AM-4p-6.jpg",
    ],
    metaTitle: "RT18-125AM 4P Fuse Holder 125A 690V 3P+N DIN Rail | Soltree",
    metaDescription: "RT18-125AM 4P DIN rail fuse holder 125A 690V — complete 3P+N four-wire fuse disconnection for TN-S/TN-C-S systems, HVAC and MCC panels, 4 yellow indicators. CE & RoHS, OEM available.",
    metaKeywords: "RT18-125AM 4P fuse holder, 3P+N fuse holder 125A, four pole fuse holder DIN rail, TN-S fuse disconnection, neutral fuse holder 690V, four wire fuse base, HVAC fuse holder, MCC fuse holder four pole, complete disconnection fuse base",
    imageAlts: [
      "Soltree RT18-125AM 4P four pole DIN rail fuse holder 125A 690V front view",
      "RT18-125AM 4P fuse holder side profile with DIN rail clip",
      "RT18-125AM 4P fuse holder four yellow fuse status indicator windows close-up",
      "RT18-125AM 4P fuse holder wiring terminals and screw detail",
      "RT18-125AM 4P fuse holder installed on 35mm DIN rail in distribution box",
      "RT18-125AM 4P fuse holder product dimensions 140x127x76mm drawing",
    ],
  },
  // Over Voltage Protector
  {
    id: "PN2-VA2",
    name: "PN2-VA2 Self-Resetting Over/Under Voltage Protector 40A–80A",
    slug: "pn2-va2-self-resetting-over-under-voltage-protector",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Self-resetting over/under voltage and over-current protector with dual digital display — automatically disconnects on fault and restores power when the supply stabilizes, no manual reset needed. 40A / 63A / 80A options.",
    description:
      "The Soltree PN2-VA2 is a self-resetting over/under voltage and over-current protector designed for homes, light commercial premises, and distribution boards where continuous protection without manual intervention is essential. When the supply voltage exceeds the user-set over-voltage or under-voltage threshold — or when current surpasses the over-current trip point — the PN2-VA2 disconnects the circuit within 0.5 seconds to prevent damage to appliances and sensitive electronics.\n\nOnce the supply returns to a stable, safe range, the device automatically restores power after an adjustable reset delay (0–999 seconds, default 60s), eliminating the need for a manual reset call-out. The high-resolution dual-screen digital display shows real-time voltage in red and current in green simultaneously, giving installers and users immediate circuit health information at a glance.\n\nAll trip thresholds are user-configurable via the front panel: over-voltage from 130V to 300V AC, under-voltage from 80V to 210V AC. A password lock function prevents unauthorized changes to these settings — important in shared or rental properties. Additional features include an energy-saving mode to reduce self-consumption and full support for OEM logo customization. Available in 40A, 63A, and 80A variants; rated supply voltage AC 220V (AC 110V customizable).",
    features: [
      "Self-resetting — automatically restores power after fault clears, no manual reset required",
      "Dual digital display — real-time voltage (red) and current (green) on separate screens",
      "User-configurable trip points — over-voltage 130–300V, under-voltage 80–210V AC",
      "Over-current protection — adjustable current trip threshold",
      "Fast 0.5-second disconnect on fault detection",
      "Adjustable reset delay 0–999 seconds (default 60s) — prevents rapid cycling",
      "Password lock — prevents unauthorized parameter changes",
      "Energy-saving mode — reduces device self-consumption",
      "Available in 40A / 63A / 80A current ratings",
      "Rated supply voltage AC 220V (AC 110V customizable)",
      "35mm DIN rail mounting — standard distribution board installation",
      "Flame-retardant PC housing (UL94 V-0) — safe under fault conditions",
      "Mechanical life ≥10,000 cycles",
      "OEM logo customization supported",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Type": "Self-Resetting Over/Under Voltage Protector",
      "Model": "PN2-VA2",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 130–300V",
      "Under-Voltage Setting Range": "AC 80–210V",
      "Over-Voltage Trip Delay": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Max. Working Current": "40A / 63A / 80A (Optional)",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default 60s)",
      "Display Mode": "Dual Digital Display — Voltage (Red) + Current (Green)",
      "Password Protection": "Supported — prevents unauthorized parameter changes",
      "Energy-Saving Mode": "Switchable",
      "Housing Material": "Flame-retardant PC (UL94 V-0)",
      "Dimensions": "81 × 36 × 66mm",
      "Installation": "35mm DIN Rail",
      "Ambient Temperature": "-25°C to +55°C",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-condensing)",
      "Mechanical Life": "≥10,000 Cycles",
      "Protection Functions": "Over-voltage, Under-voltage, Over-current, Delay Protection",
      "OEM Customization": "Logo customization supported",
      "Application": "Residential Distribution Boards, Light Commercial Premises, Home Appliance Protection",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/PN2-VA2-1.jpg",
    images: [
      "/images/products/PN2-VA2-1.jpg",
      "/images/products/PN2-VA2-2.jpg",
      "/images/products/PN2-VA2-3.jpg",
      "/images/products/PN2-VA2-4.jpg",
      "/images/products/PN2-VA2-5.jpg",
      "/images/products/PN2-VA2-6.jpg",
      "/images/products/PN2-VA2-7.jpg",
      "/images/products/PN2-VA2-8.jpg",
    ],
    metaTitle: "PN2-VA2 Self-Resetting Voltage Protector 40A–80A 220V | Soltree",
    metaDescription: "PN2-VA2 self-resetting over/under voltage protector 40A–80A, AC 220V. Dual digital display, auto-reconnect, password lock, 0.5s trip. DIN rail, CE & RoHS. OEM available.",
    metaKeywords: "PN2-VA2 voltage protector, self-resetting over voltage protector, under voltage protector DIN rail, automatic voltage protector 220V, dual display voltage protector, over current protector 63A, auto reconnect voltage relay, appliance voltage protection",
    imageAlts: [
      "Soltree PN2-VA2 self-resetting over under voltage protector dual digital display front view",
      "PN2-VA2 voltage protector dual screen showing voltage and current readings",
      "PN2-VA2 protector parameter setting panel over-voltage under-voltage trip points",
      "PN2-VA2 voltage protector DIN rail mounting side profile",
      "PN2-VA2 self-resetting voltage protector installed in distribution board",
      "PN2-VA2 protector wiring terminal connections detail",
      "PN2-VA2 voltage protector product dimensions 81x36x66mm drawing",
      "PN2-VA2 voltage protector 40A 63A 80A current rating options comparison",
    ],
  },
  {
    id: "PN2-VA3",
    name: "PN2-VA3 Self-Resetting Over/Under Voltage Protector 40A–80A",
    slug: "pn2-va3-self-resetting-over-under-voltage-protector",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Self-resetting voltage protector for professional electrical contractors and commercial panel installations — white + green dual digital display delivers sharp digit contrast under the bright fluorescent lighting typical of commercial enclosures. Configurable over/under voltage and over-current thresholds, auto-restore, password lock. CE & RoHS certified. 40A / 63A / 80A.",
    description:
      "Electrical contractors working on commercial distribution boards, office fit-outs, and retail unit power installations need protection devices that are easy to inspect and commission on-site. The Soltree PN2-VA3 is built with professional installers in mind — its dual digital display uses white voltage digits and green current digits, a combination that delivers noticeably sharper contrast under the bright fluorescent lighting found in commercial electrical rooms, switchgear enclosures, and panel inspection environments.\n\nWhere the PN2-VA2 is specified for residential and home use, the PN2-VA3 is the preferred choice for commercial electrical contractors supplying office buildings and retail chains, panel builders working to professional installation standards, and export projects where CE and RoHS certification is a procurement requirement.\n\nThe protection platform is fully configurable: over-voltage threshold (130–300V AC), under-voltage threshold (80–210V AC), and over-current trip are all set via the front panel, with 0.5-second automatic disconnect on fault and automatic power restoration once the supply stabilizes. Reset delay is adjustable from 0 to 999 seconds (default 60s) to prevent nuisance tripping in commercial circuits. A password lock prevents unauthorized changes in multi-tenant commercial premises. Available in 40A, 63A, and 80A variants; AC 110V customizable for international export markets. 35mm DIN rail mounting. CE and RoHS certified.",
    features: [
      "White + green dual digital display — sharper digit contrast in bright commercial enclosures and fluorescent-lit switchrooms",
      "Self-resetting — automatically restores power after fault clears, no manual reset required",
      "User-configurable trip points — over-voltage 130–300V, under-voltage 80–210V AC",
      "Over-current protection — adjustable current trip threshold",
      "Fast 0.5-second disconnect on fault detection",
      "Adjustable reset delay 0–999 seconds (default 60s) — prevents nuisance tripping in commercial circuits",
      "Password lock — prevents unauthorized changes in multi-tenant commercial premises",
      "Energy-saving mode — reduces device self-consumption",
      "Available in 40A / 63A / 80A current ratings",
      "Rated supply voltage AC 220V (AC 110V customizable for international export)",
      "35mm DIN rail mounting — standard commercial distribution board installation",
      "Flame-retardant PC housing (UL94 V-0)",
      "Mechanical life ≥10,000 cycles",
      "CE & RoHS certified — accepted for EU, UK, and international export projects",
    ],
    specs: {
      "Product Type": "Self-Resetting Over/Under Voltage Protector",
      "Model": "PN2-VA3",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 130–300V",
      "Under-Voltage Setting Range": "AC 80–210V",
      "Over-Voltage Trip Delay": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Max. Working Current": "40A / 63A / 80A (Optional)",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default 60s)",
      "Display Mode": "Dual Digital Display — Voltage (White) + Current (Green)",
      "Password Protection": "Supported — prevents unauthorized parameter changes",
      "Energy-Saving Mode": "Switchable",
      "Housing Material": "Flame-retardant PC (UL94 V-0)",
      "Dimensions": "81 × 36 × 66mm",
      "Installation": "35mm DIN Rail",
      "Ambient Temperature": "-25°C to +55°C",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-condensing)",
      "Mechanical Life": "≥10,000 Cycles",
      "Protection Functions": "Over-voltage, Under-voltage, Over-current, Delay Protection",
      "Application": "Commercial Electrical Installations, Contractor Panel Builds, Office Buildings, Export Projects",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/PN2-VA3-1.jpg",
    images: [
      "/images/products/PN2-VA3-1.jpg",
      "/images/products/PN2-VA3-2.jpg",
      "/images/products/PN2-VA3-3.jpg",
      "/images/products/PN2-VA3-4.jpg",
      "/images/products/PN2-VA3-5.jpg",
      "/images/products/PN2-VA3-6.jpg",
      "/images/products/PN2-VA3-7.jpg",
      "/images/products/PN2-VA3-8.jpg",
    ],
    metaTitle: "PN2-VA3 Voltage Protector Commercial Contractor White Display 40A–80A | Soltree",
    metaDescription: "PN2-VA3 self-resetting voltage protector for commercial electrical contractors — white + green dual display for clear panel readability, auto-reconnect, 40A–80A. CE & RoHS certified for export.",
    metaKeywords: "PN2-VA3 voltage protector commercial, electrical contractor voltage relay DIN rail, commercial panel voltage protector white display, over voltage protector contractor installation, CE RoHS voltage protector export, distribution board voltage relay commercial, 63A voltage relay panel builder, office retail voltage protection relay",
    imageAlts: [
      "Soltree PN2-VA3 self-resetting over under voltage protector white green dual display front view",
      "PN2-VA3 voltage protector dual screen showing white voltage and green current readings",
      "PN2-VA3 protector parameter setting panel trip point adjustment",
      "PN2-VA3 voltage protector DIN rail mounting side profile",
      "PN2-VA3 self-resetting voltage protector installed in home distribution board",
      "PN2-VA3 protector wiring terminal connections detail",
      "PN2-VA3 voltage protector product dimensions 81x36x66mm drawing",
      "PN2-VA3 voltage protector 40A 63A 80A current rating options",
    ],
  },
  {
    id: "PN2-VA4",
    name: "PN2-VA4 Self-Resetting Voltage Protector 40A–80A with OEM Logo Support",
    slug: "pn2-va4-self-resetting-voltage-protector-oem",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Self-resetting over/under voltage and over-current protector with red + green dual digital display and full OEM logo customization — ideal for distributors, panel builders, and private-label electrical brands. 40A / 63A / 80A options.",
    description:
      "The Soltree PN2-VA4 is a self-resetting over/under voltage and over-current protector designed for electrical distributors, panel builders, and OEM customers who require a branded protection device at competitive wholesale quantities. It delivers the same automatic protection performance as the PN2-VA2 — 0.5-second fault disconnect, auto-restore after supply stabilization, and fully configurable trip thresholds — but is specifically offered with factory-level OEM logo customization on the housing and packaging, making it suitable for private-label electrical brands and distributor own-brand programs.\n\nThe high-resolution dual digital display shows real-time voltage in red and current in green for clear circuit health monitoring. All protection parameters — over-voltage (130–300V AC), under-voltage (80–210V AC), over-current, and reset delay (0–999s, default 60s) — are user-configurable via the front panel, with password lock to prevent unauthorized field changes.\n\nAvailable in 40A, 63A, and 80A variants on a standard 35mm DIN rail footprint. AC 110V customization also available for export markets. Contact us for MOQ, branding specifications, and sample requests.",
    features: [
      "OEM logo customization — factory branding on housing and packaging for private-label programs",
      "Self-resetting — auto-disconnects on fault, auto-restores when supply stabilizes",
      "Dual digital display — real-time voltage (red) + current (green)",
      "User-configurable trip points — over-voltage 130–300V, under-voltage 80–210V AC",
      "Over-current protection with adjustable trip threshold",
      "Fast 0.5-second disconnect on fault detection",
      "Adjustable reset delay 0–999 seconds (default 60s)",
      "Password lock — prevents unauthorized parameter changes in the field",
      "Energy-saving mode — reduces standby self-consumption",
      "Available in 40A / 63A / 80A current ratings",
      "Rated supply voltage AC 220V (AC 110V customizable for export)",
      "35mm DIN rail mounting",
      "Flame-retardant PC housing (UL94 V-0)",
      "Mechanical life ≥10,000 cycles",
      "CE & RoHS certified — accepted in EU, UK, and global markets",
    ],
    specs: {
      "Product Type": "Self-Resetting Over/Under Voltage Protector",
      "Model": "PN2-VA4",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 130–300V",
      "Under-Voltage Setting Range": "AC 80–210V",
      "Over-Voltage Trip Delay": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Max. Working Current": "40A / 63A / 80A (Optional)",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default 60s)",
      "Display Mode": "Dual Digital Display — Voltage (Red) + Current (Green)",
      "Password Protection": "Supported — prevents unauthorized parameter changes",
      "Energy-Saving Mode": "Switchable",
      "OEM Customization": "Logo customization on housing and packaging supported",
      "Housing Material": "Flame-retardant PC (UL94 V-0)",
      "Dimensions": "81 × 36 × 66mm",
      "Installation": "35mm DIN Rail",
      "Ambient Temperature": "-25°C to +55°C",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-condensing)",
      "Mechanical Life": "≥10,000 Cycles",
      "Protection Functions": "Over-voltage, Under-voltage, Over-current, Delay Protection",
      "Application": "Wholesale Distribution Programs, Panel Builder OEM Projects, Private-Label Electrical Brands",
      "Target Buyer": "Electrical Distributors, Panel Builders, OEM Wholesale Customers",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/PN2-VA4-1.jpg",
    images: [
      "/images/products/PN2-VA4-1.jpg",
      "/images/products/PN2-VA4-2.jpg",
      "/images/products/PN2-VA4-3.jpg",
      "/images/products/PN2-VA4-4.jpg",
      "/images/products/PN2-VA4-5.jpg",
      "/images/products/PN2-VA4-6.jpg",
      "/images/products/PN2-VA4-7.jpg",
      "/images/products/PN2-VA4-8.jpg",
    ],
    metaTitle: "PN2-VA4 Voltage Protector OEM 40A–80A Self-Resetting | Soltree",
    metaDescription: "PN2-VA4 self-resetting over/under voltage protector 40A–80A with OEM logo customization. Auto-reconnect, dual display, password lock, CE & RoHS. For distributors and panel builders.",
    metaKeywords: "PN2-VA4 voltage protector, OEM voltage protector supplier, private label voltage relay, wholesale voltage protector 63A, self-resetting voltage relay OEM, over voltage protector factory, branded voltage protector distributor, voltage relay OEM customization",
    imageAlts: [
      "Soltree PN2-VA4 OEM self-resetting over under voltage protector red green dual display front view",
      "PN2-VA4 voltage protector dual screen voltage and current display",
      "PN2-VA4 OEM voltage protector custom logo housing detail",
      "PN2-VA4 voltage protector parameter setting and password lock panel",
      "PN2-VA4 voltage protector DIN rail mounting side profile",
      "PN2-VA4 self-resetting voltage protector installed in distribution board",
      "PN2-VA4 protector wiring terminal connections detail",
      "PN2-VA4 voltage protector 40A 63A 80A current rating options for OEM orders",
    ],
  },
  {
    id: "PN2-VA5",
    name: "PN2-VA5 Self-Resetting Voltage Protector with Digital Display Logo Customization",
    slug: "pn2-va5-self-resetting-voltage-protector-display-logo",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Self-resetting over/under voltage protector with digital display logo customization — your brand name or logo appears directly on the device screen, ideal for OEM electrical brands and premium panel builders. 40A / 63A / 80A options.",
    description:
      "The Soltree PN2-VA5 stands apart from other models in the PN2 series with one distinctive capability: digital display logo customization. Where the PN2-VA4 supports logo printing on the housing and packaging, the PN2-VA5 allows your brand name or logo to appear directly on the device's digital display screen — a premium branding feature that elevates the perceived quality of finished distribution boards and strengthens brand identity for OEM customers, panel builders, and electrical equipment manufacturers.\n\nThe core protection functionality is the same proven platform: continuous monitoring of supply voltage and current, 0.5-second disconnect on fault, and automatic power restoration once the supply stabilizes within safe parameters. The high-resolution dual digital display shows real-time voltage in red and current in green. All trip thresholds — over-voltage (130–300V AC), under-voltage (80–210V AC), and over-current — are user-configurable, with a password lock to prevent unauthorized field adjustments.\n\nReset delay is adjustable from 0 to 999 seconds (default 60s). Available in 40A, 63A, and 80A variants; AC 110V customizable for export markets. Contact us for branding specifications and MOQ details.",
    features: [
      "Digital display logo customization — brand name or logo displayed directly on the device screen",
      "Self-resetting — auto-disconnects on fault, auto-restores when supply stabilizes",
      "Dual digital display — real-time voltage (red) + current (green)",
      "User-configurable trip points — over-voltage 130–300V, under-voltage 80–210V AC",
      "Over-current protection with adjustable trip threshold",
      "Fast 0.5-second disconnect on fault detection",
      "Adjustable reset delay 0–999 seconds (default 60s)",
      "Password lock — prevents unauthorized parameter changes in the field",
      "Energy-saving mode — reduces standby self-consumption",
      "Available in 40A / 63A / 80A current ratings",
      "Rated supply voltage AC 220V (AC 110V customizable for export)",
      "35mm DIN rail mounting",
      "Flame-retardant PC housing (UL94 V-0)",
      "Mechanical life ≥10,000 cycles",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Type": "Self-Resetting Over/Under Voltage Protector",
      "Model": "PN2-VA5",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 130–300V",
      "Under-Voltage Setting Range": "AC 80–210V",
      "Over-Voltage Trip Delay": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Max. Working Current": "40A / 63A / 80A (Optional)",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default 60s)",
      "Display Mode": "Dual Digital Display — Voltage (Red) + Current (Green)",
      "Password Protection": "Supported — prevents unauthorized parameter changes",
      "Energy-Saving Mode": "Switchable",
      "OEM Customization": "Digital display logo customization supported",
      "Housing Material": "Flame-retardant PC (UL94 V-0)",
      "Dimensions": "81 × 36 × 66mm",
      "Installation": "35mm DIN Rail",
      "Ambient Temperature": "-25°C to +55°C",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-condensing)",
      "Mechanical Life": "≥10,000 Cycles",
      "Protection Functions": "Over-voltage, Under-voltage, Over-current, Delay Protection",
      "Application": "Premium OEM Electrical Brands, High-End Panel Manufacturing, Branded Distribution Boards",
      "Target Buyer": "Premium OEM Customers, Electrical Equipment Manufacturers, High-End Panel Builders",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/PN2-VA5-1.jpg",
    images: [
      "/images/products/PN2-VA5-1.jpg",
      "/images/products/PN2-VA5-2.jpg",
      "/images/products/PN2-VA5-3.jpg",
      "/images/products/PN2-VA5-4.jpg",
      "/images/products/PN2-VA5-5.jpg",
      "/images/products/PN2-VA5-6.jpg",
      "/images/products/PN2-VA5-7.jpg",
      "/images/products/PN2-VA5-8.jpg",
    ],
    metaTitle: "PN2-VA5 Voltage Protector Custom Display Logo OEM 40A–80A | Soltree",
    metaDescription: "PN2-VA5 self-resetting voltage protector 40A–80A with digital display logo customization. Your brand on the device screen — ideal for OEM panel builders. Auto-reconnect, CE & RoHS.",
    metaKeywords: "PN2-VA5 voltage protector, digital display logo voltage protector, custom display voltage relay, OEM voltage protector screen branding, branded voltage protector panel builder, self-resetting relay custom logo, voltage protector OEM display customization",
    imageAlts: [
      "Soltree PN2-VA5 self-resetting voltage protector with custom digital display logo front view",
      "PN2-VA5 voltage protector digital display showing custom brand logo",
      "PN2-VA5 voltage protector dual screen voltage red and current green readings",
      "PN2-VA5 voltage protector parameter setting panel",
      "PN2-VA5 protector DIN rail mounting side profile",
      "PN2-VA5 voltage protector installed in finished distribution board",
      "PN2-VA5 protector wiring terminal connections detail",
      "PN2-VA5 voltage protector 40A 63A 80A options for OEM orders",
    ],
  },
  {
    id: "PN2-VAK",
    name: "PN2-VAK Self-Resetting Voltage Protector with kWh Energy Meter 40A–80A",
    slug: "pn2-vak-self-resetting-voltage-protector-kwh-meter",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Self-resetting over/under voltage and over-current protector with built-in kWh energy meter — tri-color display shows voltage (red), current (green), and cumulative energy consumption (blue) simultaneously. 40A / 63A / 80A options.",
    description:
      "The Soltree PN2-VAK is the most feature-complete model in the PN2 series, combining over/under voltage protection, over-current control, and real-time kWh energy metering into a single compact DIN rail device. While the PN2-VA2 through VA5 models focus purely on protection and automatic restoration, the PN2-VAK adds a built-in kWh meter that tracks cumulative electricity consumption — making it suitable for sub-metering in rental properties, individual tenant circuits, light commercial premises, and any installation where both protection and consumption monitoring are required in one unit.\n\nThe tri-color digital display provides simultaneous visibility of three metrics: real-time voltage in red, current in green, and total kWh in blue. Current is not displayed below 1A; kWh is not displayed below 0.01 kWh, keeping the display clean during standby.\n\nProtection parameters are fully configurable: over-voltage from 240V to 300V AC, under-voltage from 140V to 230V AC, and over-current from 1A up to the rated maximum. A 0.5-second disconnect activates on fault, with automatic power restoration after the adjustable reset delay (0–999 seconds, default 60s). Password lock prevents unauthorized changes. Available in 40A, 63A, and 80A variants; AC 110V customizable for export markets.",
    features: [
      "Built-in kWh energy meter — cumulative electricity consumption tracking in one device",
      "Tri-color digital display — voltage (red), current (green), kWh (blue) simultaneously",
      "Self-resetting — auto-disconnects on fault, auto-restores when supply stabilizes",
      "Over-voltage protection — configurable 240–300V AC trip threshold",
      "Under-voltage protection — configurable 140–230V AC trip threshold",
      "Over-current protection — adjustable 1A to rated maximum",
      "Fast 0.5-second disconnect on fault detection",
      "Adjustable reset delay 0–999 seconds (default 60s)",
      "Password lock — prevents unauthorized parameter changes",
      "Energy-saving mode — reduces standby self-consumption",
      "Clean display logic — current hidden below 1A, kWh hidden below 0.01 kWh",
      "Available in 40A / 63A / 80A current ratings",
      "Rated supply voltage AC 220V (AC 110V customizable)",
      "35mm DIN rail mounting",
      "Flame-retardant PC housing (UL94 V-0), mechanical life ≥10,000 cycles",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Type": "Self-Resetting Voltage Protector with kWh Energy Meter",
      "Model": "PN2-VAK",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 240–300V",
      "Under-Voltage Setting Range": "AC 140–230V",
      "Over-Current Setting Range": "1–40A / 1–63A / 1–80A (per rated model)",
      "Max. Working Current": "40A / 63A / 80A (Optional)",
      "Trip Delay (Over-Voltage)": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Display Mode": "Tri-color — Voltage (Red) + Current (Green) + kWh (Blue)",
      "Current Display Note": "Not displayed when current is below 1A",
      "kWh Display Note": "Cumulative; not displayed below 0.01 kWh",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default 60s)",
      "Password Protection": "Supported — prevents unauthorized parameter changes",
      "Energy-Saving Mode": "Switchable",
      "Housing Material": "Flame-retardant PC (UL94 V-0)",
      "Dimensions": "81 × 36 × 66mm",
      "Installation": "35mm DIN Rail",
      "Ambient Temperature": "-25°C to +55°C",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-condensing)",
      "Mechanical Life": "≥10,000 Cycles",
      "Protection Functions": "Over-voltage, Under-voltage, Over-current, Delay Protection, kWh Metering",
      "Application": "Rental Property Sub-metering, Tenant Electricity Billing, Light Commercial Premises",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/PN2-VAK-1.jpg",
    images: [
      "/images/products/PN2-VAK-1.jpg",
      "/images/products/PN2-VAK-2.jpg",
      "/images/products/PN2-VAK-3.jpg",
      "/images/products/PN2-VAK-4.jpg",
      "/images/products/PN2-VAK-5.jpg",
      "/images/products/PN2-VAK-6.jpg",
      "/images/products/PN2-VAK-7.jpg",
      "/images/products/PN2-VAK-8.jpg",
    ],
    metaTitle: "PN2-VAK Voltage Protector with kWh Meter 40A–80A DIN Rail | Soltree",
    metaDescription: "PN2-VAK self-resetting voltage protector with built-in kWh energy meter, 40A–80A. Tri-color display: voltage, current and energy consumption. Auto-reconnect, CE & RoHS.",
    metaKeywords: "PN2-VAK voltage protector kWh meter, voltage protector with energy meter, self-resetting relay kWh display, over voltage protector electricity meter, DIN rail voltage protector kWh, sub-metering voltage protector, voltage current kwh display relay",
    imageAlts: [
      "Soltree PN2-VAK self-resetting voltage protector with kWh energy meter tri-color display front view",
      "PN2-VAK tri-color display showing voltage red current green kWh blue simultaneously",
      "PN2-VAK voltage protector kWh meter cumulative energy consumption reading",
      "PN2-VAK protector parameter setting panel over-voltage under-voltage trip points",
      "PN2-VAK voltage protector DIN rail mounting side profile",
      "PN2-VAK self-resetting voltage protector installed in distribution board",
      "PN2-VAK protector wiring terminal connections detail",
      "PN2-VAK voltage protector 40A 63A 80A current rating options with kWh metering",
    ],
  },
  {
    id: "PN2-VAFD",
    name: "PN2-VAFD 5-in-1 Self-Resetting Voltage Protector with Voltage, Current, Power, Frequency & kWh Meter",
    slug: "pn2-vafd-5-in-1-voltage-protector-power-frequency-kwh-meter",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "5-in-1 self-resetting voltage protector with multi-function meter — simultaneously displays voltage, current, power (W), frequency (Hz), and cumulative kWh on one device. The most comprehensive PN2 series model. 40A / 63A / 80A options.",
    description:
      "The Soltree PN2-VAFD is the most advanced model in the PN2 series — a true 5-in-1 device that combines full over/under voltage and over-current protection with a multi-function power meter in a single DIN rail unit. Where the PN2-VAK displays voltage, current, and kWh, the PN2-VAFD adds real-time power (W) and supply frequency (Hz) to the display, giving installers and end users a complete picture of circuit performance without any additional metering hardware.\n\nThis makes it ideal for light commercial premises, rental properties with sub-metering requirements, home energy monitoring setups, and any installation where a detailed understanding of power quality and consumption is needed alongside automatic fault protection. The multi-color display presents all five metrics simultaneously: voltage, current, active power in watts, supply frequency in hertz, and cumulative energy in kWh. Additional smart features include over-current counting, preset power level alerts, and fast power-off protection.\n\nProtection parameters are fully configurable — over-voltage (240–300V AC), under-voltage (140–230V AC), over-current (1A to rated maximum) — with password lock and adjustable reset delay (0–999s, default 60s). Available in 40A, 63A, and 80A variants; AC 110V customizable for export markets.",
    features: [
      "5-in-1 display — voltage, current, power (W), frequency (Hz), and kWh simultaneously",
      "Self-resetting — auto-disconnects on fault, auto-restores when supply stabilizes",
      "Over-voltage protection — configurable 240–300V AC trip threshold",
      "Under-voltage protection — configurable 140–230V AC trip threshold",
      "Over-current protection — adjustable 1A to rated maximum",
      "Built-in kWh energy meter — cumulative electricity consumption tracking",
      "Real-time power (W) and frequency (Hz) display — no extra metering hardware needed",
      "Over-current counting and preset power level alert functions",
      "Fast 0.5-second disconnect on fault detection",
      "Adjustable reset delay 0–999 seconds (default 60s)",
      "Password lock — prevents unauthorized parameter changes",
      "Energy-saving mode — reduces standby self-consumption",
      "Available in 40A / 63A / 80A current ratings",
      "Rated supply voltage AC 220V (AC 110V customizable)",
      "35mm DIN rail mounting, flame-retardant PC housing (UL94 V-0)",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Type": "5-in-1 Self-Resetting Voltage Protector with Multi-Function Meter",
      "Model": "PN2-VAFD",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 240–300V",
      "Under-Voltage Setting Range": "AC 140–230V",
      "Over-Current Setting Range": "1–40A / 1–63A / 1–80A (per rated model)",
      "Max. Working Current": "40A / 63A / 80A (Optional)",
      "Trip Delay (Over-Voltage)": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Display Mode": "Multi-Color — Voltage + Current + Power (W) + Frequency (Hz) + kWh",
      "Current Display Note": "Not displayed when current is below 1A",
      "kWh Display Note": "Cumulative; not displayed below 0.01 kWh",
      "Additional Functions": "Over-current counting, preset power level, fast power-off protection",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default 60s)",
      "Password Protection": "Supported — prevents unauthorized parameter changes",
      "Energy-Saving Mode": "Switchable",
      "Housing Material": "Flame-retardant PC (UL94 V-0)",
      "Dimensions": "81 × 36 × 66mm",
      "Installation": "35mm DIN Rail",
      "Ambient Temperature": "-25°C to +55°C",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-condensing)",
      "Mechanical Life": "≥10,000 Cycles",
      "Protection & Measurement Functions": "Over-voltage, Under-voltage, Over-current, Delay, kWh, Power (W), Frequency (Hz), Over-current counting, Preset power level",
      "Application": "Home Energy Monitoring, Light Commercial Power Quality Analysis, Solar PV Installations",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/PN2-VAFDM-1.jpg",
    images: [
      "/images/products/PN2-VAFDM-1.jpg",
      "/images/products/PN2-VAFDM-2.jpg",
      "/images/products/PN2-VAFDM-3.jpg",
      "/images/products/PN2-VAFDM-4.jpg",
      "/images/products/PN2-VAFDM-5.jpg",
      "/images/products/PN2-VAFDM-6.jpg",
      "/images/products/PN2-VAFDM-7.jpg",
      "/images/products/PN2-VAFDM-8.jpg",
    ],
    metaTitle: "PN2-VAFD 5-in-1 Voltage Protector Power Frequency kWh Meter 40A–80A | Soltree",
    metaDescription: "PN2-VAFD 5-in-1 self-resetting voltage protector with voltage, current, power, frequency and kWh meter display. 40A–80A, AC 220V, auto-reconnect. CE & RoHS.",
    metaKeywords: "PN2-VAFD voltage protector 5 in 1, voltage protector power meter frequency meter, self-resetting relay watt meter kwh, DIN rail voltage protector multimeter, over voltage protector power frequency display, 5 in 1 voltage current power frequency energy meter relay",
    imageAlts: [
      "Soltree PN2-VAFD 5-in-1 self-resetting voltage protector multi-color display front view",
      "PN2-VAFD display showing voltage current power watts frequency Hz and kWh simultaneously",
      "PN2-VAFD 5-in-1 protector kWh energy meter cumulative consumption reading",
      "PN2-VAFD protector parameter setting panel over-voltage under-voltage trip points",
      "PN2-VAFD voltage protector DIN rail mounting side profile",
      "PN2-VAFD 5-in-1 protector installed in distribution board",
      "PN2-VAFD protector wiring terminal connections detail",
      "PN2-VAFD voltage protector 40A 63A 80A current rating options",
    ],
  },

  {
    id: "STATS-03",
    name: "STATS-03 3-Way ATS Automatic Transfer Switch with Over/Under Voltage Protection & Triple Voltage Display",
    slug: "stats-03-3-way-ats-automatic-transfer-switch-voltage-protector",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "3-way automatic transfer switch (ATS) with priority-based switching (L1→L2→L3) and triple input voltage display — purpose-built for power source redundancy and supply quality monitoring in factories, server rooms, generators, and solar storage systems.",
    description:
      "When uninterrupted power supply depends on multiple sources being healthy and available, the Soltree STATS-03 gives you complete visibility and automatic control. It accepts three independent AC 220V inputs (L1, L2, L3) and continuously monitors the voltage of each source — the triple digital display shows all three input voltages simultaneously, so operators can assess the health of every supply at a glance without additional metering hardware.\n\nThis makes the STATS-03 the right choice for installations where power source quality monitoring is as important as the switching itself: factory production lines feeding sensitive CNC equipment, retail shops with grid plus generator backup, server rooms requiring zero-interruption failover, and solar-plus-grid hybrid systems where source voltage stability needs constant verification.\n\nWhen the active source falls outside the configured voltage window (over-voltage 130–300V AC, under-voltage 80–210V AC) or exceeds the over-current threshold, the STATS-03 transfers to the next available source in under 0.2 seconds. The priority sequence (default L1→L2→L3) is fully customizable, and both startup delay and auto-recovery delay (each 1–600s) are independently adjustable to prevent nuisance switching during momentary fluctuations. Available in 63A, 80A, and 100A ratings on a standard 35mm DIN rail footprint.",
    features: [
      "Triple input voltage display — monitor L1/L2/L3 supply health simultaneously without extra metering",
      "3-way automatic transfer switch — L1→L2→L3 priority switching, fully customizable sequence",
      "Sub-0.2s switching response — seamless source transfer protecting sensitive equipment",
      "Over-voltage protection — configurable 130–300V AC, isolates loads from grid spikes",
      "Under-voltage protection — configurable 80–210V AC, prevents brownout damage",
      "Over-current protection — configurable 1A to rated maximum (63A / 80A / 100A)",
      "Adjustable startup delay 1–600s — prevents nuisance switching on momentary dips",
      "Adjustable auto-recovery delay 1–600s — controlled return to primary source",
      "Ideal for CNC machinery, server rooms, generator-backed retail, solar-grid hybrid systems",
      "35mm DIN rail mounting — direct fit in standard distribution boards",
      "Flame-retardant PC housing (UL94 V-0), mechanical life ≥10,000 cycles",
      "Available in 63A / 80A / 100A current ratings",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Model": "STATS-03",
      "Product Type": "3-Input Automatic Transfer Switch with Triple Voltage Display",
      "Rated Supply Voltage": "AC 3×220V (N-L1/L2/L3)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Protection Range": "AC 130–300V",
      "Under-Voltage Protection Range": "AC 80–210V",
      "Over-Current Protection Range": "1–63A / 1–80A / 1–100A (per rated model)",
      "Rated Working Current": "63A / 80A / 100A (Optional)",
      "Voltage Accuracy": "<1%",
      "Display Mode": "Triple Digital Display — L1 / L2 / L3 Input Voltage only",
      "Priority Switching Sequence": "L1 → L2 → L3 (Customizable)",
      "Startup Delay Time": "1–600s (Adjustable)",
      "Auto-Recovery Delay Time": "1–600s (Adjustable)",
      "Switching Response Time": "<0.2s",
      "Installation": "35mm DIN Rail",
      "Housing Material": "Flame-Retardant PC (UL94 V-0)",
      "Mechanical Life": "≥10,000 Cycles",
      "Operating Temperature": "-25°C to +50°C",
      "Relative Humidity": "≤50% at 40°C (Non-Condensing)",
      "Core Functions": "3-Way Priority Switching, Over/Under Voltage Protection, Over-Current Protection, Triple Input Voltage Monitoring",
      "Application": "CNC Machinery, Server Rooms, Generator-Backed Retail, Solar-Grid Hybrid Systems",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/STATS-03-1.jpg",
    images: [
      "/images/products/STATS-03-1.jpg",
      "/images/products/STATS-03-2.jpg",
      "/images/products/STATS-03-3.jpg",
      "/images/products/STATS-03-4.jpg",
      "/images/products/STATS-03-5.jpg",
      "/images/products/STATS-03-6.jpg",
      "/images/products/STATS-03-7.jpg",
      "/images/products/STATS-03-8.jpg",
    ],
    metaTitle: "STATS-03 3-Way ATS Triple Voltage Display 63A–100A DIN Rail | Soltree",
    metaDescription: "STATS-03 3-way ATS with triple L1/L2/L3 input voltage display — monitor all three supply sources simultaneously. Priority switching, <0.2s response, 63A–100A. For server rooms, CNC, solar-grid systems.",
    metaKeywords: "STATS-03 automatic transfer switch, 3-way ATS triple voltage display, ATS input voltage monitoring 220V, 3 source power transfer switch DIN rail, ATS CNC machinery server room, solar grid ATS switch, priority switching ATS voltage display",
    imageAlts: [
      "Soltree STATS-03 3-way automatic transfer switch triple input voltage display front view",
      "STATS-03 triple display showing L1 L2 L3 source voltages for power quality monitoring",
      "STATS-03 ATS priority switching sequence L1 L2 L3 customization panel",
      "STATS-03 startup delay and auto-recovery delay parameter setting",
      "STATS-03 3-way ATS DIN rail mounting profile showing compact form factor",
      "STATS-03 installed in server room distribution board with three power inputs wired",
      "STATS-03 ATS L1 L2 L3 input terminal wiring diagram",
      "STATS-03 automatic transfer switch 63A 80A 100A model variants",
    ],
  },
  {
    id: "STATS-04",
    name: "STATS-04 3-Way ATS Automatic Transfer Switch with Triple Voltage & Output Current Display",
    slug: "stats-04-3-way-ats-automatic-transfer-switch-voltage-current-display",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "3-way ATS with 4-parameter display showing three input voltages plus real-time output current — adds load current visibility for installations where monitoring actual load draw is as critical as source switching. 63A / 80A / 100A options.",
    description:
      "The Soltree STATS-04 is designed for engineers and facility managers who need to know not just which power source is active, but how much current their load is actually drawing at any given moment. Its 4-parameter display adds real-time output current to the three input voltage readings, eliminating the need for a separate clamp meter or sub-meter to track load behavior during source transfers and normal operation.\n\nThis makes the STATS-04 the preferred choice over the STATS-03 in applications where load current data drives decisions: generator sizing verification, electrical contractor commissioning of new panels, rental property sub-metering with ATS, solar storage systems requiring load-vs-generation balance monitoring, and industrial installations where overcurrent trending helps predict maintenance needs before a trip occurs.\n\nWhen a fault is detected on the active source — voltage outside the 130–300V over-voltage or 80–210V under-voltage window, or current exceeding the configured threshold — the STATS-04 switches to the next available source in under 0.2 seconds. Priority sequence is customizable, and startup and recovery delays (each 1–600s) are independently set. Available in 63A, 80A, and 100A ratings on a 35mm DIN rail.",
    features: [
      "4-parameter display — 3 input voltages (L1/L2/L3) + output current simultaneously",
      "3-way automatic transfer switch — L1→L2→L3 priority switching, customizable sequence",
      "Sub-0.2s switching response — seamless source transfer with minimal downtime",
      "Over-voltage protection — configurable 130–300V AC trip threshold",
      "Under-voltage protection — configurable 80–210V AC trip threshold",
      "Over-current protection — configurable 1A to rated maximum",
      "Adjustable startup delay 1–600s",
      "Adjustable auto-recovery delay 1–600s",
      "Load current monitoring — real-time output current visible without extra metering",
      "35mm DIN rail mounting — fits standard distribution boards",
      "Flame-retardant PC housing (UL94 V-0), mechanical life ≥10,000 cycles",
      "Available in 63A / 80A / 100A current ratings",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Model": "STATS-04",
      "Product Type": "3-Input Automatic Transfer Switch with Current Display",
      "Rated Supply Voltage": "AC 3×220V (N-L1/L2/L3)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Protection Range": "AC 130–300V",
      "Under-Voltage Protection Range": "AC 80–210V",
      "Over-Current Protection Range": "1–63A / 1–80A / 1–100A (per rated model)",
      "Rated Working Current": "63A / 80A / 100A (Optional)",
      "Voltage Accuracy": "<1%",
      "Display Mode": "4-Parameter Display — L1/L2/L3 Input Voltage + Output Current",
      "Priority Switching Sequence": "L1 → L2 → L3 (Customizable)",
      "Startup Delay Time": "1–600s (Adjustable)",
      "Auto-Recovery Delay Time": "1–600s (Adjustable)",
      "Switching Response Time": "<0.2s",
      "Installation": "35mm DIN Rail",
      "Housing Material": "Flame-Retardant PC (UL94 V-0)",
      "Mechanical Life": "≥10,000 Cycles",
      "Operating Temperature": "-25°C to +50°C",
      "Relative Humidity": "≤50% at 40°C (Non-Condensing)",
      "Core Functions": "3-Way Priority Switching, Over/Under Voltage Protection, Over-Current Protection, Triple Voltage + Output Current Monitoring",
      "Application": "Generator Sizing Verification, Electrical Panel Commissioning, Rental Property Sub-metering, Solar Load Monitoring",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/STATS-04-1.jpg",
    images: [
      "/images/products/STATS-04-1.jpg",
      "/images/products/STATS-04-2.jpg",
      "/images/products/STATS-04-3.jpg",
      "/images/products/STATS-04-4.jpg",
      "/images/products/STATS-04-5.jpg",
      "/images/products/STATS-04-6.jpg",
      "/images/products/STATS-04-7.jpg",
      "/images/products/STATS-04-8.jpg",
    ],
    metaTitle: "STATS-04 3-Way ATS with Voltage & Output Current Display 63A–100A | Soltree",
    metaDescription: "STATS-04 3-way automatic transfer switch with 4-parameter display — L1/L2/L3 input voltages plus output current. Over/under voltage protection, <0.2s switching, 63A–100A. CE & RoHS.",
    metaKeywords: "STATS-04 automatic transfer switch, 3-way ATS current display, ATS with output current monitor, automatic transfer switch voltage current display, 3 input ATS 100A DIN rail, ATS load monitoring generator solar, priority switching ATS current meter",
    imageAlts: [
      "Soltree STATS-04 3-way ATS automatic transfer switch 4-parameter display front view",
      "STATS-04 display showing L1 L2 L3 input voltages and output current simultaneously",
      "STATS-04 ATS priority switching sequence and parameter setting panel",
      "STATS-04 over under voltage protection threshold configuration",
      "STATS-04 3-way ATS DIN rail mounting side profile",
      "STATS-04 automatic transfer switch installed in factory distribution board",
      "STATS-04 ATS wiring terminal connections for three 220V inputs and load output",
      "STATS-04 automatic transfer switch 63A 80A 100A current rating options",
    ],
  },
  {
    id: "STATS-05",
    name: "STATS-05 3-Way ATS Automatic Transfer Switch with Full 5-Parameter Display",
    slug: "stats-05-3-way-ats-automatic-transfer-switch-5-parameter-display",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Most advanced 3-way ATS in the STATS series — 5-parameter display shows three input voltages, output voltage, and output current simultaneously. Full source-and-load visibility for mission-critical installations. 63A / 80A / 100A options.",
    description:
      "When partial monitoring isn't enough, the Soltree STATS-05 gives you the complete picture. Where the STATS-03 shows three input voltages and the STATS-04 adds output current, the STATS-05 goes further — its 5-parameter display shows all three input voltages, the actual output voltage delivered to your load, and the real-time output current, all at once.\n\nThis matters in applications where you need to verify not just that your power sources are healthy, but that the correct voltage is actually reaching your equipment after switching. A source may appear within range at the input terminals, yet a wiring fault, contact issue, or cable voltage drop could still deliver the wrong voltage to your load. The STATS-05 eliminates that blind spot.\n\nDesigned for data center infrastructure managers overseeing UPS bypass panels, hospital facility engineers maintaining life-safety power systems, precision manufacturing lines where voltage at the machine matters as much as voltage at the panel, and industrial automation engineers commissioning multi-source control cabinets — the STATS-05 is the right choice where complete electrical visibility is non-negotiable. It carries all the protection and control features of the STATS series: adjustable over-voltage (130–300V) and under-voltage (80–210V) thresholds, configurable over-current protection, sub-0.2s switching response, customizable L1→L2→L3 priority sequence, and 1–600s adjustable startup and auto-recovery delays. CE and RoHS certified, DIN rail mounted, flame-retardant PC housing (UL94 V-0), rated for ≥10,000 mechanical cycles.",
    features: [
      "5-parameter display — L1/L2/L3 input voltages + output voltage + output current, all simultaneously",
      "Output voltage monitoring — verify correct voltage is actually delivered to the load after switching",
      "3-way automatic transfer switch — L1→L2→L3 priority switching, fully customizable sequence",
      "Sub-0.2s switching response — seamless source transfer with minimal load interruption",
      "Over-voltage protection — configurable 130–300V AC trip threshold",
      "Under-voltage protection — configurable 80–210V AC trip threshold",
      "Over-current protection — adjustable 1–63A / 1–80A / 1–100A trip range",
      "Adjustable startup delay (1–600s) and auto-recovery delay (1–600s)",
      "35mm DIN rail mounting — standard panel installation",
      "Flame-retardant PC housing (UL94 V-0), mechanical life ≥10,000 cycles",
      "Available in 63A / 80A / 100A current ratings",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Model": "STATS-05",
      "Product Type": "3-Input Automatic Transfer Switch with Full Monitoring Display",
      "Rated Supply Voltage": "AC 3×220V (N-L1/L2/L3)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Protection Range": "AC 130–300V",
      "Under-Voltage Protection Range": "AC 80–210V",
      "Over-Current Protection Range": "1–63A / 1–80A / 1–100A (Optional)",
      "Rated Working Current": "63A / 80A / 100A (Optional)",
      "Voltage Accuracy": "<1%",
      "Display Mode": "5-Parameter Display (3× Input Voltage + Output Voltage + Output Current)",
      "Priority Switching Sequence": "L1 → L2 → L3 (Customizable)",
      "Startup Delay Time": "1–600s (Adjustable)",
      "Auto-Recovery Delay Time": "1–600s (Adjustable)",
      "Switching Response Time": "<0.2s",
      "Installation": "35mm DIN Rail Mounting",
      "Housing Material": "Flame-Retardant PC Material (UL94 V-0)",
      "Mechanical Life": "≥10,000 Cycles",
      "Operating Temperature": "-25℃ to +50℃",
      "Relative Humidity": "≤50% at 40°C (Non-Condensing)",
      "Core Functions": "3-Way Priority Switching, Over/Under Voltage Protection, Over-Current Protection, Full Input/Output Voltage & Output Current Monitoring",
      "Application": "Data Center UPS Bypass Panels, Hospital Life-Safety Power Systems, Precision Manufacturing Lines, Industrial Automation Multi-Source Cabinets",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/STATS-05-1.jpg",
    images: [
      "/images/products/STATS-05-1.jpg",
      "/images/products/STATS-05-2.jpg",
      "/images/products/STATS-05-3.jpg",
      "/images/products/STATS-05-4.jpg",
      "/images/products/STATS-05-5.jpg",
      "/images/products/STATS-05-6.jpg",
      "/images/products/STATS-05-7.jpg",
      "/images/products/STATS-05-8.jpg",
    ],
    metaTitle: "STATS-05 3-Way ATS 5-Parameter Display Input Output Voltage & Current 63A–100A | Soltree",
    metaDescription: "STATS-05 3-way ATS with 5-parameter display: L1/L2/L3 input voltages + output voltage + output current. Full source-and-load monitoring for data centers, hospitals, precision manufacturing. CE & RoHS.",
    metaKeywords: "STATS-05 automatic transfer switch, 3-way ATS 5 parameter display, ATS input output voltage current monitor, automatic transfer switch output voltage verification, ATS data center hospital, full monitoring ATS DIN rail, 5 display ATS 100A 80A 63A",
    imageAlts: [
      "Soltree STATS-05 3-way ATS automatic transfer switch 5-parameter display front view",
      "STATS-05 display showing L1 L2 L3 input voltages output voltage and output current simultaneously",
      "STATS-05 ATS priority switching sequence and 5-parameter display configuration",
      "STATS-05 over under voltage protection and over-current threshold settings",
      "STATS-05 3-way ATS DIN rail mounting side profile",
      "STATS-05 automatic transfer switch installed in data center distribution panel",
      "STATS-05 ATS wiring connections for three 220V inputs output voltage and current monitoring",
      "STATS-05 automatic transfer switch 63A 80A 100A full monitoring display options",
    ],
  },
  {
    id: "STATS-06",
    name: "STATS-06 3-Phase 4-Wire Over/Under Voltage & Current Protector with Multi-Protection",
    slug: "stats-06-3-phase-4-wire-over-under-voltage-current-protector-multi-protection",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Intelligent 3-phase 4-wire protection relay for AC380V systems — combines over/under voltage, over-current, phase loss, open neutral, phase sequence, and 3-phase unbalance protection in one unit. Color display with real-time L1/L2/L3 voltage and current. 63A / 100A.",
    description:
      "Three-phase systems fail in more ways than single-phase ones, and a single protection function is rarely enough. The Soltree STATS-06 is purpose-built for AC380V 3-phase 4-wire circuits — integrating six protection functions into one DIN rail device: over-voltage, under-voltage, over-current, phase loss, open neutral, phase sequence error, and 3-phase unbalance detection. When any of these faults occur, the STATS-06 trips immediately, disconnecting the load before equipment damage occurs. Once the fault clears, it automatically restores power after the configured recovery delay.\n\nThe high-definition color display shows real-time voltage and current for all three phases simultaneously — current values below 1A are suppressed to keep the display clean and readable. All protection thresholds are field-configurable: over-voltage from 230–300V (default 270V), under-voltage from 120–210V (default 170V), over-current from 1–63A or 1–100A, plus adjustable action time and recovery delay. A built-in 3-phase voltage and current calibration function corrects measurement errors at installation, ensuring accuracy throughout the device's service life.\n\nWidely deployed in photovoltaic energy storage systems where 3-phase unbalance is a common fault mode, industrial distribution panels protecting motor-driven equipment, commercial building power supplies where phase loss could damage HVAC compressors, and any application where a single-function protector leaves too many failure modes uncovered. Available in white or dark gray housing, supports custom LOGO for OEM integration, and backed by a 3-year warranty.",
    features: [
      "6-in-1 protection — over-voltage, under-voltage, over-current, phase loss, open neutral, phase sequence, and 3-phase unbalance",
      "High-definition color display — real-time L1/L2/L3 voltage and current (current hidden below 1A for clean readout)",
      "Fully configurable thresholds — over-voltage 230–300V, under-voltage 120–210V, over-current 1–63A or 1–100A",
      "Adjustable action time (0.1–10s) and recovery delay (1–600s)",
      "3-phase voltage and current calibration — corrects measurement errors at installation",
      "Continuous over-current protection counter — 0–20 trips before lockout (configurable)",
      "Auto-recovery after fault clearance — restores power without manual reset",
      "35mm DIN rail mounting — standard industrial panel installation",
      "Housing available in white or dark gray, supports custom LOGO for OEM",
      "Rated for AC 380V 3-phase 4-wire systems, 63A or 100A",
      "3-year warranty",
      "CE certified",
    ],
    specs: {
      "Product Model": "STATS-06",
      "Product Type": "3-Phase 4-Wire Over/Under Voltage & Over-Current Protector",
      "Rated Voltage": "AC 380V (N-L1/L2/L3)",
      "Rated Frequency": "40 / 50 / 60Hz",
      "Rated Current Options": "63A / 100A",
      "Over-Voltage Protection Range": "AC 230–300V (Default: 270V)",
      "Over-Voltage Recovery Range": "AC 225–295V (Default: 265V)",
      "Under-Voltage Protection Range": "AC 120–210V (Default: 170V)",
      "Under-Voltage Recovery Range": "AC 125–215V (Default: 175V)",
      "Over-Current Protection Range": "1–63A / 1–100A (Default: 63A)",
      "Over-Current Action Time": "0.1s–10s (Default: 0.5s)",
      "Continuous Over-Current Protection Times": "0–20 Times (Default: OFF)",
      "Power-On Delay Time": "1–600s (Default: 5s)",
      "Protection Recovery Delay Time": "1–600s (Default: 30s)",
      "Display Function": "Real-Time 3-Phase Voltage & Current Display (Current Not Displayed Below 1A)",
      "Core Protection Functions": "Over/Under Voltage, Over-Current, Phase Loss, Open Neutral, Phase Sequence, 3-Phase Unbalance",
      "Calibration Function": "3-Phase Voltage & Current Calibration",
      "Installation": "35mm DIN Rail Mounting",
      "Housing Color Options": "White / Dark Gray",
      "Application": "Photovoltaic Energy Storage, Industrial Motor Distribution Panels, Commercial HVAC Power Supply, 3-Phase Equipment Protection",
      "Warranty": "3 Years",
    },
    image: "/images/products/STATS-06-1.jpg",
    images: [
      "/images/products/STATS-06-1.jpg",
      "/images/products/STATS-06-2.jpg",
      "/images/products/STATS-06-3.jpg",
      "/images/products/STATS-06-4.jpg",
      "/images/products/STATS-06-5.jpg",
      "/images/products/STATS-06-6.jpg",
      "/images/products/STATS-06-7.jpg",
      "/images/products/STATS-06-8.jpg",
    ],
    metaTitle: "STATS-06 3-Phase 4-Wire Voltage Current Protector Phase Loss Unbalance 63A 100A | Soltree",
    metaDescription: "STATS-06 intelligent 3-phase 4-wire protector for AC380V — over/under voltage, over-current, phase loss, open neutral, phase sequence, and unbalance protection. Color display, configurable thresholds, DIN rail. 63A / 100A.",
    metaKeywords: "STATS-06 3-phase protector, 3-phase 4-wire over voltage protector AC380V, phase loss protection relay DIN rail, 3-phase unbalance protector, open neutral protection relay, over current phase sequence protector, 3 phase voltage current display protector, photovoltaic 3-phase protection",
    imageAlts: [
      "Soltree STATS-06 3-phase 4-wire over under voltage current protector color display front view",
      "STATS-06 color display showing L1 L2 L3 real-time voltage and current values",
      "STATS-06 3-phase protector threshold configuration for over-voltage under-voltage and over-current",
      "STATS-06 phase loss open neutral phase sequence unbalance protection relay",
      "STATS-06 3-phase protector DIN rail mounting side profile",
      "STATS-06 protector installed in industrial 3-phase distribution panel AC380V",
      "STATS-06 wiring diagram for 3-phase 4-wire L1 L2 L3 neutral connections",
      "STATS-06 3-phase protector white and dark gray housing options with custom LOGO",
    ],
  },
  {
    id: "CZVA1",
    name: "Adjustable Digital Voltage Protector Socket EU/UK/South Africa Plug Over/Under Voltage Protection",
    slug: "czva1-adjustable-digital-voltage-protector-socket-eu-uk-south-africa",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Plug-and-play digital voltage protector socket for home appliances — adjustable over-voltage (230–300V) and under-voltage (140–210V) protection with auto power restore. Available in EU (Schuko), UK, and South Africa plug standards. 2300W / 10A.",
    description:
      "Unstable grid voltage is one of the most common — and least visible — causes of premature appliance failure. When voltage spikes or sags occur, refrigerator compressors, air conditioner units, and televisions absorb the damage silently until they fail. The Soltree CZVA1 voltage protector socket sits between the wall outlet and your appliance, cutting power the instant voltage moves outside your set range and restoring it automatically once the grid stabilizes. No wiring, no electrician — just plug in, set your thresholds, and your appliance is protected.\n\nThe built-in digital LED display shows the live voltage reading at all times, so you always know what your grid is delivering. Over-voltage and under-voltage thresholds are independently adjustable: set over-voltage anywhere from 230V to 300V (factory default 260V) and under-voltage from 140V to 210V (factory default 175V). A ±20V voltage correction function lets you fine-tune the displayed reading against a calibrated reference. Recovery delay is configurable from 5 to 999 seconds — set a longer delay to protect compressor-based appliances like refrigerators and air conditioners from rapid cycling after a voltage event.\n\nAvailable in EU Schuko, UK, and South Africa plug formats to cover export markets and international installations. Rated for up to 2300W (10A), suitable for most household appliances including refrigerators, air conditioners, washing machines, and televisions. Operating temperature range -10℃ to +50℃.",
    features: [
      "Plug-and-play — no installation or wiring required, plugs directly into wall socket",
      "Digital LED display — shows live voltage reading at all times",
      "Adjustable over-voltage protection — 230V–300V, default 260V",
      "Adjustable under-voltage protection — 140V–210V, default 175V",
      "Configurable recovery delay — 5s–999s, prevents rapid cycling for compressor appliances",
      "Voltage correction function — ±20V offset for calibration against reference meter",
      "Automatic power cutoff on fault — instant trip on over or under voltage",
      "Automatic power restore — resumes after set delay once voltage stabilizes",
      "Available in EU (Schuko), UK, and South Africa plug standards",
      "Max load 2300W / 10A — suitable for refrigerators, air conditioners, TVs",
    ],
    specs: {
      "Product Name": "Adjustable Digital Voltage Protector Socket",
      "Compatible Plug Standards": "EU (Schuko) / UK / South Africa",
      "Rated Input Voltage": "AC 140–300V",
      "Rated Frequency": "50Hz / 60Hz",
      "Max Rated Power": "2300W",
      "Max Rated Current": "10(2)A / 16A Max",
      "Over-Voltage Protection Range": "230V–300V (Default: 260V)",
      "Over-Voltage Recovery Offset": "-5V (Default: 255V)",
      "Under-Voltage Protection Range": "140V–210V (Default: 175V)",
      "Under-Voltage Recovery Offset": "+5V (Default: 180V)",
      "Recovery Delay Time": "5s–999s (Default: 10s)",
      "Voltage Correction Range": "-20V ~ +20V (Default: 0V)",
      "Display Type": "Digital LED Display",
      "Control Buttons": "Power / SET / Up / Down",
      "Automatic Power Cutoff": "Yes (On Over/Under Voltage)",
      "Automatic Power Restore": "Yes (After Set Delay)",
      "Plug & Play Installation": "Yes",
      "Application": "Home Appliances, Refrigerators, Air Conditioners, Televisions, Washing Machines",
      "Operating Temperature": "-10℃ ~ +50℃",
    },
    image: "/images/products/CZVA1-1.jpg",
    images: [
      "/images/products/CZVA1-1.jpg",
      "/images/products/CZVA1-2.jpg",
      "/images/products/CZVA1-3.jpg",
      "/images/products/CZVA1-4.jpg",
      "/images/products/CZVA1-5.jpg",
      "/images/products/CZVA1-6.jpg",
      "/images/products/CZVA1-7.jpg",
    ],
    metaTitle: "CZVA1 Adjustable Voltage Protector Socket EU UK South Africa Plug 2300W | Soltree",
    metaDescription: "CZVA1 plug-and-play digital voltage protector socket — adjustable over/under voltage protection, auto power restore, LED display. EU Schuko, UK, South Africa plug. 2300W / 10A for home appliances.",
    metaKeywords: "adjustable voltage protector socket, over under voltage protection plug, EU plug voltage protector, UK plug voltage protector, South Africa plug voltage protector, digital voltage protector socket 2300W, refrigerator air conditioner voltage protector, plug-in voltage guard home appliance",
    imageAlts: [
      "Soltree CZVA1 adjustable digital voltage protector socket EU plug front view with LED display",
      "CZVA1 voltage protector socket digital display showing live voltage reading",
      "CZVA1 over-voltage under-voltage threshold setting buttons and display",
      "CZVA1 voltage protector socket EU Schuko UK South Africa plug variants",
      "CZVA1 plug-in voltage protector connected to refrigerator power outlet",
      "CZVA1 voltage protector socket recovery delay and voltage correction settings",
      "CZVA1 adjustable voltage protector socket protecting air conditioner from unstable power",
    ],
  },
  {
    id: "CZVA2",
    name: "Plug-in Voltage Protector Socket EU/UK/South Africa Universal Over/Under Voltage Cutoff",
    slug: "czva2-plug-in-voltage-protector-socket-eu-uk-south-africa-fixed-cutoff",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Fixed-threshold plug-in voltage protector with 3-LED status indicators — no setup required, plugs in and protects instantly. Cuts off below 165V±5V or above 265V±5V, auto-restores after 30s. EU Schuko, UK, South Africa. 10A / 13A, optional child safety shutter. CE & RoHS.",
    description:
      "Not every voltage protection situation calls for adjustable thresholds and a programming menu. Sometimes you just need reliable, zero-configuration protection that works the moment you plug it in. The Soltree CZVA2 is built for exactly that: a fixed-logic voltage protector socket that automatically disconnects your appliance when voltage drops below 165V±5V or rises above 265V±5V, then restores power after a built-in 30-second delay — no buttons to configure, no thresholds to set.\n\nThree LED indicators give you an immediate at-a-glance status: green for normal operation, a low-voltage warning when the grid sags, and a high-voltage warning when it spikes. This makes the CZVA2 ideal for users who want hands-off protection: rental property tenants protecting a refrigerator, households in regions with occasional voltage fluctuation, offices keeping computer equipment safe, or travelers carrying it as portable appliance protection across EU, UK, and South African socket types. The optional child safety shutter makes it suitable for homes with young children.\n\nAvailable in 10A (2200W) and 13A (2860W) rated current versions to cover a wider range of appliances — the 13A variant handles higher-draw equipment like large air conditioners and washing machines where the 10A version falls short. CE and RoHS certified, white finish, operating temperature -10℃ to +50℃.",
    features: [
      "Zero-configuration — fixed protection logic works immediately on plug-in, no setup required",
      "3-LED status indicators — Normal (green) / Low Voltage / High Voltage for instant fault identification",
      "Fixed over-voltage cutoff at 265V±5V — protects against grid spikes",
      "Fixed under-voltage cutoff at 165V±5V — protects against grid sags",
      "30-second auto-recovery delay — prevents rapid cycling after a voltage event",
      "One-button power control for easy on/off",
      "Optional child safety shutter — safe for homes with young children",
      "Available in 10A (2200W) and 13A (2860W) versions",
      "Available in EU Schuko, UK, and South Africa universal socket configurations",
      "Plug-and-play — no installation or wiring required",
      "CE & RoHS certified",
    ],
    specs: {
      "Product Type": "Plug-in Voltage Protector Socket",
      "Compatible Socket Standards": "EU Schuko / UK / South Africa Universal",
      "Rated Input Voltage": "AC 220–240V",
      "Rated Frequency": "50Hz",
      "Rated Current Options": "10(2)A / 13A",
      "Max Rated Power": "2200W (10A) / 2860W (13A)",
      "Low Voltage Cutoff": "165V ±5V",
      "High Voltage Cutoff": "265V ±5V",
      "Auto Recovery Delay Time": "30 Seconds (Fixed)",
      "Protection Function": "Over-Voltage & Under-Voltage Cutoff",
      "Operating Indicators": "3 LED Indicators (Normal / Low Voltage / High Voltage)",
      "Power Control": "One-Button Power Switch",
      "Child Safety Shutter": "Optional (With / Without)",
      "Socket Type": "Universal 3-Pin Socket",
      "Installation": "Plug-and-Play",
      "Application": "Rental Properties, Home Appliances, Office Equipment, Travel Use, Refrigerators, TVs, Air Conditioners",
      "Operating Temperature": "-10℃ ~ +50℃",
      "Color": "White",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/CZVA2-1.jpg",
    images: [
      "/images/products/CZVA2-1.jpg",
      "/images/products/CZVA2-2.jpg",
      "/images/products/CZVA2-3.jpg",
      "/images/products/CZVA2-4.jpg",
      "/images/products/CZVA2-5.jpg",
      "/images/products/CZVA2-6.jpg",
      "/images/products/CZVA2-7.jpg",
    ],
    metaTitle: "CZVA2 Plug-in Voltage Protector Socket EU UK South Africa 10A 13A Fixed Cutoff | Soltree",
    metaDescription: "CZVA2 plug-in voltage protector with 3-LED status indicators — fixed over-voltage (265V) and under-voltage (165V) cutoff, 30s auto-restore. EU Schuko, UK, South Africa. 10A / 13A, optional child safety shutter. CE & RoHS.",
    metaKeywords: "plug-in voltage protector socket CE RoHS, fixed voltage cutoff protector EU UK, over under voltage socket protector 220V 240V, LED voltage protection indicator socket, voltage protector child safety shutter, 13A voltage protector socket 2860W, South Africa plug voltage guard, zero configuration voltage protector home",
    imageAlts: [
      "Soltree CZVA2 plug-in voltage protector socket EU plug with 3 LED status indicators front view",
      "CZVA2 voltage protector LED indicators showing Normal Low Voltage High Voltage status",
      "CZVA2 plug-in voltage protector EU Schuko UK South Africa plug variants white",
      "CZVA2 voltage protector socket with optional child safety shutter",
      "CZVA2 10A and 13A voltage protector socket options for home appliances",
      "CZVA2 voltage protector connected to refrigerator protecting against grid voltage fluctuation",
      "CZVA2 plug-in voltage protector socket CE RoHS certification label",
    ],
  },
  {
    id: "CZVA3",
    name: "CZVA3 EU Plug 16A Voltage Protector Socket Dual Display Voltage Current with Password Lock",
    slug: "czva3-eu-plug-adjustable-voltage-protector-socket-dual-display",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Advanced EU plug voltage protector socket with dual-color display showing voltage (red) and current (green) simultaneously — plus password lock, over-current protection, and energy-saving mode. Fully adjustable thresholds, 16A / 3680W. Ideal for high-power appliances and shared or commercial environments.",
    description:
      "Protecting an appliance from voltage anomalies is straightforward. Knowing your circuit's live current draw at the same time, locking your protection settings so no one can change them, and cutting power within half a second of a fault — that requires a more capable device. The Soltree CZVA3 is designed for users who need more than basic voltage protection.\n\nIts high-resolution dual-color digital display shows voltage in red and current in green simultaneously, giving you a real-time snapshot of both grid quality and load behavior without switching between screens or menus. Over-voltage and under-voltage trip thresholds are fully adjustable (130–300V and 80–210V respectively), and over-current protection adds a third layer of defense for appliances susceptible to load spikes. The password lock function prevents unauthorized changes to protection settings — critical for shared accommodation, rental properties, or small business environments where multiple people have access to the device.\n\nRated at 16A / 3680W, it handles higher-draw loads that exceed the capacity of standard 10A plug protectors — large washing machines, powerful electric heaters, workshop tools. The wider operating temperature range (-25℃ to +55℃) and multi-frequency support (40/50/60/70Hz) make it suitable for environments beyond the typical household. Flame-retardant UL94 V-0 housing, ≥10,000 mechanical cycle rating, custom LOGO available for OEM orders.",
    features: [
      "Dual-color digital display — voltage in red and current in green, visible simultaneously",
      "Password lock — prevents unauthorized changes to protection settings",
      "Over-current protection — trips within 0.5s on voltage or current fault",
      "Fully adjustable over-voltage threshold: 130–300V",
      "Fully adjustable under-voltage threshold: 80–210V",
      "Adjustable reset delay: 0–999s (default 60s)",
      "Energy-saving mode — reduces standby self-consumption",
      "16A / 3680W rated — handles high-draw appliances beyond 10A protector limits",
      "Multi-frequency support: 40/50/60/70Hz",
      "Wide operating temperature: -25℃ to +55℃",
      "Flame-retardant PC housing (UL94 V-0), ≥10,000 mechanical cycles",
      "Custom LOGO available for OEM orders",
      "EU Schuko plug, AC 220V (110V customizable)",
    ],
    specs: {
      "Product Type": "Plug-in Self-Resetting Over/Under Voltage & Over-Current Protector Socket",
      "Plug/Socket Standard": "EU Schuko",
      "Rated Supply Voltage": "AC 220V (AC 110V Customizable)",
      "Rated Frequency": "40 / 50 / 60 / 70Hz",
      "Over-Voltage Setting Range": "AC 130–300V",
      "Under-Voltage Setting Range": "AC 80–210V",
      "Over-Voltage Trip Delay": "0.5 Seconds",
      "Voltage Accuracy": "<1%",
      "Max Working Current": "16A",
      "Max Rated Power": "3680W",
      "Display Mode": "Dual Digital Display — Voltage (Red) + Current (Green)",
      "Password Protection": "Yes — supports password locking to prevent unauthorized parameter changes",
      "Energy-Saving Mode": "Yes — switchable to reduce self-consumption",
      "Reset Delay Time": "0–999 Seconds (Adjustable, Default: 60s)",
      "Protection Functions": "Over-Voltage, Under-Voltage, Over-Current, Delay Protection",
      "Housing Material": "Flame-Retardant PC (UL94 V-0)",
      "Mechanical Life": "≥10,000 Cycles",
      "Permitted Relative Humidity": "≤50% at 40°C (Non-Condensing)",
      "Ambient Temperature": "-25℃ to +55℃",
      "Application": "Shared Accommodation, Rental Properties, Small Business, High-Power Appliances, Workshop Equipment",
      "Customizable LOGO": "Yes",
    },
    image: "/images/products/CZVA3-1.jpg",
    images: [
      "/images/products/CZVA3-1.jpg",
      "/images/products/CZVA3-2.jpg",
      "/images/products/CZVA3-3.jpg",
      "/images/products/CZVA3-4.jpg",
      "/images/products/CZVA3-5.jpg",
      "/images/products/CZVA3-6.jpg",
    ],
    metaTitle: "CZVA3 EU Plug Voltage Protector Socket Dual Display Password Lock 16A 3680W | Soltree",
    metaDescription: "CZVA3 EU plug voltage protector with dual-color display (voltage + current), password lock, over-current protection and energy-saving mode. Adjustable 130–300V / 80–210V thresholds, 16A / 3680W. Auto-reset, OEM LOGO available.",
    metaKeywords: "EU plug voltage protector dual display, voltage current display protector socket, password lock voltage protector EU, 16A voltage protector socket 3680W, over-current voltage protector EU Schuko, adjustable voltage protector with current display, energy saving voltage protector socket, OEM voltage protector EU plug",
    imageAlts: [
      "Soltree CZVA3 EU plug voltage protector socket dual-color display voltage red current green front view",
      "CZVA3 dual display showing live voltage reading in red and current in green simultaneously",
      "CZVA3 adjustable voltage protector over-voltage under-voltage threshold settings and password lock",
      "CZVA3 EU Schuko plug voltage protector socket 16A 3680W high-power appliance protection",
      "CZVA3 voltage protector energy-saving mode and reset delay configuration panel",
      "CZVA3 EU plug voltage current protector socket flame-retardant UL94 V-0 housing",
    ],
  },

  // Power Meter
  {
    id: "D52-2066",
    name: "D52-2066 6-in-1 AC Power Monitor DIN Rail 110V 220V 380V 100A Voltage Current Power Factor kWh Frequency",
    slug: "d52-2066-6in1-ac-power-monitor-din-rail-voltage-current-kwh-frequency",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "6-in-1 DIN rail AC power monitor — displays voltage, current, active power (W), power factor, energy consumption (kWh), and frequency simultaneously on a color screen. Supports 110V/220V single-phase and 380V three-phase. 100A, ±1% accuracy. CE certified.",
    description:
      "Managing a circuit effectively means knowing more than just the voltage. The Soltree D52-2066 is a 6-in-1 multi-function AC power monitor that gives you a complete real-time view of your circuit's electrical performance — voltage, current, active power in watts, power factor, cumulative energy in kWh, and supply frequency — all displayed simultaneously on a high-resolution color screen, without needing separate instruments for each parameter.\n\nThe D52-2066 supports both single-phase (110V/220V) and three-phase (380V) systems, with two selectable voltage range options: 40–300V for standard single-phase and low-voltage applications, and 250–450V for three-phase and industrial circuits. Current measurement covers 0–100A (0.01A resolution), compatible with both built-in and external current transformers (CT) for flexible installation. Sampling rate is 2 times per second with ±1% ±2-digit accuracy across all parameters.\n\nEnergy consumption data is stored automatically during power outages — no readings are lost when the circuit is interrupted. The SAM CK button resets the kWh counter when needed (hold 5 seconds). Compact 54×80×64mm footprint installs on standard 35mm DIN rail. Suitable for home energy monitoring, industrial circuit analysis, and photovoltaic system performance tracking. CE certified, flame-retardant PC housing, operating temperature -10℃ to +50℃.",
    features: [
      "6-in-1 display — voltage, current, power (W), power factor, kWh, and frequency simultaneously",
      "Color multi-parameter digital display — all values visible at a glance on one screen",
      "Dual voltage range — 40–300V (single-phase) or 250–450V (three-phase 380V), selectable",
      "100A current range with 0.01A resolution",
      "Works with built-in or external current transformers (CT)",
      "±1% ±2-digit accuracy across all measured parameters",
      "2 samples per second — responsive real-time monitoring",
      "Auto-saves energy data during power outage — no kWh data loss",
      "SAM CK button for kWh reset (hold 5 seconds)",
      "35mm DIN rail mounting — compact 54×80×64mm footprint",
      "Suitable for single-phase 110V/220V and three-phase 380V systems",
      "CE certified, flame-retardant PC housing",
    ],
    specs: {
      "Product Model": "D52-2066",
      "Product Type": "6-in-1 DIN Rail AC Multi-Function Power Monitor",
      "Installation Type": "35mm DIN Rail Mount",
      "Supported Systems": "Single-Phase 110V/220V, 3-Phase 380V",
      "Voltage Range Options": "40.0–300.0V / 250.0–450.0V (Selectable)",
      "Current Range": "0–100.0A (Resolution: 0.01A)",
      "Frequency Range": "45.0–65.0Hz",
      "Power Factor Range": "0.00–1.00 PF",
      "Active Power Range": "0–450,000W (0–9999.9W: 0.1W resolution; ≥10,000W: 1W resolution)",
      "Energy Consumption Range": "0–99,999 kWh (Resolution: 0.01 / 0.1 / 1 kWh based on value)",
      "Sampling Speed": "2 Times Per Second",
      "Accuracy": "±1% ±2 Digits",
      "Display Type": "Color Multi-Parameter Digital Display",
      "Reset Function": "SAM CK Button for Energy Reset (Hold 5s)",
      "Data Retention": "Auto-Saves Energy Data During Power Outage",
      "CT Compatibility": "Built-In or External Current Transformers",
      "Application": "Home Energy Monitoring, Industrial Circuit Analysis, Photovoltaic Systems",
      "Operating Temperature": "-10℃ ~ +50℃",
      "Dimensions": "54 × 80 × 64mm",
      "Housing Material": "Flame-Retardant PC",
      "Certification": "CE",
    },
    image: "/images/products/D52-2066-1.jpg",
    images: [
      "/images/products/D52-2066-1.jpg",
      "/images/products/D52-2066-2.jpg",
      "/images/products/D52-2066-3.jpg",
      "/images/products/D52-2066-4.jpg",
      "/images/products/D52-2066-5.jpg",
      "/images/products/D52-2066-6.jpg",
      "/images/products/D52-2066-7.jpg",
    ],
    metaTitle: "D52-2066 6-in-1 DIN Rail AC Power Monitor 110V 220V 380V 100A kWh Meter | Soltree",
    metaDescription: "D52-2066 6-in-1 DIN rail AC power monitor — voltage, current, power, power factor, kWh and frequency on one color display. Supports 110V/220V/380V, 100A, external CT, ±1% accuracy. CE certified.",
    metaKeywords: "D52-2066 power monitor, 6 in 1 AC power meter DIN rail, voltage current power factor kwh frequency meter, din rail energy monitor 380V, multifunction power meter 100A, AC power monitor single phase three phase, kWh meter DIN rail color display, photovoltaic energy meter DIN rail",
    imageAlts: [
      "Soltree D52-2066 6-in-1 DIN rail AC power monitor color display front view",
      "D52-2066 color display showing voltage current power factor kWh and frequency simultaneously",
      "D52-2066 power monitor voltage range selection 40-300V and 250-450V options",
      "D52-2066 DIN rail energy monitor current transformer CT connection wiring",
      "D52-2066 AC power monitor DIN rail mounting 35mm profile",
      "D52-2066 power monitor installed in industrial distribution board",
      "D52-2066 6-in-1 power monitor dimensions 54x80x64mm and CE certification",
    ],
  },
  {
    id: "D52-2066-wifi",
    name: "D52-2066 Tuya WiFi Smart Energy Meter 6-in-1 DIN Rail Monitor with Remote App Control",
    slug: "d52-2066-wifi-tuya-smart-energy-meter-din-rail-remote-app",
    categorySlug: "power-meter",
    additionalCategorySlugs: ["wifi-smart-low-voltage-device"],
    categoryName: "Power Meter",
    shortDescription: "Tuya WiFi smart energy meter with 6-in-1 color display — monitor voltage, current, power, power factor, kWh, and frequency remotely via mobile app. Real-time data plus daily, monthly, and yearly consumption history. DIN rail, 100A, power-failure memory. Ideal for homes, rentals, hotels, and commercial spaces.",
    description:
      "Knowing your electricity consumption in real time — from anywhere, without visiting the panel — is what separates a smart energy meter from a standard one. The Soltree D52-2066 WiFi edition adds Tuya 2.4GHz connectivity to the full 6-in-1 measurement platform, letting you monitor AC voltage, current, active power, power factor, frequency, and kWh consumption live through the Tuya mobile app on your phone or tablet.\n\nBeyond real-time readings, the app gives you detailed consumption history broken down by day, month, and year — making it practical for rental property owners tracking tenant usage, hotel facility managers reviewing floor-by-floor energy spend, and homeowners keeping tabs on monthly electricity costs without waiting for the utility bill. The high-definition color LED screen displays all six parameters simultaneously at the device for on-site readings, and built-in power-failure memory ensures kWh data is preserved through outages.\n\nSupports both built-in and external current transformers (CT) for flexible installation across different panel configurations. Measures up to 100A (0.01A resolution), 40–300V AC, with ±1% ±2-digit accuracy and 2 samples per second. 35mm DIN rail mount, compact 54×80×64mm footprint, 150g. Flame-retardant PC housing.",
    features: [
      "Tuya WiFi (2.4GHz) — remote monitoring via mobile app from anywhere",
      "6-in-1 color display — voltage, current, power (W), power factor, kWh, and frequency",
      "App consumption history — daily, monthly, and yearly energy usage statistics",
      "Power-failure memory — kWh data preserved through outages",
      "Works with built-in or external current transformers (CT)",
      "100A current range, 0.01A resolution",
      "40–300V AC voltage range",
      "±1% ±2-digit accuracy, 2 samples per second",
      "35mm DIN rail mounting — compact 54×80×64mm, 150g",
      "Flame-retardant PC housing",
      "Suitable for homes, rental properties, hotels, offices, commercial buildings",
    ],
    specs: {
      "Product Model": "D52-2066 (WiFi Edition)",
      "Product Type": "Tuya WiFi Smart 6-in-1 DIN Rail Energy Meter",
      "Connection Protocol": "Tuya 2.4GHz WiFi",
      "Supported CT Types": "Built-in / External (Optional)",
      "AC Voltage Range": "40.0–300.0V",
      "AC Current Range": "0–100.0A (Resolution: 0.01A)",
      "Frequency Range": "45.0–65.0Hz",
      "Power Factor Range": "0.00–1.00 PF",
      "Active Power Range": "0–45,000W (0–9999.9W: 0.1W resolution; ≥10,000W: 1W resolution)",
      "Energy Consumption Range": "0–99,999 kWh (0–999.99 kWh: 0.01 kWh; 1,000–9,999.9 kWh: 0.1 kWh; ≥10,000 kWh: 1 kWh)",
      "Sampling Speed": "2 Times Per Second",
      "Accuracy": "±1% ±2 Digits",
      "Display": "High-Definition Color LED Screen",
      "Power Failure Memory": "Yes — preserves energy consumption data",
      "Remote Monitoring": "Tuya App — real-time data, daily/monthly/yearly history",
      "Installation": "35mm DIN Rail Mount",
      "Dimensions": "54 × 80 × 64mm",
      "Weight": "150g",
      "Housing Material": "Flame-Retardant PC",
      "Application": "Homes, Rental Properties, Hotels, Offices, Commercial Buildings",
    },
    image: "/images/products/D52-2066-wifi-1.jpg",
    images: [
      "/images/products/D52-2066-wifi-1.jpg",
      "/images/products/D52-2066-wifi-2.jpg",
      "/images/products/D52-2066-wifi-3.jpg",
      "/images/products/D52-2066-wifi-4.jpg",
      "/images/products/D52-2066-wifi-5.jpg",
      "/images/products/D52-2066-wifi-6.jpg",
      "/images/products/D52-2066-wifi-7.jpg",
      "/images/products/D52-2066-wifi-8.jpg",
    ],
    metaTitle: "D52-2066 WiFi Smart Energy Meter Tuya App 6-in-1 DIN Rail 100A kWh Monitor | Soltree",
    metaDescription: "D52-2066 Tuya WiFi smart energy meter — 6-in-1 color display with remote app monitoring, daily/monthly kWh history, power-failure memory. DIN rail, 100A, 40–300V. For homes, rentals, hotels.",
    metaKeywords: "Tuya WiFi energy meter DIN rail, smart energy monitor app control, remote kWh meter WiFi, WiFi power meter 100A DIN rail, Tuya smart electricity monitor, rental property energy meter WiFi, hotel energy monitoring DIN rail, 6 in 1 WiFi power meter color display",
    imageAlts: [
      "Soltree D52-2066 Tuya WiFi smart energy meter 6-in-1 DIN rail color display front view",
      "D52-2066 WiFi energy meter Tuya app showing real-time voltage current kWh on mobile",
      "D52-2066 smart meter color display showing voltage current power factor kWh frequency",
      "D52-2066 WiFi energy meter daily monthly yearly consumption history in Tuya app",
      "D52-2066 Tuya smart meter DIN rail mounting and CT connection wiring",
      "D52-2066 WiFi energy meter installed in rental property distribution panel",
      "D52-2066 smart energy monitor 54x80x64mm compact DIN rail footprint",
      "D52-2066 WiFi meter power failure memory and remote monitoring features",
    ],
  },
  {
    id: "QY2P",
    name: "QY2P Single-Phase DIN Rail Energy Meter LED/LCD Display 0.5% Accuracy",
    slug: "qy2p-single-phase-din-rail-energy-meter-led-lcd-display",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "Single-phase DIN rail energy meter series with 0.5% high accuracy — available in three models: QY2P-E (LED, 5-parameter full monitoring), QY2P-UID (LCD, streamlined V/I/kWh), and QY2P-UIDY (upgraded color LCD, enhanced readout). Factory calibrated, suitable for residential, commercial, and industrial metering.",
    description:
      "The QY2P series is a range of single-phase DIN rail energy meters built around a shared 0.5% high-accuracy measurement platform, factory calibrated for stable, consistent performance. Three models are available to match different display preferences and monitoring requirements — from full 5-parameter electrical monitoring to streamlined kWh-focused metering.\n\nThe QY2P-E features a multi-color LED display and is the most feature-rich model in the series, measuring real-time voltage, current, active power, power factor, and total energy consumption simultaneously. It is the right choice for users who need a complete view of their circuit's electrical performance — identifying inefficient loads, checking power factor, and tracking energy costs in one device.\n\nThe QY2P-UID uses a high-contrast color LCD screen and focuses on the three core metering parameters: voltage, current, and total energy consumption (kWh). Its streamlined display and cost-effective positioning make it well suited for straightforward energy usage tracking in residential sub-metering, rental properties, and light commercial circuits where power factor monitoring is not required.\n\nThe QY2P-UIDY shares the same V/I/kWh parameter set as the QY2P-UID but features an upgraded color LCD with optimized layout and enhanced readability. It is the premium display option in the series — designed for installations where long-term visibility, clear digit rendering, and panel aesthetics matter. All three models install on standard 35mm DIN rail.",
    features: [
      "0.5% high accuracy across all models — factory calibrated for reliable, consistent measurements",
      "35mm DIN rail mounting — fits standard distribution boards",
      "QY2P-E: Multi-color LED display — Voltage, Current, Active Power, Power Factor, kWh",
      "QY2P-UID: Color LCD display — Voltage, Current, kWh (streamlined, cost-effective)",
      "QY2P-UIDY: Upgraded color LCD display — Voltage, Current, kWh (premium readout)",
      "QY2P-E — ideal for full electrical parameter monitoring and power quality analysis",
      "QY2P-UID — ideal for straightforward energy consumption tracking in residential and rental circuits",
      "QY2P-UIDY — ideal for installations requiring premium display clarity and long-term readability",
      "Single-phase metering for residential, commercial, and light industrial applications",
    ],
    specs: {
      "Product Series": "QY2P",
      "Available Models": "QY2P-E / QY2P-UID / QY2P-UIDY",
      "Installation Type": "35mm DIN Rail Mount",
      "Phase": "Single-Phase",
      "Accuracy": "0.5% (High Precision, Factory Calibrated)",
      "QY2P-E Display": "Multi-Color LED Display",
      "QY2P-E Parameters": "Voltage, Current, Active Power, Power Factor, Energy (kWh)",
      "QY2P-UID Display": "Advanced Color LCD Display",
      "QY2P-UID Parameters": "Voltage, Current, Energy (kWh)",
      "QY2P-UIDY Display": "Upgraded Color LCD Display (Enhanced Readout)",
      "QY2P-UIDY Parameters": "Voltage, Current, Energy (kWh)",
      "Application": "Residential Sub-metering, Rental Properties, Commercial Circuits, Light Industrial Metering",
    },
    image: "/images/products/QY2P-1.jpg",
    images: [
      "/images/products/QY2P-1.jpg",
      "/images/products/QY2P-2.jpg",
      "/images/products/QY2P-3.jpg",
      "/images/products/QY2P-4.jpg",
      "/images/products/QY2P-5.jpg",
      "/images/products/QY2P-6.jpg",
      "/images/products/QY2P-7.jpg",
      "/images/products/QY2P-8.jpg",
    ],
    metaTitle: "QY2P Single-Phase DIN Rail Energy Meter LED LCD 0.5% Accuracy | Soltree",
    metaDescription: "QY2P single-phase DIN rail energy meter — 0.5% accuracy, three display options: LED (V/I/W/PF/kWh), LCD basic (V/I/kWh), LCD premium. For residential, rental, and commercial sub-metering.",
    metaKeywords: "QY2P single phase energy meter DIN rail, single phase kWh meter din rail 0.5% accuracy, LED energy meter DIN rail, LCD energy meter single phase, sub-metering energy meter DIN rail, residential energy monitor DIN rail, voltage current kwh meter single phase, QY2P-E QY2P-UID QY2P-UIDY",
    imageAlts: [
      "Soltree QY2P single-phase DIN rail energy meter series LED LCD display front view",
      "QY2P-E multi-color LED energy meter showing voltage current power factor kWh readings",
      "QY2P-UID advanced color LCD energy meter displaying voltage current and kWh",
      "QY2P-UIDY upgraded color LCD energy meter with enhanced readout layout",
      "QY2P series energy meter 35mm DIN rail mounting profile",
      "QY2P DIN rail energy meter installed in residential distribution board",
      "QY2P energy meter 0.5% accuracy factory calibrated single-phase metering",
      "QY2P-E QY2P-UID QY2P-UIDY three model variants comparison",
    ],
  },


  {
    id: "DDS",
    name: "DDS Single-Phase DIN Rail Energy Meter DDS662 DDS667 DDS668 Series 110V 230V",
    slug: "dds-single-phase-din-rail-energy-meter-dds662-dds667-dds668",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "DDS662/DDS667/DDS668 series single-phase DIN rail energy meters — 110V/230V, 50/60Hz, 5(80)A. Three models covering basic kWh metering through full multi-parameter monitoring (kWh, V, I, W, PF, Hz). Backlit LCD options, pulse output, suitable for residential, rental billing, and global power distribution systems.",
    description:
      "The DDS series covers three models of compact single-phase DIN rail energy meters designed for accurate, reliable metering across residential, rental, commercial, and light industrial installations. All models are rated 5(80)A and compatible with both 110V/230V 50/60Hz power systems, making them suitable for domestic and export markets worldwide.\n\nThe DDS662 is the foundation model — a straightforward, wide-input energy meter with a clear LCD display showing kWh, voltage, current, and power. It supports both 110V and 230V at 50/60Hz and includes a pulse output at 1600 imp/kWh for external data logging and sub-metering systems. Long service life and high reliability make it a proven choice for residential sub-metering and light commercial energy monitoring.\n\nThe DDS667 adds a backlit LCD for clear reading in low-light conditions such as enclosed distribution cabinets and basement meter rooms. An operation button enables manual data switching and reset, giving users direct control over the displayed parameter and consumption records. Available in 110V/60Hz and 230V/50Hz versions to cover North American and international grid standards.\n\nThe DDS668 is the most capable model in the series, displaying the full parameter set: kWh, voltage, current, active power, power factor, and frequency. The backlit LCD supports both manual and automatic scrolling display modes, and a reset function allows flexible usage monitoring for rental billing, tenant sub-metering, and energy management applications. Certified for international power distribution systems.",
    features: [
      "Available in three models: DDS662 (basic), DDS667 (backlit + button), DDS668 (full multi-parameter)",
      "Compatible with 110V/230V 50/60Hz — suitable for global power systems",
      "Rated current: 5(80)A — handles typical residential and light commercial loads",
      "35mm DIN rail mounting — standard distribution board installation",
      "DDS662: Wide-input LCD meter, kWh/V/I/W display, pulse output 1600 imp/kWh",
      "DDS667: Backlit LCD, manual data switching and reset button, 110V/60Hz or 230V/50Hz",
      "DDS668: Full parameter display — kWh, voltage, current, power, power factor, frequency",
      "DDS668: Manual and automatic scrolling display modes",
      "High accuracy, stable long-term performance",
      "Compact size, easy installation in distribution boxes",
      "Ideal for rental billing, tenant sub-metering, and energy management",
      "Meets international safety and performance standards",
    ],
    specs: {
      "Product Series": "DDS",
      "Available Models": "DDS662 / DDS667 / DDS668",
      "Installation Type": "35mm DIN Rail Mount",
      "Phase": "Single-Phase",
      "Rated Current": "5(80)A",
      "Rated Voltage": "110V / 230V (50/60Hz)",
      "DDS662 Display": "LCD — kWh, Voltage, Current, Power",
      "DDS662 Special Feature": "Pulse Output: 1600 imp/kWh",
      "DDS667 Display": "Backlit LCD — kWh, Voltage, Current, Power",
      "DDS667 Special Feature": "Operation Button for Data Switching and Reset",
      "DDS667 Versions": "110V/60Hz or 230V/50Hz",
      "DDS668 Display": "Backlit LCD — kWh, Voltage, Current, Power, Power Factor, Frequency",
      "DDS668 Special Feature": "Manual / Automatic Scrolling Display, Reset Function",
      "Application": "Residential Sub-metering, Rental Billing, Tenant Electricity Monitoring, Light Industrial",
      "Compliance": "Meets International Safety and Performance Standards",
    },
    image: "/images/products/DDS-1.jpg",
    images: [
      "/images/products/DDS-1.jpg",
      "/images/products/DDS-2.jpg",
      "/images/products/DDS-3.jpg",
      "/images/products/DDS-4.jpg",
      "/images/products/DDS-5.jpg",
      "/images/products/DDS-6.jpg",
      "/images/products/DDS-7.jpg",
    ],
    metaTitle: "DDS662 DDS667 DDS668 Single-Phase DIN Rail Energy Meter 110V 230V 5(80)A | Soltree",
    metaDescription: "DDS series single-phase DIN rail energy meters — DDS662 (pulse output), DDS667 (backlit LCD, button reset), DDS668 (full V/I/W/PF/Hz display). 110V/230V, 5(80)A, rental billing and sub-metering.",
    metaKeywords: "DDS662 energy meter DIN rail, DDS667 backlit LCD energy meter, DDS668 multi-parameter energy meter, single phase DIN rail meter 110V 230V, rental billing energy meter, sub-metering DIN rail kWh meter, DDS series electric meter 5 80A, energy meter pulse output 1600 imp kWh",
    imageAlts: [
      "Soltree DDS series single-phase DIN rail energy meter DDS662 DDS667 DDS668 front view",
      "DDS662 LCD energy meter showing kWh voltage current power readings",
      "DDS667 backlit LCD energy meter with operation button for data switching",
      "DDS668 multi-parameter energy meter displaying kWh voltage current power factor frequency",
      "DDS series energy meter 35mm DIN rail mounting profile",
      "DDS single-phase energy meter installed in residential distribution board for rental billing",
      "DDS662 DDS667 DDS668 three model variants 110V 230V 50 60Hz comparison",
    ],
  },
  {
    id: "ADD",
    name: "ADD 18mm 1P Single-Phase DIN Rail Energy Meter 5(60)A 230V Class 1",
    slug: "add-18mm-single-phase-din-rail-energy-meter-5-60a-230v",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "Ultra-narrow 18mm single-phase DIN rail energy meter, 5(60)A, 230V, Class 1 accuracy. Three display options: analog roller, digital LCD, and backlit LCD with reset button. CE certified, flame-retardant nylon housing. Ideal for residential, rental, and small commercial metering.",
    description:
      "When panel space is limited, every millimeter counts. The Soltree ADD series energy meter fits into a single 18mm DIN rail slot — the same width as a standard 1P circuit breaker — making it the practical choice for dense distribution boards in apartments, rental properties, and small commercial premises where multiple meters need to fit in a compact enclosure. All models are rated 5(60)A, 230V (170–250V), Class 1 accuracy, 50/60Hz, and carry CE certification with flame-retardant high-insulation nylon housing.\n\nThe Analog Display model uses a mechanical roller counter for kWh readings — no power required for the counting mechanism, ensuring stable, long-lasting performance even in circuits with frequent outages. A pulse constant of 800 imp/kWh makes it compatible with external data logging systems. The mechanical display is highly readable and maintenance-free, favored for long-term installations where simplicity and reliability are priorities.\n\nThe Digital LCD Display model upgrades to a clear digital screen for precise kWh readings with a higher-resolution 1600 imp/kWh pulse constant. Top and bottom wiring support gives installers flexibility during panel layout. The compact digital format is well suited for residential sub-metering and rental billing where accurate numeric readings matter.\n\nThe Digital Backlight LCD model adds a blue backlit display for easy reading in low-light conditions such as enclosed meter cabinets and basement distribution rooms. A red reset button allows flexible monitoring cycles for tenant turnover and billing resets. The 1600 imp/kWh pulse constant matches the digital LCD model. High-visibility readout makes it the preferred option where quick at-a-glance checks are routine.",
    features: [
      "Ultra-narrow 18mm width — fits 1P DIN rail slot, ideal for dense panel layouts",
      "Class 1 accuracy, CE certified — reliable metering for residential and commercial billing",
      "Flame-retardant high-insulation nylon housing",
      "Rated 5(60)A, 230V (170–250V), 50/60Hz",
      "Analog Display: mechanical roller counter, no power needed, 800 imp/kWh pulse",
      "Digital LCD Display: clear digital kWh readout, 1600 imp/kWh, top/bottom wiring support",
      "Backlight LCD Display: blue backlit screen, red reset button, 1600 imp/kWh",
      "35mm DIN rail mounting — standard installation",
      "Suitable for residential, rental property, and small commercial metering",
    ],
    specs: {
      "Product Series": "ADD",
      "Available Models": "Analog Display / Digital LCD / Digital Backlight LCD",
      "Rated Voltage": "AC 230V (170–250V)",
      "Rated Current": "5(60)A",
      "Accuracy Class": "Class 1",
      "Frequency": "50/60Hz",
      "Width": "18mm (1P DIN Rail Module)",
      "Installation": "35mm DIN Rail Mount",
      "Housing Material": "Flame-Retardant High-Insulation Nylon",
      "Analog Display Pulse Constant": "800 imp/kWh",
      "Digital LCD Pulse Constant": "1600 imp/kWh",
      "Backlight LCD Pulse Constant": "1600 imp/kWh",
      "Backlight LCD Special Feature": "Blue Backlit Screen, Red Reset Button",
      "Application": "Residential Sub-metering, Rental Property Billing, Small Commercial Premises",
      "Certification": "CE",
    },
    image: "/images/products/ADD-1.jpg",
    images: [
      "/images/products/ADD-1.jpg",
      "/images/products/ADD-2.jpg",
      "/images/products/ADD-3.jpg",
      "/images/products/ADD-4.jpg",
      "/images/products/ADD-5.jpg",
      "/images/products/ADD-6.jpg",
      "/images/products/ADD-7.jpg",
    ],
    metaTitle: "ADD 18mm Single-Phase DIN Rail Energy Meter 5(60)A 230V Class 1 CE | Soltree",
    metaDescription: "ADD 18mm ultra-narrow single-phase DIN rail energy meter, 5(60)A, 230V, Class 1. Analog roller, digital LCD, or backlit LCD with reset button. CE certified, for residential and rental metering.",
    metaKeywords: "18mm DIN rail energy meter, single phase energy meter 18mm narrow, ADD energy meter 5 60A 230V, Class 1 kWh meter DIN rail, analog roller energy meter DIN rail, backlit LCD energy meter reset button, compact energy meter rental property, 1P DIN rail kWh meter CE",
    imageAlts: [
      "Soltree ADD 18mm single-phase DIN rail energy meter three display variants front view",
      "ADD analog display energy meter mechanical roller counter kWh reading",
      "ADD digital LCD energy meter precise kWh readout 1600 imp/kWh",
      "ADD backlit LCD energy meter blue backlight red reset button",
      "ADD 18mm energy meter 1P DIN rail slot width comparison",
      "ADD energy meter installed in compact residential distribution board",
      "ADD single-phase energy meter CE certification flame-retardant nylon housing",
    ],
  },
  {
    id: "DDR",
    name: "DDR Series 18mm DIN Rail AC Digital Multi-Function Meter Voltage Current Frequency",
    slug: "ddr-series-18mm-din-rail-ac-digital-multi-function-meter",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "DDR series ultra-slim 18mm DIN rail AC digital meter — 5 model configurations covering voltage, current, frequency, and 3-channel current monitoring. Bright red LED display, 80–500V, 0–100A, CE compliant. Ideal for real-time parameter monitoring in distribution cabinets, workshops, and commercial panels.",
    description:
      "Not every metering application requires energy consumption tracking. When the task is real-time monitoring of AC voltage, current, or frequency in a distribution cabinet — without the complexity of a full energy meter — the DDR series delivers exactly that in an ultra-slim 18mm DIN rail footprint. Five functional models let you specify precisely what the panel needs to display, from a 3-in-1 V+A+Hz combined meter to dedicated single-parameter instruments for voltage, current, or frequency.\n\nThe bright red LED display is the defining feature of the DDR series — high-visibility digital readouts that remain easy to read in dim enclosures, industrial environments, and workshops where ambient light is limited. At 18mm wide and 81×66mm in profile, each unit occupies a single 1P DIN rail slot, making the DDR practical in crowded distribution boards where space is at a premium.\n\nThe wide measurement range covers AC 80–500V voltage, 0–100A current, and 50/60Hz frequency — spanning single-phase and three-phase system monitoring. Measurement accuracy is ≤2% with a 1-sample-per-second refresh rate for stable real-time readings. The 3-channel current model is particularly useful for three-phase load balancing checks without a dedicated power analyzer. Rated insulation voltage 660V, IP20 protection, operating temperature range -50℃ to +55℃. Flame-retardant nylon housing, CE compliant. Note: not suitable for variable frequency drives, inverters, or high-harmonic environments.",
    features: [
      "5 functional model configurations — V+A+Hz combined, 3-channel current, V+A, single voltage, single current, single frequency",
      "Bright red LED display — high visibility in dim enclosures and industrial environments",
      "Ultra-slim 18mm width — fits 1P DIN rail slot, saves space in crowded distribution boards",
      "Wide voltage range: AC 80–500V (covers single-phase and three-phase systems)",
      "Current range: 0–100A",
      "Frequency range: 50/60Hz",
      "≤2% measurement accuracy, 1 sample/second refresh rate",
      "Rated insulation voltage 660V, power consumption ≤2VA",
      "IP20 protection, operating temperature -50℃ to +55℃",
      "Flame-retardant nylon housing, CE compliant",
      "Not suitable for VFDs, inverters, or high-harmonic environments",
    ],
    specs: {
      "Product Series": "DDR",
      "Available Models": "V+A+Hz (3-in-1) / 3-Channel Current / V+A / Single Voltage / Single Current / Single Frequency",
      "Rated Voltage": "AC 80V–500V",
      "Rated Current": "AC 0–100A (ammeter models)",
      "Frequency Range": "AC 50–60Hz",
      "Accuracy": "≤2% Error",
      "Sampling Rate": "1 Time/Second",
      "Display Type": "Red LED Digital Display",
      "Rated Insulation Voltage": "660V",
      "Power Consumption": "≤2VA",
      "Width": "18mm (1P DIN Rail Module)",
      "Dimensions": "18 × 81 × 66mm",
      "Installation": "35mm DIN Rail Mount",
      "Protection Degree": "IP20",
      "Operating Temperature": "-50℃ ~ +55℃",
      "Humidity": "1–80% (No Condensation)",
      "Housing Material": "Flame-Retardant Nylon",
      "Application": "Distribution Cabinets, Workshops, Commercial Panels, Three-Phase Load Monitoring",
      "Certification": "CE",
    },
    image: "/images/products/DDR-1.jpg",
    images: [
      "/images/products/DDR-1.jpg",
      "/images/products/DDR-2.jpg",
      "/images/products/DDR-3.jpg",
      "/images/products/DDR-4.jpg",
      "/images/products/DDR-5.jpg",
      "/images/products/DDR-6.jpg",
    ],
    metaTitle: "DDR Series 18mm DIN Rail AC Voltage Current Frequency Meter Red LED CE | Soltree",
    metaDescription: "DDR series 18mm DIN rail AC digital meter — 5 configurations: V+A+Hz, 3-channel current, V+A, single parameter. Red LED display, 80–500V, 0–100A, 50/60Hz, ≤2% accuracy. CE compliant.",
    metaKeywords: "DDR DIN rail AC meter voltage current frequency, 18mm din rail panel meter red LED, AC voltage current meter DIN rail 500V, 3 channel current meter DIN rail, din rail frequency meter 50 60Hz, compact panel meter 18mm distribution cabinet, AC multi-function meter workshop industrial, single phase three phase panel meter LED",
    imageAlts: [
      "Soltree DDR series 18mm DIN rail AC digital meter red LED display front view",
      "DDR V+A+Hz 3-in-1 combined meter showing voltage current and frequency simultaneously",
      "DDR 3-channel current meter for three-phase load monitoring in distribution cabinet",
      "DDR single voltage meter red LED display 80-500V AC range",
      "DDR 18mm ultra-slim DIN rail meter installed in crowded distribution board",
      "DDR series meter flame-retardant nylon housing IP20 CE certification",
    ],
  },
  {
    id: "SOLT",
    name: "SOLT Tuya WiFi Smart DIN Rail Circuit Breaker with Energy Monitoring and Voltage Protection",
    slug: "solt-tuya-wifi-smart-din-rail-circuit-breaker-energy-monitoring",
    categorySlug: "wifi-smart-low-voltage-device",
    categoryName: "Wifi Smart Low Voltage Device",
    shortDescription: "Tuya/Smart Life WiFi smart DIN rail circuit breaker — three models: SOLT-OF (remote on/off), SOLT-M (energy monitoring), SOLT-MV (full protection + metering). App control, Alexa & Google Assistant compatible. AC 90–300V, 1A–63A, ≥100,000 operations.",
    description:
      "The Soltree SOLT series brings remote control, energy monitoring, and electrical protection together in a single DIN rail circuit breaker that works with the Tuya and Smart Life app ecosystem. All three models connect to standard 2.4GHz WiFi and are compatible with Amazon Alexa and Google Assistant for voice control — making them a practical upgrade for smart home installations, rental property management, and commercial power automation without replacing existing distribution hardware.\n\nThe SOLT-OF is the entry-level remote control model, adding WiFi on/off switching, timer scheduling, and relay last-status memory to any circuit. With over 100,000 rated mechanical operations, it is built for long-term, high-cycle applications such as lighting circuits, pump controls, and non-critical load automation where simple remote access is the primary requirement.\n\nThe SOLT-M adds real-time energy monitoring to the remote control foundation — tracking voltage, current, active power, and cumulative kWh consumption through the app. Historical usage data and smart scheduling make it well suited for home energy management, solar system load control, and rental property sub-metering where understanding consumption patterns is as important as remote switching.\n\nThe SOLT-MV is the most capable model, combining all SOLT-M metering functions with 4-in-1 electrical protection: over-voltage, under-voltage, over-current, and over-power, each with user-configurable trip thresholds set directly in the app. The auto-trip function protects sensitive electronics and high-power appliances from grid anomalies. Important notes: wiring must use L+N (top entry), not L+L. Not compatible with Home Assistant. 2.4GHz WiFi only; 5GHz not supported.",
    features: [
      "SOLT-OF: Remote on/off, timer scheduling, relay last-status memory — basic smart control",
      "SOLT-M: All SOLT-OF functions + real-time voltage, current, power, and kWh monitoring",
      "SOLT-MV: All SOLT-M functions + over-voltage, under-voltage, over-current, over-power protection",
      "SOLT-MV: User-configurable protection thresholds via app — tailored safety for each installation",
      "Tuya / Smart Life app — remote control, scheduling, and energy data logging from anywhere",
      "Amazon Alexa and Google Assistant voice control",
      "2.4GHz WiFi connectivity — easy pairing with standard home networks",
      "35mm DIN rail mounting — installs in standard distribution boxes",
      "AC 90–300V, 1A–63A, 50/60Hz",
      "≥100,000 mechanical operations — long service life",
      "IP20 protection, flame-retardant housing",
      "Wiring: L+N top entry only (not L+L). Not compatible with Home Assistant.",
    ],
    specs: {
      "Product Series": "SOLT",
      "Available Models": "SOLT-OF (Remote Control) / SOLT-M (Metering) / SOLT-MV (Protection + Metering)",
      "Rated Voltage": "AC 90–300V, 50/60Hz",
      "Rated Current": "1A–63A",
      "Wireless Standard": "WiFi 2.4GHz (5GHz Not Supported)",
      "Compatible Apps": "Smart Life / Tuya",
      "Voice Control": "Amazon Alexa, Google Assistant",
      "SOLT-OF Functions": "Remote On/Off, Timer Scheduling, Last-Status Memory",
      "SOLT-M Functions": "Remote Control + Voltage, Current, Power, kWh Monitoring",
      "SOLT-MV Functions": "Full Metering + Over/Under Voltage, Over-Current, Over-Power Protection",
      "SOLT-MV Protection Thresholds": "User-Configurable via App",
      "Installation": "35mm DIN Rail Mount",
      "Mechanical Life": "≥100,000 Operations",
      "Protection Degree": "IP20",
      "Application": "Smart Home Automation, Rental Property Management, Solar Load Control, Appliance Protection",
      "Important Note": "L+N wiring only (top entry). Not compatible with Home Assistant. 2.4GHz WiFi only.",
    },
    image: "/images/products/SOLT-1.jpg",
    images: [
      "/images/products/SOLT-1.jpg",
      "/images/products/SOLT-2.jpg",
      "/images/products/SOLT-3.jpg",
      "/images/products/SOLT-4.jpg",
      "/images/products/SOLT-5.jpg",
      "/images/products/SOLT-6.jpg",
      "/images/products/SOLT-7.jpg",
      "/images/products/SOLT-8.jpg",
    ],
    metaTitle: "SOLT Tuya WiFi Smart DIN Rail Breaker Energy Monitor Over Voltage Protection 63A | Soltree",
    metaDescription: "SOLT Tuya WiFi smart DIN rail circuit breaker — SOLT-OF (remote control), SOLT-M (energy metering), SOLT-MV (over/under voltage + over-current protection). Alexa & Google Assistant, 90–300V, 63A.",
    metaKeywords: "Tuya WiFi smart circuit breaker DIN rail, smart DIN rail switch energy monitoring, WiFi breaker over voltage protection, smart life din rail switch 63A, remote control circuit breaker app, SOLT-MV over under voltage breaker, smart home DIN rail breaker Alexa, solar load control WiFi switch",
    imageAlts: [
      "Soltree SOLT Tuya WiFi smart DIN rail circuit breaker three model variants front view",
      "SOLT-OF WiFi DIN rail switch remote on/off timer scheduling Smart Life app",
      "SOLT-M WiFi energy monitoring breaker showing voltage current power kWh in Tuya app",
      "SOLT-MV full protection breaker over-voltage under-voltage over-current over-power settings",
      "SOLT smart DIN rail breaker 35mm installation in distribution box",
      "SOLT WiFi breaker Amazon Alexa Google Assistant voice control setup",
      "SOLT-MV user-configurable protection thresholds in Smart Life app",
      "SOLT series Tuya WiFi smart breaker L+N wiring diagram top entry",
    ],
  },
  {
    id: "SRP",
    name: "SRP Tuya WiFi Smart Reclosing Leakage Protector 63A 10-in-1 with TFT Display and Energy Metering",
    slug: "srp-tuya-wifi-smart-reclosing-leakage-protector-63a-energy-metering",
    categorySlug: "wifi-smart-low-voltage-device",
    categoryName: "Wifi Smart Low Voltage Device",
    shortDescription: "10-in-1 Tuya WiFi smart reclosing leakage protector — leakage protection, over/under voltage, over-current, overload, plus real-time voltage, current, power, kWh, frequency, and power factor. 1.46\" TFT color display, auto-reclose, 63A, 1,000,000 mechanical life. Alexa & Google Assistant.",
    description:
      "Standard smart breakers handle switching and basic monitoring. The Soltree SRP goes further — it adds leakage (RCD) protection and auto-reclosing to the full smart circuit breaker feature set, making it the right choice for circuits where earth fault safety is a requirement alongside remote control and energy monitoring. Ten functions are integrated into one compact DIN rail unit: leakage protection, over-voltage, under-voltage, over-current, overload, and delay protection, plus real-time tracking of voltage, current, active power, cumulative kWh, frequency, and power factor.\n\nThe 1.46\" TFT color display is a key differentiator — a high-definition wide-angle color screen mounted on the device itself shows all key electrical parameters at a glance without opening the app, useful during installation, commissioning, and routine panel inspections in low-light conditions. The auto-reclosing function allows the device to automatically attempt power restoration after a fault trip — configurable for circuits where brief outages are acceptable and manual reset call-outs should be minimized.\n\nWiFi connectivity runs on Tuya/Smart Life for remote on/off, timer scheduling, and energy data access from anywhere. Amazon Alexa and Google Assistant voice control is supported. Rated 0.1A–63A adjustable, AC 80–300V (110V/220V) 50/60Hz. Mechanical life of 1,000,000 operations and electrical life of 100,000 operations — significantly higher than standard smart breakers. IP20, operating temperature -10℃ to +60℃, indoor AC use only. Requires 2.4GHz WiFi; 5GHz not supported.",
    features: [
      "Leakage (RCD) protection — earth fault safety for kitchens, bathrooms, and wet-area circuits",
      "Auto-reclosing — automatically attempts power restoration after fault trip (configurable)",
      "10-in-1: leakage, over/under voltage, over-current, overload, delay protection + V/I/W/kWh/Hz/PF monitoring",
      "1.46\" TFT color display — full parameter readout on-device without opening the app",
      "Tuya / Smart Life app — remote on/off, scheduling, energy data from anywhere",
      "Amazon Alexa and Google Assistant voice control",
      "Adjustable rated current: 0.1A–63A",
      "AC 80–300V (110V/220V), 50/60Hz",
      "Mechanical life: 1,000,000 operations — 10× higher than standard smart breakers",
      "Electrical life: 100,000 operations",
      "35mm DIN rail mounting, IP20, -10℃ to +60℃",
      "2.4GHz WiFi only. Indoor AC use only. L+N wiring, power from top.",
    ],
    specs: {
      "Product Model": "SRP",
      "Product Type": "Tuya WiFi Smart Reclosing Leakage Protector with Energy Metering",
      "Operating Voltage": "AC 80–300V (110V/220V)",
      "Rated Current": "0.1A–63A (Adjustable)",
      "Frequency": "50/60Hz",
      "Display": "1.46\" TFT Color Screen",
      "Protection Functions": "Leakage, Over-Voltage, Under-Voltage, Over-Current, Overload, Delay",
      "Monitoring Parameters": "Voltage, Current, Power (W), Energy (kWh), Frequency, Power Factor",
      "Auto-Reclosing": "Yes (Configurable)",
      "Control Methods": "WiFi App, Voice Control, Local Button",
      "Compatible Apps": "Smart Life / Tuya",
      "Voice Control": "Amazon Alexa, Google Assistant",
      "WiFi Standard": "2.4GHz Only (5GHz Not Supported)",
      "Installation": "35mm DIN Rail Mount",
      "Mechanical Life": "1,000,000 Operations",
      "Electrical Life": "100,000 Operations",
      "Protection Level": "IP20",
      "Operating Temperature": "-10℃ ~ +60℃",
      "Application": "Homes, Offices, Warehouses, Wet-Area Circuits, Small Industrial Environments",
      "Important Note": "Indoor AC use only. L+N wiring, power from top. 2.4GHz WiFi only.",
    },
    image: "/images/products/SRP-1.jpg",
    images: [
      "/images/products/SRP-1.jpg",
      "/images/products/SRP-2.jpg",
      "/images/products/SRP-3.jpg",
      "/images/products/SRP-4.jpg",
      "/images/products/SRP-5.jpg",
      "/images/products/SRP-6.jpg",
    ],
    metaTitle: "SRP Tuya WiFi Smart Reclosing Leakage Protector 63A TFT Display Energy Meter | Soltree",
    metaDescription: "SRP Tuya WiFi smart reclosing leakage protector — 10-in-1: RCD leakage, over/under voltage, over-current, V/I/W/kWh/Hz/PF monitoring. 1.46\" TFT display, auto-reclose, 63A, 1M mechanical life.",
    metaKeywords: "Tuya WiFi leakage protector smart, WiFi RCD smart breaker DIN rail, smart reclosing leakage circuit breaker, auto reclose WiFi breaker 63A, leakage protection energy monitoring smart breaker, 10 in 1 smart circuit breaker TFT display, WiFi earth fault protector DIN rail, smart RCBO Tuya app Alexa",
    imageAlts: [
      "Soltree SRP Tuya WiFi smart reclosing leakage protector 1.46 inch TFT color display front view",
      "SRP smart leakage protector TFT display showing voltage current power factor kWh frequency",
      "SRP WiFi leakage protector auto-reclose function and protection threshold settings in Tuya app",
      "SRP 10-in-1 smart breaker leakage over-voltage under-voltage over-current overload protection",
      "SRP smart reclosing leakage protector DIN rail installation in distribution box",
      "SRP Tuya Smart Life app remote control energy monitoring and scheduling interface",
    ],
  },
  {
    id: "SRP-L",
    name: "SRP-L Tuya WiFi Smart Reclosing Leakage Protector 63A with Prominent Physical Button and Energy Metering",
    slug: "srp-l-tuya-wifi-smart-reclosing-leakage-protector-63a-physical-button",
    categorySlug: "wifi-smart-low-voltage-device",
    categoryName: "Wifi Smart Low Voltage Device",
    shortDescription: "10-in-1 Tuya WiFi smart reclosing leakage protector with prominent raised physical button — designed for fast, reliable local manual operation without requiring app access. Leakage protection, over/under voltage, over-current, overload, full energy metering. 1.46\" TFT display, 63A, auto-reclose.",
    description:
      "The Soltree SRP-L delivers the same 10-in-1 smart protection and energy metering platform as the SRP series, with one key design difference: a prominent raised physical button built for fast, direct local operation. In workshops, industrial panels, rental property meter rooms, and outdoor distribution cabinets where reaching for a phone is inconvenient — or where a quick manual trip and reset needs to happen immediately — the raised button provides tactile, one-press control that can be operated with work gloves on or in low-visibility conditions.\n\nThis makes the SRP-L the preferred choice in environments where local hands-on access is part of the daily workflow, rather than installations where all control happens remotely through the app. The WiFi remote control, Tuya/Smart Life app integration, and Alexa/Google Assistant voice commands are all present — the SRP-L simply adds a more physically accessible local override for situations where the app is not the fastest path to control.\n\nAll protection and monitoring functions are identical: leakage (RCD) protection, over-voltage, under-voltage, over-current, overload, and delay protection, plus real-time tracking of voltage, current, active power, kWh, frequency, and power factor on the 1.46\" TFT color display. Auto-reclosing is configurable. Rated 0.1A–63A adjustable, AC 80–300V (110V/220V) 50/60Hz. Mechanical life 1,000,000 operations. Indoor AC use only, L+N wiring top entry, 2.4GHz WiFi only.",
    features: [
      "Prominent raised physical button — fast local manual operation without app, works with gloves",
      "Leakage (RCD) protection — earth fault safety for wet-area and industrial circuits",
      "Auto-reclosing — automatically attempts power restoration after fault trip (configurable)",
      "10-in-1: leakage, over/under voltage, over-current, overload, delay + V/I/W/kWh/Hz/PF monitoring",
      "1.46\" TFT color display — full parameter readout on-device",
      "Tuya / Smart Life app — remote on/off, scheduling, energy data from anywhere",
      "Amazon Alexa and Google Assistant voice control",
      "Adjustable rated current: 0.1A–63A",
      "AC 80–300V (110V/220V), 50/60Hz",
      "Mechanical life: 1,000,000 operations",
      "35mm DIN rail mounting, IP20, -10℃ to +60℃",
      "2.4GHz WiFi only. Indoor AC use only. L+N wiring, power from top.",
    ],
    specs: {
      "Product Model": "SRP-L",
      "Product Type": "Tuya WiFi Smart Reclosing Leakage Protector with Prominent Physical Button",
      "Physical Button": "Prominent Raised Button — Direct Local Manual Operation",
      "Operating Voltage": "AC 80–300V (110V/220V)",
      "Rated Current": "0.1A–63A (Adjustable)",
      "Frequency": "50/60Hz",
      "Display": "1.46\" TFT Color Screen",
      "Protection Functions": "Leakage, Over-Voltage, Under-Voltage, Over-Current, Overload, Delay",
      "Monitoring Parameters": "Voltage, Current, Power (W), Energy (kWh), Frequency, Power Factor",
      "Auto-Reclosing": "Yes (Configurable)",
      "Control Methods": "Raised Physical Button, WiFi App, Voice Control",
      "Compatible Apps": "Smart Life / Tuya",
      "Voice Control": "Amazon Alexa, Google Assistant",
      "WiFi Standard": "2.4GHz Only (5GHz Not Supported)",
      "Installation": "35mm DIN Rail Mount",
      "Mechanical Life": "1,000,000 Operations",
      "Electrical Life": "100,000 Operations",
      "Protection Level": "IP20",
      "Operating Temperature": "-10℃ ~ +60℃",
      "Application": "Workshops, Industrial Panels, Outdoor Cabinets, Rental Property Meter Rooms",
      "Important Note": "Indoor AC use only. L+N wiring, power from top. 2.4GHz WiFi only.",
    },
    image: "/images/products/SRP-L-1.jpg",
    images: [
      "/images/products/SRP-L-1.jpg",
      "/images/products/SRP-L-2.jpg",
      "/images/products/SRP-L-3.jpg",
      "/images/products/SRP-L-4.jpg",
      "/images/products/SRP-L-5.jpg",
      "/images/products/SRP-L-6.jpg",
    ],
    metaTitle: "SRP-L Tuya WiFi Leakage Protector 63A Raised Physical Button TFT Display | Soltree",
    metaDescription: "SRP-L Tuya WiFi smart reclosing leakage protector with prominent raised physical button — 10-in-1 protection and metering, glove-friendly local control, 63A, 1.46\" TFT display, auto-reclose.",
    metaKeywords: "SRP-L WiFi leakage protector physical button, smart RCD breaker raised button DIN rail, leakage protector manual local control, WiFi smart breaker glove operation industrial, Tuya leakage protector workshop panel, smart reclosing RCBO physical button, DIN rail RCD WiFi 63A local control, leakage protector outdoor cabinet manual reset",
    imageAlts: [
      "Soltree SRP-L Tuya WiFi smart leakage protector with prominent raised physical button front view",
      "SRP-L raised physical button for direct local manual operation without app",
      "SRP-L TFT color display showing voltage current power factor kWh frequency",
      "SRP-L smart leakage protector auto-reclose and 10-in-1 protection settings in Tuya app",
      "SRP-L WiFi leakage protector DIN rail installation in workshop distribution panel",
      "SRP-L Tuya Smart Life app energy monitoring and remote control interface",
    ],
  },

  {
    id: "HT-8Way-2in1out-600VDC",
    name: "PV Combiner Box 2 String Input 1 Output, 600V DC 63A Breaker, 15A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-1out-600vdc-63a-15a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string PV combiner box with 63A DC breaker, 4×15A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HT-8Way-2in1out-600VDC is a 2-string PV combiner box engineered to aggregate and protect solar array outputs before they reach the inverter. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 4×15A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems – residential rooftops, commercial arrays and small utility sites alike.",
    features: [
      "2-string PV input, 1 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "4 × 15A PV fuses for independent per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HT-8Way-2in1out-600VDC",
      "PV String Inputs": "2",
      "Outputs": "1",
      "Max System Voltage": "600V DC",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "15A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HT-8Way-2in1out-600VDC-1.jpg",
    images: [
      "/images/products/HT-8Way-2in1out-600VDC-1.jpg",
      "/images/products/HT-8Way-2in1out-600VDC-2.jpg",
      "/images/products/HT-8Way-2in1out-600VDC-3.jpg",
      "/images/products/HT-8Way-2in1out-600VDC-4.jpg",
      "/images/products/HT-8Way-2in1out-600VDC-5.jpg",
      "/images/products/HT-8Way-2in1out-600VDC-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-1-out 600VDC 63A | 15A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string PV combiner box with 63A DC breaker, 4×15A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string combiner box, 600VDC combiner box, solar combiner box with SPD, 63A DC breaker, 15A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HT-8Way-2in1out-600VDC 2-string PV combiner box front view",
      "HT-8Way-2in1out-600VDC combiner box interior with 63A DC breaker and fuses",
      "HT-8Way-2in1out-600VDC wiring layout with 15A PV fuses",
      "HT-8Way-2in1out-600VDC 500V 40kA surge protection device detail",
      "HT-8Way-2in1out-600VDC IP65 flame-retardant plastic enclosure",
      "HT-8Way-2in1out-600VDC outdoor installation on PV system",
    ],
  },
  {
    id: "HT-8Way-1in1out-600VDC",
    name: "PV Combiner Box 1 String Input 1 Output, 600V DC 63A Breaker, 15A Fuse & 40kA SPD",
    slug: "pv-combiner-box-1in-1out-600vdc-63a-15a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "1-string PV combiner box with 63A DC breaker, 2×15A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HT-8Way-1in1out-600VDC is a compact 1-string PV combiner box designed to protect and consolidate a single solar string before it reaches the inverter. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 2×15A PV fuses for independent per-pole protection, and a 500V DC surge protection device rated at 40kA max discharge current to shield the system from lightning-induced transients. The hard, flame-retardant plastic housing is rated IP65 – fully sealed against dust and water – making it ideal for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "1-string PV input, 1 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "2 × 15A PV fuses for independent per-pole protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HT-8Way-1in1out-600VDC",
      "PV String Inputs": "1",
      "Outputs": "1",
      "Max System Voltage": "600V DC",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "15A (2 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HT-8Way-1in1out-600VDC-1.jpg",
    images: [
      "/images/products/HT-8Way-1in1out-600VDC-1.jpg",
      "/images/products/HT-8Way-1in1out-600VDC-2.jpg",
      "/images/products/HT-8Way-1in1out-600VDC-3.jpg",
      "/images/products/HT-8Way-1in1out-600VDC-4.jpg",
      "/images/products/HT-8Way-1in1out-600VDC-5.jpg",
      "/images/products/HT-8Way-1in1out-600VDC-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 1-in-1-out 600VDC 63A | 15A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "1-string PV combiner box with 63A DC breaker, 2×15A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 1 string combiner box, 600VDC combiner box, solar combiner box with SPD, 63A DC breaker, 15A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HT-8Way-1in1out-600VDC 1-string PV combiner box front view",
      "HT-8Way-1in1out-600VDC combiner box interior with 63A DC breaker and fuses",
      "HT-8Way-1in1out-600VDC wiring layout with 15A PV fuses",
      "HT-8Way-1in1out-600VDC 500V 40kA surge protection device detail",
      "HT-8Way-1in1out-600VDC IP65 flame-retardant plastic enclosure",
      "HT-8Way-1in1out-600VDC outdoor installation on PV system",
    ],
  },
  {
    id: "HA-8Way-2in1out-500VDC-32A-15AFUSE",
    name: "PV Combiner Box 2 String Input 1 Output, 500V DC 32A Breaker, 15A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-1out-500vdc-32a-15a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string PV combiner box with 32A DC breaker, 4×15A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-8Way-2in1out-500VDC-32A-15AFUSE is a 2-string PV combiner box designed to aggregate and protect solar array outputs before they reach the inverter. It integrates a 32A DC circuit breaker for overload and short-circuit protection, 4×15A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems – residential rooftops, commercial arrays and small utility sites alike.",
    features: [
      "2-string PV input, 1 output configuration",
      "32A DC circuit breaker for overload and short-circuit protection",
      "4 × 15A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-8Way-2in1out-500VDC-32A-15AFUSE",
      "PV String Inputs": "2",
      "Outputs": "1",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "32A",
      "PV Fuse Rating": "15A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-1.jpg",
    images: [
      "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-1.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-2.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-3.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-4.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-5.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-32A-15AFUSE-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-1-out 500VDC 32A | 15A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string PV combiner box with 32A DC breaker, 4×15A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string combiner box, 500VDC combiner box, solar combiner box with SPD, 32A DC breaker, 15A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-8Way-2in1out-500VDC-32A-15AFUSE 2-string PV combiner box front view",
      "HA-8Way-2in1out-500VDC-32A-15AFUSE combiner box interior with 32A DC breaker and fuses",
      "HA-8Way-2in1out-500VDC-32A-15AFUSE wiring layout with 15A PV fuses",
      "HA-8Way-2in1out-500VDC-32A-15AFUSE 500V 40kA surge protection device detail",
      "HA-8Way-2in1out-500VDC-32A-15AFUSE IP65 flame-retardant plastic enclosure",
      "HA-8Way-2in1out-500VDC-32A-15AFUSE outdoor installation on PV system",
    ],
  },
  {
    id: "HA-8Way-2in1out-500VDC-40A-20AFUSE",
    name: "PV Combiner Box 2 String Input 1 Output, 500V DC 40A Breaker, 20A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-1out-500vdc-40a-20a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string PV combiner box with 40A DC breaker, 4×20A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-8Way-2in1out-500VDC-40A-20AFUSE is a 2-string PV combiner box designed to aggregate and protect solar array outputs before they reach the inverter. It integrates a 40A DC circuit breaker for overload and short-circuit protection, 4×20A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems – residential rooftops, commercial arrays and small utility sites alike.",
    features: [
      "2-string PV input, 1 output configuration",
      "40A DC circuit breaker for overload and short-circuit protection",
      "4 × 20A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-8Way-2in1out-500VDC-40A-20AFUSE",
      "PV String Inputs": "2",
      "Outputs": "1",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "40A",
      "PV Fuse Rating": "20A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-1.jpg",
    images: [
      "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-1.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-2.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-3.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-4.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-5.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-40A-20AFUSE-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-1-out 500VDC 40A | 20A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string PV combiner box with 40A DC breaker, 4×20A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string combiner box, 500VDC combiner box, solar combiner box with SPD, 40A DC breaker, 20A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-8Way-2in1out-500VDC-40A-20AFUSE 2-string PV combiner box front view",
      "HA-8Way-2in1out-500VDC-40A-20AFUSE combiner box interior with 40A DC breaker and fuses",
      "HA-8Way-2in1out-500VDC-40A-20AFUSE wiring layout with 20A PV fuses",
      "HA-8Way-2in1out-500VDC-40A-20AFUSE 500V 40kA surge protection device detail",
      "HA-8Way-2in1out-500VDC-40A-20AFUSE IP65 flame-retardant plastic enclosure",
      "HA-8Way-2in1out-500VDC-40A-20AFUSE outdoor installation on PV system",
    ],
  },
  {
    id: "HA-8Way-2in1out-500VDC-63A-30AFUSE",
    name: "PV Combiner Box 2 String Input 1 Output, 500V DC 63A Breaker, 30A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-1out-500vdc-63a-30a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string PV combiner box with 63A DC breaker, 4×30A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-8Way-2in1out-500VDC-63A-30AFUSE is a 2-string PV combiner box designed to aggregate and protect solar array outputs before they reach the inverter. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 4×30A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems – residential rooftops, commercial arrays and small utility sites alike.",
    features: [
      "2-string PV input, 1 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "4 × 30A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-8Way-2in1out-500VDC-63A-30AFUSE",
      "PV String Inputs": "2",
      "Outputs": "1",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "30A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-1.jpg",
    images: [
      "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-1.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-2.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-3.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-4.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-5.jpg",
      "/images/products/HA-8Way-2in1out-500VDC-63A-30AFUSE-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-1-out 500VDC 63A | 30A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string PV combiner box with 63A DC breaker, 4×30A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string combiner box, 500VDC combiner box, solar combiner box with SPD, 63A DC breaker, 30A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-8Way-2in1out-500VDC-63A-30AFUSE 2-string PV combiner box front view",
      "HA-8Way-2in1out-500VDC-63A-30AFUSE combiner box interior with 63A DC breaker and fuses",
      "HA-8Way-2in1out-500VDC-63A-30AFUSE wiring layout with 30A PV fuses",
      "HA-8Way-2in1out-500VDC-63A-30AFUSE 500V 40kA surge protection device detail",
      "HA-8Way-2in1out-500VDC-63A-30AFUSE IP65 flame-retardant plastic enclosure",
      "HA-8Way-2in1out-500VDC-63A-30AFUSE outdoor installation on PV system",
    ],
  },
  {
    id: "HA-12Way-2in2out-500VDC-32A-15AFUSE",
    name: "PV Combiner Box 2 String Input 2 Output, 500V DC 32A Breaker, 15A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-2out-500vdc-32a-15a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string, 2-output PV combiner box with 32A DC breaker, 4×15A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-12Way-2in2out-500VDC-32A-15AFUSE is a 2-string input, 2-output PV combiner box that allows a single combiner to feed two independent inverter channels. It integrates a 32A DC circuit breaker for overload and short-circuit protection, 4×15A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "2-string PV input, 2 output configuration",
      "32A DC circuit breaker for overload and short-circuit protection",
      "4 × 15A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-12Way-2in2out-500VDC-32A-15AFUSE",
      "PV String Inputs": "2",
      "Outputs": "2",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "32A",
      "PV Fuse Rating": "15A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-1.jpg",
    images: [
      "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-1.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-2.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-3.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-4.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-5.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-32A-15AFUSE-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-2-out 500VDC 32A | 15A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string, 2-output PV combiner box with 32A DC breaker, 4×15A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string 2 output combiner box, 500VDC combiner box, solar combiner box with SPD, 32A DC breaker, 15A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-12Way-2in2out-500VDC-32A-15AFUSE 2-in-2-out PV combiner box front view",
      "HA-12Way-2in2out-500VDC-32A-15AFUSE combiner box interior with 32A DC breaker and fuses",
      "HA-12Way-2in2out-500VDC-32A-15AFUSE wiring layout with 15A PV fuses",
      "HA-12Way-2in2out-500VDC-32A-15AFUSE 500V 40kA surge protection device detail",
      "HA-12Way-2in2out-500VDC-32A-15AFUSE IP65 flame-retardant plastic enclosure",
      "HA-12Way-2in2out-500VDC-32A-15AFUSE outdoor installation on PV system",
    ],
  },
  {
    id: "HA-12Way-2in2out-500VDC-40A-20AFUSE",
    name: "PV Combiner Box 2 String Input 2 Output, 500V DC 40A Breaker, 20A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-2out-500vdc-40a-20a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string, 2-output PV combiner box with 40A DC breaker, 4×20A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-12Way-2in2out-500VDC-40A-20AFUSE is a 2-string input, 2-output PV combiner box that allows a single combiner to feed two independent inverter channels. It integrates a 40A DC circuit breaker for overload and short-circuit protection, 4×20A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "2-string PV input, 2 output configuration",
      "40A DC circuit breaker for overload and short-circuit protection",
      "4 × 20A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-12Way-2in2out-500VDC-40A-20AFUSE",
      "PV String Inputs": "2",
      "Outputs": "2",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "40A",
      "PV Fuse Rating": "20A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-1.jpg",
    images: [
      "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-1.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-2.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-3.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-4.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-5.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-40A-20AFUSE-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-2-out 500VDC 40A | 20A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string, 2-output PV combiner box with 40A DC breaker, 4×20A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string 2 output combiner box, 500VDC combiner box, solar combiner box with SPD, 40A DC breaker, 20A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-12Way-2in2out-500VDC-40A-20AFUSE 2-in-2-out PV combiner box front view",
      "HA-12Way-2in2out-500VDC-40A-20AFUSE combiner box interior with 40A DC breaker and fuses",
      "HA-12Way-2in2out-500VDC-40A-20AFUSE wiring layout with 20A PV fuses",
      "HA-12Way-2in2out-500VDC-40A-20AFUSE 500V 40kA surge protection device detail",
      "HA-12Way-2in2out-500VDC-40A-20AFUSE IP65 flame-retardant plastic enclosure",
      "HA-12Way-2in2out-500VDC-40A-20AFUSE outdoor installation on PV system",
    ],
  },
  {
    id: "HA-12Way-2in2out-500VDC-63A-30AFUSE",
    name: "PV Combiner Box 2 String Input 2 Output, 500V DC 63A Breaker, 30A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-2out-500vdc-63a-30a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string, 2-output PV combiner box with 63A DC breaker, 4×30A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-12Way-2in2out-500VDC-63A-30AFUSE is a 2-string input, 2-output PV combiner box that allows a single combiner to feed two independent inverter channels. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 4×30A PV fuses for independent per-pole string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "2-string PV input, 2 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "4 × 30A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-12Way-2in2out-500VDC-63A-30AFUSE",
      "PV String Inputs": "2",
      "Outputs": "2",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "30A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-1.jpg",
    images: [
      "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-1.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-2.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-3.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-4.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-5.jpg",
      "/images/products/HA-12Way-2in2out-500VDC-63A-30AFUSE-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-2-out 500VDC 63A | 30A Fuse & 40kA SPD | Soltree",
    metaDescription:
      "2-string, 2-output PV combiner box with 63A DC breaker, 4×30A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 2 string 2 output combiner box, 500VDC combiner box, solar combiner box with SPD, 63A DC breaker, 30A PV fuse, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-12Way-2in2out-500VDC-63A-30AFUSE 2-in-2-out PV combiner box front view",
      "HA-12Way-2in2out-500VDC-63A-30AFUSE combiner box interior with 63A DC breaker and fuses",
      "HA-12Way-2in2out-500VDC-63A-30AFUSE wiring layout with 30A PV fuses",
      "HA-12Way-2in2out-500VDC-63A-30AFUSE 500V 40kA surge protection device detail",
      "HA-12Way-2in2out-500VDC-63A-30AFUSE IP65 flame-retardant plastic enclosure",
      "HA-12Way-2in2out-500VDC-63A-30AFUSE outdoor installation on PV system",
    ],
  },
  {
    id: "HA-4Way-500VDC-32A",
    name: "PV Combiner Box 1 String Input 1 Output, 500V DC 32A Breaker & 40kA SPD",
    slug: "pv-combiner-box-1in-1out-500vdc-32a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "Compact 1-string PV combiner box with 32A DC breaker and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-4Way-500VDC-32A is a compact 1-string PV combiner box designed to protect a single solar string before it reaches the inverter. It integrates a 32A DC circuit breaker for overload and short-circuit protection and a 500V DC surge protection device rated at 40kA max discharge current to shield the system from lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "1-string PV input, 1 output configuration",
      "32A DC circuit breaker for overload and short-circuit protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-4Way-500VDC-32A",
      "PV String Inputs": "1",
      "Outputs": "1",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "32A",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-4Way-500VDC-32A-1.jpg",
    images: [
      "/images/products/HA-4Way-500VDC-32A-1.jpg",
      "/images/products/HA-4Way-500VDC-32A-2.jpg",
      "/images/products/HA-4Way-500VDC-32A-3.jpg",
      "/images/products/HA-4Way-500VDC-32A-4.jpg",
      "/images/products/HA-4Way-500VDC-32A-5.jpg",
      "/images/products/HA-4Way-500VDC-32A-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 1-in-1-out 500VDC 32A | 40kA SPD | Soltree",
    metaDescription:
      "Compact 1-string PV combiner box with 32A DC breaker, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 1 string combiner box, 500VDC combiner box, solar combiner box with SPD, 32A DC breaker, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-4Way-500VDC-32A 1-string PV combiner box front view",
      "HA-4Way-500VDC-32A combiner box interior with 32A DC breaker",
      "HA-4Way-500VDC-32A wiring layout",
      "HA-4Way-500VDC-32A 500V 40kA surge protection device detail",
      "HA-4Way-500VDC-32A IP65 flame-retardant plastic enclosure",
      "HA-4Way-500VDC-32A outdoor installation on PV system",
    ],
  },
  {
    id: "HA-4Way-500VDC-40A",
    name: "PV Combiner Box 1 String Input 1 Output, 500V DC 40A Breaker & 40kA SPD",
    slug: "pv-combiner-box-1in-1out-500vdc-40a",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "Compact 1-string PV combiner box with 40A DC breaker and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-4Way-500VDC-40A is a compact 1-string PV combiner box designed to protect a single solar string before it reaches the inverter. It integrates a 40A DC circuit breaker for overload and short-circuit protection and a 500V DC surge protection device rated at 40kA max discharge current to shield the system from lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "1-string PV input, 1 output configuration",
      "40A DC circuit breaker for overload and short-circuit protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-4Way-500VDC-40A",
      "PV String Inputs": "1",
      "Outputs": "1",
      "Max System Voltage": "500V DC",
      "DC Circuit Breaker": "40A",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-4Way-500VDC-40A-1.jpg",
    images: [
      "/images/products/HA-4Way-500VDC-40A-1.jpg",
      "/images/products/HA-4Way-500VDC-40A-2.jpg",
      "/images/products/HA-4Way-500VDC-40A-3.jpg",
      "/images/products/HA-4Way-500VDC-40A-4.jpg",
      "/images/products/HA-4Way-500VDC-40A-5.jpg",
      "/images/products/HA-4Way-500VDC-40A-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 1-in-1-out 500VDC 40A | No Fuse, 40kA SPD | Soltree",
    metaDescription:
      "Compact 1-string PV combiner box with 40A DC breaker and 500V/40kA SPD in an IP65 flame-retardant enclosure. No fuse version – for on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 1 string combiner box, 500VDC combiner box, solar combiner box with SPD, 40A DC breaker, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-4Way-500VDC-40A 1-string PV combiner box front view",
      "HA-4Way-500VDC-40A combiner box interior with 40A DC breaker",
      "HA-4Way-500VDC-40A wiring layout",
      "HA-4Way-500VDC-40A 500V 40kA surge protection device detail",
      "HA-4Way-500VDC-40A IP65 flame-retardant plastic enclosure",
      "HA-4Way-500VDC-40A outdoor installation on PV system",
    ],
  },
  {
    id: "HA-8Way-1in1out-1000VDC-DS",
    name: "PV Combiner Box 1 String Input 1 Output, 1000V DC, 32A Isolator Switch, 15A Fuse & 40kA SPD",
    slug: "pv-combiner-box-1in-1out-1000vdc-32a-isolator",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "1-string 1000V DC PV combiner box with 32A/1200V isolator switch, 2×15A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-8Way-1in1out-1000VDC-DS is a 1-string, 1-output PV combiner box built around a 32A / 1200V DC isolator switch, providing safe on-site load-break disconnection for installation and maintenance. It integrates 2×15A PV fuses for independent per-pole protection and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The hard, flame-retardant plastic enclosure is IP65-rated, making it suitable for outdoor installation on both on-grid and off-grid PV systems rated up to 1000V DC.",
    features: [
      "1-string PV input, 1 output configuration",
      "32A / 1200V DC isolator switch for safe manual disconnection",
      "2 × 15A PV fuses for individual per-pole protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Supports 1000V DC PV systems (on-grid / off-grid)",
    ],
    specs: {
      "Model": "HA-8Way-1in1out-1000VDC-DS",
      "PV String Inputs": "1",
      "Outputs": "1",
      "Max System Voltage": "1000V DC",
      "DC Isolator Switch": "32A, 1200V DC",
      "PV Fuse Rating": "15A (2 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-8Way-1in1out-1000VDC-DS-1.jpg",
    images: [
      "/images/products/HA-8Way-1in1out-1000VDC-DS-1.jpg",
      "/images/products/HA-8Way-1in1out-1000VDC-DS-2.jpg",
      "/images/products/HA-8Way-1in1out-1000VDC-DS-3.jpg",
      "/images/products/HA-8Way-1in1out-1000VDC-DS-4.jpg",
      "/images/products/HA-8Way-1in1out-1000VDC-DS-5.jpg",
      "/images/products/HA-8Way-1in1out-1000VDC-DS-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 1-in-1-out 1000VDC | 32A Isolator, 15A Fuse, 40kA SPD | Soltree",
    metaDescription:
      "1-string 1000V DC PV combiner box with 32A/1200V isolator switch, 2×15A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 1000VDC combiner box, isolator switch combiner box, DC isolator 32A, 15A PV fuse, 40kA SPD, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-8Way-1in1out-1000VDC-DS 1-string 1000V PV combiner box front view",
      "HA-8Way-1in1out-1000VDC-DS combiner box interior with 32A isolator switch and fuses",
      "HA-8Way-1in1out-1000VDC-DS wiring layout with 15A PV fuses",
      "HA-8Way-1in1out-1000VDC-DS 500V 40kA surge protection device detail",
      "HA-8Way-1in1out-1000VDC-DS IP65 flame-retardant plastic enclosure",
      "HA-8Way-1in1out-1000VDC-DS outdoor installation on 1000V PV system",
    ],
  },
  {
    id: "HA-12way-2in1out-1000VDC-DS",
    name: "PV Combiner Box 2 String Input 1 Output, 1000V DC, 32A Isolator Switch, 15A Fuse & 40kA SPD",
    slug: "pv-combiner-box-2in-1out-1000vdc-32a-isolator",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "2-string 1000V DC PV combiner box with 32A/1200V isolator switch, 4×15A fuses and 500V/40kA SPD in an IP65 flame-retardant enclosure.",
    description:
      "The HA-12way-2in1out-1000VDC-DS is a 2-string, 1-output PV combiner box built around a 32A / 1200V DC isolator switch, providing safe on-site load-break disconnection for installation and maintenance. It integrates 4×15A PV fuses for independent per-pole string protection and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The hard, flame-retardant plastic enclosure is IP65-rated, making it suitable for outdoor installation on both on-grid and off-grid PV systems rated up to 1000V DC.",
    features: [
      "2-string PV input, 1 output configuration",
      "32A / 1200V DC isolator switch for safe manual disconnection",
      "4 × 15A PV fuses for individual per-pole string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Supports 1000V DC PV systems (on-grid / off-grid)",
    ],
    specs: {
      "Model": "HA-12way-2in1out-1000VDC-DS",
      "PV String Inputs": "2",
      "Outputs": "1",
      "Max System Voltage": "1000V DC",
      "DC Isolator Switch": "32A, 1200V DC",
      "PV Fuse Rating": "15A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-12way-2in1out-1000VDC-DS-1.jpg",
    images: [
      "/images/products/HA-12way-2in1out-1000VDC-DS-1.jpg",
      "/images/products/HA-12way-2in1out-1000VDC-DS-2.jpg",
      "/images/products/HA-12way-2in1out-1000VDC-DS-3.jpg",
      "/images/products/HA-12way-2in1out-1000VDC-DS-4.jpg",
      "/images/products/HA-12way-2in1out-1000VDC-DS-5.jpg",
      "/images/products/HA-12way-2in1out-1000VDC-DS-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 2-in-1-out 1000VDC | 32A Isolator, 15A Fuse, 40kA SPD | Soltree",
    metaDescription:
      "2-string 1000V DC PV combiner box with 32A/1200V isolator switch, 4×15A PV fuses, 500V/40kA SPD and IP65 flame-retardant enclosure. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, 1000VDC combiner box, 2 string combiner box, isolator switch combiner box, DC isolator 32A, 15A PV fuse, 40kA SPD, IP65, on-grid off-grid PV",
    imageAlts: [
      "HA-12way-2in1out-1000VDC-DS 2-string 1000V PV combiner box front view",
      "HA-12way-2in1out-1000VDC-DS combiner box interior with 32A isolator switch and fuses",
      "HA-12way-2in1out-1000VDC-DS wiring layout with 15A PV fuses",
      "HA-12way-2in1out-1000VDC-DS 500V 40kA surge protection device detail",
      "HA-12way-2in1out-1000VDC-DS IP65 flame-retardant plastic enclosure",
      "HA-12way-2in1out-1000VDC-DS outdoor installation on 1000V PV system",
    ],
  },
  {
    id: "HA-8Way-2DCB-2SPD",
    name: "PV Combiner Box 1 String Input 1 Output, Dual 32A DC Breakers & Dual 500V/40kA SPDs",
    slug: "pv-combiner-box-1in-1out-dual-32a-dual-spd",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "1-string PV combiner box with dual 32A DC breakers and dual 500V/40kA SPDs for redundant protection, in an IP65 flame-retardant enclosure.",
    description:
      "The HA-8Way-2DCB-2SPD is a 1-string, 1-output PV combiner box engineered with redundant protection. It integrates two 32A DC circuit breakers for overload and short-circuit protection and two 500V DC surge protection devices, each rated at 40kA max discharge current, for enhanced defence against lightning-induced transients. Housed in a hard, flame-retardant plastic enclosure with IP65 ingress protection, it is built for outdoor installation on both on-grid and off-grid PV systems where extra redundancy or bipolar protection is required.",
    features: [
      "1-string PV input, 1 output configuration",
      "Dual 32A DC circuit breakers for redundant overload and short-circuit protection",
      "Dual 500V DC SPDs, each with 40kA maximum discharge current",
      "Flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-8Way-2DCB-2SPD",
      "PV String Inputs": "1",
      "Outputs": "1",
      "DC Circuit Breaker": "32A (2 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA (2 pcs)",
      "Housing Material": "Flame-retardant hard plastic",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-8Way-2DCB-2SPD-1.jpg",
    images: [
      "/images/products/HA-8Way-2DCB-2SPD-1.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-2.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-3.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-4.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-5.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-6.jpg",
    ],
    metaTitle:
      "PV Combiner Box 1-in-1-out Dual 32A DC Breakers & Dual 40kA SPDs | Soltree",
    metaDescription:
      "1-string PV combiner box with dual 32A DC breakers and dual 500V/40kA SPDs for redundant protection. IP65 flame-retardant enclosure. On-grid / off-grid. OEM available.",
    metaKeywords:
      "PV combiner box, redundant DC breaker combiner box, dual SPD combiner box, 32A DC breaker, 40kA SPD, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-8Way-2DCB-2SPD 1-string PV combiner box front view",
      "HA-8Way-2DCB-2SPD combiner box interior with dual 32A DC breakers",
      "HA-8Way-2DCB-2SPD dual 500V 40kA surge protection devices detail",
      "HA-8Way-2DCB-2SPD wiring layout with redundant protection",
      "HA-8Way-2DCB-2SPD IP65 flame-retardant plastic enclosure",
      "HA-8Way-2DCB-2SPD outdoor installation on PV system",
    ],
  },
  {
    id: "HA-4Way-1DCB-1SPD-White",
    name: "PV Combiner Box (White) 1 String Input 1 Output, 40A DC Breaker & 500V/40kA SPD",
    slug: "pv-combiner-box-1in-1out-40a-spd-white",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "Compact 1-string PV combiner box in a white IP65 enclosure with 40A DC breaker and 500V/40kA SPD.",
    description:
      "The HA-4Way-1DCB-1SPD-White is a compact 1-string, 1-output PV combiner box finished in a white, flame-retardant plastic enclosure for installations where a clean, low-profile appearance is preferred. It integrates a 40A DC circuit breaker for overload and short-circuit protection and a 500V DC surge protection device rated at 40kA max discharge current to shield the system from lightning-induced transients. Rated IP65 against dust and water, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "1-string PV input, 1 output configuration",
      "1 × 40A DC circuit breaker for overload and short-circuit protection",
      "1 × 500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "White flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-4Way-1DCB-1SPD-White",
      "PV String Inputs": "1",
      "Outputs": "1",
      "DC Circuit Breaker": "40A",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Flame-retardant hard plastic (white)",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-4Way-1DCB-1SPD-White-1.jpg",
    images: [
      "/images/products/HA-4Way-1DCB-1SPD-White-1.jpg",
      "/images/products/HA-4Way-1DCB-1SPD-White-2.jpg",
      "/images/products/HA-4Way-1DCB-1SPD-White-3.jpg",
      "/images/products/HA-4Way-1DCB-1SPD-White-4.jpg",
      "/images/products/HA-4Way-1DCB-1SPD-White-5.jpg",
      "/images/products/HA-4Way-1DCB-1SPD-White-6.jpg",
      "/images/products/HA-4Way-1DCB-1SPD-White-7.jpg",
    ],
    metaTitle:
      "PV Combiner Box White 1-in-1-out 40A | 40kA SPD | Soltree",
    metaDescription:
      "Compact 1-string PV combiner box in white IP65 enclosure with 40A DC breaker and 500V/40kA SPD. For on-grid and off-grid solar systems. OEM available.",
    metaKeywords:
      "PV combiner box, white combiner box, 1 string combiner box, 40A DC breaker, 40kA SPD, IP65 combiner box, on-grid off-grid PV",
    imageAlts: [
      "HA-4Way-1DCB-1SPD-White PV combiner box front view white enclosure",
      "HA-4Way-1DCB-1SPD-White combiner box interior with 40A DC breaker",
      "HA-4Way-1DCB-1SPD-White 500V 40kA surge protection device detail",
      "HA-4Way-1DCB-1SPD-White wiring terminals",
      "HA-4Way-1DCB-1SPD-White IP65 flame-retardant enclosure close-up",
      "HA-4Way-1DCB-1SPD-White side profile",
      "HA-4Way-1DCB-1SPD-White outdoor installation on PV system",
    ],
  },
  {
    id: "HA-8Way-2DCB-2SPD-White",
    name: "PV Combiner Box (White) 1 String Input 1 Output, Dual 40A DC Breakers & Dual 500V/40kA SPDs",
    slug: "pv-combiner-box-1in-1out-dual-40a-dual-spd-white",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "1-string PV combiner box in a white IP65 enclosure with dual 40A DC breakers and dual 500V/40kA SPDs for redundant protection.",
    description:
      "The HA-8Way-2DCB-2SPD-White is a 1-string, 1-output PV combiner box in a white, flame-retardant plastic enclosure, engineered with redundant protection. It integrates two 40A DC circuit breakers for overload and short-circuit protection and two 500V DC surge protection devices, each rated at 40kA max discharge current, for enhanced defence against lightning-induced transients. Rated IP65 against dust and water, it is built for outdoor installation on both on-grid and off-grid PV systems where extra redundancy or bipolar protection is required.",
    features: [
      "1-string PV input, 1 output configuration",
      "Dual 40A DC circuit breakers for redundant overload and short-circuit protection",
      "Dual 500V DC SPDs, each with 40kA maximum discharge current",
      "White flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-8Way-2DCB-2SPD-White",
      "PV String Inputs": "1",
      "Outputs": "1",
      "DC Circuit Breaker": "40A (2 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA (2 pcs)",
      "Housing Material": "Flame-retardant hard plastic (white)",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-8Way-2DCB-2SPD-White-1.jpg",
    images: [
      "/images/products/HA-8Way-2DCB-2SPD-White-1.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-White-2.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-White-3.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-White-4.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-White-5.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-White-6.jpg",
      "/images/products/HA-8Way-2DCB-2SPD-White-7.jpg",
    ],
    metaTitle:
      "PV Combiner Box White Dual 40A DC Breakers & Dual 40kA SPDs | Soltree",
    metaDescription:
      "1-string PV combiner box in white IP65 enclosure with dual 40A DC breakers and dual 500V/40kA SPDs for redundant protection. On-grid / off-grid. OEM available.",
    metaKeywords:
      "PV combiner box, white combiner box, redundant DC breaker combiner box, dual SPD combiner box, 40A DC breaker, 40kA SPD, IP65, on-grid off-grid PV",
    imageAlts: [
      "HA-8Way-2DCB-2SPD-White PV combiner box front view white enclosure",
      "HA-8Way-2DCB-2SPD-White combiner box interior with dual 40A DC breakers",
      "HA-8Way-2DCB-2SPD-White dual 500V 40kA surge protection devices detail",
      "HA-8Way-2DCB-2SPD-White wiring layout with redundant protection",
      "HA-8Way-2DCB-2SPD-White IP65 flame-retardant enclosure close-up",
      "HA-8Way-2DCB-2SPD-White side profile",
      "HA-8Way-2DCB-2SPD-White outdoor installation on PV system",
    ],
  },
  {
    id: "HA-18Way-4DCB-4SPD-White",
    name: "PV Combiner Box (White) 1 String Input 1 Output, 4× 40A DC Breakers & 4× 500V/40kA SPDs",
    slug: "pv-combiner-box-1in-1out-quad-40a-quad-spd-white",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "1-string PV combiner box in a white IP65 enclosure with 4× 40A DC breakers and 4× 500V/40kA SPDs for high-redundancy protection.",
    description:
      "The HA-18Way-4DCB-4SPD-White is a 1-string, 1-output PV combiner box in a white, flame-retardant plastic enclosure, built for installations that demand high-redundancy protection. It integrates four 40A DC circuit breakers for overload and short-circuit protection and four 500V DC surge protection devices, each rated at 40kA max discharge current, for multi-stage defence against lightning-induced transients. Rated IP65 against dust and water, it is built for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "1-string PV input, 1 output configuration",
      "4 × 40A DC circuit breakers for high-redundancy overload and short-circuit protection",
      "4 × 500V DC SPDs, each with 40kA maximum discharge current",
      "White flame-retardant hard plastic housing",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "HA-18Way-4DCB-4SPD-White",
      "PV String Inputs": "1",
      "Outputs": "1",
      "DC Circuit Breaker": "40A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA (4 pcs)",
      "Housing Material": "Flame-retardant hard plastic (white)",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/HA-18Way-4DCB-4SPD-White-1.jpg",
    images: [
      "/images/products/HA-18Way-4DCB-4SPD-White-1.jpg",
      "/images/products/HA-18Way-4DCB-4SPD-White-2.jpg",
      "/images/products/HA-18Way-4DCB-4SPD-White-3.jpg",
      "/images/products/HA-18Way-4DCB-4SPD-White-4.jpg",
      "/images/products/HA-18Way-4DCB-4SPD-White-5.jpg",
      "/images/products/HA-18Way-4DCB-4SPD-White-6.jpg",
      "/images/products/HA-18Way-4DCB-4SPD-White-7.jpg",
    ],
    metaTitle:
      "PV Combiner Box White 4× 40A DC Breakers & 4× 40kA SPDs | Soltree",
    metaDescription:
      "1-string PV combiner box in white IP65 enclosure with 4× 40A DC breakers and 4× 500V/40kA SPDs for high-redundancy protection. On-grid / off-grid. OEM available.",
    metaKeywords:
      "PV combiner box, white combiner box, high redundancy combiner box, quad DC breaker, quad SPD, 40A DC breaker, 40kA SPD, IP65, on-grid off-grid PV",
    imageAlts: [
      "HA-18Way-4DCB-4SPD-White PV combiner box front view white enclosure",
      "HA-18Way-4DCB-4SPD-White combiner box interior with 4× 40A DC breakers",
      "HA-18Way-4DCB-4SPD-White 4× 500V 40kA surge protection devices detail",
      "HA-18Way-4DCB-4SPD-White wiring layout with high-redundancy protection",
      "HA-18Way-4DCB-4SPD-White IP65 flame-retardant enclosure close-up",
      "HA-18Way-4DCB-4SPD-White side profile",
      "HA-18Way-4DCB-4SPD-White outdoor installation on PV system",
    ],
  },
  {
    id: "PCB-M6in-01",
    name: "PV Combiner Box 6 PV Array Inputs, 100A DC Breaker, 15A Fuse & 40kA SPD (Steel, with Radiator)",
    slug: "pv-combiner-box-6in-1out-100a-15a-steel",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "6-input PV combiner box in a cold-rolled steel enclosure with 100A DC breaker, 6×15A fuses, 500V/40kA SPD and built-in radiator.",
    description:
      "The PCB-M6in-01 is a 6-input PV combiner box designed for commercial solar arrays where multiple strings must be aggregated into a single feed. It integrates a 100A DC circuit breaker for overload and short-circuit protection, 6×15A PV fuses for independent per-string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The rugged cold-rolled steel enclosure is rated IP65 against dust and water and is equipped with a built-in radiator for stable operation under continuous load. Suitable for outdoor installation on both on-grid and off-grid PV systems.",
    features: [
      "6 PV array inputs, 1 output configuration",
      "100A DC circuit breaker for overload and short-circuit protection",
      "6 × 15A PV fuses for independent per-string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Heavy-duty cold-rolled steel enclosure",
      "Built-in radiator for stable thermal performance under continuous load",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both on-grid and off-grid PV systems",
    ],
    specs: {
      "Model": "PCB-M6in-01",
      "PV Array Inputs": "6",
      "Outputs": "1",
      "DC Circuit Breaker": "100A",
      "PV Fuse Rating": "15A (6 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Cold-rolled steel",
      "Cooling": "Built-in radiator",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "On-grid / Off-grid PV systems",
    },
    image: "/images/products/PCB-M6in-01-1.jpg",
    images: [
      "/images/products/PCB-M6in-01-1.jpg",
      "/images/products/PCB-M6in-01-2.jpg",
      "/images/products/PCB-M6in-01-3.jpg",
      "/images/products/PCB-M6in-01-4.jpg",
      "/images/products/PCB-M6in-01-5.jpg",
      "/images/products/PCB-M6in-01-6.jpg",
    ],
    metaTitle:
      "6-Input PV Combiner Box 100A DC Breaker | Steel with Radiator | Soltree",
    metaDescription:
      "6-input PV combiner box in cold-rolled steel enclosure with 100A DC breaker, 6×15A PV fuses, 500V/40kA SPD and built-in radiator. IP65 outdoor-rated. OEM available.",
    metaKeywords:
      "PV combiner box, 6 input combiner box, 100A DC breaker, 15A PV fuse, 40kA SPD, steel combiner box, combiner box with radiator, IP65, on-grid off-grid PV",
    imageAlts: [
      "PCB-M6in-01 6-input PV combiner box steel enclosure front view",
      "PCB-M6in-01 combiner box interior with 100A DC breaker and 6×15A fuses",
      "PCB-M6in-01 500V 40kA surge protection device detail",
      "PCB-M6in-01 built-in radiator for thermal dissipation",
      "PCB-M6in-01 wiring terminals for 6 PV array inputs",
      "PCB-M6in-01 IP65 cold-rolled steel enclosure outdoor installation",
    ],
  },
  {
    id: "PCB-M4in-02",
    name: "PV Combiner Box 4 PV Array Inputs, 63A DC Breaker, 20A Fuse & 40kA SPD (Steel, with Safety Lock)",
    slug: "pv-combiner-box-4in-1out-63a-20a-steel-lock",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "4-input PV combiner box in a heavy-duty steel enclosure with 63A DC breaker, 4×20A fuses, 500V/40kA SPD and lockable door.",
    description:
      "The PCB-M4in-02 is a 4-input PV combiner box designed for commercial solar arrays where security and ruggedness are priorities. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 4×20A PV fuses for independent per-string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The robust steel enclosure offers high impact resistance, is rated IP65 against dust and water, and ships with a safety lock and key to prevent unauthorized access. Suitable for outdoor installation on both grid-tied and off-grid PV systems.",
    features: [
      "4 PV array inputs, 1 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "4 × 20A PV fuses for independent per-string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Robust steel enclosure with high impact resistance",
      "Integrated safety lock and key for tamper prevention",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both grid-tied and off-grid PV systems",
    ],
    specs: {
      "Model": "PCB-M4in-02",
      "PV Array Inputs": "4",
      "Outputs": "1",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "20A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Robust steel (high impact resistance)",
      "Security": "Safety lock & key",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "Grid-tied / Off-grid PV systems",
    },
    image: "/images/products/PCB-M4in-02-1.jpg",
    images: [
      "/images/products/PCB-M4in-02-1.jpg",
      "/images/products/PCB-M4in-02-2.jpg",
      "/images/products/PCB-M4in-02-3.jpg",
      "/images/products/PCB-M4in-02-4.jpg",
      "/images/products/PCB-M4in-02-5.jpg",
      "/images/products/PCB-M4in-02-6.jpg",
    ],
    metaTitle:
      "4-Input PV Combiner Box 63A DC Breaker 20A Fuse | Steel with Safety Lock | Soltree",
    metaDescription:
      "4-input PV combiner box in heavy-duty steel enclosure with 63A DC breaker, 4×20A PV fuses, 500V/40kA SPD and lockable door. IP65 outdoor-rated. OEM available.",
    metaKeywords:
      "PV combiner box, 4 input combiner box, 63A DC breaker, 20A PV fuse, 40kA SPD, steel combiner box, lockable combiner box, IP65, grid-tied off-grid PV",
    imageAlts: [
      "PCB-M4in-02 4-input PV combiner box steel enclosure front view",
      "PCB-M4in-02 combiner box interior with 63A DC breaker and 4×20A fuses",
      "PCB-M4in-02 500V 40kA surge protection device detail",
      "PCB-M4in-02 safety lock and key tamper prevention",
      "PCB-M4in-02 wiring terminals for 4 PV array inputs",
      "PCB-M4in-02 IP65 robust steel enclosure outdoor installation",
    ],
  },
  {
    id: "PCB-M6in-03",
    name: "PV Combiner Box 6 PV Array Inputs, 63A DC Breaker, 20A Fuse & 40kA SPD (Steel, with Safety Lock)",
    slug: "pv-combiner-box-6in-1out-63a-20a-steel-lock",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "6-input PV combiner box in a heavy-duty steel enclosure with 63A DC breaker, 6×20A fuses, 500V/40kA SPD and lockable door.",
    description:
      "The PCB-M6in-03 is a 6-input PV combiner box designed for commercial solar arrays where security and ruggedness are priorities. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 6×20A PV fuses for independent per-string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The robust steel enclosure offers high impact resistance, is rated IP65 against dust and water, and ships with a safety lock and key to prevent unauthorized access. Suitable for outdoor installation on both grid-tied and off-grid PV systems.",
    features: [
      "6 PV array inputs, 1 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "6 × 20A PV fuses for independent per-string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Robust steel enclosure with high impact resistance",
      "Integrated safety lock and key for tamper prevention",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both grid-tied and off-grid PV systems",
    ],
    specs: {
      "Model": "PCB-M6in-03",
      "PV Array Inputs": "6",
      "Outputs": "1",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "20A (6 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Robust steel (high impact resistance)",
      "Security": "Safety lock & key",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "Grid-tied / Off-grid PV systems",
    },
    image: "/images/products/PCB-M6in-03-1.jpg",
    images: [
      "/images/products/PCB-M6in-03-1.jpg",
      "/images/products/PCB-M6in-03-2.jpg",
      "/images/products/PCB-M6in-03-3.jpg",
      "/images/products/PCB-M6in-03-4.jpg",
      "/images/products/PCB-M6in-03-5.jpg",
      "/images/products/PCB-M6in-03-6.jpg",
    ],
    metaTitle:
      "6-Input PV Combiner Box 63A DC Breaker | Steel with Safety Lock | Soltree",
    metaDescription:
      "6-input PV combiner box in heavy-duty steel enclosure with 63A DC breaker, 6×20A PV fuses, 500V/40kA SPD and lockable door. IP65 outdoor-rated. OEM available.",
    metaKeywords:
      "PV combiner box, 6 input combiner box, 63A DC breaker, 20A PV fuse, 40kA SPD, steel combiner box, lockable combiner box, IP65, grid-tied off-grid PV",
    imageAlts: [
      "PCB-M6in-03 6-input PV combiner box steel enclosure front view",
      "PCB-M6in-03 combiner box interior with 63A DC breaker and 6×20A fuses",
      "PCB-M6in-03 500V 40kA surge protection device detail",
      "PCB-M6in-03 safety lock and key tamper prevention",
      "PCB-M6in-03 wiring terminals for 6 PV array inputs",
      "PCB-M6in-03 IP65 robust steel enclosure outdoor installation",
    ],
  },
  {
    id: "PCB-M4in-04",
    name: "PV Combiner Box 4 PV Array Inputs, 63A DC Breaker, 15A Fuse & 40kA SPD (Steel, with Safety Lock)",
    slug: "pv-combiner-box-4in-1out-63a-15a-steel-lock",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "4-input PV combiner box in a heavy-duty steel enclosure with 63A DC breaker, 4×15A fuses, 500V/40kA SPD and lockable door.",
    description:
      "The PCB-M4in-04 is a 4-input PV combiner box designed for commercial solar arrays where security and ruggedness are priorities. It integrates a 63A DC circuit breaker for overload and short-circuit protection, 4×15A PV fuses for independent per-string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The robust steel enclosure offers high impact resistance, is rated IP65 against dust and water, and ships with a safety lock and key to prevent unauthorized access. Suitable for outdoor installation on both grid-tied and off-grid PV systems.",
    features: [
      "4 PV array inputs, 1 output configuration",
      "63A DC circuit breaker for overload and short-circuit protection",
      "4 × 15A PV fuses for independent per-string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Robust steel enclosure with high impact resistance",
      "Integrated safety lock and key for tamper prevention",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both grid-tied and off-grid PV systems",
    ],
    specs: {
      "Model": "PCB-M4in-04",
      "PV Array Inputs": "4",
      "Outputs": "1",
      "DC Circuit Breaker": "63A",
      "PV Fuse Rating": "15A (4 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Robust steel (high impact resistance)",
      "Security": "Safety lock & key",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "Grid-tied / Off-grid PV systems",
    },
    image: "/images/products/PCB-M4in-04-1.jpg",
    images: [
      "/images/products/PCB-M4in-04-1.jpg",
      "/images/products/PCB-M4in-04-2.jpg",
      "/images/products/PCB-M4in-04-3.jpg",
      "/images/products/PCB-M4in-04-4.jpg",
      "/images/products/PCB-M4in-04-5.jpg",
      "/images/products/PCB-M4in-04-6.jpg",
      "/images/products/PCB-M4in-04-7.jpg",
    ],
    metaTitle:
      "4-Input PV Combiner Box 63A DC Breaker 15A Fuse | Steel with Safety Lock | Soltree",
    metaDescription:
      "4-input PV combiner box in heavy-duty steel enclosure with 63A DC breaker, 4×15A PV fuses, 500V/40kA SPD and lockable door. IP65 outdoor-rated. OEM available.",
    metaKeywords:
      "PV combiner box, 4 input combiner box, 63A DC breaker, 15A PV fuse, 40kA SPD, steel combiner box, lockable combiner box, IP65, grid-tied off-grid PV",
    imageAlts: [
      "PCB-M4in-04 4-input PV combiner box steel enclosure front view",
      "PCB-M4in-04 combiner box interior with 63A DC breaker and 4×15A fuses",
      "PCB-M4in-04 500V 40kA surge protection device detail",
      "PCB-M4in-04 safety lock and key tamper prevention",
      "PCB-M4in-04 wiring terminals for 4 PV array inputs",
      "PCB-M4in-04 IP65 robust steel enclosure outdoor installation",
      "PCB-M4in-04 side profile and mounting detail",
    ],
  },
  {
    id: "PCB-M6in-05",
    name: "PV Combiner Box 6 PV Array Inputs, 125A DC Breaker, 15A Fuse & 40kA SPD (Steel, with Safety Lock)",
    slug: "pv-combiner-box-6in-1out-125a-15a-steel-lock",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription:
      "6-input PV combiner box in a heavy-duty steel enclosure with 125A DC breaker, 6×15A fuses, 500V/40kA SPD and lockable door.",
    description:
      "The PCB-M6in-05 is a 6-input PV combiner box built for higher-current commercial and small utility solar arrays. It integrates a 125A DC circuit breaker for overload and short-circuit protection, 6×15A PV fuses for independent per-string protection, and a 500V DC surge protection device rated at 40kA max discharge current to defend the system against lightning-induced transients. The robust steel enclosure offers high impact resistance, is rated IP65 against dust and water, and ships with a safety lock and key to prevent unauthorized access. Suitable for outdoor installation on both grid-tied and off-grid PV systems.",
    features: [
      "6 PV array inputs, 1 output configuration",
      "125A DC circuit breaker for higher-current overload and short-circuit protection",
      "6 × 15A PV fuses for independent per-string protection",
      "500V DC SPD with 40kA maximum discharge current (lightning protection)",
      "Robust steel enclosure with high impact resistance",
      "Integrated safety lock and key for tamper prevention",
      "IP65 waterproof and dustproof – suitable for outdoor installation",
      "Compatible with both grid-tied and off-grid PV systems",
    ],
    specs: {
      "Model": "PCB-M6in-05",
      "PV Array Inputs": "6",
      "Outputs": "1",
      "DC Circuit Breaker": "125A",
      "PV Fuse Rating": "15A (6 pcs)",
      "Surge Protection (SPD)": "500V DC, 40kA max discharge current",
      "Housing Material": "Robust steel (high impact resistance)",
      "Security": "Safety lock & key",
      "Protection Level": "IP65 (waterproof & dustproof)",
      "Installation": "Outdoor",
      "Applicable Systems": "Grid-tied / Off-grid PV systems",
    },
    image: "/images/products/PCB-M6in-05-1.jpg",
    images: [
      "/images/products/PCB-M6in-05-1.jpg",
      "/images/products/PCB-M6in-05-2.jpg",
      "/images/products/PCB-M6in-05-3.jpg",
      "/images/products/PCB-M6in-05-4.jpg",
      "/images/products/PCB-M6in-05-5.jpg",
      "/images/products/PCB-M6in-05-6.jpg",
      "/images/products/PCB-M6in-05-7.jpg",
    ],
    metaTitle:
      "6-Input PV Combiner Box 125A DC Breaker 15A Fuse | Steel with Safety Lock | Soltree",
    metaDescription:
      "6-input PV combiner box in heavy-duty steel enclosure with 125A DC breaker, 6×15A PV fuses, 500V/40kA SPD and lockable door. IP65 outdoor-rated. OEM available.",
    metaKeywords:
      "PV combiner box, 6 input combiner box, 125A DC breaker, 15A PV fuse, 40kA SPD, steel combiner box, lockable combiner box, IP65, grid-tied off-grid PV",
    imageAlts: [
      "PCB-M6in-05 6-input PV combiner box steel enclosure front view",
      "PCB-M6in-05 combiner box interior with 125A DC breaker and 6×15A fuses",
      "PCB-M6in-05 500V 40kA surge protection device detail",
      "PCB-M6in-05 safety lock and key tamper prevention",
      "PCB-M6in-05 wiring terminals for 6 PV array inputs",
      "PCB-M6in-05 IP65 robust steel enclosure outdoor installation",
      "PCB-M6in-05 side profile and mounting detail",
    ],
  },

  // ATS Dual Power Switch
  {
    id: "ATS-ST-2P-63A-220V-110V",
    name: "63A 2P Automatic Transfer Switch 110V/220V - PC Class 50ms Fast Switching ATS for Home & RV",
    slug: "ats-2p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "2-pole 63A PC class ATS for 110V/220V single-phase systems. Auto & manual transfer in 50ms with built-in over/under-voltage protection – ideal for home emergency backup, RV, and generator applications.",
    description:
      "The ATS-ST-2P-63A is a PC class (load level) automatic transfer switch designed for single-phase 110V or 220V AC systems up to 63A. With a rapid 50ms transfer time, it seamlessly switches between mains power and a backup source (inverter or generator) when a fault is detected, keeping connected loads running with minimal interruption. The 2-pole design switches both Live and Neutral simultaneously, ensuring complete isolation of the backup source. Built-in over-voltage and under-voltage protection monitors the supply continuously – for 110V systems the thresholds are 85V – 145V, and for 220V systems 175V – 260V. Supports both automatic and manual switching modes with Source I (Mains) set as the priority, automatically returning to mains once power is restored. The motor-driven mechanism is housed in a PA6 flame-retardant enclosure for reliable long-term operation.",
    features: [
      "2-pole switching (Live + Neutral) – 2 inputs / 1 output",
      "PC class (load level) – handles full rated load continuously",
      "Fast 50ms (0.05s) transfer time – minimal load interruption",
      "Dual voltage: supports both 110V and 220V AC",
      "Auto & manual transfer modes; returns to mains automatically",
      "Over-voltage & under-voltage protection (110V: 85V – 145V; 220V: 175V – 260V)",
      "Compatible with mains, inverter, and generator sources",
      "PA6 flame-retardant housing with motor-driven mechanism",
    ],
    specs: {
      "Poles": "2P (Live + Neutral)",
      "Rated Current": "63A (Operating Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Single Phase",
      "Type": "PC Class (Load Level)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Source I (Mains)",
      "Compatible Sources": "Mains, Inverter, Generator",
      "Switching Mode": "Auto & Manual",
      "Transfer Time": " – .05s (50ms)",
      "Over-voltage Protection": "145V (110V mode) / 260V (220V mode)",
      "Under-voltage Protection": "85V (110V mode) / 175V (220V mode)",
      "Housing": "PA6 Flame-retardant",
      "Applications": "Home Emergency Backup, RV",
    },
    image: "/images/products/ATS-ST-2P-63A(220V 110V)-1.jpg",
    images: [
      "/images/products/ATS-ST-2P-63A(220V 110V)-1.jpg",
      "/images/products/ATS-ST-2P-63A(220V 110V)-2.jpg",
      "/images/products/ATS-ST-2P-63A(220V 110V)-3.jpg",
      "/images/products/ATS-ST-2P-63A(220V 110V)-4.jpg",
      "/images/products/ATS-ST-2P-63A(220V 110V)-5.jpg",
      "/images/products/ATS-ST-2P-63A(220V 110V)-6.jpg",
    ],
    metaTitle: "ATS-ST 63A 2P ATS 110V/220V | PC Class 50ms with Voltage Protection",
    metaDescription: "ATS-ST series single-phase 63A 2-pole PC class ATS for 110V and 220V. 50ms auto transfer, built-in over/under-voltage protection. For home backup, RV, inverter and generator applications.",
    metaKeywords: "ATS-ST 63A ATS, 2P automatic transfer switch, 110V 220V ATS, PC class ATS, single phase transfer switch, home backup power switch, RV ATS, 50ms transfer switch, voltage protection ATS",
    imageAlts: [
      "63A 2P ATS 110V/220V front view – PC class auto transfer switch",
      "ATS-ST-2P-63A wiring diagram – 2 inputs 1 output connection",
      "2P ATS internal structure – PCB, motor and PA6 flame-retardant housing",
      "63A single-phase ATS voltage protection settings – 110V and 220V",
      "ATS-ST-2P-63A auto and manual switching modes",
      "63A 2P transfer switch for home backup and RV applications",
    ],
  },
  {
    id: "ATS-ST-4P-63A-220V-110V",
    name: "63A 4P Automatic Transfer Switch 110V/220V - PC Class 50ms Three-Phase ATS for Commercial Use",
    slug: "ats-4p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "4-pole 63A PC class ATS for three-phase 110V/220V systems. Switches all 3 lines and neutral simultaneously in 50ms – built for hospitals, cold storage, and data centers.",
    description:
      "The ATS-ST-4P-63A is a PC class (load level) automatic transfer switch for three-phase systems with neutral (3L+N), rated at 63A and supporting both 110V and 220V AC. All four poles – three phases and neutral – switch simultaneously in 50ms, ensuring complete source isolation and preventing any backfeed between the two supplies. When mains power fails, the unit instantly transfers the load to the backup source (inverter or generator); once mains is restored, it automatically reverts to Source I priority. Built-in voltage monitoring provides over-voltage and under-voltage protection across both voltage settings: for 110V systems the thresholds are 85V – 145V, and for 220V systems 175V – 260V. The motor-driven switching mechanism enclosed in a PA6 flame-retardant housing ensures reliable and safe operation in demanding commercial environments such as hospitals, cold-storage facilities, and data centers.",
    features: [
      "4-pole switching (3 Lines + Neutral simultaneously) – 2 inputs / 1 output",
      "PC class (load level) – handles full rated load continuously",
      "Fast 50ms (0.05s) transfer time – critical load interruption under 50ms",
      "Dual voltage: supports both 110V and 220V AC three-phase systems",
      "Auto & manual transfer modes; automatically returns to mains priority",
      "Over-voltage & under-voltage protection (110V: 85V – 145V; 220V: 175V – 260V)",
      "Compatible with mains, inverter, and generator power sources",
      "PA6 flame-retardant housing with motor-driven mechanism for long service life",
    ],
    specs: {
      "Poles": "4P (3 Lines + Neutral)",
      "Rated Current": "63A (Operating Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase with Neutral",
      "Type": "PC Class (Load Level)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Source I (Mains)",
      "Compatible Sources": "Mains, Inverter, Generator",
      "Switching Mode": "Auto & Manual",
      "Transfer Time": " – .05s (50ms)",
      "Over-voltage Protection": "145V (110V mode) / 260V (220V mode)",
      "Under-voltage Protection": "85V (110V mode) / 175V (220V mode)",
      "Housing": "PA6 Flame-retardant",
      "Applications": "Hospitals, Cold Storage, Data Centers",
    },
    image: "/images/products/ATS-ST-4P-63A(220V 110V)-1.jpg",
    images: [
      "/images/products/ATS-ST-4P-63A(220V 110V)-1.jpg",
      "/images/products/ATS-ST-4P-63A(220V 110V)-2.jpg",
      "/images/products/ATS-ST-4P-63A(220V 110V)-3.jpg",
      "/images/products/ATS-ST-4P-63A(220V 110V)-4.jpg",
      "/images/products/ATS-ST-4P-63A(220V 110V)-5.jpg",
      "/images/products/ATS-ST-4P-63A(220V 110V)-6.jpg",
    ],
    metaTitle: "ATS-ST 63A 4P ATS 110V/220V | PC Class 50ms Three-Phase with Voltage Protection",
    metaDescription: "ATS-ST series three-phase 63A 4-pole (3L+N) PC class ATS for 110V and 220V. 50ms auto transfer, simultaneous 3L+N switching, over/under-voltage protection. For hospitals, cold storage and data centers.",
    metaKeywords: "ATS-ST 63A 4P ATS, three-phase automatic transfer switch, 4 pole ATS 110V 220V, PC class ATS, three phase transfer switch, hospital ATS, data center transfer switch, voltage protection ATS",
    imageAlts: [
      "63A 4P ATS 110V/220V front view – PC class three-phase auto transfer switch",
      "ATS-ST-4P-63A wiring diagram – 4-pole 2 inputs 1 output connection",
      "4P ATS internal structure – PCB, motor and PA6 flame-retardant housing",
      "63A three-phase ATS voltage protection settings – 110V and 220V modes",
      "ATS-ST-4P-63A auto and manual switching mode panel",
      "63A 4-pole transfer switch for hospitals, cold storage and data centers",
    ],
  },
  {
    id: "ATS-W2R-2P-220V-110V",
    name: "63A 2P Automatic Transfer Switch 110V/220V - PC Class 50ms Dual Power ATS for Home & RV",
    slug: "ats-w2r-2p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "2-pole 63A PC class ATS for single-phase 110V/220V systems. Auto & manual transfer in 50ms, compatible with mains, generator and PV inverter – ideal for home emergency backup and RV.",
    description:
      "The ATS-W2R-2P is a PC class (load level) automatic transfer switch for single-phase 110V or 220V AC systems up to 63A. With a 50ms transfer time, it switches seamlessly between Source A (mains priority) and a backup supply – whether a generator or PV inverter – whenever a mains fault is detected, ensuring connected loads experience less than 50ms of interruption. The 2-pole design switches both Live and Neutral simultaneously, fully isolating the two sources and preventing any backfeed. Once mains power is restored, the unit automatically reverts to Source A priority. Built on a motor-driven mechanism with a PA6 flame-retardant housing, the W2R series delivers reliable automatic transfer performance for home emergency backup systems, RV setups, and off-grid solar PV applications.",
    features: [
      "2-pole switching (Live + Neutral) – 2 inputs / 1 output",
      "PC class (load level) – handles full rated load continuously",
      "Fast 50ms (0.05s) transfer time – load interruption under 50ms",
      "Dual voltage: supports both 110V and 220V AC single-phase",
      "Auto & manual transfer modes; returns to Source A (mains) automatically",
      "Compatible with mains, generator, and PV inverter sources",
      "PA6 flame-retardant housing with motor-driven mechanism",
      "Suitable for home emergency backup, RV, and off-grid solar systems",
    ],
    specs: {
      "Poles": "2P (Live + Neutral)",
      "Rated Current": "63A (Operating Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Single Phase",
      "Type": "PC Class (Load Level)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Source A (Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Transfer Time": " – .05s (50ms)",
      "Housing": "PA6 Flame-retardant",
      "Applications": "Home Emergency Backup, RV",
    },
    image: "/images/products/ATS-W2R-2P(220V 110V)-1.jpg",
    images: [
      "/images/products/ATS-W2R-2P(220V 110V)-1.jpg",
      "/images/products/ATS-W2R-2P(220V 110V)-2.jpg",
      "/images/products/ATS-W2R-2P(220V 110V)-3.jpg",
      "/images/products/ATS-W2R-2P(220V 110V)-4.jpg",
      "/images/products/ATS-W2R-2P(220V 110V)-5.jpg",
      "/images/products/ATS-W2R-2P(220V 110V)-6.jpg",
    ],
    metaTitle: "ATS-W2R 63A 2P ATS 110V/220V | PC Class 50ms PV Inverter Compatible",
    metaDescription: "ATS-W2R series single-phase 63A 2-pole PC class ATS for 110V and 220V. 50ms auto transfer, compatible with mains, generator and PV inverter. For home emergency backup and RV applications.",
    metaKeywords: "ATS-W2R 63A 2P ATS, dual power transfer switch, 110V 220V ATS, PC class ATS, single phase ATS, PV inverter ATS, home backup transfer switch, RV ATS, solar ATS",
    imageAlts: [
      "63A 2P ATS-W2R 110V/220V front view – PC class dual power transfer switch",
      "ATS-W2R-2P wiring diagram – 2-pole 2 inputs 1 output connection",
      "ATS-W2R-2P internal structure – PCB, motor and PA6 flame-retardant housing",
      "63A single-phase ATS-W2R auto and manual switching mode panel",
      "ATS-W2R-2P compatible with mains, generator and PV inverter sources",
      "63A 2-pole transfer switch for home emergency backup and RV use",
    ],
  },
  {
    id: "ATS-W2R-3P-220V-110V",
    name: "63A 3P Automatic Transfer Switch 110V/220V - PC Class 50ms Three-Phase ATS for Commercial Use",
    slug: "ats-w2r-3p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "3-pole 63A PC class ATS for three-phase 110V/220V systems (no neutral). Auto & manual transfer in 50ms, compatible with mains, generator and PV inverter – for hospitals, cold storage, and data centers.",
    description:
      "The ATS-W2R-3P is a PC class (load level) automatic transfer switch for three-phase systems without neutral (3L only), rated at 63A and supporting both 110V and 220V AC. All three line poles switch simultaneously in 50ms, providing complete source isolation and preventing backfeed between mains and the backup supply. When Source A (mains) fails, the unit instantly transfers the load to a generator or PV inverter; once mains is restored, it automatically reverts to Source A priority without manual intervention. Supports both automatic and manual switching modes to suit different installation requirements. Built on a motor-driven mechanism housed in a PA6 flame-retardant enclosure, the W2R-3P is engineered for reliable continuous operation in demanding commercial environments – hospitals, cold-storage facilities, data centers, and industrial equipment requiring uninterrupted three-phase power.",
    features: [
      "3-pole switching (3 Lines simultaneously, no neutral) – 2 inputs / 1 output",
      "PC class (load level) – handles full rated load continuously",
      "Fast 50ms (0.05s) transfer time – load interruption under 50ms",
      "Dual voltage: supports both 110V and 220V AC three-phase",
      "Auto & manual transfer modes; returns to Source A (mains) automatically",
      "Compatible with mains, generator, and PV inverter sources",
      "PA6 flame-retardant housing with motor-driven mechanism",
      "Suitable for hospitals, cold storage, data centers, and industrial equipment",
    ],
    specs: {
      "Poles": "3P (3 Lines, No Neutral)",
      "Rated Current": "63A (Operating Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase (No Neutral)",
      "Type": "PC Class (Load Level)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Source A (Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Transfer Time": " – .05s (50ms)",
      "Housing": "PA6 Flame-retardant",
      "Applications": "Hospitals, Cold Storage, Data Centers",
    },
    image: "/images/products/ATS-W2R-3P(220V 110V)-1.jpg",
    images: [
      "/images/products/ATS-W2R-3P(220V 110V)-1.jpg",
      "/images/products/ATS-W2R-3P(220V 110V)-2.jpg",
      "/images/products/ATS-W2R-3P(220V 110V)-3.jpg",
      "/images/products/ATS-W2R-3P(220V 110V)-4.jpg",
      "/images/products/ATS-W2R-3P(220V 110V)-5.jpg",
      "/images/products/ATS-W2R-3P(220V 110V)-6.jpg",
    ],
    metaTitle: "ATS-W2R 63A 3P ATS 110V/220V | PC Class 50ms Three-Phase No-Neutral",
    metaDescription: "ATS-W2R series three-phase 63A 3-pole (no neutral) PC class ATS for 110V and 220V. 50ms auto transfer, compatible with mains, generator and PV inverter. For hospitals, cold storage and data centers.",
    metaKeywords: "ATS-W2R 63A 3P ATS, three-phase no neutral transfer switch, 3 pole ATS 110V 220V, PC class ATS, PV inverter ATS, hospital transfer switch, data center ATS, commercial ATS",
    imageAlts: [
      "63A 3P ATS-W2R 110V/220V front view – PC class three-phase transfer switch",
      "ATS-W2R-3P wiring diagram – 3-pole 2 inputs 1 output connection",
      "ATS-W2R-3P internal structure – PCB, motor and PA6 flame-retardant housing",
      "63A three-phase ATS-W2R auto and manual switching mode panel",
      "ATS-W2R-3P compatible with mains, generator and PV inverter sources",
      "63A 3-pole transfer switch for hospitals, cold storage and data centers",
    ],
  },
  {
    id: "ATS-W2R-4P-220V-110V",
    name: "63A 4P Automatic Transfer Switch 110V/220V - PC Class 50ms Three-Phase+N ATS for Commercial Use",
    slug: "ats-w2r-4p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "4-pole 63A PC class ATS for three-phase 110V/220V systems with neutral. Auto & manual transfer in 50ms, compatible with mains, generator and PV inverter – for hospitals, cold storage, and data centers.",
    description:
      "The ATS-W2R-4P is a PC class (load level) automatic transfer switch for three-phase systems with neutral (3L+N), rated at 63A and supporting both 110V and 220V AC. All four poles – three phases and neutral – switch simultaneously in 50ms, ensuring complete isolation between sources and eliminating any risk of backfeed. When Source A (mains) fails, the unit instantly transfers the load to a generator or PV inverter; once mains is restored, it automatically reverts to Source A priority without manual intervention. Supports both automatic and manual switching modes to suit diverse installation needs. Built on a motor-driven mechanism housed in a PA6 flame-retardant enclosure, the W2R-4P combines three-phase coverage with neutral switching – essential for balanced load distribution in commercial and medical environments such as hospitals, cold-storage facilities, and data centers.",
    features: [
      "4-pole switching (3 Lines + Neutral simultaneously) – 2 inputs / 1 output",
      "PC class (load level) – handles full rated load continuously",
      "Fast 50ms (0.05s) transfer time – load interruption under 50ms",
      "Dual voltage: supports both 110V and 220V AC three-phase with neutral",
      "Auto & manual transfer modes; returns to Source A (mains) automatically",
      "Compatible with mains, generator, and PV inverter sources",
      "PA6 flame-retardant housing with motor-driven mechanism",
      "Neutral switching ensures balanced load distribution in commercial installations",
    ],
    specs: {
      "Poles": "4P (3 Lines + Neutral)",
      "Rated Current": "63A (Operating Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase with Neutral",
      "Type": "PC Class (Load Level)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Source A (Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Transfer Time": " – .05s (50ms)",
      "Housing": "PA6 Flame-retardant",
      "Applications": "Hospitals, Cold Storage, Data Centers",
    },
    image: "/images/products/ATS-W2R-4P(220V 110V)-1.jpg",
    images: [
      "/images/products/ATS-W2R-4P(220V 110V)-1.jpg",
      "/images/products/ATS-W2R-4P(220V 110V)-2.jpg",
      "/images/products/ATS-W2R-4P(220V 110V)-3.jpg",
      "/images/products/ATS-W2R-4P(220V 110V)-4.jpg",
      "/images/products/ATS-W2R-4P(220V 110V)-5.jpg",
      "/images/products/ATS-W2R-4P(220V 110V)-6.jpg",
    ],
    metaTitle: "ATS-W2R 63A 4P ATS 110V/220V | PC Class 50ms Three-Phase+N PV Compatible",
    metaDescription: "ATS-W2R series three-phase 63A 4-pole (3L+N) PC class ATS for 110V and 220V. 50ms auto transfer, compatible with mains, generator and PV inverter. For hospitals, cold storage and data centers.",
    metaKeywords: "ATS-W2R 63A 4P ATS, three-phase neutral transfer switch, 4 pole ATS 110V 220V, PC class ATS, 3L+N ATS, PV inverter ATS, hospital transfer switch, data center ATS",
    imageAlts: [
      "63A 4P ATS-W2R 110V/220V front view – PC class three-phase with neutral transfer switch",
      "ATS-W2R-4P wiring diagram – 4-pole 3L+N 2 inputs 1 output connection",
      "ATS-W2R-4P internal structure – PCB, motor and PA6 flame-retardant housing",
      "63A three-phase ATS-W2R-4P auto and manual switching mode panel",
      "ATS-W2R-4P compatible with mains, generator and PV inverter sources",
      "63A 4-pole 3L+N transfer switch for hospitals, cold storage and data centers",
    ],
  },
  {
    id: "STQ1-63-2P-220V-110V",
    name: "STQ1-63 63A 2P CB Class Auto Transfer Switch 110V/220V - Economical ATS for Home, RV & Fire Protection",
    slug: "stq1-63-2p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "63A 2-pole CB class ATS for single-phase 110V/220V. Mechanical interlock prevents dual-power connection. ~2s auto transfer – an economical choice for home backup, RV, elevators, and fire protection.",
    description:
      "The STQ1-63-2P is a CB class automatic transfer switch for single-phase 110V or 220V AC systems up to 63A, designed as an economical civilian-grade solution for non-critical backup power applications. Unlike PC class switches, the STQ1-63 uses a circuit breaker with mechanical interlock mechanism – physically preventing both power sources from connecting simultaneously. When Normal Power (N/mains) fails, the unit automatically transfers the load to the backup source (generator or PV inverter) in approximately 2 seconds; a brief 2s power interruption occurs during the switchover, which is acceptable for most residential and light-commercial loads. The unit reverts to Normal Power priority automatically once mains is restored. With a maximum load capacity of approximately 6930W ( – .9kW) and compatibility with mains, generator, and PV inverter sources, the STQ1-63-2P is a cost-effective solution for home emergency backup, RV setups, elevators, and fire-protection panel circuits.",
    features: [
      "2-pole switching (Live + Neutral) – 2 inputs / 1 output",
      "CB class – circuit breaker with mechanical interlock, prevents dual-power connection",
      "~2s auto transfer time – brief 2s interruption acceptable for most civilian loads",
      "Dual voltage: supports both 110V and 220V AC single-phase",
      "Auto & manual transfer modes; Normal Power (N) priority with auto return",
      "Compatible with mains, generator, and PV inverter sources",
      "Max load capacity: ~6930W ( – .9kW)",
      "Economical civilian-grade ATS – cost-effective alternative to PC class units",
    ],
    specs: {
      "Poles": "2P (Live + Neutral)",
      "Rated Current": "63A (Working Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Single Phase",
      "Type": "CB Class (Circuit Breaker + Mechanical Interlock)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Normal Power (N / Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Auto Transfer Time": "~2s",
      "Power Interruption": "Brief ~2s during transfer",
      "Max Load Power": "~6930W ( – .9kW)",
      "Internal Components": "PCB Control Board, Motor, Thermal Relay",
      "Applications": "Home Emergency, Fire Protection, Elevators, RV",
    },
    image: "/images/products/STQ1-63-2P(220V 110V)-1.jpg",
    images: [
      "/images/products/STQ1-63-2P(220V 110V)-1.jpg",
      "/images/products/STQ1-63-2P(220V 110V)-2.jpg",
      "/images/products/STQ1-63-2P(220V 110V)-3.jpg",
      "/images/products/STQ1-63-2P(220V 110V)-4.jpg",
      "/images/products/STQ1-63-2P(220V 110V)-5.jpg",
      "/images/products/STQ1-63-2P(220V 110V)-6.jpg",
    ],
    metaTitle: "STQ1-63 63A 2P CB Class ATS 110V/220V | Economical Auto Transfer Switch",
    metaDescription: "STQ1-63 series 63A 2-pole CB class ATS for single-phase 110V/220V. Mechanical interlock, ~2s transfer, max 6.9kW. For home backup, RV, fire protection and elevator applications.",
    metaKeywords: "STQ1-63 ATS, 63A CB class transfer switch, 2P auto transfer switch, 110V 220V ATS, mechanical interlock ATS, home backup ATS, RV transfer switch, fire protection ATS, elevator ATS, economical ATS",
    imageAlts: [
      "STQ1-63 63A 2P CB class ATS 110V/220V front view – economical auto transfer switch",
      "STQ1-63-2P wiring diagram – 2-pole 2 inputs 1 output connection",
      "STQ1-63-2P internal components – PCB control board, motor and thermal relay",
      "STQ1-63 mechanical interlock mechanism – prevents dual-power connection",
      "63A single-phase ATS auto and manual switching mode panel",
      "STQ1-63-2P transfer switch for home emergency, fire protection, elevator and RV",
    ],
  },
  {
    id: "STQ1-63-3P-220V-110V",
    name: "STQ1-63 63A 3P CB Class Auto Transfer Switch 110V/220V - Three-Phase ATS for Industrial Equipment & Motors",
    slug: "stq1-63-3p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "63A 3-pole CB class ATS for three-phase 110V/220V. Mechanical interlock, ~2s auto transfer, max ~22kW – a cost-effective solution for industrial equipment, commercial elevators, and three-phase motors.",
    description:
      "The STQ1-63-3P is a CB class automatic transfer switch for three-phase 110V or 220V AC systems up to 63A, offering a cost-effective industrial solution for non-critical three-phase loads. All three poles switch simultaneously using a circuit breaker with mechanical interlock, physically preventing both power sources from connecting at the same time. When Normal Power (N/mains) fails, the unit automatically transfers to the backup supply (generator or PV inverter) in approximately 2 seconds; a brief ~2s power interruption occurs during switchover, which is acceptable for most industrial and commercial equipment. The unit automatically reverts to Normal Power priority once mains is restored. With a maximum load capacity of approximately 22kW across three phases, the STQ1-63-3P is well suited for powering industrial equipment, commercial elevators, three-phase motors, and other heavy loads where PC class switching speed is not required.",
    features: [
      "3-pole switching (3 Lines simultaneously, no neutral) – 2 inputs / 1 output",
      "CB class – circuit breaker with mechanical interlock, prevents dual-power connection",
      "~2s auto transfer time – brief 2s interruption acceptable for industrial loads",
      "Dual voltage: supports both 110V and 220V AC three-phase",
      "Auto & manual transfer modes; Normal Power (N) priority with auto return",
      "Compatible with mains, generator, and PV inverter sources",
      "Max load capacity: ~22kW (three-phase)",
      "Cost-effective CB class solution for industrial and commercial applications",
    ],
    specs: {
      "Poles": "3P (Triple-Pole, Simultaneous Switching)",
      "Rated Current": "63A (Working Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase",
      "Type": "CB Class (Circuit Breaker + Mechanical Interlock)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Normal Power (N / Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Auto Transfer Time": "~2s",
      "Power Interruption": "Brief ~2s during transfer",
      "Max Load Power": "~22kW (Three-Phase)",
      "Internal Components": "PCB Control Board, Motor, Thermal Relay",
      "Applications": "Industrial Equipment, Commercial Elevators, Three-Phase Motors",
    },
    image: "/images/products/STQ1-63-3P(220V 110V)-1.jpg",
    images: [
      "/images/products/STQ1-63-3P(220V 110V)-1.jpg",
      "/images/products/STQ1-63-3P(220V 110V)-2.jpg",
      "/images/products/STQ1-63-3P(220V 110V)-3.jpg",
      "/images/products/STQ1-63-3P(220V 110V)-4.jpg",
      "/images/products/STQ1-63-3P(220V 110V)-5.jpg",
      "/images/products/STQ1-63-3P(220V 110V)-6.jpg",
    ],
    metaTitle: "STQ1-63 63A 3P CB Class ATS 110V/220V | Three-Phase Auto Transfer Switch",
    metaDescription: "STQ1-63 series 63A 3-pole CB class ATS for three-phase 110V/220V. Mechanical interlock, ~2s transfer, max 22kW. For industrial equipment, commercial elevators and three-phase motors.",
    metaKeywords: "STQ1-63 3P ATS, three-phase CB class transfer switch, 63A 3 pole ATS, industrial auto transfer switch, commercial elevator ATS, three-phase motor ATS, mechanical interlock ATS, cost-effective ATS",
    imageAlts: [
      "STQ1-63 63A 3P CB class ATS 110V/220V front view – three-phase auto transfer switch",
      "STQ1-63-3P wiring diagram – 3-pole 2 inputs 1 output connection",
      "STQ1-63-3P internal components – PCB control board, motor and thermal relay",
      "STQ1-63 three-phase mechanical interlock mechanism – prevents dual-power connection",
      "63A three-phase ATS auto and manual switching mode panel",
      "STQ1-63-3P transfer switch for industrial equipment, elevators and three-phase motors",
    ],
  },
  {
    id: "STQ1-63-4P-220V-110V",
    name: "STQ1-63 63A 4P CB Class Auto Transfer Switch 110V/220V - Three-Phase+N ATS for Hospitals & Cold Storage",
    slug: "stq1-63-4p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "63A 4-pole CB class ATS for three-phase 110V/220V with neutral. Mechanical interlock + over/under-voltage protection, ~2s auto transfer, supports mixed 3-phase and single-phase loads – for hospitals, cold storage, and data centers.",
    description:
      "The STQ1-63-4P is a CB class automatic transfer switch for three-phase systems with neutral (3L+N), rated at 63A and supporting both 110V and 220V AC. By switching all four poles – three phases and neutral – simultaneously, it enables use with mixed three-phase and single-phase loads in the same installation, making it ideal for facilities such as hospitals, cold-storage plants, and data centers where neutral is essential for balanced distribution. Built-in mechanical interlock physically prevents both power sources from connecting at the same time. Additional over-voltage and under-voltage protection continuously monitors the supply, adding an extra layer of protection not present in the 3P version. When Normal Power (N/mains) fails, the unit transfers to the backup supply (generator or PV inverter) in approximately 2 seconds; a brief ~2s outage occurs during switchover. Once mains is restored, it reverts to Normal Power priority automatically. Maximum load capacity is approximately 13.9kW (13870W).",
    features: [
      "4-pole switching (3 Lines + Neutral simultaneously) – 2 inputs / 1 output",
      "CB class – circuit breaker with mechanical interlock, prevents dual-power connection",
      "Over-voltage & under-voltage protection – added safety beyond the 3P version",
      "~2s auto transfer time – brief 2s interruption acceptable for commercial loads",
      "Dual voltage: supports both 110V and 220V AC; compatible with 3-phase and single-phase loads",
      "Auto & manual transfer modes; Normal Power (N) priority with auto return",
      "Compatible with mains, generator, and PV inverter sources",
      "Max load capacity: ~13.9kW (13870W)",
    ],
    specs: {
      "Poles": "4P (3 Lines + Neutral)",
      "Rated Current": "63A (Working Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase with Neutral (compatible with 3-phase & single-phase loads)",
      "Type": "CB Class (Circuit Breaker + Mechanical Interlock)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Normal Power (N / Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Auto Transfer Time": "~2s",
      "Power Interruption": "Brief ~2s during transfer",
      "Protection": "Mechanical Interlock, Over-voltage & Under-voltage",
      "Max Load Power": "~13.9kW (13870W)",
      "Internal Components": "PCB Control Board, Motor, Thermal Relay",
      "Applications": "Hospitals, Cold Storage, Data Centers",
    },
    image: "/images/products/STQ1-63-4P(220V 110V)-1.jpg",
    images: [
      "/images/products/STQ1-63-4P(220V 110V)-1.jpg",
      "/images/products/STQ1-63-4P(220V 110V)-2.jpg",
      "/images/products/STQ1-63-4P(220V 110V)-3.jpg",
      "/images/products/STQ1-63-4P(220V 110V)-4.jpg",
      "/images/products/STQ1-63-4P(220V 110V)-5.jpg",
      "/images/products/STQ1-63-4P(220V 110V)-6.jpg",
    ],
    metaTitle: "STQ1-63 63A 4P CB Class ATS 110V/220V | Three-Phase+N Auto Transfer Switch",
    metaDescription: "STQ1-63 series 63A 4-pole (3L+N) CB class ATS for 110V/220V. Mechanical interlock, over/under-voltage protection, ~2s transfer, max 13.9kW. For hospitals, cold storage and data centers.",
    metaKeywords: "STQ1-63 4P ATS, four-pole CB class transfer switch, 63A 3L+N ATS, hospital auto transfer switch, cold storage ATS, data center ATS, three-phase neutral ATS, mechanical interlock ATS",
    imageAlts: [
      "STQ1-63 63A 4P CB class ATS 110V/220V front view – three-phase with neutral transfer switch",
      "STQ1-63-4P wiring diagram – 4-pole 3L+N 2 inputs 1 output connection",
      "STQ1-63-4P internal components – PCB control board, motor and thermal relay",
      "STQ1-63-4P over-voltage and under-voltage protection settings",
      "63A four-pole ATS auto and manual switching mode panel",
      "STQ1-63-4P transfer switch for hospitals, cold storage and data centers",
    ],
  },
  {
    id: "STQ2-63-2P-220V-110V",
    name: "STQ2-63 63A 2P CB Class Auto Transfer Switch 110V/220V - Economical Single-Phase ATS for Home & RV",
    slug: "stq2-63-2p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "63A 2-pole CB class ATS for single-phase 110V/220V. Mechanical interlock, ~2s auto transfer, max ~6.9kW – an economical civilian ATS for home emergency backup, RV, fire protection, and elevators.",
    description:
      "The STQ2-63-2P is a CB class automatic transfer switch for single-phase 110V or 220V AC systems up to 63A, designed as an economical civilian-grade backup power solution. Using a circuit breaker with mechanical interlock mechanism, it physically prevents both power sources from being connected simultaneously. When Normal Power (N/mains) fails, the unit automatically switches to the backup supply (generator or PV inverter) in approximately 2 seconds; a brief ~2s power outage occurs during transfer, which is acceptable for most residential and light-duty loads. Once mains is restored, the unit reverts to Normal Power priority automatically. With a maximum load capacity of approximately 6930W ( – .9kW) and support for both auto and manual switching modes, the STQ2-63-2P is a straightforward, cost-effective choice for home emergency backup, RV power systems, fire-protection panels, elevator circuits, and general backup power applications.",
    features: [
      "2-pole switching (Live + Neutral) – 2 inputs / 1 output",
      "CB class – circuit breaker with mechanical interlock, prevents dual-power connection",
      "~2s auto transfer time – brief 2s interruption acceptable for civilian loads",
      "Dual voltage: supports both 110V and 220V AC single-phase",
      "Auto & manual transfer modes; Normal Power (N) priority with auto return",
      "Compatible with mains, generator, and PV inverter sources",
      "Max load capacity: ~6930W ( – .9kW)",
      "Economical civilian-grade ATS – cost-effective alternative to PC class units",
    ],
    specs: {
      "Poles": "2P (Live + Neutral)",
      "Rated Current": "63A (Working Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Single Phase",
      "Type": "CB Class (Circuit Breaker + Mechanical Interlock)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Normal Power (N / Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Auto Transfer Time": "~2s",
      "Power Interruption": "Brief ~2s during transfer",
      "Max Load Power": "~6930W ( – .9kW)",
      "Internal Components": "PCB Control Board, Motor, Thermal Relay",
      "Applications": "Home Emergency, Fire Protection, Elevators, RV",
    },
    image: "/images/products/STQ2-63-2P(220V 110V)-1.jpg",
    images: [
      "/images/products/STQ2-63-2P(220V 110V)-1.jpg",
      "/images/products/STQ2-63-2P(220V 110V)-2.jpg",
      "/images/products/STQ2-63-2P(220V 110V)-3.jpg",
      "/images/products/STQ2-63-2P(220V 110V)-4.jpg",
      "/images/products/STQ2-63-2P(220V 110V)-5.jpg",
      "/images/products/STQ2-63-2P(220V 110V)-6.jpg",
    ],
    metaTitle: "STQ2-63 63A 2P CB Class ATS 110V/220V | Economical Single-Phase Transfer Switch",
    metaDescription: "STQ2-63 series 63A 2-pole CB class ATS for single-phase 110V/220V. Mechanical interlock, ~2s transfer, max 6.9kW. For home backup, RV, fire protection and elevator applications.",
    metaKeywords: "STQ2-63 ATS, 63A CB class transfer switch, 2P single-phase ATS, 110V 220V ATS, mechanical interlock ATS, home backup ATS, RV transfer switch, fire protection ATS, economical ATS",
    imageAlts: [
      "STQ2-63 63A 2P CB class ATS 110V/220V front view – economical single-phase auto transfer switch",
      "STQ2-63-2P wiring diagram – 2-pole 2 inputs 1 output connection",
      "STQ2-63-2P internal components – PCB control board, motor and thermal relay",
      "STQ2-63 mechanical interlock mechanism – prevents dual-power connection",
      "63A single-phase STQ2 ATS auto and manual switching mode panel",
      "STQ2-63-2P transfer switch for home emergency, fire protection, elevator and RV",
    ],
  },
  {
    id: "STQ2-63-3P-220V-110V",
    name: "STQ2-63 63A 3P CB Class Auto Transfer Switch 110V/220V - Three-Phase ATS for Industrial Equipment & Motors",
    slug: "stq2-63-3p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "63A 3-pole CB class ATS for three-phase 110V/220V (no neutral). Mechanical interlock, ~2s auto transfer, max ~22kW – a cost-effective solution for industrial equipment, commercial elevators, and three-phase motors.",
    description:
      "The STQ2-63-3P is a CB class automatic transfer switch for three-phase 110V or 220V AC systems up to 63A, offering a cost-effective industrial solution for non-critical three-phase loads. All three poles switch simultaneously using a circuit breaker with mechanical interlock, physically preventing both power sources from connecting at the same time. When Normal Power (N/mains) fails, the unit automatically transfers to the backup supply (generator or PV inverter) in approximately 2 seconds; a brief ~2s power interruption occurs during switchover, which is acceptable for most industrial and commercial equipment. The unit automatically reverts to Normal Power priority once mains is restored. With a maximum load capacity of approximately 22kW across three phases and support for both auto and manual switching modes, the STQ2-63-3P is a straightforward, cost-effective choice for powering industrial equipment, commercial elevators, three-phase motors, and other heavy loads where PC class switching speed is not required.",
    features: [
      "3-pole switching (3 Lines simultaneously, no neutral) – 2 inputs / 1 output",
      "CB class – circuit breaker with mechanical interlock, prevents dual-power connection",
      "~2s auto transfer time – brief 2s interruption acceptable for industrial loads",
      "Dual voltage: supports both 110V and 220V AC three-phase",
      "Auto & manual transfer modes; Normal Power (N) priority with auto return",
      "Compatible with mains, generator, and PV inverter sources",
      "Max load capacity: ~22kW (three-phase)",
      "Cost-effective CB class solution for industrial and commercial applications",
    ],
    specs: {
      "Poles": "3P (Triple-Pole, Simultaneous Switching)",
      "Rated Current": "63A (Working Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase",
      "Type": "CB Class (Circuit Breaker + Mechanical Interlock)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Normal Power (N / Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Auto Transfer Time": "~2s",
      "Power Interruption": "Brief ~2s during transfer",
      "Max Load Power": "~22kW (Three-Phase)",
      "Internal Components": "PCB Control Board, Motor, Thermal Relay",
      "Applications": "Industrial Equipment, Commercial Elevators, Three-Phase Motors",
    },
    image: "/images/products/STQ2-63-3P(220V 110V)-1.jpg",
    images: [
      "/images/products/STQ2-63-3P(220V 110V)-1.jpg",
      "/images/products/STQ2-63-3P(220V 110V)-2.jpg",
      "/images/products/STQ2-63-3P(220V 110V)-3.jpg",
      "/images/products/STQ2-63-3P(220V 110V)-4.jpg",
      "/images/products/STQ2-63-3P(220V 110V)-5.jpg",
      "/images/products/STQ2-63-3P(220V 110V)-6.jpg",
    ],
    metaTitle: "STQ2-63 63A 3P CB Class ATS 110V/220V | Three-Phase Auto Transfer Switch",
    metaDescription: "STQ2-63 series 63A 3-pole CB class ATS for three-phase 110V/220V. Mechanical interlock, ~2s transfer, max 22kW. For industrial equipment, commercial elevators and three-phase motors.",
    metaKeywords: "STQ2-63 3P ATS, three-phase CB class transfer switch, 63A 3 pole ATS, industrial auto transfer switch, commercial elevator ATS, three-phase motor ATS, mechanical interlock ATS, cost-effective industrial ATS",
    imageAlts: [
      "STQ2-63 63A 3P CB class ATS 110V/220V front view – three-phase auto transfer switch",
      "STQ2-63-3P wiring diagram – 3-pole 2 inputs 1 output connection",
      "STQ2-63-3P internal components – PCB control board, motor and thermal relay",
      "STQ2-63 three-phase mechanical interlock mechanism – prevents dual-power connection",
      "63A three-phase STQ2 ATS auto and manual switching mode panel",
      "STQ2-63-3P transfer switch for industrial equipment, elevators and three-phase motors",
    ],
  },
  {
    id: "STQ2-63-4P-220V-110V",
    name: "STQ2-63 63A 4P CB Class Auto Transfer Switch 110V/220V - Three-Phase+N ATS for Hospitals & Cold Storage",
    slug: "stq2-63-4p-63a-110v-220v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "63A 4-pole CB class ATS for three-phase 110V/220V with neutral. Mechanical interlock + over/under-voltage protection, ~2s auto transfer, supports mixed 3-phase and single-phase loads – for hospitals, cold storage, and data centers.",
    description:
      "The STQ2-63-4P is a CB class automatic transfer switch for three-phase systems with neutral (3L+N), rated at 63A and supporting both 110V and 220V AC. By switching all four poles – three phases and neutral – simultaneously, it enables use with mixed three-phase and single-phase loads in the same installation, making it well suited for facilities such as hospitals, cold-storage plants, and data centers where neutral is essential for balanced distribution. Built-in mechanical interlock physically prevents both power sources from connecting at the same time. Additional over-voltage and under-voltage protection continuously monitors the supply for an extra layer of safety. When Normal Power (N/mains) fails, the unit transfers to the backup supply (generator or PV inverter) in approximately 2 seconds; a brief ~2s outage occurs during switchover. Once mains is restored, it reverts to Normal Power priority automatically. Maximum load capacity is approximately 13.9kW (13870W).",
    features: [
      "4-pole switching (3 Lines + Neutral simultaneously) – 2 inputs / 1 output",
      "CB class – circuit breaker with mechanical interlock, prevents dual-power connection",
      "Over-voltage & under-voltage protection – added safety beyond the 3P version",
      "~2s auto transfer time – brief 2s interruption acceptable for commercial loads",
      "Dual voltage: supports both 110V and 220V AC; compatible with 3-phase and single-phase loads",
      "Auto & manual transfer modes; Normal Power (N) priority with auto return",
      "Compatible with mains, generator, and PV inverter sources",
      "Max load capacity: ~13.9kW (13870W)",
    ],
    specs: {
      "Poles": "4P (3 Lines + Neutral)",
      "Rated Current": "63A (Working Range: 6A – 63A)",
      "Rated Voltage": "110V / 220V AC",
      "Frequency": "50/60Hz",
      "Phase": "Three-Phase with Neutral (compatible with 3-phase & single-phase loads)",
      "Type": "CB Class (Circuit Breaker + Mechanical Interlock)",
      "I/O Configuration": "2 Inputs / 1 Output",
      "Priority Source": "Normal Power (N / Mains)",
      "Compatible Sources": "Mains, Generator, PV Inverter",
      "Switching Mode": "Auto & Manual",
      "Auto Transfer Time": "~2s",
      "Power Interruption": "Brief ~2s during transfer",
      "Protection": "Mechanical Interlock, Over-voltage & Under-voltage",
      "Max Load Power": "~13.9kW (13870W)",
      "Internal Components": "PCB Control Board, Motor, Thermal Relay",
      "Applications": "Hospitals, Cold Storage, Data Centers",
    },
    image: "/images/products/STQ2-63-4P(220V 110V)-1.jpg",
    images: [
      "/images/products/STQ2-63-4P(220V 110V)-1.jpg",
      "/images/products/STQ2-63-4P(220V 110V)-2.jpg",
      "/images/products/STQ2-63-4P(220V 110V)-3.jpg",
      "/images/products/STQ2-63-4P(220V 110V)-4.jpg",
      "/images/products/STQ2-63-4P(220V 110V)-5.jpg",
      "/images/products/STQ2-63-4P(220V 110V)-6.jpg",
    ],
    metaTitle: "STQ2-63 63A 4P CB Class ATS 110V/220V | Three-Phase+N Auto Transfer Switch",
    metaDescription: "STQ2-63 series 63A 4-pole (3L+N) CB class ATS for 110V/220V. Mechanical interlock, over/under-voltage protection, ~2s transfer, max 13.9kW. For hospitals, cold storage and data centers.",
    metaKeywords: "STQ2-63 4P ATS, four-pole CB class transfer switch, 63A 3L+N ATS, hospital auto transfer switch, cold storage ATS, data center ATS, three-phase neutral ATS, mechanical interlock ATS",
    imageAlts: [
      "STQ2-63 63A 4P CB class ATS 110V/220V front view – three-phase with neutral transfer switch",
      "STQ2-63-4P wiring diagram – 4-pole 3L+N 2 inputs 1 output connection",
      "STQ2-63-4P internal components – PCB control board, motor and thermal relay",
      "STQ2-63-4P over-voltage and under-voltage protection settings",
      "63A four-pole STQ2 ATS auto and manual switching mode panel",
      "STQ2-63-4P transfer switch for hospitals, cold storage and data centers",
    ],
  },
  // Aerosol Fire Extinguisher
  {
    id: "Aerosol-DIN-Rail",
    name: "DIN Rail Thermal Aerosol Fire Extinguishing Device",
    slug: "din-rail-aerosol-fire-extinguisher",
    categorySlug: "aerosol-fire-extinguisher",
    categoryName: "Aerosol Fire Extinguisher",
    shortDescription: "Passive DIN-rail thermal aerosol fire sticker for distribution cabinets, PV combiner boxes and electrical enclosures. 170°C self-activation, no power or wiring required.",
    description:
      "The Soltree DIN Rail Thermal Aerosol Fire Extinguishing Device — also known as an electrical cabinet automatic fire sticker — is purpose-built for closed electrical enclosures such as distribution cabinets, switch cabinets, PV combiner boxes, meter boxes and communication cabinets. Its fully passive heat-sensitive design requires no external power supply and no wiring: once the ambient temperature reaches 170°C or an open flame is detected, the unit self-activates within 6 seconds and rapidly releases thermal aerosol to suppress incipient electrical fires at the source. Dual installation modes — 35mm DIN rail clip and industrial-grade self-adhesive backing — allow fast retrofit into both new and existing cabinets. The pressure-free storage design eliminates leakage and burst risks, while the aerosol agent leaves no residue and causes no corrosion to PCBs, relays or copper busbars. With a -50°C to +90°C operating range, 10-year service life and completely maintenance-free operation, it is the ideal fire safety solution for electrical distribution and new energy equipment. Manufactured in our ISO 9001 certified facility with 15 years of electrical protection expertise and 200+ projects delivered across 10+ countries.",
    features: [
      "Passive heat activation at 170°C — no power, no wiring, no control panel required",
      "≤6 seconds spray response — suppresses electrical fires at the initial stage",
      "Dual mounting: 35mm DIN rail clip + self-adhesive backing for fast retrofit",
      "Pressure-free storage — no leakage, no burst risk, safe long-term standby",
      "No residue, no corrosion to PCBs, relays and copper busbars after discharge",
      "Wide -50°C to +90°C operating range — suitable for outdoor PV and telecom cabinets",
      "10-year service life, fully maintenance-free — install once and forget",
      "Protects 0.1m³ to 0.3m³ enclosures — covers most combiner boxes and distribution cabinets",
      "Eco-friendly thermal aerosol agent, safe for personnel and equipment",
      "OEM / ODM customization available — logo, label, capacity on request",
    ],
    specs: {
      "Product Name": "DIN Rail Thermal Aerosol Fire Extinguishing Device",
      "Alias": "Electrical Cabinet Automatic Fire Sticker",
      "Extinguishing Medium": "Thermal Aerosol",
      "Trigger Temperature": "170°C Heat-Sensitive Activation",
      "Activation Mode": "Heat Induction / Open Flame Trigger",
      "Spray Response Time": "≤6 Seconds",
      "Optional Specification": "10g, 20g, 30g",
      "Protected Volume": "0.1 m³ ~ 0.3 m³",
      "Installation Type": "DIN Rail (35mm) / Self-adhesive Mounting",
      "Power Supply": "Passive — No External Power Needed",
      "Storage Condition": "Normal Pressure, Pressureless",
      "Working Temperature": "-50°C ~ +90°C",
      "Relative Humidity": "≤95%RH",
      "Housing Material": "Flame-Retardant ABS",
      "Spray Design": "Dual Nozzle Directional Ejection",
      "Service Life": "10 Years",
      "Maintenance": "Maintenance-Free, No Residue",
      "Application": "Distribution Cabinet, PV Combiner Box, Switch Cabinet, Meter Box, Communication Cabinet",
      "Fire Grade": "Special Grade for Electrical Equipment",
      "Safety Performance": "High-Temperature Resistant, Eco-Friendly",
    },
    image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-1.jpg",
    images: [
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-1.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-2.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-3.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-4.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-5.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-6.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-7.jpg",
      "/images/products/Aerosol-Fire-Extinguishing-Sticker-8.jpg",
    ],
    badge: "New",
    metaTitle: "DIN Rail Aerosol Fire Extinguisher for Cabinets | Soltree",
    metaDescription: "Soltree DIN rail aerosol fire extinguisher for distribution cabinets & PV combiner boxes. 170°C auto-activation, passive, maintenance-free. OEM, worldwide shipping.",
    metaKeywords: "aerosol fire extinguisher, electrical cabinet fire sticker, DIN rail fire extinguisher, PV combiner box fire protection, distribution cabinet fire suppression, automatic fire extinguishing device, thermal aerosol fire suppression, switchgear fire protection",
    imageAlts: [
      "Soltree DIN rail thermal aerosol fire extinguishing device front view",
      "DIN rail thermal aerosol fire sticker mounted inside electrical distribution cabinet",
      "Thermal aerosol fire extinguisher self-adhesive backing installation detail",
      "Aerosol fire extinguishing device dual nozzle directional spray design",
      "DIN rail aerosol fire sticker installed in PV combiner box for solar array protection",
      "Thermal aerosol fire extinguisher 10g 20g 30g capacity options comparison",
      "Aerosol fire extinguishing device product dimensions and size drawing",
      "DIN rail aerosol fire extinguisher certification label and packaging",
    ],
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: "din-rail-aerosol-fire-extinguisher-china-sourcing-guide",
    title: "Din Rail Aerosol Fire Extinguisher: 2026 China Sourcing Guide for B2B Buyers",
    excerpt:
      "The complete B2B buyer's guide to sourcing din rail aerosol fire extinguishers from China in 2026. Specifications, certifications, supplier vetting, pricing, MOQ and shipping logistics — everything importers, distributors and EPC procurement teams need to source confidently.",
    content: `
In 2025, electrical-cabinet fires caused more than **USD 1.2 billion in industrial property losses globally** — and most of those fires began in spaces no larger than a shoebox. A modern din rail aerosol fire extinguisher, often costing under USD 50 wholesale, can detect and suppress that same fire in **under three seconds**, before it ever reaches the cable trays.

If you import, distribute, or specify electrical fire-protection equipment, the case for adopting this category has rarely been stronger. The harder question is *where to source from*. Right now, China produces an estimated 60–70% of the world's [din rail aerosol extinguishers](/categories/aerosol-fire-extinguisher) across more than 80 active OEM factories. Quality varies. Pricing varies even more. Certifications can be a minefield.

This guide is the operating manual for buying din rail aerosol fire extinguishers from China in 2026. It walks through the technology, the specifications that actually matter, the certifications you cannot skip, the supplier red flags that should kill a deal, realistic pricing ranges, MOQ and lead-time expectations, and a representative EPC deployment that ties it all together.

> **Who this guide is for:** importers, distributors, EPC procurement teams, and electrical engineers responsible for cabinet-level fire protection in switchgear, BESS, EV charging, telecom, data center, and rail applications.

## Why Source Din Rail Aerosol Extinguishers from China

China's leadership in this category is not accidental. It sits on top of three converging supply chains, each of which is hard to replicate elsewhere.

### A Vertically Integrated Chemical and Component Base

The active suppression agent in a condensed aerosol extinguisher — typically a potassium-salt formulation built around potassium nitrate, potassium carbonate, and proprietary stabilizers — is produced almost entirely within Chinese specialty-chemicals clusters in Shandong, Jiangsu, and Sichuan. The plastic and aluminum housings, the DIN 35 mm rail clips, the thermal-trigger glass bulbs, and the electric initiation modules are all sourced within a 500 km radius of the major assembly hubs in Zhejiang and Guangdong. A typical EU-based assembler, by comparison, imports 70–90% of these inputs — and pays a premium for it.

### Cost Structure: 40–60% Lower Landed Cost

Independent benchmarking by sourcing consultancies in 2025 placed Chinese FOB prices at roughly **40–60% below comparable EU-manufactured units** of equivalent specification. The largest contributors are labor cost on assembly and certification testing, mold and tooling amortization spread across millions of annual units, and direct access to upstream chemical suppliers. None of these are likely to compress meaningfully before 2028.

### Manufacturing Depth and Certification Fluency

The top-tier Chinese factories now carry CE [EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010), [UL 2775](https://www.shopulstandards.com/ProductDetail.aspx?productId=UL2775), CCC, and frequently SASO, INMETRO, or KC certifications on the same product line — which means a single SKU can serve EU, North American, GCC, Brazilian, and Korean markets with only documentation differences. A decade ago this multi-market readiness was rare; today it is the baseline for any manufacturer worth shortlisting.

### Risks You Must Manage

Sourcing from China is not without friction. The most common failure modes:

- **Specification drift** between sample units and bulk production
- **Counterfeit or expired test reports** sold by unaccredited labs
- **MOQ creep** at the contract stage versus quotation stage
- **Hazardous-goods misclassification** that delays customs

We address each of these in the supplier vetting section below.

## What Is a Din Rail Aerosol Fire Extinguisher?

A **din rail aerosol fire extinguisher** is a self-contained, modular fire-suppression device designed to mount on the standard 35 mm DIN rail used inside low-voltage electrical enclosures. When activated, it discharges a cloud of microparticles — the "condensed aerosol" — that floods the protected volume and interrupts the chemical chain reaction of combustion at a molecular level.

![Working principle of a condensed aerosol fire extinguisher — potassium aerosol microparticles capturing free radicals to extinguish electrical cabinet fires](/images/blog/din-rail-aerosol-working-principle.svg)

### How It Works in One Paragraph

When the trigger is activated (either by heat reaching the rated temperature on a thermal bulb, or by an electric signal from a fire panel), a solid aerosol-forming compound inside the canister combusts in a non-explosive, controlled reaction. This produces a fine mist of potassium-rich particles, suspended in inert gases. Those particles capture the free radicals (H, OH, O) that normally sustain a flame, ending the fire typically within 1–3 seconds in cabinet-sized volumes.

### How It Differs From Traditional Suppression

| Method | Residue | Response time | Pipework | Cabinet-suitable |
|---|---|---|---|---|
| Water / sprinkler | High | 30+ s | Yes | No |
| Foam | High | 10+ s | Yes | No |
| CO2 | None | 5–15 s | Yes | Marginal (asphyxiation risk) |
| FM-200 / Novec 1230 | None | 5–10 s | Yes | Yes (but expensive) |
| **Condensed aerosol (din rail)** | **Negligible** | **1–3 s** | **No** | **Yes** |

The four properties that make the din rail format dominant inside electrical cabinets are: **no piping**, **no residue on energized equipment**, **second-level response**, and **a 10-year service life with effectively no maintenance**.

## Top Applications and Market Demand in 2026

Three macro forces are pulling demand for din rail aerosol extinguishers upward in 2026: the global energy storage build-out, EV charging infrastructure mandates in the EU and North America, and AI-driven data center expansion. Below are the verticals where a typical Chinese manufacturer ships the highest volumes today.

![Top applications for din rail aerosol fire extinguishers — BESS battery storage, solar PV combiner box, EV charging station, data center PDU, telecom cabinet and rail signaling](/images/blog/din-rail-aerosol-applications.svg)

| Vertical | Typical use case | 2026 demand driver |
|---|---|---|
| Battery energy storage (BESS) | PCS cabinet, BMS panel | Global BESS deployments forecast at +40–50% YoY |
| Solar PV | [Combiner box](/categories/pv-combiner-box), inverter cabinet | Distributed PV growth across EMEA, LATAM |
| EV charging | Charger control cabinet | EU AFIR mandate, NEVI rollout in the US |
| Data centers | Row-PDU, RDHX, rack-level | AI capex; UPS-room ignition cases |
| Telecom / 5G | Power cabinet, BBU shelter | Network density, outdoor cabinet exposure |
| Rail transit | Signaling cabinet | EN 50553 fire-safety compliance |
| Industrial automation | MCC, VFD enclosure | Aging installed base + insurance requirements |
| Marine / offshore | Switchboard cabinet | DNV / Lloyd's requirements for unmanned engine rooms |
| Building electrical | Main distribution panel | Insurer-driven retrofits |

## Technical Specifications That Matter

The category looks deceptively simple — a small canister on a DIN rail. In practice, getting the specification right is the difference between a unit that suppresses an incipient fire and a unit that fires too late, fires under-dosed, or never fires at all. The seven parameters below are the ones any serious procurement file should pin down.

![Specification comparison of din rail aerosol fire extinguishers across 20g, 50g, 100g, 200g and 500g agent mass SKUs with rated cabinet volume and operating temperature range](/images/blog/din-rail-aerosol-specs-comparison.svg)

### Agent Mass

Agent mass — the weight of aerosol-forming compound inside the canister — directly determines the protected volume. Common SKUs ship at **20 g, 50 g, 100 g, 200 g, and 500 g**. As a rough rule of thumb, 1 g of agent protects roughly 0.01 m³ (10 L) of cabinet volume at the standard 100 g/m³ design concentration. A 100 g unit therefore covers a typical 1 m³ low-voltage distribution cabinet.

### Design Concentration

The **design concentration** is the agent-mass-to-volume ratio required to extinguish the relevant fuel class. The reference figures most factories design around:

- **100 g/m³** — Class A surface fires (cable insulation, plastics)
- **120 g/m³** — Class B liquid fires (oil-filled equipment)
- **140 g/m³** — high-risk lithium-battery enclosures (rising standard for BESS)

Always confirm which value the supplier's tested concentration is — published "rated volume" figures are sometimes calculated against the lowest concentration without disclosure.

### Activation Modes

There are three activation architectures:

- **Thermal-only** — a glass bulb breaks at a rated temperature (typically 70 °C, 93 °C, or 110 °C). Simplest, no wiring required, fully autonomous.
- **Electric-only** — fired by a 24 V signal from a fire-detection panel. Required when integration with building management or BESS BMS is needed.
- **Dual-mode (thermal + electric)** — both paths active. Highest reliability; standard for safety-critical applications.

### Discharge Time

Industry-grade units discharge in **3 seconds or less**. Anything slower than 5 seconds in a cabinet-scale enclosure raises questions about the agent grain geometry or compound formulation. Insist on seeing the discharge curve from the test report, not just the peak number.

### Operating and Storage Temperature

Standard operating range is **−40 °C to +85 °C**, with extended-range SKUs available to +95 °C for outdoor BESS containers. Storage temperature matters too: shipments crossing the equator should specify SKUs validated to +95 °C container conditions to avoid premature thermal degradation.

### Service Life

Reputable manufacturers warrant **10 years from date of manufacture**, with some now extending to 15 years on premium SKUs. The limiting factor is typically the thermal bulb or the electric initiator's shelf chemistry, not the aerosol compound itself.

### Form Factor and DIN Slot Count

Standard form factors:

- **1U (18 mm)** — equivalent to a single MCB; lowest agent mass (typically up to 30 g)
- **2U (36 mm)** — most popular SKU for distribution panels
- **4U or larger** — for higher agent masses and larger cabinets

When a project requires multiple cabinets of varying volumes, standardizing on two SKUs (small + medium) usually covers more than 90% of the cabinet population without inventory complexity.

## OEM, ODM, and Customization Options

Most Chinese manufacturers in this category accept three tiers of customization. Understanding which tier a project actually needs prevents both overpaying for unnecessary engineering and underspecifying for a brand-critical deployment.

### Tier 1 — Private Label / White Label

The product is technically standard. Customization is cosmetic only:

- Custom **logo and brand name** on the housing label
- **Bilingual or multilingual** instruction labels
- **Custom packaging**: branded box, multilingual user manual, custom inner trays
- Custom **color** on the housing (within available molded colors)

Typical MOQ: **300–500 units**. Lead time: **30–40 days**. Tooling cost: **minimal to none**.

### Tier 2 — OEM with Mechanical or Electrical Changes

The product platform is standard, but specific modules are reconfigured:

- Different **activation thresholds** (for example, 88 °C bulb instead of 93 °C)
- Custom **electrical interfaces** (specific connector types, monitoring contacts, end-of-line resistors)
- Custom **status LED** color or behavior
- Reinforced housing for marine or rail-grade vibration

Typical MOQ: **1,000–2,000 units**. Lead time: **45–60 days**. Tooling cost: **USD 1,500–8,000** depending on scope.

### Tier 3 — Full ODM

A new product platform is developed against the customer's brief. Examples include integrated Modbus-RTU monitoring, novel form factors, or proprietary agent formulations for specialized fuel classes.

Typical MOQ: **5,000+ units** or NRE recovery agreement. Lead time: **4–9 months including type testing and certification**. Cost: project-by-project.

### What Cannot Be Customized

The agent's core chemistry, the ratio between fuel and oxidizer, and the safety-critical separation between the initiator and the agent grain are **not** customizable on a project basis. Any factory willing to "tune" these for a quick order is a red flag.

## Certifications You Cannot Skip

Certification gaps are the single most common reason a sourcing project derails after units have already shipped. Customs in the EU, the UK, GCC states, and Brazil routinely seize non-compliant aerosol extinguishers — at the importer's expense. Below is the certification matrix mapped to the markets where it actually matters.

![Certification matrix for din rail aerosol fire extinguishers — CE EN 15276, UL 2775, UKCA, SASO, INMETRO, KFI, ActivFire and CCC by destination market](/images/blog/din-rail-aerosol-certifications-matrix.svg)

| Target market | Mandatory | Strongly recommended |
|---|---|---|
| **European Union** | CE marking + EN 15276-1 (component) + EN 15276-2 (system) | DNV, VdS, or LPCB endorsement; REACH compliance dossier |
| **United Kingdom** | UKCA marking + EN 15276 equivalency | LPCB approval |
| **United States** | UL 2775 listing | NFPA 2010 design alignment; FM Approvals for insurance leverage |
| **Canada** | UL 2775 (cULus) | ULC-S560 alignment |
| **GCC (Saudi Arabia, UAE)** | SASO + Civil Defense approval | EN 15276 |
| **Brazil** | INMETRO Ordinance 179/2010 | ABNT NBR 17240 |
| **Korea** | KFI (Korea Fire Institute) approval | KC mark |
| **Australia / NZ** | ActivFire scheme listing | AS 4214 alignment |
| **Mainland China** | CCC + 3C fire certification | GB 25972 alignment |

> **Critical:** "CE self-declaration" is **not** sufficient for EN 15276 products in the EU. EN 15276 requires a **Notified Body certificate** (Module B + Module D) and a valid annual factory production control audit. If a supplier offers only a self-issued Declaration of Conformity, the goods are non-compliant on arrival.

### How to Verify a Certificate

- Ask for the **certificate number** and the issuing **Notified Body number** (for example, NB 0036 for TÜV SÜD)
- Cross-check on the official Notified Body database
- Confirm the **product model number on the certificate matches the model in your PO** exactly — generic family certificates are sometimes misrepresented as covering specific SKUs

## How to Vet a Chinese Supplier

The single highest-leverage activity in a sourcing project is supplier due diligence. A weekend of structured vetting prevents a six-month dispute. Below is the framework we recommend, broken into documentary, technical, and behavioral checks.

### Documentary Checks (Must-Have)

Request and verify, in this order:

1. **Business license** — verify on the State Administration for Market Regulation portal. Confirm the registered business scope explicitly includes fire equipment manufacturing, not just trading.
2. **ISO 9001:2015 certificate** — current and issued by an IAF-accredited body.
3. **Original test reports** for the specific SKU you're buying — issued by an accredited lab (such as TÜV, SGS, Intertek, or a CNAS-accredited Chinese lab). Reports must show the model number, test date, and the lab's stamp.
4. **Export license / CIQ registration** for hazardous goods (UN 3268).
5. **Product liability insurance certificate** with coverage of at least USD 1 million per occurrence.
6. **Factory address verification** — cross-check the address on the business license against the address on the test reports and quality certificates. Mismatches almost always indicate a trading company posing as a manufacturer.

### Technical Checks

- **Live or recorded discharge video** of the specific SKU you're buying. Reputable manufacturers post these openly; if a supplier won't share one, walk away.
- **Production capacity verification** — request monthly output figures for the last 12 months and cross-reference against the certified production line capacity on the ISO certificate.
- **Sample testing** — order 5 to 10 sample units. Send 2 to 3 to a third-party lab for independent verification of agent mass, discharge time, and activation temperature.

### On-Site or Remote Audit

For orders above USD 50,000 or any project intended for safety-critical applications (BESS, transit, healthcare), a third-party factory audit is non-negotiable. Established options:

- **SGS, TÜV SÜD, Bureau Veritas, Intertek** — full audits, USD 800–1,800 per day
- **Remote video audit** (live walkthrough by a local agent) — USD 200–500, sufficient for second-tier suppliers
- **Customer self-audit** — viable when at least one team member can physically visit and read Chinese; allow 1.5 days on site

### Red Flags That Should Kill a Deal

| Red flag | Why it matters |
|---|---|
| Quoted price more than 30% below the market floor | Suggests counterfeit components or skipped certifications |
| Refusal to provide raw test report (only the certificate) | Often indicates the certificate covers a different model |
| No own discharge test video | Suggests pure trading company, not a manufacturer |
| Factory address differs from license address | Trading-company red flag |
| Certificate issued by an unrecognized lab | Likely not accepted at destination customs |
| MOQ stated in quotation differs from MOQ in PI | Negotiation manipulation; expect more downstream |
| "We can ship as ordinary goods, not dangerous goods" | Customs fraud; importer is liable |

## Pricing Structure: FOB, CIF, and Volume Tiers

Pricing is the question every buyer arrives with and the question every supplier deflects. The honest answer is that there is **no single FOB price** for a din rail aerosol fire extinguisher, because at least nine variables move the number. Below is the cost structure, reference ranges, and the variables you should be asking about in any quote conversation.

![Cost composition of a din rail aerosol fire extinguisher — aerosol agent, housing and DIN clip, electric trigger circuit, certification amortization, labor QC, packaging logistics and overhead margin breakdown](/images/blog/din-rail-aerosol-pricing-composition.svg)

### Cost Structure of a Typical 100g Unit

A representative breakdown of where the FOB cost goes:

| Component | Share of cost |
|---|---|
| Aerosol-forming compound + initiator | ~25% |
| Housing, end caps, DIN clip | ~20% |
| Electric trigger circuit (where fitted) | ~15% |
| Certification amortization | ~10% |
| Labor + QC | ~10% |
| Packaging + inland logistics | ~5% |
| Overhead + margin | ~15% |

The two largest line items — chemistry and housing — are also the two most exposed to commodity price swings. Quotes valid for less than 30 days are increasingly common for this reason.

### Reference Price Bands (FOB China, Indicative, Mid-2026)

These bands assume CE EN 15276 plus UL 2775 dual-certified product, thermal activation, standard housing, and order quantities at the volume tier shown. **These are reference indicators only — actual pricing depends on specifications, certifications, and current commodity costs. Request a quotation for your exact requirement.**

| Agent mass | 100 units | 500 units | 2,000 units | 10,000+ units |
|---|---|---|---|---|
| 20 g | Band A++ | Band A+ | Band A | Band A- |
| 50 g | Band B++ | Band B+ | Band B | Band B- |
| 100 g | Band C++ | Band C+ | Band C | Band C- |
| 200 g | Band D++ | Band D+ | Band D | Band D- |
| 500 g | Band E++ | Band E+ | Band E | Band E- |

### Volume Discount Tiers

Most factories operate roughly to this scale on standard SKUs:

- **100–499 units**: list price
- **500–1,999 units**: ~5–10% off
- **2,000–4,999 units**: ~10–18% off
- **5,000–9,999 units**: ~18–25% off
- **10,000+ units**: bespoke; expect tooling-amortized pricing

### Hidden Costs to Budget For

Buyers consistently underestimate four line items:

- **Test report fees** (USD 800–4,000 per SKU per market) — usually borne by the buyer for first-time SKU certification
- **Mold and tooling fees** (USD 1,500–8,000) — for OEM cosmetic changes
- **Marine insurance for hazardous goods** (typically 0.6–1.2% of FOB value, versus 0.2% for general cargo)
- **Dangerous goods documentation** (DG declaration, MSDS translation, UN box certification) — often USD 150–400 per shipment

### FOB vs CIF vs DDP — Choosing the Right Incoterm

- **FOB (port of origin)** — best when you have a competent freight forwarder and want maximum cost transparency.
- **CIF (named port of destination)** — convenient but typically embeds 5–10% margin on the freight portion. Worth it for low-volume buyers who lack forwarder relationships.
- **DDP (delivered duty paid)** — only attractive when the supplier has demonstrable experience with your destination's hazardous-goods customs procedures. Ask for the customs broker's name and license number before agreeing.

> **Ready to scope a specific quote?** Our team will return a detailed quotation within one business day, including reference pricing, certification scope, lead time, and Incoterm options for your destination. [Request a quotation here](/contact).

## MOQ, Lead Time, and Shipping

Operationally, three numbers govern every project: minimum order quantity, lead time, and shipping window. The combinations that work and the combinations that fail are well-mapped at this point.

![Production and shipping timeline for din rail aerosol fire extinguishers from China — order, raw material, assembly, QC, dangerous goods packing, customs and ocean freight to EU and North America](/images/blog/din-rail-aerosol-shipping-timeline.svg)

### MOQ Realities

- **Standard SKUs (no customization)**: 100 units is realistic; some factories will go to 50.
- **Custom labeling or packaging**: 300–500 units.
- **Custom mechanical or electrical changes**: 1,000–2,000 units.
- **Full ODM**: 5,000+ units or NRE recovery.

Buyers below MOQ have two viable paths: (1) buy from a factory's existing stock SKU and brand it with a separate label, or (2) consolidate orders across multiple destinations to clear MOQ collectively.

### Realistic Lead Times

| Order type | Production | Notes |
|---|---|---|
| Stock SKU, in inventory | 5–10 days | Ex-works |
| Standard SKU, made-to-order | 25–35 days | Most common case |
| OEM (logo, packaging) | 35–45 days | First-order tooling adds 7–10 days |
| OEM (mechanical or electrical) | 50–70 days | Sample approval cycle adds 10–15 days |
| Full ODM | 4–9 months | Includes type testing |

Add **15–35 days transit** for ocean freight to the EU and Mediterranean, **20–40 days** to North American west and east coasts, and **35–55 days** to South America. Air freight typically lands in 5–8 days but is rarely cost-effective above 50 kg of dangerous goods.

### Hazardous Goods Classification

Din rail aerosol fire extinguishers are classified as **UN 3268, Class 9 dangerous goods** (Safety devices, electrically initiated) under [IMDG and IATA Dangerous Goods Regulations](https://www.iata.org/en/publications/dgr/). Practical implications:

- **Sea freight**: standard 20-foot or 40-foot containers acceptable; book through a forwarder with IMDG endorsement. Expect 0.6–1.2% insurance premium versus general cargo.
- **Air freight**: requires IATA DGR-compliant packaging (UN-certified fiberboard boxes) and a Shipper's Declaration. Many passenger carriers refuse Class 9 of this type; freighters are required for larger consignments.
- **Customs**: HS code is typically 8424.10.0090 for the device; the dangerous-goods classification is layered separately.

### Shipping Document Checklist

A complete export shipment will include:

- Commercial invoice
- Packing list
- Bill of lading or air waybill
- Material Safety Data Sheet (MSDS) in destination language where required
- Dangerous Goods Declaration (DGD)
- UN-approved packaging certificate
- Certificate of origin (Form A or RCEP, depending on agreement)
- Test report or product certificate copies
- Insurance certificate (CIF or CIP terms)

Missing any one of these typically costs 3–7 days at destination customs.

## Installation and Commissioning Overview

For most procurement teams, installation is the contractor's problem — but knowing the steps shortens the technical conversation with end users and exposes any specification gaps before they become field disputes.

![Three-step installation of a din rail aerosol fire extinguisher — clip onto 35mm DIN rail, wire 24V trigger loop to fire panel, verify status LED commissioning](/images/blog/din-rail-aerosol-installation-3-steps.svg)

### The Three-Step Install

1. **Mount on DIN rail.** The unit clips onto a standard 35 mm DIN rail in any vacant position inside the cabinet. Position recommendations: top-third of the cabinet, away from cooling fans, with at least 10 mm clearance around the discharge opening.
2. **Wire the trigger** (electric or dual-mode units only). A two-wire 24 VDC firing line connects to the fire-detection panel's signal output. Most units include a status contact (NO/NC) that reports back to the panel for supervision.
3. **Activate status indication.** Apply control voltage to the unit's monitoring circuit. The status LED should illuminate green within 5 seconds, confirming the initiator continuity is intact.

Total install time per unit: **3–8 minutes** for thermal-only models; **8–15 minutes** for electric or dual-mode models including loop testing.

### Maintenance Regime

Reputable units are designed for **functional maintenance-free operation** across their service life. Best-practice site procedures include:

- **Annual visual inspection** — confirm the status LED is green and there is no visible damage
- **Annual control-loop test** — for electric units, simulate a fire signal at the panel and confirm the unit's monitoring contact responds correctly (do NOT actually fire the unit)
- **Decennial replacement** — replace the entire unit at the end of its rated service life (typically 10 years)

### End-of-Life Disposal

Expired units that have not discharged remain Class 9 hazardous goods and must be disposed of through a licensed hazardous-waste handler. Discharged units are typically treated as ordinary industrial waste once the residue has been wiped down — confirm with your local waste regulator.

## Case Study: 50 MW Solar Farm Deployment

> The following is a representative project description based on typical deployment patterns. Specific figures are illustrative.

### Background

A European EPC contractor specializing in utility-scale solar was awarded a 50 MW project in southern Spain. The project specification required cabinet-level fire suppression in every DC combiner box and string inverter cabinet, driven by the project's insurance carrier following a sister project's combiner-box fire eighteen months earlier.

### Specification Challenge

The project required:

- Approximately 1,800 combiner-box units (each 0.4 m³ enclosed volume)
- Approximately 200 inverter-cabinet units (each 1.6 m³ enclosed volume)
- Operating temperature qualified to +85 °C ambient (Spanish summer interior)
- Full CE EN 15276 documentation for project sign-off
- Delivery to site within a 14-week window from order placement

### Sourcing Decision

After evaluating four EU manufacturers and three Chinese manufacturers, the EPC selected a Chinese supplier with the following profile:

- CE EN 15276 + UL 2775 dual certification verified through Notified Body database
- Annual production capacity of 240,000 units (verified by remote audit)
- Three years of EU project deliveries with documented zero in-warranty failures
- FOB price approximately 47% below the lowest EU quote
- Lead time quote of 35 days production + 28 days transit (Shenzhen to Valencia)

### Outcome

- **2,000 units delivered** to site on schedule
- **Total landed cost** reduced by approximately 38% versus the EU benchmark
- **Project commissioning** completed on the original timeline
- **Zero rejections** at customs or site QA

### Key Takeaways

1. Dual certification (CE + UL) shortcuts the supplier shortlist dramatically — fewer than 15 Chinese factories meet this bar today.
2. Verified production capacity is more predictive of on-time delivery than verbal lead-time commitments.
3. Pre-shipment third-party inspection (around USD 0.15 per unit at this volume) added negligible cost and removed all field-quality risk.

## Frequently Asked Questions

### Are din rail aerosol fire extinguishers safe for occupied spaces?

Modern condensed aerosol products are formulated to be safe for occupied spaces in the typical concentrations used inside cabinets, and EN 15276-certified products are tested for human-occupied safety. That said, evacuation of personnel from any enclosed protected volume during discharge is still recommended best practice. Always confirm the specific product's occupancy classification in its declaration of performance.

### Do they require recharging after activation?

No. A din rail aerosol extinguisher is a single-use device. After it has discharged, the entire unit is replaced. There is no field-rechargeable version of this product class.

### What's the difference between aerosol and clean agent (FM-200)?

FM-200 (HFC-227ea) is a halocarbon clean agent stored as a liquefied gas under pressure, requiring a piped distribution network and a sealed enclosure. Condensed aerosol is a solid compound that combusts on activation to produce fine particles, requires no pipework, and works in less-sealed enclosures. Aerosol is typically 60–80% lower cost on a per-cabinet basis but is generally specified for smaller protected volumes.

### Can I import them to the EU without an EU representative?

Under the current EU CPR and Machinery framework, products requiring CE marking must have an EU-based responsible person — either the manufacturer's EU subsidiary or an authorized representative — designated on the declaration of conformity. Importers should verify this designation exists before shipping; otherwise customs may detain the goods.

### What's the typical warranty?

Standard manufacturer warranty in this category is **24 months from date of shipment** for material defects, with the rated service life (10 years standard) covering functional reliability under normal storage and operating conditions. Premium suppliers extend warranty to 36 months or align it with the device's full service life on enterprise contracts.

### Do they work in unsealed enclosures?

Aerosol systems tolerate more enclosure leakage than gaseous clean agents but are not fully insensitive to it. As a rule of thumb, the cabinet should hold the agent concentration above the design value for at least 10 minutes — typically achievable in cabinets with leakage area below 1% of total surface area. For highly louvered enclosures, agent mass should be over-specified or a different suppression technology considered.

### Are they classified as dangerous goods for shipping?

Yes. Din rail aerosol fire extinguishers are classified under **UN 3268, Class 9** (Safety devices, electrically initiated) for transport under IMDG and IATA regulations. They require UN-certified packaging, a Dangerous Goods Declaration, and shipping through forwarders licensed to handle Class 9 cargo.

### Can I use one extinguisher for multiple cabinets?

A single unit protects one enclosed volume. Across multiple separate cabinets, separate units are required — even if the cabinets are physically adjacent — because each enclosure traps the agent independently. Adjacent cabinets joined through a sealed interconnection (such as a busway) may be treated as a single volume on a project-specific basis.

### What's the shelf life before installation?

Standard shelf life from date of manufacture is **24 months** before installation (after which the rated service life clock starts). Storage conditions: dry, between −10 °C and +40 °C, away from direct sunlight, in original packaging.

### How do I dispose of expired units?

Expired but undischarged units remain Class 9 hazardous goods and must be returned to a licensed hazardous-waste handler. Many manufacturers and distributors offer take-back programs at end-of-life — confirm at the point of order whether this service is available in your destination country.

## Closing: Three Decisions That Define a Successful Sourcing Project

After working through the technology, the certifications, the pricing, and the logistics, the buying decision condenses to three commitments worth making before a quote is even requested.

**First, decide your certification bar before you shortlist suppliers.** A buyer who decides "CE + UL minimum" upfront eliminates 80% of the noise on the first email round.

**Second, set a realistic MOQ and lead-time envelope** based on your destination market's compliance requirements, not on the lowest quoted price. The cheapest supplier who can't deliver paperwork is more expensive than the second-cheapest who can.

**Third, invest in vetting in proportion to deal size.** A USD 5,000 trial order can be vetted through documents and a video call. A USD 500,000 project deserves a third-party audit and pre-shipment inspection — costs that will look small the moment the first container clears customs without incident.

## Continue Reading

For deeper context on each phase of the sourcing decision, the cluster below maps to the buying journey from technology orientation through pre-PO verification:

- **Technology foundation:** [What is a din rail aerosol fire extinguisher?](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide) — chemistry, components, and where the category fits
- **How it actually works:** [How aerosol fire extinguishers stop electrical-cabinet fires](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) — suppression mechanism plus three field case studies
- **Where it ships:** [Top 8 applications driving 2026 demand](/blog/top-8-applications-din-rail-aerosol-fire-extinguishers-2026) — market sizing and distributor margin per vertical
- **Technology comparison:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — when each suppression technology is the right answer
- **Sizing methodology:** [How to size a din rail aerosol fire extinguisher](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide) — the EN 15276 formula and worked examples
- **Pre-PO spec audit:** [Datasheet specifications buyers must verify](/blog/din-rail-aerosol-fire-extinguisher-specifications) — the 18-parameter check list
- **Certification deep-dive:** [CE, UL, EN 15276 & CCC explained for importers](/blog/aerosol-fire-extinguisher-certifications-ce-en-15276-ul-ccc) — fraud patterns and verification process
- **Reference pricing:** [2026 FOB price guide](/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026) — tiered ranges, MOQ ladder, and TCO modeling
- **Final pre-PO checklist:** [The ultimate buyer's checklist (2026)](/blog/din-rail-aerosol-fire-extinguisher-buyers-checklist-2026) — 122 verification points across 8 dimensions

**Soltree** manufactures CE EN 15276 and UL 2775 certified [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher), with active deliveries in over 80 countries. Browse our flagship [DIN Rail Thermal Aerosol Fire Extinguishing Device (10 g / 20 g / 30 g variants)](/products/din-rail-aerosol-fire-extinguisher) for full specs, datasheets, and certification documentation. Whether you need 100 units for a single project or 50,000 units annually for distribution, our team will return a detailed quotation within one business day. [Contact our team](/contact) with your project requirements and receive a factory-direct quote within 24 hours.
    `,
    date: "2026-04-25",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/din-rail-aerosol-pillar-hero.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Fire Suppression", "China Sourcing", "B2B Procurement", "Electrical Cabinet Protection"],
    readingTime: 25,
    metaTitle: "Din Rail Aerosol Fire Extinguisher: 2026 China Sourcing Guide | Soltree",
    metaDescription: "The complete B2B guide to sourcing din rail aerosol fire extinguishers from China — specs, certifications, pricing, MOQ & supplier vetting for 2026.",
    metaKeywords: "din rail aerosol fire extinguisher, china supplier, condensed aerosol fire suppression, electrical cabinet fire protection, EN 15276, UL 2775, OEM aerosol extinguisher, BESS fire suppression",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "what-is-din-rail-aerosol-fire-extinguisher-technical-guide",
    title: "What Is a Din Rail Aerosol Fire Extinguisher? A Complete Technical Guide",
    excerpt:
      "A technical guide to din rail aerosol fire extinguishers — how they work, what's inside, where they fit, and the specifications and certifications that separate B2B-grade units from low-tier alternatives.",
    content: `
Electrical cabinet fires account for roughly 25% of all industrial fire losses worldwide, and most of them start small — hidden inside switchgear, MCB panels, or inverter cabinets where building-level extinguishers and sprinklers cannot reach in time.

A din rail aerosol fire extinguisher addresses that gap directly. The unit is compact and self-activating, mounting onto a standard 35 mm DIN rail inside the enclosure itself. When a fire starts, it discharges a fine aerosol that suppresses flames within seconds — no water, no stored pressure, no damage to energized equipment.

This guide is a technical introduction for engineers, distributors, and procurement teams new to the category. It covers:

- What a [din rail aerosol fire extinguisher](/categories/aerosol-fire-extinguisher) is, and how it differs from conventional suppression
- The chemistry behind aerosol suppression
- Core components, key specifications, and certifications
- Typical deployment environments in 2026
- How to evaluate units against B2B procurement criteria

> **Who this guide is for:** electrical engineers specifying cabinet-level fire protection, panel builders and OEMs integrating suppression at the design stage, and distributors or importers entering the category.

## What Is a Din Rail Aerosol Fire Extinguisher?

A din rail aerosol fire extinguisher is a fixed, miniaturized fire-suppression device designed to clip onto a 35 mm DIN rail — the same mounting standard used for circuit breakers, contactors, and PLCs.

Unlike traditional extinguishers that store pressurized agent (CO₂, dry powder, or clean agents like FM-200), an aerosol unit holds a solid chemical compound. On activation, the compound undergoes a controlled exothermic reaction, releasing a dense cloud of microscopic potassium-based particles and inert gases that flood the enclosure and extinguish the fire at the molecular level.

### Key Characteristics

| Feature | Specification |
|---|---|
| Mounting | 35 mm standard DIN rail (EN 60715) |
| Form factor | Ultra-thin module, typically 1–4 DIN units wide |
| Activation | Thermal trigger (≥ 170 °C) + electrical signal input |
| Agent type | Condensed potassium aerosol (solid → aerosol) |
| Pressure | Non-pressurized (no annual hydrostatic test) |
| Protection volume | 0.05 m³ to 1 m³ per unit (model dependent) |
| Service life | 10 years, maintenance-free |

### Why the DIN Rail Form Factor Matters

The DIN rail mounting format enables direct integration into existing electrical panels. Instead of a bulky external cylinder or a piped clean-agent system, the unit clips onto the same rail as the breakers, occupying the vertical space of a few MCBs without enclosure modification.

For OEMs, that means no cabinet redesign. For installers, a 5-minute installation. For end users, continuous autonomous protection without dedicated suppression infrastructure.

## How an Aerosol Fire Extinguisher Works

The chemistry is what makes aerosol suppression effective inside a small enclosed volume.

### Three Suppression Mechanisms

When the unit activates, the solid aerosol-forming compound — typically a potassium nitrate–based composition — ignites internally. The aerosol it produces suppresses fire through three mechanisms running in parallel:

**1. Chemical inhibition (primary).** Free potassium radicals (K*) bond with the H* and OH* radicals that drive combustion chain reactions. Once those radicals are neutralized, the chemical engine of the fire shuts down — typically within 3–10 seconds.

**2. Heat absorption.** The aerosol particles absorb thermal energy as they undergo phase changes, dropping the combustion-zone temperature below the ignition threshold.

**3. Oxygen displacement (minor).** Unlike CO₂ or inert-gas systems, aerosol units do not work by starving the fire of oxygen. They suppress at normal oxygen levels and do not pose asphyxiation risk to nearby personnel.

### Activation Methods

A modern din rail unit supports dual activation:

- **Thermal activation.** A heat-sensitive cord or glass bulb triggers the unit when ambient temperature exceeds ~170 °C. No power required.
- **Electrical activation.** An external low-voltage signal (typically 6–24 V DC) from a smoke detector, BMS, or fire alarm panel fires the unit remotely.

For B2B specification, dual triggers matter — they ensure the device works whether or not the cabinet has power, and allow integration with the broader building fire-detection system.

## Core Components

A typical unit consists of five elements:

1. **Outer housing** — flame-retardant ABS or steel casing dimensioned to fit the 35 mm DIN rail.
2. **Aerosol generator** — the solid propellant core that produces the suppressing aerosol.
3. **Cooling layer** — reduces the discharged aerosol temperature to safe levels (< 75 °C at the nozzle outlet).
4. **Discharge vents** — strategically placed openings that distribute the aerosol evenly across the protected volume.
5. **Activation module** — the thermal cord or glass bulb, plus the electrical terminal block.

Higher-tier units certified to [EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010) and CE typically add:

- Status indicator LED
- Tamper-proof seal
- Anti-misfire circuitry
- Discharge confirmation contact for BMS integration

## Where Din Rail Aerosol Extinguishers Are Deployed

The category is designed for enclosed spaces where electrical fires are most likely to start. Typical deployments in 2026:

**Power and energy**
- Low-voltage distribution boards (LV panels)
- Switchgear and motor control centers (MCCs)
- Solar [PV combiner boxes](/categories/pv-combiner-box) and inverter cabinets
- Battery energy storage systems (BESS)
- EV charging station cabinets

**Industrial and commercial**
- PLC and automation control cabinets
- Server racks and edge-compute enclosures
- Telecom shelters and base-station cabinets
- Elevator control cabinets
- HVAC and BMS panels

**Transportation**
- Rail signaling cabinets
- Marine electrical enclosures
- Bus and EV battery boxes

The pattern across all of these: enclosed volumes where a small electrical fault can escalate to a destructive fire before building-level fire protection responds.

## Din Rail Aerosol vs. Other Suppression Methods

| Feature | Din rail aerosol | FM-200 / Novec 1230 | CO₂ system | Dry powder |
|---|---|---|---|---|
| Footprint | Ultra-compact (DIN rail) | Cylinder + piping | Cylinder | Cylinder |
| Installation cost | Low (plug-and-play) | High (engineered system) | High | Medium |
| Maintenance | None for 5–10 yrs | Annual recharge check | Annual weighing | Annual inspection |
| Damage to electronics | Minimal residue | Zero residue | Zero residue | Heavy residue |
| Personnel safety | Safe at design density | Safe | Asphyxiation risk | Visibility hazard |
| Environmental impact | Zero ODP, zero GWP | Low (Novec) / High (FM-200) | Neutral | Low |

For localized cabinet protection, aerosol units offer the most practical balance of cost, footprint, and response time — which is why they have been displacing FM-200 piped systems in switchgear applications across Europe and Southeast Asia since 2020.

## Specifications That Matter

When sourcing a unit, these are the parameters worth pinning down before any quote:

**Protection volume (m³).** The maximum cabinet volume the unit can effectively protect. Specify with a 10–20% safety margin.

**Activation temperature (°C).** Standard is 170 °C. Lower thresholds (e.g., 100 °C) exist for specialized applications.

**Discharge time (s).** Typically 5–30 seconds. Shorter discharge means faster fire knockdown.

**Aerosol density (g/m³).** The certified suppression density. EN 15276 requires a minimum of 100 g/m³ for Class A and B fires.

**Operating temperature range.** For globally deployed equipment, specify −40 °C to +95 °C.

**Electrical trigger voltage.** Common options are 6 V, 12 V, or 24 V DC. Match your fire-alarm panel output.

**Certifications.** Minimum: CE marking and EN 15276 compliance for European markets. UL 2775 for North America. CCC for the China domestic market.

## Quality Indicators for B2B Buyers

Not every unit on the market meets B2B specification. The following are reliable quality signals when shortlisting suppliers:

- **Genuine EN 15276 certification** — request the test report, not just the certificate number
- **Stable aerosol formulation** — no sediment separation or chemical degradation across the rated service life
- **Documented cooling layer** — discharge temperature should be measured and reported on the datasheet
- **Robust thermal trigger** — glass bulbs are typically more reliable than older heat-sensitive cords
- **Traceable manufacturing** — every unit should carry a serial number and production batch code
- **OEM/ODM flexibility** — for distributors and EPC contractors, the ability to customize housing color, branding, trigger voltage, and packaging is often a contract-level requirement

## Why Soltree

Soltree manufactures CE and EN 15276 certified [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) in an ultra-thin form factor optimized for the 35 mm rail, with full OEM and ODM support — private labeling, custom trigger voltages, and bulk packaging tailored to the destination market. Every unit undergoes 100% factory testing before shipment. View the full product spec sheet for the [DIN Rail Thermal Aerosol Fire Extinguishing Device](/products/din-rail-aerosol-fire-extinguisher).

## Frequently Asked Questions

### Is the discharged aerosol toxic to humans?

At certified design density the aerosol is non-toxic and safe for occupied spaces during brief exposure. Evacuation is still recommended after activation due to reduced visibility.

### Will the aerosol damage electronics?

The aerosol leaves a fine residue that is non-conductive but should be cleaned after discharge. It does not cause corrosion or permanent damage to PCBs when cleaned within 24–48 hours.

### How long does the device last?

Most certified units carry a 10-year service life with no maintenance required during that period. After expiration, the entire unit is replaced — there is no field-rechargeable version of this product class.

### Can it be reused after activation?

No. Aerosol fire extinguishers are single-use. Once activated, the unit is replaced.

### Does it require periodic maintenance during the service life?

Visual inspection every 6 months is recommended (status LED and physical condition). No mechanical service or recharging is required.

## Closing

The din rail aerosol fire extinguisher moves cabinet fire protection from reactive, building-level systems to asset-level protection installed where electrical fires actually start. For OEMs and panel builders, it is a compact integrate-once solution. For EPC contractors, it removes the cost and complexity of piped suppression. For distributors and importers, it is a fast-growing category with demand pull from solar, EV, telecom, and industrial automation.

For projects involving enclosed electrical equipment — especially unmanned, remote, or mission-critical assets — the technology is a standard line item in fire-protection BOMs.

## Related Reading

Once the technology fundamentals are clear, the next questions are usually deployment, comparison, and sourcing:

- **Mechanism deep-dive:** [How aerosol fire extinguishers work in electrical cabinets](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) — the chemistry plus three field case studies
- **Where it gets used:** [Top 8 applications driving 2026 demand](/blog/top-8-applications-din-rail-aerosol-fire-extinguishers-2026) — markets, CAGR, and distributor margin opportunity
- **Versus alternatives:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — when each suppression technology wins
- **Sizing the unit:** [Step-by-step calculation guide](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide) — the EN 15276 formula and two worked examples
- **Sourcing pillar:** [The complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — supplier vetting, certifications, MOQ, and shipping

**Need a quote scoped to your application?** Visit the [DIN Rail Thermal Aerosol Fire Extinguishing Device product page](/products/din-rail-aerosol-fire-extinguisher) for full specs across the 10 g / 20 g / 30 g variants, then [contact our team](/contact) with cabinet volume, target market, and certification requirements, and receive a factory-direct quotation within one business day.
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/what-is-din-rail-aerosol-fire-extinguisher.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Fire Suppression", "Technical Guide", "Electrical Cabinet Protection", "Aerosol Chemistry"],
    readingTime: 9,
    metaTitle: "What Is a Din Rail Aerosol Fire Extinguisher? 2026 Tech Guide | Soltree",
    metaDescription: "Learn what a din rail aerosol fire extinguisher is, how it works, and why it is the standard cabinet fire suppression for electrical enclosures in 2026 — request a quote.",
    metaKeywords: "din rail aerosol fire extinguisher, what is aerosol fire extinguisher, condensed aerosol fire suppression, electrical cabinet fire protection, EN 15276 aerosol, DIN rail fire suppression, aerosol extinguisher specifications, potassium aerosol fire suppression",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "din-rail-aerosol-fire-extinguisher-price-guide-2026",
    title: "Din Rail Aerosol Fire Extinguisher Price Guide 2026: Cost Breakdown & FOB Pricing",
    excerpt:
      "2026 FOB China price ranges, MOQ-tier pricing, the seven cost factors that move a quote, hidden import-side costs, and a 10-year TCO comparison vs. FM-200 and Novec 1230 — the pricing playbook for B2B buyers and EPC contractors.",
    content: `
If you are sourcing din rail aerosol fire extinguishers for resale, project deployment, or OEM integration, the first question to any supplier is always the same: what is the price?

The honest answer is that it depends. A unit can ship FOB China anywhere from $8 to $60, and the spread is not random — it tracks certifications, protection volume, activation type, MOQ, and a handful of factors most suppliers will not openly explain. This guide breaks them down.

You will get:

- Real 2026 FOB price ranges for the three main product tiers
- A complete MOQ-based pricing ladder for margin modelling
- The 7 cost factors that determine where a quote actually lands
- A 10-year TCO comparison against FM-200 and Novec 1230 piped systems
- The hidden import-side costs that routinely inflate landed cost

Whether the order is a 500-unit pilot or a 50,000-unit framework agreement, the numbers below let you benchmark any supplier's quote against the broader market.

> **Who this guide is for:** importers, distributors, OEMs, and EPC procurement teams pricing [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) for European, GCC, ASEAN, LATAM, and African markets.

## Quick Answer: 2026 FOB Price Ranges

For buyers who need a fast benchmark, these are the typical FOB China prices in 2026, based on a standard 1,000-unit order with CE / [EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010) certification:

| Product Tier | Protection Volume | FOB Price (USD) | Typical Buyer |
|---|---|---|---|
| Entry-level | 0.05–0.2 m³ | $8 – $18 / pc | Domestic markets, cost-sensitive projects |
| Mid-range | 0.2–0.5 m³ | $18 – $35 / pc | EU/SEA distributors, EPC contractors |
| Premium | 0.5–1.0 m³ | $35 – $60 / pc | UL/EN-certified projects, BESS, data centers |

> **Reality check:** if a supplier is quoting under $8/pc for an EN 15276 certified unit with dual activation, the certification is almost certainly fake or the spec sheet does not match the actual product shipped. Verification methods are covered further down.

The mid-range tier is where roughly 70% of B2B export volume sits. It is the practical match for distributors targeting European, Middle Eastern, and Southeast Asian markets where buyers expect proper certification but do not require premium-tier UL listings.

## MOQ-Based Pricing Ladder (Mid-Range Tier)

For importers, the most useful pricing data is not the per-unit cost — it is how the price scales with volume. The typical FOB pricing ladder for a mid-range 0.3 m³ EN 15276 certified unit in 2026:

| Order Quantity | FOB Unit Price | Discount vs. MOQ | Total Order Value |
|---|---|---|---|
| 100 pcs (sample order) | $32 – $38 | — | $3,200 – $3,800 |
| 500 pcs | $28 – $32 | ~10–15% | $14,000 – $16,000 |
| 1,000 pcs | $24 – $28 | ~20–25% | $24,000 – $28,000 |
| 5,000 pcs | $20 – $24 | ~30–35% | $100,000 – $120,000 |
| 10,000+ pcs | $17 – $21 | ~40–45% | $170,000+ |
| 50,000+ pcs (annual contract) | $15 – $18 | ~50%+ | Custom |

### Margin Logic for Importers

For a 1,000-unit order at $26/pc FOB, a representative landed-cost and resale economics model:

| Line item | USD per unit |
|---|---|
| FOB China | $26.00 |
| Sea freight (LCL) | $1.80 |
| Import duty (EU avg 2.7%) | $0.70 |
| Local handling / storage | $0.50 |
| **Landed cost** | **$29.00** |
| Distributor selling price | $55 – $75 |
| **Gross margin** | **48 – 61%** |

For most European and Middle Eastern distributors, a 50%+ gross margin is achievable on this category — significantly higher than commodity electrical components, which typically run 15–25%.

## The 7 Factors That Determine a Quote

Two suppliers can return very different prices for what looks like the same product. The drivers behind that spread:

### 1. Certifications (Biggest Price Driver)

Certification status alone can swing the price by 40–60%:

| Certification level | Price impact |
|---|---|
| Domestic CCC only (China use) | Baseline |
| CE marking | +15–25% |
| EN 15276 certified | +25–40% |
| UL 2775 listed | +50–80% |
| CCS / DNV (marine) | +60–100% |

> **Importer warning:** request the original test report (not just the certificate scan). A genuine EN 15276 report from a notified body (KIWA, BSI, TÜV, etc.) runs 50+ pages with full test data. A "certificate" without a backing report is a red flag.

### 2. Protection Volume

Aerosol agent quantity scales linearly with cost. A 0.5 m³ unit uses roughly 2.5× the agent of a 0.2 m³ unit, and pricing reflects this directly.

### 3. Activation Type

| Activation | Price premium |
|---|---|
| Thermal only (170 °C glass bulb) | Baseline |
| Electrical only (12 V / 24 V signal) | +5–10% |
| Dual thermal + electrical | +15–20% |
| Dual + status feedback to BMS | +25–30% |

Most B2B export buyers specify dual activation because it is required for integration with building fire-alarm systems.

### 4. Housing Material

- **Flame-retardant ABS (standard):** baseline
- **Steel housing (industrial / marine):** +20–30%
- **Custom color / private label:** +5–10% (typically waived above 5,000 pcs)

### 5. MOQ and Order Frequency

Volume drives discounts as shown in the ladder above. Annual contract pricing — committed volume across 12 months — typically beats single-PO pricing by another 8–12% because it lets the manufacturer plan raw-material procurement.

### 6. OEM / ODM Customization

- **Standard product, supplier branding:** baseline
- **Private label (your logo + box):** +$0.50–$1.50/pc, usually free above 3,000 pcs
- **Custom voltage / trigger temperature:** +$2–$5/pc (one-time tooling fee may apply)
- **Full ODM (custom housing or spec):** tooling fee $3,000–$8,000 + per-unit premium

### 7. Payment Terms

Payment structure affects the unit price:

| Payment terms | Price impact |
|---|---|
| 100% TT in advance | -2 to -3% |
| 30% deposit + 70% before shipment | Baseline |
| 30% deposit + 70% L/C at sight | +2–3% |
| 100% L/C at sight | +3–5% |
| OA 30/60/90 days (open account) | +5–10% (rarely offered) |

## Hidden Costs Importers Routinely Miss

Beyond FOB, these are the cost lines that quietly inflate landed cost:

**MSDS and dangerous-goods documentation.** Aerosol fire extinguishers ship as UN 3268 (Class 9 dangerous goods) in many jurisdictions. Required documents include MSDS, transport classification, and DG declaration. Cost: $50–$150 per shipment, usually borne by the buyer.

**Air-freight restrictions.** Most aerosol units cannot fly as standard cargo. Urgent delivery means dangerous-goods air-freight surcharges of 3–5× standard rates. Plan sea freight 45–60 days in advance.

**Certification verification.** When the end customer requests independent verification of the EN 15276 certificate, third-party validation services (e.g., SGS spot inspection) cost $300–$800 per inspection.

**Spare trigger cords and replacement parts.** Some suppliers quote "the unit only" and charge separately for spare thermal cords, mounting brackets, or wiring harnesses. Always confirm scope of supply against the FOB price.

**Re-certification for local markets.** EN 15276 does not automatically grant access to GCC, ANZ, or Latin American markets. Local certification (SASO for Saudi Arabia, INMETRO for Brazil, etc.) costs $2,000–$15,000 and takes 2–6 months. Some suppliers will share this cost — always negotiate.

## TCO Comparison: Aerosol vs. FM-200 vs. Novec 1230

For project-level buyers — EPCs, integrators, system specifiers — the FOB unit price is only part of the story. A 10-year Total Cost of Ownership comparison for protecting a 0.5 m³ electrical cabinet:

| Cost category | Din rail aerosol | FM-200 system | Novec 1230 system |
|---|---|---|---|
| Hardware (initial) | $30 | $450 | $520 |
| Installation labor | $15 | $180 | $180 |
| Piping and nozzles | $0 | $120 | $120 |
| Detection panel | $40 (optional) | $250 (required) | $250 (required) |
| Annual inspection (10 yrs) | $0 | $800 | $800 |
| Agent recharge (1× over 10 yrs) | $0 (replace unit at yr 10) | $280 | $620 |
| Unit replacement at end of life | $30 | $0 (refilled) | $0 (refilled) |
| **10-year TCO** | **$115** | **$2,080** | **$2,490** |
| Cost per m³ protected | $230 | $4,160 | $4,980 |

> **Key takeaway for EPC buyers:** even with FM-200 hardware free, maintenance cost alone over 10 years exceeds the entire lifecycle cost of a din rail aerosol solution. Lead with TCO, not unit price, when proposing aerosol systems to specifiers.

For project-level proposals, presenting TCO instead of unit price reframes the conversation — which is the reason aerosol systems have been replacing FM-200 piped systems in solar, BESS, EV charging, and telecom infrastructure projects across 2024–2026.

## How to Verify a Quote Is Fair

A 5-point checklist before accepting any supplier quote:

1. **Certification documentation.** Request the full test report PDF, not just the certificate. Verify the notified-body number on the issuing authority's website.
2. **Product datasheet.** The spec sheet should include: protection volume, agent type and mass, activation temperature, discharge time, operating-temperature range, housing material, dimensions, and weight. Vague datasheets indicate vague products.
3. **Sample inspection.** Order 5–10 samples before any bulk order. Verify dimensions, finish quality, label printing, and weight against the datasheet.
4. **Factory audit report.** Request a recent SGS, BV, or TÜV factory audit report (under 12 months old). For orders above $50,000, consider commissioning your own audit (~$800–$1,500).
5. **Reference customers.** Ask for 2–3 export references with shipment dates and rough volumes. Reputable suppliers will share these with customer permission.

## Why Soltree

Soltree publishes transparent FOB pricing for all standard din rail aerosol fire extinguisher SKUs:

- **CE / EN 15276 certified** — full test reports provided with every quote
- **Ultra-thin 35 mm DIN rail form factor** — 1U, 2U, and 4U widths available
- **Dual thermal + electrical activation** — 12 V / 24 V DC standard, custom voltages on request
- **OEM / ODM** — private label free above 3,000 pcs; full ODM available with 30-day lead time
- **Factory MOQ** — 100 pcs (sample), 500 pcs (production)
- **Standard lead time** — 25–35 days for 1,000-unit orders
- **Payment terms** — 30% TT deposit + 70% before shipment (L/C and OA available for repeat customers)

## Frequently Asked Questions

### What is the cheapest legitimate price for an EN 15276 certified unit?

For a 0.2 m³ unit at 5,000+ pcs, expect $15–$18 FOB. Anything significantly below this either lacks genuine certification or compromises on aerosol density.

### How long are quotes typically valid?

Most Chinese suppliers offer 15–30 day quote validity due to fluctuations in potassium nitrate and aluminum housing costs. Annual contract pricing locks rates for 12 months.

### Can the MOQ be negotiated down for a first order?

Often yes. A 100-pc trial order is standard at 10–15% above 1,000-pc pricing. Below 100 pcs, most suppliers will route the buyer to a stocked distributor instead.

### Does pricing include export packaging?

Standard export carton packaging is included. Wooden pallets, fumigation certificates, and special markings typically cost an additional $50–$200 per shipment.

### Are aerosol units restricted from any country?

A few jurisdictions restrict pyrotechnically-generated aerosols (some US states have specific listings requirements). EN 15276 units are accepted across the EU, UK, GCC, ASEAN, and most of Africa and Latin America.

## How to Use This Guide

The pricing here is a benchmark, not a final number. Use it to:

- **Filter suppliers.** Quotes wildly outside these ranges deserve scrutiny — too low signals quality risk; too high signals margin grab.
- **Negotiate from data.** When a supplier holds at $30/pc for 1,000 units, that figure is the high end of the mid-range, not the floor.
- **Build a margin model.** Combine the FOB ranges with the landed-cost breakdown to project distributor economics.
- **Reframe project bids.** For EPC tenders, lead with the TCO comparison rather than the unit price.

## Related Reading

Pricing is one input into the buying decision; the rest of the cluster covers the surrounding context:

- **Lock the spec first:** [Datasheet specifications buyers must verify](/blog/din-rail-aerosol-fire-extinguisher-specifications) — the 18-parameter pre-quote audit so you compare apples to apples
- **Verify certification:** [CE, UL, EN 15276 & CCC explained](/blog/aerosol-fire-extinguisher-certifications-ce-en-15276-ul-ccc) — fake certificates are the #1 way "low" prices hide non-compliant product
- **Pre-PO checklist:** [The ultimate buyer's checklist (2026)](/blog/din-rail-aerosol-fire-extinguisher-buyers-checklist-2026) — 122 verification points across product, supplier, logistics, and risk
- **Sourcing strategy:** [Complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — supplier vetting, MOQ realities, and shipping
- **TCO context:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — full 10-year total-cost-of-ownership comparison

**Need a quote scoped to a specific configuration?** Browse the [DIN Rail Thermal Aerosol Fire Extinguishing Device product page](/products/din-rail-aerosol-fire-extinguisher) for the 10 g / 20 g / 30 g specs, then [contact our team](/contact) with required protection volume per unit, order quantity, activation type, target market, and branding requirements, and receive a detailed FOB quotation, datasheet, and sample availability within one business day.
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Price Guide", "Cost Analysis", "B2B Procurement", "TCO Analysis"],
    readingTime: 10,
    metaTitle: "Din Rail Aerosol Fire Extinguisher Price Guide 2026 | Soltree",
    metaDescription: "Complete 2026 FOB pricing guide for din rail aerosol fire extinguishers from China. Tiered MOQ pricing, cost breakdown, and TCO comparison vs FM-200 & Novec.",
    metaKeywords: "din rail aerosol fire extinguisher price, aerosol fire extinguisher cost, FOB china aerosol extinguisher, EN 15276 aerosol price, aerosol vs FM200 cost, aerosol vs Novec 1230, din rail aerosol MOQ pricing, aerosol fire suppression TCO",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "how-does-aerosol-fire-extinguisher-work-electrical-cabinets",
    title: "How Does an Aerosol Fire Extinguisher Work in Electrical Cabinets?",
    excerpt:
      "How a DIN-rail aerosol fire extinguisher actually stops an electrical-cabinet fire — the suppression mechanism, dual activation logic, three documented field cases, and why the technology has become a default specification in 2026.",
    content: `
In late 2023, a loose terminal in a low-voltage distribution cabinet at a German logistics warehouse arced during off-hours. Within 90 seconds, the temperature inside the enclosure exceeded 600 °C. By the time the building's overhead sprinklers activated, the cabinet had destroyed the adjacent control panel and shut down the entire facility for 11 days. Total loss: €2.3 million.

With a DIN-rail aerosol fire extinguisher inside the cabinet, the same fault profile plays out very differently. The moment internal temperature crosses 170 °C, the device discharges a fine cloud of suppressant, knocking out the fire before it escapes the enclosure. Damage: one melted terminal block.

That is the practical case for aerosol fire suppression in electrical cabinets. The remaining question is mechanical: how does a device the size of a circuit breaker stop a fire that traditional extinguishers cannot reach in time?

This guide covers:

- The science of how aerosol extinguishers work, in plain language
- Why electrical-cabinet fires behave differently from open-space fires
- Three documented case studies showing aerosol systems in field deployment
- The practical advantages that have made the technology a default specification for modern panels

> **Who this guide is for:** electrical engineers and panel builders specifying cabinet fire protection, EPC project teams selecting suppression for solar / BESS / EV / telecom assets, and procurement teams sourcing [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) for the first time.

## Why Electrical Cabinet Fires Are Different

Before the suppression mechanism makes sense, the fire profile inside a cabinet is worth understanding. Electrical-cabinet fires are dangerous in three specific ways.

### They Start Hidden

A loose terminal, a degraded contactor, or a failing capacitor can smolder inside an enclosed cabinet for hours before any external smoke is visible. By the time anyone notices, the fire is well-developed.

### They Escalate Fast

Once flames take hold inside a confined cabinet, internal temperatures can climb from ambient to over 800 °C in under three minutes. Cable insulation becomes fuel, the fire becomes self-sustaining, and propagation to neighboring equipment follows.

### They Are Hard to Reach

By the time someone arrives with a portable extinguisher, opening the cabinet door floods the fire with oxygen — often making it worse. Building-level sprinklers deliver water to the outside of the cabinet, which is both ineffective and damaging to surviving electronics.

This is the gap aerosol fire extinguishers are designed to close: automatic, internal, instant suppression at the source.

## How Aerosol Fire Extinguishers Work — Plain-Language Version

If you have ever used a kitchen fire blanket, you already understand most of how aerosol fire suppression works. The blanket smothers the fire by cutting off one of its key ingredients (oxygen). Aerosol extinguishers do something similar — but instead of cutting off oxygen, they cut off the chemical chain reaction that keeps the flame propagating.

### The Fire Triangle, and Why Aerosols Break It

Every fire needs three things — fuel, heat, and oxygen — plus a fourth, frequently-forgotten ingredient: a chemical chain reaction of free radicals that propagates the flame.

Most fire extinguishers attack the first three:

- **Water** cools (removes heat)
- **Foam** smothers (removes oxygen)
- **CO₂** displaces (removes oxygen)

Aerosol extinguishers attack the fourth — the chain reaction itself. That is what makes them efficient inside an enclosed volume.

### What Happens in 5 Seconds

When the device activates:

| Time | Event |
|---|---|
| 0 s | Internal trigger ignites a solid compound inside the unit |
| 1 s | Compound transforms into a fine aerosol mist (potassium-based) |
| 2–3 s | Aerosol disperses through the cabinet, riding on air currents |
| 3–5 s | Microscopic potassium particles bond with combustion radicals |
| 5+ s | Fire chain reaction collapses; flames extinguished |

The aerosol particles are roughly 1 micron in size — small enough to behave almost like a gas, reaching every corner of the cabinet including spaces behind components and inside conduit gaps. Traditional extinguishing agents do not penetrate these spaces.

### Why It Works in Cabinets

Aerosol extinguishers are most effective in enclosed spaces — exactly the environment an electrical cabinet provides. Open-space fires require large volumes of suppressant because the agent dissipates quickly. Inside a sealed cabinet, the aerosol stays concentrated long enough to extinguish even hidden fires behind components.

A single DIN-rail device weighing under 200 g can protect a 0.3 m³ cabinet — a job that would otherwise require a 6 kg FM-200 cylinder plus piping, nozzles, and a control panel.

## Activation: Two Triggers, One Failsafe Design

A common question from electrical engineers: what happens if the cabinet loses power during a fault?

This is why modern din rail aerosol extinguishers ship with dual activation.

### Trigger 1 — Heat (Always-On, Power-Independent)

A built-in thermal sensor — either a heat-sensitive cord or a glass bulb — activates the device when internal cabinet temperature exceeds a threshold (typically 170 °C). The trigger works whether or not the cabinet has power, making it failsafe.

**Field implication:** even if the fault that started the fire also tripped the cabinet's main breaker, the aerosol device still fires.

### Trigger 2 — Electrical Signal (Smart Integration)

A low-voltage input (12 V or 24 V DC) lets the device fire on command from:

- A cabinet smoke detector
- The building fire-alarm system
- A BMS (Building Management System)
- A manual emergency activation switch

**Field implication:** a smoke detector can trigger suppression at <60 °C — before the heat trigger would activate — catching slow-developing electrical fires earlier.

The combination gives what fire-safety engineers call defense in depth: two independent activation paths, so the device works even if one fails.

## Field Case Studies

The following three cases illustrate how aerosol systems perform in real electrical-cabinet incidents.

### Case Study 1 — Solar Inverter Fire (Spain, 2024)

**Setup.** A 5 MW commercial solar farm in Andalusia, Spain. Each string-inverter cabinet was equipped with a DIN-rail aerosol fire extinguisher (0.2 m³ rating, [EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010) certified).

**Incident.** During a heatwave, ambient temperature inside one inverter cabinet pushed beyond design limits. A DC capacitor failed and ignited nearby insulation.

**Response.** The aerosol unit's thermal trigger activated at 178 °C internal temperature. Discharge time ~6 seconds. Fire fully suppressed within 12 seconds of activation.

**Outcome:**

- Fire contained to the single failed component
- No external damage; adjacent string inverters remained operational
- Site downtime: 4 hours (component swap)
- Estimated avoided loss: €180,000 (vs. typical inverter cabinet fire claim)

**Engineering takeaway.** The aerosol's ability to penetrate around densely packed inverter components was the deciding factor — a single-point sprinkler or gas nozzle would have left shadow zones where the fire could persist.

### Case Study 2 — Telecom Base Station (Indonesia, 2023)

**Setup.** A remote tower-top telecom shelter in Sumatra, Indonesia. Unmanned site, four-hour drive from the nearest fire response. Critical battery-backup cabinet protected by a 4-unit aerosol array.

**Incident.** A degrading lead-acid battery cell experienced thermal runaway, releasing flammable hydrogen gas inside the cabinet. The hydrogen ignited from a nearby relay arc.

**Response.** All four aerosol units activated within 8 seconds (heat-triggered cascade). Discharge density was sufficient to suppress hydrogen flame propagation.

**Outcome:**

- Site continued operating on grid power
- Battery cabinet contained the incident; no shelter fire
- Network downtime: 0 minutes (failover to backup site)
- Replacement cost: $4,200 (battery + aerosol units) vs. estimated $85,000 for shelter rebuild

**Engineering takeaway.** For unmanned remote sites, no other suppression technology offers comparable reliability without ongoing maintenance. The aerosol units had been in place for three years with zero servicing.

### Case Study 3 — EV Charging Station (Germany, 2024)

**Setup.** A high-power DC fast-charging plaza with eight 350 kW chargers in Hamburg. Each charger's power cabinet was equipped with dual aerosol units (electrical activation linked to a smoke sensor).

**Incident.** A late-night charging session triggered an internal fault in the AC/DC converter module. Smoke was detected before flames developed.

**Response.** The smoke sensor triggered electrical activation at <60 °C cabinet temperature. Aerosol discharged into the suspected fault zone. No flames ever appeared.

**Outcome:**

- Fire prevented before ignition (early-stage suppression)
- Charger #4 returned to service after a 6-hour repair
- The other seven chargers remained operational throughout
- Plaza-wide shutdown and reputational impact avoided

**Engineering takeaway.** This case shows the value of electrical activation linked to smoke detection — the system intervened at the pre-flame stage, which is impossible with thermal-only systems.

## Why Cabinet Owners Specify Aerosol

The mechanism explains the cases. The cases explain why aerosol systems have become a default in new electrical-cabinet projects across 2024–2026:

- **It does not damage what it saves.** Aerosol residue is non-conductive and easily cleaned. Most surviving electronics return to service after a wipe-down — no PCB replacement required.
- **It does not need power to work.** The thermal trigger is purely mechanical. Even under total power failure, the device operates. Critical infrastructure (telecom, BESS, rail signaling) increasingly specifies aerosol over gas-based systems for this reason.
- **It is safe around people.** Unlike CO₂, which displaces oxygen, aerosol agents at design density carry no asphyxiation risk. Maintenance technicians do not need to evacuate the room before the system is armed.
- **It is always on, with no maintenance.** No annual recharging, no pressure checks, no piping integrity tests. The unit sits on the rail and waits 10 years until either a fire happens or it is replaced.
- **It is compact enough to be everywhere.** Each unit takes the space of a few circuit breakers, allowing protection at the cabinet level — exactly where the fire risk is. Building-level systems cannot match that granularity.

## Frequently Asked Questions

### How fast does an aerosol fire extinguisher actually suppress a fire?

From activation to flame extinction is typically 5–15 seconds, depending on cabinet volume and fire intensity. The discharge itself takes 5–30 seconds.

### Will the aerosol damage sensitive electronics?

The aerosol leaves a fine residue that is non-conductive and not corrosive in the short term. Equipment should be cleaned within 24–48 hours after discharge for full restoration.

### Is there any risk to people nearby?

At design suppression density, the aerosol is non-toxic. Evacuation is recommended due to reduced visibility during discharge. There is no asphyxiation risk as with CO₂ systems.

### Can a fire defeat the aerosol — for instance, if it is burning at very high intensity?

As long as cabinet integrity is maintained (door closed) and the unit is correctly sized for the volume, aerosol systems handle Class A, B, and C fires effectively. Oversized fires or open cabinets reduce effectiveness, which is why sizing matters.

### What if the device misfires or malfunctions?

Modern certified units carry failure rates below 0.01% over their service life. Quality units include a visual status LED for periodic inspection without physical contact.

## The Bottom Line for Cabinet Designers

For specifiers and procurement teams sourcing fire protection for electrical enclosures in 2026, the question is not whether aerosol suppression works — the technology has been validated across thousands of installations and certified to international standards (EN 15276, UL 2775, GB 25972).

The relevant question is the cost of not having it. A single uncontrolled cabinet fire can:

- Destroy €100k–€2M in adjacent equipment
- Trigger weeks of unplanned downtime
- Void insurance coverage if mandated protection was not installed
- Create cascading liability across the supply chain

A properly specified DIN-rail aerosol system, by contrast, costs $30–$60 per cabinet, installs in five minutes, and operates for 10 years without maintenance.

## Related Reading

Now that the suppression mechanism is clear, the next decisions are deployment, sizing, and comparison:

- **Category foundation:** [What is a din rail aerosol fire extinguisher?](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide) — the technical primer with components, key characteristics, and quality indicators
- **Where it gets deployed:** [Top 8 applications in 2026](/blog/top-8-applications-din-rail-aerosol-fire-extinguishers-2026) — vertical-by-vertical fire-risk profile and market sizing
- **How big a unit do you need:** [Step-by-step sizing calculation guide](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide) — the EN 15276 formula and two worked examples
- **Versus alternatives:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — when each technology is the right answer
- **Sourcing pillar:** [The complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — supplier vetting, certifications, MOQ, and shipping

**Need technical specs for a specific application?** See the full datasheet on the [DIN Rail Thermal Aerosol Fire Extinguishing Device product page](/products/din-rail-aerosol-fire-extinguisher), then [contact our team](/contact) with cabinet dimensions, target market, and any existing fire-alarm panel integration requirements, and receive a detailed datasheet, model recommendation, and dual-activation configuration within one business day.
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/how-aerosol-fire-extinguisher-works-electrical-cabinets.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Fire Suppression", "Electrical Cabinet Protection", "Technical Guide", "Case Study"],
    readingTime: 9,
    metaTitle: "How Does an Aerosol Fire Extinguisher Work in Cabinets? | Soltree",
    metaDescription: "Learn how DIN-rail aerosol fire extinguishers stop electrical-cabinet fires in seconds — suppression mechanism, dual activation, and three real field case studies.",
    metaKeywords: "how aerosol fire extinguisher works, aerosol fire suppression mechanism, electrical cabinet fire suppression, condensed aerosol chemistry, potassium aerosol fire suppression, aerosol fire extinguisher activation, dual activation aerosol, aerosol vs FM200 cabinet",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "top-8-applications-din-rail-aerosol-fire-extinguishers-2026",
    title: "Top 8 Applications of Din Rail Aerosol Fire Extinguishers in 2026",
    excerpt:
      "The 8 industrial applications driving 2026 demand for din rail aerosol fire extinguishers — market size, CAGR, distributor margins, and a phased market-entry framework for B2B sales teams and importers.",
    content: `
For distributors and importers evaluating new product lines for 2026, the din rail aerosol fire extinguisher category sits at a useful intersection: a mature, certifiable product technology meeting rapidly broadening fire-protection requirements across modern electrical infrastructure.

The global market for cabinet-level fire suppression is projected to grow from $1.4B in 2024 to $2.6B by 2030 (CAGR ~10.8%), with DIN-rail mounted aerosol units capturing the fastest-growing share. The driver is structural: every new switchgear panel, motor control center, and PLC cabinet built today is an addressable point of sale.

> **Note on market data:** segment-level market sizing and CAGR figures throughout this guide are aggregated from publicly available industry reports — including [Grand View Research](https://www.grandviewresearch.com/), [Mordor Intelligence](https://www.mordorintelligence.com/), [IBISWorld](https://www.ibisworld.com/), and [MarketsandMarkets](https://www.marketsandmarkets.com/) fire-suppression and electrical-cabinet protection reports (2024–2025) — combined with Soltree's own export-shipment data across 80+ countries. Treat figures as directional estimates for market-entry planning, not as audited financial projections.

This guide breaks down the 8 highest-volume industrial applications driving 2026 demand:

- Estimated market size and growth rate per segment
- The fire-risk profile that creates the buying need
- Typical project volumes
- Distributor margin opportunity
- Specification keywords to use with end customers

> **Who this guide is for:** distributors, importers, and B2B sales teams scoping market entry or portfolio expansion for [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) across European, GCC, ASEAN, and LATAM markets.

## Why These 8 Applications Lead the Market

Four structural forces have moved industrial electrical cabinets from "occasional fire-suppression candidate" to "default deployment environment" for DIN-rail aerosol systems:

**1. Fire codes are tightening globally.** New EU, GCC, and ASEAN building codes effective 2024–2026 increasingly mandate active fire suppression at the cabinet level for unmanned facilities.

**2. Insurance is driving upgrades.** Major industrial insurers now offer 5–15% premium reductions for facilities with cabinet-level suppression — and increasingly deny coverage on new installations without it.

**3. Equipment density is rising.** Modern panels pack 30–50% more components into the same footprint than designs from 2015. Both fire probability and the cost of any single incident have moved up.

**4. Retrofit demand is accumulating.** An estimated 40+ million unprotected industrial cabinets are operating across Europe, GCC, and ASEAN markets — a multi-decade retrofit pipeline.

The four forces compound across every application below.

## Application 1 — Low-Voltage Distribution Cabinets (LV Panels)

**Market size:** $480M cabinet-protection segment (2026 estimate). **CAGR:** 9.4%.

LV distribution cabinets — the panels that deliver electricity to floors, zones, and equipment within commercial and industrial buildings — are the single largest deployment environment for DIN-rail aerosol systems.

### Why Fire Risk Is High

LV panels typically house dozens of MCBs, RCDs, contactors, and terminal blocks operating at 230–400 V AC. Common failure modes:

- Loose terminal connections creating arc faults
- Aged or undersized cable insulation
- Contactor coil failures
- Dust accumulation creating tracking paths

A single arc fault can reach 20,000 °C at the point of failure — sufficient to ignite cable insulation in milliseconds.

### Distributor Opportunity

- **Typical project volume:** 4–12 units per medium commercial building
- **End customers:** electrical contractors, panel builders, facility managers
- **Margin range:** 45–60% gross (volume-driven)
- **Key spec:** 0.2–0.5 m³ protection volume, dual activation, [EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010) certified

### Selling Angle

Frame as an insurance-grade compliance upgrade. Most LV panels installed before 2020 carry zero internal fire protection, and insurance audits increasingly flag this as a coverage condition.

## Application 2 — Motor Control Centers (MCCs)

**Market size:** $290M segment. **CAGR:** 11.2% (driven by manufacturing reshoring).

Motor Control Centers house the soft starters, VFDs, and contactors that drive industrial loads — conveyors, pumps, HVAC fans, mixers.

### Why Fire Risk Is High

MCCs combine high current loads (often 200–630 A per drawer) with heat-generating components, especially VFDs. Typical failure scenarios:

- VFD capacitor failure leading to internal arc
- Contactor welding under inrush current
- Insulation breakdown in heavily-loaded busbars

A 2023 industry survey of European manufacturers found that 34% of unplanned production stoppages lasting >24 hours were linked to MCC fires or thermal events.

### Distributor Opportunity

- **Typical project volume:** 8–24 units per facility (one per MCC drawer/section)
- **End customers:** OEM panel builders, system integrators, plant maintenance teams
- **Margin range:** 40–55% gross
- **Key spec:** 0.3–0.8 m³ protection volume, electrical activation linked to plant fire alarm

### Selling Angle

Production-continuity protection. A single MCC fire can shut down a production line for days; aerosol cost is typically recovered after preventing a single 4-hour stoppage.

## Application 3 — PLC and Automation Control Cabinets

**Market size:** $215M segment. **CAGR:** 12.8% (Industry 4.0 driven).

As factories digitize, the population of PLC, DCS, and SCADA control cabinets is growing faster than other industrial cabinet categories. Each cabinet controls a slice of plant operations and represents a single point of failure.

### Why Fire Risk Is High

PLC cabinets run cooler than power distribution but are not risk-free:

- 24 V DC power supply units running at near-continuous load
- Densely packed I/O modules with limited airflow
- Communication modules generating localized heat
- Cable bundles with mixed voltages creating chafe risk

The dominant issue is consequence severity rather than fire frequency. A burned-out PLC cabinet can halt an entire production line, with restart costs running into hundreds of thousands of dollars.

### Distributor Opportunity

- **Typical project volume:** 15–60 units per smart factory
- **End customers:** system integrators, automation specialists, plant engineering
- **Margin range:** 50–65% gross (specification sale, lower price sensitivity)
- **Key spec:** 0.1–0.3 m³ ultra-thin units, BMS-integrated electrical activation

### Selling Angle

Single-point-of-failure protection. Automation engineers respond to consequence-management framing rather than commodity pricing.

## Application 4 — Switchgear and Medium-Voltage Panels

**Market size:** $410M segment. **CAGR:** 8.6%.

MV switchgear (typically 6.6 kV–35 kV) sits at the heart of utility substations, large industrial facilities, and commercial campuses. Failures here are high-consequence and expensive.

### Why Fire Risk Is High

MV switchgear stores significant electrical energy. When a fault develops:

- Internal arc faults can release 100+ MJ of energy in milliseconds
- Insulating oil (in some legacy designs) becomes fuel
- SF6 gas insulation can decompose into toxic byproducts
- Single-phase faults often escalate to three-phase if not arrested

Industry data places the average internal MV switchgear fire incident at $1.2M, including equipment replacement, downtime, and consequential damages.

### Distributor Opportunity

- **Typical project volume:** 6–20 units per substation
- **End customers:** utility EPC contractors, switchgear OEMs, industrial substation operators
- **Margin range:** 35–50% (project-tender driven, more competitive)
- **Key spec:** 0.5–1.0 m³ protection volume, steel housing, UL or EN certified

### Selling Angle

Asset protection on critical equipment. Buyers in this segment compare aerosol cost ($30–60/unit) against the $200K+ replacement cost of a single MV switchgear cubicle.

## Application 5 — Generator and UPS Control Cabinets

**Market size:** $185M segment. **CAGR:** 10.5%.

Backup power systems — diesel gensets, battery UPS, hybrid power — are deployed across data centers, hospitals, telecom sites, manufacturing, and increasingly residential complexes facing grid instability.

### Why Fire Risk Is High

Backup power control cabinets stack multiple risk factors:

- Battery management systems near energy storage
- Automatic transfer switches handling high inrush currents
- Charging and inverter electronics running continuously
- Frequent unmanned or remotely managed deployment

The unmanned factor is decisive: cabinets often operate for years without human inspection, allowing small faults to escalate undetected.

### Distributor Opportunity

- **Typical project volume:** 2–8 units per backup-power installation
- **End customers:** genset OEMs, UPS distributors, critical-facility EPCs
- **Margin range:** 45–55% gross
- **Key spec:** 0.2–0.5 m³ units, dual activation, wide operating temperature (–40 °C to +85 °C)

### Selling Angle

Unmanned-site reliability. For installations without daily inspection, autonomous fire suppression is the only realistic protection.

## Application 6 — Industrial HVAC and Building Management Cabinets

**Market size:** $140M segment. **CAGR:** 9.0%.

Every commercial building has them — chiller control panels, AHU cabinets, BMS server enclosures, pump-room control panels that run the building's environmental systems. Fire here does not just damage equipment; it shuts the building down.

### Why Fire Risk Is High

HVAC control cabinets often suffer from environmental factors specific to their location:

- High humidity in pump rooms accelerating insulation aging
- Dust accumulation in mechanical spaces
- Temperature cycling in rooftop installations
- Frequent contactor cycling for stop/start operations

A burned-out chiller controller in summer can render an entire commercial building uninhabitable within hours.

### Distributor Opportunity

- **Typical project volume:** 6–15 units per medium commercial building
- **End customers:** HVAC contractors, BMS integrators, facility services companies
- **Margin range:** 50–65% gross (lower price sensitivity, often pass-through to facility budgets)
- **Key spec:** 0.2–0.4 m³ units, IP-rated for mechanical environments

### Selling Angle

Building-uptime protection. Facility managers understand that HVAC failure is a tenant-complaint and liability event, not just an equipment problem.

## Application 7 — Industrial Battery Storage Cabinets

**Market size:** $260M segment. **CAGR:** 18.4% — the fastest-growing in this list.

Industrial battery cabinets — UPS battery rooms, BESS auxiliary cabinets, forklift charging stations, telecom backup batteries — represent the highest fire-risk-per-cubic-meter of any application here, and the fastest-growing market segment.

### Why Fire Risk Is High

Battery thermal events combine multiple compounding hazards:

- Internal heat generation from cell degradation
- Self-sustaining fire chemistry (lithium especially)
- Hydrogen gas accumulation in lead-acid systems
- Cascade propagation between cells

Once a battery fire is established, external suppression becomes very difficult. The viable strategy is early intervention — exactly what cabinet-level aerosol systems provide.

### Distributor Opportunity

- **Typical project volume:** 4–20 units per installation (multiple per battery cabinet)
- **End customers:** UPS specialists, BESS integrators, forklift fleet managers, telecom operators
- **Margin range:** 50–70% gross — the highest in this category, since buyers prioritize quality over price
- **Key spec:** 0.2–0.5 m³ units with electrical activation, fast response (<10 s)

### Selling Angle

Thermal-runaway intervention. Buyers in battery applications pay premium prices for proven, certified solutions because the alternative is total asset loss.

## Application 8 — Telecom Outdoor and Edge Computing Cabinets

**Market size:** $230M segment. **CAGR:** 13.7% (5G + edge driven).

5G base-station and edge-computing rollouts are creating outdoor industrial cabinets at scale. Each houses critical electronics — routers, baseband units, power supplies, batteries — often in remote, unmanned locations.

### Why Fire Risk Is High

Outdoor telecom and edge cabinets face stacked risk factors:

- Continuous electrical load with limited cooling
- Outdoor environmental stress (heat, humidity, dust, lightning)
- Battery backup systems integrated in the same enclosure
- Remote locations with delayed fire response (often 30+ minutes)

For a telecom operator, a single base-station fire is not just equipment loss — it is coverage loss, SLA penalties, and operator-brand damage.

### Distributor Opportunity

- **Typical project volume:** 1–4 units per cabinet × thousands of cabinets per network rollout
- **End customers:** telecom OEMs (Huawei, Ericsson, Nokia ecosystems), tower companies, edge operators
- **Margin range:** 35–50% (large-scale tenders, volume-driven)
- **Key spec:** wide-temperature units (–40 °C to +85 °C), salt-mist resistance, dual activation

### Selling Angle

Network-reliability protection. Unit cost is trivial against the cost of a single coverage gap; once specified into one operator's standard, the spec carries across the entire network rollout.

## Application Comparison Matrix

| Application | Market size | CAGR | Margin potential | Volume per project | Sales cycle |
|---|---|---|---|---|---|
| LV Distribution Cabinets | $480M | 9.4% | High | Medium | Short |
| Motor Control Centers | $290M | 11.2% | Medium | High | Medium |
| PLC Control Cabinets | $215M | 12.8% | Very High | High | Medium |
| MV Switchgear | $410M | 8.6% | Medium | Medium | Long |
| Generator / UPS | $185M | 10.5% | High | Low–Medium | Medium |
| HVAC / BMS Cabinets | $140M | 9.0% | Very High | Medium | Short |
| Battery Storage | $260M | 18.4% | Very High | Medium–High | Medium |
| Telecom / Edge | $230M | 13.7% | Medium | Very High | Long |

> **Distributor strategy note:** for first-time market entry, HVAC/BMS cabinets and PLC control cabinets offer the best combination of margin, sales-cycle length, and reorder potential. Battery storage offers the highest growth but requires more technical pre-sales support. Telecom/Edge offers the largest volumes but requires winning OEM specifications — a longer game with a bigger payoff.

## How to Approach These Markets

For distributors entering this product category, a practical sequencing:

### Phase 1 (Months 1–3): Establish Quick Wins

Focus on LV distribution cabinets and HVAC/BMS cabinets. Short sales cycles, broad customer base, low technical pre-sales burden. Build a reference customer list.

### Phase 2 (Months 4–9): Build Specification Wins

Target PLC control cabinets and MCCs through system integrators. Customers value technical specifications and reorder consistently. Margins are higher, and once specified in, competitors find it hard to displace the incumbent.

### Phase 3 (Year 2+): Pursue Volume Plays

Engage with telecom operators and battery-storage integrators. Longer sales cycles, OEM-level engagement, but multi-thousand-unit annual volumes once won.

This sequencing has been used by distributors entering European and Middle Eastern markets across 2023–2025.

## Frequently Asked Questions

### Can a single product SKU serve all 8 applications?

No. The underlying technology is the same, but applications differ in cabinet volume, environment (indoor/outdoor), temperature range, and activation requirements. Most distributors stock 3–5 SKUs covering 0.1, 0.3, 0.5, and 1.0 m³ protection volumes, with dual activation as standard.

### Which application has the lowest barrier to entry?

LV distribution cabinets — short sales cycles, broad customer base, no specialized technical knowledge required. Most new distributors start here.

### Which application has the highest margin?

Battery storage and HVAC/BMS — buyers in these segments are less price-sensitive because consequence cost (battery fire / building shutdown) far exceeds the unit cost.

### Are these market sizes for aerosol products specifically, or all suppression types?

The figures represent total cabinet-level fire-protection spend in each application. Aerosol systems currently capture an estimated 35–50% of new installations, with that share growing at the expense of FM-200 / Novec 1230 and dry-powder systems.

### How can I qualify which applications are growing fastest in my specific market?

National statistics on construction starts, manufacturing investment, telecom rollouts, and renewable-energy projects are the leading indicators. For most European and Middle Eastern markets in 2026, battery storage and telecom/edge are growing fastest.

## The Bottom Line

Cabinet-level fire suppression is shifting from a niche category to a default specification line in modern electrical projects across most industrial verticals. Distributors who establish a position in this category in 2026 are at the start of a multi-decade replacement and retrofit cycle.

The 8 applications above are not equally easy to enter, and not equally profitable. All 8 are growing, and all 8 represent repeatable B2B revenue for distributors who pair the right product with the right go-to-market approach.

## Related Reading

Once the target verticals are picked, the next questions are technology fit, sizing, and sourcing:

- **Category foundation:** [What is a din rail aerosol fire extinguisher?](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide) — the technical primer to share with end customers
- **How it works:** [How aerosol fire extinguishers stop electrical-cabinet fires](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) — the suppression mechanism plus three field cases
- **Versus competing technologies:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — for engineer-to-engineer specification conversations
- **Per-application sizing:** [Step-by-step sizing calculation guide](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide) — to scope the right SKU per cabinet volume
- **Reference pricing:** [2026 FOB price guide](/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026) — distributor-margin modeling and MOQ ladder
- **Sourcing pillar:** [Complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — supplier vetting and certifications

**Ready to scope the right SKU mix for a specific market?** Start with the [Soltree DIN Rail Thermal Aerosol Fire Extinguishing Device product page](/products/din-rail-aerosol-fire-extinguisher) for the standard 10 g / 20 g / 30 g variants, then [contact our team](/contact) with the applications targeted, MOQ structure desired, and certification routing required, and receive a distributor catalog and pricing sheet within one business day.
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/top-8-applications-din-rail-aerosol-fire-extinguisher.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Applications", "Market Analysis", "B2B Procurement", "Distributor Strategy"],
    readingTime: 11,
    metaTitle: "Din Rail Aerosol Fire Extinguisher: 8 Top Applications | Soltree",
    metaDescription: "The 8 industrial applications driving demand for din rail aerosol fire extinguishers in 2026 — market size, CAGR, distributor margins, and sales-cycle data.",
    metaKeywords: "din rail fire extinguisher applications, aerosol fire extinguisher use cases, electrical cabinet fire protection markets, BESS fire suppression, MCC fire protection, PLC cabinet fire suppression, telecom cabinet fire suppression, switchgear fire protection",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression",
    title: "Aerosol vs FM-200 vs CO2 vs Novec 1230: Switchgear Fire Suppression Compared",
    excerpt:
      "Side-by-side comparison of aerosol, FM-200, CO2, and Novec 1230 fire suppression for switchgear and electrical cabinets — 12-dimension technical comparison, 10-year TCO modelling, and a per-scenario decision framework.",
    content: `
For technical decision-makers specifying fire suppression for switchgear, motor control centers, or other electrical cabinets in 2026, four mainstream options are usually on the table: aerosol systems, FM-200 (HFC-227ea), CO₂, and Novec 1230 (FK-5-1-12).

Each has legitimate strengths. Each also has scenarios where it is the wrong choice — sometimes expensively wrong.

This guide compares all four technologies across the metrics that drive specification decisions. It is written without vendor bias and is explicit about where each technology wins, including the cases where aerosol is not the right answer.

What you get:

- A side-by-side technical and commercial comparison across 12 dimensions
- Per-scenario recommendations for which technology fits which application
- 10-year TCO modelling on identical cabinet protection
- A decision framework for any switchgear scenario

For most cabinet-level switchgear protection, aerosol systems offer the best overall value in 2026. There are specific cases where FM-200, CO₂, or Novec is the correct choice — and the sections below identify them.

> **Who this guide is for:** electrical engineers, EPC project teams, fire-protection consultants, and procurement managers comparing [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) against gaseous clean-agent and CO₂ alternatives.

## Quick Comparison: The 30-Second Answer

For readers short on time:

| Need | Best Choice |
|---|---|
| Cabinet-level protection (most common) | Aerosol |
| Large-volume room-level protection | Novec 1230 or FM-200 |
| Unmanned outdoor / remote sites | Aerosol |
| Sensitive electronics / data centers (room-level) | Novec 1230 |
| Heavy industrial / outdoor with strict environmental rules | CO₂ (specific cases only) |
| Lowest TCO over 10 years | Aerosol |
| Fastest installation | Aerosol |
| Total flooding of large enclosed spaces | FM-200 or Novec 1230 |

For roughly 80% of switchgear and electrical cabinet applications, aerosol wins on cost, footprint, maintenance, and certification accessibility. For the remaining 20% — primarily large room-level deployments — gas-based systems remain the right answer.

The next sections explain why.

## How Each Technology Works

Before comparing performance, the four technologies take fundamentally different approaches.

### Aerosol Fire Suppression

A solid potassium-based compound is electrically or thermally ignited inside the device, producing a fine aerosol cloud (~1 micron particle size) that floods the protected space. Suppression mechanism: chemical chain-reaction interruption — free potassium radicals neutralize combustion radicals at the molecular level.

**Key characteristic:** highly effective in enclosed spaces, with very high suppression density per kilogram of agent.

### FM-200 (HFC-227ea)

A hydrofluorocarbon clean agent stored as a liquid under pressure in cylinders. On discharge, it vaporizes and floods the protected room, suppressing fire through a combination of heat absorption and chemical inhibition. Design concentration: typically 7%.

**Key characteristic:** mature technology with extensive engineering standards ([NFPA 2001](https://www.nfpa.org/codes-and-standards/all-codes-and-standards/list-of-codes-and-standards/detail?code=2001), [ISO 14520](https://www.iso.org/standard/65336.html)) but high global warming potential (GWP ≈ 3,220).

### CO₂ Fire Suppression

Pressurized CO₂ stored in cylinders, discharged into the protected space to displace oxygen below combustion-supporting concentrations. Design concentration: typically 34–75% by volume depending on fuel hazard.

**Key characteristic:** very effective and inexpensive per kilogram, but lethal to humans at design concentration. Cannot be used in normally-occupied spaces.

### Novec 1230 (FK-5-1-12)

A fluorinated ketone clean agent that is liquid at room temperature and vaporizes rapidly on discharge. Suppression is primarily heat absorption (roughly 2× the heat-absorbing capacity of FM-200). Design concentration: typically 4–6%.

**Key characteristic:** lowest environmental impact among clean agents (GWP <1, ODP = 0), making it the modern replacement for FM-200 — at significantly higher cost.

## Technical Comparison: 12 Dimensions

Side-by-side technical comparison for switchgear specification:

| Dimension | Aerosol | FM-200 | CO₂ | Novec 1230 |
|---|---|---|---|---|
| Suppression mechanism | Chemical chain interruption | Heat absorption + chemical | Oxygen displacement | Heat absorption |
| Design density | 100–150 g/m³ | 7% v/v | 34–75% v/v | 4.5–6% v/v |
| Discharge time | 5–30 s | 10 s | 60–120 s | 10 s |
| Suppression time | 5–15 s | 10–30 s | 30–60 s | 10–30 s |
| Storage | Solid (no pressure) | Pressurized liquid | High-pressure gas | Low-pressure liquid |
| Pipe network required | No | Yes | Yes | Yes |
| Power required to operate | No (thermal trigger option) | Yes (control panel) | Yes (control panel) | Yes (control panel) |
| Damage to electronics | Minor residue (cleanable) | None | None | None |
| Personnel safety at design density | Safe (brief exposure) | Safe | Lethal | Safe |
| GWP (Global Warming Potential) | <1 | 3,220 | 1 | <1 |
| ODP (Ozone Depletion) | 0 | 0 | 0 | 0 |
| Service life without maintenance | 10 yrs | 1 yr (annual check) | 1 yr (annual weighing) | 1 yr (annual check) |

### What the Table Reveals

Four observations vendor sheets often gloss over:

**1. CO₂ is fundamentally different from the others.** It is the only system in the comparison that suppresses fire by starving it of oxygen, which is exactly why it is lethal to humans. Modern building codes severely restrict its use, and it should not be considered for any space personnel ever enter.

**2. FM-200 is being phased out.** Still legal in most markets, but the high GWP is driving regulatory pressure (especially in the EU). Many fire-protection consultancies now decline to specify FM-200 on new projects, recommending Novec 1230 instead.

**3. Novec 1230 is technically superior to FM-200 but significantly more expensive** — roughly 2.5× the agent cost per cabinet, with similar hardware costs. For new installations, the question is increasingly "Aerosol or Novec?" rather than "Which clean agent?"

**4. Aerosol is the only option that does not require a piping network.** That is the single largest cost and complexity differentiator, quantified in the next section.

## Commercial Comparison: 10-Year TCO

The cost picture makes the choice clear for most applications. A 10-year Total Cost of Ownership for protecting a single 0.5 m³ switchgear cabinet:

| Cost category | Aerosol | FM-200 | CO₂ | Novec 1230 |
|---|---|---|---|---|
| Hardware (initial) | $35 | $450 | $320 | $620 |
| Piping & nozzles | $0 | $120 | $150 | $120 |
| Detection panel | $40 (optional) | $250 (required) | $250 (required) | $250 (required) |
| Installation labor | $15 | $180 | $200 | $180 |
| Annual inspection (10 yrs) | $0 | $800 | $900 | $800 |
| Agent recharge (1× over 10 yrs) | $0 (replace at yr 10) | $280 | $180 | $620 |
| Unit replacement at end of life | $35 | $0 | $0 | $0 |
| **10-year TCO per cabinet** | **$125** | **$2,080** | **$2,000** | **$2,590** |
| Cost per m³ protected | $250 | $4,160 | $4,000 | $5,180 |

### Why the Cost Gap Exists

The cost difference is structural, not just a matter of cheap-vs-expensive technology.

Gas-based systems require a complete fire-suppression infrastructure:

- Detection panel
- Pressurized cylinder bank (often in a remote room)
- Distribution piping with engineered nozzles
- Discharge alarms and abort switches
- Annual service contracts to maintain certification

Aerosol systems consolidate the entire chain into one device:

- The "cabinet" is the protected space
- The "cylinder" is the DIN-rail unit
- The "nozzle" is built into the unit
- The "detector" is the integrated thermal trigger
- No annual servicing — the unit either works or gets replaced

For a 50-cabinet switchgear lineup, the gap widens further: $6,250 total for aerosol versus $104,000 for FM-200.

> **Caveat:** the TCO advantage applies to cabinet-level protection. For a single large room with many cabinets, gas-based systems can become more cost-effective because one cylinder bank protects multiple cabinets. The room-level case is addressed below.

## Where Each Technology Wins

This is the section most vendor comparisons skip — the scenarios where aerosol is not the best answer.

### Aerosol Wins When

- **Per-cabinet protection is required.** When each cabinet needs independent suppression (most modern switchgear designs), aerosol's compact form factor is unmatched.
- **The site is unmanned or remote.** No annual servicing requirement is a major operational advantage for telecom sites, solar farms, BESS installations, and remote substations.
- **Power may not be available during a fault.** Thermal-trigger activation works without power; gas systems require a powered control panel.
- **Total cost matters more than absolute zero residue,** in equipment that can tolerate a wipe-down after discharge.
- **Fast deployment is needed.** Plug-and-play installation in minutes versus days of pipework.

### FM-200 Wins When

- **An existing FM-200 system is being maintained.** Replacing existing cylinders is simpler than redesigning the whole suppression scheme.
- **The protected space is large but unitary.** A 100 m³ control room with multiple cabinets can be protected by a single FM-200 system more efficiently than by 50 individual aerosol units.
- **Zero residue is mandatory.** Some sensitive equipment (precision instrumentation, magnetic media) cannot tolerate any post-discharge residue.

> **Note:** FM-200 is being phased out due to GWP concerns. For new installations in 2026, Novec 1230 is the better gas-system choice.

### CO₂ Wins When

- **The space is permanently unoccupied** — underground vaults, sealed equipment rooms, vessel engine rooms (with proper safety protocols).
- **The fuel hazard is liquid or gas.** CO₂ is highly effective on Class B fires.
- **Cost-per-kilogram matters at very large scale.** For protecting massive industrial volumes (>1,000 m³), CO₂ economics can become favorable.

> **Note:** modern building codes and worker safety regulations make CO₂ specification increasingly difficult. For most switchgear applications, it is not a viable choice in 2026.

### Novec 1230 Wins When

- **A clean agent is needed and environmental compliance is critical.** Novec's GWP <1 and short atmospheric lifetime make it the most regulator-friendly clean agent.
- **The application is a data center or mission-critical electronics room.** Total flooding of large electronics rooms with zero residue is what Novec 1230 was designed for.
- **Insurance or end-customer specifications mandate clean agents.** Some financial, military, and museum specifications still require specific clean-agent solutions.

> **Note:** for room-level data center protection, Novec 1230 is the right choice. Aerosol systems are not designed for very large room flooding.

## The Decision Framework

For a switchgear or electrical cabinet specification, walk the following decision tree:

**Q1. Is the protected space a single cabinet or enclosure?**

- **Yes** → continue to Q2
- **No** → continue to Q4

**Q2. Will personnel ever enter the space?**

- **Yes** → continue to Q3
- **No** → use aerosol or CO₂ (CO₂ only where regulations allow)

**Q3. Is the space remote / unmanned routinely?**

- **Yes** → use **aerosol**
- **No** → use aerosol or Novec 1230 (trade off cost vs. residue)

**Q4. Is it a large room (>50 m³) with multiple cabinets?**

- **Yes** → continue to Q5
- **No** → use **aerosol with multiple units**

**Q5. Is environmental compliance critical?**

- **Yes** → use **Novec 1230**
- **No** → use FM-200 or Novec 1230 (trade off cost vs. compliance)

### Worked Example 1 — Solar Farm Inverter Cabinet

- **Protected space:** single 0.4 m³ inverter cabinet (single enclosure)
- **Personnel access:** maintenance only, with cabinet de-energized
- **Site:** remote, unmanned 95% of the time
- **Outcome:** aerosol — cost-effective, no maintenance, works without power

### Worked Example 2 — Bank Data Center

- **Protected space:** 200 m³ server room with 30 racks
- **Personnel access:** daily, including night-shift staff
- **Site:** manned 24/7, mission-critical
- **Outcome:** Novec 1230 — clean agent, personnel-safe, room-level total flooding

Both decisions are correct because each technology fits its specific scenario.

## The Hybrid Approach Most Specifiers Miss

For larger facilities, single-technology specifications are often suboptimal. Many modern installations now use a layered protection strategy:

- **Cabinet-level:** aerosol units inside each switchgear cubicle (fast localized response)
- **Room-level:** Novec 1230 total-flooding system (backup for cabinet escalation)
- **Detection:** aspirating smoke detection feeding a unified control panel

The architecture catches fires at the earliest possible stage (cabinet-level aerosol) while preserving room-level backup if cabinet suppression fails. It is the baseline used in most new high-value installations — data centers, BESS facilities, telecom hubs — and is the practical reference for layered fire protection in 2026.

The cost overhead of the room-level layer is meaningful, but for assets worth $10M+ the redundancy is justified.

## Common Specification Mistakes

The four most common specification errors in switchgear fire suppression:

**Mistake 1: Specifying FM-200 on a 2026 new build.** GWP concerns are driving phase-down regulations across the EU and increasingly globally. New FM-200 installations may face compliance issues within their service life.

**Mistake 2: Using CO₂ in any space personnel access.** Asphyxiation risk is real, and modern liability standards make CO₂ in occupied spaces a serious legal exposure.

**Mistake 3: Choosing room-level gas systems for cabinet-level fires.** Detection lag means a cabinet fire can develop fully before room-level suppression activates — especially in tall switchgear lineups where smoke stratification delays detection.

**Mistake 4: Underestimating the maintenance cost of gas systems.** Hardware cost is the smallest part of TCO. Annual servicing over 10 years often exceeds the original system cost.

## Frequently Asked Questions

### Can aerosol systems be used for a large server room or data center?

Generally no — aerosol systems are designed for enclosed spaces, not large open rooms. For room-level data center protection, Novec 1230 is the appropriate choice. Aerosol units are increasingly used at the rack level in modern data center designs, complementing room-level Novec systems.

### Is FM-200 still legal to install in 2026?

Yes in most jurisdictions, but with increasing regulatory scrutiny. EU F-gas regulations are progressively restricting HFC use, and many fire-protection consultancies now decline to specify FM-200 on new projects. For new builds, Novec 1230 is the safer long-term choice.

### How does aerosol residue affect electronics post-discharge?

The aerosol leaves a fine, non-conductive residue that can be cleaned with standard electronic cleaning procedures. Equipment can typically be returned to service after a wipe-down. Gas systems leave zero residue, but the practical difference is usually a matter of cleanup time rather than equipment loss.

### Can these technologies be combined in one facility?

Yes, and increasingly they are. The hybrid approach above combines cabinet-level aerosol with room-level Novec 1230 for layered protection. This is becoming standard for high-value installations.

### What about water mist or dry powder systems?

This guide focuses on the four most common modern technologies for switchgear. Water mist is occasionally used for specific applications (machinery spaces, marine) but is generally not appropriate for electrical cabinets due to electrical conductivity risks. Dry powder is being phased out for most electrical applications because of cleanup difficulty after discharge.

## The Bottom Line

There is no universally "best" fire-suppression technology — only a best choice for each specific application. For cabinet-level switchgear protection in 2026, aerosol systems are usually that choice.

A direct summary:

- **For 80% of switchgear and electrical cabinet applications:** aerosol. Cost, footprint, maintenance, and reliability all favor this technology.
- **For room-level data center protection:** Novec 1230. Clean agent, personnel-safe, environmentally compliant.
- **For maintaining existing FM-200 systems:** continue with FM-200; new installations should consider alternatives.
- **For CO₂:** only in genuinely unoccupied industrial spaces, with strict safety protocols.

Specifiers who get fire protection right in 2026 are the ones who match the right technology to each protected space — usually aerosol at the cabinet, with gas systems reserved for genuine room-level applications.

## Related Reading

Once aerosol is on the shortlist, the practical follow-on questions are technology mechanics, sizing, and sourcing:

- **Category foundation:** [What is a din rail aerosol fire extinguisher?](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide) — the technical primer
- **Mechanism deep-dive:** [How aerosol fire extinguishers work in electrical cabinets](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) — chemistry plus three field case studies
- **Application fit:** [Top 8 applications driving 2026 demand](/blog/top-8-applications-din-rail-aerosol-fire-extinguishers-2026) — vertical-by-vertical deployment patterns
- **Sizing methodology:** [Step-by-step sizing calculation guide](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide) — the EN 15276 formula with worked examples
- **TCO inputs:** [2026 FOB price guide](/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026) — pricing benchmarks underlying the comparison above
- **Sourcing pillar:** [Complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — supplier vetting and certifications

**Need help specifying the right solution?** Soltree manufactures CE / EN 15276 certified DIN-rail aerosol fire extinguishers purpose-built for switchgear and electrical cabinet protection. Browse the flagship [DIN Rail Thermal Aerosol Fire Extinguishing Device](/products/din-rail-aerosol-fire-extinguisher) for full datasheets and 10 g / 20 g / 30 g variants. The engineering team supports specification decisions by reviewing cabinet specs, providing comparison data for stakeholder discussions, advising on hybrid protection schemes, and delivering transparent FOB pricing with full certification documentation.

[Contact our team](/contact) with cabinet specifications, target market, and any existing fire-alarm panel integration requirements, and receive a specification consultation, comparison datasheet, and FOB quotation within one business day.
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Fire Suppression", "FM-200", "Novec 1230", "Comparison", "Switchgear Protection"],
    readingTime: 12,
    metaTitle: "Aerosol vs FM-200 vs CO2 vs Novec 1230: Switchgear Suppression | Soltree",
    metaDescription: "Side-by-side comparison of aerosol, FM-200, CO2, and Novec 1230 fire suppression for switchgear — technical specs, 10-year TCO, and per-scenario recommendations.",
    metaKeywords: "aerosol vs fm200, aerosol vs novec 1230, aerosol vs co2 fire suppression, switchgear fire suppression comparison, fm200 vs novec 1230, electrical cabinet suppression options, clean agent vs aerosol, fire suppression TCO switchgear",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide",
    title: "How to Size a Din Rail Aerosol Fire Extinguisher: A Step-by-Step Calculation Guide",
    excerpt:
      "The complete sizing methodology for din rail aerosol fire extinguishers — the EN 15276 formula, a 5-step calculation process, two fully-worked examples, and the most common errors specifiers make.",
    content: `
Specifying the right size of aerosol fire extinguisher is a calculation grounded in standards ([EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010), [UL 2775](https://www.shopulstandards.com/ProductDetail.aspx?productId=UL2775), [ISO 15779](https://www.iso.org/standard/55642.html)) and a small handful of variables that any qualified engineer can work through in roughly 10 minutes.

Get the sizing right and the result is certified, reliable cabinet protection. Get it wrong — undersized or oversized — and the outcome is either inadequate suppression or wasted budget.

This guide walks through the sizing methodology used by qualified fire-protection engineers, including:

- The core EN 15276 sizing formula and what each variable means
- A 5-step calculation process from cabinet measurement to product selection
- Two fully-worked calculation examples for common scenarios
- The "design density" requirement most online sizing tools handle incorrectly
- The most common sizing mistakes and how to avoid them

After working through this guide, sizing a basic cabinet protection installation can be handled independently. For complex multi-cabinet projects, marine or outdoor environments, or applications requiring formal fire-protection engineering certification, the section on professional escalation below identifies exactly when to bring in a qualified specifier.

> **Who this guide is for:** electrical engineers, panel builders, EPC project teams, and procurement managers specifying [din rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) for switchgear, MCCs, distribution panels, or solar / BESS / telecom cabinets.

## The Core Sizing Equation

At its simplest, sizing an aerosol fire extinguisher is governed by one equation:

**Required Agent Mass (g) = Protected Volume (m³) × Design Density (g/m³) × Safety Factor**

The equation comes directly from EN 15276 (the European standard for condensed aerosol fire-extinguishing systems) and is mirrored in UL 2775 and the Chinese GB 50370.

### Variable 1 — Protected Volume (V)

The internal volume of the cabinet or enclosure being protected, measured in cubic meters (m³). This is the gross internal volume; net-volume reductions are addressed in Step 2 below.

### Variable 2 — Design Density (D)

The minimum mass of aerosol agent required per cubic meter of protected space to achieve fire suppression. Per EN 15276, the minimum design density is 100 g/m³ for Class A surface fires and Class B fires. Many manufacturers specify 130–150 g/m³ for higher reliability.

> **Critical point most online calculators get wrong:** design density is not a marketing number — it is a certified test result specific to each product. Always use the certified design density from the product's EN 15276 test report, not a generic value.

### Variable 3 — Safety Factor (SF)

A multiplier accounting for real-world conditions that reduce effective suppression: cabinet leakage, internal obstructions, ventilation that reactivates after discharge, and uncertainty in volume calculation.

| Cabinet condition | Recommended safety factor |
|---|---|
| Sealed cabinet (IP54+) | 1.1 |
| Standard panel cabinet (IP3X) | 1.2–1.3 |
| Cabinet with active ventilation | 1.3–1.5 |
| Outdoor cabinet or harsh environment | 1.4–1.6 |

### Putting It Together

For a typical 0.5 m³ standard panel cabinet using a product certified at 130 g/m³ design density:

**Required Agent Mass = 0.5 × 130 × 1.2 = 78 g**

That is the minimum agent mass any selected product (or combination of products) must provide. Step 5 below converts the figure into product selection.

## Step-by-Step Sizing Process

The full sizing workflow has 5 steps. Skipping any of them produces the wrong answer.

### Step 1 — Measure the Cabinet Volume

Measure the internal dimensions of the cabinet (not external, which includes wall thickness):

**Volume (m³) = Width (m) × Height (m) × Depth (m)**

For irregular or stepped cabinets, calculate each rectangular section separately and sum them.

Common measurement mistakes:

- Using external cabinet dimensions overstates volume by 5–15%
- Forgetting to deduct the volume of installed equipment (addressed in Step 2)
- Measuring only the door area when the cabinet has internal compartments

### Step 2 — Apply Volume Reduction (If Applicable)

EN 15276 allows reducing the protected volume by the volume of solid, non-combustible objects inside the cabinet — but only when those objects exceed certain thresholds.

| Object type | Volume reduction allowed? |
|---|---|
| Steel busbars and structural members | Yes |
| Solid transformers and reactors | Yes |
| Switchgear cubicles (steel-enclosed) | Yes |
| Cable trays and wiring | No (cables are fuel) |
| Plastic-housed components (MCBs, contactors) | No (plastic is fuel) |
| Air gaps between equipment | No (must be flooded) |

In practice, the reduction is usually under 5% for typical electrical cabinets and is often skipped entirely (the conservative approach).

### Step 3 — Determine the Cabinet Hazard Class

Different fire risks require different design densities:

| Hazard class | Application examples | Minimum design density |
|---|---|---|
| Class A surface fires | Cable insulation, wiring, plastic enclosures | 100 g/m³ |
| Class B liquid fires | Oil-filled transformers, hydraulic equipment | 100 g/m³ |
| Class A deep-seated fires | Dense paper insulation, cardboard storage | 150–200 g/m³ |
| Class C electrical fires | Standard switchgear, MCC, distribution | 100 g/m³ (defaults to A or B) |
| High-risk lithium battery cabinets | BESS, UPS battery rooms | 130–150 g/m³ (manufacturer-specific) |

For 90%+ of switchgear and cabinet applications, 100 g/m³ minimum is the correct design density. Some manufacturers specify higher densities for higher reliability — confirm against the product datasheet.

### Step 4 — Select the Appropriate Safety Factor

Use the safety-factor table from the previous section. When in doubt, size up — the cost difference between safety factor 1.2 and 1.4 is minimal compared with the consequence of undersized protection.

### Step 5 — Calculate Required Agent Mass and Select Product

Apply the formula:

**Required Agent Mass (g) = Volume × Design Density × Safety Factor**

Then select a product (or combination) whose rated agent mass meets or exceeds the requirement.

For a 78 g calculated requirement:

- One unit rated at 100 g — sufficient
- One unit rated at 80 g — sufficient (just; prefer 10%+ headroom)
- One unit rated at 60 g — insufficient

For requirements exceeding the largest single unit available, distribute multiple units throughout the cabinet to ensure even aerosol coverage.

## Calculation Example 1 — Standard LV Distribution Cabinet

**Cabinet specifications**

- **Type:** wall-mounted LV distribution panel
- **External dimensions:** 800 mm (W) × 1200 mm (H) × 300 mm (D)
- **Construction:** steel cabinet, IP44 rated, single door
- **Contents:** main breaker, 24× MCBs, 8× RCDs, terminal blocks, cable trunking
- **Ventilation:** passive (no forced cooling)
- **Location:** indoor mechanical room

### Step 1 — Internal Volume

External: 0.80 × 1.20 × 0.30 = 0.288 m³

Internal (deducting ~50 mm wall thickness on each side):

- Width: 0.80 − 0.10 = 0.70 m
- Height: 1.20 − 0.10 = 1.10 m
- Depth: 0.30 − 0.05 = 0.25 m

**Internal volume = 0.70 × 1.10 × 0.25 = 0.193 m³**

### Step 2 — Volume Reduction

Conservative approach: skip volume reduction. Cabinet contents are mostly cables and plastic-housed MCBs, which are not eligible for reduction anyway.

**Adjusted volume = 0.193 m³**

### Step 3 — Design Density

Application: standard LV switchgear → Class C/A fire risk.

**Design density = 100 g/m³** (EN 15276 minimum)

### Step 4 — Safety Factor

IP44 cabinet, indoor location, no active ventilation.

**Safety factor = 1.2**

### Step 5 — Calculate and Select

**Required agent mass = 0.193 m³ × 100 g/m³ × 1.2 = 23.16 g**

Recommended product: a single DIN-rail aerosol unit rated at 30 g of agent (the [Soltree DIN Rail Thermal Aerosol Fire Extinguishing Device — 30 g variant](/products/din-rail-aerosol-fire-extinguisher) is a typical fit), giving comfortable headroom over the 23.16 g calculated requirement and accommodating typical ±5% product tolerances.

**Installation notes**

- Mount on the existing 35 mm DIN rail near the top of the cabinet (aerosol disperses downward effectively from elevated mounting)
- Connect electrical activation to the existing fire-alarm system if available
- Confirm the cabinet door gasket is intact (poor sealing reduces effectiveness)

## Calculation Example 2 — Solar Inverter Cabinet

A more complex example illustrating several real-world sizing considerations.

**Cabinet specifications**

- **Type:** outdoor string-inverter cabinet
- **External dimensions:** 600 mm (W) × 1800 mm (H) × 600 mm (D)
- **Construction:** IP65 stainless steel, single rear-access door
- **Contents:** 250 kW string inverter, DC switching, AC output protection
- **Ventilation:** forced-air cooling (continuous fan operation)
- **Location:** outdoor installation, ambient −10 °C to +50 °C

### Step 1 — Internal Volume

External: 0.60 × 1.80 × 0.60 = 0.648 m³

Internal (allowing ~75 mm wall thickness for outdoor IP65 rating):

- Width: 0.60 − 0.15 = 0.45 m
- Height: 1.80 − 0.15 = 1.65 m
- Depth: 0.60 − 0.15 = 0.45 m

**Internal volume = 0.45 × 1.65 × 0.45 = 0.334 m³**

### Step 2 — Volume Reduction

The inverter unit itself is a solid steel-enclosed module, eligible for volume reduction. Inverter dimensions: ~0.40 × 1.20 × 0.30 = 0.144 m³.

The inverter has internal air channels and is not 100% solid — conservative reduction at 50% of nominal volume:

**Eligible reduction = 0.072 m³**

**Adjusted volume = 0.334 − 0.072 = 0.262 m³**

### Step 3 — Design Density

Power electronics with DC capacitors carry potential for sustained fault arcs. Standard Class A/C application, but with high fault-energy density.

**Design density = 130 g/m³** (manufacturer recommendation for high-energy electrical equipment)

### Step 4 — Safety Factor

Outdoor cabinet + active ventilation + temperature extremes.

**Safety factor = 1.4**

### Step 5 — Calculate and Select

**Required agent mass = 0.262 m³ × 130 g/m³ × 1.4 = 47.7 g**

Recommended product: two DIN-rail aerosol units rated at 30 g each (the [Soltree DIN Rail Thermal Aerosol Fire Extinguishing Device — 30 g variant](/products/din-rail-aerosol-fire-extinguisher), totalling 60 g of agent), distributed at the top and middle of the cabinet for improved coverage in the elongated enclosure. Distributing the agent across two devices is also more reliable than a single high-capacity unit for cabinets of this aspect ratio.

**Critical installation considerations**

- **Ventilation interlock required.** The cabinet's cooling fans must shut down on aerosol activation; otherwise the agent is exhausted before suppression completes. This is a code requirement under EN 15276.
- **Two-unit distribution recommended.** With a 1.65 m tall internal volume, mounting two units (one near top, one mid-height) gives uniform aerosol distribution. A single bottom-mounted unit leaves the upper portion under-protected.
- **Outdoor temperature rating.** Confirm the chosen unit's operating temperature range covers −10 °C to +50 °C ambient (most quality units are rated −40 °C to +85 °C).
- **Door interlock recommended.** Maintenance personnel opening the cabinet during a fault should not trigger a discharge into their face — an electrical interlock prevents this.

## Common Sizing Mistakes

Reviewing project specifications, these are the most frequent errors:

**Mistake 1 — Using external cabinet dimensions.** Assuming 5–15% wall thickness, using external dimensions over-sizes by exactly that amount. Wasteful rather than unsafe — but the budget impact is real on multi-cabinet projects.

*Fix:* always measure internal volume from inside the cabinet.

**Mistake 2 — Ignoring cabinet sealing quality.** A cabinet with poor door sealing or unsealed cable entries can lose 30%+ of aerosol concentration within 60 seconds, dropping below effective suppression density.

*Fix:* use higher safety factor (1.4+) for cabinets without proven IP rating, or address sealing before installing protection.

**Mistake 3 — Forgetting about active ventilation.** Forced-air cooling fans exhaust aerosol as fast as it discharges if not interlocked.

*Fix:* either size for safety factor 1.5+ to account for ventilation losses, or install a ventilation shutdown interlock (preferred per EN 15276).

**Mistake 4 — Using generic 100 g/m³ without verifying product spec.** Different aerosol products have different certified design densities. Some products require 130 g/m³ for full Class A/B coverage; using 100 g/m³ undersizes by 30%.

*Fix:* always use the design density from the specific product's certification, not a generic value.

**Mistake 5 — Single unit in tall cabinets.** Aerosol distribution from a single unit becomes uneven in cabinets taller than ~1.5 m, leaving stratified zones of under-protection.

*Fix:* for cabinets >1.5 m tall, use multiple distributed units regardless of total agent calculation.

**Mistake 6 — Not accounting for shadow zones.** Densely packed cabinets with internal partitions, deep cable management channels, or rear-access compartments can have shadow zones the aerosol struggles to reach.

*Fix:* multiple distributed units, or confirm with the manufacturer that single-point discharge is acceptable for the specific cabinet geometry.

## Multi-Cabinet Lineups: Special Considerations

When protecting multiple connected cabinets — a switchgear lineup with 10+ cubicles, for example — the sizing approach changes.

### Approach A — Independent Per-Cabinet Sizing (Recommended)

Calculate and install separate aerosol protection for each cubicle. Each cubicle has its own thermal trigger and fires independently when its cubicle reaches threshold.

**Advantages:** localized response, no propagation between cubicles, simpler engineering.

**Use when:** cubicles have full internal partitions (most modern switchgear).

### Approach B — Common Sizing With Cross-Cubicle Coordination

For switchgear with shared internal volumes (some legacy designs), size the total volume and distribute aerosol units to ensure no zone is under-protected.

**Advantages:** lower total cost in some configurations.

**Use when:** switchgear cubicles have ventilation paths between them.

> **Note:** for multi-cabinet lineups exceeding 5 cubicles, formal fire-protection engineering review is strongly recommended. The risk of cascade failures and the complexity of cross-cubicle aerosol behavior make professional specification valuable.

## When Professional Engineering Support Is Warranted

The methodology in this guide is sufficient for standard cabinet protection in low-complexity applications — typical LV panels, single inverter cabinets, individual control cabinets.

For the following scenarios, formal fire-protection engineering involvement is warranted:

- **Marine and offshore installations** — class society approvals (DNV, ABS, LR) require certified engineering documentation
- **Battery storage systems >50 kWh** — lithium-specific suppression requires specialized sizing approaches
- **MV switchgear (>1000 V)** — arc-flash energy calculations affect suppression specification
- **Multi-cabinet lineups >5 cubicles** — cascade failure analysis and integration design
- **Hazardous-area installations (ATEX, IECEx)** — explosion-proof requirements affect equipment selection
- **Insurance-mandated certification** — some insurers require sealed engineering submissions
- **Retrofit of existing protected spaces** — compatibility analysis with existing suppression systems

In these cases, sizing is part of a broader fire-protection engineering scope that requires formal documentation, professional liability, and often regulatory approval.

## Quick Reference Sizing Table

For rapid preliminary sizing of common cabinet types — use as a starting point, then verify with the full calculation:

| Cabinet type | Typical internal volume | Recommended agent mass | Typical configuration (Soltree 10/20/30 g units) |
|---|---|---|---|
| Small wall-mounted MCB cabinet | 0.05–0.1 m³ | 8–15 g | 1× 10 g or 1× 20 g unit |
| Standard LV distribution panel | 0.15–0.3 m³ | 25–50 g | 1× 30 g unit |
| Floor-standing distribution cabinet | 0.3–0.6 m³ | 50–100 g | 2–3× 30 g distributed |
| Solar string-inverter cabinet | 0.3–0.5 m³ | 50–80 g | 2× 30 g distributed |
| MCC drawer | 0.2–0.4 m³ | 30–60 g | 1–2× 30 g |
| MV switchgear cubicle | 0.5–1.0 m³ | 80–150 g | 3–5× 30 g distributed |
| BESS auxiliary cabinet | 0.3–0.6 m³ | 60–120 g | 2–4× 30 g distributed |
| Telecom outdoor cabinet | 0.4–0.8 m³ | 70–130 g | 3–4× 30 g distributed |

> **Note:** the table assumes design density 130 g/m³ and safety factor 1.3. Adjust for the specific product certification and cabinet conditions.

## Frequently Asked Questions

### Can multiple smaller units replace one larger unit?

Yes — and for tall or elongated cabinets, distributed multiple units are preferred over a single large unit because they ensure uniform aerosol distribution. The total agent-mass requirement is the same; geometry is the deciding factor.

### Does cabinet pressure affect sizing?

For atmospheric-pressure cabinets (the vast majority), no. For sealed pressurized enclosures (rare in electrical applications), the design density may need adjustment — consult the manufacturer.

### What if the cabinet has an opening that cannot be sealed (e.g., cable entries)?

Significant unsealed openings reduce effectiveness substantially. Either seal them (preferred) or apply safety factor 1.5+. For openings >5% of total cabinet wall area, conventional aerosol sizing may not be adequate — seek engineering review.

### How does cabinet temperature affect sizing?

Aerosol systems work effectively across the rated operating temperature range of the product (typically −40 °C to +95 °C). Extremely hot environments (above +85 °C) may affect agent stability over time but do not fundamentally change sizing calculations.

### Should retrofit installations be sized differently from new installations?

The sizing math is identical. Retrofits do require additional consideration for cabinet condition (older cabinets may have degraded seals), accessibility for installation, and integration with any existing fire-detection systems.

### What sizing tools exist beyond manual calculation?

Most reputable manufacturers provide sizing assistance for engineering customers — via spec-sheet matrices, online calculators, or direct technical support. For complex projects, leveraging manufacturer engineering support is more efficient than independent calculation.

## The Bottom Line for Specifiers

Aerosol fire-extinguisher sizing is a 5-step process governed by a single equation that any qualified engineer can execute in 10 minutes for standard applications.

The principles that matter most:

- Use internal cabinet volume, not external
- Apply the safety factor appropriate to the cabinet's actual operating conditions
- Use product-certified design density, not generic values
- Distribute multiple units in tall or complex cabinets
- Escalate to formal engineering for marine, MV, BESS, or multi-cabinet projects

Get these right and the installation is certified, reliable, and code-compliant. Get any of them wrong and the result is either spending more than necessary (oversizing) or installing protection that will not work when needed (undersizing).

For most distribution cabinets, MCC drawers, control cabinets, and solar inverter installations, the sizing exercise concludes with a single unit between 30 g and 100 g of agent. For everything more complex, the right answer is to involve qualified fire-protection engineers.

## Related Reading

Sizing is one piece of the specification job; the rest of the cluster covers the surrounding decisions:

- **Category foundation:** [What is a din rail aerosol fire extinguisher?](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide) — the technical primer
- **How it works:** [How aerosol fire extinguishers stop electrical-cabinet fires](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) — the suppression mechanism behind the formula
- **Application context:** [Top 8 applications in 2026](/blog/top-8-applications-din-rail-aerosol-fire-extinguishers-2026) — vertical-specific cabinet-volume profiles
- **Versus alternatives:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — when sizing aerosol is and isn't the right exercise
- **Spec verification:** [Datasheet specifications buyers must verify](/blog/din-rail-aerosol-fire-extinguisher-specifications) — to confirm certified design density before locking the SKU
- **Sourcing pillar:** [Complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — supplier vetting and certifications

**Need sizing support for a specific project?** Browse the [DIN Rail Thermal Aerosol Fire Extinguishing Device — 10 g / 20 g / 30 g variants](/products/din-rail-aerosol-fire-extinguisher) and [contact our team](/contact) with cabinet internal dimensions, contents, environment, and IP rating, and receive a sizing calculation, product recommendation, installation notes, and FOB quotation within one business day. For projects involving marine certification, BESS installations, MV switchgear, or multi-cabinet lineups, our team partners with qualified fire-protection engineers to deliver fully-documented specifications with appropriate professional liability coverage.
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Soltree Engineering Team",
    image: "/images/blog/how-to-size-din-rail-aerosol-fire-extinguisher.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Sizing Guide", "EN 15276", "Engineering", "Technical Guide", "Cabinet Protection"],
    readingTime: 12,
    metaTitle: "How to Size a Din Rail Aerosol Fire Extinguisher: EN 15276 Guide | Soltree",
    metaDescription: "Step-by-step guide to sizing din rail aerosol fire extinguishers — the EN 15276 formula, two worked calculation examples, and an engineer-grade sizing checklist.",
    metaKeywords: "aerosol fire extinguisher sizing, din rail aerosol sizing, EN 15276 sizing formula, aerosol design density, aerosol safety factor, cabinet fire suppression sizing, aerosol agent mass calculation, fire extinguisher sizing guide",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "pv-combiner-box-sourcing-china-2026",
    title: "PV Combiner Box Sourcing from China in 2026: The Complete Guide for Solar Distributors",
    excerpt:
      "A strategic procurement guide for solar distributors sourcing PV combiner boxes from China in 2026. Learn how to evaluate DC components, avoid costly RMA failures, and leverage OEM customization to build a profitable brand.",
    content: `
As the global solar market accelerates through 2026, the **PV combiner box** has become one of the most critical—and most commonly mis-sourced—components in utility and commercial-scale photovoltaic installations. For regional solar distributors and wholesalers, choosing the right PV combiner box manufacturer in China is no longer just a procurement task; it is a strategic decision that directly impacts project safety, RMA rates, and long-term profitability.

This guide is written specifically for procurement managers and solar business owners who need a clear, actionable blueprint for sourcing high-quality PV combiner boxes at competitive wholesale prices—without falling into the low-cost, high-risk traps that plague the 2026 supply chain.

## The 2026 Supply Chain Reality: PV Combiner Box Cost and Quality

![PV combiner box cost and quality — wholesale sourcing from China in 2026](/images/blog/PV-Combiner-Box-Cost-and-Quality-2.jpg)

For solar distributors, the first half of 2026 has served as a stark reminder that static pricing in electrical manufacturing is a myth. Navigating this year's procurement landscape requires a deep understanding of what actually drives the cost of a [PV combiner box](/categories/pv-combiner-box).
### Decoding PV Combiner Box Price Trends in 2026

Recent volatility in global commodities—particularly the rising costs of raw copper and high-grade industrial plastics—has inevitably impacted production costs across the board. For distributors sourcing wholesale solar combiner boxes, understanding these price trends is crucial for making informed procurement decisions.

Legitimate PV combiner box manufacturers have had to implement transparent price adjustments early this year to maintain rigorous quality standards. Here is the harsh reality of the B2B supply chain: when raw material costs surge globally, a supplier offering FOB prices that seem "too good to be true" is not absorbing the loss out of goodwill. They are actively compromising the product to protect their own margins.

### The Hidden Costs of Cheap PV Combiner Boxes

How do subpar factories artificially lower their prices? The tactics are dangerously simple:

- **Thinned-out tinned copper busbars** — A thinner busbar significantly reduces the current-carrying capacity, leading to severe overheating and extreme fire hazards when the PV array operates under full load.
- **Recycled plastic enclosures** — Cheap, recycled plastics may look identical on a factory floor, but they will inevitably yellow, warp, and crack after just a few months of UV exposure and temperature cycling on a solar farm.

Procurement managers must recognize that the initial $5 "savings" on a cheap PV combiner box will quickly translate into $500 in emergency on-site maintenance. Between skyrocketing RMA rates, project delays, and permanent damage to your brand's reputation with local EPC contractors, cheap sourcing is the most expensive mistake a distributor can make.

## Beyond the Enclosure: Evaluating Core DC Components Inside a PV Combiner Box

![DC components inside a PV combiner box — DC SPD, MCB and fuse holder for solar string protection](/images/blog/PV-Combiner-Box-Cost-and-Quality-3.jpg)

A common misconception among inexperienced buyers is treating the PV combiner box merely as a weatherproof plastic shell. In reality, it is a highly sophisticated, primary line of defense for the entire solar array. The true value lies in the quality of the internal low-voltage DC components.
### The Critical Role of the DC Surge Protective Device (SPD)

The inverter is typically the most expensive single component in a PV system and is highly vulnerable to transient overvoltages. This is where a premium [DC Surge Protective Device (SPD)](/categories/surge-protector-device) becomes non-negotiable.

For standard 1000V or 1500V DC systems, a high-quality Type 2 PV surge arrester acts as an electrical safety valve, diverting massive surge currents safely into the grounding system and completely bypassing the inverter. Subpar SPDs leave downstream equipment fully exposed to catastrophic failure.

### Reliable Isolation with DC Circuit Breakers and Fuses

A well-engineered PV combiner box achieves string-level protection through high-rupturing-capacity [1000V DC fuse holders](/categories/dc-fuse-holder) and links. If one panel string malfunctions, the fuse blows, isolating the fault without shutting down the entire array.

On the output side, robust [DC Miniature Circuit Breakers (MCB)](/categories/circuit-breaker) or Molded Case Circuit Breakers (MCCB) serve as the main disconnect switch. Whether you are sourcing standard 4-string, 6-string, or 8-string configurations, the DC circuit breaker must feature advanced arc-extinguishing capabilities. A low-quality AC breaker incorrectly labeled for DC use will simply melt under an arc fault, potentially causing a severe fire.

## Why IP65 and UV-Resistant Enclosures Are Non-Negotiable for PV Combiner Boxes

![IP65 UV-resistant PV combiner box enclosure for outdoor solar farm installation](/images/blog/PV-Combiner-Box-Cost-and-Quality-4.jpg)

A PV combiner box can house the best DC breakers in the world, but if the enclosure leaks, the entire system will suffer a catastrophic short circuit.
### Combating Extreme Weather in Outdoor Solar Arrays

To prevent brittle or cracked housing, a genuine UV-resistant ABS plastic enclosure or high-grade Polycarbonate (PC) is strictly required. The sealing mechanism must guarantee an **IP65 waterproof rating** to completely block dust ingress and low-pressure water jets.

> **Real-World Impact:** One of our regional distributors in South America previously struggled with severe water-damage returns during the tropical monsoon season. After transitioning their 1000V DC product line exclusively to our upgraded UV-resistant PV combiner box enclosures, their post-monsoon RMA rate dropped by 85%.

### Engineered for Fast, Error-Free Installation

Offering a **pre-wired PV combiner box** is a massive competitive advantage. By engineering the box with standardized, plug-and-play MC4 panel mount connectors and high-quality PG13.5 waterproof cable glands, you transform a complex electrical task into a rapid, foolproof process—reducing labor hours for installers and ensuring they keep coming back to you.

## Standard vs. Custom PV Combiner Box OEM: Maximizing Your Profit Margins

![Custom OEM PV combiner box configurations — 4-string 6-string 8-string wholesale options from China](/images/blog/PV-Combiner-Box-Cost-and-Quality-5.jpg)

In the competitive wholesale market, offering exactly what local EPC contractors need is the key to healthy margins.
### When Standard Configurations Work Best

For fast-moving residential projects, inventory turnover is everything. Standard 4/6/8-string PV combiner box configurations cover roughly 80% of everyday installation needs. Partnering with a factory that maintains deep raw material reserves ensures that your standard stock is always ready to ship, even during supply chain disruptions.

### The Power of OEM Customization for Distributors

The ultimate profit multiplier lies in **custom PV combiner box OEM services**. A genuine manufacturer allows you to tailor the product to your market's specific grid regulations. For instance, boxes can be engineered to integrate:

- A [Solar Automatic Transfer Switch (ATS)](/categories/ats-dual-power-switch) for hybrid systems
- A [smart Din-rail solar energy meter](/categories/power-meter) for precise data logging

These all-in-one PV combiner box solutions allow you to command a significant premium in your local market while creating a defensible brand advantage that generic resellers cannot replicate.

## How to Vet a PV Combiner Box Manufacturer in China

![PV combiner box manufacturer China — CE TUV certified factory vetting checklist for solar distributors](/images/blog/PV-Combiner-Box-Cost-and-Quality-6.jpg)

To protect your margins and reputation in 2026, rigorously evaluate every potential supplier using this "True Factory" checklist:

1. **Core competency in low-voltage DC** — Do they manufacture core DC components (SPDs, MCBs) in-house, or simply assemble third-party parts?
2. **In-house testing facilities** — Can they perform high-voltage insulation testing and IP65 water ingress testing on-site?
3. **Uncompromising certifications** — Do they hold valid CE, TUV, and RoHS certificates specifically for the DC components inside the PV combiner box?
4. **Supply chain transparency** — Do they offer pricing models that logically reflect global copper and plastic costs, or do their numbers defy market reality?

## Frequently Asked Questions About PV Combiner Boxes

### What is a PV combiner box and why is it important?

A PV combiner box is an electrical distribution enclosure that consolidates the DC output from multiple solar panel strings into a single main feed before it reaches the inverter. It houses critical protection devices—including DC fuses, circuit breakers, and surge protective devices—that safeguard the entire solar array from overcurrent faults, arc failures, and lightning surges.

### How do I choose between a 1000V and 1500V PV combiner box?

The voltage rating must match or exceed your system's maximum open-circuit voltage (Voc). Most utility-scale projects in 2026 are migrating to 1500V DC architectures for higher energy yield and lower cable costs. If your target market serves commercial or utility-scale EPCs, stocking 1500V-rated PV combiner boxes is essential.

### What certifications should a China-sourced PV combiner box have?

At minimum, look for CE marking, TUV certification, and RoHS compliance—specifically verified for the internal DC components, not just the enclosure. Reputable manufacturers will provide test reports from accredited third-party labs upon request.

### Can I get custom-branded PV combiner boxes from a Chinese manufacturer?

Yes. Established PV combiner box OEM manufacturers offer full customization including private labeling, custom string configurations, integrated smart metering, and enclosure modifications to meet regional installation standards. Minimum order quantities and lead times vary, so discuss your requirements early in the procurement process.

## Your 2026 Procurement Blueprint Starts Here

Sourcing reliable PV combiner boxes is a strategic decision that dictates both the safety of the solar array and the profitability of your distribution business. By prioritizing premium DC components, insisting on IP65-rated UV-resistant enclosures, and partnering with a factory that offers deep OEM customization, you can insulate your business from both technical failures and price wars.

Stop competing on price with generic boxes. Start building your brand's technical moat today.

**Ready to upgrade your PV combiner box supply chain for 2026?** [Contact our team](/contact) with your project requirements—string count, system voltage, and target market—and receive a free technical evaluation and factory-direct quote within 24 hours.
    `,
    date: "2026-04-13",
    dateModified: "2026-04-13",
    author: "Soltree Engineering Team",
    image: "/images/blog/PV-Combiner-Box-Cost-and-Quality.jpg",
    tags: ["PV Combiner Box", "Solar PV", "Sourcing Guide", "OEM", "B2B Procurement"],
    readingTime: 6,
    metaTitle: "PV Combiner Box Sourcing from China 2026 | Wholesale Guide | Soltree",
    metaDescription: "Source reliable PV combiner boxes from China in 2026. Evaluate DC components, IP65 enclosures & OEM options — factory-direct wholesale guide for solar distributors.",
    metaKeywords: "PV combiner box, solar combiner box, PV combiner box manufacturer China, wholesale solar combiner box, DC combiner box OEM, IP65 PV combiner box, 1000V 1500V combiner box",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "what-is-solar-pv-combiner-box-photovoltaic-designs",
    title: "What is a Solar PV Combiner Box and Why is it Used in Photovoltaic Designs?",
    excerpt:
      "A technical deep-dive for EPC contractors and system designers on how commercial-grade solar PV combiner boxes work, why they are mandatory for 4+ string systems, and how IEC 61439-2 compliance protects your megawatt-scale solar investment.",
    content: `
As the photovoltaic industry aggressively shifts towards high-voltage 1000V and 1500V DC architectures to maximize efficiency and reduce energy losses, EPC contractors and system designers face a compounding challenge: managing massive DC power safely. At these extreme voltages, the operational risks—ranging from sustained DC arc faults to thermal runaway and chaotic cable management—are exponentially higher.

This is where the solar [PV combiner box](/categories/pv-combiner-box) enters the equation.

Often misunderstood by novices as a simple "junction box," a commercial-grade combiner box is, in reality, the most critical safety barrier and diagnostic hub located between the photovoltaic array and the inverter. It is engineered not merely to organize wires, but to provide a secure, compliant, and highly efficient power consolidation point. Without a robustly designed combiner box, ensuring the long-term safety, maintenance viability, and ROI of a large-scale solar asset is fundamentally impossible.

## What Exactly is a Solar PV Combiner Box?

At its core, a solar PV combiner box is a comprehensive electrical distribution enclosure designed to safely aggregate multiple direct current (DC) input strings from solar panels into consolidated main DC output feeds, which are then routed directly to the solar inverter.

### The "Do I Need One?" Threshold

For small residential setups consisting of only one to three PV strings, installers might route cables directly into a string inverter. However, the engineering threshold changes drastically for commercial and industrial (C&I) or utility-scale applications. In any system utilizing four or more strings, a combiner box becomes an absolute necessity. In these larger architectural designs, deploying a professional-grade combiner box is a strict requirement mandated by the National Electrical Code (NEC) and International Electrotechnical Commission (IEC) standards to ensure systematic cable consolidation, centralized fault protection, and safe system isolation.

## Key Functions: Why Use a Combiner Box in Commercial Solar Designs?

For system designers and EPC contractors, specifying a high-quality solar PV combiner box goes far beyond basic cable management. It is a strategic decision that directly impacts the project's capital expenditure (CAPEX), operational safety, and overall energy yield.

![Internal wiring of a 1500V DC commercial solar PV combiner box — Load Break Switch, SPD and PV fuses](/images/blog/solar-pv-combiner-box-1.jpg)

### Cable Consolidation & Reducing Copper Costs

In a large-scale array, running individual 4mm² (12 AWG) wires from hundreds of solar strings all the way to a central inverter is economically and physically unviable. A combiner box acts as a localized hub. By aggregating these multiple thin wires near the panels and transitioning to a single, heavy-gauge copper or aluminum trunk cable, developers drastically reduce total wire lengths. This localized consolidation minimizes severe voltage drops over long distances, limits power losses, and slashes exorbitant copper costs.

### Safe Isolation with Load Break Switch-Type Disconnects

During routine maintenance or emergency troubleshooting, technicians must be able to securely isolate the PV array from the inverter. This is where engineering precision is non-negotiable.

Professional PV combiner boxes are equipped with true Load Break Switch-Type DC disconnects. Unlike standard components, these specialized switches are engineered with robust arc-extinguishing chambers, allowing them to safely break the circuit even under full-load, high-voltage conditions without catastrophic arcing.

> ⚠️ Engineering Warning: Never use standard AC breakers or conventional contactors for DC circuit isolation. Direct current lacks the "zero-crossing" point of alternating current — an improper disconnect cannot extinguish the DC arc, leading to continuous arcing, extreme heat, and severe fire risks. Always specify dedicated Load Break Switch-Type disconnects for PV applications.

### Comprehensive Overcurrent & Surge Protection

A megawatt-scale solar plant is constantly exposed to electrical anomalies, from reverse currents caused by shaded panels to massive voltage spikes from nearby lightning strikes. The combiner box serves as the system's frontline defense:

- **Touch-Safe DC Fuse Holders & PV Fuses** — Each incoming string is individually protected by a [DC fuse holder](/categories/dc-fuse-holder). If a short circuit or reverse current event occurs, the PV-specific fuse blows, isolating the faulty string while allowing the rest of the array to continue generating power safely.
- **Type 2 DC Surge Protection Devices (SPDs)** — Lightning strikes can send transient overvoltages down the DC lines, instantly destroying a multi-thousand-dollar inverter. Integrating a [Type 2 DC SPD](/categories/surge-protector-device) within the combiner box safely shunts these extreme voltage spikes directly to the ground, protecting downstream infrastructure.

## Designing for the Future: 1500V DC and IEC 61439-2 Compliance
As the commercial solar industry aggressively scales, standardizing on 1500V DC architectures has become the norm to increase energy yield and lower balance-of-system (BOS) costs. However, these higher voltages demand significantly more rigorous safety standards, particularly regarding creepage distances, electrical clearances, and thermal management within the enclosure.
![1500V DC solar PV combiner box IEC 61439-2 compliant design for utility-scale photovoltaic systems](/images/blog/solar-pv-combiner-box-2.jpg)
### The Importance of the IEC 61439-2 Standard

When sourcing combiner boxes for megawatt-scale projects, simply piecing together certified components inside a random box is a dangerous oversight. Professional system designers and procurement managers must specify equipment that strictly complies with the IEC 61439-2 standard for low-voltage switchgear and controlgear assemblies.

Compliance with this standard dictates that the entire assembly—not just the individual parts—has passed stringent type-testing. This includes critical verification of temperature-rise limits under continuous full-load operation, dielectric properties, and short-circuit withstand strength. An IEC 61439-2 compliant combiner box guarantees that the unit will not become a thermal bottleneck or a fire hazard under extreme field conditions, thereby securing your project's long-term ROI.

### The "Smart" Upgrade Path

Beyond physical safety, modern utility-scale designs are increasingly adopting Smart PV Combiner Boxes. By integrating RS485 communication protocols and string-level current monitoring, these advanced units provide real-time diagnostic data to the central SCADA system. This digitization allows O&M operators to instantly pinpoint underperforming panels, shaded strings, or blown fuses without manual field inspections, drastically maximizing plant uptime.

## The EPC Perspective: Reducing Installation and O&M Costs
For Engineering, Procurement, and Construction (EPC) firms, the true cost of a solar component isn't determined solely by its upfront purchase price—it is heavily dictated by the labor required to install it and the long-term Operations and Maintenance (O&M) expenses. A well-designed combiner box specifically addresses these on-site realities.
![Pre-wired solar PV combiner box IP65 enclosure for EPC installation — MC4 connectors and waterproof cable glands](/images/blog/solar-pv-combiner-box-3.jpg)
### Pre-Wired Solutions for Rapid Installation

To combat soaring field labor rates, industry-leading manufacturers provide pre-wired, plug-and-play solutions. By incorporating pre-installed MC4 connectors and standardized waterproof cable glands, site electricians can bypass complex internal wire terminations. Furthermore, enclosures engineered with ample internal routing space prevent cable crowding, dramatically slashing installation time and minimizing human error during grid connection.

### Extreme Weather Durability (IP65 / NEMA 4X)

Solar farms are frequently deployed in harsh, unforgiving environments. To ensure continuous operation, professional combiner boxes utilize UV-resistant polycarbonate or heavy-duty sheet metal enclosures rated at IP65 or NEMA 4X. This uncompromising physical barrier shields sensitive internal disconnects and SPDs from ingress by dust, heavy rain, and corrosive salt mist.

### The Crucial Condensation Detail

While total sealing is necessary for waterproofing, it creates a hidden danger: internal condensation. In desert or high-altitude environments with extreme day-to-night temperature fluctuations, trapped moisture can build up and cause catastrophic short circuits. To mitigate this, top-tier engineering incorporates specialized waterproof breather valves (ventilation glands). These micro-porous vents actively equalize internal pressure and expel moisture without letting water in, ensuring the internal components remain completely dry and drastically reducing unplanned O&M truck rolls.

## Conclusion: The Lynchpin of Photovoltaic Safety and Performance

While a solar PV combiner box may represent a relatively small fraction of a megawatt-scale project's total Bill of Materials (BOM), its role is absolutely foundational. It is not merely a junction point; it is the critical convergence where cable management, extreme high-voltage safety, and system diagnostics meet.

As commercial and utility-scale solar arrays push toward 1500V DC architectures, settling for sub-standard, non-certified enclosures is a gamble that risks severe thermal failures, catastrophic arc faults, and massive system downtime. By specifying combiner boxes that strictly adhere to IEC 61439-2 standards, utilize true Load Break Switch-Type disconnects, and feature EPC-friendly designs like pre-wiring and advanced condensation control, developers can guarantee maximum safety and a faster return on investment.

**Ready to secure your next solar project?** [Contact our engineering team](/contact) to request detailed technical datasheets, discuss 1500V DC custom configurations, or get a competitive wholesale quote for your upcoming PV projects.

## Frequently Asked Questions About Solar PV Combiner Boxes

### What is the difference between a PV combiner box and a standard junction box?

A standard junction box is a passive enclosure designed purely for wire splicing with no integrated protection. A solar PV combiner box is an active safety assembly that consolidates multiple DC string inputs while incorporating string-level fusing, a Load Break Switch-Type disconnect, and Type 2 DC surge protection — making it a critical line of defense between the array and the inverter.

### How many PV strings require a combiner box?

For systems with one to three strings, cables can typically be routed directly to a string inverter. However, any system with four or more strings requires a dedicated PV combiner box. This is not merely a best practice — it is a mandatory requirement under NEC and IEC standards for systems of this scale.

### What does IEC 61439-2 compliance mean for a PV combiner box?

IEC 61439-2 certifies the entire assembled unit — not just its individual components — against stringent type-testing criteria including temperature-rise limits under full-load operation, dielectric strength, and short-circuit withstand capacity. A box that is merely assembled from individually certified parts is not IEC 61439-2 compliant. For megawatt-scale projects, this distinction is critical to guaranteeing long-term safety and project ROI.

### Can a PV combiner box work with both 1000V and 1500V DC systems?

Not automatically. A combiner box must be specifically rated and type-tested for the maximum system voltage. While 1000V DC units remain common in older residential and commercial installations, utility-scale projects increasingly mandate 1500V DC-rated enclosures to maximize energy yield and reduce balance-of-system costs. Always verify the DC voltage rating of the disconnect switch, SPD, and fuse holders before specifying a unit.
    `,
    date: "2026-04-13",
    dateModified: "2026-04-13",
    author: "Soltree Engineering Team",
    image: "/images/blog/solar-pv-combiner-box.jpg",
    tags: ["PV Combiner Box", "Solar PV", "Technical Guide", "1500V DC", "EPC"],
    readingTime: 8,
    metaTitle: "What is a Solar PV Combiner Box? Design & Safety Guide | Soltree",
    metaDescription: "Understand what a solar PV combiner box does in commercial 1000V/1500V DC systems — DC isolation, surge protection, IEC 61439-2 compliance and EPC installation guide.",
    metaKeywords: "what is a solar PV combiner box, solar combiner box function, photovoltaic combiner box, 1500V DC combiner box, IEC 61439-2 combiner box, commercial solar combiner box, DC Load Break Switch, Type 2 DC SPD",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "pv-combiner-box-buyers-checklist",
    title: "PV Combiner Box Buyer's Checklist: 12 Specs You Must Verify Before Ordering",
    excerpt:
      "The 12 technical and commercial specs every solar distributor and EPC buyer should verify before placing a PV combiner box PO — the same list our engineers use when auditing a design.",
    content: `
Sourcing a PV combiner box isn't just about finding the lowest price. One wrong spec — an under-rated SPD, a cheap IP seal, an uncertified breaker — and the box fails in the field. For a distributor, that means warranty claims, reputation damage, and lost projects.

Over **15 years of manufacturing and exporting [PV combiner boxes](/categories/pv-combiner-box) to 10+ countries across 200+ solar projects**, we've seen the same specification mistakes repeat across buyers. This checklist gives you the **12 technical and commercial specs every buyer must verify before placing a PO** — the same list our engineers use when auditing a design.

> 💡 **New to PV combiner boxes?** Read our [guide to PV combiner box basics](/blog/what-is-solar-pv-combiner-box-photovoltaic-designs) before continuing.

## Why This Checklist Matters

Most combiner box failures in the field trace back to one of three root causes:

1. **Under-specified components** to hit a price target
2. **Mismatched ratings** between the box and the actual PV array
3. **Missing or invalid certifications** that block customs clearance or project acceptance

This checklist is structured to catch all three — before the PO is signed.

## The 12-Point PV Combiner Box Buyer's Checklist

### 1. DC vs AC Combiner Box — Match the System Type

Before anything else, confirm whether you need a **DC combiner box** (between modules and inverter) or an **AC combiner box** (between multiple string inverters and the grid). Ordering the wrong type is more common than you'd think, especially in hybrid projects.

**Verify with the supplier:**
- System topology (central inverter vs. string inverter)
- Voltage side (DC input side vs. AC output side)

### 2. Number of Input Strings (4 / 6 / 8 / 12 / 16 / 24-in-1)

The "N-in-1" spec determines how many PV strings the box consolidates. Over-specifying wastes money; under-specifying forces you to buy multiple boxes when one would do.

**Ask yourself:**
- How many modules per string?
- How many strings per MPPT/inverter?
- What's the future expansion plan?

A rough guide based on project scale:

| Project Size | Recommended Config |
|---|---|
| Under 100kW rooftop | 4-in-1 / 6-in-1 |
| 100–500kW C&I | 8-in-1 / 12-in-1 |
| Above 500kW utility | 16-in-1 / 24-in-1 |

### 3. Rated DC Voltage (Usually 1000V or 1500V)

1000V systems are legacy; **1500V is now standard for utility-scale and most C&I projects** because it reduces BOS cost. Verify every component inside the box — breaker, SPD, fuse, terminals — is rated for your system voltage, not just the enclosure label.

> ⚠️ **Red flag**: A 1500V box with 1000V-rated internal components. This happens more than buyers realize.

### 4. Rated Input Current per String (Fuse/Breaker Sizing)

The per-string current rating must match your module's **Isc (short-circuit current) × safety factor (typically 1.25–1.56)**, per IEC 62548. The [DC fuse holder](/categories/dc-fuse-holder) and PV fuse inside the box must be rated for this current at the full system DC voltage.

**Typical ratings**: 15A, 20A, 25A, 32A per string.

For today's mainstream 550W–720W modules, gPV-rated fuses sized at roughly 1.5× module Isc cover the full range without over-specification.

### 5. SPD (Surge Protection Device) Type and Class

Lightning and induced surges are the leading cause of combiner box failure in tropical and high-altitude regions. A proper [Type 2 DC SPD](/categories/surge-protector-device) inside the combiner box is non-negotiable.

**Verify:**
- **Type**: Type 1 (direct lightning) vs Type 2 (induced surge) vs Type 1+2 (combined)
- **Class**: For the DC side, specify **Class II SPDs rated for PV (Uc ≥ 1.2 × system voltage)**
- **Brand**: DEHN, Phoenix, Citel, OBO, or equivalent — not unbranded
- **Replaceable cartridge**: makes field maintenance far cheaper

> ⚠️ **Red flag**: Boxes priced 30% below market often use unbranded SPDs that fail within 6–12 months.

### 6. IP Protection Rating (IP65 / IP66 / IP67)

The enclosure rating must match your installation environment. Over-spec'ing IP67 for a dry rooftop wastes 15–20% of your budget; under-spec'ing IP65 for a coastal or desert site guarantees water or dust ingress within two years.

| Environment | Minimum IP |
|---|---|
| Rooftop (dry, temperate) | IP65 |
| Ground-mount (temperate) | IP65 / IP66 |
| Coastal / humid tropical | IP66 |
| Desert / heavy dust / flood-prone | IP67 |

![IP65-rated PV combiner box installed outdoors on a solar farm, withstanding dust and rain](/images/blog/pv-combiner-box-outdoor-installation.jpg)

### 7. Enclosure Material (Metal vs ABS/SMC)

- **Metal (cold-rolled steel / stainless 304)**: Stronger, better heat dissipation, higher cost. Best for utility-scale and harsh environments.
- **ABS / SMC / Fiberglass**: Lighter, corrosion-proof, UV-resistant. Best for rooftop and coastal/corrosive sites.

![Comparison of metal and ABS/SMC PV combiner box enclosures for different solar project environments](/images/blog/pv-combiner-box-enclosure-metal-vs-abs.jpg)

**Verify:**
- Metal thickness (≥1.2mm is standard; cheap boxes use 0.8mm)
- UV resistance rating on plastics (look for **UL 746C f1 rating**)
- Powder-coating thickness on metal (≥60μm)

### 8. Certifications (IEC, TÜV, CE, UL, CB)

No certification means no customs clearance in most target markets. Worse, no insurance coverage and no project acceptance.

**Must-haves by market:**
- **EU**: CE, IEC 61439-2, TÜV, RoHS
- **US / Canada**: UL 1741, cUL
- **Australia**: AS/NZS compliance
- **Middle East / Africa / LATAM**: IEC 61439 + CB + local approvals (SASO, INMETRO, etc.)

**Always ask for:**
- The actual certificate PDF (not a photo on a phone)
- Certificate number — verify directly on the TÜV / UL / IECEE website

### 9. Monitoring & Smart Functions (Optional but Rising)

Modern smart combiner boxes include string-level current monitoring, temperature sensors, and RS485 / Ethernet communication back to a SCADA or inverter monitoring system.

**Verify:**
- Communication protocol (Modbus RTU / TCP most common)
- Compatibility with your inverter / SCADA brand
- Cybersecurity standards if you're selling to EU markets (NIS2 compliance is coming)

### 10. Internal Wiring and Terminal Quality

Buyers rarely inspect this, and that's where cost-cutting hides:

- Copper wire should be **99.9% pure copper** — not CCA (copper-clad aluminum)
- Wire cross-section must match current rating per IEC 60228
- Terminals should be **tin-plated copper**, torque-tested and labeled
- Every internal connection should be **numbered and traceable** to the wiring diagram

![Internal wiring of a Soltree PV combiner box showing numbered tin-plated copper terminals, DC fuses and SPD](/images/blog/pv-combiner-box-internal-wiring.jpg)

Ask the supplier to send real unit photos of the inside — not stock images.

### 11. Testing & Quality Documentation

Before shipment, you should receive and verify:

- Factory test report (insulation resistance, dielectric strength, continuity)
- Routine test per IEC 61439-2
- Serial number traceability
- Wiring diagram specific to your PO
- Photos of the actual units shipped

> ⚠️ **Red flag**: Supplier refuses to send unit-specific test reports. Walk away.

### 12. Warranty, Spare Parts & After-Sales

A 5-year warranty is worthless if the supplier can't ship replacement SPDs or breakers to your site.

**Verify:**
- Warranty length — **industry standard: 5 years on the box, 2 years on components**
- Spare parts availability (stocked, or re-ordered each time?)
- Response time commitment for warranty claims
- Local agent or service partner in your country

## Bonus: 3 Commercial Specs Often Forgotten

Beyond the technical 12, these commercial terms cost buyers the most when overlooked:

- **MOQ & lead time** — confirm both for stock models and customized configurations (our standard: **MOQ 10 units, lead time within 15 days**)
- **Packaging** — export-grade plywood case, fumigation certificate, correct HS code
- **Pricing terms** — FOB vs CIF vs DDP — understand exactly what's included

## Quick Summary: The 12-Point Checklist

| # | Spec to Verify | Why It Matters |
|---|---|---|
| 1 | DC vs AC type | System compatibility |
| 2 | Number of strings | Sizing & cost |
| 3 | Rated DC voltage | 1500V is standard in 2026 |
| 4 | Input current / fuse size | Module Isc match |
| 5 | SPD type & brand | Lightning survival |
| 6 | IP rating | Environment match |
| 7 | Enclosure material | Durability & cost |
| 8 | Certifications | Customs & compliance |
| 9 | Monitoring / smart | Future-proofing |
| 10 | Internal wiring quality | Hidden cost-cutting |
| 11 | Test documentation | Traceability |
| 12 | Warranty & after-sales | Long-term cost |

## Ready to Source?

This checklist is the same one our engineers use when quoting every project. If you'd like us to run your specific requirements through it and quote a matching combiner box configuration, [contact our engineering team](/contact) to request a tailored quotation.

## Frequently Asked Questions

### What's the single most overlooked spec by first-time buyers?

SPD brand and class. Unbranded SPDs are the leading cause of premature combiner box failure, especially in tropical markets.

### Can I request a customized combiner box based on this checklist?

Yes. String count, SPD class, monitoring options, enclosure material, and cable gland configuration can all be customized to match your project requirements. Our **MOQ is 10 units**, with a typical **lead time within 15 days** for most customized configurations.

### What documents should I ask the supplier to send before placing the PO?

Datasheet, wiring diagram, full certification PDFs, factory test report template, and at least three real project reference photos.

### Is IP66 always better than IP65?

Not always. IP66 costs more and is overkill for dry rooftops. Match the rating to your actual site conditions.

### How do I know if a combiner box is truly 1500V-rated?

Every internal component — breaker, SPD, fuse holder, terminals — must carry a 1500V DC rating on its own label, not just the enclosure.

## About the Author

*Written by **Jacky**, Soltree. Reviewed by **Jacky**, Chief Engineer. 15 years of experience in PV combiner box engineering and B2B export.*
    `,
    date: "2026-04-14",
    dateModified: "2026-04-14",
    author: "Jacky",
    image: "/images/blog/pv-combiner-box-buyers-checklist.jpg",
    tags: ["PV Combiner Box", "Buyer's Guide", "Sourcing", "Specifications", "B2B"],
    readingTime: 10,
    metaTitle: "PV Combiner Box Buyer's Checklist: 12 Specs to Verify (2026) | Soltree",
    metaDescription: "The 12-point PV combiner box checklist used by engineers — verify voltage, SPD, IP rating, certifications and warranty before your next PO. B2B sourcing guide.",
    metaKeywords: "PV combiner box specifications, PV combiner box buyer checklist, how to choose PV combiner box, PV combiner box sourcing guide, solar combiner box specs, 1500V combiner box checklist, PV combiner box manufacturer",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "dc-vs-ac-pv-combiner-box",
    title: "DC vs AC PV Combiner Box: Which One Do You Need?",
    excerpt:
      "DC and AC combiner boxes sit on opposite sides of the inverter and solve different problems. This guide helps EPC engineers and buyers pick the right one — and avoid the costly mistake of ordering the wrong type.",
    content: `
Choosing between a DC combiner box and an AC combiner box sounds like a simple binary decision — until the wrong unit arrives on site and the project stalls for weeks. Over **15 years of manufacturing [PV combiner boxes](/categories/pv-combiner-box) for 200+ solar projects across 10+ countries**, we've seen this exact mistake repeat: a 500kW rooftop job ordered DC combiners when the design actually called for AC consolidation downstream of string inverters.

This guide is written for EPC engineers, system designers, and early-stage buyers who need a clear, non-academic answer to: **DC or AC — which one does this project need?**

> 💡 **New to combiner boxes in general?** Start with our [guide to PV combiner box fundamentals](/blog/what-is-solar-pv-combiner-box-photovoltaic-designs) and come back for the comparison.

## Why This Decision Matters

A combiner box is not interchangeable hardware. The DC and AC variants:

- Sit on **opposite sides of the inverter**
- Handle **different voltage types, current magnitudes, and fault behaviors**
- Carry **different certification requirements**
- Are priced differently — often by 20–40% for the same string count

Order the wrong type and you'll face one of three outcomes: the unit doesn't fit the electrical design at all, it fits but fails early, or it passes initial commissioning but triggers code violations during inspection. None of those are cheap.

## The Fundamental Difference

**A DC combiner box consolidates direct-current strings from PV modules before the inverter. An AC combiner box consolidates alternating-current outputs from multiple string inverters before the grid connection or transformer.**

Everything else — component choice, certifications, protection strategy — flows from that one structural fact.

![DC vs AC PV combiner box system position — DC combiner before inverter, AC combiner after inverter in solar project topology](/images/blog/dc-vs-ac-combiner-box-system-position.jpg)

## How a DC PV Combiner Box Works

In a **centralized or large string-inverter architecture**, dozens of PV strings each carry 10–15A of DC current at system voltages up to 1500V. Running every string individually to the inverter is physically and economically impractical.

A DC combiner box sits between the array and the inverter and:

- Aggregates multiple DC strings (typically 4 / 6 / 8 / 12 / 16 / 24-in-1)
- Provides **string-level fusing** (PV fuses in [DC fuse holders](/categories/dc-fuse-holder))
- Includes a **DC load-break disconnect switch**
- Protects downstream equipment with a **Type 2 DC [SPD](/categories/surge-protector-device)**
- Reduces cable runs and copper cost to the inverter

**Typical application**: utility-scale solar farms, large C&I rooftops (>500kW), projects using central inverters.

## How an AC PV Combiner Box Works

In a **distributed string-inverter architecture**, each string inverter outputs AC power at 400V / 480V / 800V three-phase. When you have multiple string inverters on a site, you can't run each one individually to the transformer — you consolidate them in an **AC combiner box** (also called an AC recombiner).

An AC combiner box:

- Aggregates outputs from multiple string inverters (typically 4–12 inverter inputs)
- Uses **AC MCCBs or MCBs**, not DC-rated switches
- Uses **Type 2 AC SPDs**, not DC SPDs
- Provides a single AC feeder to the transformer or LV distribution
- Often includes metering (kWh meter, CT-based current monitoring)

**Typical application**: distributed C&I rooftops, smaller utility farms using multiple 50–250kW string inverters, hybrid systems.

## Side-by-Side: What's Actually Different Inside

| Component | DC Combiner Box | AC Combiner Box |
|---|---|---|
| Input source | PV strings (direct from modules) | String inverters (AC output) |
| Voltage type | DC, up to 1500V | AC three-phase, 400–800V |
| Per-channel current | 10–15A per string | 30–250A per inverter |
| Fuses | gPV-rated PV fuses | gG-rated AC fuses (or MCCB) |
| Disconnect | DC load-break switch | AC MCCB |
| SPD | Type 2 DC SPD (Uc ≥ 1.2× sys voltage) | Type 2 AC SPD |
| Certification focus | IEC 61439-2, TÜV, UL 1741 (DC) | IEC 61439-2, UL 1741, local AC grid codes |
| Enclosure rating | Same IP options (IP65/66/67) | Same IP options |
| Position in system | Before the inverter | After the inverter |

![DC combiner box vs AC combiner box internal components — PV fuses and DC SPD versus AC MCCB and AC SPD comparison](/images/blog/dc-combiner-box-vs-ac-combiner-box-components.jpg)

## When You Need a DC Combiner Box

Choose DC if **any** of the following applies:

- Project uses a **central inverter** (500kW and above is common)
- Project uses **large string inverters** where you still need per-string fusing and diagnostics upstream
- Array has **4 or more strings per MPPT** that need consolidation
- System voltage is **1000V or 1500V DC**
- Code or utility inspection requires string-level overcurrent protection at the array

> ⚠️ **Red flag**: Some buyers try to skip the DC combiner box in central-inverter designs to save cost. In a 4+ string array, this violates IEC 62548 and most national electrical codes — and eliminates the only practical way to isolate a single faulted string.

## When You Need an AC Combiner Box

Choose AC if **any** of the following applies:

- Project uses **multiple string inverters** (typically 50–250kW each) on the same LV bus
- You need a **single consolidated AC feeder** to the transformer
- You want **centralized AC disconnect and SPD** before the point of common coupling
- Grid code requires **metering, monitoring, or power quality protection** at the combined AC output

## The Hybrid Case: Some Projects Need Both

Large distributed C&I and utility projects — and virtually all modern hybrid solar + BESS installations — often require **both types in the same electrical design**.

### Classic Large Utility Topology

In a centralized utility farm:

1. DC combiner boxes consolidate PV strings into trunk cables → central inverter DC input
2. AC combiner boxes consolidate AC outputs from multiple central inverters → MV transformer

Each box is doing a completely different job on a different side of the inverter. One type cannot substitute for the other.

### The BESS / Hybrid Inverter Scenario

Battery Energy Storage Systems (BESS) introduce a third power path that changes the topology:

- **DC-coupled BESS** (e.g., Huawei SUN2000 hybrid, Sungrow SH series): the hybrid inverter handles both PV strings and battery DC on its DC side. **DC combiner boxes** on the PV string side remain standard — the battery connects directly to the inverter's dedicated battery port, not through a combiner box.
- **AC-coupled BESS**: battery inverters are added on the AC bus alongside PV string inverters. An **AC combiner box** may then be needed to consolidate both the PV inverter AC output and the battery inverter AC output before the point of common coupling.

> 💡 **Rule of thumb for hybrid/BESS projects**: audit the DC side and AC side separately. The inverter brand's marketing diagram may blur these lines — but the electrical topology still dictates which combiner type is required at each node.

## The 3 Most Common Wrong-Type Mistakes

**Mistake 1 — Ordering DC when you needed AC.**
Distributor buys "PV combiner boxes" for a string-inverter rooftop project, receives DC units with PV fuses and 1500V DC switches. None of it is useful on the AC side. Result: 4–6 week re-order delay.

**Mistake 2 — Ordering AC SPD on a DC box (or vice versa).**
A DC-rated SPD will not clear surges properly on AC, and an AC SPD on a DC system is a fire hazard. Always check the SPD's DC/AC label individually — not just the box label.

**Mistake 3 — Using an AC disconnect on the DC side.**
Standard AC MCCBs have no arc-extinguishing design for DC. The arc will not extinguish under load, leading to sustained arcing and potential fire. Always use true **DC load-break switches** on the DC side.

> ⚠️ **Red flag**: If a supplier can't clearly explain why a specific disconnect is DC- or AC-rated, don't buy from them. This is fundamental product knowledge.

## Quick Reference

| Question | Choose |
|---|---|
| 4+ PV strings feeding a central or large string inverter? | **DC combiner box** |
| Consolidating AC outputs from multiple string inverters? | **AC combiner box** |
| Combiner positioned before the inverter? | **DC** |
| Combiner positioned after the inverter? | **AC** |
| Both central and string inverters at scale, or hybrid + BESS? | **Both** |

Before placing your PO, run through the full spec verification: [PV Combiner Box Buyer's Checklist: 12 Specs You Must Verify](/blog/pv-combiner-box-buyers-checklist)

## Still Not Sure? Let Our Engineers Review Your Design

Send us your single-line diagram and we'll tell you exactly which combiner configuration your project needs — and quote a matching spec. With 200+ projects across 10+ countries, we've seen almost every topology variant you can throw at us.

👉 [Contact our engineering team](/contact) for a design review and quotation.

## Frequently Asked Questions

### Can I use a DC combiner box on the AC side of the inverter?

No. DC and AC combiner boxes use fundamentally different internal components — fuses, disconnects, and SPDs are all voltage-type specific. Using a DC-rated unit on an AC line (or vice versa) creates a serious safety hazard and is not compliant with IEC 61439-2.

### Is an AC combiner box the same as a recombiner box?

Functionally very similar — "AC recombiner" is another term often used when consolidating the AC outputs of multiple string inverters. The core function (aggregating AC feeders with overcurrent and surge protection) is the same.

### Do small residential systems need either type?

Usually not. Systems with 1–3 strings feeding a single string inverter typically route cables directly without a combiner box. IEC and NEC only mandate combiner boxes at 4+ strings per MPPT or for specific overcurrent coordination requirements.

### Can one enclosure contain both DC and AC sections?

Some OEM designs offer "hybrid" enclosures with separate compartments, but these are uncommon and require careful certification. For most B2B projects, it's cleaner and more cost-effective to specify separate DC and AC units.

### Which is more expensive — DC or AC?

It depends on string count and inverter current rating, not the DC/AC distinction alone. An 8-in-1 DC combiner and a 4-input AC combiner may cost similarly. Get a like-for-like quote based on your actual project spec rather than assuming one is always cheaper.

### How does a BESS affect which combiner box I need?

It depends on the coupling architecture. DC-coupled systems (hybrid inverter handling both PV and battery on the DC side) still use a standard DC combiner box on the PV string side. AC-coupled systems may require an AC combiner box to consolidate PV and battery inverter outputs on the AC bus. Map the topology first — the inverter datasheet will specify the coupling architecture clearly.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-15",
    dateModified: "2026-04-18",
    author: "Jacky",
    image: "/images/blog/DC-vs-AC-PV-Combiner-Box.jpg",
    tags: ["PV Combiner Box", "DC vs AC", "System Design", "EPC", "Technical Guide"],
    readingTime: 10,
    metaTitle: "DC vs AC PV Combiner Box: Which Do You Need? (2026) | Soltree",
    metaDescription: "Wrong combiner box type stalls projects for weeks. Learn when to specify a DC or AC PV combiner box — and why the components are never interchangeable.",
    metaKeywords: "dc combiner box vs ac combiner box, ac combiner box vs dc combiner box, pv combiner box difference, ac recombiner box, dc combiner box applications, ac combiner box applications, choose pv combiner box type, hybrid solar combiner box, BESS combiner box",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "how-to-vet-pv-combiner-box-manufacturer",
    title: "How to Vet a PV Combiner Box Manufacturer: A Sourcing Checklist for Global Buyers",
    excerpt:
      "The single most important B2B sourcing decision is not the spec — it's the supplier. This is the same 7-point factory audit SOP, certification verification method, and red-flag checklist our engineering team uses before clearing any new PV combiner box manufacturer for a PO.",
    content: `
There's a pattern we've seen repeat across 200+ projects in 10+ countries: a distributor gets a great quote, signs the PO, waits four weeks — and then receives a shipment that looks nothing like the datasheet. Somewhere along the way, the "factory" they thought they were buying from was actually a trading company that outsourced production to the cheapest workshop available that week.

Vetting the [PV combiner box](/categories/pv-combiner-box) manufacturer is arguably the single most important decision in B2B solar procurement — more important than the price, the MOQ, or even the specification itself. A disciplined factory will help you fix a wrong spec; a trading company masquerading as a factory will not.

This guide is the exact vetting framework our engineering team uses internally when evaluating new suppliers for joint projects. Run through it before you place your next PO.

> 💡 **Already know what to spec?** Pair this with our [PV Combiner Box Buyer's Checklist](/blog/pv-combiner-box-buyers-checklist) — the 12 technical specs you must verify before ordering.

## Why Vetting Your PV Combiner Box Manufacturer Matters

A bad manufacturer decision creates three failure modes that rarely show up in Year 1:

- **Silent quality drift** — The first container meets spec. The fifth container doesn't. Without a traceable QC system, you won't notice until field return rates spike 18 months after shipment.
- **Compliance gaps at customs** — Certificates look valid until a port inspector runs the number against the issuing body's database. A fake TÜV certificate will stop a container dead for weeks.
- **After-sales black holes** — You ship 500 units, 18 months later you need 10 replacement SPD cartridges for a warranty claim. The "manufacturer" has disappeared, switched products, or simply stops replying.

None of these show up in a quote sheet. All of them show up in your P&L 12–24 months later.

## The #1 Question: Factory or Trading Company?

Over 60% of "manufacturers" listed on international B2B platforms are trading companies. That's not inherently bad — many run legitimate businesses — but it fundamentally changes your control over quality, lead time, and customization.

### 5 Signs You're Talking to a Trading Company, Not a Factory

1. **Catalog is too broad** — A genuine combiner box factory specializes in DC low-voltage assemblies. If the same company also offers solar panels, inverters, batteries, cables, and lightning rods, it is almost certainly a trading company.
2. **Address is a commercial building, not an industrial park** — Real factories sit in designated industrial zones with 5,000+ m² floor plans. Trading companies operate from office towers.
3. **No engineering team on video calls** — Ask to speak with a design engineer about a technical question. A factory produces one within a day. A trading company dodges or brings in a third-party "consultant."
4. **Certificates list a different company name** — Their CE, TÜV, and IEC certificates should all be issued to the same legal entity. If certificates are "shared" or "partner-issued," walk away.
5. **Payment terms favor the supplier excessively** — 100% TT before production, no staged milestones, no sample approval gate. Real factories operate with industry-standard L/C or 30/70 TT terms.

![Factory vs trading company comparison — how to identify a real PV combiner box manufacturer in China](/images/blog/factory-vs-trading-company-pv-combiner-box.jpg)

### How to Verify Factory Status

- **Business license** — Ask for a scanned copy. Check the registered capital (real factories typically ≥ ¥5M), business scope (should explicitly include "manufacturing of low-voltage electrical equipment"), and registration address.
- **Tax invoice capability** — A factory can issue a VAT special invoice (增值税专用发票). A trading company often cannot, or charges extra for it. This is a legal distinction in China.
- **Customs export code** — Real manufacturers hold their own export registration. Ask for the first four digits — trading companies often route exports through a third-party agent.
- **Google Maps satellite view** — Drop the registered address into satellite view. If you see a proper industrial compound with loading bays, you are likely looking at a real factory.

## The 7-Point Factory Audit SOP

Whether you audit on-site or via video call, run through these seven checkpoints. A legitimate factory welcomes every one of them.

![PV combiner box factory audit SOP — 7-point checklist for global buyers vetting a manufacturer](/images/blog/pv-combiner-box-factory-audit-sop.jpg)

### 1. Physical Factory and Scale Match

Ask for the factory address, then:

- Verify the address against the business license
- Request a live video walkthrough of the main gate and external signage
- Confirm total floor area matches claimed output (typical ratio: 1,000 m² supports ~3,000 combiner boxes/month)

### 2. Production Line Actually Running

- Walk the line end-to-end: raw material incoming QC → enclosure forming → DIN-rail assembly → wiring → final test
- Count operators and verify the headcount matches claims
- Look for work-in-progress inventory — a real factory has half-assembled units at every station

### 3. In-House Testing Facilities

Minimum equipment for a legitimate combiner box factory:

- High-voltage insulation tester (≥ 2500V DC)
- IP test chamber for IP65 / IP66 / IP67 verification
- Short-circuit withstand tester or a documented third-party test contract
- Temperature rise test setup per IEC 61439-2

If testing is "outsourced to a partner lab," request the partner lab's contract and the most recent test report.

### 4. ISO 9001 and ISO 14001 Systems

Don't just ask "do you have ISO 9001?" Ask to see:

- The current certificate (valid, not expired)
- The process flow document
- A random sample of internal audit records from the last 6 months

A factory that can't produce these on request either doesn't run the system, or has something to hide.

### 5. Raw Material Traceability

Your combiner box is only as reliable as its weakest component. Ask:

- Who supplies the [DC SPDs](/categories/surge-protector-device)? (Should be a known brand — DEHN, Phoenix, Citel, or a comparable tier)
- Who supplies the DC fuses and [DC fuse holders](/categories/dc-fuse-holder)? (gPV-rated, from a reputable brand)
- What grade of enclosure plastic or steel?
- Is there a documented incoming QC gate for each?

Request a random sample of raw material inspection records.

### 6. Finished Goods Warehouse and Shipment Records

- Total units in finished-goods inventory (indicates production rhythm)
- Past 6-month export shipment records (destination countries, order sizes)
- Packing photos of recent shipments to markets similar to yours

### 7. Engineering and R&D Team

- Headcount of engineers (typical: 5–10% of total workforce)
- Years of experience of the lead engineer
- Ability to discuss a custom configuration (specific string count, integrated ATS, smart monitoring) in engineering terms — not sales terms

## Certification Due Diligence

Every minute you spend verifying certificates before the PO saves you a week of customs problems after shipment.

### Must-Have Certifications for a PV Combiner Box

- **IEC 61439-2** — Low-voltage switchgear assembly standard (mandatory for B2B buyers)
- **TÜV / TÜV SÜD / TÜV Rheinland** — German certification, widely accepted across EU and ME
- **CE** — EU market access
- **UL 1741** — North American market
- **RoHS** — Restriction of hazardous substances
- **ISO 9001** — Quality management system

### How to Actually Verify a Certificate

A scanned PDF is not proof. Run every certificate through the issuing body's public database:

- **TÜV**: Search the certificate number at the issuing body's verification portal — each TÜV branch has its own
- **CE**: Ask for the EU Declaration of Conformity signed by a company officer, plus the test report from a Notified Body
- **UL**: Cross-check the UL file number at UL's public product iQ database
- **IEC 61439-2**: Request the full test report (not just the cover page), including temperature-rise and short-circuit test results

> ⚠️ **The most common trick**: a supplier shows a valid certificate issued to "Company A" — but the PO is signed with "Company B." The certificate does not transfer. Confirm the legal entity name on the certificate matches the entity issuing your invoice.

## Production and Export Capability Checks

A factory that passes technical audits can still fail on capacity. Before committing to a 1,000+ unit PO, verify:

- **Monthly output capacity** — Ask for last 6 months of actual output, not theoretical max
- **Lead time during peak season** — March–April and September–October are capacity-constrained globally. Get a written commitment.
- **Major clients in similar markets** — If you're in LATAM, have they exported to LATAM before? First-time shipments to a new market carry hidden risks (labeling, local norms, port handling)
- **Export license and bank wire history** — Confirm they can receive your currency through their own corporate bank account, not a personal account

## Communication and After-Sales Red Flags

The supplier's responsiveness during vetting previews their responsiveness during a warranty claim. Watch for:

- **Response time over 24 hours** on technical questions — signals either understaffing or multiple-layer inquiry routing
- **Generic answers** that don't reference your specific project parameters
- **No single point of contact** — if you talk to a different person every time, institutional knowledge about your project does not exist
- **Vague warranty terms** — "standard 2-year warranty" is not enough. Require: what's covered, RMA process, replacement shipment terms, and who pays return freight
- **Spare parts policy** — Will they stock SPDs, fuses, and breakers matching your specific configuration for 5+ years? Get it in writing.

## Top 10 Red Flags That Should Kill a Supplier

![PV combiner box supplier red flags — 10 warning signs to avoid bad manufacturers](/images/blog/PV-combiner-box-supplier-red-flags.jpg)

Any one of these is reason enough to walk away:

1. Refuses a factory audit (on-site or video)
2. Can't produce a business license when asked
3. Certificates issued to a different company name
4. "Same price regardless of certification" — genuine certification costs money, and that cost is always in the BOM
5. Demands 100% payment before production starts
6. Cannot name the brand of SPDs, fuses, or breakers used
7. No engineering team available on technical calls
8. Catalog covers dozens of unrelated product categories
9. Address is a commercial building or residential area
10. Can't provide references for previous exports to your region

## Sample Order: The Final Test Before a Big PO

Even after a perfect audit, never skip the sample order. A properly executed sample step catches the issues that survive every paper and video check.

**What to test on the sample:**

- **Physical match to datasheet** — enclosure dimensions, IP gasket thickness, internal layout
- **Internal component brands** — open the unit and confirm SPD, fuse, and breaker brands match what was promised
- **Insulation resistance test** per IEC 62446
- **Torque check on every terminal** — factories that skip torque specs show up here
- **Packaging and export marking** — HS code, country of origin, handling labels

Budget 3–4 weeks for sample evaluation. A supplier that refuses a pre-production sample is saving you time by self-selecting out.

## Why Soltree?

For 15 years we've manufactured PV combiner boxes at our own facility — not outsourced, not rebranded. 200+ projects delivered across rooftop, C&I, and utility-scale, exported to 10+ countries with repeat buyers in LATAM, EU, MENA, and Southeast Asia. Every audit checkpoint in this guide — from the business license to the RMA protocol — we welcome on request.

For the broader 2026 China sourcing strategy, see our [complete PV combiner box sourcing guide](/blog/pv-combiner-box-sourcing-china-2026).

If you're evaluating a new combiner box supplier for 2026, [contact our engineering team](/contact) to schedule a video audit, request sample units, or discuss a project-specific quotation.

## Frequently Asked Questions

### How do I tell a PV combiner box factory from a trading company online?

Check three things: (1) the registered address — factories are in industrial zones, not office buildings; (2) catalog breadth — real factories specialize, trading companies cover many unrelated products; (3) ability to host a real-time video walkthrough of their production line and testing lab. Any manufacturer worth your PO will say yes to all three.

### What certifications are essential for a PV combiner box?

At minimum: IEC 61439-2 (the assembly standard), TÜV or equivalent, CE for EU markets, and UL 1741 for North America. RoHS and ISO 9001 are near-universal baseline requirements. Always verify certificate numbers through the issuing body's public database — not just the PDF.

### Should I always do an on-site factory audit?

Not always, but always do something. A live video walkthrough is the acceptable alternative if travel isn't feasible. The key is seeing the actual factory, production line, and testing facilities in real time — not pre-recorded footage.

### How do I verify a TÜV or CE certificate isn't fake?

TÜV certificates can be verified through each issuing branch's public database (TÜV SÜD, TÜV Rheinland, and TÜV Nord each have their own portal). For CE, request the full EU Declaration of Conformity signed by a company officer plus the test report from a Notified Body. Fake certificates often contain subtle errors — mismatched company names, expired validity, or non-existent file numbers.

### What's a reasonable MOQ for a new PV combiner box supplier?

For standard configurations, 10–50 units is reasonable for first orders. A supplier demanding 500+ units for a first PO is either overestimating demand or not set up for smaller B2B customers. Our standard MOQ is 10 units for standard models, higher for fully custom OEM.

### How long should the vetting process take?

Plan for 3–5 weeks total: 1 week for documentation verification, 1 week for factory audit scheduling and execution, 2–3 weeks for sample production and evaluation. Compressing this timeline by skipping stages reliably costs more than the time it saves.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-24",
    dateModified: "2026-04-24",
    author: "Jacky",
    image: "/images/blog/How-to-Vet-a-PV-Combiner-Box-Manufacturer.jpg",
    tags: ["PV Combiner Box", "Manufacturer Vetting", "Factory Audit", "Sourcing", "B2B"],
    readingTime: 10,
    metaTitle: "How to Vet a PV Combiner Box Manufacturer (2026) | Soltree",
    metaDescription: "Factory or trading company? Use this 7-point audit SOP, certificate verification method, and 10 red flags to vet any PV combiner box manufacturer before the PO.",
    metaKeywords: "pv combiner box manufacturer, pv combiner box supplier, china pv combiner box factory, vet pv combiner box manufacturer, solar combiner box OEM, pv combiner box factory audit, factory vs trading company pv combiner box, how to find pv combiner box manufacturer",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "pv-combiner-box-price-guide-2026",
    title: "PV Combiner Box Price Guide: What Drives the Cost and How to Get Real Value",
    excerpt:
      "Quotes for the same PV combiner box can span a 6× price spread. This guide breaks down real 2026 FOB China price ranges by configuration, the cost structure behind every unit, and the traps at both ends — too cheap and too expensive.",
    content: `
A distributor once showed me two quotes for what the datasheets described identically: "8-in-1 PV combiner box, IP65, 1500V DC, CE certified." One was $52. The other was $310. Same string count, same IP rating, same voltage class — a 6× spread.

This kind of price gap is not unusual in the 2026 [PV combiner box](/categories/pv-combiner-box) market, and it is the single biggest source of bad procurement decisions our engineering team sees from distributors. The low quote is almost never a "find"; the high quote is often not a "premium." This guide breaks down exactly what you are paying for, what a defensible 2026 FOB China price range actually looks like, and how to spot quotes that either undercut reality or overcharge for features you don't need.

> 💡 **Need to vet the supplier behind the quote?** Pair this with our [PV combiner box manufacturer vetting guide](/blog/how-to-vet-pv-combiner-box-manufacturer) — covering factory audit SOP, certification verification, and red-flag signals.

## What Drives the Cost of a PV Combiner Box?

Before comparing quotes, understand where the money actually goes inside the box. Here is the approximate cost structure of a standard 8-in-1, 1500V DC, IP65 combiner box at 2026 wholesale prices:

![PV combiner box cost breakdown — anatomy of a 2026 wholesale price showing DC components at ~45 percent of total cost](/images/blog/pv-combiner-box-cost-breakdown.jpg)

- **Internal DC components (40–55%)** — [DC SPDs](/categories/surge-protector-device), PV fuses and [DC fuse holders](/categories/dc-fuse-holder), DC load-break switch, MCB or MCCB, tin-plated copper terminals. This is where real cost concentrates.
- **Raw materials (15–20%)** — Copper busbars, steel or high-grade plastic enclosure body, internal wiring.
- **Enclosure and ingress protection (10–15%)** — IP gaskets, cable glands (PG series), UV-resistant coatings, door hinges and locks.
- **Certification and compliance (5–10%)** — Amortized across production volume. IEC 61439-2, TÜV, CE, UL and RoHS tests each cost between $3,000 and $15,000 upfront at an accredited lab, spread across the units sold under that certification.
- **Labor and QC (8–12%)** — Skilled wiring, torque-controlled terminal tightening, insulation resistance testing, IP verification.
- **Packaging and export prep (3–5%)** — Fumigated plywood cases, HS-code labeling, pallet securing for ocean freight.

The single most important takeaway: **the dominant cost is what's inside the box, not the box itself.** When a supplier cuts 40% from the headline price, they almost never cut equally from every line — they cut the DC components first, because that's where the money is.

## Typical 2026 PV Combiner Box Price Ranges

These are indicative 2026 FOB China wholesale prices for standard configurations, based on observed market quotes from reputable manufacturers at realistic component grades (branded SPDs, gPV fuses, CE+TÜV certified):

| Configuration | 1000V DC | 1500V DC |
|---|---|---|
| 4-in-1 | $40 – $75 | $50 – $90 |
| 6-in-1 | $55 – $95 | $65 – $115 |
| 8-in-1 | $70 – $120 | $85 – $150 |
| 12-in-1 | $100 – $170 | $120 – $200 |
| 16-in-1 | $140 – $230 | $170 – $280 |
| 24-in-1 | $200 – $340 | $240 – $420 |

**Add-ons that legitimately raise the price:**

- **Smart monitoring upgrade** (string-level current, RS485/Modbus, temperature sensing): +$60 – $150
- **1500V DC over 1000V**: typically +15 – 25% (higher-rated SPD, disconnects, terminals)
- **UL 1741 in addition to CE/TÜV**: +$8 – $20 per unit on amortized cost
- **Custom OEM branding and private label**: +$3 – $10 per unit depending on MOQ

Ranges reflect legitimate variation across component brand tier, enclosure material (metal vs. ABS/SMC), and certification scope. **Quotes substantially below the low end of these ranges are a red flag — not a win.**

## The "Too Cheap" Trap: What's Actually Getting Cut

When a supplier quotes 30–50% below the ranges above, something specific has been removed. After auditing dozens of bargain units over the past decade, here are the five most common cuts:

1. **Thinned busbars** — Reducing busbar thickness from 3mm to 1.5mm saves ~$4 per unit and drops current-carrying capacity by half. Under full load, the busbar overheats and becomes a localized fire hazard.
2. **Unbranded or counterfeit SPDs** — Replacing a DEHN or Citel SPD with an unbranded unit saves $8–$15 per unit. These SPDs fail within 6–18 months, especially in tropical or high-altitude regions — leaving the inverter unprotected.
3. **Recycled plastic enclosure** — Using reground ABS instead of virgin UV-resistant plastic saves $2–$5. The enclosure yellows, cracks, and loses IP integrity within 2–3 years of outdoor UV exposure.
4. **Counterfeit or shared certifications** — The supplier shows a valid certificate, but it's issued to a different legal entity or to a different product model. Customs inspectors catch this, and your container gets stuck.
5. **Compressed QC** — Skipping insulation resistance testing, skipping torque verification on terminals, skipping IP sealing checks. Saves ~$2–$4 per unit. Shows up as elevated RMA rates 12–18 months out.

![Too cheap PV combiner box trap — what gets cut from a low-priced unit including thin busbars, unbranded SPD and recycled plastic](/images/blog/pv-combiner-box-too-cheap-trap.jpg)

A $5 saving at the quote stage routinely becomes a $500 on-site RMA cost. For a distributor with a 500-unit order, a 10% RMA rate can erase all margin on the entire PO.

## The "Too Expensive" Trap

The other end of the spectrum is equally real. Some quotes are 40–60% above the market range without delivering equivalent technical value. The common causes:

- **Over-rated IP for the environment** — Specifying IP67 for a dry rooftop install. IP65 is sufficient and costs 15–20% less.
- **Certification stacking beyond your market** — Paying for UL 1741 + CE + TÜV + CB + KEMA when you only sell into the EU. Each unused certification adds amortized cost.
- **Unnecessary smart monitoring** — For small rooftop installers who will never read the data, a $100 monitoring upgrade is pure cost.
- **Branded premium enclosure with no technical delta** — Some "Tier 1 European" labeled units are assembled from the same components as mid-tier Chinese units, sold at a 2–3× markup on brand alone.
- **Extended warranty with no service network** — A 10-year warranty is worthless if there's no regional agent to honor it.

Pay for the certifications, IP rating, and features your specific project actually needs — not for everything a supplier can add to inflate the quote.

## Real Value = Total Cost of Ownership (TCO)

Initial quote is the start of the cost, not the total. A rigorous TCO view includes:

- **Initial unit price (FOB/CIF)**
- **Inbound logistics and duty**
- **Warehouse handling**
- **Installation labor** (pre-wired units reduce this by 30–40%)
- **Field RMA rate × replacement cost** (including freight and service call-outs)
- **Warranty logistics** (shipping replacement parts, local service)
- **Project delay risk** (one failed container blocks a 1MW commissioning = weeks of lost revenue)
- **Resale reputation impact** (field failures destroy distributor brand with local EPCs)

A quick comparison we ran with a LATAM distributor:

- **Option A**: Unit price $62, RMA rate observed 8%, no local service
- **Option B**: Unit price $95, RMA rate observed 1.2%, pre-wired, 24h technical support

On a 300-unit order, Option B cost $9,900 more upfront — but Option A's RMA costs, installation labor overhead, and lost follow-on projects totalled over $38,000 in the first 18 months. Option B was cheaper by a wide margin.

## What's Actually Negotiable in a PV Combiner Box Quote

Procurement teams often negotiate the wrong things. Here's what is real:

**Negotiable:**

- **Volume discounts** — Meaningful breaks typically at 100+ units (3–5%), 500+ (7–10%), 1000+ (12–18%)
- **Payment terms** — 30/70 TT or L/C sight vs. 50/50 TT; can shift 1–2% on cash-flow value
- **Lead time acceleration fee** — 10–15% premium for expedited production during peak season
- **Customization premium** — Custom string count, integrated ATS, custom labeling; discuss tooling amortization
- **Packaging options** — Bulk packaging vs individual retail-ready boxes
- **Spare parts bundle** — Negotiate a 2–3% spare-parts allocation included at quote stage rather than re-ordered individually

**Not negotiable (walk away if they "flex" here):**

- **Internal component brand** — If the supplier agrees to downgrade from DEHN to "equivalent unbranded" to hit your target price, you are buying a different product
- **Certification validity** — A supplier who "can add any certificate logo you want" is selling you a future customs problem
- **Testing protocol compliance** — Skipping IP or insulation testing to save a few dollars is how containers fail inspection

## How to Get Apples-to-Apples Quotes

Vague RFQs get vague quotes that cannot be compared. To force genuine comparability, lock down these 12 items in your RFQ:

1. Exact string count (4 / 6 / 8 / 12 / 16 / 24-in-1)
2. System DC voltage (1000V or 1500V)
3. Input current per string (matches your module Isc × 1.25–1.56)
4. IP rating (IP65 / IP66 / IP67)
5. Enclosure material (metal, ABS, SMC, fiberglass)
6. SPD brand requirement (DEHN, Phoenix, Citel, or equivalent tier named)
7. PV fuse brand and rating
8. DC disconnect / MCB brand and rating
9. Target certifications (list exactly: CE, TÜV, UL 1741, etc.)
10. Cable gland count and size
11. MOQ and target lead time
12. Destination port (for CIF accuracy)

A supplier that can respond to this RFQ in under 48 hours with a detailed line-item quote — referencing component brands, certification numbers, and lead-time commitments — is a serious factory. A supplier that sends back a single-line price is selling you a commodity quote, not engineered hardware.

> 💡 **Full technical spec checklist**: [PV Combiner Box Buyer's Checklist: 12 Specs You Must Verify](/blog/pv-combiner-box-buyers-checklist) — pairs well with this pricing guide to build a complete RFQ.

## Why Soltree?

For 15 years we've manufactured PV combiner boxes at our own facility. Our pricing is transparent line by line — branded SPDs, gPV fuses, certified enclosures, amortized CE+TÜV+UL certification scoped to each buyer's market. We don't undercut through component substitution, and we don't overcharge through unneeded feature stacking.

For the broader 2026 China sourcing strategy, see our [complete PV combiner box sourcing guide](/blog/pv-combiner-box-sourcing-china-2026).

**Ready for a transparent, line-item quote?** [Contact our engineering team](/contact) with your RFQ or project specs and receive a detailed quotation within 24 hours.

## Frequently Asked Questions

### What is the typical 2026 FOB price for a 6-in-1 1500V PV combiner box?

With branded SPDs, gPV fuses, IP65 enclosure, and CE+TÜV certification, expect $65–$115 FOB China at moderate order volumes (50–200 units). Below $55 is a red flag; above $130 the supplier is either certification-stacking or brand-marking up.

### Why do quotes for the same combiner box vary so much?

Because "the same combiner box" on a datasheet hides the real variation: component brand tier, busbar thickness, enclosure material, certification authenticity, and QC rigor. Always force an RFQ that pins down component brands and certification numbers — a detailed quote makes variation visible and comparable.

### Is it safe to buy a PV combiner box under $50?

For a 4-in-1 1000V unit at low volume, possibly — though still at the budget edge. For an 8-in-1 or 1500V unit, $50 is below genuine material cost. The supplier is cutting components you cannot see from the outside. The long-term cost of this "deal" is consistently higher than paying market price.

### At what order volume do real discounts kick in?

Meaningful volume-based price reductions typically start at 100 units (3–5%), scale to 7–10% at 500 units, and reach 12–18% at 1000+ units. Below 100 units you're paying close to list price. Discounts larger than ~20% from the market range signal either component substitution or loss-leader pricing to land a relationship.

### What hidden costs should I budget for beyond the FOB price?

Plan for 12–25% above FOB for total landed cost in most markets: ocean freight, destination port handling, import duty, inbound warehouse, and customs clearance. For markets with tariff exposure on Chinese solar components (notably the US), the effective delta can exceed 40%.

### Can I negotiate the SPD or fuse brand in a custom quote?

You can request alternative branded equivalents (e.g. DEHN vs Citel) — these swaps typically shift the unit price by $3–$8. But downgrading from a branded SPD to an unbranded one, while technically "negotiable," fundamentally changes the product and its failure profile. Frame the discussion as "brand tier," not "cost cutting."

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-24",
    dateModified: "2026-04-24",
    author: "Jacky",
    image: "/images/blog/pv-combiner-box-price-guide-2026.jpg",
    tags: ["PV Combiner Box", "Price Guide", "Sourcing", "Cost Analysis", "B2B"],
    readingTime: 10,
    metaTitle: "PV Combiner Box Price Guide 2026: Cost, Ranges & Traps | Soltree",
    metaDescription: "PV combiner box quotes span 6× for the same spec. 2026 FOB China price ranges, full cost breakdown, and traps at both ends — too cheap and too expensive.",
    metaKeywords: "pv combiner box price, pv combiner box cost, solar combiner box price, pv combiner box wholesale price, cheap pv combiner box, how much does a pv combiner box cost, pv combiner box price list 2026, 1500v pv combiner box price, pv combiner box fob price",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "how-to-choose-pv-combiner-box-string-count",
    title: "How to Choose the Right Number of Strings: 4-in-1, 8-in-1, 16-in-1 PV Combiner Box Explained",
    excerpt:
      "String count is not a preference — it's an output calculated from your array geometry and inverter topology. This guide shows procurement managers and EPC designers how to match 4-in-1, 6-in-1, 8-in-1, 12-in-1, 16-in-1, and 24-in-1 PV combiner boxes to project scale without over- or under-specifying.",
    content: `
Pick the wrong string count for your [PV combiner box](/categories/pv-combiner-box) and you pay for it one of two ways: either you buy too small and daisy-chain multiple boxes where one would have sufficed, or you over-specify and pay for unused input positions that inflate BOM and warehouse cost. Both mistakes happen weekly — and both are 100% avoidable if you understand the array math upfront.

This guide is written for procurement managers and EPC designers who need a clear answer to: **"How many strings should my PV combiner box handle?"** — without reading the entire IEC 62548 handbook. We'll walk through the array math, the standard configurations and where each fits, the MPPT consideration most buyers skip, and how to express string count precisely in an RFQ.

> 💡 **Need the full technical spec list?** Pair this with our [PV Combiner Box Buyer's Checklist](/blog/pv-combiner-box-buyers-checklist) — this article focuses on sizing, the checklist covers everything else.

## The Array Math: Where String Count Actually Comes From

String count is not a preference — it's a calculated output. Before you can sensibly choose between a 4-in-1, 8-in-1, or 24-in-1 combiner, work backwards from three known project inputs:

1. **Total DC capacity of the array (kWp)**
2. **Module power and Voc** (determines how many modules per string)
3. **Inverter topology and number of MPPTs**

The logic flows in one direction:

- Total modules ÷ modules per string = **total strings in the array**
- Total strings ÷ number of MPPTs = **strings per MPPT**
- Strings per MPPT dictates the **combiner input positions per unit**

### A Worked Example

A 500 kWp commercial rooftop using 550W modules:

- Total modules: 500,000 ÷ 550 ≈ 910 modules
- Modules per string (at 1500V DC, Voc 50V): ~28 modules per string
- Total strings: 910 ÷ 28 ≈ 32 strings
- Inverter: 2× 250 kW central inverters, each with 1 MPPT
- Strings per MPPT: 32 ÷ 2 = 16 strings per MPPT

An **16-in-1 combiner** per inverter is the natural match. Pick 8-in-1 and you double your combiner count; pick 24-in-1 and you have 8 unused positions per box plus wasted cable glands.

![PV combiner box string count decision tree — match 4-in-1, 8-in-1, 16-in-1 configurations to project scale](/images/blog/pv-combiner-box-string-count-decision.jpg)

## Standard Configurations and Where Each Fits

| Configuration | Typical Project Fit | Common Voltage |
|---|---|---|
| **4-in-1** | Residential rooftop, very small C&I, premium residential | 1000V DC |
| **6-in-1** | Residential+, small commercial, 30–100 kW systems | 1000V / 1500V DC |
| **8-in-1** | Small to mid-sized commercial, 100–500 kW | 1000V / 1500V DC |
| **12-in-1** | Large C&I, small utility, 500 kW – 1.5 MW | 1500V DC |
| **16-in-1** | Large C&I, utility blocks, 1.5–5 MW | 1500V DC |
| **24-in-1** | Utility-scale, ground-mount, centralized inverter farms | 1500V DC |

There's no universal "best" configuration — the right box is the one that matches your per-MPPT string count with minimal unused positions and minimal daisy-chained boxes.

## Sizing by Project Scale

For quick reference when you don't have full inverter specs in hand, this table approximates the combiner configuration by total DC capacity:

| Project Scale | System Size | Recommended Configuration |
|---|---|---|
| Residential rooftop | Under 30 kW | 4-in-1 or 6-in-1 |
| Small commercial | 30–200 kW | 6-in-1 or 8-in-1 |
| Mid C&I | 200–800 kW | 8-in-1 or 12-in-1 |
| Large C&I | 800 kW – 2 MW | 12-in-1 or 16-in-1 |
| Distributed utility | 2–10 MW | 16-in-1 or 24-in-1 |
| Ground-mount utility | 10 MW+ | 16-in-1 or 24-in-1 |

These are starting-point recommendations. The actual choice still depends on inverter topology — which brings us to the single most important factor most buyers skip.

## The MPPT Factor: Why It Changes Your String Count

Two projects of identical size can require fundamentally different combiner strategies based on inverter MPPT count. This is where most sizing mistakes originate. (If you're still deciding whether you even need a DC-side combiner, start with our [DC vs AC PV combiner box guide](/blog/dc-vs-ac-pv-combiner-box).)

![Multi-MPPT inverter vs central inverter topology — how MPPT count affects PV combiner box string selection](/images/blog/pv-combiner-box-mppt-topology.jpg)

### Central Inverters (1–2 MPPTs)

- Many strings funnel into a single MPPT
- Larger combiners (12-in-1, 16-in-1, 24-in-1) match the geometry
- Typical for ground-mount utility projects
- Cable runs are long — fewer, larger boxes save copper cost

### String Inverters with Multiple MPPTs (4–12 MPPTs)

- Each MPPT handles 2–8 strings
- Smaller combiners (4-in-1, 6-in-1, 8-in-1) match per-MPPT geometry
- Typical for rooftop C&I
- **Warning**: never bridge a single combiner across two MPPTs — you'll fault the inverter's MPPT tracking and lose generation

### Hybrid / String-Inverter Centralized (2–4 MPPTs)

- Mid-range configuration: 8-in-1 or 12-in-1 per MPPT
- Most common on 500 kW – 2 MW rooftop C&I installs

**Rule**: the combiner's input count should match or be one step above the number of strings feeding a single MPPT. Never below, and rarely more than 20% above.

> ⚠️ **Do not buy combiner boxes based on total inverter MPPT count.** An inverter with 6 MPPTs does not mean you need a 6-in-1 combiner. You need a combiner sized to the strings-per-MPPT, not to the MPPT count itself.

## Future-Proofing: Building in Headroom

Projects rarely stay exactly at the design-day capacity. For installations that may expand within 3–5 years (common on commercial rooftops and ground-mount sites), build headroom into the combiner spec:

- **10–20% spare string positions** — e.g., if you need 8 active strings today, specify an 8-in-1 with 2 spare positions or a 10-in-1 configuration
- **Spare cable glands** matching the spare input positions (skip this and you'll be drilling into a fully-sealed enclosure on site)
- **Reserve capacity in the main DC output busbar and disconnect** — a 10-in-1 box with a disconnect rated only for 8 strings at full load saturates when you activate the spares

**When NOT to over-provision:**

- When MOQ pricing creates a discontinuity (e.g., 8-in-1 is 30% cheaper per unit than 10-in-1)
- When the site has no physical expansion path (rooftop fully populated)
- When the inverter MPPT is already at capacity — adding strings to a maxed MPPT gains nothing

## Cost Per String: Where Economies of Scale Kick In

PV combiner box cost does not scale linearly with string count. Larger units are materially more cost-efficient per string:

| Configuration | Typical 2026 FOB | Approx. Cost per String |
|---|---|---|
| 4-in-1 (1500V) | $65 | $16 |
| 6-in-1 (1500V) | $85 | $14 |
| 8-in-1 (1500V) | $115 | $14 |
| 12-in-1 (1500V) | $155 | $13 |
| 16-in-1 (1500V) | $220 | $14 |
| 24-in-1 (1500V) | $325 | $14 |

The per-string cost curve flattens from 8-in-1 onwards — meaning consolidation past 8 strings yields diminishing cost savings. For most mid-scale projects, splitting between two 8-in-1 units often costs roughly the same as one 16-in-1, but gives you redundancy and easier replacement.

For a full look at how pricing actually works in 2026, see our [PV combiner box price guide](/blog/pv-combiner-box-price-guide-2026).

## 5 Common String-Count Sizing Mistakes

**1. Choosing by MPPT count, not strings per MPPT**
A 6-MPPT inverter does not need a 6-in-1 combiner — it needs N separate combiners sized to the strings-per-MPPT. This is the #1 sizing error we see from first-time buyers.

**2. Ignoring the expansion roadmap**
A commercial rooftop customer at 400 kW today often reaches 600 kW within 3 years. Specifying exactly 8-in-1 with no spare positions means a full re-order (and re-installation) for the expansion phase.

**3. Splitting one combiner role across multiple small boxes**
Using two 4-in-1 units to cover 8 strings costs 20–30% more than one 8-in-1, adds installation labor, and doubles the RMA surface. Only split when fault tolerance or physical array layout demands it.

**4. Over-provisioning beyond MPPT saturation**
Specifying a 16-in-1 for a site where the inverter MPPT can only sink 10 strings wastes cable glands, disconnect capacity, and enclosure space. The extra positions will never be used.

**5. Bridging across MPPTs**
One combiner output cable going into two different MPPT inputs defeats the entire purpose of MPPT-level optimization. Each MPPT needs its own dedicated combiner feed.

## How to Write the String Count into Your RFQ

Vague RFQs produce mismatched combiner boxes. Use this precise template when specifying string count:

- **Active strings**: N (e.g., 8)
- **Spare input positions**: M (e.g., 2)
- **Total input positions**: N + M (e.g., 10-in-1 configuration)
- **Cable glands**: (N + M) + 1 for main output + 1 for monitoring cable (e.g., 12 glands)
- **String inputs wired in from factory**: confirm all N + M are pre-terminated with touch-safe connectors, not just the active N
- **Fuse holders populated**: only the N active strings — leave spare positions empty until activated

**Example RFQ line**:
> "8 active strings + 2 spare positions, 1500V DC, IP65 enclosure, 12 PG cable glands (2× PG21 output, 10× PG16 input), all 10 input terminals pre-terminated, 8 gPV fuses in branded [DC fuse holders](/categories/dc-fuse-holder) supplied."

A factory that quotes this precisely with a matching line-item response is worth shortlisting. A supplier that responds with just "8-in-1, $X" has not understood the spec.

## Why Soltree?

For 15 years we've manufactured PV combiner boxes across every standard configuration from 4-in-1 to 24-in-1, plus custom string counts between 10-in-1 and 20-in-1 for projects that don't fit the standard grid. String count, spare positions, cable gland layout, and disconnect sizing are all specified line by line — not packaged into a black-box SKU.

**Ready to match a combiner to your actual array geometry?** [Contact our engineering team](/contact) with your inverter model, MPPT count, and total string count, and we'll recommend the configuration that minimizes both unused positions and daisy-chained boxes.

## Frequently Asked Questions

### How do I calculate the right string count for my PV combiner box?

Work backwards from three numbers: total DC capacity, modules per string (determined by system voltage and module Voc), and the number of MPPTs on your inverter. Total strings divided by MPPT count gives you strings per MPPT — and that's the combiner size you need, plus 10–20% spare positions for future expansion.

### Is a 16-in-1 combiner box cheaper than two 8-in-1 units?

Slightly, but the gap has narrowed as of 2026. An 8-in-1 costs around $115 (1500V), so two units = $230. A 16-in-1 runs around $220. The $10 saving on hardware is often outweighed by easier shipping, installation flexibility, and fault tolerance of keeping two separate boxes. The calculation flips at 24-in-1 vs three 8-in-1 units, where consolidation pays off more clearly.

### Can I use one combiner box across multiple MPPTs?

No. Each MPPT on the inverter performs independent voltage tracking, and merging multiple MPPT inputs through a single combiner output cable defeats that tracking. Always run one combiner (or one combiner output) per MPPT input. This is also a grid-code requirement in most markets.

### Should I always buy a larger combiner box to future-proof?

Only if the site has a realistic expansion path within 3–5 years AND the inverter MPPT has spare capacity. Otherwise, you're paying for unused input positions, oversized disconnects, and cable glands you'll never use. A 10–20% headroom is the sweet spot — more than that is usually waste.

### What's the difference between 4-in-1 and 6-in-1 in practical terms?

Physically: ~30–40% more internal space, 2 additional fuse holders, 2 additional cable glands, and a larger busbar. Commercially: about $15–$25 more per unit FOB. The 6-in-1 is the right choice for any project where you might add 1–2 strings within the service life — which covers most premium residential and small commercial installs.

### How many cable glands should my combiner box have for a given string count?

Match total input positions (active + spare) + 1 main output gland + 1 monitoring cable gland (if smart-capable). For an 8-in-1 with 2 spare positions: 10 input glands + 1 output + 1 monitoring = 12 total. Under-specifying cable glands is the #2 reason a box fails IP65 rating on site — every unsealed knockout is a water path.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-24",
    dateModified: "2026-04-24",
    author: "Jacky",
    image: "/images/blog/how-to-choose-pv-combiner-box-string-count.jpg",
    tags: ["PV Combiner Box", "System Design", "String Count", "EPC", "Technical Guide"],
    readingTime: 10,
    metaTitle: "PV Combiner Box String Count: 4/8/16-in-1 Sizing Guide | Soltree",
    metaDescription: "Match 4-in-1, 8-in-1, 16-in-1 and 24-in-1 PV combiner box configurations to your project scale and inverter MPPT count — without over- or under-specifying.",
    metaKeywords: "8 string pv combiner box, 16 string combiner box, 4 in 1 pv combiner box, 24 in 1 combiner box, pv combiner box string count, how many strings pv combiner box, pv combiner box sizing, 6 string combiner box, 12 string combiner box, solar combiner box configuration",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "ip65-vs-ip66-vs-ip67-pv-combiner-box",
    title: "IP65 vs IP66 vs IP67 PV Combiner Box: Which Protection Level Fits Your Project?",
    excerpt:
      "More IP is not always better. Over-specifying wastes 15–20% of BOM; under-specifying kills the box in 2 years. This guide shows how to match IP65, IP66, or IP67 to your actual installation environment — climate, coastline, altitude, and condensation risk.",
    content: `
A common procurement reflex is "higher IP = safer, so always buy IP67." It isn't. Over-specifying IP rating quietly adds 15–20% to your BOM, inflates weight and shipping cost, and in some environments actively introduces new failure modes (hello, condensation). Under-specifying — for instance, deploying an IP65 [PV combiner box](/categories/pv-combiner-box) on a coastal project — will reliably fail within 18 months from salt-driven gasket degradation and internal corrosion.

This guide cuts through the "higher is better" myth and shows exactly how to match IP65, IP66, or IP67 protection level to your actual installation environment. It is written for procurement managers and project engineers who need a confident answer — not a CYA maximum — for the next RFQ.

> 💡 **Need to lock down the rest of the spec?** Pair this with our [PV Combiner Box Buyer's Checklist](/blog/pv-combiner-box-buyers-checklist) — this guide is the IP-rating deep dive; the checklist covers the other 11 specs.

## What IP Rating Actually Means (The Two Digits)

IP is "Ingress Protection" per IEC 60529. The two digits mean two different things, and buyers routinely confuse them:

- **First digit (solid particle protection)**: protection against dust and other solids. Ranges 0–6. For outdoor PV use, you want **6** — dust-tight.
- **Second digit (liquid ingress protection)**: protection against water. Ranges 0–8. For PV combiner boxes, the practical range is **5, 6, or 7**.

![IP65 vs IP66 vs IP67 rating decoded — what each digit protects against in a PV combiner box enclosure](/images/blog/ip65-vs-ip66-vs-ip67-decoded.jpg)

So IP65 = dust-tight + protected against low-pressure water jets. IP66 = dust-tight + heavy water jets. IP67 = dust-tight + temporary submersion. The first digit is the same; the second digit is where the real specification decision happens.

## Side-by-Side: IP65 vs IP66 vs IP67 in Detail

| Rating | Test Condition | What It Survives | What It Doesn't |
|---|---|---|---|
| **IP65** | Water jets from 6.3mm nozzle at 30 kPa, 12.5 L/min, 3 min | Rain, garden-hose spray, dust | Heavy rain with wind, salt-spray, flooding |
| **IP66** | Water jets from 12.5mm nozzle at 100 kPa, 100 L/min, 3 min | Heavy rain, storms, salt mist, pressure washer | Sustained submersion, flooding |
| **IP67** | Immersion in 1m water for 30 min | Temporary flooding, monsoon sheet water, occasional submersion | Sustained submersion (that needs IP68) |

The jump from IP65 to IP66 is significant — **flow rate goes from 12.5 L/min to 100 L/min at 3× the pressure.** That is the difference between "rain resistance" and "storm + salt spray resistance."

The jump from IP66 to IP67 is about **orientation**: IP66 assumes water is being sprayed onto a standing enclosure. IP67 assumes the enclosure is submerged. These are fundamentally different failure modes, and the extra cost of IP67 only pays back if you genuinely face flooding risk.

## Matching IP Rating to Installation Environment

This is where most sizing decisions should actually come from — not from "higher is better," not from the inverter manufacturer's maximum spec, but from your specific site conditions:

| Environment | Minimum IP | Notes |
|---|---|---|
| Indoor controlled (data center, electrical room) | IP54 | IP65 is fine; IP66+ is over-spec |
| Temperate dry rooftop | **IP65** | Most residential and C&I rooftops in temperate zones |
| Temperate wet rooftop (Northern Europe, Pacific NW) | IP65 | IP66 if the site gets frequent wind-driven rain |
| Humid tropical rooftop (SEA, Caribbean) | **IP66** | Monsoon + humidity demands higher pressure tolerance |
| Coastal / marine climate (within 10 km of ocean) | **IP66 minimum** | Salt mist destroys IP65 gaskets in 12–18 months |
| Desert / high-dust / sandstorm-prone | IP66 | Dust abrasion affects gasket integrity, not just ingress |
| Ground-mount flood zone | **IP67** | Monsoon-season standing water is real submersion risk |
| Underground or pit-mounted vaults | IP67 | Often mandated by local electrical code |

![PV combiner box IP rating selection by installation environment — matching IP65, IP66, and IP67 to rooftop, coastal, desert, and utility conditions](/images/blog/pv-combiner-box-ip-rating-by-environment.jpg)

## Climate-by-Region Selection Matrix

When you don't have detailed site data, these regional defaults are a safer starting point than "just buy IP67":

| Region | Default IP | Exceptions |
|---|---|---|
| LATAM (inland) | IP65 | Coastal Brazil, Ecuador, Chile: IP66 |
| Southeast Asia | IP66 | Highland/inland dry zones: IP65 |
| MENA (inland) | IP65 | Coastal Gulf states, Red Sea coast: IP66 |
| Sub-Saharan Africa | IP65 | Coastal West/East Africa: IP66 |
| North America | IP65 | Florida Gulf Coast, Caribbean US territories: IP66 |
| Northern Europe | IP65 | UK/Ireland/Netherlands coastal: IP66 |
| Southern Europe (Mediterranean) | IP65 | Islands, direct coastal: IP66 |
| Australia / NZ | IP66 | Accounting for cyclone and coastal exposure |
| India (monsoon zones) | IP66 | Kerala, coastal Gujarat: IP66 |

A 500-unit order specified at IP65 for a project in LATAM (inland) is correct. The same specification for a coastal Brazilian project is a failure waiting 18 months to happen.

## NEMA vs IP: The Cross-Reference Buyers Get Wrong

North American buyers often receive datasheets quoting NEMA ratings while their procurement template asks for IP. These are **not identical test protocols**, and rough cross-references are common sources of error:

| NEMA Rating | Approximate IP Equivalent | Key Difference |
|---|---|---|
| NEMA 3R | ~IP24 | NEMA allows drainage; IP doesn't |
| NEMA 4 | ~IP65/66 | NEMA adds corrosion and icing tests IP lacks |
| NEMA 4X | ~IP66 | X indicates additional corrosion resistance — important for coastal |
| NEMA 6 | ~IP67 | NEMA 6 adds hydrostatic pressure test |
| NEMA 6P | ~IP68 | Prolonged submersion |

**Practical rule**: if your project is in North America and the utility code requires NEMA 4X, don't assume any IP66 box meets it — request explicit NEMA 4X certification from the manufacturer, not just "IP66 equivalent." The corrosion and icing tests in the NEMA 4X protocol are additional requirements.

## Over-Specification: What You're Paying For That You Don't Need

Specifying IP67 on a dry-rooftop residential install is one of the most common over-spec traps. The cost premium comes from real manufacturing differences:

- **Thicker gaskets** (typically 3–5mm EPDM vs 2mm in IP65 units): +$2–$5 per unit
- **Enhanced door sealing mechanism** (double-seal or compression latch): +$5–$10
- **Heavier enclosure body** to maintain rigidity under sealing compression: +$8–$15
- **Additional QC steps** (IP67 requires per-unit submersion test at most factories): +$3–$7
- **Longer lead time** during peak season as IP67 SKUs typically have tighter production capacity

Total: a 1500V IP67 unit commonly runs **15–25% higher than its IP65 counterpart** — for zero incremental lifespan on a dry rooftop. On a 500-unit PO, that's $10,000–$20,000 in unnecessary BOM cost. See our [price guide](/blog/pv-combiner-box-price-guide-2026) for the full cost structure.

## Under-Specification: What Actually Fails

The other direction is just as damaging and shows up slower:

- **IP54 on an outdoor rooftop**: dust enters through gaps between the enclosure body and door within 18–24 months. Internal terminals corrode. Insulation resistance drops. Eventual DC fault.
- **IP65 on a coastal site**: salt-laden mist finds its way through IP65 gaskets designed for freshwater jets. Internal [SPD](/categories/surge-protector-device) and fuse terminals develop a white salt crust. SPDs fail silently. Inverter destroyed in next lightning event.
- **IP65 in a flood zone**: the first monsoon or heavy rainfall event that produces standing water at the enclosure base is game over — the enclosure is not rated for submersion at all. Total loss of the unit and potential wiring damage.

**The key insight**: under-specified failures are almost always invisible for the first year. RMA rates don't spike on Day 90 — they spike at Month 18–24, after the warranty discussion gets awkward and the distributor eats the cost.

## The Hidden Factor: Breather Valves for Condensation

This is the factor most IP selection guides miss, and it's a real field issue in two specific environments: **deserts with large diurnal temperature swings** and **high-altitude installations**.

A perfectly sealed IP67 enclosure is great at keeping water out — but it's equally good at trapping any moisture that enters during enclosure opening for installation or maintenance. That trapped moisture then condenses on cold internal surfaces as temperature cycles, pooling over months.

In a desert site with 40°C day / 5°C night temperature swings, **the internal condensation cycle can produce more standing water on the fuse holder terminals than the rainfall the box was sealed against.**

The fix: **waterproof breather valves** (ventilation glands). These micro-porous membranes:

- Allow internal pressure to equalize as temperature changes (prevents enclosure fatigue)
- Allow water vapor to migrate out
- Block liquid water from entering

![Waterproof breather valve in a PV combiner box — preventing condensation buildup in sealed IP67 enclosures](/images/blog/pv-combiner-box-breather-valve.jpg)

If you're specifying IP67 for a desert, high-altitude, or heavy temperature-cycling environment, breather valves are **not optional — they are part of the spec**. A factory that can't explain why they're included (or worse, doesn't include them) has not designed for the environment.

## How to Specify IP Rating Correctly in an RFQ

"IP65" is not enough. A complete IP-rating RFQ line includes:

- **Target rating** (IP65, IP66, or IP67)
- **Test standard** (IEC 60529 and/or UL 50E for dual-market products)
- **Gasket material** (EPDM for general outdoor; silicone for high-UV; Viton for chemical exposure)
- **Number and size of cable glands** — every gland is a potential IP weak point
- **Unused entry sealing** (threaded plug, not just tape)
- **Breather valve** (include if IP67 + high diurnal swing environment)
- **Hinge and latch type** (compression latch for IP66/67; simple snap is IP65 only)
- **Third-party test report** requirement (for spec-heavy markets)

**Example RFQ line**:
> "IP66 per IEC 60529, EPDM gasket, 12 PG cable glands (2× PG21 output, 10× PG16 input), all unused entries sealed with threaded plugs, compression latch on main door, third-party test report required."

For context on how IP rating interacts with string count and enclosure dimensions, see our [string count sizing guide](/blog/how-to-choose-pv-combiner-box-string-count) — bigger boxes with more glands are harder to keep sealed.

## Why Soltree?

For 15 years we've manufactured PV combiner boxes across IP65, IP66, and IP67 specifications, tested per IEC 60529 and cross-verified against NEMA 4X where North American projects demand it. Gasket material, breather valves, hinge type, and unused-entry sealing are specified line by line — not rolled into a default SKU.

**Not sure which IP rating matches your project environment?** [Contact our engineering team](/contact) with your site location, climate profile, and mounting method, and we'll recommend the protection level that minimizes both over-spec BOM waste and under-spec field failure risk.

## Frequently Asked Questions

### Is IP67 always better than IP65 for a PV combiner box?

No. IP67 is worth the 15–25% cost premium only if your site genuinely faces temporary submersion or flooding — for example ground-mount systems in monsoon zones or underground vaults. On a dry temperate rooftop, IP65 delivers identical 25-year lifespan at significantly lower BOM cost.

### What's the difference between IP65 and IP66 in practice?

IP65 is tested against 12.5 L/min water jets at 30 kPa; IP66 against 100 L/min at 100 kPa — roughly 3× the pressure and 8× the flow rate. IP66 is the correct choice for coastal, tropical, and storm-prone sites. IP65 is sufficient for most temperate rooftops.

### Do I need IP66 or IP67 for coastal solar projects?

IP66 minimum for most coastal installations. IP67 only if the specific site faces standing water risk (beachfront ground-mount, low-lying utility farms). The bigger coastal concern is usually gasket material — specify EPDM or silicone rated for salt mist, not just the IP number.

### What is a breather valve and do I need one?

A breather valve (or ventilation gland) is a micro-porous membrane that equalizes internal pressure and vents trapped moisture while blocking liquid water. You need one in any IP67 enclosure deployed in high diurnal temperature-swing environments (deserts, high altitude) — otherwise trapped moisture condenses internally and pools on terminals.

### How does IP rating relate to NEMA 4X?

IP66 is the closest IP equivalent to NEMA 4X — but NEMA 4X includes additional corrosion and icing tests that IP66 does not require. If a North American project specifies NEMA 4X, always require explicit NEMA 4X certification from the manufacturer, not a generic "IP66 equivalent" claim.

### How can I tell if a supplier's IP65 claim is real?

Request the IEC 60529 test report, not just a self-declared label. Reputable manufacturers will provide third-party lab reports on request. On inspection, verify: continuous gasket seating, threaded plugs on unused entries (never tape), PG cable glands matching the actual cable OD, and compression latches for IP66/67. A supplier who can't provide the test report is selling you an untested label.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-24",
    dateModified: "2026-04-24",
    author: "Jacky",
    image: "/images/blog/ip65-vs-ip66-vs-ip67-pv-combiner-box.jpg",
    tags: ["PV Combiner Box", "IP Rating", "Enclosure Protection", "System Design", "EPC"],
    readingTime: 9,
    metaTitle: "IP65 vs IP66 vs IP67 PV Combiner Box: Which to Choose | Soltree",
    metaDescription: "More IP isn't always better. Match IP65, IP66, or IP67 PV combiner box to your actual climate — without over-spec waste or under-spec field failure.",
    metaKeywords: "ip65 pv combiner box, ip66 combiner box, ip67 combiner box, pv combiner box ip rating, ip rating pv combiner box, ip65 vs ip66, ip66 vs ip67, solar combiner box waterproof, outdoor pv combiner box, weatherproof pv combiner box, nema 4x combiner box",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "pv-combiner-box-certifications-iec-ce-tuv-ul",
    title: "Must-Have Certifications for PV Combiner Boxes: IEC 61439, TÜV, CE, UL Explained",
    excerpt:
      "Wrong certification at the port = 11 days of demurrage and a refused container. This guide explains the six PV combiner box certifications that actually matter for B2B import, which market each unlocks, and how to verify every certificate before you sign the PO.",
    content: `
A 200-unit container of PV combiner boxes sat at a Hamburg customs warehouse for 11 days last year because one scanned TÜV Rheinland certificate's file number didn't match the public Certipedia database. The inspector ran the number, got a "no record found," and the container went into holdback. By the time the supplier's real certificate (issued to a related but different legal entity) was located, the demurrage bill had eaten most of the distributor's project margin.

Certification problems do not show up in a factory audit checklist the way component quality does — they show up at ports, during utility acceptance tests, or years later when an insurance claim is denied. For B2B buyers importing [PV combiner boxes](/categories/pv-combiner-box), certification is pass/fail: a valid cert clears customs in hours, an invalid one blocks the shipment for weeks.

This guide covers the six certifications that actually matter for a PV combiner box, which markets each unlocks, and how to verify every one of them through the correct public database — not through a PDF the supplier emails you.

> 💡 **Need to validate the factory itself?** Pair this with our [PV combiner box manufacturer vetting guide](/blog/how-to-vet-pv-combiner-box-manufacturer) — certification is the paper; factory audit is the reality behind it.

## The 6 Certifications That Matter for PV Combiner Boxes

For a B2B PV combiner box targeted at international markets, these are the six certifications you will actually use — plus why they exist:

- **IEC 61439-2** — The foundational assembly standard. Certifies the entire combiner box, not its components.
- **TÜV (SÜD / Rheinland / Nord)** — German conformity assessment, widely accepted in EU and MEA.
- **CE Marking** — Declaration of compliance with relevant EU directives. The gate into the EU market.
- **UL 1741 / cUL** — North American safety certification for grid-interactive electrical equipment.
- **RoHS** — Restriction of hazardous substances. Mandatory for EU and increasingly required elsewhere.
- **ISO 9001** — Manufacturing quality management system. Not a product cert — but required by most enterprise buyers.

![PV combiner box certifications overview — IEC 61439, TÜV, CE, UL, RoHS, ISO 9001 and their market coverage](/images/blog/pv-combiner-box-certifications-overview.jpg)

Anything less than this set is incomplete for serious B2B export. More than this — adding KEMA, CB scheme, national-market specific certs — is market-dependent, covered in the matrix further down.

## IEC 61439-2: The Foundational Assembly Standard

Of the six, IEC 61439-2 is the one buyers most often misunderstand. It does not certify the SPD, the breaker, or the enclosure individually. It certifies **the entire assembled combiner box as one unit** — and that distinction is why counterfeit or partial certifications almost always trip over it.

### What IEC 61439-2 Actually Tests

- **Temperature rise** under continuous full-load operation
- **Dielectric properties** — insulation integrity at rated voltage
- **Short-circuit withstand strength** — does the assembly survive a fault
- **Protection against electric shock** — touch-safe design verification
- **Clearance and creepage distances** — correct spacing at rated voltages
- **Mechanical operation** of switches and disconnects
- **Degree of protection** (IP rating verification on the assembly)

### The Critical Distinction

A factory that assembles a combiner box from individually certified components does **not** produce an IEC 61439-2 compliant unit — the assembly itself must pass type-testing. This is the #1 reason "certified components" labeled boxes fail at utility acceptance tests.

For utility-scale projects in Europe and most B2B tenders globally, **IEC 61439-2 is non-negotiable.** Always request the full type-test report, not just a summary certificate.

## TÜV: The German Trust Stamp

"TÜV certified" is probably the most misused phrase in the PV export market. The reality:

### TÜV Is Three Different Organizations (Plus Others)

- **TÜV SÜD** — Headquartered in Munich, strong in EU and MENA markets
- **TÜV Rheinland** — Headquartered in Cologne, strong in EU and APAC
- **TÜV Nord** — Headquartered in Essen, strong in EU and specific industry verticals

A single manufacturer can hold certificates from multiple TÜV branches for different product lines. Not a red flag — but the certificate you receive must match the specific product model you are buying.

### How to Verify a TÜV Certificate

Each branch runs its own public verification portal:

- **TÜV Rheinland** → Certipedia (certipedia.com) — search by certificate number
- **TÜV SÜD** → Certificate explorer at tuvsud.com — verify by certificate holder and product
- **TÜV Nord** → Verification at tuev-nord-cert.de — search by certificate number

> ⚠️ **If a supplier provides only a scanned PDF and cannot point you to a public database entry matching the certificate number, treat it as invalid until proven otherwise.** This is the single most common fake-certification scenario in our industry.

## CE Marking: The EU Market Access Gate

CE is required for any PV combiner box sold into the EU. It is also the most commonly misunderstood certification in the B2B PV market.

### What CE Actually Means

CE is not a product certification. It is a **self-declaration** by the manufacturer that the product complies with relevant EU directives (for combiner boxes: Low Voltage Directive 2014/35/EU, EMC Directive 2014/30/EU, RoHS Directive).

For electrical equipment with safety relevance (combiner boxes qualify), the self-declaration must be **supported by type-testing performed at a Notified Body** — an EU-authorized lab. The manufacturer signs the **EU Declaration of Conformity (DoC)** based on that test.

### What You Should Actually Ask For

- **The EU Declaration of Conformity** — signed by a named officer of the manufacturing entity
- **The full test report** — from the Notified Body that performed the testing
- **The Notified Body's identification number** — a 4-digit number that appears alongside the CE mark

A supplier who offers "CE certified" without being able to provide these three documents has not completed the compliance process. The customs inspector at the EU port will ask for exactly these items.

### The "China Export" CE Myth (and the Real Trap)

You may have heard of a fake "China Export" CE mark that differs from Conformité Européenne by letter spacing. Whether that specific version exists in the wild is debated — but what absolutely exists, and what you should fear, is **CE logos applied to products without any underlying compliance process**. The logo is free to print; the compliance is what you're buying.

## UL 1741 / cUL: The North American Requirement

For PV combiner boxes targeted at US, Canada, or Mexico markets:

- **UL 1741** — Safety standard for inverters, converters, controllers, and interconnection equipment
- **UL 1741 SA** — Supplemental requirements for smart/grid-interactive functions
- **cUL** — Canadian UL, required for Canadian market entry

### How to Verify a UL Certificate

UL runs a public product database called **Product iQ** (iq.ulprospector.com):

1. Search by the UL File Number printed on the certificate
2. Verify the file is active, not withdrawn
3. Check that the manufacturer name on the file matches the legal entity issuing your invoice

Utility project acceptance in North America frequently requires proof of UL listing at specific Notice of Compliance dates. A UL certificate that expired last month is functionally useless for a new project.

## RoHS: Hazardous Substances Compliance

RoHS (Restriction of Hazardous Substances) is mandatory for EU and increasingly required in UK, California, and several APAC markets.

- Restricts 10 specific substances (lead, mercury, cadmium, hexavalent chromium, and six others)
- Usually a single-document RoHS declaration signed by the manufacturer
- Frequently required alongside CE for EU customs clearance

Verify that the RoHS declaration references the specific product models you are importing, not a generic "our products comply" statement.

## ISO 9001: Manufacturing System Certification

ISO 9001 certifies the manufacturer's quality management system — not the product itself. Large B2B buyers, EPC firms, and government tenders typically require ISO 9001 as a prerequisite to supplier qualification.

- **Validity**: 3-year cycles with annual surveillance audits
- **What to request**: The current certificate plus the last surveillance audit summary
- **Red flag**: Factory holds ISO 9001 but cannot produce process documents or internal audit records

See our [manufacturer vetting guide](/blog/how-to-vet-pv-combiner-box-manufacturer) for the full factory-audit SOP that pairs with ISO 9001 verification.

## Market-by-Market Certification Matrix

![PV combiner box certification requirements by market — EU, UK, US, Canada, Australia, MENA, LATAM, and SEA compliance matrix](/images/blog/pv-combiner-box-certification-by-market.jpg)

| Market | Required (Minimum) | Typical Additional | Notes |
|---|---|---|---|
| **EU (Germany, France, Italy, etc.)** | CE + IEC 61439-2 + RoHS | TÜV (strongly preferred) | DoC signed by Notified Body required |
| **UK** | UKCA + IEC 61439-2 + RoHS | TÜV | Post-Brexit UKCA replacing CE for UK market |
| **United States** | UL 1741 | NEMA 4X rating for outdoor | State-level utility interconnection rules vary |
| **Canada** | cUL 1741 + CSA | CSA standard applicability varies by province | |
| **Australia / New Zealand** | AS/NZS 4777 + RCM | CE + TÜV commonly accepted | |
| **MENA (Saudi, UAE, Egypt, etc.)** | IEC 61439-2 + CE | SASO for Saudi, G-mark for GCC | Certificate of Conformity often required |
| **LATAM (Brazil, Mexico, Chile)** | INMETRO (BR), NOM (MX), SEC (CL) | IEC 61439-2 + CE as secondary | Country-specific mandatory schemes |
| **SEA (Indonesia, Thailand, Vietnam)** | SNI (Indo), TIS (Thailand), TCVN (Vietnam) | IEC 61439-2 + CE | National compliance on top of IEC |

The #1 mistake we see: buyers stacking CE + TÜV + UL 1741 for a project in Brazil, where INMETRO is the actual mandatory certificate — and the buyer pays for three un-useful certs while missing the one that clears customs.

## The 5 Most Common Certification Traps

**1. Certificate issued to a different company name**
The certificate is valid — but in the name of a sister company, a trading arm, or a former OEM partner. When your PO is signed with a different legal entity, the certificate does not transfer. Customs inspectors catch this in seconds.

**2. "Factory certified" vs "Product certified"**
ISO 9001 certifies a factory's QMS. It does not certify the product for any specific market. A supplier who claims "our factory is certified, so the product is covered" is conflating two entirely different compliance types.

**3. Expired certificates presented as current**
TÜV certificates typically run 3–5 years. A PDF showing "valid until 2023-06-30" is worthless in 2026 — but suppliers routinely send expired certs assuming buyers won't check the date. Always verify the current status in the issuing body's database.

**4. Fake or recycled certificate numbers**
The supplier provides a scanned certificate with a real-looking number, but the number either doesn't exist in the public database or is registered to a different product / different manufacturer. This is fraud and shows up immediately in a proper verification workflow.

**5. Partner-shared certifications**
"We share this certificate with our partner factory." In real compliance terms, this is not allowed — each certificate is tied to a specific manufacturer and product. If a supplier admits to "sharing" certification, walk away.

## How to Verify a Certificate is Real — Step-by-Step

Treat every certificate as unverified until you have checked it against the issuing body's public database. The process takes 5 minutes per certificate:

1. **Receive the certificate** in a scanned PDF from the supplier
2. **Identify the issuing body** — TÜV SÜD, TÜV Rheinland, UL, Notified Body (for CE), etc.
3. **Navigate to the issuing body's public verification portal**:
   - TÜV Rheinland → certipedia.com
   - TÜV SÜD → certificate explorer on tuvsud.com
   - UL → iq.ulprospector.com
   - IEC / CB scheme → iecee.org (CB test certificates)
4. **Search by certificate number** (or file number for UL)
5. **Cross-check three fields**: manufacturer name, product model, validity date
6. **If ANY field doesn't match your PO**, pause the order and request clarification in writing

For the broader 2026 sourcing context — including cost structures that affect how much certification is actually amortized into each unit — see our [price guide](/blog/pv-combiner-box-price-guide-2026) and [complete sourcing guide](/blog/pv-combiner-box-sourcing-china-2026).

## How to Write Certification Requirements into Your RFQ

Vague certification lines produce vague certificates. Lock it down:

- **Specify exactly which certifications are required** (not "standard international certifications")
- **Request certificate numbers at quote stage**, not after PO
- **Require the EU Declaration of Conformity or UL File**, not just the certificate logo
- **Pin the legal entity** — certificates must be issued to the same company named on the invoice
- **Request full test reports** (not just certificate covers) for IEC 61439-2 and UL 1741
- **Confirm validity through public database** before signing the PO

**Example RFQ certification line**:
> "Required certifications: CE + RoHS (with EU Declaration of Conformity signed by company officer), IEC 61439-2 (full type-test report required), TÜV Rheinland (verifiable via Certipedia). All certificates must be issued to the legal entity issuing our invoice. Submit certificate numbers with initial quote."

A factory that responds within 24 hours with certificate numbers you can verify is a serious supplier. One that asks you to "please wait a few days for the paperwork" is buying time to locate (or produce) documentation.

## Why Soltree?

For 15 years we've manufactured PV combiner boxes with full certification stacks scoped to each target market: CE + IEC 61439-2 + RoHS for EU buyers, UL 1741 for North American buyers, AS/NZS compliance for Australia, and market-specific certs (INMETRO, SASO, SNI) where applicable. Every certificate number is provided with the initial quote and verifiable through the issuing body's public database within 5 minutes.

**Ready for a certification-complete quote that clears customs on arrival?** [Contact our engineering team](/contact) with your target market and receive a tailored certification package with verifiable numbers — before you commit to the PO.

## Frequently Asked Questions

### What is the minimum certification I need for a PV combiner box sold in the EU?

CE marking (with EU Declaration of Conformity signed by a company officer), IEC 61439-2 (with full type-test report), and RoHS compliance. TÜV certification is strongly preferred and often required by EU utility tenders, though not a strict regulatory minimum. Without the DoC, CE marking alone will not clear stricter EU customs inspections.

### Is a "CE certified" PDF enough to clear EU customs?

No. A CE logo on the product is the start. You need the underlying EU Declaration of Conformity (signed), the Notified Body's test report, and — if challenged — the technical construction file. Suppliers who only provide a CE logo image without the DoC are not fully compliant.

### How do I verify a TÜV certificate is real?

Each TÜV branch runs a public verification portal. TÜV Rheinland uses Certipedia (certipedia.com), TÜV SÜD has its certificate explorer on tuvsud.com, and TÜV Nord uses its verification database at tuev-nord-cert.de. Search by certificate number and confirm the manufacturer name and product model match your PO.

### What's the difference between IEC 61439-2 and certified components?

IEC 61439-2 certifies the entire assembled combiner box as a single unit through type-testing of the complete assembly. "Certified components" means individual parts (SPD, breaker, terminals) each carry their own certifications — but the assembly as a whole has not been tested or certified. For utility-scale B2B buyers, IEC 61439-2 of the assembly is what matters.

### Do I need UL 1741 for projects outside North America?

Generally no. UL 1741 is scoped to US and Canadian markets (cUL for Canada). Buying UL-certified combiner boxes for a Brazilian or European project is a waste of certification premium. Match certifications to the target market, not to a "maximum safety" stacking strategy.

### How long does a typical PV combiner box certification remain valid?

TÜV certificates typically run 3–5 years with annual surveillance. UL Listings are valid as long as the manufacturer maintains the file and passes periodic factory audits. ISO 9001 runs 3 years. CE and RoHS Declarations of Conformity are valid until the product design or applicable directive changes. Always verify current status, not just the issue date.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-24",
    dateModified: "2026-04-24",
    author: "Jacky",
    image: "/images/blog/pv-combiner-box-certifications-iec-ce-tuv-ul.jpg",
    tags: ["PV Combiner Box", "Certification", "Compliance", "Sourcing", "B2B"],
    readingTime: 10,
    metaTitle: "PV Combiner Box Certifications: IEC, CE, TÜV, UL Guide | Soltree",
    metaDescription: "Wrong cert = 11 days of demurrage. Learn which PV combiner box certifications (IEC 61439, CE, TÜV, UL, RoHS) unlock which markets, and how to verify every one.",
    metaKeywords: "pv combiner box certification, pv combiner box IEC 61439, pv combiner box CE certification, pv combiner box UL 1741, pv combiner box TUV certified, pv combiner box RoHS, solar combiner box compliance, china pv combiner box certification, how to verify pv combiner box certificate, pv combiner box notified body",
    relatedCategorySlug: "pv-combiner-box",
  },

  {
    slug: "din-rail-aerosol-fire-extinguisher-specifications",
    title: "Din Rail Aerosol Fire Extinguisher Specifications: What Buyers Must Check",
    excerpt:
      "The 18 spec parameters every B2B buyer must verify on a din rail aerosol fire extinguisher datasheet, the 7 fraud patterns we see most often, a step-by-step EN 15276 certificate verification process, and a printable inspection checklist for importers, distributors, and EPC procurement teams.",
    content: `
A European distributor in 2024 placed a 5,000-unit order for "EN 15276 certified" din rail aerosol fire extinguishers from a Chinese supplier offering prices 40% below market average. The datasheets looked professional. The certificate scans appeared genuine. Three months later, an independent lab tested 10 random units from the shipment: agent mass was **42% below rated specification**, and the EN 15276 certificate number did not exist on the issuing body's database. Total loss: **€87,000 in unsellable inventory**, plus reputation damage with the distributor's downstream customers.

This category of fraud is targeted specifically at importers who do not know exactly what to verify on a [din rail aerosol fire extinguisher](/categories/aerosol-fire-extinguisher) datasheet. The deception is documentary, not physical, which means it slips past visual inspection and arrives in your warehouse as 5,000 units of unsellable risk.

This guide is the verification playbook every buyer should run before signing a PO:

- 18 critical specification parameters that must appear on any legitimate datasheet
- The 7 fraud patterns we see most often, and how to spot each one
- A datasheet verification checklist usable during sample inspection
- A side-by-side of legitimate vs. suspicious datasheets
- Step-by-step certificate verification through official databases

> **Who this guide is for:** importers, distributors, EPC procurement teams, and OEM integrators specifying [aerosol fire suppression](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) in switchgear, BESS, EV charging, telecom, and data center applications.

## Why Specification Verification Matters

In most product categories, paying 30–40% below market gets you a slightly worse product. In fire suppression, paying 30–40% below market often gets you a product that does not work when it matters. Three risks make spec verification non-negotiable.

### Performance Failure During a Real Fire

An undersized aerosol unit may discharge and appear to work — but fail to suppress the fire. The end user only discovers this when the fire is already destroying the protected equipment.

### Insurance Coverage Voiding

Most commercial fire insurance policies require certified, code-compliant fire suppression. A unit with fake EN 15276 certification voids the insurance claim, even if the underlying installation was correct.

### Distributor Liability Exposure

When end customers discover non-compliant product in their installation, the distributor is the legal party they sue — not the original manufacturer in China. Documentary verification is the distributor's primary legal defense.

## The 18 Specifications Every Datasheet Must Include

A legitimate din rail aerosol fire extinguisher datasheet should always include these 18 parameters. Any missing parameter is a red flag.

![18 critical datasheet specifications for din rail aerosol fire extinguishers — physical mechanical parameters, suppression performance, activation, environmental and discharge characteristics for B2B buyers verifying EN 15276 compliance](/images/blog/din-rail-aerosol-18-spec-parameters.jpg)

### Group A — Physical and Mechanical (5 parameters)

**1. External Dimensions (mm).** Width × Height × Depth in millimeters with tolerances. *Suspicious:* vague dimensions, "standard size", or no tolerances.

**2. Weight (g or kg).** Total unit weight, consistent with stated agent mass plus housing and components. *Suspicious:* total weight inconsistent with rated agent mass.

**3. DIN Rail Compatibility.** Must explicitly state "35 mm DIN rail per EN 60715" or equivalent, plus number of DIN units (1U, 2U, 4U). *Suspicious:* vague "DIN compatible" with no standard reference.

**4. Housing Material.** Specific material spec ("Flame-retardant ABS UL94 V-0", "1.5 mm cold-rolled steel"). *Suspicious:* generic "ABS" or "plastic" with no flame-retardant rating.

**5. IP Rating.** Ingress protection rating (IP20 indoor, IP54+ outdoor). *Suspicious:* missing IP rating, or inflated claims (IP65 is rare on a din rail form factor).

### Group B — Suppression Performance (5 parameters)

**6. Aerosol Agent Mass (g).** The mass of solid aerosol-forming compound — **not** the total unit weight. *Suspicious:* only "total weight" given without breaking out agent mass.

**7. Protection Volume (m³).** Maximum cabinet volume the unit protects, with the design density used to calculate it. *Suspicious:* protection volume given without the design density (for example "protects 0.5 m³" without specifying 100 g/m³ or 130 g/m³).

**8. Design Density (g/m³).** Per [EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010), minimum 100 g/m³ for Class A surface and Class B fires. *Suspicious:* missing design density, or unrealistically low values such as 50 g/m³.

**9. Discharge Time (seconds).** Time from activation to complete agent discharge, typically 5–30 s. *Suspicious:* missing parameter, or unrealistically short claims (<3 s for non-trivial units).

**10. Suppression Time (seconds).** Time from activation to fire extinction per certified test, typically 10–30 s. *Suspicious:* identical to discharge time, or missing entirely.

### Group C — Activation (3 parameters)

**11. Thermal Activation Temperature (°C).** Threshold at which the heat-sensitive trigger activates — standard is 170 °C. *Suspicious:* vague "automatic" with no temperature, or unrealistically low values (<100 °C).

**12. Electrical Activation Voltage (V DC).** Voltage required to trigger via electrical signal — common 6 V, 12 V, 24 V DC. *Suspicious:* missing parameter, which suggests electrical activation is not actually present despite the datasheet claim.

**13. Activation Current (mA / A).** Current draw during activation, important for compatibility with control panels. *Suspicious:* missing — suggests untested integration with fire alarm systems.

### Group D — Environmental (3 parameters)

**14. Operating Temperature Range (°C).** Storage and operational limits — typical −40 °C to +95 °C. *Suspicious:* narrow ranges (0 °C to +50 °C only), suggesting limited cold-climate testing.

**15. Storage Humidity (%RH).** Maximum relative humidity for stored units, typical 95% non-condensing. *Suspicious:* missing — suggests untested humidity tolerance.

**16. Altitude Range (m).** Operational altitude limits, typical −200 m to +3,000 m. Often missing on lower-tier datasheets — not always project-critical, but the omission indicates limited environmental testing.

### Group E — Discharge Characteristics (2 parameters)

**17. Discharge Temperature (°C).** Maximum temperature of discharged aerosol at the unit's exterior, should be <75 °C for human-safe specification. *Suspicious:* missing — suggests no thermal cooling layer.

**18. Aerosol Particle Size (microns).** Mean particle size of generated aerosol; quality units measure around 1 micron mean. Often missing on lower-tier datasheets — legitimate manufacturers measure this.

For dimensioning the protected volume from these parameters, use our [step-by-step sizing calculation guide](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide).

## The 7 Most Common Fraud Patterns

Beyond missing parameters, the deception tactics below appear most often. Recognize any of them on a supplier datasheet, and dig deeper before ordering.

![Seven fraud patterns on din rail aerosol fire extinguisher datasheets — inflated protection volume, cherry-picked certification claims, bundled SKU specs, test report substitution, equivalent-to language, missing discharge temperature, out-of-date references](/images/blog/din-rail-aerosol-7-fraud-patterns.jpg)

### Pattern 1 — Inflated Protection Volume

The supplier claims a 30 g unit protects 0.5 m³. Math check: 30 g ÷ 0.5 m³ = 60 g/m³ design density — 40% below the EN 15276 minimum.

*How to detect.* Always do the division. Agent mass ÷ protection volume = effective design density. If it falls below 100 g/m³, either the agent mass is overstated or the protection volume is overstated.

### Pattern 2 — Cherry-Picked Certification Claims

The datasheet displays a CE logo and "EN 15276" text, but the actual certificate covers a different product variant or has expired.

*How to detect.*

- Request the full PDF certificate, not just a screenshot
- Verify the issuing notified body number on the EU NANDO database
- Confirm the product model number on the certificate matches your SKU exactly
- Check the certificate validity dates

### Pattern 3 — Bundled Specifications Across Different SKUs

The datasheet claims "Operating temp −40 °C to +95 °C" and "Discharge time 6 seconds" — but those parameters come from two different products in the manufacturer's range. The specific SKU you are buying may have neither.

*How to detect.* Demand a datasheet specific to the model number on your PO, not a general product family brochure.

### Pattern 4 — Test Report Substitution

The supplier provides a test report from one batch but ships product from a different batch (potentially different formulation or quality).

*How to detect.*

- Insist on batch traceability — each shipment should reference a specific manufacturing batch
- For large orders, commission sample testing of the actual delivered batch, not pre-shipment samples

### Pattern 5 — "Equivalent To" Certification Language

Datasheets that say "compliant with EN 15276 standards" or "tested to EN 15276 equivalents" are not the same as actual EN 15276 certification by an accredited notified body.

*How to detect.* The certificate must be issued by an accredited notified body (KIWA, TÜV, BSI, IFI, AFNOR). "Compliance" claims without a certificate are marketing language.

### Pattern 6 — Missing Discharge Temperature

Datasheets that omit the discharge temperature parameter often do so because the product lacks an effective cooling layer — meaning the discharged aerosol exits at temperatures that can ignite nearby insulation or burn personnel.

*How to detect.* Insist on this parameter. If the supplier cannot or will not provide it, treat the product as failing safety standards.

### Pattern 7 — Out-of-Date Datasheet References

Datasheets that reference superseded standards (older EN 15276 revisions) or product variants that have been redesigned often indicate the supplier is selling old stock or has not kept their documentation current.

*How to detect.* Check standard version numbers. **EN 15276:2019 + A1:2022** is current as of 2026.

## Legitimate vs. Suspicious Datasheet — Side by Side

The same product information appears very differently on a legitimate datasheet versus a suspicious one. The pattern recognition below is what every buyer should internalize.

| Parameter | Legitimate Datasheet | Suspicious Datasheet |
|---|---|---|
| Model Number | "Soltree DR-Aerosol-30g-T170" (specific SKU with capacity & trigger temp) | "DR-Aerosol Fire Suppressor" (generic) |
| External Dimensions | "53 × 90 × 65 mm (±0.5 mm)" | "Standard DIN size" |
| Agent Mass | "Aerosol-forming compound: 50 g ±2%" | (only total unit weight given) |
| Protection Volume | "0.38 m³ at 130 g/m³ design density per EN 15276" | "Up to 0.8 m³" (no density stated) |
| Discharge Time | "Discharge time: 8 ± 2 s (per EN 15276 §6.4)" | "Fast discharge" |
| Activation | "Thermal: 170 °C ±5 °C glass bulb / Electrical: 24 V DC, 1.5 A peak" | "Auto-activation when fire detected" |
| Operating Temp | "−40 °C to +95 °C continuous, −55 °C to +110 °C 24 h excursion" | "Wide temperature range" |
| Discharge Temperature | "Maximum exterior discharge temperature: 70 °C (per EN 15276 §6.6)" | (parameter missing) |
| Certification | "EN 15276:2019+A1:2022 — Cert. No. 0497-CPR-25-001234, KIWA Belgium NB#0497" | "CE certified to EN 15276" |
| Test Report Reference | "Full test report KIWA-AT-2025-7891 available upon request" | (no test report referenced) |
| Service Life | "10 years from manufacturing date stamped on housing" | "Long service life" |
| Manufacturer Liability | "Manufactured by [registered company + address + business license #]" | "Made in China" |

The pattern: **legitimate datasheets are specific, verifiable, and traceable.** Suspicious datasheets use vague language, missing parameters, and unsupported claims. If you cannot extract specific numbers and verifiable references from a datasheet, the product behind it is not ready for export markets.

## The Datasheet Verification Checklist

Use this checklist during sample inspection or before issuing a PO. Print this section and work through it line by line.

### Section A — Physical Verification (sample in hand)

- Model number on the physical product matches the datasheet exactly
- External dimensions match the datasheet within tolerance
- Total weight matches the datasheet within tolerance
- Housing material visually matches the spec (no obvious substitution)
- DIN rail clip mechanism functions correctly on a 35 mm rail
- Manufacturing date code is present and recent (<6 months)
- Serial number is unique and traceable

### Section B — Datasheet Parameter Verification

- All 18 parameters from the section above are present
- Agent mass is stated separately from total weight
- Design density is explicitly stated (≥100 g/m³)
- Protection volume math is internally consistent (agent mass ÷ density)
- Discharge time and suppression time are both given, and different
- Both thermal AND electrical activation parameters are specified, for dual-trigger products
- Operating temperature range covers your deployment environment
- Discharge temperature is specified and reasonable (<75 °C)

### Section C — Certification Verification

- Certificate is from a named, accredited notified body, not a generic "third-party lab"
- Notified body number is verified on the EU NANDO database
- Certificate model number matches your order SKU exactly
- Certificate validity dates cover your shipment period
- Standard version is current (EN 15276:2019+A1:2022)
- Full test report PDF is provided, not just a certificate scan
- Test report content matches datasheet claims

### Section D — Manufacturer Verification

- Manufacturer is a registered company with a verifiable business license
- Factory address is specific (street + city, not "China")
- Manufacturing scale matches order capacity, avoiding trading companies posing as manufacturers
- Recent factory audit report (SGS, BV, TÜV) available, within 12 months
- Reference customers in your target market are provided

### Section E — Sample Testing (orders > USD 20,000)

- Random sample units sent to an independent lab for verification
- Agent mass measured and matches datasheet within 5%
- Discharge function verified at the rated activation temperature
- Visual inspection for build-quality consistency across samples

> **For orders above USD 50,000**, commission a third-party quality inspection (SGS, AsiaInspection, BV) before container loading. Cost: USD 300–600 per inspection. ROI: prevents shipping defective goods to your warehouse.

## How to Verify EN 15276 Certification — Step by Step

The single highest-leverage verification you can perform is confirming the EN 15276 certificate is real. The procedure:

### Step 1 — Get the Certificate Number and Notified Body Identifier

Every legitimate certificate displays:

- A certificate number (typical format: NNNN-CPR-YY-NNNNNN)
- A notified body 4-digit identifier (0497 for KIWA, 0786 for AFNOR, etc.)

If either is missing, the certificate is invalid.

### Step 2 — Verify the Notified Body Is Real

Open the [EU NANDO database](https://ec.europa.eu/growth/tools-databases/nando) and search the 4-digit notified body number. Confirm:

- The body exists in NANDO
- It is accredited specifically for EN 15276 / fire suppression products
- It is currently active — some bodies have lost accreditation

### Step 3 — Cross-Check with the Notified Body Directly

Most notified bodies (KIWA, BSI, TÜV) maintain their own searchable certificate databases. Search for the certificate number on the issuing body's website. If the certificate does not appear in the issuing body's own database, it is almost certainly fake.

### Step 4 — Request the Full Test Report PDF

A genuine EN 15276 test report is typically 50+ pages and includes:

- Detailed test methodology per the standard
- Photographs of test cabinets and equipment
- Time-stamped test data with temperature curves
- Multiple test runs showing repeatability
- Pass/fail criteria per each clause of the standard

A "certificate" without a test report of this depth is a red flag.

### Step 5 — Verify Manufacturer Identity Match

The certificate names a specific manufacturer and address. Verify this matches:

- The company you are actually buying from
- Their business license documentation
- The factory you have audited (or had audited)

A common fraud is "borrowing" another manufacturer's certificate — the certificate is real, but does not apply to the product you are receiving.

## Special Considerations by Buyer Type

Different buyer profiles need to weight different verification priorities.

### For Distributors (Reselling to Many End Customers)

Liability exposure is highest. Prioritize:

- Comprehensive certification verification (the step-by-step above)
- Annual re-verification — certificates can lapse
- Sample testing on rotating batches: one shipment in five tested independently
- Documentation archive — keep certificates and test reports for 10+ years

### For EPC Contractors (Project-Specific Procurement)

Projects may require submission to authorities or insurers. Prioritize:

- Project-specific certification documentation, often in original signed copies
- Datasheet conformity with project specifications, no substitutions
- Single-source traceability — all units same batch where possible
- Manufacturer's professional liability documentation

### For OEM Integrators (Building Aerosol Into Larger Products)

You will be liable for the entire integrated system. Prioritize:

- Long-term supply commitment — products must remain available for the service life of your equipment
- Specification stability — the manufacturer cannot quietly change specs mid-supply
- ODM agreement clarity, defining who is responsible for what compliance aspects
- Component-level traceability for warranty claims and incident investigation

### For Importers Building Initial Stock

Goal is establishing a solid first import. Prioritize:

- Conservative product selection — proven SKUs, not new releases
- Smaller initial order with full inspection before scaling
- Multiple supplier evaluation — do not commit to a single source on the first import
- Local market certification mapping — some markets require additional approvals

> **Ready to scope a verified order?** Our team returns full datasheets and certificate references within one business day. [Request a verified quotation](/contact) with your SKU requirements, target market, and projected volume.

## Frequently Asked Questions

### Some Chinese suppliers say their products are "EN 15276 ready" or "tested to EN 15276 standards." Is this acceptable?

No. These phrases mean the product does not have actual EN 15276 certification. There is no half-measure — either there is a valid certificate from an accredited notified body, or there is not. Treat "ready" or "equivalent" claims as marketing language.

### How much does third-party verification testing cost?

Independent lab testing of agent mass, discharge function, and basic performance for a din rail aerosol unit runs USD 400–800 per sample at SGS, BV, or TÜV labs in China or Europe. For an order of 1,000+ units, testing 5 random samples is USD 2,000–4,000 — a small fraction of order value, and a worthwhile verification.

### My supplier says they cannot share the full test report due to "confidentiality." Is this legitimate?

No. The test report is the underlying evidence for a public certificate — there is nothing legitimately confidential in it that the certificate does not already publicly state. Refusal to share the test report is a strong indicator that the report does not actually support the certificate claims.

### What if the datasheet says "specifications subject to change without notice"?

The disclaimer is acceptable for minor updates, but for safety-critical products always confirm the specific datasheet version corresponding to your exact PO. Lock spec compliance into the purchase contract.

### How do I verify operational temperature claims?

Request the test report sections covering temperature performance. Legitimate testing per EN 15276 includes specific high-temperature and low-temperature exposure tests. Reports without these sections indicate untested claims.

### Are there any specs that are not critical to verify?

Some marketing parameters (exact aerosol particle size, exact discharge pattern) are nice-to-have but not safety-critical. The 18 parameters above are all safety- or commercial-critical — do not deprioritize any of them.

### How does this verification process apply to small initial orders?

For orders under USD 5,000, full physical lab testing through SGS or TÜV may exceed the order value. The minimum acceptable bar in that case is documentary verification (Sections C and D of the checklist) plus a video discharge test of one sample unit. Scale up to physical lab testing once order volume crosses USD 20,000.

## The Bottom Line for Buyers

The fire suppression product category attracts opportunistic suppliers because the consequences of underperformance only manifest during real fires — events most installed products never face. This creates space for cutting corners that can persist for years before being discovered.

The buyer's defense is straightforward but non-negotiable:

1. Demand all 18 parameters on every datasheet you receive
2. Verify certifications independently through official databases
3. Test samples physically before scaling to full orders
4. Maintain documentation archives for liability protection
5. Build supplier relationships that include audit access and ongoing transparency

The cost of running this verification rigorously is small — a few hundred dollars and a few hours per supplier evaluation. The cost of skipping it can be tens of thousands in unsellable inventory, voided insurance, or — in a real fire event — equipment loss the suppression system was specified to prevent.

For B2B importers, distributors, and EPCs in 2026, specification verification is not paperwork. It is the primary risk control on this product category.

## Source from Suppliers Who Welcome Verification

Soltree provides full transparency on every parameter in this guide:

- **Complete 18-parameter datasheets** with verifiable test data
- **Real EN 15276 certification** from accredited notified bodies, with certificate numbers searchable on the issuing body's database
- **Full test report PDFs** (50+ pages) provided with every quote, not just certificate scans
- **Factory audit access** — schedule a virtual or in-person audit before placing orders
- **Sample testing support** — we send samples to your nominated independent lab and split testing cost on qualifying orders

For procurement teams ready to compare verified specs against current quotes, our pricing reference is in the [2026 price guide](/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026); the broader sourcing framework is in the [China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide). Buyers new to the category can start with the [technical primer on what a din rail aerosol fire extinguisher is](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide); for the certification half of pre-PO verification, see the [CE, UL & EN 15276 deep-dive](/blog/aerosol-fire-extinguisher-certifications-ce-en-15276-ul-ccc); to embed both into a structured pre-PO routine, the [122-point buyer's checklist (2026)](/blog/din-rail-aerosol-fire-extinguisher-buyers-checklist-2026) is the working framework most procurement teams adopt.

View the verified [DIN Rail Thermal Aerosol Fire Extinguishing Device datasheet](/products/din-rail-aerosol-fire-extinguisher) and [request a sample for your project](/contact) — we will return a quote with full certification documentation within one business day.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of fire-suppression and low-voltage protection engineering, with active deliveries to 80+ countries.*
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Jacky",
    image: "/images/blog/din-rail-aerosol-fire-extinguisher-specifications.jpg",
    tags: ["Din Rail Aerosol Fire Extinguisher", "Specifications", "Datasheet Verification", "EN 15276", "B2B Procurement"],
    readingTime: 12,
    metaTitle: "Din Rail Aerosol Fire Extinguisher Specifications: 18-Point Audit | Soltree",
    metaDescription: "The 18 spec parameters every buyer must verify on a din rail aerosol fire extinguisher datasheet — red flags, 7 fraud patterns, and a verification checklist.",
    metaKeywords: "din rail aerosol fire extinguisher specifications, aerosol fire extinguisher datasheet, EN 15276 certification verification, aerosol agent mass design density, fake EN 15276 certificate, china aerosol fire suppressor verification, din rail aerosol datasheet fraud, aerosol fire suppression B2B procurement, NANDO notified body verification, din rail aerosol discharge temperature",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "aerosol-fire-extinguisher-certifications-ce-en-15276-ul-ccc",
    title: "CE, UL, EN 15276 & CCC: Fire Extinguisher Certifications Explained for Importers",
    excerpt:
      "An importer's verification framework for aerosol fire extinguisher certifications — what CE marking actually means, how EN 15276 differs from it, where UL 2775 and CCC fit, 5 documented fraud cases (€1.2M in losses), and the 30-minute verification process every PO should run through.",
    content: `
A Polish import company in 2025 received a 10,000-unit shipment of aerosol fire extinguishers from a Chinese supplier. Every unit carried a CE marking. Every datasheet referenced "[EN 15276](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010) certification." The supplier had provided certificate scans during sourcing.

Six months later, when the importer's largest customer — a German EPC contractor — sent random units for independent verification before installing them at a critical BESS facility, the certificates were fraudulent. The notified body number on the certificate did not exist. The test reports referenced procedures that had not been used since 2018. The "certified manufacturer" name on the certificate did not match the actual factory.

The importer faced three simultaneous losses:

- **€340,000** in unsellable inventory
- Loss of the EPC contract, plus reputation damage with similar customers
- Legal exposure for having distributed non-compliant fire safety products

The entire situation could have been prevented with **30 minutes** of certification verification.

This guide is the verification framework every importer of [aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) needs. It covers:

- What CE marking actually means, and what it does not mean
- EN 15276 in depth — the real certification standard for aerosol fire extinguishers
- UL 2775 and CCC briefly — for North American and Chinese domestic markets
- 5 documented certification fraud patterns, with real case analyses
- A step-by-step 30-minute verification process

> **Who this guide is for:** importers, distributors, EPC procurement teams, and B2B buyers sourcing aerosol fire suppression for any export market in 2026. Pair this with our [datasheet specification verification guide](/blog/din-rail-aerosol-fire-extinguisher-specifications) for the full pre-PO checklist.

## The Critical Distinction: CE Marking vs. EN 15276 Certification

The single most common point of confusion in this market is the difference between CE marking and EN 15276 certification. They are not the same thing — and confusing them is exactly how fraud succeeds.

### CE Marking (CE)

CE marking is a declaration of conformity by the manufacturer that their product complies with relevant EU directives — typically the Construction Products Regulation for fire protection products. It is required for most products sold in the European Economic Area.

For many product categories, CE marking is **self-declared** by the manufacturer. The manufacturer affixes the CE mark and signs a Declaration of Conformity. There is no independent agency verifying the underlying product meets requirements.

For higher-risk products (including most fire suppression products), CE marking requires involvement of a Notified Body that conducts conformity assessment. But this varies by product category and EU directive.

### EN 15276 Certification

EN 15276 is the specific European standard for "Fixed firefighting systems — Condensed aerosol extinguishing systems." Full title: **EN 15276:2019 + A1:2022**.

True EN 15276 certification means:

- An accredited Notified Body has tested the product
- Testing follows the specific procedures defined in the standard
- A formal certificate has been issued with traceable identifiers
- The product appears in the Notified Body's certified products database

A product can have CE marking without proper EN 15276 certification. The CE mark might cover packaging requirements, electrical safety, or other directives — but not the actual fire suppression performance.

### How the Fraud Works

This distinction is exactly what most certification fraud exploits:

1. Manufacturer obtains legitimate CE marking for secondary aspects (low-voltage component certification, packaging compliance, electromagnetic compatibility)
2. Manufacturer displays the CE mark prominently on the product
3. Marketing materials reference "EN 15276" without claiming actual certification
4. Buyers see CE mark + EN 15276 reference and assume both are validated
5. The product has never been tested against EN 15276

For aerosol fire extinguishers, what you need is **EN 15276 certification by an accredited Notified Body**, with the certificate searchable in their database. CE marking alone is insufficient.

## EN 15276 in Depth: What the Standard Actually Tests

Understanding what EN 15276 actually requires helps you recognize legitimate certification documentation.

### Standard Structure

EN 15276 is published in two parts:

- **EN 15276-1:** Requirements and test methods for components
- **EN 15276-2:** Design, installation and maintenance

For product certification, EN 15276-1 is the directly relevant document.

### What EN 15276 Tests

A genuine EN 15276 test program includes four parts.

**Part A — Performance Testing**

- Suppression performance against Class A and B fires at certified design density
- Discharge time measurement
- Aerosol particle characterization
- Coverage uniformity testing
- Multiple test runs for repeatability

**Part B — Environmental Testing**

- Operating temperature range testing (typically −20 °C to +50 °C minimum)
- Storage temperature exposure (−30 °C to +85 °C)
- Vibration testing
- Humidity exposure (95% RH for extended periods)
- Mechanical impact testing

**Part C — Safety Testing**

- Discharge temperature at unit exterior, must be below safety threshold
- Aerosol toxicity at design density, must be safe for personnel
- Activation reliability testing across multiple samples
- Failure mode analysis

**Part D — Marking and Documentation**

- Permanent marking requirements
- Required manufacturer information
- Datasheet content requirements

### What a Real EN 15276 Test Report Looks Like

A genuine EN 15276 test report has identifiable characteristics:

- **Length: typically 50–80 pages**
- Issued by an accredited Notified Body, on their letterhead with signatures
- Detailed methodology section referencing specific clauses of the standard
- Photographs of test setup, equipment, and procedures
- Time-stamped temperature curves and measurement data
- Multiple test runs (minimum 3) showing repeatability
- Statistical analysis of variance
- Pass/fail determination per clause
- Calibration certificates for test equipment
- Test technician signatures and dates

> **Reality check:** if a supplier provides a 2-page "test report" or a one-page "certificate" without an underlying detailed report, the certification is not genuine EN 15276.

## The Notified Bodies: Who Actually Issues Valid Certificates

Only accredited Notified Bodies can issue valid EN 15276 certificates. For aerosol fire extinguishers, the most common legitimate Notified Bodies are:

| Notified Body | NB Number | Country | Specialty |
|---|---|---|---|
| KIWA | 0497 | Belgium / Netherlands | Fire and security products |
| AFNOR Certification | 0786 | France | Building and fire products |
| BSI Group | 0086 | UK (legacy EU-recognized) | Broad scope |
| TÜV Rheinland | 0197 | Germany | Multiple industries |
| TÜV SÜD | 0123 | Germany | Multiple industries |
| IFI / Istituto Giordano | 0407 | Italy | Fire products |
| CNBOP-PIB | 1438 | Poland | Fire safety products |

![EN 15276 notified bodies for aerosol fire extinguisher certification — KIWA NB0497, AFNOR NB0786, BSI NB0086, TÜV Rheinland NB0197, TÜV SÜD NB0123, IFI NB0407, CNBOP-PIB NB1438 with NANDO database verification path](/images/blog/aerosol-fire-extinguisher-notified-bodies-en-15276.jpg)

Verification step: any certificate referencing one of these (or another accredited Notified Body) should be cross-checked on:

**1. EU NANDO database** — [ec.europa.eu/growth/tools-databases/nando](https://ec.europa.eu/growth/tools-databases/nando)

- Search by NB number, confirm the body is accredited for EN 15276 specifically
- Some Notified Bodies have lost accreditation; NANDO is updated

**2. The Notified Body's own database**

- Most NBs maintain searchable certificate databases on their websites
- Search by certificate number, confirm certificate exists and matches claimed product

If a certificate references a "Notified Body" that does not appear in NANDO, the certificate is invalid.

> **Common fraud pattern:** fake certificates often reference real Notified Bodies (using their actual NB numbers) but with fabricated certificate numbers. Always verify on the issuing body's database — not just NANDO.

## UL 2775 (North America) and CCC (China Domestic)

For non-EU markets, different certifications apply.

### UL 2775 (United States)

Full title: **UL 2775 — Standard for Fixed Condensed Aerosol Extinguishing Systems**

Geographic relevance: required for installation in many US jurisdictions, particularly for commercial buildings and industrial facilities under NFPA-based fire codes.

Key facts:

- Issued by Underwriters Laboratories (UL) in the United States
- More stringent than EN 15276 in some areas, particularly toxicity testing
- UL listings are searchable on UL's online database (productiq.ulprospector.com)
- Significantly more expensive to obtain than EN 15276 — typically USD 50K–150K certification cost vs. USD 20K–60K for EN 15276
- Only ~10–15% of Chinese aerosol manufacturers hold genuine UL 2775 listings

For importers selling to US markets, UL listing is typically required. EN 15276 alone is not accepted in most US jurisdictions.

### CCC (China Compulsory Certification)

Geographic relevance: required for products sold in mainland China.

Key facts:

- Issued by Certification and Accreditation Administration of China (CNCA)
- Tests follow GB 25972 (Chinese national standard, similar to EN 15276 in scope)
- Required for products installed in China, but often referenced by manufacturers as "proof of certification" for export markets — this is misleading

For importers outside China, CCC alone is not sufficient for any export market. CCC is a domestic Chinese requirement and provides no validation for EU, UK, US, or other markets. Treat it as a baseline (the manufacturer is legitimate to operate in China) rather than a meaningful export certification.

### Other Markets

For completeness, importers in specific markets should verify:

| Market | Required / Preferred Certifications |
|---|---|
| EU / UK | CE marking + EN 15276 |
| United States | UL 2775 + NFPA compliance |
| Canada | ULC (Canadian UL equivalent) |
| Saudi Arabia | SASO + Civil Defense approval |
| UAE | UAE Civil Defense approval |
| Australia / NZ | AS / NZS standards or EN 15276 acceptance |
| Singapore | SCDF (Singapore Civil Defence Force) approval |
| Marine (global) | DNV, ABS, LR, BV class society approval |

## 5 Real Certification Fraud Cases (And How They Were Detected)

The following are documented patterns from actual import incidents. Names removed; details preserved for educational value.

![Five aerosol fire extinguisher certification fraud cases — fabricated notified body number, valid certificate but wrong product SKU, digitally edited expiry date, test letter mislabeled as certificate, certified factory without certified product](/images/blog/aerosol-fire-extinguisher-5-fraud-cases.jpg)

### Case 1 — The Fabricated Notified Body Number

**Setup:** a Chinese supplier provided certificates referencing "Notified Body 1738 — European Fire Safety Institute." The certificate looked professional and included a serial number, validity dates, and product specifications.

**The Reality:** "European Fire Safety Institute" does not exist. Notified Body 1738 in the NANDO database is a different organization entirely, focused on construction materials, not fire suppression.

**How it was detected:** a junior compliance officer at the Polish importing company decided to verify NB 1738 on NANDO before issuing the next PO. The mismatch was discovered in 5 minutes.

**Lesson:** always verify the NB number AND the issuing organization name on NANDO. Do not trust the name printed on the certificate alone.

### Case 2 — The Real Certificate, Wrong Product

**Setup:** a Spanish distributor received certificates from a Chinese supplier showing a valid EN 15276 certification from KIWA (NB 0497). The certificate number was real and verified on KIWA's database.

**The Reality:** the certificate was valid — for a different product, a 50 g aerosol unit. The supplier was actually shipping a 30 g unit using the same certificate. The 30 g variant had never been tested.

**How it was detected:** the distributor's quality manager noticed the model number on the certificate ("AS-50") did not exactly match the model on the product label ("AS-30"). The supplier explained it as "internal product naming variations." A direct query to KIWA confirmed only the AS-50 was certified.

**Lesson:** match the EXACT model number / SKU on the certificate to the EXACT model on the product. Variations of even one digit invalidate the certification.

### Case 3 — The Expired Certificate, Refreshed Visually

**Setup:** a French EPC contractor was reviewing certificates during a project tender. The CE certificate appeared current with valid dates through 2027.

**The Reality:** the certificate had originally been issued in 2020 with a 2023 expiry. The supplier had digitally edited the expiry date to read 2027. The original was still in KIWA's archives showing the 2023 expiry.

**How it was detected:** the EPC's compliance team requested verification through KIWA directly. KIWA confirmed the certificate had expired in 2023 and a new certificate had not been issued.

**Lesson:** always verify certificate validity directly with the issuing Notified Body — do not rely on the dates printed on supplier-provided documentation.

### Case 4 — The "Certificate" That Wasn't Actually a Certificate

**Setup:** a UAE importer received what appeared to be an EN 15276 certificate. It bore an official-looking logo, certificate number, and product details.

**The Reality:** the document was a "Test Letter" from a small Chinese testing lab — not a Notified Body. The lab had run some tests (unclear which standards) and issued a one-page letter. The supplier called this a "certificate" in marketing materials.

**How it was detected:** the importer's lawyer noticed the document did not reference any specific Notified Body number, did not include the EU CE marking authorization clauses, and the issuing organization could not be found on NANDO.

**Lesson:** a genuine EN 15276 certificate is multi-page, references specific clauses of the standard, includes Notified Body identifiers, and uses formal certification language. "Test letters" or "compliance letters" are not certificates.

### Case 5 — The "Certified Factory" Without a Certified Product

**Setup:** a supplier marketed itself as a "CE certified factory" with multiple certifications visible in their company brochure.

**The Reality:** the certifications were ISO 9001 (quality management), ISO 14001 (environmental), and CE for electrical components they manufactured for other purposes. None of the certifications applied to their aerosol fire extinguisher products specifically.

**How it was detected:** a buyer's compliance officer asked specifically: "Show me the EN 15276 certificate covering THIS specific product model with THIS specific aerosol formulation." The supplier could not produce one.

**Lesson:** "certified factory" is meaningless. Demand product-specific certification covering the exact SKU you are buying.

## The 30-Minute Verification Process

The step-by-step verification process below would have prevented every fraud case above. Total time: 30 minutes.

![30-minute verification process for aerosol fire extinguisher EN 15276 certificates — 5-step framework covering documentation, NANDO database, notified body database, test report depth and manufacturer identity matching](/images/blog/aerosol-fire-extinguisher-30-minute-verification.jpg)

### Step 1 — Collect Documentation (5 minutes)

Request from supplier:

- Full EN 15276 certificate PDF (multi-page)
- Full test report PDF (50+ pages)
- Notified Body identifier and certificate number
- Specific product model number on the certificate

If any of these cannot be provided immediately, that is already a red flag.

### Step 2 — Verify Notified Body on NANDO (5 minutes)

- Open the [EU NANDO database](https://ec.europa.eu/growth/tools-databases/nando)
- Search by Notified Body 4-digit number
- Confirm: the NB exists in NANDO, is accredited for EN 15276 specifically, and is currently active (not suspended)

If any check fails, the certificate is invalid.

### Step 3 — Verify Certificate on Notified Body's Database (10 minutes)

- Open the Notified Body's website (search "[NB name] certificate database")
- Search by certificate number
- Confirm: certificate exists in their database, manufacturer name matches your supplier, product model exactly matches your order SKU, validity dates cover your shipment period

If any check fails, the certificate is invalid for your purpose.

### Step 4 — Verify Test Report Depth (5 minutes)

Open the provided test report PDF. Confirm:

- Length is 50+ pages (genuine reports are detailed)
- References specific EN 15276 clauses
- Contains photographs of testing
- Shows multiple test runs
- Includes Notified Body's official letterhead
- Has technician signatures and dates

If the report is shallow or generic, certification is questionable.

### Step 5 — Cross-Check Manufacturer Identity (5 minutes)

Verify:

- Manufacturer name on certificate matches your supplier's business license
- Factory address on certificate matches actual factory location
- No suspicious differences between certificate manufacturer and the entity invoicing you

If there is a mismatch, the certification does not apply to your shipment.

**Total: 30 minutes** that protect your business. For the time investment of half a meeting, you have eliminated 95%+ of certification fraud risk. There is no rational reason to skip this process for any order, regardless of size or supplier reputation.

> **Need a verified EN 15276 certificate cross-check?** Send us your supplier's certificate number and Notified Body, and our compliance team will return verification in one business day. [Submit your verification request](/contact).

## What to Do If You Discover Fraud

If verification reveals the certification is fraudulent, work through the following sequence.

### Immediate Actions

- **Halt the order** before shipment if still possible
- **Document the discovery** with screenshots of NANDO and Notified Body databases showing the issue
- **Confront the supplier** in writing, requesting genuine certificates within 7 days
- **Notify your insurance broker** about potential exposure on existing inventory

### If Goods Have Already Shipped

- **Quarantine the shipment** — do not distribute to end customers until resolved
- **Engage independent testing** to determine whether the actual product meets EN 15276 standards (it might, even if certification is fraudulent)
- **Consult legal counsel** regarding distributor liability and contract remedies
- **Consider regulatory notification** in your market if products have been distributed

### Long-Term

- **Blacklist the supplier** from future business
- **Add the supplier to industry warning systems** if your association maintains one
- **Review other suppliers** using the same fraud patterns — fraud is rarely isolated

## Frequently Asked Questions

### My supplier says EN 15276 testing is "in process." Should I trust that?

No. A product is either currently certified or it is not. "In process" means uncertified. Do not ship pre-certification — if testing fails, you are left with unsellable inventory.

### What is the difference between EN 15276:2009 (older) and EN 15276:2019+A1:2022?

The 2019 revision with the 2022 amendment is current as of 2026. Certifications under the 2009 version are technically valid until expiry but should not be issued for new products. Certificates referencing only the 2009 version with 2025+ dates are suspicious.

### My supplier provides a "Type Examination Certificate" instead of an EN 15276 certificate. Is this acceptable?

Type Examination Certificates can be valid as part of the CE conformity assessment process. However, they should reference EN 15276 specifically and be issued by an accredited Notified Body. Verify the document on the Notified Body's database the same way as any other certificate.

### How often should I re-verify certifications for an existing supplier?

At minimum: annually, AND any time you receive a shipment with potentially modified packaging, labeling, or product specifications. Certificates expire. Notified Bodies occasionally lose accreditation. Manufacturer ownership changes can invalidate existing certificates.

### My supplier's certificate is real, but lists a different manufacturer name than the one I am buying from. Why?

This often indicates a trading-company relationship — the trading company you are buying from sources from the actual certified manufacturer. This can be legitimate, but you should:

- Confirm in writing that products will come from the certified manufacturer named on the certificate
- Verify batch traceability links shipments to the certified manufacturer
- Understand that you are paying the trading company's markup vs. direct manufacturer purchase

### Are there any "easy" certifications that signal a low-quality supplier?

Several "certifications" are essentially marketing:

- Generic "CE certified" without specific directive references
- "ISO certified" with no specific standard (ISO 9001 is a quality system, not product approval)
- "International certification" without naming the issuing body
- Certificates from labs not on any Notified Body register

Treat these as no certification at all.

### What about products that claim "EU compliance" without specific certification?

"Compliance" is a manufacturer's self-declaration. Without independent third-party certification (Notified Body involvement for EN 15276), it is worth no more than the manufacturer's marketing copy. For aerosol fire extinguishers, third-party certification is required.

## The Bottom Line for Importers

Fire suppression product certifications are the most consequential verification step in this entire procurement process. The cost of rigorous certification verification is minimal — typically 30 minutes per supplier evaluation. The cost of skipping it can be:

- Inventory write-offs in the hundreds of thousands
- Loss of major B2B customers when fraud is detected mid-relationship
- Legal liability under product safety laws in most markets
- Insurance coverage voiding for any incidents involving non-compliant products
- Potential criminal exposure in some jurisdictions for knowingly distributing falsely certified safety products

The five fraud cases above collectively cost the affected importers over **€1.2 million** in losses. Every one would have been prevented by 30 minutes of verification work.

Buyers who get this right in 2026 build verification into every supplier evaluation, every purchase order, and every annual review. They develop relationships only with suppliers who provide genuine documentation proactively and welcome independent confirmation.

For the broader supplier-vetting framework that surrounds certification verification, see our [China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) and [datasheet specification verification guide](/blog/din-rail-aerosol-fire-extinguisher-specifications). To embed certification checks into a structured pre-PO routine, the [122-point buyer's checklist](/blog/din-rail-aerosol-fire-extinguisher-buyers-checklist-2026) is the working framework most procurement teams adopt; for context on how certification cost flows into supplier quotes, see the [2026 price guide](/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026).

## Source from Suppliers Who Stand Behind Their Certifications

Soltree's certification practices are built around the verification framework in this guide:

- **Genuine EN 15276 certification** through an accredited Notified Body — certificate number searchable on the issuing body's database
- **Full test reports** (50+ pages) provided proactively with every quote, not on request
- **Direct verification support** — we connect you with the Notified Body for independent confirmation
- **Certificate alignment** — every shipment matches the exact SKU on our certificate documentation
- **Annual re-verification** — we monitor certificate validity and proactively notify customers of any updates
- **Multi-market certifications** — CE / EN 15276 for EU markets, with documentation packages prepared for Middle East and SEA market certifications

Browse the certified [DIN Rail Thermal Aerosol Fire Extinguishing Device](/products/din-rail-aerosol-fire-extinguisher) product page for current spec sheets, then [request verified certification documentation for your project](/contact) and we will return certificate references, test report extracts, and a cross-verifiable Notified Body contact within one business day.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of fire-suppression and low-voltage protection engineering, with active deliveries to 80+ countries.*
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Jacky",
    image: "/images/blog/aerosol-fire-extinguisher-certifications-ce-en-15276-ul-ccc.jpg",
    tags: ["Aerosol Fire Extinguisher", "EN 15276", "CE Marking", "UL 2775", "Certifications"],
    readingTime: 12,
    metaTitle: "CE, EN 15276, UL 2775 & CCC: Aerosol Extinguisher Certifications | Soltree",
    metaDescription: "Importer guide to aerosol fire extinguisher certifications: CE, EN 15276, UL 2775 & CCC. 5 real fraud cases (€1.2M losses) and a 30-minute verification process.",
    metaKeywords: "aerosol fire extinguisher certifications, EN 15276 certification, CE marking aerosol extinguisher, UL 2775 certification, CCC certification china, EN 15276:2019 A1:2022, NANDO database notified body, KIWA NB0497, AFNOR NB0786, aerosol extinguisher certificate verification, fake CE certificate fraud, china aerosol fire suppressor importer",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

  {
    slug: "din-rail-aerosol-fire-extinguisher-buyers-checklist-2026",
    title: "The Ultimate Buyer's Checklist for Din Rail Aerosol Fire Extinguishers (2026)",
    excerpt:
      "The complete pre-PO checklist for buying din rail aerosol fire extinguishers in 2026. 80+ verification points across product quality, certification, pricing, supplier capability, logistics, after-sales, documentation and risk — the working framework experienced importers and EPC procurement teams use before issuing a PO.",
    content: `
You've identified the product category. You've evaluated suppliers. You're nearly ready to issue a Purchase Order. **Before you do, work through this checklist.**

This is the complete pre-PO verification framework used by experienced importers, distributors, and EPC procurement teams when sourcing [DIN-rail aerosol fire extinguishers](/categories/aerosol-fire-extinguisher). It covers all 8 dimensions of supplier and product evaluation in 2026:

1. **Product Quality** — Is the actual product what's been promised?
2. **Certification & Compliance** — Are the certificates real and current?
3. **Pricing & Commercial Terms** — Are you getting fair value with reasonable risk?
4. **Supplier Capability** — Can this supplier deliver consistently?
5. **Logistics & Shipping** — Will the goods actually arrive intact?
6. **After-Sales Support** — What happens when things go wrong?
7. **Documentation & Records** — Do you have what you need for compliance?
8. **Risk Management** — Have you protected your downside?

Each section provides specific items to verify, the **green flags** indicating a quality supplier, and the **red flags** that should make you pause or walk away.

If you can't answer "yes" to most items in each section, you're not ready to issue the PO. Use this checklist before every order — not just first orders.

> **Who this guide is for:** importers, distributors, EPC procurement teams, and OEM integrators issuing purchase orders for [aerosol fire extinguishers](/categories/aerosol-fire-extinguisher) in any 2026 export market.

## How to Use This Checklist

This article is structured as a working document. We recommend:

📌 **For first-time orders:** Work through every section sequentially. Items you can't verify are gaps to address before placing the PO.

📌 **For repeat orders:** Re-verify Sections 2 (Certification), 3 (Pricing), and 7 (Documentation) at minimum. Certifications expire, prices fluctuate, and documentation should be re-checked annually.

📌 **For multi-supplier evaluations:** Score each supplier against the checklist. The one with the highest pass rate is rarely the cheapest — but is reliably the lowest-risk.

> 💡 **Practical tip:** Bookmark this page. The checklist is designed to be used repeatedly across multiple sourcing decisions.

## ✅ Section 1: Product Quality Verification

The foundation of any procurement decision: is the actual product what you think you're buying?

### Core Quality Checks

- [ ] Sample inspection completed before bulk order (5–10 sample units minimum)
- [ ] Sample model number matches the SKU you're ordering exactly
- [ ] Physical dimensions match datasheet within stated tolerances
- [ ] Total weight matches datasheet within stated tolerances
- [ ] Aerosol agent mass independently verified (lab test or weighing)
- [ ] Housing material visually consistent with spec (no obvious substitution)
- [ ] DIN rail clip mechanism functions correctly on standard 35 mm rail
- [ ] Surface finish, labeling, and printing quality acceptable for your market
- [ ] Manufacturing date code present and recent (< 6 months from inspection)
- [ ] Each unit has a unique, traceable serial number

### Performance Verification

- [ ] Rated activation temperature confirmed via supplier test data
- [ ] Discharge time within stated specification
- [ ] Electrical activation tested at rated voltage (if applicable)
- [ ] Operating temperature range testing documented
- [ ] Status indicator LED functions correctly (if equipped)

### 🟢 Green Flags

- Supplier proactively offers samples for testing
- Sample units arrive with batch documentation
- Manufacturer welcomes third-party lab verification
- Production photos and video available on request

### 🚨 Red Flags

- Supplier resistant to providing samples
- Sample appearance differs from product photos
- Inconsistent quality across the sample batch (suggests poor process control)
- Specifications labeled "subject to change" without notice

> 📚 **Deep-dive:** For the complete 18-parameter datasheet verification framework, see our [datasheet specification verification guide](/blog/din-rail-aerosol-fire-extinguisher-specifications).

## ✅ Section 2: Certification & Compliance Verification

The single most consequential verification. **Fake certifications are the #1 fraud pattern in this category.**

### Certification Documentation

- [ ] Full certificate PDF provided (not just a screenshot or thumbnail)
- [ ] Certificate is from an accredited notified body (KIWA, TÜV, BSI, AFNOR, IFI, etc.)
- [ ] Notified body 4-digit identifier verified on the EU NANDO database
- [ ] Certificate number searchable on the issuing body's own database
- [ ] Product model number on certificate exactly matches your order SKU
- [ ] Certificate validity dates cover your shipment period (minimum 6 months remaining)
- [ ] Standard version is current ([EN 15276:2019 + A1:2022](https://standards.cencenelec.eu/dyn/www/f?p=CEN:110:0::::FSP_PROJECT:42010) as of 2026)
- [ ] Manufacturer name on certificate matches the actual seller

### Test Report Verification

- [ ] Full test report PDF provided (typically 50+ pages)
- [ ] Test report references specific test methods per the standard
- [ ] Test data includes time-stamped curves and photographs
- [ ] Multiple test runs documented (showing repeatability)
- [ ] All clauses of the standard explicitly addressed

### Market-Specific Certifications

- [ ] **EU markets:** CE marking + EN 15276 certificate
- [ ] **UK markets:** UKCA marking
- [ ] **North America:** UL 2775 listing
- [ ] **GCC markets:** SASO or relevant national certification
- [ ] **Your specific country:** local market certification verified
- [ ] **Maritime use:** class society approval (DNV, ABS, LR, BV)

### 🟢 Green Flags

- Certificates are publicly searchable on issuing body databases
- Test reports are detailed (50+ pages) with clear methodology
- Manufacturer maintains an up-to-date certification matrix
- Multiple market certifications held simultaneously

### 🚨 Red Flags

- "Equivalent to" or "compliant with" language instead of actual certification
- Certificates from unrecognized "third-party labs"
- Refusal to share full test report claiming "confidentiality"
- Certificate model numbers don't exactly match the SKU being sold
- Notified body number doesn't appear on official databases

> 📚 **Deep-dive:** For step-by-step certificate verification, see [CE, UL, EN 15276 & CCC: Certifications Explained for Importers](/blog/aerosol-fire-extinguisher-certifications-ce-en-15276-ul-ccc).

## ✅ Section 3: Pricing & Commercial Terms

Fair pricing balanced with reasonable commercial protections.

### Price Benchmarking

- [ ] Quote received in writing on supplier letterhead or formal email
- [ ] Quote includes specific Incoterms (FOB, CIF, DDP, etc.)
- [ ] Quote validity period stated (typically 15–30 days)
- [ ] Volume tiers clearly defined (e.g., 100 / 500 / 1,000 / 5,000+ pcs)
- [ ] Price benchmarked against market range (see industry data)
- [ ] No "too good to be true" pricing (40%+ below market = quality risk)

### Quote Inclusions

- [ ] Standard export packaging included in price
- [ ] Datasheet, MSDS, and certificates included (no extra charge)
- [ ] Loading and origin port handling included
- [ ] Manufacturing lead time clearly stated
- [ ] Sample fee policy clarified (waivable / refundable on bulk order)

### Payment Terms

- [ ] Payment terms acceptable to your finance policy
- [ ] Common acceptable terms: 30% deposit + 70% before shipment / against B/L copy
- [ ] L/C terms acceptable (if used) — typically L/C at sight
- [ ] Bank account details verified through formal channels (not just email)
- [ ] Beneficiary name on bank account matches supplier company name
- [ ] No request for payment to a third-party account (major fraud signal)

### Currency & Exchange Risk

- [ ] Quote currency confirmed (USD, EUR, RMB)
- [ ] Exchange rate risk acceptable for your contract size
- [ ] No mid-contract currency change clauses

### 🟢 Green Flags

- Transparent volume-based pricing tiers
- Detailed quote breakdowns showing what's included
- Standard payment terms (30/70) without unusual conditions
- Bank account in supplier's registered company name

### 🚨 Red Flags

- Pricing significantly below market average
- 100% payment in advance demanded (especially via wire transfer)
- Bank account in personal name or different company name
- Quote validity less than 7 days (high-pressure tactics)
- Vague or missing Incoterms

> 📚 **Deep-dive:** For complete 2026 pricing benchmarks, see [Din Rail Aerosol Fire Extinguisher Price Guide 2026](/blog/din-rail-aerosol-fire-extinguisher-price-guide-2026).

## ✅ Section 4: Supplier Capability Assessment

Beyond product quality, can this supplier consistently deliver over time?

### Company Verification

- [ ] Business license verified (request copy with translation if needed)
- [ ] Company registered for at least 3 years
- [ ] Manufacturing license / production permits valid
- [ ] Tax registration verified (helps confirm legitimate operating company)
- [ ] Company is the actual manufacturer (not a trading company posing as one)
- [ ] Registered address matches factory address (or factory address provided separately)

### Production Capacity

- [ ] Stated monthly production capacity is realistic for your order volume
- [ ] Factory size matches stated capacity (don't trust 50,000-units/month claims from 500 m² workshops)
- [ ] Multiple production lines documented (single-line factories are vulnerable to disruption)
- [ ] Quality control process documented (incoming inspection, in-process, final QC)
- [ ] Production capacity headroom available for your order without disrupting other customers

### Reference Verification

- [ ] At least 2–3 export references provided
- [ ] References include rough volumes and shipment timeframes
- [ ] References include customers in your target market (or similar markets)
- [ ] At least one reference contacted directly (with supplier permission)
- [ ] No "all our customers are confidential" excuses

### Audit Documentation

- [ ] Recent factory audit report available (SGS, BV, TÜV, Intertek)
- [ ] Audit report under 12 months old
- [ ] Audit covers quality systems (ISO 9001 minimum)
- [ ] For larger orders ($50K+): commission your own audit

### Communication Capability

- [ ] Sales contact responsive within 24 hours during business days
- [ ] Technical questions answered correctly (not dodged)
- [ ] Multiple contacts available (avoiding single-person-dependency)
- [ ] English-language documentation quality acceptable

### 🟢 Green Flags

- Genuine factory video tours and live virtual audits offered
- Multiple long-term export references with reorder history
- Clear organizational structure (sales, technical, QC, logistics teams)
- ISO 9001 / ISO 14001 / ISO 45001 certifications maintained

### 🚨 Red Flags

- "Manufacturer" with no physical factory address provided
- Resistance to factory visits or virtual tours
- Reference customers can't be contacted or verified
- Communication only through one personal email/WeChat (no company email)
- Recent change in company name or registration

## ✅ Section 5: Logistics & Shipping Verification

Where many otherwise-good orders run into expensive complications.

### Dangerous Goods Classification

- [ ] Aerosol units' UN classification confirmed (typically UN 3268 Class 9, but varies by formulation)
- [ ] MSDS (Material Safety Data Sheet) provided in correct language(s)
- [ ] Transport classification documented for sea, air, and road as needed
- [ ] DG declaration / DGD prepared for shipment
- [ ] Restrictions to specific transport modes acknowledged (e.g., DG air freight surcharges)

### Packaging Specifications

- [ ] Inner packaging specification confirmed (individual boxes, materials)
- [ ] Outer carton specifications confirmed (size, weight, count per carton)
- [ ] Carton markings include: product name, model, batch, quantity, weight, shipping marks
- [ ] Pallet specifications confirmed (heat-treated wood per ISPM-15 for international shipment)
- [ ] Container loading plan provided (units per 20'/40' container)
- [ ] Special packaging requirements for your market addressed (multi-language labels, etc.)

### Shipping Documentation

- [ ] Commercial invoice template approved before shipment
- [ ] Packing list template approved before shipment
- [ ] Bill of Lading clauses acceptable (especially for L/C transactions)
- [ ] Certificate of Origin available (specify form: GSP, FTA, CO)
- [ ] Phytosanitary certificate (if wooden pallets)
- [ ] Pre-shipment inspection arranged if specified in contract

### Shipping Logistics

- [ ] Origin port confirmed (typically Shanghai, Ningbo, Shenzhen)
- [ ] Estimated transit time to your destination port
- [ ] Freight forwarder selection (yours or supplier-recommended)
- [ ] Insurance coverage in place (minimum 110% of CIF value)
- [ ] Customs clearance plan at destination

### Lead Time & Schedule

- [ ] Production lead time confirmed in writing (typically 25–45 days)
- [ ] Sea freight transit time (Asia-Europe: 30–45 days; Asia-US: 18–30 days)
- [ ] Total order-to-delivery timeline acceptable for your needs
- [ ] Penalty clauses for late delivery acceptable

### 🟢 Green Flags

- Supplier proactively addresses DG shipping requirements
- Standardized export packaging with clear labeling
- Established freight forwarder relationships
- On-time delivery track record from references

### 🚨 Red Flags

- "We've never shipped DG before" or unfamiliarity with UN 3268 procedures
- Missing or vague MSDS
- Air freight pushed when sea freight is more appropriate (rushed timeline = often quality risk)
- Refusal to allow third-party freight forwarder

## ✅ Section 6: After-Sales Support Verification

Often skipped during procurement — frequently regretted later.

### Warranty Terms

- [ ] Warranty period clearly stated (industry standard: 10 years rated service life, 24-month material defect warranty)
- [ ] Warranty coverage scope defined (what's covered, what's not)
- [ ] Warranty claim process documented (how to report, how resolved)
- [ ] Replacement vs. repair policy clear
- [ ] Return shipping responsibility specified

### Product Recall Procedures

- [ ] Manufacturer maintains batch traceability for recall management
- [ ] Recall notification procedures documented
- [ ] Recall liability allocation specified in contract

### Technical Support

- [ ] Technical contact provided (separate from sales)
- [ ] Application engineering support available for end-customer questions
- [ ] Installation guidance documentation in your market language(s)
- [ ] Sizing calculation support available for project-specific applications

### Spare Parts & Replacements

- [ ] Replacement unit availability for the next 5+ years guaranteed
- [ ] Spare components (mounting brackets, thermal cords, electrical harnesses) available
- [ ] Compatible product roadmap (will current SKU still be supported in 5 years?)

### Liability & Insurance

- [ ] Manufacturer carries product liability insurance
- [ ] Liability coverage amount adequate for your market
- [ ] Insurance certificate available on request
- [ ] Indemnification clauses in supply agreement

### 🟢 Green Flags

- 10-year warranty with clear claim process
- Dedicated technical support contact
- Long-term product roadmap shared
- Product liability insurance maintained at $1M+ level

### 🚨 Red Flags

- "Warranty handled case-by-case" (effectively no warranty)
- No technical support beyond sales contact
- No product liability insurance
- Product range churning rapidly (your SKU may be discontinued)

## ✅ Section 7: Documentation & Records

Critical for your own compliance, audits, and any future incidents.

### Per-Shipment Documentation

- [ ] Commercial Invoice
- [ ] Packing List
- [ ] Bill of Lading / Air Waybill
- [ ] Certificate of Origin
- [ ] MSDS (current version)
- [ ] DG Declaration (if applicable)
- [ ] Phytosanitary Certificate (for wooden packaging)
- [ ] Pre-shipment Inspection Report (if commissioned)
- [ ] Test Report for the specific batch

### Long-Term Archive Requirements

- [ ] All certification documents (certificate + test report)
- [ ] Manufacturer's business license
- [ ] Product datasheets (specific version per shipment)
- [ ] Contract / Supply Agreement
- [ ] All amendment letters and side agreements
- [ ] Warranty documentation
- [ ] Insurance certificates
- [ ] Audit reports

### Recommended Archive Period

- **Distributors:** Minimum 10 years from sale to end customer
- **EPC Contractors:** Project lifetime + statutory periods (often 10–15 years)
- **OEM Integrators:** Product service life + 2 years

### 🟢 Green Flags

- Supplier provides organized digital documentation package
- Document version control maintained
- Updates pushed to customers when documentation changes

### 🚨 Red Flags

- Documents requested but never delivered
- Inconsistent or missing batch numbers across documents
- Contract terms different from quote terms
- Verbal agreements not reflected in written documentation

## ✅ Section 8: Risk Management & Contract Protection

The structural protections that limit your downside if things go wrong.

### Contract Provisions

- [ ] Written supply contract (not just PO + acknowledgment)
- [ ] Specifications attached as contract exhibit
- [ ] Quality acceptance criteria specified
- [ ] Defect remedy procedures defined (replacement timeline, costs)
- [ ] Penalty clauses for late delivery
- [ ] Force majeure clauses appropriate for your jurisdiction
- [ ] Dispute resolution mechanism (arbitration body, location, language)
- [ ] Governing law specified

### Intellectual Property Protection

- [ ] Your branding (private label) properly protected
- [ ] No risk of supplier reselling your private-label products to competitors
- [ ] Trademark / design rights addressed in OEM agreements

### Volume Commitment Risk

- [ ] First order sized for trial / verification (not full scale)
- [ ] Volume commitments structured to avoid over-exposure to single supplier
- [ ] Backup supplier identified for critical applications

### Quality Failure Response

- [ ] Plan in place for handling defective shipment (replacement, credit, refund)
- [ ] Sample retention from each batch (for incident investigation)
- [ ] End-customer notification protocol if recall needed

### 🟢 Green Flags

- Comprehensive supply contract with clear remedies
- Supplier accepts reasonable contract amendments
- Industry-standard contract provisions accepted without resistance

### 🚨 Red Flags

- Refusal to sign written supply contract (PO-only relationships)
- Major contract terms only in supplier's home language
- Disputes resolution exclusively in supplier's home jurisdiction without recourse
- "Trust us" responses to risk allocation questions

## 📊 Pre-PO Decision Matrix

Once you've worked through all 8 sections, score the supplier:

| Section | Items Verified ✓ | Total Items | Pass Rate |
|---|---|---|---|
| 1. Product Quality | __ | 16 | __% |
| 2. Certification | __ | 19 | __% |
| 3. Pricing & Commercial | __ | 12 | __% |
| 4. Supplier Capability | __ | 17 | __% |
| 5. Logistics & Shipping | __ | 19 | __% |
| 6. After-Sales Support | __ | 12 | __% |
| 7. Documentation | __ | 14 | __% |
| 8. Risk Management | __ | 13 | __% |
| **TOTAL** | __ | **122** | __% |

### How to Interpret Your Score

- 🟢 **90%+ pass rate:** Strong supplier. Proceed with order. Continue to monitor in subsequent shipments.
- 🟡 **75–89% pass rate:** Acceptable supplier with gaps. Address specific gaps before placing order. Start with smaller order to verify performance.
- 🟠 **60–74% pass rate:** Marginal supplier. Significant risks present. Consider alternatives or restructure deal with major protections (smaller order, escrow, third-party inspection).
- 🔴 **Below 60% pass rate:** Walk away. The unaddressed risks are likely to cost you more than any pricing advantage gained.

> 💡 **Key insight:** No supplier scores 100%. The goal isn't perfection; it's identifying which gaps you can live with and which ones you can't. Risk tolerance varies by order size, product criticality, and your business model.

## How to Apply This Checklist Practically

### For First-Time Imports

- Allocate 10–15 hours to working through this checklist completely
- Don't shortcut Sections 1, 2, and 4 (Quality, Certification, Supplier)
- Consider engaging a sourcing agent if you can't directly verify factory operations

### For Repeat Orders

- Re-verify Sections 2, 3, and 7 every order
- Full re-evaluation annually
- Watch for ownership changes, name changes, or major personnel changes at supplier

### For Multi-Source Strategies

- Run all candidate suppliers through the same checklist
- Score sheets allow apples-to-apples comparison
- Don't default to lowest price; default to best risk-adjusted value

### For Building Your Own Internal SOP

- This checklist can serve as the foundation for your company's procurement SOP for fire suppression products
- Customize sections based on your market and risk tolerance
- Update annually as standards evolve

## ❓ Frequently Asked Questions

### Is this checklist overkill for small orders?

For orders under $5,000, you can streamline Sections 4, 5, and 8. But Sections 1, 2, and 3 (Quality, Certification, Pricing) are critical regardless of order size. The cost of skipping verification doesn't scale linearly with order size — a single fire suppression failure can create liability vastly exceeding the original order value.

### What if a supplier refuses to provide some items on this checklist?

Refusal is information. Generally:

- **Refusing samples or third-party verification** → walk away
- **Refusing certificate copies** → walk away
- **Refusing reference customers** → caution flag, demand more
- **Refusing factory audit** → caution flag, demand alternatives (virtual audit, third-party audit)

### How long should this verification process take?

For first-time supplier evaluation: **3–6 weeks** from initial contact to PO issuance. Compressing this timeline almost always sacrifices verification quality.

### Should I run this checklist before or after I have a supplier shortlist?

Use a simplified version (Sections 1, 2, 4, 6) to create your shortlist. Run the full checklist on your final 1–2 candidates before placing orders.

### My competitor is buying from a supplier without this level of verification. Why should I bother?

Your competitor is taking risks they may not yet have realized. The cost of fraud, defective products, or compliance failures usually emerges 12–24 months after the original purchase — often catastrophically. Disciplined procurement is a competitive advantage that compounds over time.

### What if I find issues mid-procurement?

Address them in writing **before** issuing the PO. Verbal assurances aren't worth the paper they're not printed on. If issues can't be addressed satisfactorily, walking away is always an option — better than discovering the same issues during inspection or after delivery.

## The Bottom Line

The buyers who get this product category right in 2026 aren't the ones with the best industry connections or the largest budgets. They're the ones with **disciplined verification processes applied consistently** across every supplier, every order, every shipment.

This checklist represents that discipline. Use it before every order — not just the first one. Score your suppliers honestly. Address gaps before they become losses. Walk away when scores fall below your acceptable threshold.

The procurement teams who follow this approach end up with:

- Fewer quality incidents
- Lower insurance claims
- Stronger supplier relationships (good suppliers respect rigorous buyers)
- Better margins (because you're not absorbing hidden quality costs)
- Sleep at night, knowing every shipment will perform as promised

In a category where the consequences of failure are measured in fires and lawsuits — not just returns and refunds — this is the only sustainable way to operate.

## Related Reading

This checklist is the BOFU layer of a complete procurement framework. The supporting cluster:

- **Sourcing pillar:** [Complete 2026 China sourcing guide](/blog/din-rail-aerosol-fire-extinguisher-china-sourcing-guide) — the strategic context behind every section above
- **Category foundation:** [What is a din rail aerosol fire extinguisher?](/blog/what-is-din-rail-aerosol-fire-extinguisher-technical-guide) — the technical primer for new category buyers
- **How it works:** [How aerosol fire extinguishers stop electrical-cabinet fires](/blog/how-does-aerosol-fire-extinguisher-work-electrical-cabinets) — suppression mechanism plus three field cases
- **Application context:** [Top 8 applications driving 2026 demand](/blog/top-8-applications-din-rail-aerosol-fire-extinguishers-2026) — vertical-specific market sizing and margin
- **Versus alternatives:** [Aerosol vs FM-200 vs CO₂ vs Novec 1230](/blog/aerosol-vs-fm200-vs-co2-vs-novec-1230-switchgear-fire-suppression) — when each technology is the right answer
- **Sizing methodology:** [Step-by-step sizing calculation guide](/blog/how-to-size-din-rail-aerosol-fire-extinguisher-calculation-guide) — the EN 15276 formula with worked examples

## 🎯 Work With a Supplier Built for This Checklist

Soltree's procurement transparency is built around exactly this verification framework:

- **Section 1 (Quality):** Free samples, third-party testing welcomed, 100% factory inspection
- **Section 2 (Certification):** Genuine EN 15276 certificates, full test reports provided proactively
- **Section 3 (Pricing):** Transparent FOB pricing with detailed quote breakdowns
- **Section 4 (Capability):** Open factory audits (virtual or in-person), reference customers across EU/GCC/SEA
- **Section 5 (Logistics):** Established DG shipping protocols, multi-language documentation
- **Section 6 (After-Sales):** 10-year warranty, dedicated technical support, product liability insurance
- **Section 7 (Documentation):** Complete digital documentation package per shipment
- **Section 8 (Risk):** Standard supply contracts with industry-standard protections

We built our entire export operation to score 100% on this checklist — because we believe that's the only sustainable foundation for long-term B2B relationships.

👉 Browse the [DIN Rail Thermal Aerosol Fire Extinguishing Device product page](/products/din-rail-aerosol-fire-extinguisher) for full specs and certification details, then [start your supplier evaluation with Soltree](/contact) — we'll return a full documentation package, certificate references, and a factory video walkthrough within one business day.

## About the Author

*Written by **Jacky**, Chief Engineer, Soltree — 15 years of fire-suppression and low-voltage protection engineering, with active deliveries to 80+ countries.*
    `,
    date: "2026-04-27",
    dateModified: "2026-04-27",
    author: "Jacky",
    image: "/images/blog/The-Ultimate-Buyer-Checklist-for-Din-Rail-Aerosol-Fire-Extinguishers.jpg",
    tags: ["Aerosol Fire Extinguisher", "Buyer's Checklist", "B2B Procurement", "Supplier Vetting", "Pre-PO Verification"],
    readingTime: 13,
    metaTitle: "Din Rail Aerosol Fire Extinguisher Buyer's Checklist 2026 | Soltree",
    metaDescription: "The complete pre-PO checklist for buying din rail aerosol fire extinguishers in 2026. 122 verification points across product, supplier, pricing, logistics & after-sales.",
    metaKeywords: "aerosol fire extinguisher buyer checklist, din rail aerosol fire extinguisher procurement, supplier vetting fire suppression, pre-PO verification checklist, EN 15276 certificate verification, UN 3268 dangerous goods shipping, aerosol extinguisher MOQ pricing, fire suppression sourcing checklist, B2B importer due diligence, china aerosol fire extinguisher supplier audit",
    relatedCategorySlug: "aerosol-fire-extinguisher",
  },

];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(
    (p) =>
      p.categorySlug === categorySlug ||
      p.additionalCategorySlugs?.includes(categorySlug)
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
