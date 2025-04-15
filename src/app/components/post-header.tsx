import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/components/post-title";
import { type Author } from "@/interfaces/author";
import Link from "next/link";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  category?: string;
};

export function PostHeader({ title, coverImage, date, author, category = "General" }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-6 text-sm md:text-lg italic text-left md:text-center">
          Filed under <Link href={`/category/${encodeURIComponent(category)}`} className="hover:underline font-bold text-red-600">{category}</Link> on <DateFormatter dateString={date} />
        </div>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </div>
    </>
  );
}
