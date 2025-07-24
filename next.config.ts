import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
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
};

export default withNextIntl({
  ...config,
});
