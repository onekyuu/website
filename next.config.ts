import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.keyu.wang",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "onekyuu-blog.oss-cn-shanghai.aliyuncs.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // 添加 assetPrefix 配置（如果使用 CDN 或子路径）
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.keyu.wang' : '',
  // 确保静态资源正确生成
  generateBuildId: async () => {
    return process.env.BUILD_ID || "build-id";
  },
  // 添加压缩配置
  compress: true,
  // 确保静态文件正确处理
  experimental: {
    // 如果使用 App Router
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default withNextIntl(nextConfig);
