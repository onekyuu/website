"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type HeroStatItem = {
  label: string;
  value: React.ReactNode;
};

interface HeroStatsProps {
  items: HeroStatItem[];
  className?: string;
}

export function HeroStats({ items, className }: HeroStatsProps) {
  return (
    <div className={cn("border-t border-site-ink", className)}>
      {items.map(({ label, value }, index) => (
        <div
          key={label}
          className={cn(
            "grid grid-cols-[6.125rem_minmax(0,1fr)] gap-[1.375rem] py-5",
            index < items.length - 1 && "border-b border-site-line"
          )}
        >
          <div className="text-site-control uppercase tracking-site-label text-site-muted">
            {label}
          </div>
          <div className="text-base leading-[1.45] text-site-ink">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
