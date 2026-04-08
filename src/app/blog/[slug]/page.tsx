import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, blogPosts, getLatestBlogPosts } from "@/lib/data";

// ─── Static params (SSG) ──────────────────────────────────────────────────────

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image }],
    },
  };
}

// ─── Simple Markdown renderer (headings, paragraphs, lists) ──────────────────

function renderContent(markdown: string) {
  const lines = markdown.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let listItems: string[] = [];

  function flushList() {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key++} className="my-4 space-y-1.5 pl-5">
          {listItems.map((item, i) => (
            <li key={i} className="list-disc text-gray-600 text-sm leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }

    if (line.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={key++} className="mt-8 mb-3 text-xl font-bold text-gray-900">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={key++} className="mt-5 mb-2 text-base font-semibold text-gray-900">
          {line.slice(4)}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
    } else {
      flushList();
      elements.push(
        <p key={key++} className="mb-4 text-sm leading-7 text-gray-600">
          {line}
        </p>
      );
    }
  }
  flushList();
  return elements;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) notFound();

  const related = getLatestBlogPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gray-50 py-10">
        <div className="container">
          <nav className="mb-5 flex items-center gap-2 text-xs text-gray-400" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-600">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            <span>/</span>
            <span className="text-gray-600 truncate max-w-[200px]">{post.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-snug text-gray-900 sm:text-4xl text-balance">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
            <span>{post.author}</span>
            <span>·</span>
            <time dateTime={post.date}>{formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <article className="section">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_280px]">
            <div>
              {/* Cover image */}
              <div className="relative mb-8 h-64 overflow-hidden rounded-xl bg-gray-100 sm:h-80">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Article body */}
              <div className="prose-custom">
                {renderContent(post.content)}
              </div>

              {/* CTA */}
              <div className="mt-10 rounded-xl border border-green-100 bg-green-50 p-6">
                <h3 className="text-base font-semibold text-gray-900">
                  Have a technical question?
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Our engineering team is available to answer product selection questions,
                  provide datasheets, or discuss your specific application.
                </p>
                <Link href="/contact" className="btn-primary mt-4 inline-flex">
                  Contact Our Engineers
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                  About This Article
                </h3>
                <dl className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Author</dt>
                    <dd className="text-gray-700 font-medium text-right max-w-[140px]">{post.author}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Published</dt>
                    <dd className="text-gray-700 font-medium">{formattedDate}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-400">Reading time</dt>
                    <dd className="text-gray-700 font-medium">{post.readingTime} min</dd>
                  </div>
                </dl>
              </div>

              {related.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                    Related Articles
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link href={`/blog/${p.slug}`} className="group">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-snug">
                            {p.title}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">
                            {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Need Products?
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  Browse our full range of IEC-certified electrical protection products.
                </p>
                <Link href="/products" className="btn-primary mt-4 inline-flex w-full justify-center text-xs py-2">
                  View Products
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
