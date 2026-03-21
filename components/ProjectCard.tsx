import { ProjectItem } from "@/lib/data";
import Image from "next/image";

type ProjectCardProps = {
  project: ProjectItem;
  onSelect: (project: ProjectItem) => void;
};

const ProjectCard = ({ project, onSelect }: ProjectCardProps) => {
  return (
    <div
      onClick={() => onSelect(project)}
      className="group relative border border-white/30 bg-gradient-to-br from-gray-900 to-gray-950 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:-translate-y-3 hover:border-purple-500/50 transition-all duration-500 w-full min-w-[500px] max-w-[500px] hover:scale-105"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 transition-all duration-500 z-10"></div>

      {/* Image Container */}
      <div className="p-4 relative overflow-hidden bg-[#0e0b1f]">
        <Image
          src={project.image}
          alt={project.title}
          width={800}
          height={500}
          unoptimized
          className="w-full h-50 object-contain rounded-xl transition-transform duration-700"
        />
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      {/* Content Container */}
      <div className="p-6 relative z-20">
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-4 pt-2 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={`${project.id}-${tag}`}
              className="inline-block bg-gradient-to-r from-[#251f38] to-[#2a1f45] text-xs font-semibold text-purple-400 rounded-full px-3 py-1 border border-purple-500/30 group-hover:border-purple-500/60 group-hover:text-purple-300 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="inline-block text-xs font-semibold text-gray-500 px-3 py-1">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Hover indicator */}
        <div className="flex items-center gap-2 text-purple-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
          <span>Click to view details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Bottom accent line animation */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-purple-600 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
};

export default ProjectCard;
