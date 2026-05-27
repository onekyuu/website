import * as React from "react";

import { Eyebrow } from "@/components/layout/Eyebrow";

export type WritingItem = {
  index: string;
  title: string;
  description: string;
};

type WritingSystemProps = React.ComponentProps<"div"> & {
  items: WritingItem[];
};

export function WritingSystem({ items, ...props }: WritingSystemProps) {
  return (
    <div
      className="mt-20 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
      {...props}
    >
      {items.map((item) => (
        <article
          key={item.index}
          className="flex min-h-site-latest-copy flex-col justify-between border border-site-ink p-7"
        >
          <Eyebrow withLine={false}>{item.index}</Eyebrow>
          <div>
            <h3 className="text-2xl font-semibold text-site-ink">{item.title}</h3>
            <p className="mt-4 leading-relaxed text-site-ink-2">{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
