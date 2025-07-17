"use client";

import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { Link } from "@/i18n/navigations";
import { ArrowUpRight } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  summary: string[];
}

interface DetailCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  type?: "latest" | "normal";
}

const DetailCard: FC<DetailCardProps> = ({
  project,
  type = "normal",
  className,
}) => {
  const t = useTranslations("Portfolio");
  return (
    <Card className={cn("relative bg-transparent", className)}>
      <div className="absolute inset-0 card-gradient-bg bg-cover opacity-60 z-[-1] rounded-xl"></div>
      <CardContent
        className={cn(
          "flex flex-col justify-between min-h-[40vh] md:min-h-[50vh] lg:min-h-[60vh] gap-4 md:gap-8",
          type === "latest"
            ? "text-[var(--color-primary-100)]"
            : "dark:text-[var(--color-gray-900)]",
          className
        )}
      >
        <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold">
            {project.name}
          </p>
          <p
            className={cn(
              "text-base lg:text-lg",
              type === "latest"
                ? "text-[var(--color-primary-100)]"
                : "text-[var(--color-gray-700)]"
            )}
          >
            {project.description}
          </p>
          <Link
            href={project.link}
            className="flex gap-1 items-center text-base lg:text-lg font-bold"
          >
            <span>{t("learnMore")}</span>
            <ArrowUpRight />
          </Link>
        </div>
        <div className="p-2 md:p-4 lg:p-5 picture-gradient-bg rounded-xl">
          <AspectRatio ratio={16 / 9} className="w-full ">
            <Image
              src="/blog-cover.jpeg"
              alt="Project Cover"
              className="rounded-lg object-cover"
              fill
            />
          </AspectRatio>
        </div>
      </CardContent>
    </Card>
  );
};

export default DetailCard;
