import * as React from "react";
import { ArrowRightIcon } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";

type IndexListProps = React.ComponentProps<"ul">;

export function IndexList({ className, children, ...props }: IndexListProps) {
  const items = React.Children.toArray(children);

  return (
    <ul className={cn("border-t border-site-line-strong", className)} {...props}>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < items.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </ul>
  );
}

type IndexListItemProps = Omit<React.ComponentProps<"li">, "title"> & {
  index: React.ReactNode;
  title: React.ReactNode;
  summary?: React.ReactNode;
  meta?: React.ReactNode;
  href?: React.ComponentProps<typeof Link>["href"];
  actionLabel?: React.ReactNode;
};

export function IndexListItem({
  index,
  title,
  summary,
  meta,
  href,
  actionLabel,
  className,
  ...props
}: IndexListItemProps) {
  const content = (
    <div className="grid gap-4 py-6 md:grid-cols-[var(--site-index-grid)] md:items-center md:py-8">
      <span className="text-sm text-site-muted">{index}</span>
      <strong className="text-2xl font-semibold leading-tight text-site-ink transition-transform group-hover:translate-x-1 md:text-3xl">
        {title}
      </strong>
      {summary && (
        <span className="text-base leading-relaxed text-site-ink-2">
          {summary}
        </span>
      )}
      <span className="flex items-center justify-between gap-3 text-sm uppercase tracking-widest text-site-muted md:justify-end">
        {meta ?? actionLabel}
        <ArrowRightIcon data-icon="inline-end" className="size-4" />
      </span>
    </div>
  );

  return (
    <li className={cn("list-none", className)} {...props}>
      {href ? (
        <Link
          className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-line-strong"
          href={href}
        >
          {content}
        </Link>
      ) : (
        <div className="group">{content}</div>
      )}
    </li>
  );
}
