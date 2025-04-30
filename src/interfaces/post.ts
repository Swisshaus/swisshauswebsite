import { type Author } from "./author";

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  category?: string; // Optional category field
  ogImage: {
    url: string;
  };
  content: string;
  preview?: boolean;
  extension?: 'md' | 'mdx'; // Added for file type tracking
};
