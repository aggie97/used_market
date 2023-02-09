/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["storage.googleapis.com"],
  },
  reactStrictMode: true,
  swcMinify: false,
};

module.exports = nextConfig;
