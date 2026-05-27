"use client";

import { ArrowRightIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import React, { useMemo } from "react";

import ErrorState from "@/components/ErrorState";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { HeroStats } from "@/components/layout/HeroStats";
import { PageHero } from "@/components/layout/PageHero";
import { SectionShell } from "@/components/layout/SectionShell";
import { SplitHeader } from "@/components/layout/SplitHeader";
import { CapabilityMatrix } from "@/components/portfolio/CapabilityMatrix";
import { LatestProject } from "@/components/portfolio/LatestProject";
import { IndexList } from "@/components/site/IndexList";
import { ProjectRow } from "@/components/site/ProjectRow";
import { SiteButton } from "@/components/site/SiteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";
import { Link } from "@/i18n/navigations";
import { LanguageCode } from "@/types/common";
import { Project } from "@/types/project";

type ProjectView = {
  title: string;
  summary: string;
  description: string;
  slug: string;
  image?: string;
  year: string;
  category: string;
};

const formatYear = (date?: string) => {
  if (!date) return "—";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date.slice(0, 4) : `${parsed.getFullYear()}`;
};

export default function PortfolioPage() {
  const t = useTranslations("Portfolio");
  const locale = useLocale() as LanguageCode;
  const { data: projects, isLoading, isError, error } = useProjects({ page: 1, pageSize: 10 });

  const projectViews = useMemo<ProjectView[]>(
    () =>
      (projects || []).map((project: Project) => {
        const translation = project.translations[locale];
        return {
          title: translation?.title || project.slug,
          summary: translation?.summary || translation?.description || "",
          description: translation?.description || translation?.summary || "",
          slug: project.slug,
          image: project.images?.[0],
          year: formatYear(project.date || project.created_at),
          category:
            project.involved_areas?.split(",")?.[0]?.trim() ||
            project.skills?.[0]?.type ||
            "",
        };
      }),
    [projects, locale]
  );

  const latest = projectViews[0];

  const capabilityItems = useMemo(
    () => [
      { index: "01", title: t("capabilityTitle1"), description: t("capabilityDesc1") },
      { index: "02", title: t("capabilityTitle2"), description: t("capabilityDesc2") },
      { index: "03", title: t("capabilityTitle3"), description: t("capabilityDesc3") },
      { index: "04", title: t("capabilityTitle4"), description: t("capabilityDesc4") },
    ],
    [t]
  );

  if (isError) {
    return (
      <ErrorState
        title="Failed to load projects"
        description="Please try again later."
        errorMessage={error instanceof Error ? error.message : undefined}
      />
    );
  }

  return (
    <main className="bg-site-paper text-site-ink">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        backgroundWord="WORKS"
        aside={
          <div className="flex flex-col gap-6">
            <p className="text-[length:var(--site-section-copy-font-size)] leading-relaxed">
              {t("description")}
            </p>
            <HeroStats
              items={[
                { label: t("allProjects"), value: isLoading ? "—" : `${projectViews.length} ${t("projects")}` },
                { label: t("latestProject"), value: isLoading || !latest ? "—" : latest.title },
              ]}
            />
            <SiteButton asChild variant="outline" className="self-start">
              <Link href="/">
                {t("backHome")}
                <ArrowRightIcon data-icon="inline-end" />
              </Link>
            </SiteButton>
          </div>
        }
      />

      <SectionShell>
        <SplitHeader
          eyebrow={t("latestProject")}
          title={t("latestProjectSubtitle")}
          copy={latest?.summary || t("description")}
        />
        {isLoading ? (
          <div className="mt-10 grid gap-4 lg:grid-cols-[var(--site-portfolio-latest-grid)]">
            <Skeleton className="min-h-site-latest-copy rounded-none" />
            <Skeleton className="min-h-site-latest-visual rounded-none" />
          </div>
        ) : latest ? (
          <LatestProject
            kicker={`${latest.category} / ${latest.year}`}
            title={latest.title}
            description={latest.description}
            image={latest.image}
            openLabel={t("openCaseStudy")}
            openHref={`/portfolio/${latest.slug}`}
          />
        ) : null}
      </SectionShell>

      <SectionShell id="portfolio-list" className="border-b-0">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-site-ink pb-7">
          <div className="flex flex-col gap-5">
            <Eyebrow>{t("allProjects")}</Eyebrow>
            <h2 className="text-[length:var(--site-section-title-font-size)] leading-[var(--site-section-title-leading)] tracking-[var(--site-section-title-tracking)]">
              {t("workArchive")}
            </h2>
          </div>
          <Eyebrow withLine={false}>
            {String(projectViews.length).padStart(2, "0")} {t("projects")}
          </Eyebrow>
        </div>
        {isLoading ? (
          <div className="flex flex-col gap-0 pt-4">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="my-8 h-24 rounded-none" />
            ))}
          </div>
        ) : (
          <IndexList className="border-t-0">
            {projectViews.map((project, index) => (
              <ProjectRow
                key={project.slug}
                index={String(index + 1).padStart(2, "0")}
                title={project.title}
                summary={project.summary}
                category={project.category}
                href={`/portfolio/${project.slug}`}
              />
            ))}
          </IndexList>
        )}
        <CapabilityMatrix items={capabilityItems} />
      </SectionShell>
    </main>
  );
}
