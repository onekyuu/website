"use client";

import React, { FC } from "react";
import { useTranslations } from "next-intl";

import { SectionShell, SplitHeader } from "@/components/layout";
import { Link } from "@/i18n/navigations";

export interface HomeBlogPost {
  id: number;
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
}

interface BlogSectionProps {
  blogList: HomeBlogPost[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

const BlogSection: FC<BlogSectionProps> = ({ blogList, isLoading }) => {
  const t = useTranslations("Home");
  const posts = blogList ?? [];
  const fallbackPosts = [
    {
      id: -1,
      slug: "",
      title: t("featurePost"),
      description: t("postDesc"),
    },
    {
      id: -2,
      slug: "",
      title: t("postOne"),
      description: t("postDesc"),
    },
    {
      id: -3,
      slug: "",
      title: t("postTwo"),
      description: t("postDesc"),
    },
    {
      id: -4,
      slug: "",
      title: t("postThree"),
      description: t("postDesc"),
    },
  ];
  const featured = posts[0] ?? fallbackPosts[0];
  const rest = Array.from(
    { length: 3 },
    (_, index) => posts[index + 1] ?? fallbackPosts[index + 1]
  );
  const postCategories = ["Engineering", "Design", "Build log"];
  const postHref = (slug?: string) => (slug ? `/blog/${slug}` : "/blog");

  return (
    <SectionShell id="blog">
      <SplitHeader
        eyebrow="Blog / 04"
        title={t("latestWriting")}
        className="mb-[3.625rem] lg:gap-[4.5rem]"
      />

      {isLoading ? (
        <div className="grid gap-[2.125rem] lg:grid-cols-[var(--site-home-blog-grid)] lg:gap-4">
          <div className="min-h-[var(--site-feature-post-min-height)] border border-site-ink bg-site-paper-2" />
          <div className="border-t border-site-ink">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border-b border-site-line-strong py-6"
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid gap-[2.125rem] lg:grid-cols-[var(--site-home-blog-grid)] lg:gap-4">
          <Link
            href={postHref(featured.slug)}
            className="grid min-h-[var(--site-feature-post-min-height)] grid-rows-[1fr_auto] border border-site-ink p-7 text-site-ink no-underline transition-colors hover:bg-site-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-line-strong"
          >
            <div className="text-site-control uppercase tracking-[0.14em] text-site-muted">
              Latest / Technical note
            </div>
            <h3 className="self-end max-w-[42.5rem] text-[length:var(--site-feature-post-title-font-size)] leading-[0.98] tracking-[var(--site-section-title-tracking)]">
              {featured.title}
            </h3>
          </Link>

          <div className="border-t border-site-ink">
            {rest.map((post, index) => (
              <Link
                key={post.id}
                href={postHref(post.slug)}
                className="grid gap-3 border-b border-site-line-strong py-6 text-site-ink no-underline transition-colors hover:text-site-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-line-strong"
              >
                <div className="text-site-control uppercase tracking-[0.14em] text-site-muted">
                  {postCategories[index]}
                </div>
                <h3 className="text-[1.375rem] leading-[1.14]">{post.title}</h3>
                {post.description && (
                  <p className="leading-[1.5] text-site-muted">
                    {post.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
};

export default BlogSection;
