import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Cnsoltree — 15+ years of manufacturing electrical protection products, serving distributors and system integrators in 80+ countries.",
};

const milestones = [
  { year: "2008", text: "Founded in Zhejiang, China with focus on miniature circuit breakers." },
  { year: "2012", text: "Obtained ISO 9001 certification and launched SPD product line." },
  { year: "2016", text: "Expanded into PV protection products to meet growing solar demand." },
  { year: "2019", text: "Launched WiFi smart low-voltage device range for smart buildings." },
  { year: "2022", text: "Passed TÜV audit; extended distribution to 80+ countries." },
  { year: "2024", text: "Introduced 1500V DC product line for utility-scale solar projects." },
];

const capabilities = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    title: "Advanced Manufacturing",
    text: "50,000 m² production facility with automated assembly lines, in-process quality control, and full traceability.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: "In-House R&D",
    text: "30+ engineers dedicated to product development and IEC standard compliance testing in our accredited laboratory.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Quality Assurance",
    text: "ISO 9001:2015 certified. Every product batch undergoes 100% electrical testing before shipment. CE, RoHS, TÜV certified.",
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
      </svg>
    ),
    title: "Global Distribution",
    text: "Export to 80+ countries with established distribution networks in Europe, Southeast Asia, Middle East, and Africa.",
  },
];

const certifications = [
  { name: "CE Marking", desc: "European conformity for low-voltage directive" },
  { name: "RoHS", desc: "Restriction of hazardous substances compliance" },
  { name: "ISO 9001:2015", desc: "Quality management system certification" },
  { name: "IEC Standards", desc: "Products tested to IEC 60898, 61643, 61008 and more" },
  { name: "TÜV", desc: "Independent safety testing and certification" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gray-900 py-20">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/banner/about-bg.jpg"
            alt="Cnsoltree manufacturing facility"
            fill
            className="object-cover opacity-15"
          />
        </div>
        <div className="container max-w-4xl text-center">
          <p className="section-eyebrow text-green-400">About Cnsoltree</p>
          <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl text-balance">
            15+ Years of Engineering Excellence
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-300">
            Since 2008, Cnsoltree has been designing and manufacturing
            low-voltage electrical protection products for distributors,
            system integrators, and project contractors worldwide.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-eyebrow">Company Overview</p>
              <h2 className="section-heading">Built on Quality, Delivered Globally</h2>
              <p className="mt-4 text-sm leading-7 text-gray-600">
                With over 15 years of expertise, Cnsoltree manufactures a comprehensive
                range of low-voltage electrical products, including circuit breakers, RCCBs,
                surge protectors, and smart meters. Our solutions are widely applied in
                residential, commercial, and industrial settings, ensuring safe and efficient
                power distribution. Supported by ISO 9001:2015 certification and advanced
                production facilities, we consistently deliver high-quality products at
                competitive prices.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "ISO & CE Certified Quality",
                  "Factory Direct Supply",
                  "Smart Power Monitoring",
                  "Wide Range of Applications",
                  "Trusted by Global Customers",
                  "Competitive Pricing",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/products" className="btn-primary">
                  View Products
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Sales
                </Link>
              </div>
            </div>
            <div className="relative h-80 overflow-hidden rounded-2xl bg-gray-100 lg:h-96">
              <Image
                src="/images/factory.jpg"
                alt="Cnsoltree production facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Capabilities */}
      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Our Capabilities</p>
            <h2 className="section-heading">End-to-End Manufacturing</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((cap) => (
              <div key={cap.title} className="card-flat">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  {cap.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{cap.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{cap.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container max-w-3xl">
          <div className="text-center">
            <p className="section-eyebrow">Our Journey</p>
            <h2 className="section-heading">Company Milestones</h2>
          </div>
          <ol className="mt-12 space-y-0">
            {milestones.map((m, i) => (
              <li key={m.year} className="relative flex gap-6 pb-8 last:pb-0">
                {/* Connector line */}
                {i < milestones.length - 1 && (
                  <div className="absolute left-[23px] top-10 h-full w-px bg-gray-200" aria-hidden="true" />
                )}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-green-600 bg-white text-xs font-bold text-green-700">
                  {m.year}
                </div>
                <div className="pt-3">
                  <p className="text-sm leading-relaxed text-gray-600">{m.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Compliance & Quality</p>
            <h2 className="section-heading">Certifications</h2>
            <p className="section-subheading mx-auto max-w-xl">
              All products are independently certified to international standards,
              ensuring regulatory acceptance in global markets.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {certifications.map((cert) => (
              <div key={cert.name} className="card-flat text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
                  <svg className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-semibold text-gray-900">{cert.name}</p>
                <p className="mt-1 text-xs text-gray-500">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-green-700 py-14">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Interested in a Partnership?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-green-100">
            We work with distributors, wholesalers, and project contractors. Reach out to discuss
            pricing, OEM programmes, or technical requirements.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-green-700 shadow-sm hover:bg-green-50 transition-colors active:scale-[0.98]"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
