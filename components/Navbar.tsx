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
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition duration-300 px-4 sm:px-6 md:px-[7vw] lg:px-[15vw] ${isScrolled ? "bg-[#050414]/85 backdrop-blur-lg border-b border-white/10" : "bg-[#050414]/85 backdrop-blur-lg border-b border-white/10"
          }`}
      >
        <div className="text-white py-3 sm:py-4 flex justify-center items-center">
          <div className="flex justify-between items-center gap-3 sm:gap-4 lg:gap-6 w-full">
            {/* Logo */}
            <Link href="/" className="text-lg font-semibold cursor-pointer flex-shrink-0 whitespace-nowrap">
              <span className="text-[#8245ec] text-xl sm:text-2xl">&lt;</span>
              <span className="text-white text-lg sm:text-2xl">Adesh</span>
              <span className="text-[#8245ec] text-xl sm:text-2xl">/</span>
              <span className="text-white text-lg sm:text-2xl">Bhongale</span>
              <span className="text-[#8245ec] text-xl sm:text-2xl">&gt;</span>
            </Link>

            {/* Menu Items - Center */}
            <ul className="hidden md:flex space-x-4 lg:space-x-6 xl:space-x-8 text-gray-300 flex-1 justify-center px-4">
              {menuItems.map((item) => (
                <li key={item.id} className="cursor-pointer">
                  <Link
                    onClick={handleMenuItemClick}
                    href={item.href}
                    className="hover:text-[#8245ec] transition-colors duration-300 relative group whitespace-nowrap text-sm lg:text-base"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Icons - Right */}
            <div className="hidden md:flex space-x-2 lg:space-x-3 items-center flex-shrink-0">
              <a
                href="https://github.com/adeshbhongale"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-colors duration-300 transform hover:scale-110 p-1.5 lg:p-2 rounded-lg hover:bg-purple-500/10"
              >
                <FaGithub size={20} className="lg:w-6 lg:h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/adesh-bhongale-58830025b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#8245ec] transition-colors duration-300 transform hover:scale-110 p-1.5 lg:p-2 rounded-lg hover:bg-purple-500/10"
              >
                <FaLinkedin size={20} className="lg:w-6 lg:h-6" />
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden ml-auto flex-shrink-0">
              {isOpen ? (
                <FiX className="text-2xl sm:text-3xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(false)} />
              ) : (
                <FiMenu className="text-2xl sm:text-3xl text-[#8245ec] cursor-pointer" onClick={() => setIsOpen(true)} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="fixed inset-0 top-16 z-40 md:hidden bg-gradient-to-b from-[#050414]/95 to-[#0a0822]/95 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}
        >
          <ul className="flex flex-col items-center space-y-2 pt-6 pb-8 text-gray-300">
            {menuItems.map((item, index) => (
              <li key={item.id} className="w-full">
                <Link
                  href={item.href}
                  onClick={handleMenuItemClick}
                  className="block px-6 py-3 text-center hover:text-white hover:bg-purple-500/10 transition-all duration-300 rounded-lg border-b border-white/5"
                  style={{
                    animation: `slideIn 0.3s ease-out forwards`,
                    animationDelay: `${index * 50}ms`,
                    opacity: 0
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="w-full pt-4 border-t border-white/10">
              <div className="flex justify-center gap-6 py-4">
                <a
                  href="https://github.com/adeshbhongale"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-300 hover:text-[#8245ec] transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-purple-500/10"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/adesh-bhongale-58830025b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-gray-300 hover:text-[#8245ec] transition-all duration-300 transform hover:scale-110 p-2 rounded-lg hover:bg-purple-500/10"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </li>
          </ul>
          <style jsx>{`
            @keyframes slideIn {
              from {
                opacity: 0;
                transform: translateX(-20px);
              }
              to {
                opacity: 1;
                transform: translateX(0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default Navbar;
