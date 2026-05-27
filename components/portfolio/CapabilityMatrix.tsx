import * as React from "react";

import { Eyebrow } from "@/components/layout/Eyebrow";
import { ProjectIcon } from "@/components/ProjectIcon";
import { cn } from "@/lib/utils";

export type CapabilityItem = {
  index: string;
  title: string;
  description: string;
  icon?: string;
};

type CapabilityMatrixProps = React.ComponentProps<"div"> & {
  items: CapabilityItem[];
};

export function CapabilityMatrix({ items, className, ...props }: CapabilityMatrixProps) {
  return (
    <div
      className={cn("mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}
      {...props}
    >
      {items.map((item) => (
        <article
          key={item.index}
          className="flex min-h-site-capability-card flex-col justify-between border border-site-ink p-7"
        >
          <div className="flex items-center justify-between">
            <Eyebrow withLine={false}>{item.index}</Eyebrow>
            {item.icon && (
              <span className="grid size-10 place-items-center border border-site-line-strong">
                <ProjectIcon iconName={item.icon} className="size-5" />
              </span>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-site-ink">{item.title}</h3>
            <p className="mt-4 leading-relaxed text-site-ink-2">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
