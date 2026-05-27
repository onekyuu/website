import * as React from "react";

import { cn } from "@/lib/utils";

type EyebrowProps = React.ComponentProps<"div"> & {
  withLine?: boolean;
};

export function Eyebrow({ className, children, withLine = true, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "text-site-control uppercase tracking-site-label text-site-muted",
        withLine &&
          "flex items-center gap-3 before:h-px before:w-11 before:shrink-0 before:bg-site-muted before:content-['']",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
