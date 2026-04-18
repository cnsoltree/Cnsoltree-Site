import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { getProductById, getCategoryBySlug } from "@/lib/data";

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

const APPLICATIONS = [
  {
    title: "Distribution Cabinets",
    description:
      "Protects low-voltage distribution panels and breaker boxes from incipient electrical fires without disrupting normal operation.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: "PV Combiner Boxes",
    description:
      "Withstands -50°C to +90°C outdoor environments, ideal for solar farm combiner boxes where fire risk is high and access is limited.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
  },
  {
    title: "Vehicles & Marine",
    description:
      "Compact, pressure-free design is safe for mobile and marine installations — engine bays, electrical compartments, fuse boxes.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    title: "Server Rooms & Telecoms",
    description:
      "No residue, no corrosion — safe for sensitive electronics, server racks, communication cabinets and UPS enclosures.",
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
];

const WHY_CHOOSE = [
  {
    title: "15+ Years Manufacturing",
    description:
      "Over 15 years specializing in electrical protection products. Deep technical know-how from R&D to production line.",
  },
  {
    title: "OEM / ODM Ready",
    description:
      "Custom logo, label, packaging, and capacity options. Full OEM/ODM service with MOQ flexibility for distributors and brands.",
  },
  {
    title: "CE & ISO Certified",
    description:
      "Products meet CE, ISO 9001, and RoHS standards. All shipments come with full certification documentation.",
  },
  {
    title: "Fast Global Delivery",
    description:
      "Serving 80+ countries with reliable shipping. Sample orders dispatched within 3 days; bulk orders in 15–25 days.",
  },
];

const PRODUCT_SERIES = [
  {
    title: "QRR Mini Series (DIN Rail Aerosol Fire Extinguishers)",
    subtitle: "The ultimate solution for small electrical enclosures and server racks. Fits directly on DIN rails alongside breakers.",
    products: [
      {
        name: "QRR-0.01G-2/10RLK",
        badge: "BEST SELLER",
        badgeColor: "bg-green-700",
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
        name: "QRR-0.03G/S-1/10BLK",
        badge: "BEST SELLER",
        badgeColor: "bg-green-700",
        image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-2.jpg",
        specs: [
          "Model: QRR-0.01G/S-1/10B",
          "Dosage: 10g / 20g",
          "Volume: Protects ≤0.4m³ to ≤0.8m³",
          "Size: Ultra-compact (84.5 × 18 × 60mm)",
          "Mounting: DIN Rail / 3M Magnetic",
        ],
      },
      {
        name: "Custom OEM Series",
        badge: "OEM / ODM",
        badgeColor: "bg-emerald-600",
        image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-3.jpg",
        specs: [
          "Model: Your Model And Logo",
          "Dosage: 10 / 20 / 30g",
          "Volume: Protects ≤0.4m³ to ≤0.8m³",
          "Cable Length: Custom (10–50cm)",
          "Mounting: DIN Rail / Screw / 3M Magnetic",
        ],
      },
    ],
  },
  {
    title: "The Smart Wireless Series (IoT Integrated)",
    subtitle: "Intelligent fire suppression for larger distribution cabinets. Connects to the cloud for 24/7 monitoring.",
    products: [
      {
        name: "Wireless Aerosol Fire Suppression Device",
        badge: "FLEXIBLE",
        badgeColor: "bg-teal-600",
        image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-4.jpg",
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
        badge: "BMS READY",
        badgeColor: "bg-blue-600",
        image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-5.jpg",
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
        badge: "CLOUD IOT",
        badgeColor: "bg-indigo-600",
        image: "/images/products/Aerosol-Fire-Extinguishing-Sticker-6.jpg",
        specs: [
          "Network: 4G LTE + RS485",
          "Remote Features: App Status / SMS Alerts",
          "Firmware: Remote OTA Upgrade",
          "Sensors: Smoke + Temperature",
          "Location: Built-in GPS/Base Station",
          "Maintenance: Auto-Self Check",
        ],
      },
    ],
  },
];

export default function AerosolSolutionPage() {
  const product = getProductById("Aerosol-DIN-Rail");
  const category = getCategoryBySlug("aerosol-fire-extinguisher");

  if (!product || !category) return null;

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
          <div className="max-w-2xl">
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
              <Link href="/categories/aerosol-fire-extinguisher" className="btn-outline-white">
                View All Products
              </Link>
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

      {/* ── Product Series ────────────────────────────────────────────── */}
      {PRODUCT_SERIES.map((series, si) => (
        <section key={series.title} className={si % 2 === 0 ? "section" : "section-alt"}>
          <div className="container">
            <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">{series.title}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-gray-500">{series.subtitle}</p>
            <div className="mx-auto mt-3 h-0.5 w-12 rounded bg-green-600" />

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {series.products.map((p) => (
                <div key={p.name} className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-52 items-center justify-center rounded-t-2xl bg-gray-50 p-6">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={280}
                      height={200}
                      className="h-full w-auto object-contain"
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
      ))}

      {/* ── Key Features ──────────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <p className="section-eyebrow text-center">Why Engineers Choose It</p>
          <h2 className="section-heading text-center">Key Product Features</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {product.features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-sm text-gray-700">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Technical Specs ───────────────────────────────────────────── */}
      <section className="section">
        <div className="container max-w-3xl">
          <p className="section-eyebrow text-center">Technical Data</p>
          <h2 className="section-heading text-center">Specifications</h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {Object.entries(product.specs).map(([key, val], i) => (
                  <tr key={key} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3 font-medium text-gray-700 w-2/5">{key}</td>
                    <td className="px-5 py-3 text-gray-600">{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Application Scenarios ─────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <p className="section-eyebrow text-center">Where It Works</p>
          <h2 className="section-heading text-center">Application Scenarios</h2>
          <p className="section-subheading text-center mx-auto max-w-xl">
            Designed for any closed electrical enclosure where fire risk is real and human access is limited.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {APPLICATIONS.map((app) => (
              <div key={app.title} className="card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-700">
                  {app.icon}
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{app.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{app.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Soltree ────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <p className="section-eyebrow text-center">Our Advantages</p>
          <h2 className="section-heading text-center">Why Source From Soltree</h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CHOOSE.map((item) => (
              <div key={item.title} className="card-flat rounded-xl border border-gray-100 bg-white p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Factory Section ───────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-eyebrow">Our Manufacturing Capability</p>
              <h2 className="section-heading">Built in Our Own Factory</h2>
              <p className="mt-4 text-gray-600">
                Every aerosol fire extinguisher shipped by Soltree is manufactured in-house at our
                ISO 9001 certified facility. With 15 years of experience in electrical protection
                products, we control every step — from raw materials to finished packaging — ensuring
                consistent quality and full traceability.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                {[
                  "In-house R&D and product testing laboratory",
                  "ISO 9001 certified production processes",
                  "200,000+ units annual production capacity",
                  "OEM/ODM orders accepted with flexible MOQ",
                  "Full documentation: CE, RoHS, test reports",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <svg className="h-4 w-4 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* TODO: Replace with actual factory interior photo — recommended: /images/solutions/aerosol-factory.jpg */}
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/factory.jpg"
                alt="Soltree aerosol fire extinguisher manufacturing facility"
                width={640}
                height={480}
                className="h-80 w-full object-cover lg:h-96"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section className="section border-b border-gray-100">
        <div className="container">
          <p className="section-eyebrow text-center">Compliance &amp; Quality</p>
          <h2 className="section-heading text-center">Certifications</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-10">
            {[
              { src: "/images/ce.png", alt: "CE Certification" },
              { src: "/images/TUV.png", alt: "TUV Certification" },
              { src: "/images/rohs.png", alt: "RoHS Compliance" },
              { src: "/images/CT.png", alt: "CT Certification" },
            ].map((cert) => (
              <Image
                key={cert.src}
                src={cert.src}
                alt={cert.alt}
                width={80}
                height={80}
                className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ──────────────────────────────────────────────── */}
      <section id="contact-form" className="section bg-white">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <p className="section-eyebrow">Get in Touch</p>
              <h2 className="section-heading">Request a Free Quote</h2>
              <p className="mt-4 text-gray-600">
                Tell us your requirements and we will respond within 24 hours with pricing,
                lead time, and sample options. OEM/ODM enquiries welcome.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Response within 24 hours
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  Samples available
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                  </svg>
                  OEM / ODM accepted
                </li>
              </ul>
            </div>
            <ContactForm showInquiryType showCountry buttonText="Send Enquiry" />
          </div>
        </div>
      </section>

    </main>
  );
}
