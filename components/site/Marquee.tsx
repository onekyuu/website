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
    <span className="size-2 shrink-0 bg-site-ink" aria-hidden="true" />
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
        "flex h-site-marquee shrink-0 items-center gap-8 px-8 text-5xl font-semibold uppercase leading-none md:text-7xl lg:text-8xl",
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
