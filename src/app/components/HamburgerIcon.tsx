'use client';

import React from 'react';

type HamburgerIconProps = {
  onClick: () => void;
};

export default function HamburgerIcon({ onClick }: HamburgerIconProps) {
  return (
    <button 
      className="relative z-50 block md:hidden w-10 h-10 focus:outline-none group"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <div className="flex flex-col justify-center items-center w-6 h-6 space-y-1.5 overflow-hidden group-hover:scale-110 transition-transform duration-300">
        <span className="block w-6 h-0.5 bg-white rounded group-hover:bg-red-500 transition-colors duration-300"></span>
        <span className="block w-6 h-0.5 bg-white rounded group-hover:bg-red-500 transition-colors duration-300"></span>
        <span className="block w-6 h-0.5 bg-white rounded group-hover:bg-red-500 transition-colors duration-300"></span>
      </div>
    </button>
  );
}