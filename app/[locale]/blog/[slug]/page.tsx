"use client";

import dayjs from "dayjs";
import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { FC, useMemo } from "react";

import { TableOfContents } from "@/components/TableOfContents";
import { TiptapContent } from "@/components/TiptapContent";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { SectionShell } from "@/components/layout/SectionShell";
import { MetadataList } from "@/components/site/MetadataList";
import { SiteButton } from "@/components/site/SiteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostDetail } from "@/hooks/usePosts";
import { useTiptapHeadings } from "@/hooks/useTiptapHeadings";
import { Link } from "@/i18n/navigations";
import { LanguageCode } from "@/types/common";
import { cn } from "@/lib/utils";

const LANG_LABELS: Record<string, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
};

const BlogDetailPage: FC = () => {
  const t = useTranslations("Blog");
  const params = useParams();
  const slug = params?.slug as string;
  const locale = params?.locale as LanguageCode;

  const { data: post, isLoading } = usePostDetail(slug);

  const data = useMemo(() => {
    const translation = post?.translations[locale];
    const availableLangs = Object.keys(post?.translations || {})
      .map((l) => LANG_LABELS[l] || l.toUpperCase())
      .join(" / ");
    return {
      title: translation?.title || post?.title || "",
      description: translation?.description || post?.description || "",
      content: translation?.content || "",
      date: post?.date ? dayjs(post.date).format("YYYY.MM.DD") : "—",
      category: post?.category?.title || "",
      langs: availableLangs,
    };
  }, [post, locale]);

  const headings = useTiptapHeadings(data.content);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-site-paper pt-site-header text-site-ink">
        <div className="mx-auto w-[var(--site-content-width)] py-site-section">
          <Skeleton className="h-40 rounded-none" />
          <Skeleton className="mt-12 h-96 rounded-none" />
        </div>
      </main>
    );
  }

  const metadataItems = [
    { label: t("dateLabel"), value: data.date },
    { label: t("topicLabel"), value: data.category || "—" },
    { label: t("langLabel"), value: data.langs || "—" },
  ];

  return (
    <main className="bg-site-paper text-site-ink">
      <section className="border-b border-site-line">
        <div className="mx-auto grid min-h-[calc(100vh_-_var(--site-header-height))] w-[var(--site-content-width)] items-center gap-10 py-site-section lg:grid-cols-[var(--site-portfolio-detail-grid)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>
              {t("articleEyebrow")}
              {data.category ? ` / ${data.category}` : ""}
            </Eyebrow>
            <h1 className="text-[length:var(--site-section-title-font-size)] font-bold leading-[1.1] tracking-[-0.025em]">
              {data.title}
            </h1>
          </div>
          <aside className="flex flex-col gap-7">
            <MetadataList items={metadataItems} />
            <div className="flex flex-wrap gap-3">
              <SiteButton asChild variant="outline">
                <Link href="/blog">
                  {t("backToBlog")}
                </Link>
              </SiteButton>
              <SiteButton asChild variant="default">
                <Link href="/portfolio">
                  {t("viewWork")}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </SiteButton>
            </div>
          </aside>
        </div>
      </section>

      <SectionShell className="border-b-0">
        <div
          className={cn(
            "grid gap-16 lg:items-start",
            headings.length > 0 && "lg:grid-cols-[var(--site-article-layout-grid)]"
          )}
        >
          {headings.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-[calc(var(--site-header-height)+2rem)] flex flex-col gap-6 border-t border-site-ink pt-5">
                <Eyebrow withLine={false}>{t("tableOfContents")}</Eyebrow>
                <TableOfContents headings={headings} />
                <SiteButton asChild variant="outline" className="self-start">
                  <Link href="/blog">{t("backToIndex")}</Link>
                </SiteButton>
              </div>
            </aside>
          )}
          <article className="min-w-0">
            <TiptapContent content={data.content} />
          </article>
        </div>
      </SectionShell>
    </main>
  );
};

export default BlogDetailPage;
