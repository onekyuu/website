"use client";

import { HeaderMenu } from "@/lib/constants";
import React, { useState } from "react";
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
import ContentContainer from "./ContentContainer";
import { Separator } from "./ui/separator";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContentContainer>
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-center items-center py-4 lg:py-8 bg-transparent fixed top-0 z-10">
        <div className="flex">logo</div>
        <nav className="hidden lg:block">
          <div className="text-lg grid grid-cols-4 gap-4 place-items-center justify-center items-center font-light">
            {HeaderMenu.map((item) => (
              <Link className="cursor-pointer" key={item.name} href={item.href}>
                {item.name}
              </Link>
            ))}
          </div>
        </nav>
        <div className="flex justify-end items-center gap-4">
          <ModeToggle />
          <LocaleSwitcher />
          {/* <Link
          href={"https://github.com/onekyuu/website"}
          className="p-1 rounded-full bg-[var(--color-gray-50)] dark:bg-[var(--color-gray-500)] hover:bg-[var(--color-gray-200)] dark:hover:bg-[var(--color-gray-700)] transition-colors cursor-pointer"
        >
          <Github className="h-5 w-5" />
        </Link> */}
          <div className="lg:hidden">
            <Drawer direction="right" open={isOpen} onOpenChange={setIsOpen}>
              <DrawerTrigger className="cursor-pointer flex items-center justify-center">
                <List />
              </DrawerTrigger>
              <DrawerContent className="h-screen w-screen">
                <DrawerHeader>
                  <DrawerTitle className="flex justify-between items-center">
                    <div>logo</div>
                    <DrawerClose className="cursor-pointer">
                      <X />
                    </DrawerClose>
                  </DrawerTitle>
                </DrawerHeader>
                <div className="flex flex-col gap-4 p-4">
                  <div className="flex flex-col py-6 relative z-0 rounded-lg items-center justify-center text-[var(--color-gray-50)] text-xl">
                    <div className="absolute inset-0 z-[-1] opacity-80 menu-hero-bg rounded-lg"></div>
                    <span>Discover</span>
                    <span>world</span>
                    <span>art</span>
                  </div>
                  {HeaderMenu.map((item) => (
                    <div key={item.name}>
                      <Link
                        className="px-4 py-8 cursor-pointer"
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="flex justify-between">
                          {item.name}
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
    </ContentContainer>
  );
}
