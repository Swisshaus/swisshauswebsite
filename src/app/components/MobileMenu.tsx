'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="fixed top-0 right-0 w-full max-w-sm h-screen bg-black p-8 shadow-xl">
        <button 
          className="absolute top-4 right-4 p-2 text-white hover:text-red-500 transition-colors"
          onClick={onClose}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        
        <nav className="mt-12">
          <ul className="flex flex-col space-y-6">
            <li>
              <Link 
                href="/" 
                className="text-2xl font-medium text-white hover:text-red-500 transition-colors"
                onClick={onClose}
                aria-label="Go to Swisshaus home page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="text-2xl font-medium text-white hover:text-red-500 transition-colors"
                onClick={onClose}
                aria-label="Learn about Swisshaus and our team"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className="text-2xl font-medium text-white hover:text-red-500 transition-colors"
                onClick={onClose}
                aria-label="View our custom home projects in Kalispell, MT"
              >
                Our Projects
              </Link>
            </li>
            <li>
              <Link 
                href="/contact" 
                className="text-2xl font-medium text-white hover:text-red-500 transition-colors"
                onClick={onClose}
                aria-label="Contact Swisshaus for your custom home"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}