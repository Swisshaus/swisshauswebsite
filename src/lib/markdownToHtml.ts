import { remark } from "remark";
import html from "remark-html";

// Custom plugin to handle two-column lists
function remarkTwoColumnList() {
  return (tree: any) => {
    const { visit } = require('unist-util-visit');
    
    visit(tree, 'list', (node: any) => {
      // Check for lists with [two-column] marker in the first item
      if (node.children && node.children.length > 0) {
        const firstItem = node.children[0];
        
        if (firstItem.children && firstItem.children[0] && 
            firstItem.children[0].type === 'paragraph' &&
            firstItem.children[0].children && 
            firstItem.children[0].children[0] && 
            firstItem.children[0].children[0].type === 'text' &&
            firstItem.children[0].children[0].value.includes('[two-column]')) {
          
          // Remove the marker from the first item
          firstItem.children[0].children[0].value = 
            firstItem.children[0].children[0].value.replace('[two-column]', '').trim();
          
          // Add data attribute that can be targeted with CSS
          node.data = node.data || {};
          node.data.hProperties = node.data.hProperties || {};
          node.data.hProperties.className = 'two-column-list';
        }
      }
    });
  };
}

export default async function markdownToHtml(markdown: string) {
  try {
    // Dynamically import unist-util-visit for server-side use
    await import('unist-util-visit');
    
    const result = await remark()
      .use(remarkTwoColumnList)
      .use(html)
      .process(markdown);
    
    let htmlContent = result.toString();
    
    // Add image-grid divs around consecutive images for vertical image pairing
    htmlContent = htmlContent.replace(
      /(<p><img[^>]+><\/p>\s*<p><img[^>]+><\/p>)/g, 
      '<div class="image-grid">$1</div>'
    );
    
    // Preserve iframe tags that might get wrapped in paragraph tags
    htmlContent = htmlContent.replace(
      /<p>(<iframe[^>]*>.*?<\/iframe>)<\/p>/gs,
      '$1'
    );
    
    // Process Google Maps markers
    htmlContent = htmlContent.replace(
      /<p>\[GOOGLE_MAP: (https:\/\/www\.google\.com\/maps\/embed[^\]]+)\]<\/p>/g,
      '<div data-google-map="true" data-map-src="$1"></div>'
    );
    
    return htmlContent;
  } catch (error) {
    console.error('Error processing markdown:', error);
    
    // Fallback to basic rendering if plugin fails
    const result = await remark()
      .use(html)
      .process(markdown);
    
    return result.toString();
  }
}