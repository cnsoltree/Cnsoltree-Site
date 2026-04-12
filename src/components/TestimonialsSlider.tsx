"use client";

import { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "As an integrator, we have high demands on a supplier's product range and technical support. Soltree offers a very comprehensive selection of electrical products, especially their SPD solutions. They can provide customized modules, greatly simplifying our assembly process.",
    name: "Stefan",
    title: "European Electrical Systems Integrator",
    avatar: "/images/avatar-1.jpg",
  },
  {
    quote:
      "We have been sourcing circuit breakers and ATS units from Soltree for over three years. The product quality is consistently excellent and their CE certifications make it easy for us to clear customs in our market. Their response time is fast and the after-sales support is reliable.",
    name: "Ahmed",
    title: "Electrical Distributor, Middle East",
    avatar: "/images/avatar-2.jpg",
  },
  {
    quote:
      "Soltree helped us complete a large solar PV project on time by supplying DC fuse holders and PV combiner boxes that met all our technical specifications. The OEM labeling service was a great bonus. Highly recommended for B2B buyers looking for a dependable factory partner.",
    name: "Carlos",
    title: "Solar EPC Contractor, Latin America",
    avatar: "/images/avatar-3.jpg",
  },
];

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0);

  function prev() {
    setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  }

  function next() {
    setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  }

  const t = testimonials[current];

  return (
    <section className="relative overflow-hidden py-20">
      {/* Background */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-slate-900/80" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Satisfied Customers Over The Globe
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            See why global industry leaders rely on Soltree for their electrical systems.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative mt-12 flex items-center justify-center gap-4">
          {/* Prev */}
          <button
            onClick={prev}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Previous"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Card */}
          <div className="max-w-2xl rounded-2xl border border-white/10 bg-white/10 px-8 py-10 text-center backdrop-blur-sm">
            <svg className="mx-auto mb-4 h-8 w-8 text-green-400 opacity-80" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
            <p className="text-base leading-relaxed text-slate-100 italic">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-green-400 bg-gray-600">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  className="object-cover"
                  onError={() => {}}
                />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-slate-400">{t.title}</p>
              </div>
            </div>
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/20"
            aria-label="Next"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-green-400" : "w-2 bg-white/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
