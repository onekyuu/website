"use client";

import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Heading } from "@/hooks/useTiptapHeadings";

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  className,
}) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 96;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (headings.length === 0) return null;

  return (
    <nav className={cn("flex flex-col gap-2", className)}>
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          className={cn(
            "text-left text-[length:var(--site-nav-font-size)] leading-relaxed transition-colors",
            activeId === heading.id
              ? "font-semibold text-site-ink"
              : "text-site-muted hover:text-site-ink"
          )}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
};
