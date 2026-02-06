"use client";

import { useEffect, useState } from "react";
import { getBlogs, type BlogResponse } from "@/app/services/blogService";
import BlogCard from "../BlogComponent/BlogCard";

export const Home = () => {
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(setBlogs)
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">
      <h1
        className="mb-6 text-3xl font-bold"
        style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
      >
        Latest Posts
      </h1>

      {loading ? (
        <div className="flex flex-wrap gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="card animate-pulse"
              style={{ width: "100%", maxWidth: "360px", height: "160px" }}
            />
          ))}
        </div>
      ) : blogs.length === 0 ? (
        <p style={{ color: "var(--color-text-secondary)" }}>
          No blog posts yet. Check back soon!
        </p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </main>
  );
};
