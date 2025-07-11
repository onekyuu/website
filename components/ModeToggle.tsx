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
      className="cursor-pointer h-7 w-7 lg:h-9 lg:w-9"
    >
      <Sun />
    </Button>
  ) : (
    <Button
      variant="ghost"
      onClick={() => setTheme("light")}
      className="cursor-pointer h-7 w-7 lg:h-9  lg:w-9"
    >
      <Moon />
    </Button>
  );
};

export default ModeToggle;
