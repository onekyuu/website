"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { FC, useEffect, useState } from "react";

const ModeToggle: FC = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        className="h-7 w-7 cursor-pointer lg:h-9 lg:w-9"
        aria-label="Toggle color theme"
        disabled
      >
        <Moon className="opacity-0" />
      </Button>
    );
  }

  return resolvedTheme === "light" ? (
    <Button
      variant="ghost"
      onClick={() => setTheme("dark")}
      className="cursor-pointer h-7 w-7 lg:h-9 lg:w-9"
      aria-label="Switch to dark theme"
    >
      <Sun />
    </Button>
  ) : (
    <Button
      variant="ghost"
      onClick={() => setTheme("light")}
      className="cursor-pointer h-7 w-7 lg:h-9  lg:w-9"
      aria-label="Switch to light theme"
    >
      <Moon />
    </Button>
  );
};

export default ModeToggle;
