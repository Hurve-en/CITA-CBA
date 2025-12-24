/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: false,
  buildExcludes: [/middleware-manifest\.json$/],
})

const nextConfig = withPWA({
  reactStrictMode: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  compress: true,
  swcMinify: true,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // REMOVED experimental optimizeCss - it was causing the critters error
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts'],
  },
})

module.exports = nextConfig