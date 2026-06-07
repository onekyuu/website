"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import TransitionLink from "@/components/TransitionLink";

export interface FlowingMenuItem {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
}

interface MenuItemProps extends FlowingMenuItem {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  isFirst: boolean;
}

export default function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#ffffff",
  bgColor = "#120f17",
  marqueeBgColor = "#ffffff",
  marqueeTextColor = "#120f17",
  borderColor = "#ffffff",
}: FlowingMenuProps) {
  return (
    <div
      className="h-full w-full overflow-hidden py-16 md:py-24"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="m-0 flex h-full flex-col p-0">
        {items.map((item, index) => (
          <MenuItem
            key={item.link}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            isFirst={index === 0}
          />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  isFirst,
}: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  useEffect(() => {
    const calculateRepetitions = () => {
      const marqueeContent =
        marqueeInnerRef.current?.querySelector<HTMLElement>(".marquee-part");

      if (!marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (!contentWidth) return;

      const needed = Math.ceil(window.innerWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener("resize", calculateRepetitions);

    return () => {
      window.removeEventListener("resize", calculateRepetitions);
    };
  }, [image, text]);

  useEffect(() => {
    const setupMarquee = () => {
      const marqueeContent =
        marqueeInnerRef.current?.querySelector<HTMLElement>(".marquee-part");

      if (!marqueeInnerRef.current || !marqueeContent) return;

      const contentWidth = marqueeContent.offsetWidth;
      if (!contentWidth) return;

      animationRef.current?.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };

    const timer = window.setTimeout(setupMarquee, 50);

    return () => {
      window.clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [image, repetitions, speed, text]);

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): "top" | "bottom" => {
    const topEdgeDistance = (mouseX - width / 2) ** 2 + mouseY ** 2;
    const bottomEdgeDistance =
      (mouseX - width / 2) ** 2 + (mouseY - height) ** 2;

    return topEdgeDistance < bottomEdgeDistance ? "top" : "bottom";
  };

  const animateEnter = (edge: "top" | "bottom") => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) {
      return;
    }

    gsap
      .timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(
        marqueeInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" },
        0
      )
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const animateLeave = (edge: "top" | "bottom") => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) {
      return;
    }

    gsap
      .timeline({ defaults: { duration: 0.6, ease: "expo" } })
      .to(
        marqueeRef.current,
        { y: edge === "top" ? "-101%" : "101%" },
        0
      )
      .to(
        marqueeInnerRef.current,
        { y: edge === "top" ? "101%" : "-101%" },
        0
      );
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    animateEnter(
      findClosestEdge(
        event.clientX - rect.left,
        event.clientY - rect.top,
        rect.width,
        rect.height
      )
    );
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;

    const rect = itemRef.current.getBoundingClientRect();
    animateLeave(
      findClosestEdge(
        event.clientX - rect.left,
        event.clientY - rect.top,
        rect.width,
        rect.height
      )
    );
  };

  return (
    <div
      ref={itemRef}
      className="relative h-[clamp(7rem,11vw,10rem)] shrink-0 overflow-hidden text-center"
      style={{ borderTop: isFirst ? "none" : `1px solid ${borderColor}` }}
    >
      <TransitionLink
        href={link}
        className="relative flex h-full cursor-pointer items-center justify-center px-2 text-center text-[clamp(1.125rem,2.2vw,2.35rem)] font-semibold leading-[1.1] text-balance no-underline [overflow-wrap:anywhere] md:px-3"
        style={{ color: textColor }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={() => animateEnter("bottom")}
        onBlur={() => animateLeave("bottom")}
      >
        {text}
      </TransitionLink>

      <div
        ref={marqueeRef}
        className="pointer-events-none absolute left-0 top-0 h-full w-full translate-y-[101%] overflow-hidden"
        style={{ backgroundColor: marqueeBgColor }}
      >
        <div ref={marqueeInnerRef} className="flex h-full w-fit">
          {Array.from({ length: repetitions }).map((_, index) => (
            <div
              key={index}
              className="marquee-part flex shrink-0 items-center"
              style={{ color: marqueeTextColor }}
            >
              <span className="whitespace-nowrap px-[1vw] text-[clamp(1.2rem,2.5vw,2.5rem)] font-normal leading-none">
                {text}
              </span>
              <div
                className="mx-[2vw] h-[clamp(4rem,7vw,6.5rem)] w-[clamp(8rem,16vw,14rem)] shrink-0 rounded-full bg-cover bg-center"
                style={{ backgroundImage: `url("${image}")` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
