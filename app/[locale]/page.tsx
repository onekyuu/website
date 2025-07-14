"use client";

import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import Portfolio from "@/components/home/Portfolio";
import Blog from "@/components/home/Blog";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Skills />
      <Portfolio />
      <Blog />
    </div>
  );
}
