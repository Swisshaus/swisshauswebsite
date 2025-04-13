'use client';

import { CMS_NAME } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import MobileMenu from "./MobileMenu";
import { ThemeSwitcher } from "./theme-switcher";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <section className="h-16 bg-background/30 px-8 backdrop-blur-sm justify-between flex items-center">
        <h1 className="float-left text-5xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8">
          {/* Logo */}
          <Link href="/" className="hover:underline float-start">
            <svg width="30" height="30" viewBox="0 0 172 184" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Frame 1">
                <g id="cross">
                  <rect id="vert" x="62" y="23" width="47" height="138" fill="#FF0000" />
                  <rect id="horiz" x="17" y="115" width="47" height="138" transform="rotate(-90 17 115)" fill="#FF0000" />
                </g>
              </g>
            </svg>
          </Link>
          <Link href="/" className="hover:underline float-start text-white">swisshaus</Link>
        </h1>
        
        <div className="hidden md:block text-center md:text-left text-lg md:pl-8">
          <ul className='flex w-full justify-end items-center space-x-8'>
            <li><Link href="/" className="hover:underline text-white font-medium">Home</Link></li>
            <li><Link href="/about" className="hover:underline text-white font-medium">About</Link></li>
            <li><Link href="/projects" className="hover:underline text-white font-medium">Projects</Link></li>
            <li><Link href="/contact" className="hover:underline text-white font-medium">Contact</Link></li>
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
      </section>

      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </>
  );
}
