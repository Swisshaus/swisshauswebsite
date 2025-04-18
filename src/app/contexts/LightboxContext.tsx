'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type LightboxContextType = {
  isOpen: boolean;
  imageUrl: string | null;
  allImages: string[];
  currentIndex: number;
  openLightbox: (url: string, allImagesInPost?: string[]) => void;
  closeLightbox: () => void;
  nextImage: () => void;
  prevImage: () => void;
};

// Create context with null initial value and proper type checking
const LightboxContext = createContext<LightboxContextType | null>(null);

export function LightboxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (url: string, allImagesInPost?: string[]) => {
    setImageUrl(url);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    
    // If images collection is provided, store it and find current index
    if (allImagesInPost && allImagesInPost.length > 0) {
      setAllImages(allImagesInPost);
      const index = allImagesInPost.findIndex(img => img === url);
      setCurrentIndex(index !== -1 ? index : 0);
    } else {
      // If only one image is provided
      setAllImages([url]);
      setCurrentIndex(0);
    }
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };
  
  const nextImage = () => {
    if (allImages.length <= 1) return;
    
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setImageUrl(allImages[nextIndex]);
  };
  
  const prevImage = () => {
    if (allImages.length <= 1) return;
    
    const prevIndex = (currentIndex - 1 + allImages.length) % allImages.length;
    setCurrentIndex(prevIndex);
    setImageUrl(allImages[prevIndex]);
  };

  return (
    <LightboxContext.Provider value={{ 
      isOpen, 
      imageUrl, 
      allImages, 
      currentIndex, 
      openLightbox, 
      closeLightbox, 
      nextImage, 
      prevImage 
    }}>
      {children}
    </LightboxContext.Provider>
  );
}

/**
 * Hook to access the lightbox functionality
 * Must be used within a LightboxProvider component
 */
export function useLightbox(): LightboxContextType {
  const context = useContext(LightboxContext);
  if (context === null) {
    throw new Error('useLightbox must be used within a LightboxProvider');
  }
  return context;
}