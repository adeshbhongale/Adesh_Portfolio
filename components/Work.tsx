"use client";

import ProjectCard from "@/components/ProjectCard";
import { ProjectItem } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";

const Work = ({ projects }: { projects: ProjectItem[] }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="work" className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">PROJECTS</h2>
        <div className="w-32 h-1 bg-purple-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold">
          A showcase of the projects I have worked on, highlighting my skills and experience in various technologies
        </p>
      </div>

      <div className="grid gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
        ))}
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#121025] shadow-2xl">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-sm text-slate-200 hover:bg-white/10"
              aria-label="Close project detail"
            >
              Close
            </button>
            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative h-60 md:h-full bg-[#0e0b1f]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  unoptimized
                  className="object-contain p-4"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
                <p className="text-gray-300 mb-5 text-sm md:text-base">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span key={`${selectedProject.id}-${tag}`} className="rounded-full border border-white/20 px-2 py-1 text-xs text-purple-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10"
                  >
                    View Code
                  </a>
                  <a
                    href={selectedProject.webapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-[#8245ec] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6d37d4]"
                  >
                    View Live
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Work;
