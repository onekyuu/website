import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const config: NextConfig = {
  output: "standalone",
  turbopack: {},
  images: {
    domains: ["onekyuu-blog.oss-cn-shanghai.aliyuncs.com", "static.keyu.wang"],
  },
};

export default withNextIntl(config);
