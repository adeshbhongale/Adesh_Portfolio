import type { MetadataRoute } from "next";
import { getBlogs } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const blogs = await getBlogs();

  const staticRoutes = ["", "/about", "/projects", "/blog", "/contact"].map((route) => ({
    url: `${site}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8
  }));

  const blogRoutes = blogs.map((post) => ({
    url: `${site}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...blogRoutes];
}
