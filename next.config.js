/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { 
    unoptimized: true,
    domains: ['randomuser.me'], // Add any other image domains you're using
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  experimental: {
    optimizeCss: true,
  }
};

module.exports = nextConfig;