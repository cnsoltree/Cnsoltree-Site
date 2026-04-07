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
   * 封面图（必填）— 用于产品列表卡片封面，也作为详情页第一张图
   * 路径示例："/images/products/mcb-1p-c.jpg"
   */
  image: string;
  /**
   * 产品主图集（可选，最多 7 张）— 在详情页顶部以缩略图 + 大图形式展示
   * 不填时详情页仅显示 image 封面图
   * 示例：
   *   images: [
   *     "/images/products/mcb-1p-c-1.jpg",
   *     "/images/products/mcb-1p-c-2.jpg",
   *     "/images/products/mcb-1p-c-3.jpg",
   *   ]
   */
  images?: string[];
  /**
   * 描述区图片（可选）— 显示在产品描述文字下方，支持多张
   * 适合放安装图、应用场景图、接线图等
   * 示例：
   *   descriptionImages: [
   *     "/images/products/mcb-1p-c-wiring.jpg",
   *     "/images/products/mcb-1p-c-application.jpg",
   *   ]
   */
  descriptionImages?: string[];
  badge?: "New" | "Hot" | "Featured";
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  tags: string[];
  readingTime: number;
}

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories: Category[] = [
  {
    slug: "circuit-breaker",
    name: "Circuit Breaker",
    shortDescription: "Reliable overcurrent and short-circuit protection for LV systems.",
    description:
      "Our circuit breakers deliver dependable protection for low-voltage distribution systems across industrial, commercial, and residential applications. Engineered for long service life and compliance with IEC/EN standards.",
    image: "/images/categories/circuit-breaker.jpg",
  },
  {
    slug: "surge-protector-device",
    name: "Surge Protector Device",
    shortDescription: "Transient overvoltage suppression for sensitive equipment.",
    description:
      "Cnsoltree surge protective devices (SPDs) safeguard electrical installations and connected equipment from lightning-induced surges and switching transients, meeting IEC 61643 Type 1/2/3 requirements.",
    image: "/images/categories/surge-protector.jpg",
  },
  {
    slug: "dc-fuse-holder",
    name: "DC Fuse Holder",
    shortDescription: "Safe and compact fuse mounting for DC circuits up to 1500V.",
    description:
      "Designed for photovoltaic and battery storage systems, our DC fuse holders ensure secure fuse mounting with IP-rated protection, touch-safe operation, and compatibility with standard cylindrical fuses.",
    image: "/images/categories/dc-fuse-holder.jpg",
  },
  {
    slug: "over-voltage-protector",
    name: "Over Voltage Protector",
    shortDescription: "Automatic load disconnection against sustained overvoltage.",
    description:
      "Our overvoltage protection relays continuously monitor supply voltage and disconnect loads instantly upon detecting dangerous voltage levels, protecting motors, appliances, and electronic equipment.",
    image: "/images/categories/over-voltage-protector.jpg",
  },
  {
    slug: "power-meter",
    name: "Power Meter",
    shortDescription: "Precision energy measurement for industrial and commercial use.",
    description:
      "Multifunction DIN-rail power meters measure voltage, current, power, energy, power factor, and harmonics. Suitable for energy management, cost allocation, and demand monitoring in smart buildings.",
    image: "/images/categories/power-meter.jpg",
  },
  {
    slug: "wifi-smart-low-voltage-device",
    name: "Wifi Smart Low Voltage Device",
    shortDescription: "IoT-enabled low-voltage devices for smart building control.",
    description:
      "Integrate low-voltage switching and monitoring into your smart building or energy management platform via Wi-Fi. Compatible with popular home automation protocols and cloud dashboards.",
    image: "/images/categories/wifi-smart.jpg",
  },
  {
    slug: "pv-combiner-box",
    name: "PV Combiner Box",
    shortDescription: "String combiner solutions for solar PV arrays.",
    description:
      "Our PV combiner boxes consolidate multiple PV string inputs into a single output, incorporating overcurrent protection, surge protection, and DC disconnection for safe and efficient solar installations.",
    image: "/images/categories/pv-combiner-box.jpg",
  },
  {
    slug: "ats-dual-power-switch",
    name: "ATS Dual Power Switch",
    shortDescription: "Automatic transfer switching for uninterrupted power supply.",
    description:
      "Automatic Transfer Switches (ATS) provide seamless changeover between two independent power sources, ensuring continuous supply to critical loads. Available for single-phase and three-phase systems.",
    image: "/images/categories/ats.jpg",
  },
];

// ─── Products ─────────────────────────────────────────────────────────────────

