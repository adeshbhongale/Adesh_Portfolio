"use client";

import { SkillCategory } from "@/lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

const Skills = ({ skills }: { skills: SkillCategory[] }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="skills" className="py-20 pb-20 px-[12vw] md:px-[7vw] lg:px-[15vw] font-sans relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white">SKILLS</h2>
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-lg font-semibold max-w-3xl mx-auto">
          A collection of my technical skills and expertise honed through various projects and experiences
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {skills.map((category, index) => (
          <div
            key={category.title}
            className={`overflow-hidden rounded-2xl border border-purple-600/10 bg-gradient-to-br from-purple-900/40 to-purple-800/20 backdrop-blur-sm transition-all duration-700 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/30 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            {/* Background gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-600/10 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

            {/* Content */}
            <div className="relative p-8 md:p-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center group-hover:text-purple-300 transition-colors duration-300">
                {category.title}
              </h3>

              <Tilt tiltMaxAngleX={12} tiltMaxAngleY={12} perspective={1000} scale={1.02} transitionSpeed={400} gyroscope>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group/skill flex flex-col items-center justify-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 p-3 sm:p-4 transition-all duration-300 hover:border-purple-500/60 hover:bg-purple-500/20 hover:shadow-md hover:shadow-purple-500/20"
                    >
                      <Image
                        src={skill.logo}
                        alt={`${skill.name} logo`}
                        width={40}
                        height={40}
                        className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 group-hover/skill:scale-110"
                      />
                      <span className="text-xs sm:text-sm text-gray-300 text-center font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </Tilt>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-500"></div>
          </div>
        ))}
      </div>

      <style jsx>{`
        div:hover {
          --tw-shadow: 0 0 30px rgba(130, 69, 236, 0.2);
          box-shadow: var(--tw-shadow);
        }
      `}</style>
    </section>
  );
};

export default Skills;
