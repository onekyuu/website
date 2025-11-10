"use client";

import { skillsList } from "@/lib/constants";
import React, { FC, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: FC = () => {
  const t = useTranslations("Home");
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    if (!containerRef.current) return;

    const listContainer = containerRef.current.querySelector(
      ".skills-grid"
    ) as HTMLElement;
    if (!listContainer) return;

    const initAnimation = () => {
      skillsList.forEach((skill, i) => {
        const targetElement = listContainer.children[i] as HTMLElement;
        if (!targetElement) {
          return;
        }

        const elementCenterX =
          targetElement.offsetLeft + targetElement.clientWidth / 2;
        const elementCenterY =
          targetElement.offsetTop + targetElement.clientHeight / 2;

        const containerCenterX = listContainer.clientWidth / 2;
        const containerCenterY = listContainer.clientHeight / 2;

        const moveX = elementCenterX - containerCenterX;
        const moveY = elementCenterY - containerCenterY;

        gsap.set(targetElement, {
          x: -moveX,
          y: -moveY,
          scale: 0,
          opacity: 0,
        });

        const triggerElement = containerRef.current;
        const startPosition = `top center+=${Number(skill.order) * 80}px`;
        const endPosition = "+=40%";

        ScrollTrigger.create({
          trigger: triggerElement,
          start: startPosition,
          end: endPosition,
          scrub: 1,
          id: `skill-${i}`,
          onUpdate: (self) => {
            gsap.to(targetElement, {
              x: -moveX * (1 - self.progress),
              y: -moveY * (1 - self.progress),
              scale: self.progress,
              opacity: self.progress,
              duration: 0.1,
              ease: "power2.out",
            });
          },
        });
      });

      ScrollTrigger.refresh();
    };

    const timer = setTimeout(initAnimation, 300);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isMobile]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 lines-wave-bg -z-1"></div>
      <ContentContainer>
        <div className="text-3xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] mt-7 md:text-4xl md:mt-12 lg:text-5xl lg:mt-16">
          {t("skills")}
        </div>
        <div
          ref={containerRef}
          className="min-h-[70vh] flex items-center justify-center py-12"
        >
          <div className="skills-grid grid grid-cols-6 gap-4 lg:gap-12 place-items-center w-full relative py-20">
            {skillsList.map((skill) => (
              <div
                key={skill.key}
                data-order={skill.order}
                className={`${skill.key} will-change-transform`}
              >
                <skill.icon className="h-10 w-10 lg:h-18 lg:w-18" />
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default SkillsSection;
