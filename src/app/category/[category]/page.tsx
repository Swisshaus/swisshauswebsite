import Container from "@/app/components/container";
import { HeroPost } from "@/app/components/hero-post";
import { Intro } from "@/app/components/intro";
import { CategoryStories } from "@/app/components/category-stories";
import { getAllPosts } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import { Metadata } from "next";

export default async function CategoryPage({ 
  params,
}: { 
  params: Promise<{ category: string }> 
}) {
  const resolvedParams = await params;
  const category = decodeURIComponent(resolvedParams.category);
  const allPosts = getAllPosts(category);
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  // Generate a custom heading and description based on the category
  const getCategoryContent = (category: string) => {
    switch(category) {
      case "Home-Complete":
        return {
          heading: "Some of our completed residential projects",
          description: "Explore our portfolio of finished custom homes, each crafted with exceptional attention to detail and quality craftsmanship."
        };
      case "For-Sale":
        return {
          heading: "Properties currently for sale",
          description: "Browse our selection of available properties built with Swisshaus quality and ready for you to call home."
        };
      case "Commercial":
        return {
          heading: "Our commercial construction projects",
          description: "Discover our commercial projects where functionality meets sophisticated design for businesses of all sizes."
        };
      case "Innovative":
        return {
          heading: "Innovative construction solutions",
          description: "See how we're implementing cutting-edge building techniques and sustainable practices in our construction projects."
        };
      case "Drawings":
        return {
          heading: "Architectural drawings and plans",
          description: "View our detailed architectural plans showcasing the precision and creativity behind our design process."
        };
      default:
        return {
          heading: `Our ${category} projects`,
          description: `A collection of our work in the ${category} category, demonstrating our commitment to excellence.`
        };
    }
  };

  const { heading: customHeading, description: customDescription } = getCategoryContent(category);

  return (
    <Container>
      <Intro />
      <div className="pt-20 pb-16 flex flex-col md:flex-row md:justify-between md:items-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-5xl mb-4 md:mb-0">{category}</h2>
        <p className="text-lg text-gray-600 dark:text-dark-text/80">{allPosts.length} Articles</p>
      </div>
      <div className="max-w-[960px] mx-auto">
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            category={heroPost.category || "General"}
            customHeading={customHeading}
            customDescription={customDescription}
          />
        )}
        {morePosts.length > 0 && <CategoryStories posts={morePosts} />}
      </div>
    </Container>
  );
}

export async function generateMetadata({ 
  params,
}: { 
  params: Promise<{ category: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const category = decodeURIComponent(resolvedParams.category);
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