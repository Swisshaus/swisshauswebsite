'use client';

import CoverImage from "./cover-image";
import { PostTitle } from "./post-title";
import DateFormatter from "./date-formatter";
import Avatar from "./avatar";
import Link from "next/link";
import { Author } from "@/interfaces/author";
import markdownStyles from "./markdown-styles.module.css";
import { useEffect, useRef, useState } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  category: string;
  content: string;
  isMdx?: boolean;
};

export default function ForSaleLayout({
  title,
  coverImage,
  date,
  author,
  category,
  content,
  isMdx = false,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  
  // Handle link styling
  useEffect(() => {
    if (contentRef.current) {
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.classList.add('animated-link');
      });
    }
  }, [content]);
  
  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      // Calculate opacity based on scroll position - fade out after 100px of scrolling
      const scrollY = window.scrollY;
      const newOpacity = Math.max(0, 1 - scrollY / 150);
      setScrollOpacity(newOpacity);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative flex flex-col w-full">
      {/* FOR SALE banner that fades on scroll */}
      <div 
        className="sticky top-[70px] z-10 w-full text-center py-3 mb-8 bg-red-600 text-white font-bold text-xl md:text-3xl"
        style={{ opacity: scrollOpacity, transition: 'opacity 0.2s ease-out' }}
      >
        FOR SALE
      </div>
      
      <div className="flex flex-col md:flex-row w-full">
        {/* Fixed cover image on the left (desktop) or half-height (mobile) */}
        <div className="md:w-1/3 md:sticky md:top-24 md:self-start md:h-[calc(100vh-6rem)] h-[50vh] mb-8 md:mb-0 md:pr-8">
          <div className="h-full">
            <CoverImage title={title} src={coverImage} />
          </div>
        </div>

        {/* Scrollable content on the right */}
        <div className="md:w-2/3">
          <PostTitle>{title}</PostTitle>
          <div className="mb-6 text-sm md:text-lg italic text-left">
            Filed under <Link href={`/category/${encodeURIComponent(category)}`} className="hover:underline font-bold text-red-600">{category}</Link> on <DateFormatter dateString={date} />
          </div>
          {/* <div className="mb-8">
            <Avatar name={author.name} picture={author.picture} />
          </div> */}
          <div>
            <div
              ref={contentRef}
              className={markdownStyles.markdown}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}