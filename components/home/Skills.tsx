"use client";

import { skillsList } from "@/lib/constants";
import React, { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import ScrollFloat from "./ScrollFloat";

gsap.registerPlugin(ScrollTrigger);

const SkillsSection: FC = () => {
  const t = useTranslations("Home");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const listContainer = containerRef.current?.querySelector(
      ".skills-grid"
    ) as HTMLElement;

    if (!containerRef.current || !listContainer) {
      return;
    }

    const initAnimation = () => {
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];

      skillsList.forEach((skill, i) => {
        const targetElement = listContainer.children[i] as HTMLElement;
        if (!targetElement) {
          return;
        }

        const calculatePosition = () => {
          const elementCenterX =
            targetElement.offsetLeft + targetElement.clientWidth / 2;
          const elementCenterY =
            targetElement.offsetTop + targetElement.clientHeight / 2;

          const containerCenterX = listContainer.clientWidth / 2;
          const containerCenterY = listContainer.clientHeight / 2;

          const moveX = elementCenterX - containerCenterX;
          const moveY = elementCenterY - containerCenterY;

          return { moveX, moveY };
        };

        const { moveX, moveY } = calculatePosition();

        gsap.set(targetElement, {
          x: -moveX,
          y: -moveY,
          scale: 0,
          opacity: 0,
        });

        const trigger = ScrollTrigger.create({
          trigger: containerRef.current,
          start: `top center+=${Number(skill.order) * 80}px`,
          end: "+=40%",
          scrub: 1,
          id: `skill-${i}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const { moveX: currentMoveX, moveY: currentMoveY } =
              calculatePosition();

            gsap.to(targetElement, {
              x: -currentMoveX * (1 - self.progress),
              y: -currentMoveY * (1 - self.progress),
              scale: self.progress,
              opacity: self.progress,
              duration: 0.1,
              ease: "power2.out",
            });
          },
          onRefresh: () => {
            const { moveX: refreshMoveX, moveY: refreshMoveY } =
              calculatePosition();
            gsap.set(targetElement, {
              x: -refreshMoveX,
              y: -refreshMoveY,
              scale: 0,
              opacity: 0,
            });
          },
        });

        triggersRef.current.push(trigger);
      });

      ScrollTrigger.refresh();
    };

    const handleResize = () => {
      initAnimation();
    };

    const timer = setTimeout(initAnimation, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      triggersRef.current.forEach((trigger) => trigger.kill());
      triggersRef.current = [];
    };
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 lines-wave-bg -z-1"></div>
      <ContentContainer>
        <ScrollFloat
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
          textClassName="text-3xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] pt-7 md:text-4xl md:pt-12 lg:text-5xl lg:pt-16"
        >
          {t("skills")}
        </ScrollFloat>
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
