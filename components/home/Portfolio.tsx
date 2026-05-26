"use client";

import React, { FC } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

import HorizontalScroll from "@/components/HorizontalScroll";
import { SiteButton } from "@/components/site";
import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";
import { LanguageCode } from "@/types/common";
import { Project } from "@/types/project";

interface PortfolioSectionProps {
  projectList?: Project[];
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
}

const PortfolioSection: FC<PortfolioSectionProps> = ({
  projectList,
  isLoading,
}) => {
  const t = useTranslations("Home");
  const locale = useLocale() as LanguageCode;
  const projects = projectList?.slice(0, 5) ?? [];
  const desktopCards = Array.from({ length: 5 }, (_, index) => projects[index]);
  const mobileCards = desktopCards.slice(0, 3);

  const sectionHeader = (
    <div className="mb-14 grid gap-8 lg:grid-cols-[var(--site-split-grid)] lg:items-end lg:gap-[4.5rem]">
      <div>
        <div className="mb-[1.375rem] flex items-center gap-3 text-site-control uppercase leading-[1.25] tracking-site-label text-[#aaa8a1] before:h-px before:w-11 before:bg-[#aaa8a1]">
          Portfolio / 03
        </div>
        <h2 className="text-[length:var(--site-section-title-font-size)] leading-[var(--site-section-title-leading)] tracking-[var(--site-section-title-tracking)]">
          {t("worksTitle")}
        </h2>
      </div>
    </div>
  );

  const railIntro = (className?: string) => (
    <div
      className={cn(
        "flex min-h-[var(--site-work-card-min-height)] flex-col justify-between border border-[#3f3f39] p-6",
        className
      )}
    >
      <div>
        <div className="text-site-control uppercase tracking-[0.14em] text-site-muted">
          Pinned horizontal rail
        </div>
        <h3 className="mt-[1.375rem] text-[1.625rem] leading-[1.05]">
          {t("railTitle")}
        </h3>
      </div>
      <div>
        <p className="mt-3 leading-[1.52] text-site-ink-2">{t("railCopy")}</p>
        <SiteButton className="mt-3" asChild>
          <Link href="/portfolio">{t("openPortfolio")}</Link>
        </SiteButton>
      </div>
    </div>
  );

  const renderProjectCard = (project: Project | undefined, index: number, className?: string) => {
    const translation = project?.translations[locale];
    const fallbackTitles = [
      "Project Alpha",
      "Project Beta",
      "Project Gamma",
      "Project Delta",
      "Project Sigma",
    ];
    const fallbackCategories = [
      "Full-stack",
      "Product UI",
      "Platform",
      "Interface",
      "System",
    ];
    const title = translation?.title || project?.slug || fallbackTitles[index];
    const summary =
      translation?.summary ||
      translation?.description ||
      translation?.info?.[0] ||
      t("projectCopy");
    const category = project?.skills?.[0]?.type || fallbackCategories[index];
    const href = project ? `/portfolio/${project.slug}` : "/portfolio";
    const cover = project?.images?.[0];

    return (
      <Link
        key={project?.id || `fallback-${index}`}
        href={href}
        data-home-project-card
        className={cn(
          "group flex min-h-[var(--site-work-card-min-height)] flex-col justify-between bg-site-paper p-5 text-site-ink transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-paper",
          className
        )}
      >
        <div>
          <div
            data-work-thumb
            className={cn(
              "relative h-[var(--site-work-thumb-height)] overflow-hidden border border-site-line-strong bg-site-paper-2",
              !cover &&
                "before:absolute before:inset-y-0 before:left-1/2 before:w-px before:bg-site-ink/15 after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-site-ink/15"
            )}
          >
            {cover && (
              <Image
                src={cover}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className={cn(
                  "object-cover transition-transform duration-300 group-hover:scale-105",
                  index === 0 && "object-contain"
                )}
              />
            )}
          </div>
          <h3 className="mt-[1.375rem] text-[1.625rem] leading-[1.05]">
            {title}
          </h3>
          <p className="mt-3 leading-[1.52] text-site-ink-2">{summary}</p>
        </div>
        <div className="mt-7 flex items-center justify-between border-t border-site-line-strong pt-4 text-site-nav">
          <span>{category}</span>
          <span>View -&gt;</span>
        </div>
      </Link>
    );
  };

  return (
    <section
      id="works"
      className="overflow-hidden border-b border-site-line-strong bg-site-ink text-site-paper scroll-mt-site-header"
    >
      <div className="hidden lg:block">
        <HorizontalScroll
          data-home-project-rail
          disabledBelow={1024}
          mode="pin"
          pinnedContent={sectionHeader}
          wrapperClassName="h-screen"
          stickyClassName="h-screen bg-site-ink"
          viewportClassName="mx-auto flex h-auto w-[var(--site-content-width)] flex-col items-stretch overflow-hidden"
          className="h-auto gap-[18px]"
        >
          {railIntro("w-[14.5625rem] shrink-0")}
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="min-h-[var(--site-work-card-min-height)] w-[18.625rem] shrink-0 bg-site-paper p-5"
                />
              ))
            : desktopCards.map((project, index) =>
                renderProjectCard(project, index, "w-[18.625rem] shrink-0")
              )}
        </HorizontalScroll>
      </div>

      <div className="mx-auto w-[var(--site-content-width)] py-site-section lg:hidden">
        {sectionHeader}
        <div data-home-project-rail className="grid gap-[18px]">
          {railIntro()}
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="min-h-[var(--site-work-card-min-height)] bg-site-paper p-5"
                />
              ))
            : mobileCards.map((project, index) =>
                renderProjectCard(project, index)
              )}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
