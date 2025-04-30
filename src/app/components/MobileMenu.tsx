'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useThemeContext } from '../contexts/ThemeContext';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [animationClass, setAnimationClass] = useState('');
  const { bgColor } = useThemeContext();
  
  useEffect(() => {
    if (isOpen) {
      setAnimationClass('animate-slideDown');
    } else {
      setAnimationClass('animate-slideUp');
    }
  }, [isOpen]);
  
  if (!isOpen && animationClass !== 'animate-slideDown') return null;
  
  return (
    <div 
      className={`fixed top-[85px] left-0 right-0 z-40 flex justify-center ${animationClass}`}
      onAnimationEnd={() => {
        if (animationClass === 'animate-slideUp') {
          setAnimationClass('');
        }
      }}
    >
      <div className="mx-auto max-w-[1200px] w-full">
        <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm shadow-lg rounded-b-lg overflow-hidden">
          <button 
            className="absolute top-2 right-4 p-2 text-black dark:text-white hover:text-red-500 transition-colors"
            onClick={onClose}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          
          <nav className="py-6">
            <ul className="flex flex-col space-y-4 px-6">
              <li>
                <Link 
                  href="/" 
                  className="text-xl font-medium text-black dark:text-white hover:text-red-500 transition-colors block py-2"
                  onClick={onClose}
                  aria-label="Go to Swisshaus home page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/projects" 
                  className="text-xl font-medium text-black dark:text-white hover:text-red-500 transition-colors block py-2"
                  onClick={onClose}
                  aria-label="View our custom home projects in Kalispell, MT"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="text-xl font-medium text-black dark:text-white hover:text-red-500 transition-colors block py-2"
                  onClick={onClose}
                  aria-label="Learn about Swisshaus and our team"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/field-notes" 
                  className="text-xl font-medium text-black dark:text-white hover:text-red-500 transition-colors block py-2"
                  onClick={onClose}
                  aria-label="Read our latest field notes and insights"
                >
                  Field Notes
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-xl font-medium text-black dark:text-white hover:text-red-500 transition-colors block py-2"
                  onClick={onClose}
                  aria-label="Contact Swisshaus for your custom home"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}