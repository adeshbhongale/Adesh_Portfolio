import fs from "fs/promises";
import mongoose from "mongoose";
import path from "path";
import { aboutData, blogData, educationData, experiencesData, projectsData, skillsInfo } from "../lib/data";
import { connectDB } from "../lib/mongodb";
import Blog from "../models/Blog";
import Project from "../models/Project";
import SiteContent from "../models/SiteContent";
import Upload from "../models/Upload";

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

  // Seed images referenced in data into Upload collection
  const collectImagePaths = new Set<string>();
  const pushIfAsset = (p?: string) => {
    if (p && p.startsWith("/assets")) collectImagePaths.add(p);
  };
  pushIfAsset(aboutData.image);
  experiencesData.forEach((e) => pushIfAsset(e.img));
  educationData.forEach((e) => pushIfAsset(e.img));
  projectsData.forEach((p) => pushIfAsset(p.image));
  blogData.forEach((b) => pushIfAsset(b.coverImage));

  if (collectImagePaths.size > 0) {
    await Upload.deleteMany({});
    for (const rel of Array.from(collectImagePaths)) {
      try {
        const fsPath = path.join(process.cwd(), "public", rel.replace(/^\//, ""));
        const data = await fs.readFile(fsPath);
        const filename = path.basename(fsPath);
        await Upload.create({ filename, originalName: filename, contentType: "image/png", data });
      } catch (err) {
        // ignore missing files
      }
    }
  }

  await mongoose.disconnect();
  process.stdout.write("Database reset and reseed completed.\n");
};

run().catch(async (error) => {
  process.stderr.write(`${error instanceof Error ? error.message : "Unknown error"}\n`);
  await mongoose.disconnect();
  process.exit(1);
});
