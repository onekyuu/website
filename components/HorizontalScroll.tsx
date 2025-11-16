"use client";

import React, { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const projectBoxRef = useRef<HTMLDivElement | null>(null);
  const ifLeave = useRef(false);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!wrapperRef.current || !projectBoxRef.current) return;

    const getDistance = () => {
      if (!projectBoxRef.current) return 0;
      return projectBoxRef.current.offsetWidth - window.innerWidth;
    };

    const resize = () => {
      if (!projectBoxRef.current || !wrapperRef.current) return;

      const distance = getDistance();
      wrapperRef.current.style.height = `${distance + window.innerHeight}px`;

      if (ifLeave.current && projectBoxRef.current) {
        projectBoxRef.current.style.transform = `translateX(-${distance}px)`;
      }

      if (triggerRef.current) {
        triggerRef.current.refresh();
      }
    };

    const initTimer = setTimeout(() => {
      if (triggerRef.current) {
        triggerRef.current.kill();
      }

      triggerRef.current = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        id: "horizontal-scroll",
        onUpdate: (self) => {
          if (!projectBoxRef.current) return;
          const distance = getDistance();
          projectBoxRef.current.style.transform = `translateX(-${
            self.progress * distance
          }px)`;
        },
        onLeave: () => {
          ifLeave.current = true;
        },
        onEnterBack: () => {
          ifLeave.current = false;
        },
      });

      resize();

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 200);

    window.addEventListener("resize", resize);

    return () => {
      clearTimeout(initTimer);
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div
        className={cn(
          "sticky top-0 w-full h-screen overflow-hidden flex items-center",
          "top-[72px] lg:top-0",
          "h-[calc(100vh-72px)] lg:h-screen"
        )}
      >
        <div
          ref={projectBoxRef}
          className={cn("flex items-center h-full gap-8", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
