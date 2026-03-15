"use client";

import { SkillCategory } from "@/lib/data";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const Skills = ({ skills }: { skills: SkillCategory[] }) => (
  <section id="skills" className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans bg-skills-gradient clip-path-custom">
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white">SKILLS</h2>
      <div className="w-24 h-1 bg-[#8245ec] mx-auto mt-2"></div>
      <p className="text-gray-400 mt-4 text-lg font-semibold">
        A collection of my technical skills and expertise honed through various projects and experiences
      </p>
    </div>

    <div className="grid grid-cols-1 gap-5 py-10 md:grid-cols-2">
      {skills.map((category) => (
        <div
          key={category.title}
          className="skill-card-motion bg-gray-900 backdrop-blur-md px-6 sm:px-8 py-8 sm:py-6 rounded-2xl border border-white shadow-[0_0_20px_1px_rgba(130,69,236,0.3)]"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-5 text-center">{category.title}</h3>
          <Tilt key={category.title} tiltMaxAngleX={16} tiltMaxAngleY={16} perspective={1000} scale={1.03} transitionSpeed={900} gyroscope>
            <div className="grid grid-cols-2 gap-3 w-full xl:grid-cols-3">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex min-w-0 items-center justify-center gap-2 border-2 border-gray-700 rounded-3xl py-2 px-3 text-center"
                >
                  <Image src={skill.logo} alt={`${skill.name} logo`} width={32} height={32} className="w-6 h-6 sm:w-8 sm:h-8" />
                  <span className="text-xs sm:text-sm text-gray-300">{skill.name}</span>
                </div>
              ))}
            </div>
          </Tilt>
        </div>
      ))}
    </div>
  </section>
);

export default Skills;
