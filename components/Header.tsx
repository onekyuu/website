import { HeaderMenu } from "@/lib/constants";
import Link from "next/link";
import React from "react";
import ModeToggle from "./ModeToggle";
import { Button } from "./ui/button";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { List, X } from "lucide-react";

export default function Header() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 justify-center items-center py-4 lg:py-8 ">
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
        <div className="lg:hidden">
          <Drawer direction="right">
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
                <div className="flex flex-col relative z-0 rounded-lg items-center justify-center">
                  <div className="absolute inset-0 z-[-1] opacity-80 menu-hero-bg rounded-lg"></div>
                  <span>Discover</span>
                  <span>world</span>
                  <span>art</span>
                </div>
                {HeaderMenu.map((item) => (
                  <Link
                    className="cursor-pointer"
                    key={item.name}
                    href={item.href}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}
