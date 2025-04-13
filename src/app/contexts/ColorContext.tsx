'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

type ColorContextType = {
  isDarkMode: boolean;
  isOverImage: boolean;
  textColor: string;
  backgroundColor: string;
};

const ColorContext = createContext<ColorContextType>({
  isDarkMode: false,
  isOverImage: true,
  textColor: 'text-white',
  backgroundColor: 'bg-background/30',
});

export const useColorContext = () => useContext(ColorContext);

type ColorContextProviderProps = {
  children: ReactNode;
};

export function ColorContextProvider({ children }: ColorContextProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOverImage, setIsOverImage] = useState(true);
  const pathname = usePathname();

  // Check if current route is the home page (which has the full-bleed image)
  useEffect(() => {
    setIsOverImage(pathname === '/');
  }, [pathname]);

  // Listen for dark mode changes
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initial state
    checkDarkMode();

    // Set up a mutation observer to detect when the dark class is added/removed
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
        ) {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Clean up
    return () => observer.disconnect();
  }, []);

  // Compute derived values
  const textColor = isOverImage || isDarkMode ? 'text-white' : 'text-black dark:text-white';
  const backgroundColor = isOverImage 
    ? 'bg-background/30' 
    : 'bg-white/80 dark:bg-slate-900/80';

  return (
    <ColorContext.Provider 
      value={{ 
        isDarkMode, 
        isOverImage, 
        textColor, 
        backgroundColor 
      }}
    >
      {children}
    </ColorContext.Provider>
  );
}