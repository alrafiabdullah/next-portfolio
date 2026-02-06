"use client";

import type { BlogResponse } from "@/app/services/blogService";

interface BlogItemProps {
  blog: BlogResponse;
}

export default function BlogItem({ blog }: BlogItemProps) {
  const date = new Date(blog.published_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mx-auto w-full max-w-3xl">
      <header className="mb-8">
        <p
          className="mb-2 text-sm font-medium uppercase tracking-widest"
          style={{ color: "var(--color-ui-muted)", fontFamily: "var(--font-sans)" }}
        >
          {date}
          {blog.written_by && (
            <span style={{ color: "var(--color-text-secondary)" }}> · {blog.written_by}</span>
          )}
        </p>
        <h1
          className="text-4xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
        >
          {blog.title}
        </h1>
      </header>

      <div
        className="blog-preview-content"
        dangerouslySetInnerHTML={{ __html: blog.content_html }}
      />
    </article>
  );
}
