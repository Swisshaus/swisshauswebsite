'use client';

import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";
import { useState, useEffect } from "react";
import HamburgerIcon from "./HamburgerIcon";
import MobileMenu from "./MobileMenu";
import { ThemeSwitcher } from "./theme-switcher";
import { useThemeContext } from "../contexts/ThemeContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { textColor, bgColor } = useThemeContext();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-1' : 'py-5'}`}>
        <div className={`max-w-[1200px] mx-auto ${isScrolled ? 'bg-white/100 dark:bg-gray-700/100 shadow-md' : bgColor} rounded-md transition-all duration-300`}>
          <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-5">
            <h1 className="float-left text-3xl sm:text-4xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
              {/* Logo with text wrapped in a flex container for alignment */}
              <div className="flex items-center gap-2 group">
                <Link href="/" className="hover:underline float-start relative overflow-hidden">
                  <div className="relative transition-all duration-300 group-hover:bg-red-600 group-hover:rounded-lg p-1 -m-1 transform group-hover:translate-x-1 group-hover:rotate-3 group-hover:pr-3">
                    <svg 
                      width="30" 
                      height="30" 
                      viewBox="0 0 172 184" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300"
                    >
                      <g id="Frame 1">
                        <g id="cross" className="group-hover:fill-white">
                          <rect 
                            id="vert" 
                            x="62" 
                            y="23" 
                            width="47" 
                            height="138" 
                            className={isScrolled ? "fill-black dark:fill-white group-hover:fill-white" : textColor === 'text-white' || textColor === 'text-dark-text' ? "fill-white" : "fill-black group-hover:fill-white"} 
                          />
                          <rect 
                            id="horiz" 
                            x="17" 
                            y="115" 
                            width="47" 
                            height="138" 
                            transform="rotate(-90 17 115)" 
                            className={isScrolled ? "fill-black dark:fill-white group-hover:fill-white" : textColor === 'text-white' || textColor === 'text-dark-text' ? "fill-white" : "fill-black group-hover:fill-white"} 
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                </Link>
                <Link href="/" className={`hover:underline ${isScrolled ? 'text-black dark:text-white' : textColor} text-2xl sm:text-3xl md:text-3xl`}>swisshaus</Link>
              </div>
            </h1>
          
          <div className="hidden md:block text-center md:text-left text-lg md:pl-8">
            <ul className='flex w-full justify-end items-center space-x-8'>
            <li><Link href="/projects" className={`hover:underline ${isScrolled ? 'text-black dark:text-white' : textColor} font-medium`} aria-label="View our custom home projects in Kalispell, MT">Projects</Link></li>
            <li><Link href="/about" className={`hover:underline ${isScrolled ? 'text-black dark:text-white' : textColor} font-medium`} aria-label="About Swisshaus and our team">About</Link></li>
            <li><Link href="/field-notes" className={`hover:underline ${isScrolled ? 'text-black dark:text-white' : textColor} font-medium`} aria-label="Read our latest field notes and insights">Field Notes</Link></li>
            <li><Link href="/contact" className={`hover:underline ${isScrolled ? 'text-black dark:text-white' : textColor} font-medium`} aria-label="Contact Swisshaus for your custom home">Contact</Link></li>
            <li className="flex items-center">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>

          <div className="md:hidden ml-auto flex items-center space-x-3">
            <div className="theme-switcher-mobile">
              <ThemeSwitcher />
            </div>
            <HamburgerIcon onClick={toggleMenu} />
          </div>
        </div>
      </div>
    </div>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
