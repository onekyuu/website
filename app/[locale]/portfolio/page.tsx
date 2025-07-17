import ContentContainer from "@/components/ContentContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigations";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import Image from "next/image";
import HorizontalScroll from "@/components/HorizontalScroll";
import SummaryCard from "@/components/portfolio/SummaryCard";
import DetailCard from "@/components/portfolio/DetailCard";

const PortfolioPage = () => {
  const t = useTranslations("Portfolio");

  const ProjectList = [
    {
      id: 1,
      name: "Project 1",
      description: "This is a brief description of Project 1.",
      link: "/portfolio/project1",
      summary: [
        "Description of Project 1",
        "This project showcases advanced features.",
        "It includes a responsive design and modern UI.",
        "Built with React and Next.js.",
      ],
    },
    {
      id: 2,
      name: "Project 2",
      description: "This is a brief description of Project 2.",
      link: "/portfolio/project2",
      summary: [
        "Description of Project 2",
        "This project focuses on performance optimization.",
        "It features a custom backend API.",
        "Built with Node.js and Express.",
      ],
    },
    {
      id: 3,
      name: "Project 3",
      description: "This is a brief description of Project 3.",
      link: "/portfolio/project3",
      summary: [
        "Description of Project 3",
        "This project is a full-stack application.",
        "It includes user authentication and data management.",
        "Built with MongoDB and GraphQL.",
      ],
    },
    {
      id: 4,
      name: "Project 4",
      description: "This is a brief description of Project 4.",
      link: "/portfolio/project4",
      summary: [
        "Description of Project 4",
        "This project is a mobile-first application.",
        "It features offline capabilities and push notifications.",
        "Built with React Native and Firebase.",
      ],
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[70vh] w-full">
        <div className="hero-bg absolute inset-0 z-[-1]"></div>
        <ContentContainer className="flex flex-col items-center justify-center h-full gap-6">
          <div className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-lg md:text-xl lg:text-2xl font-bold">
            {t("title")}
          </div>
          <div className="text-4xl font-bold md:text-6xl md:font-medium lg:text-7xl text-center">
            <span>{t("subtitleStart")}</span>

            <span className="hero-text-gradient bg-clip-text text-transparent">
              {t("subtitleEnd")}
            </span>
          </div>
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg lg:text-xl text-center mt-4">
            {t("description")}
          </div>
        </ContentContainer>
      </div>
      <div className="relative w-full min-h-screen py-4 flex flex-col items-center justify-center">
        <div className="absolute inset-0 lines-wave-bg -z-1"></div>
        <ContentContainer className="flex flex-col justify-center h-full gap-14">
          <div className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
            {t("latestProject")}
          </div>
          <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            <SummaryCard
              summary={ProjectList[0].summary}
              className="md:col-span-1 lg:col-span-2"
            />
            <DetailCard
              project={ProjectList[0]}
              type="lateset"
              className="md:col-span-1 lg:col-span-3"
            />
          </div>
        </ContentContainer>
      </div>
      <HorizontalScroll className="gap-6">
        <div className=" w-[80vw] lg:w-[50vw] text-center text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
          {t("allProjects")}
        </div>
        {ProjectList.map((project) => (
          <div
            key={project.name}
            className="w-screen flex items-center justify-center flex-shrink-0"
          >
            <ContentContainer className="lg:min-h-1/2 grid grid-rows-2 grid-cols-1 md:grid-cols-2 md:grid-rows-1 lg:grid-cols-5 gap-6">
              <DetailCard
                project={project}
                className="project-card-bg row-span-1 md:col-span-1 lg:col-span-3"
              />
              <SummaryCard
                summary={project.summary}
                className="row-span-1 md:col-span-1 lg:col-span-2"
              />
            </ContentContainer>
          </div>
        ))}
      </HorizontalScroll>
    </div>
  );
};

export default PortfolioPage;
