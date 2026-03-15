import { Schema, model, models } from "mongoose";

type SkillItemDocument = {
  name: string;
  logo: string;
};

type SkillCategoryDocument = {
  title: string;
  skills: SkillItemDocument[];
};

type ExperienceDocument = {
  id: number;
  img: string;
  role: string;
  company: string;
  date: string;
  desc: string;
  skills: string[];
};

type EducationDocument = {
  id: number;
  img: string;
  school: string;
  date: string;
  grade: string;
  desc: string;
  degree: string;
};

type AboutDocument = {
  headline: string;
  subheadline: string;
  description: string;
  cvUrl: string;
  image: string;
};

export type SiteContentDocument = {
  about: AboutDocument;
  skills: SkillCategoryDocument[];
  experiences: ExperienceDocument[];
  educations: EducationDocument[];
  updatedAt: Date;
};

const skillItemSchema = new Schema<SkillItemDocument>(
  {
    name: { type: String, required: true, trim: true },
    logo: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const skillCategorySchema = new Schema<SkillCategoryDocument>(
  {
    title: { type: String, required: true, trim: true },
    skills: { type: [skillItemSchema], default: [] }
  },
  { _id: false }
);

const experienceSchema = new Schema<ExperienceDocument>(
  {
    id: { type: Number, required: true },
    img: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    skills: { type: [String], default: [] }
  },
  { _id: false }
);

const educationSchema = new Schema<EducationDocument>(
  {
    id: { type: Number, required: true },
    img: { type: String, required: true, trim: true },
    school: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    grade: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },
    degree: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const aboutSchema = new Schema<AboutDocument>(
  {
    headline: { type: String, required: true, trim: true },
    subheadline: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    cvUrl: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }
  },
  { _id: false }
);

const siteContentSchema = new Schema<SiteContentDocument>(
  {
    about: { type: aboutSchema, required: true },
    skills: { type: [skillCategorySchema], default: [] },
    experiences: { type: [experienceSchema], default: [] },
    educations: { type: [educationSchema], default: [] },
    updatedAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

const SiteContent = models.SiteContent || model<SiteContentDocument>("SiteContent", siteContentSchema);

export default SiteContent;
