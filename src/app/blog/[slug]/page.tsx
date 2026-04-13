import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogPostBySlug, blogPosts, getLatestBlogPosts, getProductsByCategory } from "@/lib/data";
import TableOfContents, { type TocItem } from "@/components/TableOfContents";

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
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;
  return {
    title,
    description,
    keywords: post.metaKeywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [post.image],
    },
  };
}

// ─── TOC extraction ──────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const raw of markdown.split("\n")) {
    const line = raw.trim();
    if (line.startsWith("### ")) {
      const text = line.slice(4);
      items.push({ id: slugify(text), text, level: 3 });
    } else if (line.startsWith("## ")) {
      const text = line.slice(3);
      items.push({ id: slugify(text), text, level: 2 });
    }
  }
  return items;
}

// ─── FAQ extraction ──────────────────────────────────────────────────────────
// Extracts Q&A pairs from any H2 section whose heading starts with "Frequently Asked"
// or contains "FAQ". Each H3 under that section is treated as a question,
// and the following paragraphs (until the next H2/H3) are the answer.

interface FaqPair { question: string; answer: string; }

function extractFaqs(markdown: string): FaqPair[] {
  const lines = markdown.split("\n");
  const faqs: FaqPair[] = [];
  let inFaqSection = false;
  let currentQ: string | null = null;
  let currentA: string[] = [];

  const flush = () => {
    if (currentQ && currentA.length > 0) {
      faqs.push({ question: currentQ, answer: currentA.join(" ").trim() });
    }
    currentQ = null;
    currentA = [];
  };

  // Strip markdown formatting for schema (plain text)
  const strip = (s: string) => s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      flush();
      const heading = line.slice(3).toLowerCase();
      inFaqSection = heading.startsWith("frequently asked") || heading.includes("faq");
      continue;
    }
    if (!inFaqSection) continue;
    if (line.startsWith("### ")) {
      flush();
      currentQ = strip(line.slice(4));
    } else if (currentQ && line && !line.startsWith("<!--")) {
      currentA.push(strip(line));
    } else if (!line) {
      // blank line — paragraph break inside an answer, keep going
    }
  }
  flush();
  return faqs;
}

// ─── Simple Markdown renderer (headings, paragraphs, lists, bold, links, blockquotes) ──

