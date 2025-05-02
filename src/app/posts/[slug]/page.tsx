import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { CMS_NAME } from "@/lib/constants";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/components/container";
import Header from "@/app/components/header";
import { PostBody } from "@/app/components/post-body";
import { PostHeader } from "@/app/components/post-header";
import HomeCompleteLayout from "@/app/components/home-complete-layout";
import ForSaleLayout from "@/app/components/for-sale-layout";
import { Metadata } from "next";

export default async function Post({ 
  params,
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  let content;
  const isMdx = post.extension === 'mdx';
  
  // Process all content as Markdown with our custom plugins
  content = await markdownToHtml(post.content || "");
  
  // Add classes to links to make styling more consistent
  content = content.replace(/<a /g, '<a class="animated-link" ');
  
  // Make external links open in a new tab
  content = content.replace(/<a class="animated-link" href="http/g, '<a class="animated-link" target="_blank" rel="noopener noreferrer" href="http');

  const category = post.category || "General";
  const isHomeComplete = category === "Home-Complete";
  const isForSale = category === "For-Sale";

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          {isHomeComplete ? (
            <HomeCompleteLayout
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              category={category}
              content={content}
              isMdx={isMdx}
            />
          ) : isForSale ? (
            <ForSaleLayout
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              category={category}
              content={content}
              isMdx={isMdx}
            />
          ) : (
            <>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
                category={category}
              />
              <PostBody content={content} isMdx={isMdx} />
            </>
          )}
        </article>
      </Container>
    </main>
  );
}

export async function generateMetadata({ 
  params,
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Swisshaus blog with ${CMS_NAME}`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage.url],
    },
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}