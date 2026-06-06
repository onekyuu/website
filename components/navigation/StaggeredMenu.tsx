"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

import TransitionLink from "@/components/TransitionLink";
import { cn } from "@/lib/utils";

// Adapted from React Bits Staggered Menu:
// https://github.com/DavidHDev/react-bits/blob/main/src/ts-tailwind/Components/StaggeredMenu/StaggeredMenu.tsx
export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: "left" | "right";
  items: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  colors?: string[];
  brand?: string;
  className?: string;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const DEFAULT_COLORS = ["#b9c9c2", "#d0d5e8"];
const OPEN_EASE = "power4.out";
const CLOSE_EASE = "power3.inOut";

export default function StaggeredMenu({
  position = "right",
  items,
  socialItems = [],
  displaySocials = true,
  menuButtonColor = "currentColor",
  openMenuButtonColor = "#111111",
  accentColor = "#4f46e5",
  colors = DEFAULT_COLORS,
  brand = "OneKyuu",
  className,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement[]>([]);
  const itemRefs = useRef<HTMLLIElement[]>([]);
  const socialRefs = useRef<HTMLAnchorElement[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);

  const closedX = position === "left" ? -100 : 100;

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const preLayers = preLayersRef.current.filter(Boolean);

    if (!panel || !rootRef.current) return;

    const context = gsap.context(() => {
      gsap.set([...preLayers, panel], { xPercent: closedX });
      gsap.set(itemRefs.current, { yPercent: 140, rotate: 10 });
      gsap.set(socialRefs.current, { y: 24, opacity: 0 });

      timelineRef.current = gsap
        .timeline({
          paused: true,
          onStart: () => {
            isAnimatingRef.current = true;
          },
          onComplete: () => {
            isAnimatingRef.current = false;
          },
          onReverseComplete: () => {
            isAnimatingRef.current = false;
          },
        })
        .to(preLayers, {
          xPercent: 0,
          duration: 0.5,
          ease: CLOSE_EASE,
          stagger: 0.1,
        })
        .to(
          panel,
          {
            xPercent: 0,
            duration: 0.65,
            ease: CLOSE_EASE,
          },
          "-=0.32"
        )
        .to(
          itemRefs.current,
          {
            yPercent: 0,
            rotate: 0,
            duration: 1,
            ease: OPEN_EASE,
            stagger: 0.1,
          },
          "-=0.28"
        )
        .to(
          socialRefs.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: OPEN_EASE,
            stagger: 0.06,
          },
          "-=0.62"
        );
    }, rootRef);

    return () => {
      timelineRef.current = null;
      context.revert();
    };
  }, [closedX, items.length, socialItems.length]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        timelineRef.current?.reverse();
        setIsOpen(false);
        onMenuClose?.();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onMenuClose]);

  const openMenu = useCallback(() => {
    if (isAnimatingRef.current || isOpen) return;

    setIsOpen(true);
    timelineRef.current?.play(0);
    onMenuOpen?.();
  }, [isOpen, onMenuOpen]);

  const closeMenu = useCallback(() => {
    if (!isOpen) return;

    timelineRef.current?.reverse();
    setIsOpen(false);
    onMenuClose?.();
  }, [isOpen, onMenuClose]);

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  };

  const handleItemEnter = (element: HTMLAnchorElement) => {
    const primary = element.querySelector<HTMLElement>("[data-menu-label]");
    const clone = element.querySelector<HTMLElement>("[data-menu-label-clone]");

    if (!primary || !clone) return;

    gsap.killTweensOf([primary, clone]);
    gsap.to(primary, {
      yPercent: -100,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.fromTo(
      clone,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.35, ease: "power2.out" }
    );
  };

  const handleItemLeave = (element: HTMLAnchorElement) => {
    const primary = element.querySelector<HTMLElement>("[data-menu-label]");
    const clone = element.querySelector<HTMLElement>("[data-menu-label-clone]");

    if (!primary || !clone) return;

    gsap.killTweensOf([primary, clone]);
    gsap.to(primary, {
      yPercent: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(clone, {
      yPercent: 100,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        className="relative z-[70] flex h-9 cursor-pointer items-center gap-2 text-sm font-medium"
        style={{ color: isOpen ? openMenuButtonColor : menuButtonColor }}
        onClick={toggleMenu}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-staggered-menu"
      >
        <span className="hidden sm:inline">{isOpen ? "Close" : "Menu"}</span>
        <span
          className={cn(
            "relative block size-4 transition-transform duration-500",
            isOpen && "rotate-45"
          )}
          aria-hidden="true"
        >
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
        </span>
      </button>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={isOpen ? 0 : -1}
        className={cn(
          "fixed inset-0 z-[45] cursor-default bg-black/20 transition-opacity duration-300",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={closeMenu}
      />

      <div
        className={cn(
          "pointer-events-none fixed inset-y-0 w-full sm:w-[32.5rem]",
          position === "left" ? "left-0" : "right-0"
        )}
        aria-hidden="true"
      >
        {colors.slice(0, 2).map((color, index) => (
          <div
            key={`${color}-${index}`}
            ref={(node) => {
              if (node) preLayersRef.current[index] = node;
            }}
            className="absolute inset-0 z-[50]"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      <div
        id="mobile-staggered-menu"
        ref={panelRef}
        className={cn(
          "fixed inset-y-0 z-[60] flex w-full flex-col overflow-y-auto bg-[#f3f3f1] px-6 pb-8 pt-24 text-[#111111] sm:w-[32.5rem] sm:px-10",
          position === "left" ? "left-0" : "right-0",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="mb-12 text-xl font-bold">{brand}</div>

        <nav aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1">
            {items.map((item, index) => (
              <li
                key={item.link}
                ref={(node) => {
                  if (node) itemRefs.current[index] = node;
                }}
                className="origin-bottom overflow-hidden"
              >
                <TransitionLink
                  href={item.link}
                  aria-label={item.ariaLabel || item.label}
                  className="group relative flex items-baseline gap-3 overflow-hidden py-1 text-[clamp(3rem,13vw,5.5rem)] font-semibold leading-[0.95]"
                  onMouseEnter={(event) => handleItemEnter(event.currentTarget)}
                  onMouseLeave={(event) => handleItemLeave(event.currentTarget)}
                  onFocus={(event) => handleItemEnter(event.currentTarget)}
                  onBlur={(event) => handleItemLeave(event.currentTarget)}
                  onClick={closeMenu}
                >
                  <span className="relative block overflow-hidden">
                    <span data-menu-label className="block">
                      {item.label}
                    </span>
                    <span
                      data-menu-label-clone
                      className="absolute inset-0 block translate-y-full"
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  <span
                    className="size-2 shrink-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ backgroundColor: accentColor }}
                    aria-hidden="true"
                  />
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        {displaySocials && socialItems.length > 0 && (
          <div className="mt-auto pt-16">
            <div className="mb-3 text-xs font-semibold uppercase text-black/45">
              Socials
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socialItems.map((item, index) => (
                <a
                  key={item.link}
                  ref={(node) => {
                    if (node) socialRefs.current[index] = node;
                  }}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium transition-opacity hover:opacity-50"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
