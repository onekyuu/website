import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteButtonProps = React.ComponentProps<typeof Button>;

export function SiteButton({ className, variant, ...props }: SiteButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "h-auto min-h-[var(--site-action-height)] rounded-none border-site-ink px-[var(--site-action-padding-x)] text-base font-normal normal-case tracking-normal",
        "gap-[var(--site-action-gap)] transition-transform hover:-translate-y-0.5 focus-visible:border-site-line-strong focus-visible:ring-site-line-strong/30",
        className
      )}
      {...props}
    />
  );
}
