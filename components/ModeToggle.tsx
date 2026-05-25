"use client";

import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { FC } from "react";

const ModeToggle: FC = () => {
  const { setTheme, theme } = useTheme();
  const isLight = theme === "light";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isLight ? "dark" : "light")}
      className="size-10 rounded-none border border-site-line bg-transparent text-site-ink hover:bg-site-paper-2"
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
    >
      {isLight ? (
        <SunIcon data-icon="icon" />
      ) : (
        <MoonIcon data-icon="icon" />
      )}
    </Button>
  );
};

export default ModeToggle;
