import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import AerosolTestimonials from "@/components/AerosolTestimonials";
import AerosolFAQ from "@/components/AerosolFAQ";

export const metadata: Metadata = {
  title: "Aerosol Fire Extinguisher Manufacturer & OEM Supplier | Soltree",
  description:
    "Soltree manufactures DIN rail thermal aerosol fire extinguishers for electrical cabinets, PV combiner boxes & industrial enclosures. ISO certified, 15+ years experience, OEM/ODM available. Request a quote today.",
  keywords:
    "aerosol fire extinguisher manufacturer, electrical cabinet fire suppression, DIN rail fire sticker, OEM aerosol fire extinguisher, PV combiner box fire protection, thermal aerosol suppression supplier",
  openGraph: {
    title: "Aerosol Fire Extinguisher Manufacturer & OEM Supplier | Soltree",
    description:
      "ISO-certified manufacturer of thermal aerosol fire extinguishers. Passive activation, maintenance-free, 10-year service life. OEM/ODM welcome.",
    images: [{ url: "/images/products/Aerosol-Fire-Extinguishing-Sticker-1.jpg" }],
  },
};

const TRUST_STATS = [
  { value: "15+", label: "Years Manufacturing" },
  { value: "80+", label: "Countries Served" },
  { value: "500+", label: "Product Models" },
  { value: "ISO", label: "9001 Certified" },
];

const PRODUCTS = [
  {
    name: "QRR-0.01G-2/10RLK",
    image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-1.jpg",
    specs: [
      "Model: QRR-0.01G (-2/10 R LT)",
      "Dosage: 10g / 20g",
      "Volume: Protects ≤0.4m³ to ≤0.8m³",
      "Size: Ultra-compact (84.5 × 18 × 60mm)",
      "Mounting: DIN Rail / 3M Magnetic",
    ],
  },
  {
    name: "Wireless Aerosol Fire Suppression Device",
    image: "/images/products/Wireless-Aerosol-Fire-Suppression-Device.jpg",
    specs: [
      "Installation: DIN Rail (Controller)",
      "Extinguisher: External Magnetic Mount",
      "Coverage: Multi-Zone Capable",
      "Cable Length: Customizable",
      "Alarm: Sound & Light (Integrated)",
      "Safety: Fire Feedback Signal",
    ],
  },
  {
    name: "Wireless Aerosol Fire Suppression Device RS485",
    image: "/images/products/Wireless-Gas-Automatic-Gire-Supression-Device-RS485.jpg",
    specs: [
      "Comm Protocol: RS485 (Modbus RTU)",
      "Protection Vol: 0.5m³ to 3.0m³",
      "Trigger Mode: Thermal / Smoke / Remote",
      "Power Supply: AC220V ±20%",
      "Backup Power: ≥ 10 Seconds",
      "Operating Temp: -40°C ~ +70°C",
    ],
  },
  {
    name: "Wireless Aerosol Fire Suppression Device 4G Type",
    image: "/images/products/Wireless-Gas-Automatic-Gire-Supression-Device-4G-Type.jpg",
    specs: [
      "Network: 4G LTE + RS485",
      "Remote Features: App Status / SMS Alerts",
      "Firmware: Remote OTA Upgrade",
      "Sensors: Smoke + Temperature",
      "Location: Built-in GPS/Base Station",
      "Maintenance: Auto-Self Check",
    ],
  },
];

