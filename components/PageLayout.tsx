import React, { FC } from "react";
import ContentContainer from "./ContentContainer";
import FooterSection from "./home/Footer";
import { cn } from "@/lib/utils";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  heroContent: {
    title: string;
    subtitle: { start: string; end: string };
    extraContent?: React.ReactNode;
    extraElement?: React.ReactNode;
  };
  latestContent?: {
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
      <div className="relative w-full">
        <div className="hero-bg absolute inset-0 z-[-1]" />
        <div className="grid grid-rows-[auto_1fr_auto] min-h-[70vh]">
          <div
            className={cn(
              heroContent.extraElement
                ? "h-[14vh] md:h-[18vh] lg:h-[20vh]"
                : "h-0"
            )}
          />

          <div className="flex items-center justify-center py-8">
            <ContentContainer className="flex flex-col items-center justify-center gap-6 px-4">
              <h1 className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-lg md:text-xl lg:text-2xl font-bold text-center">
                {heroContent.title}
              </h1>
              <h2 className="text-4xl font-bold md:text-6xl md:font-medium lg:text-7xl text-center max-w-5xl">
                <span className="text-[var(--color-gray-900)] dark:text-[var(--color-gray-50)]">
                  {heroContent.subtitle.start}
                </span>
                {heroContent.subtitle.start && heroContent.subtitle.end && " "}
                <span className="hero-text-gradient bg-clip-text text-transparent">
                  {heroContent.subtitle.end}
                </span>
              </h2>
              {heroContent.extraContent && (
                <div className="w-full max-w-3xl mt-4">
                  {heroContent.extraContent}
                </div>
              )}
            </ContentContainer>
          </div>

          {heroContent.extraElement}
        </div>
      </div>

      {latestContent && (
        <div className="relative w-full min-h-screen py-4 flex flex-col items-center justify-center">
          <div className="absolute inset-0 lines-wave-bg -z-1"></div>
          <ContentContainer className="flex flex-col justify-center h-full gap-14">
            <div className="text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] text-2xl md:text-3xl lg:text-4xl font-bold">
              {latestContent.title}
            </div>
            {latestContent.content}
          </ContentContainer>
        </div>
      )}
      {children}
      <FooterSection />
    </div>
  );
};

export default PageLayout;
