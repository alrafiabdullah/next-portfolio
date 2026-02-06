"use client";

import Link from "next/link";
import type { BlogResponse } from "@/app/services/blogService";

interface BlogCardProps {
  blog: BlogResponse;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const excerpt =
    blog.content_html
      .replace(/<[^>]*>/g, "")
      .slice(0, 150)
      .trim() + (blog.content_html.length > 150 ? "…" : "");

  const date = new Date(blog.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${blog.slug}-${blog.id}`}
      className="card block no-underline transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{ flex: "1 1 calc(33.333% - 1rem)", minWidth: "240px", maxWidth: "360px" }}
    >
      <p
        className="mb-1 text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--color-ui-muted)", fontFamily: "var(--font-sans)" }}
      >
        {date}
        {blog.is_draft && (
          <span
            className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{
              backgroundColor: "var(--color-accent-secondary)",
              color: "#fff",
            }}
          >
            Draft
          </span>
        )}
      </p>
      <h2
        className="mb-2 text-lg font-bold leading-snug"
        style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
      >
        {blog.title}
      </h2>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)", marginBottom: 0 }}
      >
        {excerpt}
      </p>
    </Link>
  );
}
