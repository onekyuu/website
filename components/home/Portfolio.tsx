"use client";

import React, { FC } from "react";
import ContentContainer from "../ContentContainer";
import { useLocale, useTranslations } from "next-intl";
import { BadgeCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigations";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import HorizontalScroll from "../HorizontalScroll";
import { useProjects } from "@/hooks/useProjects";
import { LanguageCode } from "@/types/common";

const Portfolio: FC = () => {
  const t = useTranslations("Home");
  const locale = useLocale() as LanguageCode;
  const {
    data: projectResponse,
    isLoading,
    isError,
    error,
  } = useProjects({
    page: 1,
    pageSize: 10,
  });
  const projectList = projectResponse || [];

  return (
    <HorizontalScroll>
      <div className="h-2/3 lg:h-1/2 w-full lg:w-[50vw] flex flex-shrink-0 items-center justify-center text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-semibold">
        {t("portfolio")}
      </div>
      {isLoading && (
        <div className="h-2/3 lg:h-1/2 w-screen lg:w-5xl flex flex-shrink-0 items-center justify-center">
          <ContentContainer className="h-full grid grid-rows-5 lg:grid-rows-1 lg:grid-cols-2 gap-4 place-items-center px-0">
            <div className="row-span-3 h-full w-full flex flex-col justify-start lg:justify-center">
              <div className="skeleton h-8 w-3/4 mb-4 rounded-lg"></div>
            </div>
          </ContentContainer>
        </div>
      )}
      {projectList?.map((project) => (
        <div
          key={project.id}
          className="h-2/3 lg:h-1/2 w-screen lg:w-5xl lg:px-10 flex flex-shrink-0 items-center justify-center"
        >
          <ContentContainer className="h-full grid grid-rows-5 lg:grid-rows-1 lg:grid-cols-2 gap-4 place-items-center px-0">
            <div className="row-span-3 h-full w-full flex flex-col justify-start lg:justify-center">
              <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-[var(--color-gray-900)]] dark:text-[var(--color-gray-50)] mb-4">
                {project.translations[locale]?.title}
              </div>
              <div className="text-base md:text-lg text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] ">
                {project.translations[locale]?.info.map((spec, index) => (
                  <div
                    key={`project-desc-${index}`}
                    className="flex items-start justify-start mb-2"
                  >
                    <span className="mr-4 ">
                      <BadgeCheck className="h-6 w-6" />
                    </span>
                    <span className="text-base md:text-lg">{spec}</span>
                  </div>
                ))}
              </div>
              <div>
                <Link href={`/portfolio`}>
                  <Button className="font-bold mt-6 cursor-pointer">
                    {t("checkProject")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="row-span-2 w-full">
              <AspectRatio
                ratio={16 / 9}
                className="rounded-xl lg:shadow-[-8px_8px_40px_0px_rgba(99,102,241,0.26)]"
              >
                <Image
                  fill
                  src={project.images[0] || "/project-cover.jpeg"}
                  alt={`Project Image for ${project.slug}`}
                  className="object-cover rounded-xl"
                />
              </AspectRatio>
            </div>
          </ContentContainer>
        </div>
      ))}
    </HorizontalScroll>
  );
};

export default Portfolio;
