"use client";

import { skillsList } from "@/lib/constants";
import React, { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const Skills: FC = () => {
  const t = useTranslations("Home");
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    skillsList.forEach((skill, i) => {
      const listContainer = containerRef.current?.children[0] as HTMLElement;
      if (!listContainer) return;
      const targetElement = listContainer.children[i] as HTMLElement;
      if (!targetElement) return;
      const startX =
        listContainer.clientWidth / 2 -
        targetElement.offsetLeft -
        targetElement.clientWidth / 2;
      const startY =
        listContainer.clientHeight / 2 -
        targetElement.offsetTop -
        targetElement.clientHeight / 2;
      gsap.fromTo(
        targetElement,
        {},
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: `top center+=${Number(targetElement.dataset.order) * 100}px`,
            end: "+=40%",
            onUpdate: (self) => {
              targetElement.style.opacity = `${self.progress}`;
              targetElement.style.transform = `translate(${
                startX * (1 - self.progress)
              }px, ${startY * (1 - self.progress)}px)`;
              targetElement.style.scale = `${self.progress}`;
            },
          },
        }
      );
    });
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 lines-wave-bg -z-1"></div>
      <ContentContainer>
        <div className="text-2xl font-bold text-[var(--color-primary-900)] mt-7 md:text-3xl md:mt-12 lg:text-4xl lg:mt-16">
          {t("skills")}
        </div>
        <div
          ref={containerRef}
          className="min-h-[50vh] flex items-center justify-center"
        >
          <div className="h-30vh grid grid-cols-6 gap-4 lg:gap-12 place-items-center w-full">
            {skillsList.map((skill) => (
              <div
                key={skill.key}
                data-order={skill.order}
                className={`${skill.key}`}
                style={{
                  scale: 0,
                  opacity: 0,
                }}
              >
                <skill.icon className={"h-10 w-10 lg:h-18 lg:w-18"} />
              </div>
            ))}
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};

export default Skills;
