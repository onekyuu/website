"use client";

import dayjs from "dayjs";
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";

import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { WritingSystem } from "@/components/blog/WritingSystem";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { HeroStats } from "@/components/layout/HeroStats";
import { PageHero } from "@/components/layout/PageHero";
import { SectionShell } from "@/components/layout/SectionShell";
import { ArticleRow } from "@/components/site/ArticleRow";
import { IndexList } from "@/components/site/IndexList";
import { SiteButton } from "@/components/site/SiteButton";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { usePosts, usePrefetchPosts } from "@/hooks/usePosts";
import { Link } from "@/i18n/navigations";
import { LanguageCode } from "@/types/common";

export default function BlogPage() {
  const t = useTranslations("Blog");
  const locale = useLocale() as LanguageCode;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const pageSize = 10;

  const { data: postsData, isLoading } = usePosts({
    page: currentPage,
    pageSize,
    search: searchQuery,
  });

  const prefetchPosts = usePrefetchPosts();

  const blogList = postsData?.results || [];
  const totalPages = postsData?.totalPages || 0;
  const totalCount = postsData?.count || blogList.length;
  const latestPost = blogList[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
    setCurrentPage(1);
  };

  const writingItems = [
    { index: "01", title: t("writingTitle1"), description: t("writingDesc1") },
    { index: "02", title: t("writingTitle2"), description: t("writingDesc2") },
    { index: "03", title: t("writingTitle3"), description: t("writingDesc3") },
  ];

  return (
    <main className="bg-site-paper text-site-ink">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        backgroundWord="BLOG"
        aside={
          <div className="flex flex-col gap-6">
            <p className="text-[length:var(--site-section-copy-font-size)] leading-relaxed">
              {t("description")}
            </p>
            <HeroStats
              items={[
                { label: t("allPosts"), value: isLoading ? "—" : `${totalCount} ${t("posts")}` },
                { label: t("latestEyebrow"), value: isLoading || !latestPost ? "—" : (latestPost.translations[locale]?.title || latestPost.title) },
              ]}
            />
            <div className="flex flex-wrap gap-3">
              <SiteButton asChild variant="outline" className="self-start">
                <Link href="/">
                  {t("backHome")}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </SiteButton>
              {latestPost && !isLoading && (
                <SiteButton asChild variant="default" className="self-start">
                  <Link href={`/blog/${latestPost.slug}`}>
                    {t("readLatest")}
                    <ArrowRightIcon data-icon="inline-end" />
                  </Link>
                </SiteButton>
              )}
            </div>
          </div>
        }
      />

      <SectionShell>
        {isLoading ? (
          <div className="grid gap-4 lg:grid-cols-[var(--site-portfolio-latest-grid)]">
            <Skeleton className="min-h-site-latest-copy rounded-none" />
            <Skeleton className="min-h-site-latest-copy rounded-none" />
          </div>
        ) : latestPost ? (
          <FeaturedArticle
            sectionKicker={`${t("latestEyebrow")} / ${dayjs(latestPost.date).format("YYYY.MM")}`}
            sectionTitle={t("latestBlogTitle")}
            openLabel={t("openArticle")}
            href={`/blog/${latestPost.slug}`}
            articleKicker={latestPost.category?.title}
            articleTitle={latestPost.translations[locale]?.title || latestPost.title}
            articleDescription={
              latestPost.translations[locale]?.description || latestPost.description
            }
          />
        ) : null}
      </SectionShell>

      <SectionShell id="all-posts" className="border-b-0">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-site-ink pb-7">
          <div className="flex flex-col gap-5">
            <Eyebrow>{t("allPosts")}</Eyebrow>
            <h2 className="text-[length:var(--site-section-title-font-size)] leading-[var(--site-section-title-leading)] tracking-[var(--site-section-title-tracking)]">
              {t("articleIndex")}
            </h2>
          </div>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-[var(--site-action-height)] w-44 rounded-none border-site-line bg-transparent text-site-ink placeholder:text-site-muted focus-visible:border-site-ink focus-visible:ring-0 lg:w-64"
            />
            <SiteButton type="submit" variant="outline" size="icon" className="size-[var(--site-action-height)] shrink-0">
              <SearchIcon data-icon="icon" />
              <span className="sr-only">{t("searchButton")}</span>
            </SiteButton>
          </form>
        </div>

        {isLoading ? (
          <div className="flex flex-col pt-4">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="my-8 h-24 rounded-none" />
            ))}
          </div>
        ) : blogList.length > 0 ? (
          <IndexList className="border-t-0">
            {blogList.map((post) => (
              <ArticleRow
                key={post.id}
                index={post.date ? dayjs(post.date).format("YYYY.MM") : "—"}
                title={post.translations[locale]?.title || post.title}
                summary={
                  post.translations[locale]?.description || post.description
                }
                href={`/blog/${post.slug}`}
              />
            ))}
          </IndexList>
        ) : (
          <p className="py-12 text-center text-site-muted">{t("noResults")}</p>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-site-line pt-7">
            <SiteButton
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <ArrowLeftIcon data-icon="inline-start" />
              {t("prevPage")}
            </SiteButton>
            <Eyebrow withLine={false}>
              {currentPage} / {totalPages}
            </Eyebrow>
            <SiteButton
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => {
                setCurrentPage((p) => p + 1);
                prefetchPosts({
                  page: currentPage + 2,
                  pageSize,
                  search: searchQuery,
                });
              }}
            >
              {t("nextPage")}
              <ArrowRightIcon data-icon="inline-end" />
            </SiteButton>
          </div>
        )}

        <WritingSystem items={writingItems} />
      </SectionShell>
    </main>
  );
}
