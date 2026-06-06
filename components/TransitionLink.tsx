"use client";

import type { ComponentProps, MouseEvent } from "react";

import { Link } from "@/i18n/navigations";
import { usePageTransition } from "@/components/PageTransition";

type TransitionLinkProps = ComponentProps<typeof Link>;

export default function TransitionLink({
  onClick,
  ...props
}: TransitionLinkProps) {
  const pageTransition = usePageTransition();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.currentTarget.target ||
      event.currentTarget.hasAttribute("download") ||
      !pageTransition
    ) {
      return;
    }

    const nextUrl = new URL(event.currentTarget.href);
    const currentUrl = new URL(window.location.href);
    const isSameDocument =
      nextUrl.pathname === currentUrl.pathname &&
      nextUrl.search === currentUrl.search;

    if (nextUrl.origin !== currentUrl.origin || isSameDocument) return;

    event.preventDefault();
    pageTransition.startTransition(
      `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`
    );
  };

  return (
    <Link
      {...props}
      onClick={handleClick}
      aria-disabled={pageTransition?.isExiting || undefined}
    />
  );
}
