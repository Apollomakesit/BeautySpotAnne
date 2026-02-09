/** @type {import('next').Config} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['lh3.googleusercontent.com', 'platform-lookaside.fbsbx.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig
