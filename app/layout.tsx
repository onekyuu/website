import "./globals.css";

export const metadata = {
  title: "OneKyuu Website",
  description: "OneKyuu's personal website.",
  icons: {
    icons: {
      icon: [
        // { url: "/favicon.ico", type: "image/x-icon" },
        { url: "/favicon.png", type: "image/png" },
      ],
      // 也可以指定不同尺寸的图标
      // apple: { url: "/favicon.png", type: "image/png" },
    },
  },
  openGraph: {
    title: "OneKyuu Website",
    description: "OneKyuu's personal website.",
    url: "https://keyu.wang",
    images: [
      "https://onekyuu-blog.oss-cn-shanghai.aliyuncs.com/uploads/1745970336851-tcf2o5/python.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
