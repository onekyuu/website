import * as React from "react";

import { cn } from "@/lib/utils";

type PageHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  copy?: React.ReactNode;
  aside?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  copy,
  aside,
  className,
  children,
  ...props
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "border-b border-site-line bg-site-paper pt-site-header text-site-ink",
        className
      )}
      {...props}
    >
      <div className="mx-auto grid min-h-[calc(92vh_-_var(--site-header-height))] w-[var(--site-content-width)] gap-10 py-site-section md:grid-cols-[var(--site-page-grid)] md:items-end lg:gap-16">
        <div className="flex flex-col gap-6">
          {eyebrow && (
            <div className="text-xs uppercase tracking-widest text-site-muted">
              {eyebrow}
            </div>
          )}
          <h1 className="max-w-5xl text-6xl font-semibold leading-none text-site-ink md:text-8xl lg:text-9xl">
            {title}
          </h1>
          {copy && (
            <div className="max-w-2xl text-lg leading-relaxed text-site-ink-2">
              {copy}
            </div>
          )}
          {children}
        </div>
        {aside && (
          <div className="border-y border-site-line-strong py-5 text-site-ink-2">
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
