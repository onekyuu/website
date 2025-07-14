"use client";

import React, { FC, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import Lenis from "lenis";
import { BadgeCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "@/i18n/navigations";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Portfolio: FC = () => {
  const t = useTranslations("Home");
  const ProjectList = [
    {
      id: 1,
      name: "Project 1",
      description: [
        "Description of Project 1",
        "This project showcases advanced features.",
        "It includes a responsive design and modern UI.",
        "Built with React and Next.js.",
      ],
      image:
        "https://images.unsplash.com/photo-1622227920933-7fcd7377703f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Project 2",
      description: [
        "Description of Project 2",
        "This project focuses on performance optimization.",
        "It features a custom backend API.",
        "Built with Node.js and Express.",
      ],
      image:
        "https://images.unsplash.com/photo-1622227920933-7fcd7377703f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      name: "Project 3",
      description: [
        "Description of Project 3",
        "This project is a full-stack application.",
        "It includes user authentication and data management.",
        "Built with MongoDB and GraphQL.",
      ],
      image:
        "https://images.unsplash.com/photo-1622227920933-7fcd7377703f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      name: "Project 4",
      description: [
        "Description of Project 4",
        "This project is a mobile-first application.",
        "It features offline capabilities and push notifications.",
        "Built with React Native and Firebase.",
      ],
      image:
        "https://images.unsplash.com/photo-1622227920933-7fcd7377703f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const wapperRef = useRef<HTMLDivElement | null>(null);
  const projectBoxRef = useRef<HTMLDivElement | null>(null);
  const ifLeave = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    let distance = 0;

    const resize = () => {
      if (!projectBoxRef.current || !wapperRef.current) return;
      distance = projectBoxRef.current.offsetWidth - innerWidth;
      wapperRef.current.style.height = `${distance}px`;

      if (ifLeave.current) {
        projectBoxRef.current.style.transform = `translateX(-${distance}px)`;
      }
    };

    ScrollTrigger.create({
      trigger: wapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (!projectBoxRef.current) return;
        projectBoxRef.current.style.transform = `translateX(-${
          self.progress * distance
        }px)`;
      },
      onLeave: () => {
        ifLeave.current = true;
      },
      onEnterBack: () => {
        ifLeave.current = false;
      },
    });

    resize();
    window.addEventListener("resize", resize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wapperRef} className="relative w-full">
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        <div ref={projectBoxRef} className="flex items-center h-screen">
          <div className="h-2/3 lg:h-1/2 w-screen lg:w-5xl flex flex-shrink-0 items-center justify-center text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-semibold">
            {t("portfolio")}
          </div>
          {ProjectList.map((project) => (
            <div
              key={project.id}
              className="h-2/3 lg:h-1/2 w-screen lg:w-5xl lg:px-10 flex flex-shrink-0 items-center justify-center"
            >
              <ContentContainer className="h-full grid grid-rows-5 lg:grid-rows-1 lg:grid-cols-2 gap-4 place-items-center px-0">
                <div className="row-span-3 h-full w-full flex flex-col justify-start lg:justify-center">
                  <div className="text-2xl md:text-3xl lg:text-3xl font-semibold text-[var(--color-gray-900)]] dark:text-[var(--color-gray-50)] mb-4">
                    {project.name}
                  </div>
                  <div className="text-base md:text-lg text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] ">
                    {project.description.map((desc, index) => (
                      <div
                        key={`project-desc-${index}`}
                        className="flex items-start justify-start mb-2"
                      >
                        <span className="mr-4 ">
                          <BadgeCheck className="h-6 w-6" />
                        </span>
                        <span className="text-base md:text-lg">{desc}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <Link href={`/portfolio`}>
                      <Button className="font-bold mt-6 cursor-pointer">
                        {t("checkProject")}
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="row-span-2 w-full">
                  <AspectRatio
                    ratio={16 / 9}
                    className="rounded-xl lg:shadow-[-8px_8px_40px_0px_rgba(99,102,241,0.26)]"
                  >
                    <Image
                      fill
                      // src={project.image}
                      src={"/project-cover.jpeg"}
                      alt={project.name}
                      className="object-cover rounded-xl"
                    />
                  </AspectRatio>
                </div>
              </ContentContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
