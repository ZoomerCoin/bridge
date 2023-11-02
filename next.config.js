const withVideos = require("next-videos");

/** @type {import('next').NextConfig} */
const nextConfig = withVideos({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
});

module.exports = nextConfig;
