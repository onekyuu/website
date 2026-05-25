import * as React from "react";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

type PhotoFrameProps = Omit<React.ComponentProps<"button">, "children"> & {
  src: string;
  alt: string;
  ratio?: number;
  sizes?: string;
  priority?: boolean;
  imageClassName?: string;
  children?: React.ReactNode;
};

export function PhotoFrame({
  src,
  alt,
  ratio = 4 / 5,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  imageClassName,
  className,
  children,
  type = "button",
  ...props
}: PhotoFrameProps) {
  return (
    <button
      type={type}
      className={cn(
        "group block w-full overflow-hidden rounded-site border border-site-line bg-site-paper-2 text-left",
        "transition-transform hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-line-strong",
        className
      )}
      {...props}
    >
      <AspectRatio ratio={ratio} className="relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            "object-cover transition-transform duration-300 group-hover:scale-105",
            imageClassName
          )}
        />
      </AspectRatio>
      {children}
    </button>
  );
}
