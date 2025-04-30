import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function MoreStories({ posts }: Props) {
  return (
    <section>
      <h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        Field Notes
        <hr className="border-gray-500 dark:border-gray-700 my-3" />
      </h2>
      <p className="mb-8 md: tracking-tighter leading-tight">
        Building science, Project Photos, and Observations about current building trends</p>
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
