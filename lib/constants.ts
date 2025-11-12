import JavsScriptIcon from "@/assets/dev-icons/javascript.svg";
import TypeScriptIcon from "@/assets/dev-icons/typescript.svg";
import ReactIcon from "@/assets/dev-icons/react.svg";
import NextJsIcon from "@/assets/dev-icons/nextjs.svg";
import NodeJsIcon from "@/assets/dev-icons/nodejs.svg";
import PythonIcon from "@/assets/dev-icons/python.svg";
import PostgreSQLIcon from "@/assets/dev-icons/postgresql.svg";
import HTML5Icon from "@/assets/dev-icons/html5.svg";
import CSS3Icon from "@/assets/dev-icons/css3.svg";
import TailwindCSSIcon from "@/assets/dev-icons/tailwindcss.svg";
import GitIcon from "@/assets/dev-icons/git.svg";
import DockerIcon from "@/assets/dev-icons/docker.svg";
import GithubIcon from "@/assets/github.svg";
import LeetcodeIcon from "@/assets/leetcode.svg";
import ZennIcon from "@/assets/zenn.svg";
import InstagramIcon from "@/assets/instagram.svg";

export const HeaderMenu = [
  {
    key: "home",
    name: "Home",
    href: "/",
  },
  {
    key: "portfolio",
    name: "Protfolio",
    href: "/portfolio",
  },
  {
    key: "blog",
    name: "Blog",
    href: "/blog",
  },
  {
    key: "gallery",
    name: "Gallery",
    href: "/gallery",
  },
];

export const skillsList = [
  {
    key: "javascript",
    name: "JavaScript",
    icon: JavsScriptIcon,
    order: 2,
  },
  {
    key: "typescript",
    name: "TypeScript",
    icon: TypeScriptIcon,
    order: 1,
  },
  {
    key: "react",
    name: "React",
    icon: ReactIcon,
    order: 0,
  },
  {
    key: "nextjs",
    name: "Next.js",
    icon: NextJsIcon,
    order: 0,
  },
  {
    key: "nodejs",
    name: "Node.js",
    icon: NodeJsIcon,
    order: 1,
  },
  {
    key: "python",
    name: "Python",
    icon: PythonIcon,
    order: 2,
  },
  {
    key: "postgresql",
    name: "PostgreSQL",
    icon: PostgreSQLIcon,
    order: 2,
  },
  {
    key: "html5",
    name: "HTML5",
    icon: HTML5Icon,
    order: 1,
  },
  {
    key: "css3",
    name: "CSS3",
    icon: CSS3Icon,
    order: 0,
  },
  {
    key: "tailwindcss",
    name: "Tailwind CSS",
    icon: TailwindCSSIcon,
    order: 0,
  },
  {
    key: "git",
    name: "Git",
    icon: GitIcon,
    order: 1,
  },
  {
    key: "docker",
    name: "Docker",
    icon: DockerIcon,
    order: 2,
  },
];

export const SocialMediaMap = [
  {
    name: "GitHub",
    icon: GithubIcon,
    url: "https://github.com/onekyuu",
  },
  {
    name: "LeetCode",
    icon: LeetcodeIcon,
    url: "https://leetcode.com/u/onekyuu/",
  },
  {
    name: "Zenn",
    icon: ZennIcon,
    url: "https://zenn.dev/onekyuu",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/onekyuu_?igsh=N2VkcHpiMnFvOGVi&utm_source=qr",
  },
];
