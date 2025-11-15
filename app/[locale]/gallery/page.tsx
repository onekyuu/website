"use client";
import ContentContainer from "@/components/ContentContainer";
import PhotoTimeline from "@/components/gallery/PhotoTimeline";
import PageLayout from "@/components/PageLayout";
import { useGalleryTimeline } from "@/hooks/useGallery";
import { useTranslations } from "next-intl";
import React, { FC } from "react";

const GalleryPage: FC = () => {
  const t = useTranslations("Gallery");
  const { data } = useGalleryTimeline();

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
    >
      <ContentContainer className="py-4 ">
        <PhotoTimeline data={data} />
      </ContentContainer>
    </PageLayout>
  );
};

export default GalleryPage;
