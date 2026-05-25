import * as React from "react";

import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export type MetadataItem = {
  label: React.ReactNode;
  value: React.ReactNode;
};

type MetadataListProps = React.ComponentProps<"dl"> & {
  items?: MetadataItem[];
};

export function MetadataList({
  items,
  children,
  className,
  ...props
}: MetadataListProps) {
  const rows = items?.map((item) => (
    <MetadataRow key={String(item.label)} label={item.label}>
      {item.value}
    </MetadataRow>
  ));
  const content = rows ?? React.Children.toArray(children);

  return (
    <dl className={cn("border-y border-site-line-strong", className)} {...props}>
      {content.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < content.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </dl>
  );
}

type MetadataRowProps = React.ComponentProps<"div"> & {
  label: React.ReactNode;
  children: React.ReactNode;
};

export function MetadataRow({
  label,
  children,
  className,
  ...props
}: MetadataRowProps) {
  return (
    <div
      className={cn(
        "grid gap-3 py-5 text-sm sm:grid-cols-[var(--site-metadata-grid)] sm:gap-6",
        className
      )}
      {...props}
    >
      <dt className="text-site-control uppercase tracking-site-label text-site-muted">
        {label}
      </dt>
      <dd className="text-base leading-relaxed text-site-ink">{children}</dd>
    </div>
  );
}
