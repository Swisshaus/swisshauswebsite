'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';

type SlideData = {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
};

type LandingPageProps = {
  slides?: SlideData[];
  interval?: number; // in milliseconds
};

const defaultSlides: SlideData[] = [
  {
    image: '/assets/blog/pr7/FooterDrone1.JPG',
    title: 'New Home for Sale',
    subtitle: 'See photos and build progress',
    link: '/posts/pr7',
    linkText: 'Learn More'
  },
  {
    image: '/assets/blog/Lidstrom/AlpineB.JPG',
    title: 'Alpine Meadow',
    subtitle: 'View some of our recent homes',
    link: '/posts/alpine-meadow',
    linkText: 'See Project'
  },
  {
    image: '/assets/blog/porterranch/PRR1.jpg',
    title: 'Porter Ranch Reserve',
    subtitle: 'New neighborhood in Lower Valley, 7 lots available',
    link: '/posts/porterranch',
    linkText: 'View Project'
  }
];

// Static data for mobile screens - just use the first slide
const mobileSlide = defaultSlides[0];

export default function LandingPage({ 
  slides = defaultSlides, 
  interval = 8000 // Increased to 8 seconds
}: LandingPageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Check initially
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only advance slides on non-mobile screens
  useEffect(() => {
    if (isMobile) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, interval);
    
    return () => clearInterval(timer);
  }, [interval, slides.length, isMobile]);

  const goToSlide = (index: number) => {
    if (index === currentSlide || isMobile) return;
    setCurrentSlide(index);
  };

  // For mobile, just render a single static slide
  if (isMobile) {
    return (
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={mobileSlide.image}
            alt={mobileSlide.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        
        <div className="absolute bottom-8 right-4 left-4 p-6 bg-black/60 backdrop-blur-sm text-white z-20">
          <h1 className="text-3xl font-bold mb-2">{mobileSlide.title}</h1>
          <p className="text-base mb-4">{mobileSlide.subtitle}</p>
          <Link 
            href={mobileSlide.link} 
            className="inline-block px-5 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            {mobileSlide.linkText}
          </Link>
        </div>
      </section>
    );
  }

  // For tablet and desktop
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide 
              ? 'opacity-100 z-10' 
              : 'opacity-0 z-0'
          }`}
          aria-hidden={index !== currentSlide}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}
      
      {/* Slide content */}
      <div className="absolute bottom-12 right-12 max-w-lg p-8 bg-black/60 backdrop-blur-sm text-white z-20">
        <h1 className="text-5xl font-bold mb-4">{slides[currentSlide].title}</h1>
        <p className="text-xl mb-6">{slides[currentSlide].subtitle}</p>
        <Link 
          href={slides[currentSlide].link} 
          className="inline-block px-6 py-3 bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
        >
          {slides[currentSlide].linkText}
        </Link>
      </div>
      
      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === currentSlide 
                ? 'bg-white' 
                : 'bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  );
}
