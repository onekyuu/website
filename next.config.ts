import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // 启用standalone模式以优化Docker部署
};

export default nextConfig;
