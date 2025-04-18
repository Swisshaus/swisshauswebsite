'use client';

import { useLightbox } from '../contexts/LightboxContext';
import { useEffect } from 'react';

export default function Lightbox() {
  const { 
    isOpen, 
    imageUrl, 
    allImages, 
    currentIndex, 
    closeLightbox,
    nextImage,
    prevImage
  } = useLightbox();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  if (!isOpen || !imageUrl) return null;
  
  // Handle image click to close the lightbox
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeLightbox();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn"
      onClick={closeLightbox}
      data-lightbox-overlay="true"
      aria-modal="true"
      role="dialog"
      aria-label="Image lightbox"
    >
      <div className="relative max-w-full max-h-full">
        {/* Close button */}
        <button
          className="absolute -top-12 right-0 bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/90 z-20"
          onClick={closeLightbox}
          aria-label="Close lightbox"
        >
          <span className="text-2xl">×</span>
        </button>
        
        {/* Navigation indicator */}
        {allImages.length > 1 && (
          <div className="absolute -bottom-10 left-0 right-0 text-center text-white text-sm">
            {currentIndex + 1} / {allImages.length}
          </div>
        )}
        
        {/* Image (clickable to close) */}
        {/* Wrap image in a div for handling clicks more reliably */}
        <div className="relative">
          <img
            src={imageUrl}
            alt="Enlarged view"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded shadow-xl cursor-pointer"
            onClick={handleImageClick}
            data-lightbox-image="true"
          />
          {/* Invisible overlay to help with click detection */}
          <div 
            className="absolute inset-0 cursor-pointer" 
            onClick={handleImageClick}
            aria-label="Close lightbox"
          />
        </div>
        
        {/* Navigation buttons - only show if multiple images */}
        {allImages.length > 1 && (
          <>
            {/* Previous button */}
            <button 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all z-20"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Next button */}
            <button 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all z-20"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
    </div>
  );
}