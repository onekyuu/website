"use client";

import Hero from "@/components/home/Hero";
import Skills from "@/components/home/Skills";
import Portfolio from "@/components/home/Portfolio";
import Blog from "@/components/home/Blog";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Gallery from "@/components/home/Gallery";
import Contact from "@/components/home/Contact";
import Footer from "@/components/home/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  return (
    <div className="min-h-screen pb-4 lg:pb-0">
      <Hero />
      <Skills />
      <Portfolio />
      <Blog />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}
