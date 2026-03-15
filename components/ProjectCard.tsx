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
      className="border border-white bg-gray-900 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden cursor-pointer hover:shadow-purple-500/50 hover:-translate-y-2 transition-transform duration-300 w-full max-w-[500px] mx-auto"
    >
      <div className="p-4">
        <Image src={project.image} alt={project.title} width={800} height={500} className="w-full h-50 object-cover rounded-xl" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-500 mb-4 pt-4 line-clamp-3">{project.description}</p>
        <div className="mb-4">
          {project.tags.map((tag) => (
            <span key={`${project.id}-${tag}`} className="inline-block bg-[#251f38] text-xs font-semibold text-purple-500 rounded-full px-2 py-1 mr-2 mb-2">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
