"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { FC } from "react";

const ModeToggle: FC = () => {
  const { setTheme, theme } = useTheme();

  return theme === "light" ? (
    <Button
      variant="ghost"
      onClick={() => setTheme("dark")}
      className="cursor-pointer"
    >
      <Sun className="h-[2rem] w-[2rem]" />
    </Button>
  ) : (
    <Button
      variant="ghost"
      onClick={() => setTheme("light")}
      className="cursor-pointer"
    >
      <Moon className="h-[2rem] w-[2rem]" />
    </Button>
  );
};

export default ModeToggle;
