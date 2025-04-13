"use client";
import styles from "./switch.module.css";

// Add CSS module content if you don't have the file
// This comment helps developers know they need to create this CSS
/*
Create this in switch.module.css:

.switch {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.moonIcon {
  transition: transform 0.3s ease;
}

.switch:hover .moonIcon {
  transform: rotate(15deg);
}

.switch.clicked .moonIcon {
  transform: rotate(30deg);
}
*/
import { memo, useEffect, useState } from "react";

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

  return (
    <button
      type="button"
      suppressHydrationWarning
      className={`${styles.switch} ${isAnimating ? styles.clicked : ''}`}
      onClick={handleModeSwitch}
    >
      <svg  
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.moonIcon}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
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