import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Work from "@/components/Work";
import { getProjects } from "@/lib/content";

export const dynamic = "force-static";

export default async function ProjectsPage() {
  const projects = await getProjects();
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: projects.map((project, index) => ({
      "@type": "CreativeWork",
      position: index + 1,
      name: project.title,
      description: project.description,
      url: project.webapp
    }))
  };

  return (
    <div className="bg-[#050414] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }} />
      <div className="relative pt-20">
        <Navbar />
        <Work projects={projects} />
        <Footer />
      </div>
    </div>
  );
}
