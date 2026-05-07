import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [68, 72, 76, 82]
  },
  outputFileTracingRoot: path.join(__dirname)
};

export default nextConfig;
