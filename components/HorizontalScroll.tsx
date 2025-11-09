"use client";

import React, { FC, useEffect, useRef, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      if (wapperRef.current) {
        wapperRef.current.style.height = "";
      }
      if (projectBoxRef.current) {
        projectBoxRef.current.style.transform = "";
      }

      return;
    }

    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let distance = 0;

    const resize = () => {
      if (!projectBoxRef.current || !wapperRef.current) return;

      distance = projectBoxRef.current.offsetWidth - window.innerWidth;
      wapperRef.current.style.height = `${distance}px`;

      if (ifLeave.current) {
        projectBoxRef.current.style.transform = `translateX(-${distance}px)`;
      }
    };

    const scrollTrigger = ScrollTrigger.create({
      trigger: wapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
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
      scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div key={"mobile-wrapper"} className="w-full">
        <div className={cn("flex flex-col gap-8", className)} {...props}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div key={"desktop-wrapper"} ref={wapperRef} className="relative w-full">
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
