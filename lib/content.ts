import { aboutData, blogData, educationData, experiencesData, projectsData, skillsInfo } from "@/lib/data";
import { normalizeStoredImageUrl } from "@/lib/media";
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
    const mappedItems = items.map((item, index: number) => ({
      id: index,
      _id: String(item._id),
      title: item.title,
      description: item.description,
      image: normalizeStoredImageUrl(item.image, "/assets/work_logo/pro.png"),
      tags: item.techStack || [],
      github: item.github,
      webapp: item.live,
      featured: item.featured,
      techStack: item.techStack || [],
      createdAt: new Date(item.createdAt).toISOString()
    }));
    const requiredProjectTitles = ["Research Lab Platform", "E-commerce Platform"];
    const existingTitles = new Set(mappedItems.map((item) => item.title.trim().toLowerCase()));
    const requiredProjects = projectsData
      .filter((item) => requiredProjectTitles.includes(item.title))
      .filter((item) => !existingTitles.has(item.title.trim().toLowerCase()))
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: normalizeStoredImageUrl(item.image, "/assets/work_logo/pro.png"),
        tags: item.techStack || item.tags,
        github: item.github,
        webapp: item.webapp,
        featured: item.featured,
        techStack: item.techStack || item.tags,
        createdAt: item.createdAt
      }));
    return [...mappedItems, ...requiredProjects]
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      .map((item, index) => ({ ...item, id: index }));
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
      coverImage: normalizeStoredImageUrl(item.coverImage, "/assets/blog/blog-nextjs.jpg"),
      tags: item.tags || [],
      publishedAt: new Date(item.publishedAt).toISOString()
    }));
  } catch {
    return blogData;
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    await connectDB();
    await seedDatabaseIfEmpty();
    const item = await Blog.findOne({ slug }).lean<BlogRecord | null>();
    if (!item) {
      const blogs = await getBlogs();
      return blogs.find((entry) => entry.slug === slug) || null;
    }
    return {
      _id: String(item._id),
      title: item.title,
      slug: item.slug,
      content: item.content,
      excerpt: item.excerpt,
      coverImage: normalizeStoredImageUrl(item.coverImage, "/assets/blog/blog-nextjs.jpg"),
      tags: item.tags || [],
      publishedAt: new Date(item.publishedAt).toISOString()
    };
  } catch {
    const blogs = await getBlogs();
    return blogs.find((entry) => entry.slug === slug) || null;
  }
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
    const currentExperiences = content.experiences || [];
    const univoluteTemplate = experiencesData.find((item) => item.company.toLowerCase().includes("univolute"));
    const hasUnivolute = currentExperiences.some((item) => item.company.toLowerCase().includes("univolute"));
    const ydcodersIndex = currentExperiences.findIndex((item) => item.company.toLowerCase().includes("ydcoders"));
    const maxId = currentExperiences.reduce((acc, item) => Math.max(acc, Number(item.id) || 0), 0);
    const experiences =
      hasUnivolute || !univoluteTemplate
        ? currentExperiences
        : ydcodersIndex >= 0
          ? [
              ...currentExperiences.slice(0, ydcodersIndex),
              { ...univoluteTemplate, id: maxId + 1 },
              ...currentExperiences.slice(ydcodersIndex)
            ]
          : [{ ...univoluteTemplate, id: maxId + 1 }, ...currentExperiences];
    return {
      about: {
        ...content.about,
        image: normalizeStoredImageUrl(content.about?.image || "", "/assets/Adesh.png")
      },
      skills: content.skills || [],
      experiences: experiences.map((item) => ({
        ...item,
        img: normalizeStoredImageUrl(item.img, "/assets/company_logo/ydcoders.png")
      })),
      educations: (content.educations || []).map((item) => ({
        ...item,
        img: normalizeStoredImageUrl(item.img, "/assets/education_logo/kit.png")
      }))
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
