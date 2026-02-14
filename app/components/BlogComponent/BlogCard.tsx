"use client";

import Link from "next/link";
import { useState } from "react";
import type { HomeBlogResponse } from "@/app/services/blogService";

interface BlogCardProps {
  blog: HomeBlogResponse;
}

export default function BlogCard({ blog }: BlogCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const date = new Date(blog.updated_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${blog.slug}-${blog.id}`}
      className="card group block no-underline transition-[transform,shadow,ring-color] duration-500 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl hover:ring-1"
      style={{
        flex: "1 1 calc(33.333% - 1rem)",
        minWidth: "240px",
        maxWidth: "360px",
        borderColor: "var(--color-border-muted)",
        ["--tw-ring-color" as any]: "var(--color-accent-primary)", // Use accent color for ring
        textDecoration: "none",
      }}
    >
      {blog.cover_image_url && (
        <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
          {!imageLoaded && (
            <div className="absolute inset-0 z-10 animate-shimmer rounded-lg" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className={`h-48 w-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105 ${imageLoaded ? "opacity-100 scale-100" : "absolute inset-0 opacity-0 scale-95"
              }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            ref={(img) => {
              if (img && img.complete) {
                setImageLoaded(true);
              }
            }}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <p
        className="mb-1 text-xs font-medium uppercase tracking-widest"
        style={{ color: "var(--color-ui-muted)", fontFamily: "var(--font-sans)" }}
      >
        <span className="underline decoration-1 underline-offset-4">{date}</span>
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
      <h3
        className="mb-2 text-lg font-bold leading-snug transition-colors duration-300 ease-in-out group-hover:text-[var(--color-accent-primary)]"
        style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
      >
        {blog.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-text-secondary)", marginBottom: 0 }}
      >
        {blog.excerpt}
      </p>
      {blog.tags && blog.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--color-bg-main)",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border-muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
