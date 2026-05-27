import * as React from "react";
import { ArrowRightIcon } from "lucide-react";

import { Eyebrow } from "@/components/layout/Eyebrow";
import { SiteButton } from "@/components/site/SiteButton";
import { Link } from "@/i18n/navigations";

type FeaturedArticleProps = {
  sectionKicker: string;
  sectionTitle: string;
  openLabel: string;
  href: string;
  articleKicker?: string;
  articleTitle: string;
  articleDescription?: string;
};

export function FeaturedArticle({
  sectionKicker,
  sectionTitle,
  openLabel,
  href,
  articleKicker,
  articleTitle,
  articleDescription,
}: FeaturedArticleProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[var(--site-portfolio-latest-grid)]">
      <div className="flex min-h-site-latest-copy flex-col justify-between border border-site-ink p-7">
        <div>
          <Eyebrow withLine={false}>{sectionKicker}</Eyebrow>
          <h2 className="mt-5 text-[length:var(--site-section-title-font-size)] font-bold leading-[0.98] tracking-[var(--site-section-title-tracking)]">
            {sectionTitle}
          </h2>
        </div>
        <SiteButton asChild variant="default" className="self-start">
          <Link href={href}>
            {openLabel}
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
        </SiteButton>
      </div>
      <Link
        href={href}
        className="group flex min-h-site-latest-copy flex-col justify-end border border-site-ink bg-site-paper-2 p-7 text-site-ink no-underline transition-colors hover:bg-site-paper"
      >
        <div>
          {articleKicker && (
            <Eyebrow withLine={false}>{articleKicker}</Eyebrow>
          )}
          <h3 className="mt-5 text-[length:var(--site-feature-post-title-font-size)] font-[760] leading-[0.95] tracking-[-0.03em]">
            {articleTitle}
          </h3>
          {articleDescription && (
            <p className="mt-4 text-base leading-relaxed text-site-ink-2">
              {articleDescription}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}
