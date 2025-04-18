import Image from 'next/image';
import Link from 'next/link';
import Container from "@/app/components/container";
import { CMS_NAME } from "@/lib/constants";
import { getAllPosts } from "@/lib/api";

export const metadata = {
  title: `Our Projects | ${CMS_NAME}`,
  description: 'Explore custom homes built by Swisshaus Design & Build in Kalispell, MT and the Flathead Valley.',
};

export default function Projects() {
  // Fetch all posts with category "Home-Complete"
  const projects = getAllPosts("Home-Complete");

  return (
    <Container>
      <div className="py-28">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
          Our Projects
        </h1>
        <div className="border-b-2 w-24 mx-auto mb-16 border-red-600"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/posts/${project.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p>{project.excerpt}</p>
              </Link>
            ))
          ) : (
            <div className="col-span-2 text-center py-8">
              <p className="text-xl">No completed home projects yet. Check back soon!</p>
            </div>
          )}
        </div>
        
        <div className="text-center my-16">
          <p className="text-xl mb-6">Interested in working with us on your custom home?</p>
          <a 
            href="/contact" 
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </Container>
  );
}