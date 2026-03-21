import { EducationItem } from "@/lib/data";
import Image from "next/image";

const Education = ({ educations }: { educations: EducationItem[] }) => {
  return (
    <section id="education" className="py-24 pb-24 px-4 md:px-[7vw] lg:px-[20vw] font-sans">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white">EDUCATION</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
        <p className="text-gray-300 mt-4 text-lg font-semibold max-w-2xl mx-auto">
          My education has been a journey of learning and development. Here are the details of my academic background
        </p>
      </div>

      <div className="relative">
        {/* Timeline line - responsive */}
        <div className="absolute left-2 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-400 to-pink-500"></div>

        {educations.map((edu, index) => (
          <div key={edu.id} className="relative mb-8 md:mb-10">
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 w-6 h-6 md:w-10 md:h-10 rounded-full bg-[#050414] border-2 md:border-3 border-blue-500 flex items-center justify-center z-10">
              <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"></div>
            </div>

            {/* Content card */}
            <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? "md:mr-auto md:pr-16 md:w-1/2" : "md:ml-auto md:pl-16 md:w-1/2"}`}>
              <div className="group relative p-5 md:p-6 rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-blue-800/20 backdrop-blur-sm hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                {/* Accent line */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-500 rounded-t-xl"></div>

                {/* Education header */}
                <div className="flex items-start gap-3 md:gap-4 mb-2 md:mb-3">
                  <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 rounded-lg bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center">
                    <Image
                      src={edu.img}
                      alt={edu.school}
                      width={80}
                      height={100}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">{edu.degree}</h3>
                  </div>
                </div>
                <p className="text-blue-400 font-medium text-xs md:text-sm ml-12 md:ml-0 md:mb-1">{edu.school}</p>
                <p className="text-xs text-gray-400 ml-12 md:ml-0 mb-3 md:mb-4">{edu.date}</p>

                {/* Grade */}
                <div className="inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50 mb-3 md:mb-4">
                  <p className="text-xs font-semibold text-blue-200">
                    Grade: <span className="text-blue-100 font-bold">{edu.grade}</span>
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">{edu.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
