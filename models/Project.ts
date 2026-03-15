import { Schema, model, models } from "mongoose";

export type ProjectDocument = {
  title: string;
  description: string;
  image: string;
  github: string;
  live: string;
  techStack: string[];
  featured: boolean;
  createdAt: Date;
};

const projectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    github: { type: String, required: true, trim: true },
    live: { type: String, required: true, trim: true },
    techStack: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

const Project = models.Project || model<ProjectDocument>("Project", projectSchema);

export default Project;
