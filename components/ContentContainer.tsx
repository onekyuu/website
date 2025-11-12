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
      className={cn("w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8", className)}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
