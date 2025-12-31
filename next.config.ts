import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,       // <--- REQUIRED FOR STATIC EXPORT
  },
};

export default nextConfig;