export default function AerosolSolutionPage() {
  return (
    <main>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-900 py-20 sm:py-28">
        <Image
          src="/images/hero-bg.jpg"
          alt="Aerosol fire extinguisher manufacturing facility"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="container relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            {/* Left: text */}
            <div className="flex-1 max-w-xl">
              <p className="section-eyebrow text-green-400">Manufacturer &amp; OEM Supplier</p>
              <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
                Aerosol Fire Extinguisher Solutions
              </h1>
              <p className="mt-5 text-lg text-gray-300">
                Passive thermal aerosol fire suppression for electrical cabinets, PV combiner boxes
                and industrial enclosures. No power, no wiring, no maintenance — just reliable
                protection from a factory with 15+ years of expertise.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact-form" className="btn-primary-lg">
                  Get a Free Quote
                </a>
              </div>
            </div>

            {/* Right: hero product image */}
            <div className="w-full lg:w-[420px] xl:w-[500px] shrink-0">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl" style={{ height: "280px" }}>
                <Image
                  src="/images/products/Aerosol-Fire-Extinguisher-Solutions.jpg"
                  alt="Aerosol fire extinguisher for electrical cabinet"
                  fill
                  className="object-cover brightness-75"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-8">
        <div className="container">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl font-bold text-green-700">{s.value}</dt>
                <dd className="mt-1 text-sm text-gray-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow text-center">Product Range</p>
          <h2 className="section-heading text-center">Aerosol Fire Extinguisher Products</h2>
          <div className="mx-auto mt-3 h-0.5 w-12 rounded bg-green-600" />

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-white">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-sm font-semibold leading-snug text-gray-900">{p.name}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {p.specs.map((spec) => (
                      <li key={spec} className="flex items-start gap-2 text-xs text-gray-600">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <a href="#contact-form" className="btn-primary w-full justify-center text-sm py-2">
                      Get Quote
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Inside Soltree Technology ─────────────────────────────────── */}
      <section className="section bg-gray-800">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow text-green-400">Product Technology</p>
            <h2 className="section-heading text-white">Inside Soltree Technology</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-300">
              Engineered for reliability. See what makes the industry standard for miniature fire suppression.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: feature list */}
            <ul className="space-y-6">
              {[
                {
                  title: "Aerosol Generator Compound (Solid State)",
                  desc: "A stable solid mixture of oxidizer and reducing agent. Converts to fire-suppressing gas only upon activation. Non-pressurized.",
                },
                {
                  title: "Advanced Cooling Vents",
                  desc: "Housing design directs heat away to ensure casing temperature remains safe (<75°C).",
                },
                {
                  title: "Discharge Outlet",
                  desc: "Precision nozzle enables rapid flooding of the cabinet in ≤ 6 seconds.",
                },
                {
                  title: "DIN Rail Mounting Clip",
                  desc: "Standard 35mm DIN rail integration allows it to sit perfectly alongside MCBs and terminal blocks.",
                },
                {
                  title: "Thermal Activation Cord",
                  desc: "(Blue line) Heat-sensitive cord activates mechanically at 170°C, ensuring operation even during total power failure.",
                },
              ].map((item) => (
                <li key={item.title} className="flex gap-3">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-gray-400">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Right: two stacked images */}
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-xl bg-white" style={{ height: "280px" }}>
                <Image
                  src="/images/aerosol-tech-diagram.jpg"
                  alt="Aerosol fire extinguisher internal structure diagram"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl bg-white" style={{ height: "280px" }}>
                <Image
                  src="/images/aerosol-installed.jpg"
                  alt="Aerosol fire extinguisher installed in electrical cabinet"
                  fill
                  className="object-cover brightness-75"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Factory About ─────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">About Soltree</p>
            <h2 className="section-heading">Factory-Direct Electrical Solutions</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Explore our 50,000 m² facility with automated lines and R&amp;D centers. We deliver reliable electrical solutions.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Left: factory image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{ height: "440px" }}>
              {/* TODO: Replace with aerosol production line photo — /images/solutions/aerosol-factory-line.jpg */}
              <Image
                src="/images/Aerosol-Fire-Extinguisher-factory.jpg"
                alt="Soltree aerosol fire extinguisher manufacturing facility"
                width={720}
                height={480}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-green-700 px-5 py-3 text-white shadow-lg">
                <span className="text-2xl font-bold">15+</span>
                <span className="text-xs font-medium leading-tight">Years of<br />Experience</span>
              </div>
            </div>

            {/* Right: content */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold text-green-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
                About Soltree
              </div>

              <h3 className="mt-4 text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                We Are The Leading Manufacturer For{" "}
                <span className="text-green-600">Aerosol Fire Extinguisher</span>{" "}
                Solutions
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Soltree is a factory-direct manufacturer specializing in aerosol fire suppression devices
                for electrical cabinets and industrial enclosures. With over 15 years of expertise,
                ISO 9001 certified production, and 200,000+ units delivered annually, we provide
                reliable OEM and ODM solutions to distributors and system integrators across 80+ countries.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  {
                    title: "In-House R&D",
                    desc: "Own laboratory for product testing and continuous improvement of aerosol suppression technology.",
                  },
                  {
                    title: "OEM / ODM Ready",
                    desc: "Full customization — your logo, label, capacity and packaging, with flexible MOQ.",
                  },
                ].map((f, i) => (
                  <div key={f.title} className={`flex gap-3 ${i === 0 ? "border-r border-gray-100 pr-4" : ""}`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                      <p className="mt-1 text-xs text-gray-500">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/about" className="btn-primary">
                  Discover More →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Factory Gallery ───────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Our Facilities</p>
            <h2 className="section-heading">Factory Capabilities &amp; Production Lines</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Automated Workflows, Strict Quality Control, On-Time Global Delivery
            </p>
          </div>

          {/* 3×3 image grid — replace src paths with your actual workshop photos */}
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { src: "/images/Aerosol--fire-extinguisher-production-line.jpg", alt: "Aerosol fire extinguisher production line" },
              { src: "/images/Automated-assembly-workshop.jpg", alt: "Automated assembly workshop" },
              { src: "/images/Quality-inspection-station.jpg", alt: "Quality inspection station" },
              { src: "/images/R&D-testing-laboratory.jpg", alt: "R&D testing laboratory" },
              { src: "/images/Finished-goods-warehouse.jpg", alt: "Finished goods warehouse" },
              { src: "/images/Packaging-and-shipping-area.jpg", alt: "Packaging and shipping area" },
            ].map((img) => (
              <div key={img.src} className="relative overflow-hidden rounded-xl bg-gray-200" style={{ height: "220px" }}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Exhibitions & Events ──────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Global Presence</p>
            <h2 className="section-heading">Exhibitions &amp; Events</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              Join us at global trade shows to discover our electrical and solar innovations.
              Let&apos;s build a reliable partnership together.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {/* Large image - spans 2 rows on md+ */}
            <div className="col-span-2 overflow-hidden rounded-xl md:col-span-1 md:row-span-2">
              <div className="relative h-64 w-full md:h-full" style={{ minHeight: "320px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/exhibition-1.png"
                  alt="Soltree exhibition booth"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            {/* 4 smaller images */}
            {[2, 3, 4, 5].map((n) => (
              <div key={n} className="overflow-hidden rounded-xl">
                <div className="relative h-52 w-full md:h-64">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/exhibition-${n}.png`}
                    alt={`Soltree trade show photo ${n}`}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Free Sample CTA ───────────────────────────────────────────── */}
      <section className="bg-gray-700 py-14">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Get Your <span className="underline decoration-green-400 decoration-2 underline-offset-4">Free Sample!</span>
          </h2>
          <p className="mt-4 text-base font-medium text-gray-300">
            We provide samples for free, you just need to tell us what you need.
          </p>
          <a
            href="#contact-form"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-600 px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-green-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Get Sample Now
          </a>
        </div>
      </section>

      {/* ── More Than Just a Manufacturer ────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          {/* Header */}
          <div className="text-center">
            <p className="section-eyebrow">Beyond Manufacturing</p>
            <h2 className="section-heading">
              More Than Just an Aerosol Fire Extinguisher Manufacturer
            </h2>
            <div className="mx-auto mt-3 h-0.5 w-12 rounded bg-green-600" />
            <p className="section-subheading mx-auto mt-4 max-w-3xl">
              At Soltree, we go beyond manufacturing by offering a suite of value-added services
              tailored to meet your project needs. Every customer receives personalized attention,
              expert guidance, and seamless support throughout their journey with us.
            </p>
          </div>

          {/* 2×2 cards */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                  </svg>
                ),
                title: "Service Consultation",
                desc: "Whether your requirements are straightforward or complex, our team provides expert advice and technical consultation. For more intricate projects, we offer in-depth engineering support to ensure optimal product selection, guaranteeing safety and efficiency in your electrical systems.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Product Recommendations",
                desc: "Unsure which aerosol fire extinguisher suits your system? Our specialists provide free, customized recommendations based on your specific operational and environmental requirements, ensuring you get the perfect fit for your electrical protection needs.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                  </svg>
                ),
                title: "Logistics Support",
                desc: "If you lack a reliable freight forwarder, we can arrange transportation from our factory to your project site at no extra cost. Our logistics team ensures timely and secure delivery to keep your project on schedule, minimizing downtime and delays.",
              },
              {
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                  </svg>
                ),
                title: "Installation Support",
                desc: "Need help with installation? Our technical team is available to answer your questions or provide hands-on support. For larger projects, we can even dispatch an engineer to your site for on-the-ground assistance, ensuring seamless integration within your electrical network.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 rounded-2xl border border-gray-100 bg-gray-50 p-6 hover:shadow-md transition-shadow">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <AerosolTestimonials />

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <AerosolFAQ />

      {/* ── Global Reach ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        {/* World map — full background */}
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/images/world-map.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold leading-snug text-gray-900 sm:text-4xl">
              Your Trusted Aerosol Fire Extinguisher<br />
              Manufacturer in China. Global Shipping.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-gray-500">
              Based in Yueqing, China — the electrical manufacturing hub — Soltree combines
              in-house production with 15+ years of R&amp;D to deliver reliable aerosol fire
              suppression devices worldwide. With English-speaking sales engineers and fast
              response times, we support distributors and system integrators across 80+
              countries to keep projects on schedule.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {[
                { value: "200,000+", label: "Units Per Year" },
                { value: "80+",      label: "Countries & Regions Served" },
                { value: "15+",      label: "Years Experience" },
                { value: "50,000㎡", label: "Factory in Total" },
              ].map((s) => (
                <div key={s.label}>
                  <dt className="text-4xl font-extrabold text-green-600">{s.value}</dt>
                  <dd className="mt-1 text-xs text-gray-500">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Contact Form ──────────────────────────────────────────────── */}
      <section id="contact-form" className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Contact Info */}
            <div className="space-y-5 lg:col-span-1">
              <div>
                <p className="section-eyebrow">Get in Touch</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900">Contact Us</h2>
                <p className="mt-3 text-sm text-gray-500">
                  Have questions about our products or need assistance with a project? Our team is ready to help you find the perfect electrical solution.
                </p>
              </div>

              {[
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
                  label: "Address",
                  value: "Fenghuang Industrial Zone, Baishi Town, Yueqing Zhejiang P. R. China",
                  href: null,
                },
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>,
                  label: "Email",
                  value: "Jacky@cnsoltree.com",
                  href: "mailto:Jacky@cnsoltree.com",
                },
                {
                  icon: <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>,
                  label: "Phone / WhatsApp",
                  value: "+86-13693313816",
                  href: "tel:+8613693313816",
                },
              ].map((info) => (
                <div key={info.label} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="mt-0.5 text-sm text-gray-800 hover:text-green-700 transition-colors">{info.value}</a>
                    ) : (
                      <p className="mt-0.5 text-sm text-gray-700">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Business Hours</h3>
                <dl className="mt-3 space-y-1.5 text-xs">
                  {[["Monday – Friday", "09:00 – 22:00 CST"], ["Saturday", "09:00 – 22:00 CST"], ["Sunday", "09:00 – 22:00 CST"]].map(([day, hours]) => (
                    <div key={day} className="flex justify-between">
                      <dt className="text-gray-500">{day}</dt>
                      <dd className="font-medium text-gray-800">{hours}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-3 text-xs text-gray-400">Emails are monitored outside hours. We aim to respond within 24 hours on business days.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-flat">
                <h2 className="text-lg font-bold text-gray-900">Send an Enquiry</h2>
                <p className="mt-1 mb-6 text-xs text-gray-500">All fields marked * are required.</p>
                <ContactForm showCountry buttonText="Send Now" />
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
