"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

import TransitionLink from "@/components/TransitionLink";
import { Skeleton } from "@/components/ui/skeleton";
import { LanguageCode } from "@/types/common";
import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

type ProjectAxisProps = {
  projects?: Project[];
  isLoading?: boolean;
};

function ProjectAxisSkeleton() {
  return (
    <div className="px-4 py-12 md:px-0 md:py-0">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            "relative grid grid-cols-1 gap-6 py-12 md:grid-cols-2 md:content-center md:gap-0 md:py-10 lg:py-12",
            index > 0 && "md:-mt-[8vh] lg:-mt-[10vh]"
          )}
        >
          <Skeleton
            className={cn(
              "aspect-[4/3] w-full rounded-none md:w-[46vw] md:max-w-[900px]",
              index % 2 === 0
                ? "md:col-start-2 md:justify-self-end"
                : "md:col-start-1 md:row-start-1"
            )}
          />
          <div
            className={cn(
              "space-y-3 md:absolute md:top-1/2 md:z-10 md:w-[min(34vw,30rem)] md:-translate-y-1/2",
              index % 2 === 0
                ? "md:left-[calc(50%-0.75rem)] md:text-left"
                : "md:right-[calc(50%-0.75rem)] md:text-right"
            )}
          >
            <Skeleton className="h-4 w-20 rounded-none" />
            <Skeleton className="h-24 w-full rounded-none" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectAxis({
  projects = [],
  isLoading = false,
}: ProjectAxisProps) {
  const locale = useLocale() as LanguageCode;
  const t = useTranslations("Portfolio");
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <section className="relative overflow-hidden py-20 md:py-28">
        <AxisHeading title={t("allProjects")} />
        <ProjectAxisSkeleton />
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="relative overflow-hidden pb-24 pt-20 md:pb-36 md:pt-28">
      <AxisHeading title={t("allProjects")} />

      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-[var(--color-gray-300)] dark:bg-[var(--color-gray-700)] md:block"
        />

        {projects.map((project, index) => {
          const translation = project.translations[locale];
          const title = translation?.title || project.slug;
          const category =
            project.involved_areas
              ?.split(",")
              .map((area) => area.trim())
              .filter(Boolean)
              .join(" / ") ||
            project.skills.map((skill) => skill.name).slice(0, 2).join(" / ") ||
            "Digital Project";
          const image = project.images[0] || "/project-cover.jpeg";
          const isRight = index % 2 === 0;

          const projectHref = `/portfolio/${project.slug}`;

          return (
            <TransitionLink
              key={project.id}
              href={projectHref}
              aria-label={`${t("learnMore")}: ${title}`}
              className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              <motion.article
                data-project-axis-item={index}
                className={cn(
                  "relative grid grid-cols-1 gap-7 px-4 py-12 md:grid-cols-2 md:content-center md:gap-0 md:px-0 md:py-10 lg:py-12",
                  index > 0 && "md:-mt-[8vh] lg:-mt-[10vh]"
                )}
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0, y: 72 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className={cn(
                    "relative block aspect-[4/3] w-full overflow-hidden bg-[var(--color-gray-200)] dark:bg-[var(--color-gray-900)]",
                    "md:row-start-1 md:w-[46vw] md:max-w-[900px]",
                    isRight
                      ? "md:col-start-2 md:justify-self-end"
                      : "md:col-start-1 md:justify-self-start"
                  )}
                >
                  <ProjectCover src={image} title={title} />
                </div>

                <span
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 z-[5] hidden h-48 w-[3px] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[var(--color-gray-950)] md:block"
                />

                <div
                  className={cn(
                    "relative z-10 flex flex-col justify-center md:absolute md:top-1/2 md:w-[min(34vw,30rem)] md:-translate-y-1/2",
                    isRight
                      ? "md:left-[calc(50%-0.75rem)] md:items-start md:text-left"
                      : "md:right-[calc(50%-0.75rem)] md:items-end md:text-right"
                  )}
                >
                  <span className="text-xs font-normal text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)]">
                    {category}
                  </span>
                  <span className="mt-5 max-w-[13ch] text-3xl font-normal leading-[1.08] text-[var(--color-gray-900)] transition-opacity group-hover:opacity-55 dark:text-[var(--color-gray-50)] md:text-4xl lg:text-5xl">
                    {title}
                  </span>
                </div>
              </motion.article>
            </TransitionLink>
          );
        })}
      </div>
    </section>
  );
}

function ProjectCover({ src, title }: { src: string; title: string }) {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <Image
      src={imageSrc}
      alt={title}
      fill
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
      sizes="(max-width: 767px) 100vw, 46vw"
      onError={() => {
        if (imageSrc !== "/project-cover.jpeg") {
          setImageSrc("/project-cover.jpeg");
        }
      }}
    />
  );
}

function AxisHeading({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-base font-medium text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)] md:text-lg">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className="mt-7 h-28 w-px bg-[var(--color-gray-300)] dark:bg-[var(--color-gray-700)]"
      />
    </div>
  );
}
