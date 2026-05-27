"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroParallaxWordProps {
  word: string;
}

export function HeroParallaxWord({ word }: HeroParallaxWordProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0, opacity: 1 },
        {
          yPercent: 30,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("section"),
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
    >
      <span
        className="block translate-y-[18%] whitespace-nowrap text-[clamp(8rem,22vw,18rem)] font-extrabold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--site-line-strong)]"
      >
        {word}
      </span>
    </div>
  );
}
