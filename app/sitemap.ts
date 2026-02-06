import type { MetadataRoute } from "next";
import { getBlogs } from "@/app/services/blogService";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = headersList.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Dynamic blog routes
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const blogs = await getBlogs();
    blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}-${blog.id}`,
      lastModified: new Date(blog.updated_at || blog.published_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch {
    // If API is unreachable, return only static routes
  }

  return [...staticRoutes, ...blogRoutes];
}
