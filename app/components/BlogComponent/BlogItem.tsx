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
        <h1
          className="text-4xl font-bold leading-tight"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
        >
          {blog.title}
        </h1>
        <p
          className="mb-2 text-sm font-medium uppercase tracking-widest"
          style={{ color: "var(--color-ui-muted)", fontFamily: "var(--font-sans)" }}
        >
          {date}
          {blog.written_by && (
            <span style={{ color: "var(--color-text-secondary)" }}>
              {" · "}
              <span
                className="underline decoration-4 underline-offset-4"
                style={{
                  color: "var(--color-text-primary)",
                  textDecorationColor: "var(--color-accent-primary)",
                }}
              >
                {blog.written_by.username}
              </span>
            </span>
          )}
        </p>

        {blog.tags && blog.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {blog.cover_image_url && (
        <div className="mb-8 overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="h-auto w-full object-cover"
            style={{ maxHeight: "400px" }}
            loading="eager"
          />
        </div>
      )}

      <div
        className="blog-preview-content"
        dangerouslySetInnerHTML={{ __html: blog.content_html }}
      />
    </article>
  );
}
