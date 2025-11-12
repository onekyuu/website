import { useCallback } from "react";

export const useScrollTo = () => {
  const scrollToElement = useCallback(
    (elementId: string, offset: number = 0) => {
      const element = document.getElementById(elementId);
      if (!element) {
        console.warn(`Element with id "${elementId}" not found`);
        return;
      }

      const lenis = (window as any).lenis;

      if (lenis) {
        lenis.scrollTo(element, {
          offset,
          duration: 1.5,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const elementPosition =
          element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    },
    []
  );

  const scrollToTop = useCallback(() => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return { scrollToElement, scrollToTop };
};
