'use client';

import markdownStyles from "./markdown-styles.module.css";
import { useEffect, useRef } from "react";

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