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
          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-site-muted before:h-px before:w-11 before:bg-site-muted">
            {eyebrow}
          </div>
        )}
        <h2 className="text-4xl font-semibold leading-none text-site-ink md:text-6xl lg:text-7xl">
          {title}
        </h2>
      </div>
      <div className="flex max-w-2xl flex-col gap-6 text-lg leading-relaxed text-site-ink-2">
        {copy && <div>{copy}</div>}
        {children}
        {action && <div>{action}</div>}
      </div>
    </div>
  );
}
