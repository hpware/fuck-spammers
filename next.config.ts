import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  compress: true,
  poweredByHeader: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["convex/react"],
  },
};

export default nextConfig;
