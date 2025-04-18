'use client';

import { useEffect } from 'react';
import { useLightbox } from '../contexts/LightboxContext';

export default function PostImageHandler() {
  const { openLightbox } = useLightbox();

  useEffect(() => {
    // Function to get all blog post images on the page
    const getAllBlogImages = () => {
      // Try to find images in this priority order
      const selectors = [
        // 1. Images in markdown content (most specific)
        () => {
          const markdownContent = document.querySelector('.markdown');
          return markdownContent ? Array.from(markdownContent.querySelectorAll('img')) : [];
        },
        // 2. Images in article content
        () => {
          const article = document.querySelector('article');
          return article ? Array.from(article.querySelectorAll('img')) : [];
        },
        // 3. Any images with blog assets path (least specific)
        () => Array.from(document.querySelectorAll('img[src*="/assets/blog/"]'))
      ];
      
      // Try each selector until we find images
      let blogImages: Element[] = [];
      for (const selector of selectors) {
        blogImages = selector();
        if (blogImages.length > 0) break;
      }
      
      // Cast to HTMLImageElement[] for type safety
      const typedImages = blogImages as HTMLImageElement[];
      
      // Exclude patterns for images that aren't part of the blog content
      const excludePatterns = [
        (img: HTMLImageElement) => img.src.includes('/authors/'),
        (img: HTMLImageElement) => !!img.closest('.avatar'),
        (img: HTMLImageElement) => img.classList.contains('avatar-image'),
        (img: HTMLImageElement) => img.alt?.toLowerCase().includes('avatar'),
        (img: HTMLImageElement) => img.alt?.toLowerCase().includes('author'),
        (img: HTMLImageElement) => img.width < 100 || img.height < 100
      ];
      
      // Filter and process the images
      return typedImages
        .filter(img => !excludePatterns.some(pattern => pattern(img))) // Exclude avatar images
        .map(img => img.src)
        .filter(Boolean) // Remove any undefined/empty values
        .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates
    };
    
    // Add global document-level click handler to catch all image clicks
    const handleImageClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Quick early returns for non-image elements
      if (target.tagName !== 'IMG') return;
      
      // Check if the lightbox is already open
      const lightbox = document.querySelector('[data-lightbox-overlay="true"]');
      if (lightbox?.contains(target)) {
        // Only handle lightbox image clicks if they have our data attribute
        if (target.hasAttribute('data-lightbox-image')) {
          // Click will be handled by the lightbox component
        }
        return;
      }
      
      const img = target as HTMLImageElement;
      
      // Skip non-blog images
      const isAvatar = 
        img.src.includes('/authors/') || 
        !!img.closest('.avatar') || 
        img.classList.contains('avatar-image') ||
        img.alt?.toLowerCase().includes('avatar') || 
        img.alt?.toLowerCase().includes('author') ||
        img.width < 100;
        
      if (isAvatar) return;
      
      // Proceed only for blog content images
      const isBlogImage = img.src.includes('/assets/blog/') || !!img.closest('article');
      if (!isBlogImage) return;
      
      // We have a valid blog image click - handle it
      e.preventDefault();
      e.stopPropagation();
      
      // Get all images and open the lightbox
      const allImages = getAllBlogImages();
      openLightbox(img.src, allImages);
    };
    
    // Add capturing phase listener to catch events before they bubble
    document.addEventListener('click', handleImageClick, true);
    
    // Add styles to make images appear clickable
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `
      /* Base styles for clickable blog images */
      article img:not(.avatar-image):not([width="12"]):not([width="24"]), 
      img[src*="/assets/blog/"] {
        cursor: pointer !important;
        transition: all 0.2s ease-in-out !important;
      }
      
      /* Hover effect for blog images */
      article img:not(.avatar-image):not([width="12"]):not([width="24"]):hover, 
      img[src*="/assets/blog/"]:hover {
        opacity: 0.9 !important;
        transform: scale(1.01) !important;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important;
      }
      
      /* Animation for lightbox */
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      /* Ensure avatar images are never affected */
      .avatar-image, 
      img[src*="/authors/"], 
      img[alt*="avatar"], 
      img[alt*="author"] {
        cursor: default !important;
        transition: none !important;
      }
      
      .avatar-image:hover, 
      img[src*="/authors/"]:hover, 
      img[alt*="avatar"]:hover, 
      img[alt*="author"]:hover {
        transform: none !important;
        box-shadow: none !important;
      }
    `;
    document.head.appendChild(styleEl);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleImageClick, true);
      document.head.removeChild(styleEl);
    };
  }, [openLightbox]);

  return null;
}