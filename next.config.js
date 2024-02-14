/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'атлантис.рф',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's3-alpha-sig.figma.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'атлантис.рф',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'xn--80aayklzcd.xn--p1ai',
        port: '',
      },
    ],
  },
  experimental: {
    // This is experimental but can
    // be enabled to allow parallel threads
    // with nextjs automatic static generation
    workerThreads: false,
    cpus: 4,
  },
};
