"use client";

import BlurBlob from "@/components/BlurBlob";
import { AboutContent } from "@/lib/data";
import Image from "next/image";
import Tilt from "react-parallax-tilt";
import { Typewriter } from "react-simple-typewriter";

const About = ({ about }: { about: AboutContent }) => {
  return (
    <section id="about" className="py-4 px-[6vw] md:px-[7vw] lg:px-[20vw] font-sans mt-10 md:mt-15 lg:mt-20">
      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10">
        <div className="relative w-full md:w-1/2 text-center md:text-left mt-2 md:mt-0 md:mr-12">
          <div className="relative isolate">
            <BlurBlob position={{ top: "6%", left: "8%" }} size={{ width: "95%", height: "160px" }} />
            <BlurBlob position={{ top: "15%", left: "22%" }} size={{ width: "72%", height: "110px" }} />
            <div className="relative z-10">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-1 leading-tight">{about.headline}</h1>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-[#8245ec] leading-tight">
            <span className="text-white">I am a </span>
            <Typewriter
              words={["Full Stack Developer", "MERN Stack Developer", "Web Developer", "Software Engineer", "Efficient Coder"]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h3>
          <p className="text-base sm:text-lg md:text-lg text-gray-400 mb-10 mt-8 leading-relaxed">
            {about.description}
          </p>
          <a
            href={about.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white py-3 px-8 rounded-full mt-5 text-lg font-bold transition duration-300 transform hover:scale-105"
            style={{
              background: "linear-gradient(90deg, #8245ec, #a855f7)",
              boxShadow: "0 0 2px #8245ec, 0 0 2px #8245ec, 0 0 40px #8245ec"
            }}
          >
            DOWNLOAD CV
          </a>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Tilt
            className="hero-float hero-glow w-52 h-52 sm:w-72 sm:h-72 md:w-[30rem] md:h-[30rem] border-4 border-purple-700 rounded-full"
            tiltMaxAngleX={20}
            tiltMaxAngleY={20}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1000}
            gyroscope
          >
            <Image
              src={about.image}
              alt="Adesh Bhongale"
              width={1200}
              height={1200}
              className="w-full h-full rounded-full object-cover drop-shadow-[0_10px_20px_rgba(130,69,236,0.5)]"
            />
          </Tilt>
        </div>
      </div>
    </section>
  );
};

export default About;
