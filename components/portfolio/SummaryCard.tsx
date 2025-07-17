"use client";

import React, { FC } from "react";
import { Card, CardContent } from "../ui/card";
import { BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface SummaryCardProps extends React.HTMLAttributes<HTMLDivElement> {
  summary: string[];
}

const SummaryCard: FC<SummaryCardProps> = ({ summary, className }) => {
  const t = useTranslations("Portfolio");
  return (
    <Card
      className={cn(
        "dark:bg-[var(--color-primary-600)] col-span-2 dark:text-[var(--color-gray-50)]",
        className
      )}
    >
      <CardContent className="flex flex-col gap-2">
        <p className="font-bold text-2xl mb-4">{t("projectSummary")}</p>
        {summary.map((line, index) => (
          <div
            key={`latest-${index}`}
            className="flex items-start justify-start mb-2 text-xl font-bold"
          >
            <span className="mr-4 ">
              <BadgeCheck className="h-6 w-6" />
            </span>
            <span className="text-base md:text-lg">{line}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
