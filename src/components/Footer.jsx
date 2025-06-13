import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
    // Smooth scroll function
    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
            <div className="container mx-auto text-center">
                {/* Name / Logo */}
                <h2 className="text-xl font-semibold text-purple-500">Adesh Bhongale</h2>

                {/* Navigation Links - Responsive */}
                <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
                    {[
                        { name: "About", id: "about" },
                        { name: "Skills", id: "skills" },
                        { name: "Experience", id: "experience" },
                        { name: "Projects", id: "projects" },
                        { name: "Education", id: "education" },
                    ].map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleScroll(item.id)}
                            className="hover:text-purple-500 text-sm sm:text-base my-1"
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>

                {/* Social Media Icons - Responsive */}
                <div className="flex flex-wrap justify-center space-x-4 mt-6">
                    {[
                        { icon: <FaFacebook />, link: "https://www.facebook.com/adesh.bhongale.5" },
                        { icon: <FaGithub />, link: "https://github.com/adeshbhongale" },
                        { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/adesh-bhongale-58830025b" },
                        { icon: <FaInstagram />, link: "https://www.instagram.com/adeshbhongale07/" },
                        { icon: <SiLeetcode />, link: "https://leetcode.com/u/AdeshB07/" },

                    ].map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
                        >
                            {item.icon}
                        </a>
                    ))}
                </div>

                {/* Copyright Text */}
                <p className="text-sm text-gray-400 mt-6">
                    © 2025 Adesh Bhongale. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;