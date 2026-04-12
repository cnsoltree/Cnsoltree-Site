import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/BlogCard";
import {
  categories,
  getLatestBlogPosts,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Soltree | Professional Electrical Protection Solutions",
  description:
    "B2B manufacturer of circuit breakers, SPDs, DC fuse holders, power meters, ATS and PV combiner boxes. Wholesale & OEM available.",
};

const stats = [
  { value: "15+", label: "Years of Manufacturing Experience" },
  { value: "80+", label: "Countries Served" },
  { value: "500+", label: "Product Models" },
  { value: "24h", label: "Typical Quote Response" },
];

const trustTags = ["IEC", "CE", "ISO 9001", "OEM", "Private Label"];

const procurementFlow = [
  {
    title: "Share Requirements",
    description:
      "Send your drawings, target market, and certification requirements.",
  },
  {
    title: "Sample & Validation",
    description:
      "We arrange samples and technical confirmation before mass order.",
  },
  {
    title: "Mass Production",
    description:
      "Stable lead time with strict quality checks throughout production.",
  },
  {
    title: "Delivery & Support",
    description:
      "Global shipping support and responsive after-sales communication.",
  },
];

const advantages = [
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "IEC / CE Certified",
    description:
      "All products comply with IEC standards and carry CE marking, ensuring safety and regulatory acceptance in global markets.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"
        />
      </svg>
    ),
    title: "OEM & Private Label",
    description:
      "Full OEM support with custom branding, packaging, and product specifications. Dedicated engineering team for customization.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
        />
      </svg>
    ),
    title: "Fast Global Shipping",
    description:
      "In-stock products ship quickly. Dedicated logistics support helps ensure customs clearance and on-time global delivery.",
  },
  {
    icon: (
      <svg
        className="h-7 w-7"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />
      </svg>
    ),
    title: "Dedicated Account Support",
    description:
      "Every B2B client receives a dedicated account manager for technical consultation, sample coordination, and after-sales support.",
  },
];

