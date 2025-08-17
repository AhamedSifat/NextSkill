import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'fileupload.t3.storageapi.dev',
        port: '',
        protocol: 'https',
      },

      {
        hostname: 'undefined.t3.storageapi.dev',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
