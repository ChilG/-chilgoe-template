/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: '../app',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
