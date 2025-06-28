"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import hero from "@/public/hero.svg";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import ModeToggle from "@/components/ModeToggle";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Hero() {
  return (
    <div className="relative w-full">
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={hero}
          alt="Hero background"
          fill
          className="object-contain"
          unoptimized
        />
      </div> */}

      <nav className="z-10 w-full">
        <div className="flex min-h-[80px] w-full items-center justify-between px-4 sm:min-h-[90px] sm:px-6 md:px-8 lg:min-h-[100px] lg:px-[184px] xl:px-[184px]">
          {/* Logo */}
          <div className="my-auto font-lora text-xl font-medium sm:text-2xl">
            <div className="flex items-center gap-2 sm:gap-3.5">
              <Image
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8d49fc64921aebbee398bf2b70d18e4e28137ca2?placeholderIfAbsent=true&apiKey=ef51257dd94c45169d9b103078e7782c"
                alt="Logo"
                width={24}
                height={24}
                className="my-auto stroke-black stroke-[1px] fill-primary"
                unoptimized
              />
              <span>The Folio</span>
            </div>
          </div>

          {/* Mobile menu button (will need to be implemented) */}
          <button className="block md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>

          {/* Desktop/Tablet Navigation - Centered */}
          <div className="hidden md:flex my-auto items-center justify-center font-nunito text-base lg:text-lg text-gray-700 absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-4 lg:gap-7">
              <a
                href="#"
                className="my-auto hover:text-primary transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="my-auto hover:text-primary transition-colors"
              >
                Blog
              </a>
              <a
                href="#"
                className="my-auto hover:text-primary transition-colors"
              >
                Gallery
              </a>
              <a
                href="#"
                className="my-auto hover:text-primary transition-colors"
              >
                Projects
              </a>
            </div>
          </div>

          {/* Right side: LocaleSwitcher and ModeToggle */}
          <div className="md:flex items-center gap-3">
            <LocaleSwitcher />
            <ModeToggle />
          </div>
          <Button className="bg-[image:var(--color-gradient-2)]" size={"lg"}>
            click
          </Button>
        </div>
      </nav>

      <div className="z-10 flex min-h-[500px] w-full items-center px-4 sm:min-h-[600px] sm:px-6 md:px-8 lg:min-h-[700px] lg:px-[184px]">
        <div className="my-auto flex w-full flex-col-reverse items-center gap-8 py-8 md:flex-row md:gap-5 md:py-12 lg:py-16">
          <div className="flex flex-col justify-center w-full md:w-1/2 md:pr-4">
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl xl:text-[72px] xl:leading-[84px] bg-gradient-to-r from-primary to-[#6366F1] bg-clip-text text-transparent">
              Greetings, I'm a Freelance Digital Artist.
            </h1>
            <p className="mt-4 text-base sm:text-lg md:mt-6 lg:mt-10 xl:mt-16 xl:text-xl font-medium text-gray-600">
              Presenting unique and creative design solutions for a variety of
              challenges and needs.
            </p>
            <div className="mt-6 flex flex-wrap items-start gap-4 md:mt-8 lg:mt-10 xl:mt-16 xl:gap-8">
              <Button
                size="default"
                className="rounded-xl px-4 py-2 text-sm sm:text-base md:rounded-xl lg:rounded-2xl lg:px-6 lg:py-4 xl:text-xl"
              >
                Work with me
              </Button>
              <Button
                variant="outline"
                size="default"
                className="rounded-xl px-4 py-2 text-sm sm:text-base md:rounded-xl lg:rounded-2xl lg:px-6 lg:py-4 xl:text-xl border-2"
              >
                My Work
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full md:w-1/2 md:justify-end">
            <DotLottieReact src="/animations/coding.lottie" loop autoplay />
          </div>
        </div>
      </div>
    </div>
  );
}
