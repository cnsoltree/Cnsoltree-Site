"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "We’ve installed these in 200+ enclosures. No power, no wiring, zero maintenance — and they stopped a fire in one of our cabinets. Super reliable.",
    name: "Jizzakh Polytechnic Institute",
    title: "",
    avatar: "/images/avatar-1.jpg",
  },
  {
    quote:
      "Zero-maintenance fire protection that works. Install and forget — total peace of mind for our critical equipment.",
    name: "Mark",
    title: "BIPV Philippines",
    avatar: "/images/avatar-2.jpg",
  },
  {
    quote:
      "We love how these require no power or wiring. Just install them once, and they keep our equipment protected without any maintenance.",
    name: "Carlos",
    title: "Solar EPC Contractor, Latin America",
    avatar: "/images/avatar-3.jpg",
  },
  {
    quote:
      "Compact, easy to install, and completely worry-free. It’s exactly the set-it-and-forget-it fire protection we needed.",
    name: "Ahmed",
    title: "Electrical Distributor, Middle East",
    avatar: "/images/avatar-2.jpg",
  },
];

const STARS = [1, 2, 3, 4, 5];

export default function AerosolTestimonials() {
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section className="bg-teal-800 py-16 sm:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:items-center">

          {/* Left: info panel */}
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-600/30 px-4 py-1.5 text-sm font-semibold text-green-300">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              Testimonials
            </div>

            <h2 className="mt-4 text-3xl font-bold leading-snug text-white sm:text-4xl">
              What Our Client{" "}
              <span className="text-green-400">Say&apos;s</span>{" "}
              About Us
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-teal-200">
              Client testimonials praise our deep understanding of their challenges, which leads to
              innovative solutions and strong ROI. Long-term collaborations — some over a decade —
              demonstrate their trust and satisfaction.
            </p>

            <a
              href="#contact-form"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
            >
              Know More ↗
            </a>
          </div>

          {/* Right: cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {visible.map((t, i) => (
                <div
                  key={i}
                  className="relative flex flex-col justify-between rounded-2xl bg-white p-6 shadow-lg"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {STARS.map((s) => (
                      <svg key={s} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 flex-1 text-sm italic leading-relaxed text-gray-600">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="mt-6 flex items-end justify-between">
                    <div className="border-l-2 border-green-500 pl-3">
                      <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                      {t.title && <p className="text-xs text-green-600">{t.title}</p>}
                    </div>
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-green-400 bg-gray-200">
                      <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`h-2 rounded-full transition-all ${i === page ? "w-6 bg-green-400" : "w-2 bg-white/30"
                    }`}
                  aria-label={`Page ${i + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
