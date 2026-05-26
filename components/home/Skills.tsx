"use client";

import React, { CSSProperties, FC, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import { SectionShell } from "@/components/layout";
import { cn } from "@/lib/utils";

const skills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Docker",
  "Interface Design",
];

const baseOffsets = ["0vw", "-4vw", "-8vw", "-12vw", "-6vw", "0vw", "6vw", "8vw"];

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (value: number) => value * value * (3 - 2 * value);

const SkillsSection: FC = () => {
  const t = useTranslations("Home");
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [lineOffsets, setLineOffsets] = useState(baseOffsets);

  useEffect(() => {
    const updateSkillMotion = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      const raw = (viewport * 0.78 - rect.top) / (rect.height * 0.7);
      const nextProgress = clamp(raw, 0, 1);
      const center = viewport / 2;
      let nextIndex = 0;
      let nextDistance = Number.POSITIVE_INFINITY;

      rowRefs.current.forEach((row, index) => {
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        if (distance < nextDistance) {
          nextDistance = distance;
          nextIndex = index;
        }
      });

      setActiveIndex(nextIndex);
      setProgress(nextProgress);
      setLineOffsets(
        baseOffsets.map((baseX, index) => {
          const direction = index <= 3 ? -1 : 1;
          const driftAmount = window.innerWidth < 980 ? 6 : 16;
          const local = smoothstep(clamp((nextProgress - index * 0.04) / 0.84, 0, 1));
          const drift = direction * driftAmount * local;
          return `calc(${baseX} + ${drift.toFixed(2)}px)`;
        })
      );
    };

    updateSkillMotion();
    window.addEventListener("scroll", updateSkillMotion, { passive: true });
    window.addEventListener("resize", updateSkillMotion);

    return () => {
      window.removeEventListener("scroll", updateSkillMotion);
      window.removeEventListener("resize", updateSkillMotion);
    };
  }, []);

  return (
    <SectionShell
      id="skills"
      ref={sectionRef}
      className="grid min-h-screen items-center scroll-mt-site-header"
      innerClassName="flex flex-col"
      style={{ "--skill-progress": progress } as CSSProperties}
    >
      <div className="mb-10 grid gap-8 md:grid-cols-[var(--site-split-grid)] md:items-end lg:gap-[4.5rem]">
        <div>
          <div className="mb-[1.375rem] flex items-center gap-3 text-site-control uppercase leading-[1.25] tracking-site-label text-site-muted before:h-px before:w-11 before:bg-site-muted">
            Skills / 02
          </div>
          <h2 className="text-[length:var(--site-section-title-font-size)] leading-[var(--site-section-title-leading)] tracking-[var(--site-section-title-tracking)]">
            {t("skills")}
          </h2>
          <div className="mt-[1.125rem] h-0.5 w-[min(16.25rem,100%)] bg-site-line">
            <span
              className="block h-full bg-site-ink"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[clamp(0.75rem,2.6vh,1.875rem)] overflow-hidden pb-[7vh] pt-[5vh]">
        {skills.map((skill, index) => {
          const isActive = activeIndex === index;
          const isNear = Math.abs(activeIndex - index) === 1;

          return (
            <div
              key={skill}
              ref={(element) => {
                rowRefs.current[index] = element;
              }}
              style={{ "--line-x": lineOffsets[index] } as CSSProperties}
              className={cn(
                "flex min-h-[clamp(4rem,9.5vh,6.75rem)] max-w-[min(100%,70rem)] items-center justify-center whitespace-nowrap transition-transform duration-100 will-change-transform [transform:translateX(var(--line-x))]",
                "max-[980px]:justify-start max-[980px]:whitespace-normal"
              )}
            >
              <span
                data-state={isActive ? "now" : activeIndex > index ? "prev" : "next"}
                style={{ transform: isActive ? "scale(1)" : "scale(0.9)" }}
                className={cn(
                  "inline-block origin-center text-[length:var(--site-skill-word-font-size)] leading-[var(--site-skill-word-leading)] text-site-ink opacity-[0.16] transition-[opacity,transform,color,-webkit-text-stroke] duration-150 will-change-transform [font-weight:var(--site-skill-word-weight)] [letter-spacing:var(--site-skill-word-tracking)]",
                  "data-[state=now]:opacity-100 data-[state=prev]:opacity-[0.28] data-[state=next]:opacity-[0.28]",
                  index % 2 === 0 && "text-transparent [-webkit-text-stroke:1px_var(--site-ink)]",
                  isNear && "opacity-[0.28]",
                  isActive && "opacity-100"
                )}
              >
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
};

export default SkillsSection;
