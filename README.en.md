**Languages:** English | [简体中文](./README.zh-CN.md) | [日本語](./README.ja.md)

---

# Personal Website

A modern, feature-rich personal portfolio website built with Next.js 15, supporting internationalization, dark mode, smooth scrolling, and animation effects.

## ✨ Core Features

### 🌐 Internationalization Support

- Support for Simplified Chinese, English, and Japanese
- Complete internationalization solution based on `next-intl`
- Automatic URL path adaptation to language environment
- Seamless language switcher component

### 🎨 Theme System

- Light/Dark mode switching
- Theme persistence based on `next-themes`
- Automatic system theme preference adaptation
- Smooth theme transition animations

### 📝 Blog System

- Rich text rendering based on Tiptap
- Support for headings, lists, images, code blocks, and more
- Automatic table of contents (TOC) generation
- Server-side rendering (SSR) support
- Responsive image optimization

### 🎯 Portfolio Display

- Project list and detail pages
- Rotating text animation effects
- Technology stack icon display
- Project categorization and filtering

### 🖼️ Photo Gallery

- Year-based timeline grouping
- Photo count statistics
- Integration with `yet-another-react-lightbox` photo viewer
- Zoom, fullscreen, and keyboard navigation support
- Responsive grid layout

### 🎭 Animation Effects

- GSAP-powered scroll animations
- Lenis smooth scrolling
- Horizontal scroll areas
- Parallax effects
- Floating text animations
- Entrance animations

### 📱 Responsive Design

- Mobile-first design approach
- Touch gesture support
- Adaptive layouts
- Optimized mobile experience

## 🛠️ Tech Stack

### Core Framework

- **Next.js** 15.4.3 - React framework with App Router and Turbopack support
- **React** 19.2.0 - UI library
- **TypeScript** 5.9.3 - Type safety

### Styling Solution

- **Tailwind CSS** 4.1.17 - Utility-first CSS framework
- **CSS Variables** - Custom theme variables

### UI Components

- **Radix UI** - Unstyled component library
  - Dialog, Dropdown Menu, Label, Select, Separator, Slot, etc.
- **Lucide React** 0.505.0 - Icon library

### Animation Libraries

- **GSAP** 3.13.0 - Professional-grade animation library
- **ScrollTrigger** - GSAP scroll trigger plugin
- **Lenis** 1.3.14 - Smooth scrolling
- **Motion** (Framer Motion) 12.23.24 - React animation library

### Rich Text Editing

- **@tiptap/react** 3.10.5 - Headless editor framework

### Photo Viewer

- **yet-another-react-lightbox** 3.25.0 - Modern photo viewer

### Data Fetching

- **@tanstack/react-query** 5.90.7 - Server state management

### Internationalization

- **next-intl** 4.5.0 - Next.js internationalization solution

### Theme Management

- **next-themes** 0.4.6 - Next.js theme switching

### Development Tools

- **ESLint** 9.39.1 - Code linting
- **PostCSS** - CSS processing
- **pnpm** - Package manager

## 📂 Project Structure

```
website/
├── app/                      # Next.js App Router
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── [locale]/            # Internationalized routing
│       ├── layout.tsx       # Language layout
│       ├── page.tsx         # Home page
│       ├── blog/            # Blog pages
│       ├── gallery/         # Photo gallery
│       └── portfolio/       # Portfolio
├── components/              # React components
│   ├── ui/                  # Base UI components
│   ├── home/                # Home page components
│   ├── blog/                # Blog components
│   ├── gallery/             # Gallery components
│   ├── portfolio/           # Portfolio components
│   ├── TiptapContent.tsx    # Tiptap content rendering
│   ├── SmoothScroll.tsx     # Smooth scrolling
│   └── HorizontalScroll.tsx # Horizontal scrolling
├── hooks/                   # React Hooks
│   ├── useGallery.ts        # Gallery data
│   ├── usePosts.ts          # Blog data
│   ├── useProjects.ts       # Project data
│   └── useSkills.ts         # Skills data
├── i18n/                    # Internationalization config
│   ├── config.ts            # i18n configuration
│   └── request.ts           # Request configuration
├── lib/                     # Utility libraries
│   ├── api/                 # API clients
│   ├── constants.ts         # Constants
│   ├── fetcher.ts           # Data fetching
│   └── utils.ts             # Utility functions
├── messages/                # Internationalization translations
│   ├── en/                  # English
│   ├── ja/                  # Japanese
│   └── zh/                  # Chinese
├── providers/               # React Context
│   └── QueryProvider.tsx    # React Query Provider
├── public/                  # Static assets
│   └── animations/          # Lottie animations
├── styles/                  # Style files
│   └── photoviewer.css      # Photo viewer styles
├── types/                   # TypeScript type definitions
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🚀 Quick Start

### Requirements

- Node.js 18.17 or higher
- pnpm 8.0 or higher

### Install Dependencies

```bash
pnpm install
```

### Development Mode

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
pnpm build
```

### Start Production Server

```bash
pnpm start
```

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License
