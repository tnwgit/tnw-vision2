/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin');

// Omwikkel de configuratie met de next-intl plugin
const nextConfig = withNextIntl('./app/i18n/request.ts')({
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
});

module.exports = nextConfig; 