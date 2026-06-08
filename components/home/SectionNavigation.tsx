"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { useScrollTo } from "@/hooks/useScrollTo";
import { cn } from "@/lib/utils";

type SectionItem = {
  id: string;
  label: string;
};

export default function SectionNavigation() {
  const t = useTranslations("Home");
  const { scrollToElement } = useScrollTo();
  const [activeId, setActiveId] = useState("home-hero");

  const items = useMemo<SectionItem[]>(
    () => [
      { id: "home-hero", label: t("home") },
      { id: "home-skills", label: t("skills") },
      { id: "home-portfolio", label: t("portfolio") },
      { id: "home-blog", label: t("blog") },
      { id: "home-gallery", label: t("gallery") },
      { id: "home-contact", label: t("contactMe") },
    ],
    [t]
  );

  useEffect(() => {
    let frameId: number | null = null;

    const updateActiveSection = () => {
      frameId = null;

      const pivot = window.innerHeight * 0.45;
      let nextActiveId = items[0]?.id || "home-hero";
      let nearestDistance = Number.POSITIVE_INFINITY;

      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const containsPivot = rect.top <= pivot && rect.bottom >= pivot;
        const distance = containsPivot
          ? 0
          : Math.min(Math.abs(rect.top - pivot), Math.abs(rect.bottom - pivot));

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextActiveId = item.id;
        }
      });

      setActiveId((currentId) =>
        currentId === nextActiveId ? currentId : nextActiveId
      );
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateActiveSection);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [items]);

  return (
    <nav
      aria-label="Home section navigation"
      className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 md:flex"
    >
      <div className="relative flex flex-col gap-3 rounded-full border border-[var(--color-gray-200)] bg-white/70 p-2 shadow-lg backdrop-blur-md dark:border-[var(--color-gray-800)] dark:bg-[var(--color-gray-950)]/70">
        <div
          className="pointer-events-none absolute bottom-5 left-1/2 top-5 w-px -translate-x-1/2 bg-[var(--color-gray-300)] dark:bg-[var(--color-gray-700)]"
          aria-hidden="true"
        />

        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.label}
              aria-current={isActive ? "true" : undefined}
              onClick={() => scrollToElement(item.id, -72)}
              className="group relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full outline-none transition-transform duration-200 hover:scale-105 focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)]"
            >
              <span
                className={cn(
                  "relative z-10 h-2.5 w-2.5 rounded-full border transition-all duration-300",
                  isActive
                    ? "scale-125 border-[var(--color-primary-500)] bg-[var(--color-primary-500)] shadow-[0_0_0_5px_rgba(var(--color-primary-rgb-100),0.85)] dark:shadow-[0_0_0_5px_rgba(var(--color-primary-rgb-700),0.35)]"
                    : "border-[var(--color-gray-400)] bg-[var(--color-background)] group-hover:border-[var(--color-primary-500)] group-hover:bg-[var(--color-primary-500)] dark:border-[var(--color-gray-600)] dark:bg-[var(--color-gray-950)]"
                )}
                aria-hidden="true"
              />
              <span className="pointer-events-none absolute right-10 whitespace-nowrap rounded-full border border-[var(--color-gray-200)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-gray-900)] opacity-0 shadow-md transition-all duration-200 group-hover:-translate-x-1 group-hover:opacity-100 group-focus-visible:-translate-x-1 group-focus-visible:opacity-100 dark:border-[var(--color-gray-800)] dark:bg-[var(--color-gray-950)] dark:text-[var(--color-gray-50)]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
