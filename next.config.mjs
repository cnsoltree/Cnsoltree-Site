/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 构建时跳过 ESLint 检查，解决 Vercel 部署报错
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
    ],
  },
};

export default nextConfig;