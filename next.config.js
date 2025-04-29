/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/swipe-shop',
  assetPrefix: '/swipe-shop/',
  trailingSlash: true,
  distDir: 'out',
}

module.exports = nextConfig 