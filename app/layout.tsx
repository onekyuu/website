import "@fontsource-variable/noto-sans-sc";
import "@fontsource-variable/noto-sans-jp";
import "./globals.css";

export const metadata = {
  title: "OneKyuu Website",
  description: "OneKyuu's personal website.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
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
