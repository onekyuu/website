"use client";

import Hero from "@/components/home/Hero";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ScrollSmoother } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function HomePage() {
  const main = useRef(null);
  const smoother = useRef<ScrollSmoother>(null);

  const scrollTo = () => {
    smoother.current?.scrollTo(".box-c", true, "center center");
  };

  // useGSAP(
  //   () => {
  //     // create the smooth scroller FIRST!
  //     smoother.current = ScrollSmoother.create({
  //       smooth: 2, // seconds it takes to "catch up" to native scroll position
  //       effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
  //     });
  //     ScrollTrigger.create({
  //       trigger: ".box-c",
  //       pin: true,
  //       start: "center center",
  //       end: "+=300",
  //       markers: true,
  //     });
  //   },
  //   { scope: main }
  // );

  return (
    <div ref={main} className="min-h-screen overflow-hidden">
      <Hero />
      {/* <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content">
          <header className="header">
            <h2 className="title">GSAP ScrollSmoother in React</h2>
            <button className="button" onClick={scrollTo}>
              Jump to C
            </button>
          </header>
          <div className="box box-a gradient-blue" data-speed="0.5">
            a
          </div>
          <div className="box box-b gradient-orange" data-speed="0.8">
            b
          </div>
          <div className="box box-c gradient-purple" data-speed="1.5">
            c
          </div>
          <div className="line"></div>
        </div>
      </div> */}
    </div>
  );
}
