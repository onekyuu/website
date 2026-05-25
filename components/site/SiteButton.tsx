import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteButtonProps = React.ComponentProps<typeof Button>;

export function SiteButton({ className, variant, ...props }: SiteButtonProps) {
  return (
    <Button
      variant={variant}
      className={cn(
        "rounded-site border-site-line text-sm uppercase tracking-widest",
        "focus-visible:border-site-line-strong focus-visible:ring-site-line-strong/30",
        className
      )}
      {...props}
    />
  );
}
