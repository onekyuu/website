"use client";

import React, { useState } from "react";
import { ArrowRightIcon, MenuIcon, XIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import LocaleSwitcher from "@/components/LocaleSwitcher";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Link, usePathname } from "@/i18n/navigations";
import { HeaderMenu } from "@/lib/constants";
import { cn } from "@/lib/utils";

function BrandMark() {
  return (
    <span className="flex items-center gap-3 text-site-nav uppercase tracking-site-brand text-site-ink [font-weight:760]">
      <span className="grid size-7 place-items-center border border-site-ink text-site-control">
        九
      </span>
      <span>OneKyuu</span>
    </span>
  );
}

export default function Header() {
  const t = useTranslations("Home");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-20 border-b border-site-line bg-[var(--site-header-bg)] text-site-ink backdrop-blur-xl">
      <nav className="mx-auto grid h-site-header w-[var(--site-content-width)] grid-cols-[var(--site-header-grid)] items-center gap-6 lg:grid-cols-[var(--site-header-grid-wide)]">
        <Link href="/" aria-label="OneKyuu home">
          <BrandMark />
        </Link>

        <div className="hidden items-center gap-[var(--site-nav-gap)] text-site-nav text-site-ink-2 lg:flex">
          {HeaderMenu.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "relative py-2 transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-site-ink after:transition-transform hover:text-site-ink hover:after:scale-x-100",
                isActive(item.href) && "text-site-ink after:scale-x-100"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <ModeToggle />
            <LocaleSwitcher />
          </div>
          <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-10 rounded-none border border-site-line bg-site-paper text-site-ink hover:bg-site-paper-2 lg:hidden"
                aria-label="Open navigation menu"
              >
                <MenuIcon data-icon="icon" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-dvh w-[var(--site-drawer-width)] border-site-line bg-site-paper text-site-ink">
              <DrawerHeader className="border-b border-site-line">
                <DrawerTitle className="flex items-center justify-between">
                  <BrandMark />
                  <DrawerClose asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-10 rounded-none border border-site-line bg-site-paper text-site-ink hover:bg-site-paper-2"
                      aria-label="Close navigation menu"
                    >
                      <XIcon data-icon="icon" />
                    </Button>
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-1 flex-col gap-8 p-5">
                <div className="flex items-center gap-2 sm:hidden">
                  <ModeToggle />
                  <LocaleSwitcher />
                </div>
                <div className="border-y border-site-line-strong py-5">
                  <p className="text-site-control uppercase tracking-site-label text-site-muted">
                    Navigation
                  </p>
                  <p className="mt-3 text-2xl leading-tight">
                    Full-stack development, writing, and photography.
                  </p>
                </div>
                <div className="flex flex-col">
                  {HeaderMenu.map((item, index) => (
                    <React.Fragment key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center justify-between py-5 text-2xl"
                      >
                        <span>{t(item.key)}</span>
                        <ArrowRightIcon
                          data-icon="inline-end"
                          className="size-5 transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                      {index < HeaderMenu.length - 1 && <Separator />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </nav>
    </header>
  );
}
