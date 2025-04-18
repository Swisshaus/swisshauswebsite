// Direct lightbox script - runs immediately
console.log('Lightbox script loaded');

// Create lightbox container
function createLightbox() {
  console.log('Creating lightbox');
  
  // Create lightbox elements
  const lightbox = document.createElement('div');
  lightbox.id = 'direct-lightbox';
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 9999;
    display: none;
    justify-content: center;
    align-items: center;
  `;
  
  const imgContainer = document.createElement('div');
  imgContainer.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90%;
  `;
  
  const img = document.createElement('img');
  img.id = 'lightbox-img';
  img.style.cssText = `
    max-width: 100%;
    max-height: 90vh;
    display: block;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  `;
  
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '×';
  closeBtn.style.cssText = `
    position: absolute;
    top: -40px;
    right: 0;
    background: rgba(0,0,0,0.7);
    border: none;
    color: white;
    font-size: 24px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
  `;
  
  // Assemble and add to document
  imgContainer.appendChild(img);
  imgContainer.appendChild(closeBtn);
  lightbox.appendChild(imgContainer);
  document.body.appendChild(lightbox);
  
  // Set up event handlers
  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
      lightbox.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
  
  return lightbox;
}

// Function to add click handlers to all blog post images
function setupImageClickHandlers() {
  console.log('Setting up image click handlers');
  
  // Try multiple selectors to find the blog post images
  const selectors = [
    '.markdown img',
    '[class*="markdown"] img',
    '.max-w-2xl img', 
    'article img',
    'img[src*="/assets/blog/"]'
  ];
  
  let images = [];
  let foundSelector = null;
  
  // Try each selector until we find images
  for (const selector of selectors) {
    const found = document.querySelectorAll(selector);
    console.log(`Selector "${selector}" found ${found.length} images`);
    
    if (found.length > 0) {
      images = found;
      foundSelector = selector;
      break;
    }
  }
  
  console.log(`Using selector "${foundSelector}" - Found ${images.length} blog post images`);
  
  // Get or create the lightbox
  let lightbox = document.getElementById('direct-lightbox');
  if (!lightbox) {
    lightbox = createLightbox();
  }
  
  // Add click handlers to images
  images.forEach((img, index) => {
    img.style.cursor = 'pointer';
    
    // Skip if already processed
    if (img.dataset.lightboxProcessed) return;
    img.dataset.lightboxProcessed = 'true';
    
    console.log(`Processing image ${index + 1}:`, img.src);
    
    img.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Image clicked:', img.src);
      
      // Display the image in the lightbox
      const lightboxImg = document.getElementById('lightbox-img');
      lightboxImg.src = img.src;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
}

// Wait for DOMContentLoaded to run
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded');
    setTimeout(setupImageClickHandlers, 1000);
  });
} else {
  console.log('DOM already loaded');
  setTimeout(setupImageClickHandlers, 1000);
}

// Also run on load to catch any lagging images
window.addEventListener('load', () => {
  console.log('Window load event');
  setTimeout(setupImageClickHandlers, 1000);
});

// Run again after any navigation in SPA
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' || e.target.closest('a')) {
    setTimeout(() => {
      console.log('Navigation detected, re-checking for images');
      setupImageClickHandlers();
    }, 1000);
  }
});

// Also set up a MutationObserver to detect DOM changes
const observer = new MutationObserver(() => {
  setTimeout(setupImageClickHandlers, 500);
});

// Start observing once the DOM is ready
setTimeout(() => {
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
  console.log('MutationObserver started');
}, 2000);

console.log('Lightbox script initialization complete');