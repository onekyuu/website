"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";

const easing: [number, number, number, number] = [0.76, 0, 0.24, 1];

const perspective: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  enter: {
    scale: 1,
    y: 0,
  },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: easing,
    },
  },
};

const slide: Variants = {
  initial: {
    y: "100vh",
  },
  enter: {
    y: "100vh",
  },
  exit: {
    y: 0,
    transition: {
      duration: 1,
      ease: easing,
    },
  },
};

const opacity: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: easing,
    },
  },
};

const backdrop: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0,
    },
  },
};

const reducedBackdrop: Variants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

const reducedMotion: Variants = {
  initial: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  enter: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
  exit: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0,
    },
  },
};

function animation(variants: Variants) {
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants,
  } as const;
}

type PageTransitionProps = {
  children: ReactNode;
};

type PageTransitionContextValue = {
  isExiting: boolean;
  startTransition: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isExiting, setIsExiting] = useState(false);
  const pendingHref = useRef<string | null>(null);
  const exitingPathname = useRef(pathname);
  const perspectiveVariants = prefersReducedMotion
    ? reducedMotion
    : perspective;
  const slideVariants = prefersReducedMotion ? reducedMotion : slide;
  const opacityVariants = prefersReducedMotion ? reducedMotion : opacity;
  const backdropVariants = prefersReducedMotion
    ? reducedBackdrop
    : backdrop;

  const startTransition = useCallback(
    (href: string) => {
      if (isExiting) return;

      pendingHref.current = href;
      exitingPathname.current = pathname;
      setIsExiting(true);
    },
    [isExiting, pathname]
  );

  useEffect(() => {
    if (isExiting && pathname !== exitingPathname.current) {
      pendingHref.current = null;
      setIsExiting(false);
    }
  }, [isExiting, pathname]);

  const handleExitComplete = () => {
    if (pendingHref.current) {
      router.push(pendingHref.current);
      return;
    }

    setIsExiting(false);
  };

  return (
    <PageTransitionContext.Provider value={{ isExiting, startTransition }}>
      <AnimatePresence mode="wait" onExitComplete={handleExitComplete}>
        {!isExiting && (
          <motion.div
            key={pathname}
            className="relative isolate min-h-screen"
            {...animation(opacityVariants)}
          >
            <motion.div
              className="pointer-events-none fixed inset-0 -z-10 bg-white dark:bg-[var(--color-gray-950)]"
              {...animation(backdropVariants)}
            />
            <motion.div
              className="pointer-events-none fixed inset-0 z-50 bg-white dark:bg-[var(--color-gray-950)]"
              {...animation(slideVariants)}
            />
            <motion.div
              className="relative min-h-screen origin-top overflow-clip"
              {...animation(perspectiveVariants)}
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransitionContext.Provider>
  );
}
