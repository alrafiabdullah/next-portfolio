"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBlog, type BlogResponse } from "@/app/services/blogService";
import BlogItem from "@/app/components/BlogComponent/BlogItem";
import Link from "next/link";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.id as string | undefined;
  // URL format: /blog/{slug}-{uuid} — extract the UUID (8-4-4-4-12 hex format)
  const uuidMatch = slug?.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  const blogId = uuidMatch ? uuidMatch[0] : slug;
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!blogId) return;
    getBlog(blogId)
      .then(setBlog)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [blogId]);

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
        <div className="animate-pulse">
          <div
            className="mb-4 h-4 w-32 rounded"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
          />
          <div
            className="mb-8 h-10 w-3/4 rounded"
            style={{ backgroundColor: "var(--color-bg-secondary)" }}
          />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-4 rounded"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  width: `${90 - i * 10}%`,
                }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-12 text-center">
        <h1
          className="mb-4 text-2xl font-bold"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Post not found
        </h1>
        <p className="mb-6" style={{ color: "var(--color-text-secondary)" }}>
          The blog post you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/" className="btn-primary !text-white no-underline">
          Back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium no-underline"
        style={{ color: "var(--color-text-secondary)", fontFamily: "var(--font-sans)" }}
      >
        ← Back to posts
      </Link>
      <BlogItem blog={blog} />
    </main>
  );
}
