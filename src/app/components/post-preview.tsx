import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <Link href={`/posts/${slug}`} className="block group h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 h-full flex flex-col">
        <div className="h-48 overflow-hidden">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        <div className="p-6 flex-grow flex flex-col">
          <div className="text-sm mb-4 text-gray-600 dark:text-gray-400">
            <DateFormatter dateString={date} />
          </div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-3xl leading-snug font-semibold">
              <span>
                {title}
              </span>
            </h3>
            <div className="relative transition-all duration-300 group-hover:bg-red-600 group-hover:rounded-lg p-1 -m-1 transform group-hover:translate-x-1 group-hover:rotate-3">
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 172 184" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300"
              >
                <g id="Frame 1">
                  <g id="cross">
                    <rect 
                      id="vert" 
                      x="62" 
                      y="23" 
                      width="47" 
                      height="138" 
                      className="fill-black dark:fill-white group-hover:fill-white" 
                    />
                    <rect 
                      id="horiz" 
                      x="17" 
                      y="115" 
                      width="47" 
                      height="138" 
                      transform="rotate(-90 17 115)" 
                      className="fill-black dark:fill-white group-hover:fill-white" 
                    />
                  </g>
                </g>
              </svg>
            </div>
          </div>
          <hr className="border-gray-500 dark:border-gray-700 my-3" />
          <p className="text-lg leading-relaxed mb-4 line-clamp-3">{excerpt}</p>
        </div>
      </div>
    </Link>
  );
}
