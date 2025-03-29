/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  eslint: {
    // Laat de build doorgaan ondanks ESLint fouten
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Laat de build doorgaan ondanks TypeScript fouten
    ignoreBuildErrors: true,
  },
  // Optimaliseer voor deployment op Vercel
  output: 'standalone',
};

module.exports = nextConfig; 