import About from "@/components/About";
import BlogPreview from "@/components/BlogPreview";
import BlurBlob from "@/components/BlurBlob";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import { getBlogs, getProjects, getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Adesh Bhongale | Full Stack Developer | MERN Expert",
  description:
    "Adesh Bhongale - Full Stack & MERN Developer. Expert in Next.js, React, Node.js, MongoDB. Building scalable web applications. View portfolio, projects, and blogs.",
  keywords: [
    "Adesh Bhongale",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "Web Developer",
    "Software Engineer",
    "Portfolio",
    "Tech Developer",
    "JavaScript Expert",
    "TypeScript Developer"
  ],
  openGraph: {
    title: "Adesh Bhongale | Full Stack Developer | MERN Expert",
    description:
      "Adesh Bhongale - Expert Full Stack & MERN Developer. Specialized in Next.js, React, and Node.js. Explore my projects, experience, and technical expertise.",
    type: "website"
  }
};

export default async function HomePage() {
  const [projects, content, blogs] = await Promise.all([getProjects(), getSiteContent(), getBlogs()]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adesh Bhongale",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    image: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/assets/Adesh.png`,
      width: 400,
      height: 400
    },
    sameAs: [
      "https://github.com/adeshbhongale",
      "https://www.linkedin.com/in/adesh-bhongale-58830025b"
    ],
    jobTitle: "Full Stack Developer",
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful APIs",
      "Web Development",
      "Full Stack Development",
      "MERN Stack",
      "Tailwind CSS"
    ],
    expertise: [
      "Full Stack Web Development",
      "Frontend Development",
      "Backend Development",
      "MERN Stack Development",
      "Web Application Development"
    ]
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adesh Bhongale Portfolio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
    creator: {
      "@type": "Person",
      name: "Adesh Bhongale"
    }
  };

  return (
    <div className="bg-[#050414]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <BlurBlob position={{ top: "35%", left: "20%" }} size={{ width: "30%", height: "40%" }} />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      <div className="relative pt-20">
        <Navbar />
        <About about={content.about} />
        <Skills skills={content.skills} />
        <Experience experiences={content.experiences} />
        <Work projects={projects} />
        <Education educations={content.educations} />
        <BlogPreview blogs={blogs} />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
