'use client';

import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import MobileMenu from "./MobileMenu";
import { ThemeSwitcher } from "./theme-switcher";
import { useThemeContext } from "../contexts/ThemeContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { textColor, bgColor } = useThemeContext();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 ${bgColor} px-8 backdrop-blur-sm flex items-center justify-between h-16 transition-all duration-300`}>
        <h1 className="float-left text-5xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
          {/* Logo with text wrapped in a flex container for alignment */}
          <div className="flex items-center gap-2 group">
            <Link href="/" className="hover:underline float-start relative overflow-hidden">
              <svg 
                width="30" 
                height="30" 
                viewBox="0 0 172 184" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transform transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-3"
              >
                <g id="Frame 1">
                  <g id="cross">
                    <rect id="vert" x="62" y="23" width="47" height="138" fill="#FF0000" />
                    <rect id="horiz" x="17" y="115" width="47" height="138" transform="rotate(-90 17 115)" fill="#FF0000" />
                  </g>
                </g>
              </svg>
            </Link>
            <Link href="/" className={`hover:underline ${textColor}`}>swisshaus</Link>
          </div>
        </h1>
        
        <div className="hidden md:block text-center md:text-left text-lg md:pl-8">
          <ul className='flex w-full justify-end items-center space-x-8'>
            <li><Link href="/about" className={`hover:underline ${textColor} font-medium`} aria-label="About Swisshaus and our team">About Us</Link></li>
            <li><Link href="/projects" className={`hover:underline ${textColor} font-medium`} aria-label="View our custom home projects in Kalispell, MT">Our Projects</Link></li>
            <li><Link href="/contact" className={`hover:underline ${textColor} font-medium`} aria-label="Contact Swisshaus for your custom home">Contact Us</Link></li>
            <li className="flex items-center">
              <ThemeSwitcher />
            </li>
          </ul>
        </div>

        <div className="md:hidden ml-auto flex items-center space-x-4">
          <div className="theme-switcher-mobile">
            <ThemeSwitcher />
          </div>
          <HamburgerIcon onClick={toggleMenu} />
        </div>
      </div>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
