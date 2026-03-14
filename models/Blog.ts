import { Schema, model, models } from "mongoose";

export type BlogDocument = {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: Date;
};

const blogSchema = new Schema<BlogDocument>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true, trim: true },
    coverImage: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

const Blog = models.Blog || model<BlogDocument>("Blog", blogSchema);

export default Blog;
