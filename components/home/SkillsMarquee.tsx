"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import { skillsList } from "@/lib/constants";

const skillNames = skillsList.map((skill) => skill.name);

function SkillSequence({
  skills,
  hidden = false,
}: {
  skills: string[];
  hidden?: boolean;
}) {
  return (
    <div
      className="skills-marquee-group flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {skills.map((skill) => (
        <div
          key={skill}
          className="flex shrink-0 items-center text-[clamp(2.5rem,7vw,7rem)] font-semibold leading-none"
        >
          <span>{skill}</span>
          <span
            className="mx-[clamp(1.25rem,3vw,3.5rem)] text-[0.42em] text-[var(--color-primary-600)]"
            aria-hidden="true"
          >
            ·
          </span>
        </div>
      ))}
    </div>
  );
}

export default function SkillsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        trackRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 38,
          ease: "none",
          repeat: -1,
        }
      );
    });

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      className="w-full overflow-hidden border-y border-[var(--color-gray-200)] py-6 text-[var(--color-gray-900)] dark:border-[var(--color-gray-800)] dark:text-[var(--color-gray-50)] md:py-8"
      aria-label="Technology stack"
    >
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
      >
        <SkillSequence skills={skillNames} />
        <SkillSequence skills={skillNames} hidden />
      </div>
    </section>
  );
}
