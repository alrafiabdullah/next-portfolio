"use client";

import { type BlogResponse } from "@/app/services/blogService";
import BlogCard from "../BlogComponent/BlogCard";

interface HomeProps {
  initialBlogs: BlogResponse[];
}

export const Home = ({ initialBlogs }: HomeProps) => {
  const blogs = initialBlogs;

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">
      <h1
        className="mb-6 text-3xl font-bold"
        style={{ fontFamily: "var(--font-sans)", color: "var(--color-text-primary)" }}
      >
        Latest Posts
      </h1>

      {blogs.length === 0 ? (
        <p style={{ color: "var(--color-text-secondary)" }}>No blog posts yet. Check back soon!</p>
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
