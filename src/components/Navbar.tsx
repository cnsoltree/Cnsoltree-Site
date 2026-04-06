"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ─── 类型 ────────────────────────────────────────────────────────────────────

interface NavLink {
  href: string;
  label: string;
}

// ─── 配置 ────────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "首页" },
  { href: "/about", label: "关于我们" },
  { href: "/services", label: "服务" },
  { href: "/blog", label: "博客" },
  { href: "/contact", label: "联系我们" },
];

// ─── 图标组件 ────────────────────────────────────────────────────────────────

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// ─── Logo 组件 ───────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      {/* 图标 */}
      <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-emerald-600 shadow-sm transition-shadow group-hover:shadow-md">
        {/* 树形 SVG */}
        <svg
          className="h-5 w-5 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L6 9h4v2H7l5 6 5-6h-3V9h4L12 2z" opacity="0.9" />
          <rect x="10.5" y="17" width="3" height="5" rx="1" />
        </svg>
      </div>
      {/* 文字 */}
      <span className="text-base font-bold tracking-tight text-gray-900 transition-colors group-hover:text-emerald-700">
        Cnsoltree
      </span>
    </Link>
  );
}

// ─── 主组件 ──────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const pathname = usePathname();

  // 监听滚动，切换阴影
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 路由变化时关闭移动端菜单
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string): boolean =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-md transition-shadow duration-200 ${
        scrolled ? "border-gray-200 shadow-sm" : "border-transparent"
      }`}
    >
      <nav
        className="mx-auto max-w-7xl px-6 lg:px-8"
        aria-label="主导航"
      >
        {/* 顶部栏 */}
        <div className="flex h-16 items-center justify-between">
          <Logo />

          {/* 桌面端导航链接 */}
          <ul className="hidden items-center gap-0.5 md:flex" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? "text-emerald-700 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:rounded-full after:bg-emerald-500"
                      : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 桌面端 CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
            >
              登录
            </Link>
            <Link href="/contact" className="btn-primary py-2 px-4 text-sm">
              免费咨询
            </Link>
          </div>

          {/* 移动端汉堡按钮 */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
          >
            {mobileOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* 移动端菜单 */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="移动端导航菜单"
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            mobileOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-gray-100 py-3">
            <ul className="flex flex-col gap-0.5" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 移动端 CTA */}
            <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-3">
              <Link href="/login" className="btn-secondary py-2.5 text-sm">
                登录
              </Link>
              <Link href="/contact" className="btn-primary py-2.5 text-sm">
                免费咨询
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
