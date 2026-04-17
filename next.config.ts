import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "ecommerce.routemisr.com",
        protocol: "https",
        pathname: "/**",
      },
      {
        hostname: "picsum.photos",
        protocol: "https",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
