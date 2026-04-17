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


  // PV Combiner Box
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

## The Core Difference in One Sentence

**A DC combiner box consolidates direct-current strings from PV modules before the inverter. An AC combiner box consolidates alternating-current outputs from multiple string inverters before the grid connection or transformer.**

Everything else — component choice, certifications, protection strategy — flows from that one structural fact.

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

Large distributed C&I and utility projects often use **both** in the same design:

1. DC combiner boxes consolidate PV strings → central inverter
2. AC combiner boxes consolidate multiple central/string inverter outputs → transformer

If you're building a 2MW+ project with a mix of inverter types, don't assume one covers both roles. Audit each side of the inverter separately.

## The 3 Most Common Wrong-Type Mistakes

**Mistake 1 — Ordering DC when you needed AC.**
Distributor buys "PV combiner boxes" for a string-inverter rooftop project, receives DC units with PV fuses and 1500V DC switches. None of it is useful on the AC side. Result: 4–6 week re-order delay.

**Mistake 2 — Ordering AC SPD on a DC box (or vice versa).**
A DC-rated SPD will not clear surges properly on AC, and an AC SPD on a DC system is a fire hazard. Always check the SPD's DC/AC label individually — not just the box label.

**Mistake 3 — Using an AC disconnect on the DC side.**
Standard AC MCCBs have no arc-extinguishing design for DC. The arc will not extinguish under load, leading to sustained arcing and potential fire. Always use true **DC load-break switches** on the DC side.

> ⚠️ **Red flag**: If a supplier can't clearly explain why a specific disconnect is DC- or AC-rated, don't buy from them. This is fundamental product knowledge.

## What to Verify Before You Order (Either Type)

Regardless of DC or AC, these specs apply to both:

- Rated voltage and current match your system
- IP rating matches your installation environment
- All internal components carry the same voltage rating as the enclosure label
- Certifications valid in your target market (CE / TÜV / UL / IEC 61439-2)
- Supplier provides a wiring diagram **specific to your PO**, not a generic template

👉 **Full spec verification list**: [PV Combiner Box Buyer's Checklist: 12 Specs You Must Verify](/blog/pv-combiner-box-buyers-checklist)

## Quick Summary

| Question | If Yes → Choose |
|---|---|
| Do you have 4+ PV strings feeding a central or large string inverter? | **DC combiner box** |
| Are you consolidating outputs from multiple string inverters? | **AC combiner box** |
| Is the combiner positioned before the inverter? | **DC** |
| Is the combiner positioned after the inverter? | **AC** |
| Does your project use both central and string inverters at scale? | **Both** |

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

## About the Author

*Written by **Jacky**, Soltree. Reviewed by **Jacky**, Chief Engineer. 15 years of experience in PV combiner box engineering and B2B export, with 200+ delivered projects across rooftop, C&I, and utility-scale applications.*
    `,
    date: "2026-04-15",
    dateModified: "2026-04-15",
    author: "Jacky",
    image: "/images/blog/DC-vs-AC-PV-Combiner-Box.jpg",
    tags: ["PV Combiner Box", "DC vs AC", "System Design", "EPC", "Technical Guide"],
    readingTime: 9,
    metaTitle: "DC vs AC PV Combiner Box: Which Do You Need? (2026) | Soltree",
    metaDescription: "DC vs AC PV combiner box — know the difference, avoid ordering the wrong type, and match the right unit to your solar project's inverter architecture.",
    metaKeywords: "dc combiner box vs ac combiner box, ac combiner box vs dc combiner box, pv combiner box difference, ac recombiner box, dc combiner box applications, ac combiner box applications, choose pv combiner box type",
    relatedCategorySlug: "pv-combiner-box",
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
  return products.filter((p) => p.categorySlug === categorySlug);
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
