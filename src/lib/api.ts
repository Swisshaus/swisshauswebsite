import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.(md|mdx)$/, "");
  // Try to find an MDX file first, fall back to MD
  let fullPath = join(postsDirectory, `${realSlug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = join(postsDirectory, `${realSlug}.md`);
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const extension = fullPath.endsWith('.mdx') ? 'mdx' : 'md';

  return { ...data, slug: realSlug, content, extension } as Post & { extension: string };
}

export function getAllPosts(category?: string): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // Filter by category if specified
    .filter((post) => !category || (post.category || "General") === category)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
