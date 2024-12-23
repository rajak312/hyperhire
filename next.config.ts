import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/menus",
      permanent: true,
    },
  ],
};

export default nextConfig;
