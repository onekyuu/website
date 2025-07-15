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
          <label className="text-sm font-medium text-gray-600">{label}</label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-xl border border-indigo-200 bg-white px-3.5 py-2.5 text-sm md:text-base text-gray-500 shadow-sm dark:bg-[var(--color-gray-200)]",
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
