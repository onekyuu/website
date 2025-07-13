import clsx from "clsx";
import React, { FC, ReactNode } from "react";

const ContentContainer: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <section
      className={clsx("container mx-auto overflow-hidden px-8", className)}
    >
      {children}
    </section>
  );
};

export default ContentContainer;
