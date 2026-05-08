import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/accounts/:path*',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/tutors/list',
        destination: '/tutors',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
