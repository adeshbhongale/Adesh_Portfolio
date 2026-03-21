"use client";

import ProjectCard from "@/components/ProjectCard";
import { ProjectItem } from "@/lib/data";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Work = ({ projects }: { projects: ProjectItem[] }) => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="work" className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans relative overflow-hidden">
      {/* Animated Title Section */}
      <div className="text-center mb-16" ref={containerRef}>
        <h2
          className={`text-4xl font-bold text-white transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          PROJECTS
        </h2>
        <div
          className={`w-32 h-1 bg-purple-500 mx-auto mt-4 transition-all duration-1000 ${isLoaded ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
            }`}
          style={{ transformOrigin: "center" }}
        ></div>
        <p
          className={`text-gray-400 mt-4 text-lg font-semibold transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          A showcase of the projects I have worked on, highlighting my skills and experience in various technologies
        </p>
      </div>

      {/* Project Cards Container with Scroll Snap */}
      <div
        ref={scrollContainerRef}
        className="flex gap-7 overflow-x-auto pb-8 pt-8 px-2 -mx-2 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:#8245ec_#251f38] hover:[scrollbar-width:auto]"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`flex-shrink-0 snap-start transition-all duration-700 ${isLoaded
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
              }`}
            style={{
              transitionDelay: `${index < 2 ? index * 200 : 400}ms`
            }}
          >
            {/* Floating animation wrapper */}
            <div className="animate-float" style={{
              animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${index * 0.1}s`
            }}>
              <ProjectCard project={project} onSelect={setSelectedProject} />
            </div>
          </div>
        ))}
      </div>

      {/* Scroll hint for desktop */}
      {projects.length > 2 && (
        <div className="flex justify-center mt-8 gap-2 animate-bounce">
          <div className="w-2 h-2 rounded-full bg-purple-500/60"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500/40"></div>
          <div className="w-2 h-2 rounded-full bg-purple-500/20"></div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-all duration-300 ${selectedProject ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#121025] shadow-2xl transition-all duration-300 transform ${selectedProject ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute right-4 top-4 rounded-full border border-white/20 px-3 py-1 text-sm text-slate-200 hover:bg-white/10 hover:border-white/40 transition-all duration-300 z-10"
              aria-label="Close project detail"
            >
              Close
            </button>

            {/* Modal Content */}
            <div className="grid gap-0 md:grid-cols-2">
              {/* Image Section */}
              <div className="relative h-60 md:h-full bg-[#0e0b1f] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent"></div>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  unoptimized
                  className="object-contain p-4 transition-transform duration-300"
                />
              </div>

              {/* Details Section */}
              <div className="p-6 md:p-8 space-y-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{selectedProject.title}</h3>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{selectedProject.description}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={`${selectedProject.id}-${tag}`}
                      className="rounded-full border border-white/20 px-3 py-1 text-xs text-purple-300 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                {selectedProject.showButtons !== false && (
                  <div className="flex flex-wrap gap-3 pt-4">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-200 hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:shadow-lg hover:shadow-white/10"
                    >
                      View Code
                    </a>
                    <a
                      href={selectedProject.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg bg-gradient-to-r from-[#8245ec] to-[#6d37d4] px-4 py-2 text-sm font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      View Live
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        /* Custom scrollbar styles */
        div::-webkit-scrollbar {
          height: 8px;
        }

        div::-webkit-scrollbar-track {
          background: #251f38;
          border-radius: 10px;
        }

        div::-webkit-scrollbar-thumb {
          background: #8245ec;
          border-radius: 10px;
          transition: background 0.3s;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: #a16de8;
        }
      `}</style>
    </section>
  );
};

export default Work;