/** Parse inline markdown: **bold** and [link](url) */
function parseInline(text: string): React.ReactNode[] {
  const tokens: React.ReactNode[] = [];
  // Regex matches **bold**, [text](url), or plain text segments
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) tokens.push(text.slice(last, m.index));
    if (m[1] != null) {
      // **bold**
      tokens.push(<strong key={`b${i++}`} className="font-semibold text-gray-800">{m[1]}</strong>);
    } else if (m[2] != null) {
      // [text](url)
      tokens.push(
        <a key={`a${i++}`} href={m[3]} className="text-green-700 underline hover:text-green-900">
          {m[2]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) tokens.push(text.slice(last));
  return tokens;
}

function renderContent(markdown: string) {
  const lines = markdown.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;
  let listItems: { text: string; ordered: boolean }[] = [];
  let listOrdered = false;

  function flushList() {
    if (listItems.length === 0) return;
    if (listOrdered) {
      elements.push(
        <ol key={key++} className="my-4 space-y-1.5 pl-5">
          {listItems.map((item, i) => (
            <li key={i} className="list-decimal text-gray-600 text-sm leading-relaxed">
              {parseInline(item.text)}
            </li>
          ))}
        </ol>
      );
    } else {
      elements.push(
        <ul key={key++} className="my-4 space-y-1.5 pl-5">
          {listItems.map((item, i) => (
            <li key={i} className="list-disc text-gray-600 text-sm leading-relaxed">
              {parseInline(item.text)}
            </li>
          ))}
        </ul>
      );
    }
    listItems = [];
  }

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flushList(); continue; }

    // Skip HTML comments
    if (line.startsWith("<!--") || line.startsWith("-->") || line.includes("<!--")) continue;

    if (line.startsWith("## ")) {
      flushList();
      const text = line.slice(3);
      elements.push(
        <h2 key={key++} id={slugify(text)} className="mt-8 mb-3 text-xl font-bold text-gray-900 scroll-mt-20">
          {text}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      flushList();
      const text = line.slice(4);
      elements.push(
        <h3 key={key++} id={slugify(text)} className="mt-5 mb-2 text-base font-semibold text-gray-900 scroll-mt-20">
          {text}
        </h3>
      );
    } else if (line.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={key++} className="my-4 border-l-4 border-green-500 bg-green-50 py-3 px-4 rounded-r-lg">
          <p className="text-sm leading-7 text-gray-700 italic">
            {parseInline(line.slice(2))}
          </p>
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      listOrdered = false;
      listItems.push({ text: line.slice(2), ordered: false });
    } else if (/^\d+\.\s/.test(line)) {
      listOrdered = true;
      listItems.push({ text: line.replace(/^\d+\.\s/, ""), ordered: true });
    } else if (/^!\[([^\]]*)\]\(([^)]+)\)$/.test(line)) {
      flushList();
      const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imgMatch) {
        const [, alt, src] = imgMatch;
        elements.push(
          <div key={key++} className="relative my-6 overflow-hidden rounded-xl bg-gray-100" style={{ aspectRatio: "16/9" }}>
            <Image src={src} alt={alt} fill className="object-cover" />
          </div>
        );
      }
    } else {
      flushList();
      elements.push(
        <p key={key++} className="mb-4 text-sm leading-7 text-gray-600">
          {parseInline(line)}
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
  const relatedProducts = post.relatedCategorySlug
    ? getProductsByCategory(post.relatedCategorySlug).slice(0, 3)
    : [];
  const toc = extractToc(post.content);
  const faqs = extractFaqs(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  // ─── JSON-LD structured data ────────────────────────────────────────────────
  const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.cnsoltree.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http") ? post.image : `${siteUrl}${post.image}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: [imageUrl],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.dateModified || post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author,
      url: `${siteUrl}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Cnsoltree",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/images/favicon.png`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    keywords: post.metaKeywords,
    articleSection: post.tags?.[0],
    inLanguage: "en-US",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

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
              <div className="relative mb-8 aspect-[1200/650] overflow-hidden rounded-xl bg-gray-100">
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
                {(() => {
                  const all = renderContent(post.content);
                  // Find the first H2 element to insert TOC before it
                  const firstH2Idx = all.findIndex(
                    (el) => typeof el === "object" && el !== null && "type" in el && (el as React.ReactElement).type === "h2"
                  );
                  if (firstH2Idx <= 0 || toc.length === 0) return all;
                  const before = all.slice(0, firstH2Idx);
                  const after = all.slice(firstH2Idx);
                  return (
                    <>
                      {before}
                      <TableOfContents items={toc} />
                      {after}
                    </>
                  );
                })()}
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

              {/* Factory Direct */}
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="relative h-36 w-full">
                  <Image
                    src="/images/factory.jpg"
                    alt="Cnsoltree factory — IEC-certified electrical component manufacturer"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-sm font-bold tracking-wide text-white">
                    Factory Direct
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-xs leading-relaxed text-gray-500">
                    IEC-certified manufacturer of low-voltage electrical protection products. OEM &amp; private label available.
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-3">
                    <div className="relative h-8 w-8">
                      <Image src="/images/ce.png" alt="CE certified" fill className="object-contain" />
                    </div>
                    <div className="relative h-8 w-12">
                      <Image src="/images/TUV.png" alt="TUV certified" fill className="object-contain" />
                    </div>
                    <div className="relative h-8 w-12">
                      <Image src="/images/rohs.png" alt="RoHS compliant" fill className="object-contain" />
                    </div>
                  </div>
                  <Link href="/contact" className="btn-primary mt-4 inline-flex w-full justify-center text-xs py-2">
                    Request a Quote
                  </Link>
                </div>
              </div>
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

              {relatedProducts.length > 0 ? (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                    Featured Products
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {relatedProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          href={`/products/${product.slug}`}
                          className="group flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2.5 hover:border-green-200 hover:bg-green-50 transition-colors"
                        >
                          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-white">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium leading-snug text-gray-800 group-hover:text-green-700 transition-colors line-clamp-2">
                              {product.name}
                            </p>
                            <p className="mt-1 text-[11px] text-green-600 font-medium">
                              View Product →
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/categories/${post.relatedCategorySlug}`} className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-200 py-2 text-xs font-medium text-gray-600 hover:border-green-300 hover:text-green-700 transition-colors">
                    View All Products →
                  </Link>
                </div>
              ) : (
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="text-sm font-semibold text-gray-900">Need Products?</h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    Browse our full range of IEC-certified electrical protection products.
                  </p>
                  <Link href="/products" className="btn-primary mt-4 inline-flex w-full justify-center text-xs py-2">
                    View Products
                  </Link>
                </div>
              )}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
