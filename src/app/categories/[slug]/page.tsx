import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import {
  getCategoryBySlug,
  getProductsByCategory,
  categories,
} from "@/lib/data";

// ─── Static params (SSG) ──────────────────────────────────────────────────────

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categories/${category.slug}` },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(params.slug);

  return (
    <>
      {/* Header */}
      <section className="border-b border-gray-100 bg-gray-50 py-12">
        <div className="container">
          <nav className="mb-4 flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-600">Products</Link>
            <span>/</span>
            <span className="text-gray-600">{category.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {category.name}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-500">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          {/* Other categories */}
          <div className="mb-6 flex flex-wrap gap-2">
            <Link
              href="/products"
              className="rounded-full border border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={`rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                  cat.slug === params.slug
                    ? "border-green-600 bg-green-600 text-white"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-gray-400">
              No products found in this category.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="container text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Need a custom specification?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Our engineers are available to discuss bespoke requirements, OEM orders, and technical approvals.
          </p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
