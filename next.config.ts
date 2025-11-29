import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React compiler for better performance
  reactCompiler: true,

  // Image optimization
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
        ],
      },
    ];
  },

  // Redirects (optional)
  async redirects() {
    return [
      // Redirect old contact endpoint to new one if needed
    ];
  },

  // Rewrites (optional)
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },

  // Optimize fonts
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'lucide-react'],
  },
};

export default nextConfig;
