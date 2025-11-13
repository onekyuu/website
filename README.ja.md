**Languages:** [English](./README.en.md) | [简体中文](./README.zh-CN.md) | 日本語

---

# 個人ウェブサイト

Next.js 15 で構築された、国際化、ダークモード、スムーススクロール、アニメーション効果を備えた、モダンで機能豊富な個人ポートフォリオウェブサイトです。

## ✨ コア機能

### 🌐 国際化サポート

- 中国語（簡体字）、英語、日本語の 3 言語対応
- `next-intl` による完全な国際化ソリューション
- URL パスの自動言語適応
- シームレスな言語切り替えコンポーネント

### 🎨 テーマシステム

- ライト/ダークモード切り替え
- `next-themes` によるテーマの永続化
- システムテーマの自動適応
- スムーズなテーマ遷移アニメーション

### 📝 ブログシステム

- Tiptap ベースのリッチテキストレンダリング
- 見出し、リスト、画像、コードブロックなど多様なコンテンツフォーマット対応
- 自動目次（TOC）生成
- サーバーサイドレンダリング（SSR）対応
- レスポンシブ画像最適化

### 🎯 ポートフォリオ展示

- プロジェクト一覧と詳細ページ
- 回転テキストアニメーション効果
- 技術スタックアイコン表示
- プロジェクトの分類とフィルタリング

### 🖼️ フォトギャラリー

- 年別グループ化されたタイムライン表示
- 写真数の統計
- `yet-another-react-lightbox` フォトビューアー統合
- ズーム、フルスクリーン、キーボードナビゲーション対応
- レスポンシブグリッドレイアウト

### 🎭 アニメーション効果

- GSAP によるスクロールアニメーション
- Lenis スムーススクロール
- 横スクロールエリア
- パララックス効果
- フローティングテキストアニメーション
- エントランスアニメーション

### 📱 レスポンシブデザイン

- モバイルファースト設計
- タッチジェスチャー対応
- 適応型レイアウト
- 最適化されたモバイル体験

## 🛠️ 技術スタック

### コアフレームワーク

- **Next.js** 15.4.3 - React フレームワーク、App Router と Turbopack 対応
- **React** 19.2.0 - UI ライブラリ
- **TypeScript** 5.9.3 - 型安全性

### スタイリングソリューション

- **Tailwind CSS** 4.1.17 - ユーティリティファースト CSS フレームワーク
- **CSS Variables** - カスタムテーマ変数

### UI コンポーネント

- **Shadcn/UI** - ヘッドレス UI コンポーネントライブラリ
  - Dialog、Dropdown Menu、Label、Select、Separator、Slot など
- **Lucide React** 0.505.0 - アイコンライブラリ

### アニメーションライブラリ

- **GSAP** 3.13.0 - プロフェッショナルグレードアニメーションライブラリ
- **ScrollTrigger** - GSAP スクロールトリガープラグイン
- **Lenis** 1.3.14 - スムーススクロール
- **Motion** (Framer Motion) 12.23.24 - React アニメーションライブラリ

### リッチテキスト編集

- **@tiptap/react** 3.10.5 - ヘッドレスエディターフレームワーク

### フォトビューアー

- **yet-another-react-lightbox** 3.25.0 - モダンフォトビューアー

### データ取得

- **@tanstack/react-query** 5.90.7 - サーバー状態管理

### 国際化

- **next-intl** 4.5.0 - Next.js 国際化ソリューション

### テーマ管理

- **next-themes** 0.4.6 - Next.js テーマ切り替え

### 開発ツール

- **ESLint** 9.39.1 - コードリント
- **PostCSS** - CSS 処理
- **pnpm** - パッケージマネージャー

## 📂 プロジェクト構造

```
website/
├── app/                      # Next.js App Router
│   ├── globals.css          # グローバルスタイル
│   ├── layout.tsx           # ルートレイアウト
│   └── [locale]/            # 国際化ルーティング
│       ├── layout.tsx       # 言語レイアウト
│       ├── page.tsx         # ホームページ
│       ├── blog/            # ブログページ
│       ├── gallery/         # フォトギャラリー
│       └── portfolio/       # ポートフォリオ
├── components/              # React コンポーネント
│   ├── ui/                  # UI 基本コンポーネント
│   ├── home/                # ホームページコンポーネント
│   ├── blog/                # ブログコンポーネント
│   ├── gallery/             # ギャラリーコンポーネント
│   ├── portfolio/           # ポートフォリオコンポーネント
│   ├── TiptapContent.tsx    # Tiptap コンテンツレンダリング
│   ├── SmoothScroll.tsx     # スムーススクロール
│   └── HorizontalScroll.tsx # 横スクロール
├── hooks/                   # React Hooks
│   ├── useGallery.ts        # ギャラリーデータ
│   ├── usePosts.ts          # ブログデータ
│   ├── useProjects.ts       # プロジェクトデータ
│   └── useSkills.ts         # スキルデータ
├── i18n/                    # 国際化設定
│   ├── config.ts            # i18n 設定
│   └── request.ts           # リクエスト設定
├── lib/                     # ユーティリティライブラリ
│   ├── api/                 # API クライアント
│   ├── constants.ts         # 定数
│   ├── fetcher.ts           # データ取得
│   └── utils.ts             # ユーティリティ関数
├── messages/                # 国際化翻訳
│   ├── en/                  # 英語
│   ├── ja/                  # 日本語
│   └── zh/                  # 中国語
├── providers/               # React Context
│   └── QueryProvider.tsx    # React Query Provider
├── public/                  # 静的リソース
│   └── animations/          # Lottie アニメーション
├── styles/                  # スタイルファイル
│   └── photoviewer.css      # フォトビューアースタイル
├── types/                   # TypeScript 型定義
├── next.config.ts           # Next.js 設定
├── tailwind.config.ts       # Tailwind 設定
└── tsconfig.json            # TypeScript 設定
```

## 🚀 クイックスタート

### 環境要件

- Node.js 18.17 以上
- pnpm 8.0 以上

### 依存関係のインストール

```bash
pnpm install
```

### 開発モード

```bash
pnpm dev
```

[http://localhost:3000](http://localhost:3000) にアクセスしてウェブサイトを確認できます。

### プロダクションビルド

```bash
pnpm build
```

### プロダクションサーバー起動

```bash
pnpm start
```

## 🤝 コントリビューション

Issue や Pull Request の提出を歓迎します！

## 📄 ライセンス

MIT License
