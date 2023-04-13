/** @type {import('next').NextConfig} */

const { parsed: localEnv } = require('dotenv').config({
  path: '.env.local',
});


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SERVER_URI: localEnv.SERVER_URI,
  }
}

module.exports = nextConfig
