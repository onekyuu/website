"use client";

import React, { FC, ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface HorizontalScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  disabledBelow?: number;
  mode?: "sticky" | "pin";
  pinnedContent?: ReactNode;
  wrapperClassName?: string;
  stickyClassName?: string;
  viewportClassName?: string;
}

const HorizontalScroll: FC<HorizontalScrollProps> = ({
  children,
  className,
  disabledBelow,
  mode = "sticky",
  pinnedContent,
  wrapperClassName,
  stickyClassName,
  viewportClassName,
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const projectBoxRef = useRef<HTMLDivElement | null>(null);
  const ifLeave = useRef(false);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    const viewportEl = viewportRef.current;
    const projectBoxEl = projectBoxRef.current;

    if (!wrapperEl || !viewportEl || !projectBoxEl) return;

    const shouldDisable = () => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const belowBreakpoint =
        typeof disabledBelow === "number" && window.innerWidth < disabledBelow;

      return reducedMotion || belowBreakpoint;
    };

    const getDistance = () => {
      return Math.max(0, projectBoxEl.scrollWidth - viewportEl.clientWidth);
    };

    const killTrigger = () => {
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
    };

    const resize = () => {
      if (shouldDisable()) {
        killTrigger();
        wrapperEl.style.height = "auto";
        projectBoxEl.style.transform = "";
        return;
      }

      const distance = getDistance();
      wrapperEl.style.height =
        mode === "sticky" ? `${distance + window.innerHeight}px` : "";

      if (ifLeave.current) {
        projectBoxEl.style.transform = `translateX(-${distance}px)`;
      }

      if (!triggerRef.current) {
        triggerRef.current = ScrollTrigger.create({
          trigger: wrapperEl,
          start: "top top",
          end: mode === "sticky" ? "bottom bottom" : () => `+=${getDistance()}`,
          pin: mode === "pin" ? wrapperEl : false,
          scrub: 1,
          invalidateOnRefresh: true,
          id: "horizontal-scroll",
          onUpdate: (self) => {
            const currentDistance = getDistance();
            projectBoxEl.style.transform = `translateX(-${
              self.progress * currentDistance
            }px)`;
          },
          onLeave: () => {
            ifLeave.current = true;
          },
          onEnterBack: () => {
            ifLeave.current = false;
          },
        });
      }

      triggerRef.current.refresh();
    };

    const initTimer = setTimeout(() => {
      resize();

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 100);
    }, 200);

    window.addEventListener("resize", resize);

    return () => {
      clearTimeout(initTimer);
      killTrigger();
      wrapperEl.style.height = "";
      projectBoxEl.style.transform = "";
      window.removeEventListener("resize", resize);
    };
  }, [disabledBelow, mode]);

  return (
    <div ref={wrapperRef} className={cn("relative w-full", wrapperClassName)}>
      <div
        className={cn(
          "w-full overflow-hidden flex items-center",
          mode === "sticky" && [
            "sticky top-0 h-screen",
            "top-[72px] lg:top-0",
            "h-[calc(100vh-72px)] lg:h-screen",
          ],
          mode === "pin" && "h-screen",
          stickyClassName
        )}
      >
        <div
          ref={viewportRef}
          className={cn("h-full w-full overflow-hidden", viewportClassName)}
        >
          {pinnedContent}
          <div
            ref={projectBoxRef}
            className={cn("flex items-center h-full gap-8", className)}
            {...props}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
