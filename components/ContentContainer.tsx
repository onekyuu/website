import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

const ContentContainer: FC<ContentContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn("mx-auto w-[var(--site-content-width)]", className)}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
