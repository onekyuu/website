"use client";

import ContentContainer from "@/components/ContentContainer";
import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import HorizontalScroll from "@/components/HorizontalScroll";
import SummaryCard from "@/components/portfolio/SummaryCard";
import DetailCard from "@/components/portfolio/DetailCard";
import PageLayout from "@/components/PageLayout";
import { useLocale } from "next-intl";
import { LanguageCode } from "@/types/common";
import { Project } from "@/types/project";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";

const PortfolioPage = () => {
  const t = useTranslations("Portfolio");
  const locale = useLocale() as LanguageCode;
  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useProjects({
    page: 1,
    pageSize: 10,
  });

  const getProjectDetail = useCallback(
    (project?: Project) => {
      if (!project) return { title: "", description: "", image: "", slug: "" };
      return {
        title: project?.translations[locale]?.title || "",
        description: project?.translations[locale]?.description || "",
        image: project?.images[0],
        slug: project?.slug || "",
        summary: project?.translations[locale]?.summary || "",
      };
    },
    [locale]
  );

  const latestProjectNode = useMemo(
    () => (
      <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
        <SummaryCard
          info={projectResponse?.[0]?.translations[locale]?.info || []}
          className="md:col-span-1 lg:col-span-2"
        />
        <DetailCard
          project={getProjectDetail(projectResponse?.[0])}
          type="latest"
          className="md:col-span-1 lg:col-span-3"
        />
      </div>
    ),
    [locale, getProjectDetail, projectResponse]
  );

  return (
    <PageLayout
      heroContent={{
        title: t("title"),
        subtitle: { start: t("subtitleStart"), end: t("subtitleEnd") },
        extraContent: (
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg lg:text-xl text-center mt-4">
            {t("description")}
          </div>
        ),
      }}
      latestContent={{
        title: t("latestProject"),
        content: latestProjectNode,
      }}
    >
      {isProjectLoading ? (
        <div>
          <ContentContainer>
            <div className=" w-[60vw] lg:w-[50vw] text-center text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
              {t("allProjects")}
            </div>
          </ContentContainer>
          <ContentContainer className="lg:min-h-1/2 grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-5 gap-6">
            <Skeleton className="h-[400px] w-full rounded-xl" />
          </ContentContainer>
        </div>
      ) : (
        <HorizontalScroll className="gap-6">
          <ContentContainer>
            <div className=" w-[60vw] lg:w-[50vw] text-center text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
              {t("allProjects")}
            </div>
          </ContentContainer>
          {projectResponse?.map((project) => (
            <div
              key={project.translations[locale]?.title}
              className="w-screen flex items-center justify-center flex-shrink-0"
            >
              <ContentContainer className="lg:min-h-1/2 grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-5 gap-6">
                <DetailCard
                  project={getProjectDetail(project)}
                  className="project-card-bg row-span-1 md:col-span-1 lg:col-span-3"
                />
                <SummaryCard
                  info={project?.translations[locale]?.info || []}
                  className="row-span-1 md:col-span-1 lg:col-span-2"
                />
              </ContentContainer>
            </div>
          ))}
        </HorizontalScroll>
      )}
    </PageLayout>
  );
};

export default PortfolioPage;
