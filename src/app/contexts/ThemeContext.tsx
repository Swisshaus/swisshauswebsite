'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// Define the context shape
type ThemeContextType = {
  isDarkMode: boolean;
  isHomePage: boolean;
  scrolled: boolean;
  textColor: string;
  bgColor: string;
};

// Create the context with default values
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  isHomePage: true,
  scrolled: false,
  textColor: 'text-white',
  bgColor: 'bg-background/30'
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// Props for the provider component
type ThemeContextProviderProps = {
  children: ReactNode;
};

// Provider component that tracks theme state
export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isHomePage, setIsHomePage] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();
  
  // Check if current route is the home page
  useEffect(() => {
    setIsHomePage(pathname === '/');
  }, [pathname]);
  
  // Track dark mode state
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    checkDarkMode();
    
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
    
    return () => observer.disconnect();
  }, []);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Determine text color based on context
  const textColor = (isHomePage && !scrolled) || isDarkMode ? 'text-white' : 'text-black';
  
  // Adjust background based on scroll position
  const bgColor = scrolled 
    ? isDarkMode ? 'bg-slate-900/80' : 'bg-white/80' 
    : 'bg-background/30';
  
  // Create the context value object
  const contextValue = {
    isDarkMode,
    isHomePage,
    scrolled,
    textColor,
    bgColor
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}