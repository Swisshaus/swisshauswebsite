import Avatar from "@/app/components/avatar";
import CoverImage from "@/app/components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import DateFormatter from "./date-formatter";
import Image from "next/image";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
  category?: string;
  customHeading?: string;
  customDescription?: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  category = "General",
  customHeading = "Some of our past projects",
  customDescription,
}: Props) {
  return (
    <section>
      <h2 className="mb-4 text-5xl md:text-2xl font-bold tracking-tighter leading-tight">
        {customHeading}
        <hr className="border-gray-500 dark:border-gray-700 my-3" />
      </h2>
      {customDescription && (
        <p className="mb-8 tracking-tighter leading-tight">
          {customDescription}
        </p>
      )}
      
      <Link href={`/posts/${slug}`} className="block group">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1 mb-8">
          <div className="h-[400px] md:h-[450px] relative overflow-hidden">
            <Image
              src={coverImage}
              alt={`Cover Image for ${title}`}
              fill
              priority
              className="object-cover"
            />
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-3xl leading-snug font-semibold">
                {title}
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
            <div className="text-sm mb-4 text-gray-600 dark:text-gray-400">
              <DateFormatter dateString={date} />
            </div>
            <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          </div>
        </div>
      </Link>
    </section>
  );
}
