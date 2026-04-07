import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import {
  getProductById,
  getProductsByCategory,
  products as allProducts,
} from "@/lib/data";

// ─── Static params (SSG) ──────────────────────────────────────────────────────

export async function generateStaticParams() {
  return allProducts.map((p) => ({ id: p.id }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.id}` },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = getProductById(params.id);
  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const badgeClass =
    product.badge === "Hot"
      ? "badge-hot"
      : product.badge === "New"
      ? "badge-new"
      : "badge-feat";

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50 py-3">
        <div className="container">
          <nav className="flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-600">Products</Link>
            <span>/</span>
            <Link href={`/categories/${product.categorySlug}`} className="hover:text-gray-600">
              {product.categoryName}
            </Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[160px]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Main */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <span className={`absolute left-4 top-4 ${badgeClass}`}>
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="section-eyebrow">{product.categoryName}</p>
              <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-gray-600">
                {product.description}
              </p>

              {/* Key Features */}
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                  Key Features
                </h2>
                <ul className="mt-3 space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary-lg flex-1 justify-center">
                  Request Quotation
                </Link>
                <Link href="/contact" className="btn-outline-lg flex-1 justify-center">
                  Ask Technical Question
                </Link>
              </div>

              <p className="mt-4 text-xs text-gray-400">
                Samples available · OEM pricing on request · Ships worldwide
              </p>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <tbody className="divide-y divide-gray-100">
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="w-1/3 px-5 py-3 font-medium text-gray-700">{key}</td>
                      <td className="px-5 py-3 text-gray-600">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="section-alt">
          <div className="container">
            <h2 className="text-xl font-bold text-gray-900">
              More in {product.categoryName}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
