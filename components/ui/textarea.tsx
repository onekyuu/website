import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        " focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full px-3.5 py-2.5 transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 rounded-xl border border-indigo-200 bg-white dark:bg-[var(--color-gray-200)] text-sm md:text-base text-gray-500 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
