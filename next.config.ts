import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["lucide-react"],
  async redirects() {
    return [
      {
        source: '/tutors/list',
        destination: '/tutors',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
