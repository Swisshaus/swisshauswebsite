/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Other Next.js config options
  
  // Configure Content Security Policy to allow Google Maps iframe
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://www.google.com;"
          }
        ]
      }
    ];
  }
};

export default nextConfig;