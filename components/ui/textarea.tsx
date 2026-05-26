import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-none border border-site-line bg-site-paper px-3.5 py-2.5 text-sm text-site-ink shadow-none outline-none transition-[color,border-color,box-shadow] placeholder:text-site-muted focus-visible:border-site-line-strong focus-visible:ring-2 focus-visible:ring-site-line-strong/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
