import React, { FC } from "react";
import ContentContainer from "./ContentContainer";
import FooterSection from "./home/Footer";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

interface PageLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  heroContent: {
    title: string;
    subtitle: { start: string; end: string };
    extraContent?: React.ReactNode;
    extraElement?: React.ReactNode;
    images?: string[];
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
      <div className="relative w-full min-h-[50vh] lg:min-h-[60vh]">
        <div className="hero-bg absolute top-0 left-0 w-screen h-[50vh] lg:h-[60vh] z-[-1]" />
        <div className="flex flex-col w-full">
          <div className={cn("h-[14vh] lg:h-[18vh]")} />
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
                <div className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl">
                  {heroContent.extraContent}
                </div>
              )}
            </ContentContainer>
          </div>

          {heroContent.extraElement}
          {heroContent.images && <HeaderImages images={heroContent.images} />}
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

const HeaderImages: FC<{ images: string[] }> = ({ images }) => {
  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <ContentContainer className="">
        <AspectRatio ratio={2 / 1}>
          <Image
            src={images[0]}
            alt="Header image"
            fill
            className="object-cover rounded-2xl"
          />
        </AspectRatio>
      </ContentContainer>
    );
  }
  return (
    <Carousel
      className="w-full my-4 md:my-8 lg:my-12 mx-auto px-4 md:px-8 lg:px-0"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
        }),
      ]}
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index} className="lg:basis-1/3">
            <AspectRatio ratio={9 / 5}>
              <Image
                src={image}
                alt={`Project image ${index + 1}`}
                fill
                className="object-cover rounded-2xl"
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
