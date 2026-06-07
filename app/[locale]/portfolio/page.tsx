"use client";

import { useTranslations } from "next-intl";
import React, { useCallback, useMemo } from "react";
import SummaryCard from "@/components/portfolio/SummaryCard";
import DetailCard from "@/components/portfolio/DetailCard";
import ProjectAxis from "@/components/portfolio/ProjectAxis";
import PageLayout from "@/components/PageLayout";
import { useLocale } from "next-intl";
import { LanguageCode } from "@/types/common";
import { Project } from "@/types/project";
import { useProjects } from "@/hooks/useProjects";

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
    ordering: "-priority",
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
          <div className="text-(--color-gray-700) dark:text-(--color-gray-300) text-base md:text-lg lg:text-xl text-center mt-4">
            {t("description")}
          </div>
        ),
      }}
      latestContent={{
        title: t("latestProject"),
        content: latestProjectNode,
      }}
      isSubtitleReverse={true}
    >
      <ProjectAxis
        projects={projectResponse}
        isLoading={isProjectLoading}
      />
    </PageLayout>
  );
};

export default PortfolioPage;
