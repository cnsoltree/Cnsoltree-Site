import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Cnsoltree's full range of low-voltage electrical protection products: circuit breakers, SPDs, DC fuse holders, power meters, ATS, PV combiner boxes and more.",
};

export default function ProductsPage() {
  return (
    <>
      {/* Page Header */}
      <section className="border-b border-gray-100 bg-gray-50 py-12">
        <div className="container">
          <nav className="mb-4 flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Products</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">All Products</h1>
          <p className="mt-3 max-w-2xl text-base text-gray-500">
            {products.length} products across {categories.length} categories — CE certified,
            IEC compliant, wholesale &amp; OEM pricing available.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row">

            {/* Sidebar — Category Filter */}
            <aside className="shrink-0 lg:w-56">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                Categories
              </h2>
              <ul className="mt-3 space-y-0.5">
                <li>
                  <Link
                    href="/products"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-green-700 bg-green-50"
                  >
                    All Products
                    <span className="text-xs text-gray-400">{products.length}</span>
                  </Link>
                </li>
                {categories.map((cat) => {
                  const count = products.filter((p) => p.categorySlug === cat.slug).length;
                  return (
                    <li key={cat.slug}>
                      <Link
                        href={`/categories/${cat.slug}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-700 transition-colors"
                      >
                        {cat.name}
                        <span className="text-xs text-gray-400">{count}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="container text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Can&apos;t find what you need?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Contact our sales team for custom specifications, OEM programmes, or bulk pricing.
          </p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Contact Sales
          </Link>
        </div>
      </section>
    </>
  );
}
