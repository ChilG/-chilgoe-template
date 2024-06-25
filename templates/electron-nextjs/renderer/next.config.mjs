/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: process.env.NODE_ENV === 'production' ? '../app' : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
