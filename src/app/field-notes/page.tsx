import { getAllPosts } from "@/lib/api";
import Container from "@/app/components/container";
import { MoreStories } from "@/app/components/more-stories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Notes | Swisshaus Design & Build",
  description: "Read our latest field notes, project updates, and custom home building insights.",
};

export default function FieldNotes() {
  const allPosts = getAllPosts();

  return (
    <Container>
      <div className="mt-24 md:mt-32">
        {allPosts.length > 0 && <MoreStories posts={allPosts} />}
      </div>
    </Container>
  );
}