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
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section className="relative w-full h-[70vh] mb-16">
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt={`Cover Image for ${title}`}
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 right-0 max-w-lg p-8 bg-black/50 text-white">
        <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="mb-4 text-lg">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </section>
  );
}
