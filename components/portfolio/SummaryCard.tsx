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
        "dark:bg-[var(--color-primary-600)] dark:text-[var(--color-gray-50)]",
        className
      )}
    >
      <CardContent className="flex flex-col gap-2">
        <p className="font-bold text-lg md:text-xl lg:text-2xl mb-2 md:mb-4">
          {t("projectSummary")}
        </p>
        {info?.map((line, index) => (
          <div
            key={`latest-${index}`}
            className="flex items-center justify-start gap-1 md:gap-2 text-xl font-semibold lg:font-bold"
          >
            <span className="mr-4 ">
              <BadgeCheck className="h-4 w-4 lg:h-6 lg:w-6" />
            </span>
            <span className="text-base md:text-lg">{line}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
