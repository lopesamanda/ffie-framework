import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/atlas", destination: "/explore", permanent: true },
      { source: "/crie-o-seu-futuro", destination: "/create", permanent: true },
      { source: "/framework", destination: "/about#framework", permanent: true },
      { source: "/sobre", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
