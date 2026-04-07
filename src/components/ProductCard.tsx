import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const badgeClass =
    product.badge === "Hot"
      ? "badge-hot"
      : product.badge === "New"
      ? "badge-new"
      : "badge-feat";

  return (
    <Link
      href={`/products/${product.id}`}
      className="card group flex flex-col"
      aria-label={product.name}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 ${badgeClass}`}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-green-700">
          {product.categoryName}
        </p>
        <h3 className="mt-1 text-sm font-semibold text-gray-900 leading-snug group-hover:text-green-700 transition-colors">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500 line-clamp-3">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-700">
          View Details
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
