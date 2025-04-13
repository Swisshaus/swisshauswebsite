"use client";
import styles from "./switch.module.css";
import { memo, useEffect, useState } from "react";
import { useThemeContext } from "../contexts/ThemeContext";

declare global {
  var updateDOM: () => void;
}

type ColorSchemePreference = "dark" | "light";
const STORAGE_KEY = "nextjs-blog-starter-theme";
const modes: ColorSchemePreference[] = ["dark", "light"];
const DEFAULT_MODE: ColorSchemePreference = "light";

/** Function to be injected in script tag for avoiding FOUC (Flash of Unstyled Content) */
export const NoFOUCScript = (storageKey: string) => {
  /* Can not use outside constants or function as this script will be injected in a different context */
  const [DARK, LIGHT] = ["dark", "light"];
  
  /** Modify transition globally to avoid patched transitions */
  const modifyTransition = () => {
    const css = document.createElement("style");
    css.textContent = "*,*:after,*:before{transition:none !important;}";
    document.head.appendChild(css);
    return () => {
      /* Force restyle */
      getComputedStyle(document.body);
      /* Wait for next tick before removing */
      setTimeout(() => document.head.removeChild(css), 1);
    };
  };

  /** Function to add/remove dark class */
  window.updateDOM = () => {
    const restoreTransitions = modifyTransition();
    const mode = localStorage.getItem(storageKey) ?? LIGHT;
    const classList = document.documentElement.classList;
    
    if (mode === DARK) classList.add(DARK);
    else classList.remove(DARK);
    
    document.documentElement.setAttribute("data-mode", mode);
    restoreTransitions();
  };
  
  window.updateDOM();
};

let updateDOM: () => void;

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(
    () => 
      (typeof localStorage !== "undefined" && 
       localStorage.getItem(STORAGE_KEY) as ColorSchemePreference) || DEFAULT_MODE
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const { textColor } = useThemeContext();

  useEffect(() => {
    // Store global functions to local variables to avoid any interference
    updateDOM = window.updateDOM;
    
    /** Sync the tabs */
    addEventListener("storage", (e: StorageEvent): void => {
      e.key === STORAGE_KEY && setMode(e.newValue as ColorSchemePreference);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    updateDOM();
  }, [mode]);

  /** Toggle mode */
  const handleModeSwitch = () => {
    setIsAnimating(true);
    const index = modes.indexOf(mode);
    setMode(modes[(index + 1) % modes.length]);
    
    // Reset animation flag after animation completes
    setTimeout(() => setIsAnimating(false), 500);
  };

  // Determine which icon to show based on the current mode
  // Show sun icon in dark mode (because clicking will switch to light)
  // Show moon icon in light mode (because clicking will switch to dark)
  const showSun = mode === "dark";
  
  // Get the text color from context to match the navbar text
  const iconColor = textColor === 'text-white' ? 'stroke-white' : 'stroke-black';

  return (
    <button
      type="button"
      suppressHydrationWarning
      className={`${styles.switch} ${isAnimating ? styles.clicked : ''}`}
      onClick={handleModeSwitch}
      aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {showSun ? (
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.themeIcon} ${iconColor}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg  
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.themeIcon} ${iconColor}`}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
};

const Script = memo(() => (
  <script
    dangerouslySetInnerHTML={{
      __html: `(${NoFOUCScript.toString()})('${STORAGE_KEY}')`,
    }}
  />
));

/**
 * This component applies classes and transitions for theme switching.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script />
      <Switch />
    </>
  );
};