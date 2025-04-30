import Container from "@/app/components/container";
import { HeroPost } from "@/app/components/hero-post";
import { Intro } from "@/app/components/intro";
import { CategoryStories } from "@/app/components/category-stories";
import { getAllPosts } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import { Metadata } from "next";

type Params = {
  params: {
    category: string;
  };
};

export default function CategoryPage({ params }: Params) {
  const category = decodeURIComponent(params.category);
  const allPosts = getAllPosts(category);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <Container>
      <Intro />
      <div className="py-28 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4 md:mb-0">{category}</h2>
        <p className="text-lg text-gray-600 dark:text-dark-text/80">{allPosts.length} Articles</p>
      </div>
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
          category={heroPost.category}
        />
      )}
      {morePosts.length > 0 && <CategoryStories posts={morePosts} />}
    </Container>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} Posts | ${CMS_NAME}`,
    description: `Posts in the ${category} category | ${CMS_NAME}`,
  };
}

export function generateStaticParams() {
  const allPosts = getAllPosts();
  const categories = new Set(allPosts.map((post) => post.category || "General"));
  
  return Array.from(categories).map((category) => ({
    category: encodeURIComponent(category),
  }));
}