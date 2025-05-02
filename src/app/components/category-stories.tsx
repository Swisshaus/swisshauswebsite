import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function CategoryStories({ posts }: Props) {
  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5 lg:gap-x-5 gap-y-5 md:gap-y-5 mb-5 auto-rows-fr">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}