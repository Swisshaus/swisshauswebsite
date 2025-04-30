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

type Params = {
  params: {
    slug: string;
  };
};

export default async function Post({ params }: Params) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  let content;
  const isMdx = post.extension === 'mdx';
  
  // Process all content as Markdown with our custom plugins
  content = await markdownToHtml(post.content || "");
  
  // Add classes to links to make styling more consistent
  content = content.replace(/<a /g, '<a class="animated-link" ');

  const isHomeComplete = post.category === "Home-Complete";
  const isForSale = post.category === "For-Sale";

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
              category={post.category}
              content={content}
              isMdx={isMdx}
            />
          ) : isForSale ? (
            <ForSaleLayout
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author}
              category={post.category}
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
                category={post.category}
              />
              <PostBody content={content} isMdx={isMdx} />
            </>
          )}
        </article>
      </Container>
    </main>
  );
}

export function generateMetadata({ params }: Params): Metadata {
  const post = getPostBySlug(params.slug);

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