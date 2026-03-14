import Blog from "@/models/Blog";
import Project from "@/models/Project";
import { blogData, projectsData } from "@/lib/data";
import { connectDB } from "@/lib/mongodb";

export const getProjects = async () => {
  try {
    await connectDB();
    const items = await Project.find().sort({ createdAt: -1 }).lean();
    if (!items.length) {
      return projectsData;
    }
    return items.map((item: any, index: number) => ({
      id: index,
      title: item.title,
      description: item.description,
      image: item.image,
      tags: item.techStack || [],
      github: item.github,
      webapp: item.live,
      featured: item.featured,
      techStack: item.techStack || [],
      createdAt: new Date(item.createdAt).toISOString()
    }));
  } catch {
    return projectsData;
  }
};

export const getBlogs = async () => {
  try {
    await connectDB();
    const items = await Blog.find().sort({ publishedAt: -1 }).lean();
    if (!items.length) {
      return blogData;
    }
    return items.map((item: any) => ({
      title: item.title,
      slug: item.slug,
      content: item.content,
      excerpt: item.excerpt,
      coverImage: item.coverImage,
      tags: item.tags || [],
      publishedAt: new Date(item.publishedAt).toISOString()
    }));
  } catch {
    return blogData;
  }
};

export const getBlogBySlug = async (slug: string) => {
  const blogs = await getBlogs();
  return blogs.find((item) => item.slug === slug) || null;
};
