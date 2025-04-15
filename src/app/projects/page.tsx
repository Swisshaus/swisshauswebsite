import Image from 'next/image';
import Container from "@/app/components/container";
import { CMS_NAME } from "@/lib/constants";

export const metadata = {
  title: `Our Projects | ${CMS_NAME}`,
  description: 'Explore custom homes built by Swisshaus Design & Build in Kalispell, MT and the Flathead Valley.',
};

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Mountain Modern Retreat",
      location: "Whitefish, MT",
      description: "A contemporary mountain home with expansive views of Whitefish Lake.",
      image: "/assets/blog/preview/cover.jpeg",
    },
    {
      id: 2,
      title: "Craftsman Family Home",
      location: "Kalispell, MT",
      description: "A traditional craftsman-style family home with modern amenities.",
      image: "/assets/blog/hello-world/cover.jpg",
    },
    {
      id: 3,
      title: "Lakeside Cabin",
      location: "Flathead Lake, MT",
      description: "A cozy lakeside cabin perfect for weekend getaways.",
      image: "/assets/blog/dynamic-routing/cover.jpg",
    },
    {
      id: 4,
      title: "Modern Farmhouse",
      location: "Columbia Falls, MT",
      description: "A contemporary take on the classic farmhouse style.",
      image: "/assets/blog/pr7/PRR6.jpg",
    }
  ];

  return (
    <Container>
      <div className="py-28">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight md:leading-none mb-12 text-center">
          Our Projects
        </h1>
        <div className="border-b-2 w-24 mx-auto mb-16 border-red-600"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
          {projects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative h-80 w-full mb-4 overflow-hidden rounded-lg">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-red-600 mb-2">{project.location}</p>
              <p>{project.description}</p>
            </div>
          ))}
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