export default function HomePage() {
  const latestPosts = getLatestBlogPosts(3);

  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-slate-950/80" />
        </div>

        <div className="container relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_360px]">
            <div>
              <p className="section-eyebrow text-green-300">
                B2B Electrical Protection Manufacturer
              </p>
              <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
                Reliable Low-Voltage Components for Global Distributors
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
                Source circuit breakers, SPDs, fuse holders, ATS and PV combiner
                boxes from one factory partner with certified quality, stable lead
                times, and complete OEM support.
              </p>
              <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
                <Link href="/products" className="btn-primary-lg w-full sm:w-auto">
                  Explore Products
                </Link>
                <Link href="/contact" className="btn-outline-white w-full sm:w-auto">
                  Request a Quote
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-2">
                {trustTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold text-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 shadow-2xl shadow-black/25 backdrop-blur-sm">
              <p className="text-sm font-semibold uppercase tracking-wider text-green-300">
                At a glance
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-5">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-2xl font-bold text-white">{s.value}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-slate-300">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-slate-400">
                Focused on electrical protection solutions for EPC contractors,
                distributors, and importers.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="container py-10">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700">
                Focus Industries
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Solar PV projects, industrial distribution systems, and low-voltage
                panel builders.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700">
                Flexible Cooperation
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Support for OEM branding, tailored packaging, and mixed-product
                container planning.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="text-xs font-bold uppercase tracking-widest text-green-700">
                Technical Support
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Rapid pre-sales guidance on product selection, certifications, and
                compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">How We Work</p>
            <h2 className="section-heading">Smooth B2B Procurement Flow</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              We keep communication clear from first inquiry to final delivery,
              helping you shorten sourcing cycles and reduce project risk.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {procurementFlow.map((step, index) => (
              <div key={step.title} className="card-flat">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-700 text-xs font-bold text-white">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Our Product Range</p>
            <h2 className="section-heading">9 Product Categories</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              From miniature circuit breakers to smart WiFi devices, every product
              is engineered for performance, safety, and long-term reliability.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group rounded-xl border border-gray-200 bg-white overflow-hidden transition-all duration-200 hover:border-green-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-center bg-gray-50 p-6 transition-colors group-hover:bg-green-50" style={{aspectRatio: '4/3'}}>
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={160}
                    height={160}
                    className="h-32 w-32 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="border-t border-gray-100 px-4 py-3 text-center">
                  <h3 className="text-sm font-semibold leading-snug text-gray-900 transition-colors group-hover:text-green-700">
                    {cat.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                    {cat.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Why Soltree</p>
            <h2 className="section-heading">Your Trusted Manufacturing Partner</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              We combine international quality standards with tailored services to ensure a seamless supply chain experience for every partner.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((adv) => (
              <div key={adv.title} className="card-flat">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700">
                  {adv.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  {adv.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">
                  {adv.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            <div className="relative overflow-hidden rounded-2xl shadow-lg" style={{height: '440px'}}>
              <Image
                src="/images/factory.jpg"
                alt="Soltree manufacturing facility"
                width={720}
                height={480}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                Reliable &amp; Smart Power Solutions.
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                <span className="font-semibold text-gray-900">With over 15 years of manufacturing expertise,</span>{" "}
                Soltree produces a full range of low-voltage electrical products, including circuit breakers,
                SPDs, DC fuse holders, power meters, and ATS systems. Our solutions are widely used in residential,
                commercial, and industrial applications. Backed by ISO 9001 certification and advanced production
                facilities, we deliver consistent quality at competitive prices.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  "ISO & CE Certified Quality",
                  "Factory Direct Supply",
                  "Smart Power Monitoring",
                  "Wide Application",
                  "Global Customer Trust",
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

              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Get Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <div className="relative h-64 w-full md:h-full" style={{minHeight: '320px'}}>
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

      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">

            {/* Left — Text */}
            <div>
              <p className="section-eyebrow">Certifications</p>
              <h2 className="text-3xl font-bold leading-snug tracking-tight text-gray-900 sm:text-4xl">
                Quality You Can Trust,<br />Certified Worldwide.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                Soltree maintains a global presence, supplying certified low-voltage
                electrical products to customers in over 80 countries. Every product
                is backed by internationally recognized certifications, ensuring
                compliance, safety, and reliability across markets.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  "ISO 9001:2015 Quality Management System",
                  "CE Marking — IEC/EN Standards Compliant",
                  "CCC Certification (China Compulsory Certificate)",
                  "RoHS Compliant — Environmentally Responsible",
                  "Trusted Supplier for Global Electrical Brands",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary">
                  Get a Free Quote
                </Link>
              </div>
            </div>

            {/* Right — Certificate images */}
            <div className="grid grid-cols-2 gap-4">
              {["cert-1.jpg", "cert-2.jpg", "cert-3.jpg", "cert-4.jpg"].map((file) => (
                <div key={file} className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-3 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/${file}`}
                    alt="Soltree certification"
                    className="h-48 w-full object-contain"
                  />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-green-700 py-14">
        <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,#ffffff_0,transparent_48%)]" />
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Start Your Next Order?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-green-100">
            Tell us your market, specs, and target quantity. Our technical sales
            team will send a clear quotation plan within one business day.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-green-700 shadow-sm transition-all hover:bg-green-50 active:scale-[0.98]"
            >
              Contact Our Sales Team
            </Link>
            <Link href="/products" className="btn-outline-white">
              Browse Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section-alt">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Technical Resources</p>
              <h2 className="section-heading">Latest Articles</h2>
            </div>
            <Link
              href="/blog"
              className="hidden items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-800 sm:flex"
            >
              All articles
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

            {/* Left — Contact Info */}
            <div className="lg:col-span-1">
              <p className="section-eyebrow">Get in Touch</p>
              <h2 className="section-heading">Contact Us</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                Have questions about our products or need assistance with a project?
                Our team is ready to help you find the perfect electrical solution.
              </p>

              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Address</p>
                    <p className="mt-0.5 text-sm text-gray-700">Fenghuang Industrial Zone, Baishi Town, Yueqing Zhejiang P. R. China</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Email</p>
                    <a href="mailto:Jacky@cnsoltree.com" className="mt-0.5 text-sm text-gray-700 hover:text-green-700 transition-colors">Jacky@cnsoltree.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Phone / WhatsApp</p>
                    <a href="tel:+8613693313816" className="mt-0.5 text-sm text-gray-700 hover:text-green-700 transition-colors">+86-13693313816</a>
                  </div>
                </li>
              </ul>

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Business Hours</h3>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Monday – Friday</dt>
                    <dd className="font-medium text-gray-800">09:00 – 22:00 CST</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Saturday</dt>
                    <dd className="font-medium text-gray-800">09:00 – 22:00 CST</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Sunday</dt>
                    <dd className="font-medium text-gray-800">09:00 – 22:00 CST</dd>
                  </div>
                </dl>
                <p className="mt-3 text-xs text-gray-400">
                  Emails are monitored outside hours. We aim to respond within 24 hours on business days.
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-8">
                <h3 className="text-lg font-bold text-gray-900">Send an Enquiry</h3>
                <p className="mt-1 text-xs text-gray-500">All fields marked * are required.</p>
                <form action="/api/contact" method="POST" className="mt-6 space-y-4" noValidate>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="home-name" className="label">Your Name *</label>
                      <input id="home-name" name="name" type="text" required className="input" placeholder="John Smith" />
                    </div>
                    <div>
                      <label htmlFor="home-phone" className="label">Phone / WhatsApp *</label>
                      <input id="home-phone" name="phone" type="tel" required className="input" placeholder="+1 555 0100" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="home-email" className="label">Email Address *</label>
                    <input id="home-email" name="email" type="email" required className="input" placeholder="john@company.com" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="home-company" className="label">Your Company</label>
                      <input id="home-company" name="company" type="text" className="input" placeholder="Company name" />
                    </div>
                    <div>
                      <label htmlFor="home-country" className="label">Your Country</label>
                      <input id="home-country" name="country" type="text" className="input" placeholder="e.g. United States" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="home-message" className="label">Your Message *</label>
                    <textarea id="home-message" name="message" required rows={4} className="textarea" placeholder="Please describe your requirements..." />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center py-3.5">
                    Send Now
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
