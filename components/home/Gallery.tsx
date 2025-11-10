import React, { FC } from "react";
import Image from "next/image";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import HeadSVG from "@/public/head.svg";
import { Gallery } from "@/types/gallery";
import dayjs from "dayjs";
import { Camera } from "lucide-react";

interface GallerySectionProps {
  galleryList: Gallery[];
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
}

const GallerySection: FC<GallerySectionProps> = ({
  galleryList,
  isLoading,
}) => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen mt-12 lg:mt-0">
      <ContentContainer className="my-4">
        <div className="text-3xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] md:text-4xl lg:text-5xl text-end">
          {t("gallery")}
        </div>
      </ContentContainer>
      {galleryList.map((image, index) => (
        <div
          key={index}
          className={
            "sticky top-0 h-[80vh] py-8 w-full flex items-center justify-center even:bg-[var(--color-primary-50)] odd:bg-[var(--color-primary-100)] even:text-[var(--color-primary-50)] odd:text-[var(--color-primary-100)] dark:even:bg-[var(--color-gray-800)] dark:odd:bg-[var(--color-gray-900)] dark:even:text-[var(--color-gray-800)] dark:odd:text-[var(--color-gray-900)]"
          }
        >
          <div className="absolute top-0 left-0 w-[25%] scale-[-1] translate-y-[-100%]">
            <HeadSVG className="w-full scale-200 lg:scale-500" />
          </div>
          <ContentContainer className="flex flex-col items-center justify-center gap-4">
            <div className="relative w-full h-[50vh] lg:h-[60vh]">
              <Image
                src={image.image_url}
                alt={image.title || "Gallery Image"}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-[var(--color-gray-900)] dark:text-[var(--color-gray-100)]">
              <p>{image.title || ""}</p>
              <p>
                {`${
                  image.location_info.location
                    ? image.location_info.location + " - "
                    : ""
                }${
                  image.taken_at && dayjs(image.taken_at).format("YYYY-MM-DD")
                }`}
              </p>
              <div className="flex items-center justify-center align-middle gap-2">
                <Camera />
                {`${image.camera_make} - ${image.camera_model} - ${image.exif_summary}`}
              </div>
            </div>
          </ContentContainer>
        </div>
      ))}
    </div>
  );
};

export default GallerySection;
