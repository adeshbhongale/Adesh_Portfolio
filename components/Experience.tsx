import { ExperienceItem } from "@/lib/data";
import Image from "next/image";

const Experience = ({ experiences }: { experiences: ExperienceItem[] }) => {
  return (
    <section id="experience" className="py-20 pb-20 px-4 md:px-[7vw] lg:px-[15vw] font-sans">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">EXPERIENCE</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
        <p className="text-gray-300 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          A collection of my work experience and the roles I have taken in various organizations
        </p>
      </div>

      <div className="relative">
        {/* Timeline line - responsive */}
        <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-purple-400 to-pink-500"></div>

        {experiences.map((experience, index) => (
          <div key={experience.id} className="relative mb-8 md:mb-10">
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#050414] border-2 md:border-3 border-purple-500 flex items-center justify-center z-10">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </div>

            {/* Content card */}
            <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-auto md:pr-16 md:w-1/2" : "md:ml-auto md:pl-16 md:w-1/2"}`}>
              <div className="group relative p-5 md:p-6 rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm hover:border-purple-500/60 hover:bg-purple-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
                {/* Accent line */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-t-xl"></div>

                {/* Company header */}
                <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-lg bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center flex-col">
                    <Image
                      src={experience.img}
                      alt={experience.company}
                      width={80}
                      height={80}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">{experience.role}</h3>
                  </div>
                </div>
                <p className="text-purple-400 font-medium text-sm md:text-base ml-12 md:ml-0 md:mb-1">{experience.company}</p>
                <p className="text-xs md:text-sm text-gray-400 ml-12 md:ml-0 mb-3 md:mb-4">{experience.date}</p>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed mb-3 md:mb-4">{experience.desc}</p>

                {/* Skills */}
                <div>
                  <p className="text-xs font-semibold text-purple-300 uppercase tracking-wide mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {experience.skills.slice(0, 4).map((skill) => (
                      <span
                        key={`${experience.id}-${skill}`}
                        className="px-2 py-0.5 text-xs rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50 text-purple-200 hover:border-purple-400 hover:text-purple-100 transition-all duration-300 whitespace-nowrap"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
