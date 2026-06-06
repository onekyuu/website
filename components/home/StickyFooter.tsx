import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import FooterSection from "@/components/home/Footer";

type StickyFooterProps = {
  children?: ReactNode;
  className?: string;
};

export default function StickyFooter({
  children,
  className,
}: StickyFooterProps) {
  return (
    <footer
      aria-label="Site footer"
      className={cn(
        "relative h-[var(--sticky-footer-height)]",
        "[--sticky-footer-height:620px] md:[--sticky-footer-height:480px] lg:[--sticky-footer-height:420px]",
        "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]",
        className
      )}
    >
      <div className="relative -top-[100vh] h-[calc(100vh+var(--sticky-footer-height))]">
        <div className="sticky top-[calc(100vh-var(--sticky-footer-height))] h-[var(--sticky-footer-height)] overflow-hidden">
          {children ?? <FooterSection />}
        </div>
      </div>
    </footer>
  );
}
