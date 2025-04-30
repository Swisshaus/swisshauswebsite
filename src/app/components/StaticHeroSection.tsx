import Link from "next/link";
import Image from "next/image";

export function StaticHeroSection() {
  return (
    <section className="p-5">
      <div className="relative w-full h-[70vh] mb-8">
        <Link href="/posts/pr7">
          <div className="relative w-full h-full">
            <Image
              src="/assets/blog/pr7/FooterDrone2.JPG"
              alt="Custom Home For Sale"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40 flex items-end">
              <div className="max-w-[1200px] w-full mx-auto px-5 pb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
                  New Custom Home For Sale
                </h1>
              </div>
            </div>
          </div>
        </Link>
      </div>
      <div className="max-w-[1200px] mx-auto px-5 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight ">
          <hr className="border-gray-500 dark:border-gray-700 my-3" />
            <Link href="/posts/pr7" className="hover:underline">
              {/* <span className="h-1 w-full bg-black block"></span> */}
            </Link>
          </h3>
        </div>
        <div>
          <div className="text-lg leading-relaxed mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><b>Address:</b> 164 Porter Ranch Rd.</p>
              <p><b>Square Footage:</b> 3,489 ft²</p>
              <p><b>Bedrooms:</b> 4</p>
            </div>
            <div>
              <p><b>Property Size:</b> 5 acres</p>
              <p><b>Bathrooms:</b> 3.5</p>
              <p><b>Garage Spaces:</b> 3</p>
            </div>
          </div>
          <Link 
            href="/posts/pr7" 
            className="inline-block px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            View Details and Progress
          </Link>
        </div>
      </div>
    </section>
  );
}