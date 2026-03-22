import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = false;

export const metadata: Metadata = {
  title: "About Adesh Bhongale | Full Stack Developer Profile",
  description:
    "Learn about Adesh Bhongale - Full Stack & MERN Developer with expertise in Next.js, React, Node.js, and MongoDB. View my professional background, skills, and experience.",
  keywords: [
    "Adesh Bhongale",
    "About",
    "Full Stack Developer",
    "MERN Developer",
    "Professional Profile",
    "Developer Biography",
    "Tech Skills",
    "Software Engineer"
  ],
  openGraph: {
    title: "About Adesh Bhongale | Full Stack Developer",
    description:
      "Discover Adesh Bhongale's professional profile, expertise, and journey in Full Stack & MERN development.",
    type: "profile"
  }
};

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <div className="bg-[#050414] min-h-screen">
      <div className="relative pt-20">
        <Navbar />
        <About about={content.about} />
        <Footer />
      </div>
    </div>
  );
}
