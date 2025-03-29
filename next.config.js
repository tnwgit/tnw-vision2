/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Staat de build toe om door te gaan ondanks ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Staat de build toe om door te gaan ondanks TypeScript errors
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 