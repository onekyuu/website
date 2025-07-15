import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import React, { FC } from "react";
import Image from "next/image";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import HeadSVG from "@/public/head.svg";

const Gallery: FC = () => {
  const t = useTranslations("Home");

  const galleryImages = [
    {
      src: "/project-cover.jpeg",
      description:
        "A beautiful project cover image showcasing the essence of the project.",
      date: "2023-10-01",
      location: "New York, USA",
    },
    {
      src: "/project-cover.jpeg",
      description:
        "A beautiful project cover image showcasing the essence of the project.",
      date: "2023-10-01",
      location: "New York, USA",
    },
    {
      src: "/project-cover.jpeg",
      description:
        "A beautiful project cover image showcasing the essence of the project.",
      date: "2023-10-01",
      location: "New York, USA",
    },
    {
      src: "/project-cover.jpeg",
      description:
        "A beautiful project cover image showcasing the essence of the project.",
      date: "2023-10-01",
      location: "New York, USA",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-12 lg:mt-0">
      <ContentContainer>
        <div className="text-2xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] mb-4 mr-4 md:text-3xl md:mb-6 md:mr-6 lg:text-4xl lg:mb-8 lg:mr-8 text-end">
          {t("gallery")}
        </div>
      </ContentContainer>
      {galleryImages.map((image, index) => (
        <div
          key={index}
          className={
            "sticky top-0 h-[60vh] lg:h-[80vh] w-full flex items-center justify-center even:bg-[var(--color-primary-50)] odd:bg-[var(--color-primary-100)] even:text-[var(--color-primary-50)] odd:text-[var(--color-primary-100)]"
          }
        >
          <div className="absolute top-0 left-0 w-[25%] scale-[-1] translate-y-[-100%]">
            <HeadSVG className="w-full scale-200 lg:scale-500" />
          </div>
          <ContentContainer className="flex flex-col items-center justify-center gap-4">
            <AspectRatio ratio={16 / 9} className="w-full">
              <Image
                src={image.src}
                alt="Gallery Image"
                fill
                className="object-cover"
              />
            </AspectRatio>
            <div className="text-[var(--color-gray-900)]">
              <div>{image.description || ""}</div>
              <div>
                {image.location} - {image.date}
              </div>
            </div>
          </ContentContainer>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
