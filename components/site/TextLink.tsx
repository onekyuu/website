import * as React from "react";
import { ArrowRightIcon } from "lucide-react";

import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";

type TextLinkProps = React.ComponentProps<typeof Link> & {
  withArrow?: boolean;
};

export function TextLink({
  className,
  children,
  withArrow = true,
  ...props
}: TextLinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex items-center gap-2 border-b border-site-ink pb-0.5 text-site-ink",
        "transition-colors hover:text-site-ink-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-line-strong [&_svg]:size-4",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow && <ArrowRightIcon data-icon="inline-end" />}
    </Link>
  );
}
