"use client";

import PageLayout from "@/components/PageLayout";
import React, { FC, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { LanguageCode } from "@/types/common";
import { useProjectDetail } from "@/hooks/useProjects";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ContentContainer from "@/components/ContentContainer";
import { ArrowRight, Github, TvMinimalPlay } from "lucide-react";
import { Link } from "@/i18n/navigations";
import { ProjectIcon } from "@/components/ProjectIcon";

const ProjectDetailPage: FC = () => {
  const t = useTranslations("Portfolio");
  const params = useParams();
  const slug = params?.slug as string;
  const locale = params?.locale as LanguageCode;

  const { data: project, isLoading, isError, error } = useProjectDetail(slug);

  const formatProjectData = useMemo(() => {
    return {
      title: project?.translations[locale]?.title || "",
      subtitle: project?.translations[locale]?.subtitle || {
        start: "",
        end: "",
      },
      summary: project?.translations[locale]?.summary || "",
      tech_summary: project?.translations[locale]?.tech_summary || "",
      description: project?.translations[locale]?.description || "",
      images: project?.images || [],
      detail_images: project?.detail_images || [],
      introduction: project?.translations[locale]?.introduction || "",
      challenges: project?.translations[locale]?.challenges || [],
      solutions: project?.translations[locale]?.solutions || "",
      what_i_did: project?.translations[locale]?.what_i_did || [],
      skills: project?.skills || [],
      github_url: project?.github_url || "",
      live_demo_url: project?.live_demo_url || "",
      involved_areas: project?.involved_areas || "",
      tools: project?.tools || "",
    };
  }, [project, locale]);

  return (
    <PageLayout
      heroContent={{
        title: formatProjectData.title,
        subtitle: {
          start: formatProjectData.subtitle?.start || "",
          end: formatProjectData.subtitle?.end || "",
        },
        extraContent: (
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg lg:text-xl text-center">
            {formatProjectData.summary}
          </div>
        ),
        images: formatProjectData.images,
      }}
    >
      <ContentContainer className="flex flex-col gap-12 lg:gap-14 mt-4 md:mt-8 lg:mt-12">
        <section className="rounded-2xl project-gradient-radial-purple py-12 px-8 lg:p-10 flex flex-col gap-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-8 justify-center md:justify-self-end items-center md:order-2">
              <Link
                href={formatProjectData.github_url}
                target="_blank"
                className="flex gap-2 text-base md:text-lg"
              >
                <Github className="w-5 h-5 md:w-6 md:h-6" />
                {t("github")}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
              <Link
                href={formatProjectData.live_demo_url}
                target="_blank"
                className="flex gap-2"
              >
                <TvMinimalPlay className="w-5 h-5 md:w-6 md:h-6" />
                {t("liveDemo")}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </Link>
            </div>
            <div className="section-title flex items-center justify-center md:justify-self-start md:order-1 text-center md:text-start">
              {formatProjectData.tech_summary}
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="title-color font-bold text-lg lg:text-xl">
                {t("involvedAreas")}
              </p>
              <ul className="list-inside mt-6 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-base lg:text-lg flex flex-col gap-4">
                {formatProjectData.involved_areas
                  ?.split(",")
                  .map((area, index) => (
                    <li key={`area-${index}`}>{area.trim()}</li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="title-color font-bold text-lg lg:text-xl">
                {t("skills")}
              </p>
              <ul className="list-inside mt-6 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-base lg:text-lg flex flex-col gap-4">
                {formatProjectData.skills.map((skill, index) => (
                  <li key={`skill-${index}`}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="title-color font-bold text-lg lg:text-xl">
                {t("tools")}
              </p>
              <ul className="list-inside mt-6 text-[var(--color-gray-600)] dark:text-[var(--color-gray-300)] text-base lg:text-lg flex flex-col gap-4">
                {formatProjectData.tools?.split(",").map((tool, index) => (
                  <li key={`tool-${index}`}>{tool.trim()}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8">
          <p className="section-title">{t("introduction")}</p>
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg leading-6">
            {formatProjectData.introduction}
          </div>
        </section>
        <section className="flex flex-col gap-6 md:gap-8">
          <p className="section-title">{t("challenges")}</p>
          <ul className="list-disc list-inside text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg leading-8">
            {formatProjectData.challenges.map((challenge, index) => (
              <li key={`challenge-${index}`}>{challenge}</li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-6 md:gap-8">
          <p className="section-title">{t("solutions")}</p>
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg leading-6">
            {formatProjectData.solutions}
          </div>
        </section>
        <section>
          <div className="grid grid-cols-2 gap-6">
            {formatProjectData.detail_images[0] && (
              <div className="col-span-2">
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-2xl"
                >
                  <Image
                    src={formatProjectData.detail_images[0]}
                    alt={`${formatProjectData.title} - Detail 1`}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
            )}

            {formatProjectData.detail_images[1] && (
              <div className="col-span-2 md:col-span-1">
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-2xl"
                >
                  <Image
                    src={formatProjectData.detail_images[1]}
                    alt={`${formatProjectData.title} - Detail 2`}
                    fill
                    className="object-cover"
                  />
                </AspectRatio>
              </div>
            )}

            {formatProjectData.detail_images[2] && (
              <div className="col-span-2 md:col-span-1">
                <AspectRatio
                  ratio={16 / 9}
                  className="overflow-hidden rounded-2xl"
                >
                  <Image
                    src={formatProjectData.detail_images[2]}
                    alt={`${formatProjectData.title} - Detail 3`}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </AspectRatio>
              </div>
            )}
          </div>
        </section>
        <section className="flex flex-col gap-6 md:gap-8">
          <p className="section-title">{t("whatIDid")}</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {formatProjectData.what_i_did.map((item, index) => (
              <div key={`what-i-did-${index}`} className="flex flex-col gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--color-primary-50)] dark:bg-[var(--color-primary-900)] flex items-center justify-center">
                  <ProjectIcon
                    iconName={item.icon}
                    className="w-7 h-7 md:w-8 md:h-8 p-1.5 text-[var(--color-primary-600)] dark:text-[var(--color-primary-200)] bg-[var(--color-primary-100)] dark:bg-[var(--color-primary-800)] rounded-full"
                  />
                </div>
                <p className="text-[var(--color-primary-900h)] dark:text-[var(--color-gray-50)] font-bold text-lg md:text-xl">
                  {item.title}
                </p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      </ContentContainer>
    </PageLayout>
  );
};

export default ProjectDetailPage;
