"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="text-sm font-medium text-site-muted">{label}</label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-none border border-site-line bg-site-paper px-3.5 py-2.5 text-sm text-site-ink shadow-none outline-none transition-[color,border-color,box-shadow] placeholder:text-site-muted focus-visible:border-site-line-strong focus-visible:ring-2 focus-visible:ring-site-line-strong/20 disabled:cursor-not-allowed disabled:opacity-50 md:text-base",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
