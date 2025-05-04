import LocaleSwitcher from "@/components/LocaleSwitcher";
import { ModeToggle } from "@/components/ModeToggle";
import Image from "next/image";

export default function Page() {
  return (
    <div>
      <Image
        src={
          "http://onekyuu-blog.oss-cn-shanghai.aliyuncs.com/uploads/1745970336851-tcf2o5/python.png"
        }
        alt="logo"
        width={100}
        height={100}
        unoptimized
      />
      <LocaleSwitcher />
      <ModeToggle />
    </div>
  );
}
