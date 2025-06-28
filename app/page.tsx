import { redirect } from "next/navigation";

export default function RootPage() {
  // 重定向到默认语言路径，这里使用英语作为默认语言
  redirect("/en");
}
