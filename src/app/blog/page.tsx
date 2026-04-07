import type { Metadata } from "next";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles, selection guides, and installation best practices from Cnsoltree engineers — covering circuit breakers, SPDs, ATS, PV systems, and more.",
};

// Collect all unique tags
const allTags = Array.from(
  new Set(blogPosts.flatMap((p) => p.tags))
).sort();

export default function BlogPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      {/* Header */}
      <section className="border-b border-gray-100 bg-gray-50 py-12">
        <div className="container">
          <nav className="mb-4 flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <span className="text-gray-600">Blog</span>
          </nav>
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Technical Resources
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-500">
            Selection guides, installation tips, and technical insights from the Cnsoltree engineering team.
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sorted.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="container max-w-2xl text-center">
          <h2 className="text-xl font-bold text-gray-900">
            Stay Updated with Technical Guides
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            New articles on electrical protection, energy efficiency, and smart building technology every month.
          </p>
          <Link href="/contact" className="btn-primary mt-6 inline-flex">
            Subscribe via Contact Form
          </Link>
        </div>
      </section>
    </>
  );
}
