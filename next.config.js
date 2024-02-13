/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'grandavenue.ru',
        port: '',
      },
    ],
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 4
  }
}
