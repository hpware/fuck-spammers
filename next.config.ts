import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React Compiler for automatic optimizations
  reactCompiler: true,

  // Optimize for production
  compress: true,

  // Disable x-powered-by header for smaller response
  poweredByHeader: false,

  // Optimize images (if used later)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },

  // Enable strict mode for better development experience
  reactStrictMode: true,

  // Experimental features for better performance
  experimental: {
    // Optimize package imports for faster builds
    optimizePackageImports: ["convex/react"],
  },
};

export default nextConfig;
