"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const menuItems: { id: string; label: string; href: string }[] = [
    { id: "about", label: "About", href: isHomePage ? "#about" : "/#about" },
    { id: "skills", label: "Skills", href: isHomePage ? "#skills" : "/#skills" },
    { id: "experience", label: "Experience", href: isHomePage ? "#experience" : "/#experience" },
    { id: "work", label: "Projects", href: isHomePage ? "#work" : "/#work" },
    { id: "education", label: "Education", href: isHomePage ? "#education" : "/#education" },
    { id: "blog", label: "Blog", href: "/#blog" },
    { id: "contact", label: "Contact", href: isHomePage ? "#contact" : "/#contact" }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition duration-300 px-[7vw] md:px-[7vw] lg:px-[20vw] ${isScrolled ? "bg-[#050414]/85 backdrop-blur-lg border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="text-white py-4 flex justify-between items-center">
        <Link href="/" className="text-lg font-semibold cursor-pointer">
          <span className="text-[#8245ec] text-2xl">&lt;</span>
          <span className="text-white text-2xl">Adesh</span>
          <span className="text-[#8245ec] text-2xl">/</span>
          <span className="text-white text-2xl">Bhongale</span>
          <span className="text-[#8245ec] text-2xl">&gt;</span>
        </Link>

        <ul className="hidden md:flex space-x-8 text-gray-300">
          {menuItems.map((item) => (
            <li key={item.id} className="cursor-pointer">
              <Link onClick={handleMenuItemClick} href={item.href} className="hover:text-[#8245ec]">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex space-x-4">
          <a
            href="https://github.com/adeshbhongale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#8245ec]"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/adesh-bhongale-58830025b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#8245ec]"
          >
            <FaLinkedin size={24} />
          </a>
        </div>

        <div className="md:hidden">
          {isOpen ? (
            <FiX className="text-3xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(false)} />
          ) : (
            <FiMenu className="text-3xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-4/5 bg-[#050414] bg-opacity-50 backdrop-filter backdrop-blur-lg z-50 rounded-lg shadow-lg md:hidden">
          <ul className="flex flex-col items-center space-y-4 py-4 text-gray-300">
            {menuItems.map((item) => (
              <li key={item.id} className="cursor-pointer hover:text-white">
                <Link href={item.href} onClick={handleMenuItemClick}>
                  {item.label}
                </Link>
              </li>
            ))}
            <div className="flex space-x-4">
              <a
                href="https://github.com/adeshbhongale"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/adesh-bhongale-58830025b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
