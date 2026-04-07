import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import {
  categories,
  getFeaturedProducts,
  getLatestBlogPosts,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Cnsoltree | Professional Electrical Protection Solutions",
  description:
    "B2B manufacturer of circuit breakers, SPDs, DC fuse holders, power meters, ATS and PV combiner boxes. Wholesale & OEM available.",
};

// ─── Static data ──────────────────────────────────────────────────────────────

const stats = [
  { value: "15+", label: "Years of Manufacturing" },
  { value: "80+", label: "Countries Served" },
  { value: "500+", label: "Product Models" },
  { value: "ISO 9001", label: "Certified Quality" },
];

const advantages = [
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "IEC / CE Certified",
    description:
      "All products comply with IEC international standards and carry CE marking, ensuring safety and regulatory acceptance in global markets.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
    title: "OEM & Private Label",
    description:
      "Full OEM support with custom branding, packaging, and product specifications. Dedicated engineering team for product customisation.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Fast Global Shipping",
    description:
      "In-stock products ship within 3 business days. Dedicated logistics team ensures smooth customs clearance and on-time delivery worldwide.",
  },
  {
    icon: (
      <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Dedicated Account Support",
    description:
      "Every B2B client receives a dedicated account manager for technical consultation, sample coordination, and after-sales follow-up.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const latestPosts = getLatestBlogPosts(3);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gray-900 py-20 sm:py-28">
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/banner/hero-bg.jpg"
            alt="Electrical distribution panel background"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>

        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <p className="section-eyebrow text-green-400">
              B2B Electrical Protection Solutions
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Reliable Protection for Every Circuit
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
              Manufacturer and wholesale supplier of circuit breakers, surge
              protectors, DC fuse holders, power meters, ATS, and PV combiner
              boxes — IEC certified, globally shipped.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/products" className="btn-primary-lg w-full sm:w-auto">
                Explore Products
              </Link>
              <Link href="/contact" className="btn-outline-white w-full sm:w-auto">
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="container py-10">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-3xl font-bold text-green-700">{s.value}</dt>
                <dd className="mt-1 text-sm text-gray-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Product Categories ────────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Our Product Range</p>
            <h2 className="section-heading">8 Product Categories</h2>
            <p className="section-subheading mx-auto max-w-2xl">
              From miniature circuit breakers to smart WiFi devices, every product
              is engineered for performance, safety, and long-term reliability.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-5 text-center transition-all duration-200 hover:border-green-200 hover:shadow-md"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    width={36}
                    height={36}
                    className="h-9 w-9 object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors leading-snug">
                  {cat.name}
                </h3>
                <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {cat.shortDescription}
                </p>
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

      {/* ── Why Choose Us ─────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center">
            <p className="section-eyebrow">Why Cnsoltree</p>
            <h2 className="section-heading">Your Trusted Manufacturing Partner</h2>
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

      {/* ── Featured Products ─────────────────────────────────────────────── */}
      <section className="section-alt">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Featured Products</p>
              <h2 className="section-heading">Most Popular Models</h2>
            </div>
            <Link href="/products" className="hidden text-sm font-semibold text-green-700 hover:text-green-800 sm:flex items-center gap-1">
              All products
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/products" className="btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="bg-green-700 py-14">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Discuss Your Requirements?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-green-100">
            Our technical sales team responds within 24 hours. Samples, OEM
            pricing, and bulk quotes available on request.
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

      {/* ── Latest Blog ───────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="section-eyebrow">Technical Resources</p>
              <h2 className="section-heading">Latest Articles</h2>
            </div>
            <Link href="/blog" className="hidden text-sm font-semibold text-green-700 hover:text-green-800 sm:flex items-center gap-1">
              All articles
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
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
    </>
  );
}
