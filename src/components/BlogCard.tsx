import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/lib/data";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card group flex flex-col"
      aria-label={post.title}
    >
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mt-3 text-sm font-semibold leading-snug text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="mt-2 flex-1 text-xs leading-relaxed text-gray-500 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
          <span>{formattedDate}</span>
          <span>{post.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
