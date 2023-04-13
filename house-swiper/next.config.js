/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URI: process.env.SERVER_URI,
  }
}

module.exports = nextConfig;

