import * as React from "react";

import { IndexListItem } from "@/components/site/IndexList";
import { Link } from "@/i18n/navigations";

type ArticleRowProps = Omit<
  React.ComponentProps<typeof IndexListItem>,
  "meta" | "actionLabel"
> & {
  date?: React.ReactNode;
  category?: React.ReactNode;
  href: React.ComponentProps<typeof Link>["href"];
};

export function ArticleRow({
  date,
  category,
  summary,
  ...props
}: ArticleRowProps) {
  const meta =
    category || date ? (
      <>
        {category}
        {category && date ? " / " : null}
        {date}
      </>
    ) : undefined;

  return (
    <IndexListItem
      summary={summary}
      meta={meta}
      actionLabel="Read"
      {...props}
    />
  );
}
