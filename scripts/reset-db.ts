import mongoose from "mongoose";
import { aboutData, blogData, educationData, experiencesData, projectsData, skillsInfo } from "../lib/data";
import { connectDB } from "../lib/mongodb";
import Blog from "../models/Blog";
import Project from "../models/Project";
import SiteContent from "../models/SiteContent";

const run = async () => {
  await connectDB();

  await Promise.all([Project.deleteMany({}), Blog.deleteMany({}), SiteContent.deleteMany({})]);

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

  await SiteContent.create({
    about: aboutData,
    skills: skillsInfo,
    experiences: experiencesData,
    educations: educationData,
    updatedAt: new Date()
  });

  await mongoose.disconnect();
  process.stdout.write("Database reset and reseed completed.\n");
};

run().catch(async (error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  await mongoose.disconnect();
  process.exit(1);
});
