import React, { FC } from "react";
import ContentContainer from "./ContentContainer";
import Footer from "./home/Footer";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  heroContent: {
    title: string;
    subtitle: { start: string; end: string };
    extraContent?: React.ReactNode;
  };
  latestContent: {
    title: string;
    content: React.ReactNode;
  };
}

const PageLayout: FC<PageLayoutProps> = ({
  heroContent,
  latestContent,
  children,
}) => {
  return (
    <div className="min-h-screen w-full">
      <div className="relative h-[70vh] w-full">
        <div className="hero-bg absolute inset-0 z-[-1]"></div>
        <ContentContainer className="flex flex-col items-center justify-center h-full gap-6">
          <div className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-lg md:text-xl lg:text-2xl font-bold">
            {heroContent.title}
          </div>
          <div className="text-4xl font-bold md:text-6xl md:font-medium lg:text-7xl text-center">
            <span>{heroContent.subtitle.start}</span>

            <span className="hero-text-gradient bg-clip-text text-transparent">
              {heroContent.subtitle.end}
            </span>
          </div>
          {heroContent.extraContent}
        </ContentContainer>
      </div>
      <div className="relative w-full min-h-screen py-4 flex flex-col items-center justify-center">
        <div className="absolute inset-0 lines-wave-bg -z-1"></div>
        <ContentContainer className="flex flex-col justify-center h-full gap-14">
          <div className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
            {latestContent.title}
          </div>
          {/* <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            <SummaryCard
              summary={ProjectList[0].summary}
              className="md:col-span-1 lg:col-span-2"
            />
            <DetailCard
              project={ProjectList[0]}
              type="lateset"
              className="md:col-span-1 lg:col-span-3"
            />
          </div> */}
          {latestContent.content}
        </ContentContainer>
      </div>
      {children}
      <Footer />
    </div>
  );
};

export default PageLayout;
