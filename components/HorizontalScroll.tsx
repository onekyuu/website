"use client";

import React, { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const HorizontalScroll: FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const wapperRef = useRef<HTMLDivElement | null>(null);
  const projectBoxRef = useRef<HTMLDivElement | null>(null);
  const ifLeave = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let distance = 0;

    const resize = () => {
      if (!projectBoxRef.current || !wapperRef.current) return;
      distance = projectBoxRef.current.offsetWidth - innerWidth;
      wapperRef.current.style.height = `${distance}px`;

      if (ifLeave.current) {
        projectBoxRef.current.style.transform = `translateX(-${distance}px)`;
      }
    };

    ScrollTrigger.create({
      trigger: wapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (!projectBoxRef.current) return;
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
    window.addEventListener("resize", resize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wapperRef} className="relative w-full">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div
          ref={projectBoxRef}
          className={cn("flex items-center h-screen", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
