"use client";

import Link from "next/link";
import type { BlogResponse } from "@/app/services/blogService";

interface BlogCardProps {
  blog: BlogResponse;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const excerpt =
    blog.content_html
      .replace(/<[^>]*>/g, " ")
      .split(/(?<=[.!?])\s+/, 1)[0]
      .slice(0, 150)
      .trim();

  const date = new Date(blog.updated_at).toLocaleDateString("en-US", {
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
      {blog.cover_image_url && (
        <div className="mb-4 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="h-48 w-full object-cover transition-transform duration-200 hover:scale-105"
          />
        </div>
      )}
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
