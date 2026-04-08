"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductImageGalleryProps {
  /** 所有展示图片，第一张为默认选中 */
  images: string[];
  productName: string;
  /** 每张图对应的 SEO alt 文字，顺序与 images 一致；不填则自动生成兜底 alt */
  imageAlts?: string[];
}

export default function ProductImageGallery({
  images,
  productName,
  imageAlts,
}: ProductImageGalleryProps) {
  const [active, setActive] = useState(0);

  // 最多展示 7 张
  const displayImages = images.slice(0, 7);
  const hasMultiple = displayImages.length > 1;

  // 取当前图的 alt：优先用自定义，否则用产品名+序号兜底
  function getAlt(index: number) {
    return imageAlts?.[index] ?? `${productName} — image ${index + 1}`;
  }

  return (
    <div className="flex flex-col gap-3">
      {/* 主图 */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
        <Image
          key={displayImages[active]}
          src={displayImages[active]}
          alt={getAlt(active)}
          fill
          className="object-contain p-8 transition-opacity duration-200"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={active === 0}
        />
        {/* 左右切换箭头（仅多图时显示） */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev - 1 + displayImages.length) % displayImages.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white"
              aria-label="Previous image"
            >
              <svg className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setActive((prev) => (prev + 1) % displayImages.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm transition hover:bg-white"
              aria-label="Next image"
            >
              <svg className="h-4 w-4 text-gray-700" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* 图片计数 */}
            <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
              {active + 1} / {displayImages.length}
            </span>
          </>
        )}
      </div>

      {/* 缩略图条（仅多图时显示） */}
      {hasMultiple && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {displayImages.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === active
                  ? "border-green-600 shadow-sm"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              aria-label={`View image ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image
                src={src}
                alt={getAlt(i)}
                fill
                className="object-contain p-1.5"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
