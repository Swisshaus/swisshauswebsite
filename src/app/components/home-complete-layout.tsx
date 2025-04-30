'use client';

import CoverImage from "./cover-image";
import { PostBody } from "./post-body";
import { PostTitle } from "./post-title";
import DateFormatter from "./date-formatter";
import Avatar from "./avatar";
import Link from "next/link";
import { Author } from "@/interfaces/author";
import markdownStyles from "./markdown-styles.module.css";
import { useEffect, useRef } from "react";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  category: string;
  content: string;
  isMdx?: boolean;
};

export default function HomeCompleteLayout({
  title,
  coverImage,
  date,
  author,
  category,
  content,
  isMdx = false,
}: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (contentRef.current) {
      // Add animated-link class to all links
      const links = contentRef.current.querySelectorAll('a');
      links.forEach(link => {
        link.classList.add('animated-link');
      });
    }
  }, [content]);

  return (
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
  );
}