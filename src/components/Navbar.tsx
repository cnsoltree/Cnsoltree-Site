"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home",       href: "/" },
  { label: "Product",    hasDropdown: true },
  { label: "Blog",       href: "/blog" },
  { label: "About",      href: "/about" },
  { label: "Contact Us", href: "/contact" },
];

// ─── Icons ────────────────────────────────────────────────────────────────────

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [mobileProductOpen, setMobileProductOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll shadow
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileProductOpen(false);
  }, [pathname]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDesktopDropdown(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function onMouseEnterProduct() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setDesktopDropdown(true);
  }

  function onMouseLeaveProduct() {
    hoverTimeout.current = setTimeout(() => setDesktopDropdown(false), 120);
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isProductActive = pathname.startsWith("/product") || pathname.startsWith("/categories");

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-200 ${
        scrolled ? "shadow-md border-b border-gray-100" : "border-b border-gray-100"
      }`}
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between lg:h-18">

          {/* ── Logo ───────────────────────────────────────────────── */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/images/logo.png"
              alt="Cnsoltree Logo"
              width={160}
              height={40}
              className="h-8 w-auto lg:h-9 object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Navigation ─────────────────────────────────── */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={onMouseEnterProduct}
                    onMouseLeave={onMouseLeaveProduct}
                  >
                    <button
                      className={`flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                        isProductActive
                          ? "text-green-700 font-semibold"
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                      aria-expanded={desktopDropdown}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-150 ${
                          desktopDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Product dropdown */}
                    {desktopDropdown && (
                      <div
                        className="absolute left-1/2 top-full -translate-x-1/2 mt-1 w-72 rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5"
                        onMouseEnter={onMouseEnterProduct}
                        onMouseLeave={onMouseLeaveProduct}
                      >
                        <div className="p-2">
                          <Link
                            href="/products"
                            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors border-b border-gray-100 mb-1"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                            </svg>
                            All Products
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={`/categories/${cat.slug}`}
                              className="flex rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-green-700 transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href!}
                  className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(item.href!)
                      ? "text-green-700 font-semibold"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop CTA ────────────────────────────────────────── */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>

          {/* ── Mobile Hamburger ───────────────────────────────────── */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────── */}
      <div
        className={`overflow-hidden border-t border-gray-100 transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <nav className="container py-4" aria-label="Mobile navigation">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              if (item.hasDropdown) {
                return (
                  <li key={item.label}>
                    <button
                      className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isProductActive
                          ? "bg-green-50 text-green-700 font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => setMobileProductOpen((v) => !v)}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-150 ${
                          mobileProductOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Mobile product sub-menu */}
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        mobileProductOpen ? "max-h-[500px]" : "max-h-0"
                      }`}
                    >
                      <ul className="mt-1 ml-4 border-l-2 border-gray-100 pl-4 space-y-0.5">
                        <li>
                          <Link
                            href="/products"
                            className="flex rounded-lg px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-50"
                          >
                            All Products
                          </Link>
                        </li>
                        {categories.map((cat) => (
                          <li key={cat.slug}>
                            <Link
                              href={`/categories/${cat.slug}`}
                              className="flex rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-700"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href!}
                    className={`flex rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(item.href!)
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t border-gray-100 pt-4">
            <Link href="/contact" className="btn-primary w-full justify-center">
              Contact Us
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
