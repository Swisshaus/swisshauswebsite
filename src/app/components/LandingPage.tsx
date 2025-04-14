import Image from 'next/image';
import Link from 'next/link';

type LandingPageProps = {
  heroImage: string;
  title: string;
  subtitle: string;
};

export default function LandingPage({ heroImage, title, subtitle }: LandingPageProps) {
  return (
    <section className="relative w-full h-screen">
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Swisshaus Hero"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-12 right-12 max-w-lg p-8 bg-black/50 text-white">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-6">{subtitle}</p>
        <Link 
          href="/about" 
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
          Learn More
        </Link>
      </div>
    </section>
  );
}
