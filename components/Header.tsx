"use client";

import { HeaderMenu } from "@/lib/constants";
import React, { use, useState } from "react";
import { Link } from "@/i18n/navigations";
import ModeToggle from "./ModeToggle";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { ArrowRight, List, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { useTranslations } from "next-intl";

export default function Header() {
  const t = useTranslations("Home");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-12 justify-center items-center py-4 lg:py-8 px-8 lg:px-12 bg-transparent fixed top-0 left-0 z-10">
      <div className="flex lg:col-span-3 font-bold text-xl hero-text-gradient bg-clip-text text-transparent">
        OneKyuu
      </div>
      <nav className="hidden lg:block lg:col-span-6">
        <div className="text-lg grid grid-cols-4 gap-4 place-items-center justify-center items-center font-light">
          {HeaderMenu.map((item) => (
            <Link className="cursor-pointer" key={item.key} href={item.href}>
              {t(`${item.key}`)}
            </Link>
          ))}
        </div>
      </nav>
      <div className="flex lg:col-span-3 justify-end items-center gap-4">
        <ModeToggle />
        <LocaleSwitcher />
        <div className="lg:hidden">
          <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger className="cursor-pointer flex items-center justify-center">
              <List />
            </DrawerTrigger>
            <DrawerContent className="h-screen w-screen">
              <DrawerHeader>
                <DrawerTitle className="flex justify-between items-center">
                  <div className="font-bold text-xl hero-text-gradient bg-clip-text text-transparent">
                    OneKyuu
                  </div>
                  <DrawerClose
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <X />
                  </DrawerClose>
                </DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-4 p-4">
                <div className="flex flex-col py-6 relative z-0 rounded-lg items-center justify-center text-[var(--color-gray-50)] text-xl">
                  <div className="absolute inset-0 z-[-1] opacity-80 menu-hero-bg rounded-lg"></div>
                  <span>Discover my</span>
                  <span>world of coding and photography</span>
                </div>
                {HeaderMenu.map((item) => (
                  <div key={item.name}>
                    <Link
                      className="px-4 py-8 cursor-pointer"
                      key={item.key}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="flex justify-between">
                        {t(`${item.key}`)}
                        <ArrowRight />
                      </span>
                    </Link>
                    <Separator />
                  </div>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
