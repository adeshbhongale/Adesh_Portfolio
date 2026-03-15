"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <footer className="text-white py-8 px-[12vw] md:px-[7vw] lg:px-[20vw]">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold text-purple-500">Adesh Bhongale</h2>

        <nav className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4">
          {[
            { name: "About", href: isHomePage ? "#about" : "/#about" },
            { name: "Skills", href: isHomePage ? "#skills" : "/#skills" },
            { name: "Experience", href: isHomePage ? "#experience" : "/#experience" },
            { name: "Projects", href: isHomePage ? "#work" : "/#work" },
            { name: "Education", href: isHomePage ? "#education" : "/#education" },
            { name: "Blog", href: "/#blog" },
            { name: "Contact", href: isHomePage ? "#contact" : "/#contact" }
          ].map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-purple-500 text-sm sm:text-base my-1">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap justify-center space-x-4 mt-6">
          {[
            { icon: <FaFacebook />, link: "https://www.facebook.com/adesh.bhongale.5" },
            { icon: <FaGithub />, link: "https://github.com/adeshbhongale" },
            { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/adesh-bhongale-58830025b" },
            { icon: <FaInstagram />, link: "https://www.instagram.com/adeshbhongale07/" },
            { icon: <SiLeetcode />, link: "https://leetcode.com/u/AdeshB07/" }
          ].map((item, index) => (
            <a
              key={`${item.link}-${index}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-purple-500 transition-transform transform hover:scale-110"
            >
              {item.icon}
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-400 mt-6">© 2026 Adesh Bhongale. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
