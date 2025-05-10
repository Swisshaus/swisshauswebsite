'use client';

import markdownStyles from "./markdown-styles.module.css";
import { useEffect, useRef } from "react";
import GoogleMap from "./google-map";

type Props = {
  content: string;
  isMdx?: boolean;
};

export function PostBody({ content, isMdx = false }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // Add animated-link class to all links in the rendered content
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.classList.add('animated-link');
      });
      
      // Process any Google Maps placeholders
      const mapPlaceholders = contentRef.current.querySelectorAll('[data-google-map="true"]');
      mapPlaceholders.forEach(placeholder => {
        const src = placeholder.getAttribute('data-map-src');
        if (src) {
          // Create the iframe element
          const iframe = document.createElement('iframe');
          iframe.src = src;
          iframe.width = '100%';
          iframe.height = '450';
          iframe.style.border = '0';
          iframe.setAttribute('allowfullscreen', '');
          iframe.setAttribute('loading', 'lazy');
          iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
          
          // Replace placeholder with iframe
          placeholder.innerHTML = '';
          placeholder.appendChild(iframe);
        }
      });
    }
  }, [content]);

  return (
    <div className="max-w-2xl mx-auto">
      <div
        ref={contentRef}
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}