import ContentContainer from "@/components/ContentContainer";
import { useTranslations } from "next-intl";
import React from "react";
import HorizontalScroll from "@/components/HorizontalScroll";
import SummaryCard from "@/components/portfolio/SummaryCard";
import DetailCard from "@/components/portfolio/DetailCard";
import PageLayout from "@/components/PageLayout";

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

  const latestProjectNode = (
    <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
      <SummaryCard
        summary={ProjectList[0].summary}
        className="md:col-span-1 lg:col-span-2"
      />
      <DetailCard
        project={ProjectList[0]}
        type="latest"
        className="md:col-span-1 lg:col-span-3"
      />
    </div>
  );

  return (
    <PageLayout
      heroContent={{
        title: t("title"),
        subtitle: { start: t("subtitleStart"), end: t("subtitleEnd") },
        extraContent: (
          <div className="text-[var(--color-gray-700)] dark:text-[var(--color-gray-300)] text-base md:text-lg lg:text-xl text-center mt-4">
            {t("description")}
          </div>
        ),
      }}
      latestContent={{
        title: t("latestProject"),
        content: latestProjectNode,
      }}
    >
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
    </PageLayout>
  );
};

export default PortfolioPage;
