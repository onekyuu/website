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
    domains: [
      "onekyuu-blog.oss-cn-shanghai.aliyuncs.com",
      "static.keyu.wang",
      "images.unsplash.com",
    ],
  },
};

export default withNextIntl({
  ...config,
});
