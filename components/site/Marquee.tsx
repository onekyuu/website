import * as React from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = React.ComponentProps<"div"> & {
  items: React.ReactNode[];
  duration?: string;
  separator?: React.ReactNode;
};

export function Marquee({
  items,
  duration = "24s",
  separator,
  className,
  ...props
}: MarqueeProps) {
  const style = {
    "--marquee-duration": duration,
  } as React.CSSProperties;
  const marker = separator ?? (
    <span
      className="size-[var(--site-marquee-dot)] shrink-0 bg-site-ink"
      aria-hidden="true"
    />
  );

  return (
    <div
      className={cn(
        "site-marquee overflow-hidden border-y border-site-line bg-site-paper text-site-ink",
        className
      )}
      style={style}
      {...props}
    >
      <div className="site-marquee-track flex w-max items-center">
        <MarqueeGroup items={items} separator={marker} />
        <MarqueeGroup items={items} separator={marker} aria-hidden="true" />
      </div>
    </div>
  );
}

type MarqueeGroupProps = React.ComponentProps<"div"> & {
  items: React.ReactNode[];
  separator: React.ReactNode;
};

function MarqueeGroup({
  items,
  separator,
  className,
  ...props
}: MarqueeGroupProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-[var(--site-marquee-gap)] px-[var(--site-marquee-padding-x)] py-[var(--site-marquee-padding-y)] text-site-marquee-word font-extrabold uppercase leading-none",
        className
      )}
      {...props}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <span className="whitespace-nowrap">{item}</span>
          {separator}
        </React.Fragment>
      ))}
    </div>
  );
}
