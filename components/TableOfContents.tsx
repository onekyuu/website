"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "@/hooks/useTiptapHeadings";
import { useTranslations } from "next-intl";

interface TableOfContentsProps {
  headings: Heading[];
  className?: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  className,
}) => {
  const t = useTranslations("Blog");
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
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className={cn("sticky top-0 space-y-2", className)}>
      <h4 className="font-bold text-lg mb-4 text-[var(--color-primary-800)] dark:text-[var(--color-primary-100)]">
        {t("tableOfContents")}
      </h4>
      <ul className="space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
              className="relative"
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[var(--color-primary-600)] dark:bg-[var(--color-primary-400)] rounded-full" />
              )}
              <button
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  "text-left text-sm hover:text-[var(--color-primary-600)] dark:hover:text-[var(--color-primary-400)] transition-colors ml-2",
                  activeId === heading.id
                    ? "text-[var(--color-primary-600)] dark:text-[var(--color-primary-400)] font-semibold"
                    : "text-[var(--color-gray-800)] dark:text-[var(--color-gray-100)]"
                )}
              >
                {heading.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
