import * as React from "react";

import { cn } from "@/lib/utils";

type SectionShellProps = React.ComponentProps<"section"> & {
  innerClassName?: string;
  bleed?: boolean;
};

export function SectionShell({
  className,
  innerClassName,
  bleed = false,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      className={cn(
        "border-b border-site-line bg-site-paper py-site-section text-site-ink",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          bleed ? "w-full" : "mx-auto w-[var(--site-content-width)]",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}
