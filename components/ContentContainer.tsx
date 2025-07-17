import clsx from "clsx";
import React, { FC, ReactNode } from "react";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ContentContainer = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <section
      className={clsx(
        "container mx-auto overflow-hidden px-4 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default ContentContainer;
