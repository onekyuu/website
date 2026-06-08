"use client";

import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck } from "lucide-react";
import { Button } from "../ui/button";
import Link from "@/components/TransitionLink";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import HorizontalScroll from "../HorizontalScroll";
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

  return (
    <>
      {isLoading ? (
        <div className="lg:h-[60vh] w-screen lg:w-6xl flex shrink-0 items-center justify-center">
          <ContentContainer>
            <div className="my-4 md:mt-12 lg:mt-0 lg:px-0 lg:h-1/2 w-[60vw] lg:w-[50vw] flex shrink-0 items-center justify-center lg:justify-start lg:justify-center text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-3xl md:text-4xl lg:text-5xl font-semibold">
              {t("selectedProjects")}
            </div>
          </ContentContainer>
          <ContentContainer className="h-full grid grid-rows-5 lg:grid-rows-1 lg:grid-cols-2 gap-4 place-items-center px-0">
            <div className="row-span-3 h-full w-full flex flex-col justify-start lg:justify-center">
              <div className="skeleton h-8 w-3/4 mb-4 rounded-lg"></div>
            </div>
          </ContentContainer>
        </div>
      ) : (
        <HorizontalScroll className="gap-4 px-4 md:gap-6 md:px-8 lg:gap-8 lg:px-12">
          <div className="flex h-[calc(100vh-7rem)] w-[72vw] max-w-md shrink-0 items-center justify-center md:h-[calc(100vh-6rem)] md:w-[40vw] md:max-w-xl lg:h-[min(760px,calc(100vh-6rem))] lg:w-[34vw]">
            <div className="text-center text-3xl font-semibold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] md:text-4xl lg:text-5xl">
              {t("selectedProjects")}
            </div>
          </div>
          {projectList?.map((project, index) => {
            const translation = project.translations[locale];
            const projectTitle = translation?.title || project.slug;
            const projectInfo = translation?.info.slice(0, 3) || [];

            return (
              <article
                key={project.id}
                className="relative grid h-[calc(100vh-7rem)] w-[86vw] max-w-[1360px] shrink-0 overflow-hidden rounded-lg border border-[var(--color-gray-200)] bg-[var(--color-gray-50)] shadow-xl md:h-[calc(100vh-6rem)] md:w-[94vw] lg:h-[min(760px,calc(100vh-6rem))] lg:w-[88vw] dark:border-[var(--color-gray-800)] dark:bg-[var(--color-gray-900)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(var(--color-primary-rgb-100),0.85),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.86),rgba(var(--color-secondary-rgb-100),0.4))] dark:bg-[radial-gradient(circle_at_20%_20%,rgba(var(--color-primary-rgb-700),0.38),transparent_36%),linear-gradient(135deg,rgba(17,24,39,0.92),rgba(31,41,55,0.82))]" />

                <div className="relative grid h-full grid-rows-[auto_auto] content-center place-items-center gap-5 p-4 md:grid-cols-[0.48fr_minmax(0,1fr)] md:grid-rows-1 md:gap-5 md:p-6 lg:grid-cols-[0.42fr_minmax(0,1fr)] lg:gap-8 lg:p-9">
                  <div className="order-2 z-10 flex max-h-full w-full max-w-xl flex-col justify-between rounded-lg border border-white/70 bg-white/88 p-4 text-left shadow-lg backdrop-blur-md md:order-1 md:h-full md:max-w-none md:p-5 lg:p-6 dark:border-white/10 dark:bg-[var(--color-gray-950)]/82">
                    <div className="min-h-0 w-full">
                      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-primary-700)] dark:text-[var(--color-primary-300)]">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span className="h-px w-8 bg-current" />
                        <span>{t("selectedProjects")}</span>
                      </div>
                      <h3 className="text-2xl font-semibold leading-tight text-[var(--color-gray-950)] md:text-3xl lg:text-4xl dark:text-[var(--color-gray-50)]">
                        {projectTitle}
                      </h3>
                      <div className="mt-4 space-y-2 text-sm leading-6 text-[var(--color-gray-700)] md:text-[clamp(0.75rem,1.15vw,1rem)] dark:text-[var(--color-gray-300)]">
                        {projectInfo.map((spec, specIndex) => (
                          <div
                            key={`project-desc-${specIndex}`}
                            className="flex items-start gap-2"
                          >
                            <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-[var(--color-primary-700)] dark:text-[var(--color-primary-300)]" />
                            <span className="line-clamp-2 md:line-clamp-none md:whitespace-nowrap">
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      asChild
                      className="mt-4 w-fit cursor-pointer font-bold"
                    >
                      <Link href={`/portfolio/${project.slug}`}>
                        {t("checkProject")}
                      </Link>
                    </Button>
                  </div>

                  <div className="order-1 flex min-h-0 w-full max-w-3xl items-center md:order-2 md:max-w-none">
                    <div className="w-full overflow-hidden rounded-lg border border-[var(--color-gray-300)] bg-[var(--color-gray-950)] shadow-2xl dark:border-[var(--color-gray-700)]">
                      <div className="flex h-8 items-center gap-2 border-b border-white/10 bg-[var(--color-gray-900)] px-4">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                        <span className="ml-3 h-3 w-28 rounded-full bg-white/12" />
                      </div>
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          fill
                          src={project.images[0] || "/project-cover.jpeg"}
                          alt={`Project Image for ${project.slug}`}
                          className="bg-white object-contain"
                          sizes="(max-width: 768px) 82vw, (max-width: 1280px) 54vw, 720px"
                        />
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </HorizontalScroll>
      )}
    </>
  );
};

export default PortfolioSection;
