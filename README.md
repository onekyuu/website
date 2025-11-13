**Languages:** [English](./README.en.md) | 简体中文 | [日本語](./README.ja.md)

---

# 个人网站

一个现代化、功能丰富的个人作品集网站，采用 Next.js 15 构建，支持国际化、深色模式、平滑滚动和动画效果。

## ✨ 核心特性

### 🌐 国际化支持

- 支持中文（简体）、英文、日文三种语言
- 基于 `next-intl` 实现完整的国际化方案
- URL 路径自动适配语言环境
- 语言切换器组件，无缝切换语言

### 🎨 主题系统

- 亮色/暗色模式切换
- 基于 `next-themes` 实现主题持久化
- 自动适配系统主题偏好
- 平滑的主题过渡动画

### 📝 博客系统

- 基于 Tiptap 的富文本渲染
- 支持标题、列表、图片、代码块等多种内容格式
- 自动生成文章目录（TOC）
- 服务端渲染（SSR）支持
- 响应式图片优化

### 🎯 作品集展示

- 项目列表与详情页面
- 旋转文字动画效果
- 技术栈图标展示
- 项目分类与筛选

### 🖼️ 照片画廊

- 按年份分组的时间线展示
- 照片数量统计
- 集成 `yet-another-react-lightbox` 照片查看器
- 支持缩放、全屏、键盘导航
- 响应式网格布局

### 🎭 动画效果

- GSAP 驱动的滚动动画
- Lenis 平滑滚动
- 水平滚动区域
- 视差效果
- 悬浮文字动画
- 入场动画

### 📱 响应式设计

- 移动端优先设计
- 触摸手势支持
- 自适应布局
- 优化的移动端体验

## 🛠️ 技术栈

### 核心框架

- **Next.js** 15.4.3 - React 框架，支持 App Router 和 Turbopack
- **React** 19.2.0 - UI 库
- **TypeScript** 5.9.3 - 类型安全

### 样式方案

- **Tailwind CSS** 4.1.17 - 原子化 CSS 框架
- **CSS Variables** - 自定义主题变量

### UI 组件

- **Shadcn/UI** - 无样式组件库
  - Dialog、Dropdown Menu、Label、Select、Separator、Slot 等
- **Lucide React** 0.505.0 - 图标库

### 动画库

- **GSAP** 3.13.0 - 专业级动画库
- **ScrollTrigger** - GSAP 滚动触发插件
- **Lenis** 1.3.14 - 平滑滚动
- **Motion** (Framer Motion) 12.23.24 - React 动画库

### 富文本编辑

- **@tiptap/react** 3.10.5 - 无头编辑器框架

### 照片查看器

- **yet-another-react-lightbox** 3.25.0 - 现代化照片查看器

### 数据获取

- **@tanstack/react-query** 5.90.7 - 服务端状态管理

### 国际化

- **next-intl** 4.5.0 - Next.js 国际化解决方案

### 主题管理

- **next-themes** 0.4.6 - Next.js 主题切换

### 开发工具

- **ESLint** 9.39.1 - 代码检查
- **PostCSS** - CSS 处理
- **pnpm** - 包管理器

## 📂 项目结构

```
website/
├── app/                      # Next.js App Router
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── [locale]/            # 国际化路由
│       ├── layout.tsx       # 语言布局
│       ├── page.tsx         # 首页
│       ├── blog/            # 博客页面
│       ├── gallery/         # 照片画廊
│       └── portfolio/       # 作品集
├── components/              # React 组件
│   ├── ui/                  # UI 基础组件
│   ├── home/                # 首页组件
│   ├── blog/                # 博客组件
│   ├── gallery/             # 画廊组件
│   ├── portfolio/           # 作品集组件
│   ├── TiptapContent.tsx    # Tiptap 内容渲染
│   ├── SmoothScroll.tsx     # 平滑滚动
│   └── HorizontalScroll.tsx # 水平滚动
├── hooks/                   # React Hooks
│   ├── useGallery.ts        # 画廊数据
│   ├── usePosts.ts          # 博客数据
│   ├── useProjects.ts       # 项目数据
│   └── useSkills.ts         # 技能数据
├── i18n/                    # 国际化配置
│   ├── config.ts            # i18n 配置
│   └── request.ts           # 请求配置
├── lib/                     # 工具库
│   ├── api/                 # API 客户端
│   ├── constants.ts         # 常量
│   ├── fetcher.ts           # 数据获取
│   └── utils.ts             # 工具函数
├── messages/                # 国际化翻译
│   ├── en/                  # 英文
│   ├── ja/                  # 日文
│   └── zh/                  # 中文
├── providers/               # React Context
│   └── QueryProvider.tsx    # React Query Provider
├── public/                  # 静态资源
│   └── animations/          # Lottie 动画
├── styles/                  # 样式文件
│   └── photoviewer.css      # 照片查看器样式
├── types/                   # TypeScript 类型定义
├── next.config.ts           # Next.js 配置
├── tailwind.config.ts       # Tailwind 配置
└── tsconfig.json            # TypeScript 配置
```

## 🚀 快速开始

### 环境要求

- Node.js 18.17 或更高版本
- pnpm 8.0 或更高版本

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License
