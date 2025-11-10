"use client";
import ContentContainer from "@/components/ContentContainer";
import Masonry from "@/components/gallery/Masonry";
import PageLayout from "@/components/PageLayout";
import { useTranslations } from "next-intl";
import React, { FC } from "react";

const GalleryPage: FC = () => {
  const t = useTranslations("Gallery");

  const items = [
    {
      id: "1",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "2",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "3",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "4",
      img: "https://picsum.photos/id/1025/600/900?grayscale",
      url: "https://example.com/four",
      height: 500,
    },
    {
      id: "5",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/five",
      height: 300,
    },
    {
      id: "6",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "7",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "8",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "9",
      img: "https://picsum.photos/id/1025/600/900?grayscale",
      url: "https://example.com/four",
      height: 500,
    },
    {
      id: "10",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/five",
      height: 300,
    },
    {
      id: "11",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/one",
      height: 400,
    },
    {
      id: "12",
      img: "https://picsum.photos/id/1011/600/750?grayscale",
      url: "https://example.com/two",
      height: 250,
    },
    {
      id: "13",
      img: "https://picsum.photos/id/1020/600/800?grayscale",
      url: "https://example.com/three",
      height: 600,
    },
    {
      id: "14",
      img: "https://picsum.photos/id/1025/600/900?grayscale",
      url: "https://example.com/four",
      height: 500,
    },
    {
      id: "15",
      img: "https://picsum.photos/id/1015/600/900?grayscale",
      url: "https://example.com/five",
      height: 300,
    },
  ];

  const latestPhotoNode = (
    <div className="text-2xl font-semibold text-center">{t("latestPhoto")}</div>
  );

  return (
    <PageLayout
      heroContent={{
        title: t("title"),
        subtitle: { start: t("subtitleStart"), end: t("subtitleEnd") },
      }}
      latestContent={{
        title: t("latestPhoto"),
        content: latestPhotoNode,
      }}
    >
      <ContentContainer className="py-4 ">
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />
      </ContentContainer>
    </PageLayout>
  );
};

export default GalleryPage;
