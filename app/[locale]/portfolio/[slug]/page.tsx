"use client";

import { ArrowRightIcon, GithubIcon, TvMinimalPlayIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { FC, useMemo } from "react";

import ErrorState from "@/components/ErrorState";
import { Eyebrow } from "@/components/layout/Eyebrow";
import { SectionShell } from "@/components/layout/SectionShell";
import { CapabilityMatrix } from "@/components/portfolio/CapabilityMatrix";
import { CaseSection } from "@/components/portfolio/CaseSection";
import { MetadataList } from "@/components/site/MetadataList";
import { SiteButton } from "@/components/site/SiteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjectDetail } from "@/hooks/useProjects";
import { Link } from "@/i18n/navigations";
import { LanguageCode } from "@/types/common";

const formatYear = (date?: string) => {
  if (!date) return "—";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? date.slice(0, 4) : `${parsed.getFullYear()}`;
};

const ProjectDetailPage: FC = () => {
  const t = useTranslations("Portfolio");
  const params = useParams();
  const slug = params?.slug as string;
  const locale = params?.locale as LanguageCode;
  const { data: project, isLoading, isError, error } = useProjectDetail(slug);

  const data = useMemo(() => {
    const translation = project?.translations[locale];
    return {
      title: translation?.title || project?.slug || "",
      summary: translation?.summary || "",
      techSummary: translation?.tech_summary || "",
      description: translation?.description || "",
      images: project?.images || [],
      detailImages: project?.detail_images || [],
      introduction: translation?.introduction || "",
      challenges: translation?.challenges || [],
      solutions: translation?.solutions || "",
      whatIDid: translation?.what_i_did || [],
      skills: project?.skills || [],
      githubUrl: project?.github_url || "",
      liveDemoUrl: project?.live_demo_url || "",
      involvedAreas: project?.involved_areas || "",
      tools: project?.tools || "",
      year: formatYear(project?.date || project?.created_at),
    };
  }, [project, locale]);

  if (isError) {
    return (
      <ErrorState
        title="Failed to load project"
        description="Please try again later."
        errorMessage={error instanceof Error ? error.message : undefined}
      />
    );
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-site-paper pt-site-header text-site-ink">
        <div className="mx-auto w-[var(--site-content-width)] py-site-section">
          <Skeleton className="h-40 rounded-none" />
          <Skeleton className="mt-12 min-h-site-latest-visual rounded-none" />
        </div>
      </main>
    );
  }

  const metadataItems = [
    { label: t("roleLabel"), value: data.involvedAreas || data.techSummary || "—" },
    {
      label: t("stackLabel"),
      value: data.skills.map((s) => s.name).join(", ") || data.tools || "—",
    },
    { label: t("yearLabel"), value: data.year },
  ];

  const coverImage = data.detailImages[0] || data.images[1];
  const secondImage = data.detailImages[1] || data.images[2];

  const whatIDidItems = data.whatIDid.map((item, index) => ({
    index: String(index + 1).padStart(2, "0"),
    title: item.title,
    description: item.description,
    icon: item.icon,
  }));

  return (
    <main className="bg-site-paper text-site-ink">
      <section className="border-b border-site-line pt-site-header">
        <div className="mx-auto grid min-h-[calc(100vh_-_var(--site-header-height))] w-[var(--site-content-width)] items-center gap-10 py-site-section lg:grid-cols-[var(--site-portfolio-detail-grid)] lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow>{t("caseStudyEyebrow")}</Eyebrow>
            <h1 className="text-[length:var(--site-portfolio-detail-title-font-size)] font-extrabold leading-[0.88] tracking-[-0.055em]">
              {data.title}
            </h1>
          </div>
          <aside className="flex flex-col gap-7">
            <MetadataList items={metadataItems} />
            <div className="flex flex-wrap gap-3">
              <SiteButton asChild variant="outline">
                <Link href="/portfolio">
                  {t("backToIndex")}
                </Link>
              </SiteButton>
              {data.githubUrl && (
                <SiteButton asChild variant="outline">
                  <a href={data.githubUrl} target="_blank" rel="noreferrer">
                    <GithubIcon data-icon="inline-start" />
                    {t("github")}
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </SiteButton>
              )}
              {data.liveDemoUrl && (
                <SiteButton asChild variant="default">
                  <a href={data.liveDemoUrl} target="_blank" rel="noreferrer">
                    <TvMinimalPlayIcon data-icon="inline-start" />
                    {t("liveDemo")}
                    <ArrowRightIcon data-icon="inline-end" />
                  </a>
                </SiteButton>
              )}
            </div>
          </aside>
        </div>
      </section>

      <div className="relative mx-auto mt-16 min-h-site-latest-visual w-[var(--site-content-width)] overflow-hidden border border-site-line-strong bg-site-paper-2">
        {data.images[0] && (
          <Image
            src={data.images[0]}
            alt={data.title}
            fill
            sizes="(min-width: 1024px) 73.75rem, 100vw"
            className="object-cover"
          />
        )}
      </div>

      <SectionShell className="border-b-0">
        <div className="flex flex-col gap-16 lg:gap-20">
          <CaseSection title={t("introduction")}>
            <p>{data.introduction || data.description || data.summary}</p>
          </CaseSection>

          <CaseSection title={t("challenges")}>
            {data.challenges.length ? (
              <ul className="list-disc space-y-3 pl-5">
                {data.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            ) : (
              <p>{data.techSummary || data.summary}</p>
            )}
          </CaseSection>

          {(coverImage || secondImage) && (
            <div className="grid gap-4 lg:grid-cols-[var(--site-portfolio-gallery-grid)]">
              <div className="relative min-h-site-latest-visual overflow-hidden border border-site-line-strong bg-site-paper-2">
                {coverImage && (
                  <Image
                    src={coverImage}
                    alt={`${data.title} detail`}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="relative min-h-site-latest-copy overflow-hidden border border-site-line-strong bg-site-paper-2">
                {secondImage && (
                  <Image
                    src={secondImage}
                    alt={`${data.title} detail`}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          )}

          <CaseSection title={t("solutions")}>
            <p>{data.solutions || data.description}</p>
          </CaseSection>

          {whatIDidItems.length > 0 && (
            <section className="border-t border-site-ink pt-7">
              <h2 className="mb-10 text-[length:var(--site-case-section-title-font-size)] font-bold leading-[0.98] tracking-[var(--site-section-title-tracking)]">
                {t("whatIDid")}
              </h2>
              <CapabilityMatrix
                items={whatIDidItems}
                className="mt-0 sm:grid-cols-2 lg:grid-cols-3"
              />
            </section>
          )}
        </div>
      </SectionShell>
    </main>
  );
};

export default ProjectDetailPage;
