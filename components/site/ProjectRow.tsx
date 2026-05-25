import * as React from "react";

import { IndexListItem } from "@/components/site/IndexList";
import { Link } from "@/i18n/navigations";

type ProjectRowProps = Omit<
  React.ComponentProps<typeof IndexListItem>,
  "meta" | "actionLabel"
> & {
  category?: React.ReactNode;
  href: React.ComponentProps<typeof Link>["href"];
};

export function ProjectRow({
  category,
  summary,
  ...props
}: ProjectRowProps) {
  return (
    <IndexListItem
      summary={summary}
      meta={category}
      actionLabel="View"
      {...props}
    />
  );
}
