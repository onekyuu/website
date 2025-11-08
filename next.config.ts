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
    unoptimized: true,
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
  generateBuildId: async () => {
    return process.env.BUILD_ID || "build-id";
  },
  compress: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default withNextIntl(nextConfig);
