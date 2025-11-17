"use client";

import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  info: string[];
}

const SummaryCard: FC<SummaryCardProps> = ({ info, className }) => {
  const t = useTranslations("Portfolio");
  return (
    <Card
      className={cn(
        "dark:bg-(--color-primary-600) dark:text-(--color-gray-50)",
        className
      )}
    >
      <CardContent className="flex flex-col gap-2 px-8">
        <p className="font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">
          {t("projectSummary")}
        </p>
        {info?.map((line, index) => (
          <div
            key={`latest-${index}`}
            className="flex items-start justify-start gap-1 md:gap-2 text-xl font-semibold lg:font-bold"
          >
            <span className="mr-4 shrink-0 mt-1">
              <BadgeCheck className="h-4 w-4 lg:h-5 lg:w-5 text-(--color-primary-700) dark:text-(--color-primary-50)" />
            </span>
            <span className="text-base md:text-lg self-center">{line}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
