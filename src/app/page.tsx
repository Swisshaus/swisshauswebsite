import Container from "@/app/components/container";
import { HeroPost } from "@/app/components/hero-post";
import { Intro } from "@/app/components/intro";
import { MoreStories } from "@/app/components/more-stories";
import { getAllPosts } from "@/lib/api";
import LandingPage from "@/app/components/LandingPage";
import { StaticHeroSection } from "@/app/components/StaticHeroSection";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts;

  return (
    <>
      <LandingPage />
      
      <main className="mt-12">
        {/* Hero post with styling matching more-stories */}
        <StaticHeroSection />
        
        <Container>
          <Intro />
          {morePosts.length > 1 && <MoreStories posts={morePosts.slice(1)} />}
        </Container>
      </main>
    </>
  );
}