export const products: Product[] = [
  // Circuit Breaker
  {
    id: "MCB-AC-1P",
    name: "MCB 1P AC 6–63A Circuit breaker",
    slug: "MCB-1P-AC-6–63A-Circuit-breaker",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Single-pole miniature circuit breaker, 6–63A, C-curve, 6kA breaking capacity.",
    description:
      "The MCB 1P 6–63A C-Curve is a compact DIN-rail mounted miniature circuit breaker for overload and short-circuit protection in residential and light commercial wiring systems. IEC 60898-1 compliant with 6kA rated breaking capacity.",
    features: [
      "IEC 60898-1 / EN 60898-1 compliant",
      "Rated breaking capacity: 6kA",
      "Trip curve: C (suitable for resistive and moderate inductive loads)",
      "DIN-rail mounting, 35mm",
      "Operating temperature: -25°C to +55°C",
      "CE, RoHS certified",
    ],
    specs: {
      "Poles": "1P",
      "Rated Current": "6A, 10A, 16A, 20A, 25A, 32A, 40A, 50A, 63A",
      "Rated Voltage": "230V AC",
      "Breaking Capacity": "6kA",
      "Trip Curve": "C",
      "Mechanical Life": "20,000 operations",
      "Electrical Life": "10,000 operations",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, RoHS, IEC 60898-1",
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
  },
  {
    id: "MCB-AC-2P",
    name: "MCB 3P 16–100A D-Curve",
    slug: "mcb-3p-16-100a-d-curve",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Three-pole MCB for motor and transformer protection, D-curve, 10kA.",
    description:
      "The MCB 3P D-Curve is designed for three-phase applications requiring high inrush current tolerance, such as motors and transformers. 10kA breaking capacity ensures reliable protection in industrial environments.",
    features: [
      "3-pole construction for three-phase circuits",
      "D-curve for high inrush loads (motors, transformers)",
      "10kA rated breaking capacity",
      "DIN 35mm rail mounting",
      "Lockable handle for maintenance safety",
    ],
    specs: {
      "Poles": "3P",
      "Rated Current": "16A – 100A",
      "Rated Voltage": "400V AC",
      "Breaking Capacity": "10kA",
      "Trip Curve": "D",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, IEC 60898-1",
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
  },
  {
    id: "MCB-AC-3P",
    name: "RCCB 2P 25–100A 30mA",
    slug: "rccb-2p-25-100a-30ma",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Residual current circuit breaker, 30mA sensitivity, Type A.",
    description:
      "Protects against earth faults and electric shock. 30mA sensitivity provides effective personal protection in bathrooms, kitchens, and outdoor circuits. Type A detects both AC and pulsating DC residual currents.",
    features: [
      "Residual current protection at 30mA",
      "Type A — detects AC and pulsating DC faults",
      "Immune to nuisance tripping from high-frequency currents",
      "Combined with MCB for RCBO function when required",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "25A, 40A, 63A, 100A",
      "Rated Voltage": "230/400V AC",
      "Sensitivity": "30mA / 100mA / 300mA",
      "Type": "A",
      "Certification": "CE, IEC 61008-1",
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
  },
  {
    id: "MCB-AC-4P",
    name: "RCCB 2P 25–100A 30mA",
    slug: "rccb-2p-25-100a-30ma",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Residual current circuit breaker, 30mA sensitivity, Type A.",
    description:
      "Protects against earth faults and electric shock. 30mA sensitivity provides effective personal protection in bathrooms, kitchens, and outdoor circuits. Type A detects both AC and pulsating DC residual currents.",
    features: [
      "Residual current protection at 30mA",
      "Type A — detects AC and pulsating DC faults",
      "Immune to nuisance tripping from high-frequency currents",
      "Combined with MCB for RCBO function when required",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "25A, 40A, 63A, 100A",
      "Rated Voltage": "230/400V AC",
      "Sensitivity": "30mA / 100mA / 300mA",
      "Type": "A",
      "Certification": "CE, IEC 61008-1",
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
  },
  {
    id: "MCB-DC-1P",
    name: "RCCB 2P 25–100A 30mA",
    slug: "rccb-2p-25-100a-30ma",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Residual current circuit breaker, 30mA sensitivity, Type A.",
    description:
      "Protects against earth faults and electric shock. 30mA sensitivity provides effective personal protection in bathrooms, kitchens, and outdoor circuits. Type A detects both AC and pulsating DC residual currents.",
    features: [
      "Residual current protection at 30mA",
      "Type A — detects AC and pulsating DC faults",
      "Immune to nuisance tripping from high-frequency currents",
      "Combined with MCB for RCBO function when required",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "25A, 40A, 63A, 100A",
      "Rated Voltage": "230/400V AC",
      "Sensitivity": "30mA / 100mA / 300mA",
      "Type": "A",
      "Certification": "CE, IEC 61008-1",
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
  },
  {
    id: "MCB-DC-2P",
    name: "RCCB 2P 25–100A 30mA",
    slug: "rccb-2p-25-100a-30ma",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Residual current circuit breaker, 30mA sensitivity, Type A.",
    description:
      "Protects against earth faults and electric shock. 30mA sensitivity provides effective personal protection in bathrooms, kitchens, and outdoor circuits. Type A detects both AC and pulsating DC residual currents.",
    features: [
      "Residual current protection at 30mA",
      "Type A — detects AC and pulsating DC faults",
      "Immune to nuisance tripping from high-frequency currents",
      "Combined with MCB for RCBO function when required",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "25A, 40A, 63A, 100A",
      "Rated Voltage": "230/400V AC",
      "Sensitivity": "30mA / 100mA / 300mA",
      "Type": "A",
      "Certification": "CE, IEC 61008-1",
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
  },
  {
    id: "MCB-DC-3P",
    name: "RCCB 2P 25–100A 30mA",
    slug: "rccb-2p-25-100a-30ma",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Residual current circuit breaker, 30mA sensitivity, Type A.",
    description:
      "Protects against earth faults and electric shock. 30mA sensitivity provides effective personal protection in bathrooms, kitchens, and outdoor circuits. Type A detects both AC and pulsating DC residual currents.",
    features: [
      "Residual current protection at 30mA",
      "Type A — detects AC and pulsating DC faults",
      "Immune to nuisance tripping from high-frequency currents",
      "Combined with MCB for RCBO function when required",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "25A, 40A, 63A, 100A",
      "Rated Voltage": "230/400V AC",
      "Sensitivity": "30mA / 100mA / 300mA",
      "Type": "A",
      "Certification": "CE, IEC 61008-1",
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
  },
  {
    id: "MCB-DC-4P",
    name: "RCCB 2P 25–100A 30mA",
    slug: "rccb-2p-25-100a-30ma",
    categorySlug: "circuit-breaker",
    categoryName: "Circuit Breaker",
    shortDescription: "Residual current circuit breaker, 30mA sensitivity, Type A.",
    description:
      "Protects against earth faults and electric shock. 30mA sensitivity provides effective personal protection in bathrooms, kitchens, and outdoor circuits. Type A detects both AC and pulsating DC residual currents.",
    features: [
      "Residual current protection at 30mA",
      "Type A — detects AC and pulsating DC faults",
      "Immune to nuisance tripping from high-frequency currents",
      "Combined with MCB for RCBO function when required",
    ],
    specs: {
      "Poles": "2P",
      "Rated Current": "25A, 40A, 63A, 100A",
      "Rated Voltage": "230/400V AC",
      "Sensitivity": "30mA / 100mA / 300mA",
      "Type": "A",
      "Certification": "CE, IEC 61008-1",
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
  },
  // Surge Protector Device
  {
    id: "spd-001",
    name: "SPD Type 1+2 T1+T2 75kA",
    slug: "spd-type-1-2-t1-t2-75ka",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "Combined Type 1+2 SPD, 75kA Iimp, for main distribution panels.",
    description:
      "Combined Type 1 and Type 2 SPD provides complete protection from direct lightning strikes and switching transients at the main distribution board. 75kA impulse current capacity.",
    features: [
      "Combined Type 1 + Type 2 in single module",
      "Iimp: 75kA (10/350µs) per phase",
      "Imax: 120kA (8/20µs)",
      "Remote signalling contact for status monitoring",
      "Thermal disconnector + green/red window indicator",
    ],
    specs: {
      "Type": "T1+T2",
      "Iimp": "75kA",
      "Imax": "120kA",
      "In": "20kA",
      "Up": "≤1.5kV",
      "Voltage": "230/400V AC 50/60Hz",
      "Poles": "3P+N",
      "Certification": "CE, IEC 61643-11",
    },
    image: "/images/products/spd-t1t2.jpg",
    badge: "Hot",
  },
  {
    id: "spd-002",
    name: "SPD Type 2 T2 40kA",
    slug: "spd-type-2-t2-40ka",
    categorySlug: "surge-protector-device",
    categoryName: "Surge Protector Device",
    shortDescription: "Type 2 SPD, 40kA Imax, for sub-distribution boards.",
    description:
      "Ideal for installation at sub-distribution panels and the origin of final circuits. Compact DIN-rail design with plug-in replaceable cartridge allows quick maintenance without disconnecting wiring.",
    features: [
      "Plug-in replaceable varistor cartridge",
      "Imax: 40kA per pole",
      "Up ≤1.3kV protection level",
      "Suitable for TT, TN-S, TN-C-S systems",
    ],
    specs: {
      "Type": "T2",
      "Imax": "40kA",
      "In": "20kA",
      "Up": "≤1.3kV",
      "Voltage": "230/400V AC",
      "Poles": "1P, 2P, 3P, 3P+N, 4P",
      "Certification": "CE, IEC 61643-11",
    },
    image: "/images/products/spd-t2.jpg",
  },

  // DC Fuse Holder
  {
    id: "fh-001",
    name: "DC Fuse Holder 1000V 30A",
    slug: "dc-fuse-holder-1000v-30a",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "DIN-rail DC fuse holder, 1000V DC, for 10×38mm cylindrical fuses.",
    description:
      "Designed for photovoltaic string protection, our DC fuse holder accommodates standard 10×38mm cylindrical fuses at up to 1000V DC. Touch-safe fuse replacement and IP20 finger protection.",
    features: [
      "Rated voltage: 1000V DC",
      "Fuse size: 10×38mm",
      "Touch-safe fuse replacement",
      "DIN-rail 35mm mounting",
      "Status indicator window",
    ],
    specs: {
      "Rated Voltage": "1000V DC",
      "Rated Current": "30A",
      "Fuse Size": "10×38mm",
      "Mounting": "DIN-rail 35mm",
      "Protection": "IP20",
      "Certification": "CE, IEC 60269",
    },
    image: "/images/products/dc-fuse-holder-1kv.jpg",
    badge: "New",
  },
  {
    id: "fh-002",
    name: "DC Fuse Holder 1500V 32A",
    slug: "dc-fuse-holder-1500v-32a",
    categorySlug: "dc-fuse-holder",
    categoryName: "DC Fuse Holder",
    shortDescription: "1500V DC fuse holder for utility-scale PV applications.",
    description:
      "Extended voltage rating of 1500V DC makes this fuse holder suitable for large-scale solar installations. Accommodates 14×51mm fuses and features double-pole isolation for safe maintenance.",
    features: [
      "Rated voltage: 1500V DC",
      "Double-pole isolation design",
      "Fuse size: 14×51mm",
      "IP65 rated enclosure available",
    ],
    specs: {
      "Rated Voltage": "1500V DC",
      "Rated Current": "32A",
      "Fuse Size": "14×51mm",
      "Protection": "IP65 (with enclosure)",
      "Certification": "CE, IEC 60269-6",
    },
    image: "/images/products/dc-fuse-holder-1500v.jpg",
  },

  // Over Voltage Protector
  {
    id: "ovp-001",
    name: "OVP Single Phase 230V",
    slug: "ovp-single-phase-230v",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Single-phase overvoltage and undervoltage protection relay.",
    description:
      "Monitors supply voltage and automatically disconnects loads when voltage exceeds preset upper or lower thresholds. Protects household appliances, refrigerators, air conditioners, and electronics from grid voltage fluctuations.",
    features: [
      "Overvoltage and undervoltage protection",
      "Adjustable trip threshold",
      "Auto-reconnect after voltage returns to normal",
      "LED status indicator",
      "DIN-rail or socket mounting",
    ],
    specs: {
      "Rated Voltage": "230V AC",
      "Overvoltage Trip": "Adjustable 240V–270V",
      "Undervoltage Trip": "Adjustable 160V–210V",
      "Response Time": "<0.05s",
      "Max Current": "63A",
      "Certification": "CE, RoHS",
    },
    image: "/images/products/ovp-1p.jpg",
    badge: "Hot",
  },
  {
    id: "ovp-002",
    name: "OVP Three Phase 380V",
    slug: "ovp-three-phase-380v",
    categorySlug: "over-voltage-protector",
    categoryName: "Over Voltage Protector",
    shortDescription: "Three-phase over/under voltage and phase sequence protection relay.",
    description:
      "Three-phase protection relay monitors for overvoltage, undervoltage, phase failure, phase asymmetry, and incorrect phase sequence — essential for motor and industrial equipment protection.",
    features: [
      "Over/undervoltage, phase loss, phase sequence detection",
      "Response time <50ms",
      "Adjustable delay on reconnection",
      "Compact 2-module DIN width",
    ],
    specs: {
      "Rated Voltage": "380V/400V AC 3-phase",
      "Functions": "OV, UV, phase loss, phase sequence",
      "Response Time": "<50ms",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, IEC 60255",
    },
    image: "/images/products/ovp-3p.jpg",
  },

  // Power Meter
  {
    id: "pm-001",
    name: "DIN Rail Energy Meter 3P 100A",
    slug: "din-rail-energy-meter-3p-100a",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "Three-phase multifunction energy meter with RS485 Modbus output.",
    description:
      "Measures active energy (kWh), reactive energy (kVarh), voltage, current, power factor, frequency, and THD. Large LCD display and RS485 Modbus RTU port for SCADA/BMS integration.",
    features: [
      "Measures V, A, W, var, VA, kWh, kVarh, PF, Hz, THD",
      "RS485 Modbus RTU communication",
      "Large backlit LCD display",
      "Class 1 accuracy (IEC 62053-21)",
      "DIN-rail mounting, 4-module width",
    ],
    specs: {
      "Phases": "3P4W / 3P3W",
      "Rated Current": "5(100)A",
      "Accuracy Class": "Class 1",
      "Communication": "RS485 Modbus RTU",
      "Display": "4-line LCD backlit",
      "Power Supply": "85–265V AC",
      "Certification": "CE, MID",
    },
    image: "/images/products/energy-meter-3p.jpg",
    badge: "Featured",
  },
  {
    id: "pm-002",
    name: "Single Phase kWh Meter DIN 100A",
    slug: "single-phase-kwh-meter-din-100a",
    categorySlug: "power-meter",
    categoryName: "Power Meter",
    shortDescription: "Single-phase energy meter, MID certified, for sub-metering.",
    description:
      "Compact DIN-rail single-phase energy meter for tenant sub-metering, office energy monitoring, and EV charging cost allocation. MID certified for legal metrology applications.",
    features: [
      "MID certified for billing applications",
      "Pulse output for remote reading",
      "Anti-tamper design",
      "Back-lit LCD with 7-digit display",
    ],
    specs: {
      "Phases": "1P2W",
      "Rated Current": "5(100)A",
      "Accuracy": "Class 1",
      "Output": "Pulse (1000imp/kWh)",
      "Certification": "CE, MID",
    },
    image: "/images/products/kwh-meter-1p.jpg",
  },

  // Wifi Smart Low Voltage Device
  {
    id: "ws-001",
    name: "WiFi Smart Circuit Breaker 1P 63A",
    slug: "wifi-smart-circuit-breaker-1p-63a",
    categorySlug: "wifi-smart-low-voltage-device",
    categoryName: "Wifi Smart Low Voltage Device",
    shortDescription: "App-controlled MCB with energy monitoring and scheduling.",
    description:
      "Combines the protection functions of an MCB with smart control via Wi-Fi. Remote switching, real-time energy monitoring, overload alerts, and time scheduling through a smartphone app. No hub required.",
    features: [
      "Remote on/off via smartphone app (iOS & Android)",
      "Real-time power consumption monitoring",
      "Overload, short-circuit, and arc-fault protection",
      "Scheduled switching and timer functions",
      "No hub required — direct Wi-Fi 2.4GHz",
      "Compatible with Amazon Alexa and Google Home",
    ],
    specs: {
      "Poles": "1P",
      "Rated Current": "16A, 32A, 63A",
      "Rated Voltage": "230V AC",
      "Connectivity": "Wi-Fi 2.4GHz (802.11 b/g/n)",
      "App": "iOS / Android",
      "Voice Control": "Alexa, Google Home",
      "Certification": "CE, FCC, RoHS",
    },
    image: "/images/products/wifi-smart-mcb.jpg",
    badge: "New",
  },
  {
    id: "ws-002",
    name: "WiFi Smart Energy Meter 3P",
    slug: "wifi-smart-energy-meter-3p",
    categorySlug: "wifi-smart-low-voltage-device",
    categoryName: "Wifi Smart Low Voltage Device",
    shortDescription: "Three-phase smart energy monitor with cloud dashboard and API.",
    description:
      "Provides real-time and historical energy data for three-phase installations via cloud platform. Open API allows integration with BMS, ERP, and custom dashboards. Ideal for commercial buildings and factories.",
    features: [
      "Cloud-based monitoring portal",
      "Open REST API for third-party integration",
      "Per-phase voltage, current, power, and energy",
      "Alarm notifications via email/push",
    ],
    specs: {
      "Phases": "3P4W",
      "Connectivity": "Wi-Fi 2.4GHz",
      "Cloud": "MQTT / REST API",
      "Accuracy": "Class 1",
      "Certification": "CE, FCC",
    },
    image: "/images/products/wifi-energy-3p.jpg",
  },

  // PV Combiner Box
  {
    id: "pv-001",
    name: "PV Combiner Box 4-String 1000V",
    slug: "pv-combiner-box-4-string-1000v",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription: "4-string PV combiner with fuse protection and SPD, 1000V DC.",
    description:
      "Designed for residential and commercial rooftop solar, this 4-string combiner box integrates per-string fuse protection, DC surge protection (Type 2), and a main DC disconnector in a weatherproof IP65 enclosure.",
    features: [
      "4 string inputs, expandable to 8",
      "Per-string 10×38mm fuse holders",
      "DC SPD Type 2 surge protection",
      "Main DC disconnector (load break)",
      "IP65 polycarbonate enclosure",
      "Optional string monitoring available",
    ],
    specs: {
      "String Inputs": "4",
      "Max System Voltage": "1000V DC",
      "Max String Current": "15A per string",
      "SPD": "Type 2, 40kA",
      "Enclosure": "IP65 PC",
      "Operating Temp": "-25°C to +60°C",
      "Certification": "CE, IEC 62548",
    },
    image: "/images/products/pv-combiner-4.jpg",
    badge: "Hot",
  },
  {
    id: "pv-002",
    name: "PV Combiner Box 8-String 1500V",
    slug: "pv-combiner-box-8-string-1500v",
    categorySlug: "pv-combiner-box",
    categoryName: "PV Combiner Box",
    shortDescription: "8-string utility-scale combiner, 1500V DC, with string monitoring.",
    description:
      "For utility-scale ground-mount solar projects requiring 1500V DC systems. Includes integrated string current monitoring with RS485 output for SCADA connectivity, enabling early fault detection.",
    features: [
      "8 string inputs",
      "1500V DC rated system voltage",
      "String current monitoring with RS485 output",
      "DC SPD Type 1+2, 75kA",
      "316L stainless steel enclosure",
    ],
    specs: {
      "String Inputs": "8",
      "Max System Voltage": "1500V DC",
      "Monitoring": "String current, RS485",
      "SPD": "T1+T2, 75kA",
      "Enclosure": "IP66 stainless steel",
      "Certification": "CE, IEC 62548",
    },
    image: "/images/products/pv-combiner-8.jpg",
  },

  // ATS Dual Power Switch
  {
    id: "ats-001",
    name: "ATS 1P 63A 230V Auto Transfer Switch",
    slug: "ats-1p-63a-230v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "Single-phase automatic transfer switch, 63A, <20ms switchover.",
    description:
      "Provides seamless transfer between mains and generator/UPS for single-phase critical loads. Mechanical interlock prevents both sources connecting simultaneously. Switchover time <20ms.",
    features: [
      "Automatic and manual transfer modes",
      "Mechanical interlock — no parallel operation",
      "Switchover time: <20ms",
      "Adjustable voltage/frequency detection thresholds",
      "Generator start signal output",
      "DIN-rail mounting",
    ],
    specs: {
      "Poles": "1P",
      "Rated Current": "63A",
      "Rated Voltage": "230V AC",
      "Switchover Time": "<20ms",
      "Mounting": "DIN-rail 35mm",
      "Certification": "CE, IEC 60947-6-1",
    },
    image: "/images/products/ats-1p.jpg",
    badge: "Featured",
  },
  {
    id: "ats-002",
    name: "ATS 3P 250A 400V Auto Transfer Switch",
    slug: "ats-3p-250a-400v",
    categorySlug: "ats-dual-power-switch",
    categoryName: "ATS Dual Power Switch",
    shortDescription: "Three-phase 250A ATS for data centres, hospitals, and industry.",
    description:
      "Heavy-duty three-phase ATS for mission-critical facilities. Includes open/closed transition modes, sync-check relay, remote monitoring via RS485, and complete event logging.",
    features: [
      "Three-phase 250A capacity",
      "Open and closed transition switching",
      "RS485 Modbus remote monitoring",
      "Event log with 1000 records",
      "Sync-check for parallel generator applications",
    ],
    specs: {
      "Poles": "3P",
      "Rated Current": "250A",
      "Rated Voltage": "400V AC 3-phase",
      "Switchover Time": "<100ms (open transition)",
      "Communication": "RS485 Modbus",
      "Certification": "CE, IEC 60947-6-1",
    },
    image: "/images/products/ats-3p.jpg",
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-circuit-breaker-for-solar-pv",
    title: "How to Choose the Right Circuit Breaker for Solar PV Systems",
    excerpt:
      "Selecting the correct circuit breaker for photovoltaic applications requires understanding DC vs AC ratings, string currents, and IEC 60947 requirements. This guide walks through the key selection criteria.",
    content: `
## Introduction

Photovoltaic systems introduce unique electrical protection challenges compared to conventional AC installations. DC arc faults are harder to extinguish than AC faults, and string currents can be superimposed in unexpected ways.

## Key Selection Criteria

### 1. DC Voltage Rating
PV systems may operate at 1000V DC or 1500V DC. Always select breakers rated at or above the maximum open-circuit system voltage (Voc at lowest temperature).

### 2. DC Current Rating
The breaker must handle the maximum short-circuit current (Isc) of all paralleled strings. Apply a safety factor of 1.25 as per IEC 62548.

### 3. Breaking Capacity
DC arc energy is higher than equivalent AC. Ensure the breaker's DC breaking capacity exceeds the prospective fault current at the installation point.

### 4. Trip Curve
For solar string protection, B-curve or dedicated PV fuses are typically preferred to avoid nuisance tripping from morning ramp-up currents.

## Conclusion

Always consult product datasheets and IEC 62548 / IEC 60364-7-712 when designing protection for PV systems. Cnsoltree application engineers are available to assist with system-specific selection.
    `,
    date: "2024-11-15",
    author: "Cnsoltree Engineering Team",
    image: "/images/blog/solar-circuit-breaker.jpg",
    tags: ["Circuit Breaker", "Solar PV", "Selection Guide"],
    readingTime: 5,
  },
  {
    slug: "spd-installation-best-practices",
    title: "SPD Installation Best Practices for IEC 61643 Compliance",
    excerpt:
      "Incorrect SPD installation can render surge protection ineffective. Learn the critical wiring rules, lead length limits, and coordination requirements for IEC 61643-compliant installations.",
    content: `
## Why Installation Details Matter

A Type 2 SPD rated at 40kA provides no protection if its connecting leads are too long or routed incorrectly. The voltage protection level (Up) rises with lead inductance, potentially exceeding equipment withstand levels.

## Connection Lead Length

IEC 61643-12 recommends the total lead length (live connection + earth connection) from the SPD to the busbar should be ≤0.5m. Where this cannot be achieved, a v-shaped connection shortens the effective loop.

## Coordination Between SPD Types

Type 1 SPDs handle direct lightning discharge currents. Type 2 limits residual surges. The separation distance and any decoupling inductance must be matched to manufacturer recommendations to prevent back-current through the Type 2 device.

## Earth Connection

Bond the SPD earth terminal directly to the main earthing busbar using minimum 4mm² copper conductor. Avoid daisy-chaining earth connections between SPDs.

## Conclusion

Follow IEC 61643-12 guidance and Cnsoltree installation manuals closely. Our technical support team can review single-line diagrams prior to installation.
    `,
    date: "2024-10-08",
    author: "Cnsoltree Engineering Team",
    image: "/images/blog/spd-installation.jpg",
    tags: ["SPD", "Installation", "IEC 61643"],
    readingTime: 6,
  },
  {
    slug: "ats-selection-guide-generators-ups",
    title: "ATS Selection Guide: Generators vs UPS Systems",
    excerpt:
      "Automatic Transfer Switches must be matched to the characteristics of both the primary supply and the standby source. Generator-backed systems have different requirements from UPS-backed systems.",
    content: `
## Generator-Backed ATS

When the standby source is a diesel generator, transfer time requirements are typically 10–30 seconds (generator start and stabilise). An open-transition ATS with voltage and frequency sensing is standard.

Key requirements:
- Generator start signal relay output
- Voltage window and frequency check before transfer to standby
- Retransfer delay on mains restoration to allow generator cool-down

## UPS-Backed ATS

For UPS standby, the transfer must complete within the UPS hold-up time (typically 10–20ms). A fast static transfer switch or closed-transition ATS is required.

Key requirements:
- Sync-check relay to verify phase alignment before closed transition
- <20ms switchover
- No blackout period for sensitive loads

## Three-Phase Considerations

Unbalanced loading and phase-sequence monitoring become critical in three-phase ATS applications. Choose ATS models with per-phase voltage sensing and phase-failure detection.

## Conclusion

Consult Cnsoltree's ATS selection tables or contact our sales team with your load details and generator/UPS specifications for a tailored recommendation.
    `,
    date: "2024-09-22",
    author: "Cnsoltree Engineering Team",
    image: "/images/blog/ats-guide.jpg",
    tags: ["ATS", "Generator", "UPS", "Selection Guide"],
    readingTime: 7,
  },
  {
    slug: "dc-fuse-sizing-pv-string-protection",
    title: "DC Fuse Sizing for PV String Protection: A Practical Guide",
    excerpt:
      "String fuses protect PV modules from reverse currents that can cause fire. Correct sizing requires knowing module Isc, parallel string count, and cable ampacity.",
    content: `
## Why String Fuses are Needed

When three or more strings are connected in parallel, a shaded or faulty string may receive reverse current from healthy strings. If this reverse current exceeds the module's reverse current rating, thermal damage or fire can result.

## Sizing Method (IEC 60269 / IEC 62548)

1. Calculate maximum reverse current: Irev = (n-1) × Isc_module × 1.25
2. Fuse rated current: In ≥ 1.5 × Isc_module and In ≤ Imod_maxreverse
3. Fuse voltage rating ≥ 1.2 × Voc_max (system voltage)

## Fuse Selection Example

- Module Isc: 10A, Voc: 48V
- 4 parallel strings
- Required fuse In: ≥ 15A, ≤ 15A (module max reverse = 15A)
- System voltage: 1000V DC → use 1000V DC rated fuse

## Cnsoltree Products

Our DC Fuse Holders are available in 1000V and 1500V ratings with appropriate cylindrical fuse cartridges. Contact us for project-specific fuse selection support.
    `,
    date: "2024-08-14",
    author: "Cnsoltree Engineering Team",
    image: "/images/blog/dc-fuse-sizing.jpg",
    tags: ["DC Fuse", "Solar PV", "String Protection"],
    readingTime: 5,
  },
  {
    slug: "smart-energy-monitoring-iiot-factory",
    title: "Smart Energy Monitoring for IIoT-Connected Factories",
    excerpt:
      "Industrial IoT platforms are transforming energy management. Learn how Cnsoltree WiFi smart devices integrate with popular SCADA, MQTT brokers, and cloud dashboards.",
    content: `
## The IIoT Opportunity

Manufacturing plants that deploy real-time energy monitoring typically reduce consumption by 10–15% within the first year by identifying waste, peak demand charges, and inefficient equipment schedules.

## Architecture Overview

A typical deployment consists of:
1. WiFi Smart Energy Meters at feeder and sub-feeder level
2. Local MQTT broker (e.g., Mosquitto) for edge aggregation
3. Cloud platform (AWS IoT, Azure IoT Hub, or on-premises) for data storage and analytics
4. Dashboard (Grafana, Power BI, or custom) for visualisation

## Cnsoltree WiFi Devices

Our WiFi Smart Energy Meter 3P supports MQTT and REST API out of the box. Configuration is performed via the mobile app or web portal. Data topics follow a standard schema compatible with Home Assistant, Node-RED, and major industrial IoT platforms.

## Security Considerations

Deploy devices on isolated VLANs. Use TLS for MQTT and HTTPS for REST API. Change default credentials on initial setup.

## Conclusion

Cnsoltree provides detailed API documentation and sample integration scripts for popular platforms. Contact our IoT team for a proof-of-concept deployment plan.
    `,
    date: "2024-07-30",
    author: "Cnsoltree Engineering Team",
    image: "/images/blog/smart-energy-iiot.jpg",
    tags: ["Smart Device", "IIoT", "Energy Management"],
    readingTime: 6,
  },
  {
    slug: "overvoltage-protection-appliances-residential",
    title: "Protecting Home Appliances from Grid Overvoltage Events",
    excerpt:
      "Utility overvoltage events can permanently damage refrigerators, air conditioners, and electronics. An overvoltage protection relay at the distribution board provides cost-effective whole-home protection.",
    content: `
## Common Causes of Residential Overvoltage

- Neutral conductor failure in TN-C systems (resulting in full line voltage on one phase)
- Utility switching transients during network reconfiguration
- Nearby lightning strikes without adequate SPD protection
- Generator overspeed during manual changeover

## Consequences

A sustained overvoltage of only 10% above rated voltage significantly shortens the life of motor windings and electronic components. A neutral failure can apply 380V to equipment rated for 230V — catastrophic within seconds.

## How an OVP Relay Protects

The relay continuously compares the measured supply voltage to programmable thresholds. When the voltage exceeds the upper threshold (typically set at 253–270V), the relay opens its output contactor, disconnecting all connected loads within 50ms. Once voltage returns to normal and a time delay expires, the relay re-energises the contactor.

## Installation

Install the OVP relay at the main distribution board, ahead of all circuit breakers. A 63A model covers typical residential and small commercial loads.

## Cnsoltree OVP Range

Available in single-phase (230V) and three-phase (380V/400V) versions, with adjustable thresholds and time delays.
    `,
    date: "2024-06-18",
    author: "Cnsoltree Engineering Team",
    image: "/images/blog/overvoltage-residential.jpg",
    tags: ["Over Voltage Protector", "Residential", "Protection"],
    readingTime: 5,
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
