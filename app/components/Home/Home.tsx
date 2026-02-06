"use client";

import BlogItem from "../BlogComponent/BlogItem";

export const Home = () => {
    const blogArr = [
        {
            title: "Blog Post 1",
            description: "This is a description of blog post 1.",
            imageUrl: "https://via.placeholder.com/400x200",
            href: "/blogs/post-1"
        },
        {
            title: "Blog Post 2",
            description: "This is a description of blog post 2.",
            imageUrl: "https://via.placeholder.com/400x200",
            href: "/blogs/post-2"
        },
        {
            title: "Blog Post 3",
            description: "This is a description of blog post 3.",
            imageUrl: "https://via.placeholder.com/400x200",
            href: "/blogs/post-3"
        }
    ]

  return (
    <main className="text-center">
      {blogArr.map((blog, index) => (
            <BlogItem key={index} {...blog} />
      ))}
      <p className="text-lg mb-6">Share your thoughts and ideas with the world.</p>
    </main>
  )
}
