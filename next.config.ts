import type { NextConfig } from "next";

const nextConfig: any = {
  transpilePackages: ["lucide-react"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
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
