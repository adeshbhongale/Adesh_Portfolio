"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="text-white py-16 px-[12vw] md:px-[7vw] lg:px-[20vw] font-sans border-t border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Adesh Bhongale</h2>
            <p className="text-gray-400 text-sm mt-2">Full-stack developer specializing in MERN and Next.js, high-performance, building scalable web applications with seamless user experiences</p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-4">Navigate</h3>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-3">
              {[
                { name: "About", href: isHomePage ? "#about" : "/#about" },
                { name: "Skills", href: isHomePage ? "#skills" : "/#skills" },
                { name: "Projects", href: isHomePage ? "#work" : "/#work" },
                { name: "Blog", href: "/#blog" },
                { name: "Contact", href: isHomePage ? "#contact" : "/#contact" }
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-purple-400 transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center md:items-center">
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {[
                { icon: <FaGithub />, link: "https://github.com/adeshbhongale", label: "GitHub" },
                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/adesh-bhongale-58830025b", label: "LinkedIn" },
                { icon: <FaInstagram />, link: "https://www.instagram.com/adeshbhongale07/", label: "Instagram" },
                { icon: <FaFacebook />, link: "https://www.facebook.com/adesh.bhongale.5", label: "Facebook" },
                { icon: <SiLeetcode />, link: "https://leetcode.com/u/AdeshB07/", label: "LeetCode" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="text-xl w-10 h-10 flex items-center justify-center rounded-full border border-purple-500/30 text-gray-300 hover:text-white hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-110"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Adesh Bhongale. All rights reserved.</p>
          <p className="text-center md:text-right">Crafted with <span className="text-pink-500">♥</span> using Next.js, TypeScript & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
