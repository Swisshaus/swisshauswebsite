import Container from "@/app/components/container";
import { HeroPost } from "@/app/components/hero-post";
import { Intro } from "@/app/components/intro";
import { MoreStories } from "@/app/components/more-stories";
import { getAllPosts } from "@/lib/api";
import LandingPage from "@/app/components/LandingPage";

export default function Index() {
  const allPosts = getAllPosts();
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <LandingPage 
        heroImage="/assets/blog/hello-world/cover.jpg"
        title="Swisshaus Design & Build"
        subtitle="Custom Home Builder in Kalispell, MT"
      />
      
      <main className="mt-12">
        <Container>
          <Intro />
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
            category={heroPost.category}
          />
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </main>
    </>
  );
}
