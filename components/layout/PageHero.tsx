import * as React from "react";

import { Eyebrow } from "@/components/layout/Eyebrow";
import { cn } from "@/lib/utils";

type PageHeroProps = React.ComponentProps<"section"> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  titleClassName?: string;
  copy?: React.ReactNode;
  aside?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  titleClassName,
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
      <div className="mx-auto grid min-h-[calc(100vh_-_var(--site-header-height))] w-[var(--site-content-width)] items-center gap-10 py-site-section md:grid-cols-[var(--site-page-grid)] lg:gap-16">
        <div className="flex flex-col gap-6">
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1
            className={cn(
              "text-[length:var(--site-page-title-font-size)] font-extrabold leading-[0.88] tracking-[-0.055em] text-site-ink",
              titleClassName
            )}
          >
            {title}
          </h1>
          {copy && (
            <div className="max-w-2xl text-[length:var(--site-section-copy-font-size)] leading-relaxed text-site-ink-2">
              {copy}
            </div>
          )}
          {children}
        </div>
        {aside && (
          <aside className="border-t border-site-line-strong pt-5 text-site-ink-2">
            {aside}
          </aside>
        )}
      </div>
    </section>
  );
}
