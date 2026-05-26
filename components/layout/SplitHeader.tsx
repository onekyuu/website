import * as React from "react";

import { cn } from "@/lib/utils";

type SplitHeaderProps = React.ComponentProps<"div"> & {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  copy?: React.ReactNode;
  action?: React.ReactNode;
};

export function SplitHeader({
  eyebrow,
  title,
  copy,
  action,
  className,
  children,
  ...props
}: SplitHeaderProps) {
  const hasAside = copy || children || action;

  return (
    <div
      className={cn(
        "grid gap-8 md:grid-cols-[var(--site-split-grid)] md:items-end lg:gap-16",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-5">
        {eyebrow && (
          <div className="flex items-center gap-3 text-site-control uppercase tracking-site-label text-site-muted before:h-px before:w-11 before:bg-site-muted">
            {eyebrow}
          </div>
        )}
        <h2 className="text-[length:var(--site-section-title-font-size)] leading-[var(--site-section-title-leading)] tracking-[var(--site-section-title-tracking)] text-site-ink">
          {title}
        </h2>
      </div>
      {hasAside && (
        <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-site-ink-2">
          {copy && <div>{copy}</div>}
          {children}
          {action && <div>{action}</div>}
        </div>
      )}
    </div>
  );
}
