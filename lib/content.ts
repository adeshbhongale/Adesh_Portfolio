import { aboutData, blogData, educationData, experiencesData, projectsData, skillsInfo } from "@/lib/data";
import { connectDB } from "@/lib/mongodb";
import Blog, { BlogDocument } from "@/models/Blog";
import Project, { ProjectDocument } from "@/models/Project";
import SiteContent, { SiteContentDocument } from "@/models/SiteContent";

type ProjectRecord = ProjectDocument & { _id: unknown };
type BlogRecord = BlogDocument & { _id: unknown };
type SiteContentRecord = SiteContentDocument & { _id: unknown };

const seedDatabaseIfEmpty = async () => {
  const [projectCount, blogCount, contentCount] = await Promise.all([Project.countDocuments(), Blog.countDocuments(), SiteContent.countDocuments()]);

  if (projectCount === 0) {
    await Project.insertMany(
      projectsData.map((item) => ({
        title: item.title,
        description: item.description,
        image: item.image,
        github: item.github,
        live: item.webapp,
        techStack: item.techStack || item.tags,
        featured: Boolean(item.featured),
        createdAt: item.createdAt ? new Date(item.createdAt) : new Date()
      }))
    );
  }

  if (blogCount === 0) {
    await Blog.insertMany(
      blogData.map((item) => ({
        title: item.title,
        slug: item.slug,
        content: item.content,
        excerpt: item.excerpt,
        coverImage: item.coverImage,
        tags: item.tags,
        publishedAt: new Date(item.publishedAt)
      }))
    );
  }

  if (contentCount === 0) {
    await SiteContent.create({
      about: aboutData,
      skills: skillsInfo,
      experiences: experiencesData,
      educations: educationData,
      updatedAt: new Date()
    });
  }
};

export const getProjects = async () => {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const items = await Project.find().sort({ createdAt: -1 }).lean<ProjectRecord[]>();
    if (!items.length) {
      return projectsData;
    }
    return items.map((item, index: number) => ({
      id: index,
      _id: String(item._id),
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
    await seedDatabaseIfEmpty();
    const items = await Blog.find().sort({ publishedAt: -1 }).lean<BlogRecord[]>();
    if (!items.length) {
      return blogData;
    }
    return items.map((item) => ({
      _id: String(item._id),
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

export const getSiteContent = async () => {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const content = await SiteContent.findOne().lean<SiteContentRecord | null>();
    if (!content) {
      return {
        about: aboutData,
        skills: skillsInfo,
        experiences: experiencesData,
        educations: educationData
      };
    }
    return {
      about: content.about,
      skills: content.skills || [],
      experiences: content.experiences || [],
      educations: content.educations || []
    };
  } catch {
    return {
      about: aboutData,
      skills: skillsInfo,
      experiences: experiencesData,
      educations: educationData
    };
  }
};
