import * as React from "react";

import { cn } from "@/lib/utils";

type CaseSectionProps = React.ComponentProps<"section"> & {
  title: React.ReactNode;
};

export function CaseSection({ title, children, className, ...props }: CaseSectionProps) {
  return (
    <section
      className={cn(
        "grid gap-8 border-t border-site-ink pt-7 md:grid-cols-[var(--site-case-section-grid)] lg:gap-16",
        className
      )}
      {...props}
    >
      <h2 className="text-[length:var(--site-case-section-title-font-size)] font-bold leading-[0.98] tracking-[var(--site-section-title-tracking)]">
        {title}
      </h2>
      <div className="text-base leading-[1.72] text-site-ink-2 md:text-[length:var(--site-section-copy-font-size)]">
        {children}
      </div>
    </section>
  );
}
