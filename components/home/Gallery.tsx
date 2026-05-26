"use client";

import React, { FC, useState } from "react";
import { useTranslations } from "next-intl";

import PhotoViewer from "@/components/gallery/PhotoViewer";
import { SectionShell, SplitHeader } from "@/components/layout";
import { PhotoFrame } from "@/components/site";
import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";
import { GalleryPhoto } from "@/types/gallery";

interface GallerySectionProps {
  galleryList: GalleryPhoto[];
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
}

const GallerySection: FC<GallerySectionProps> = ({
  galleryList,
  isLoading,
}) => {
  const t = useTranslations("Home");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const previewPhotos =
    galleryList.length > 0
      ? Array.from({ length: 3 }, (_, index) => galleryList[index % galleryList.length])
      : [];
  const allPhotos = galleryList.map((photo) => ({
    id: photo.id,
    slug: photo.slug,
    img: photo.image_url,
    title: photo.title,
    description: photo.description,
    exif: photo.exif_summary,
    thumbnail: photo.thumbnail_url,
    location: photo.location_info?.location,
    camera:
      photo.camera_make && photo.camera_model
        ? `${photo.camera_make} ${photo.camera_model}`
        : undefined,
    lens: photo.lens_model,
    settings: [
      photo.shooting_params?.shutter_speed,
      photo.shooting_params?.aperture,
      photo.shooting_params?.iso ? `ISO ${photo.shooting_params.iso}` : undefined,
    ]
      .filter(Boolean)
      .join(" / "),
  }));

  const handlePhotoClick = (photoId: number) => {
    const index = allPhotos.findIndex((photo) => photo.id === photoId);
    setCurrentPhotoIndex(Math.max(0, index));
    setViewerOpen(true);
  };

  return (
    <SectionShell id="gallery">
      <SplitHeader
        eyebrow="Gallery / 05"
        title={t("galleryTitle")}
        className="mb-[3.625rem] lg:gap-[4.5rem]"
      />

      {isLoading ? (
        <div className="min-h-[var(--site-gallery-preview-height)] border border-site-line bg-site-paper-2" />
      ) : previewPhotos.length > 0 ? (
        <div
          data-home-gallery-strip
          className="-mt-7 grid gap-4 overflow-hidden pt-7 lg:-mt-[3.25rem] lg:h-[var(--site-gallery-preview-height)] lg:grid-cols-[var(--site-home-gallery-grid)] lg:grid-rows-2 lg:pt-[3.25rem]"
        >
          {previewPhotos.map((photo, index) => (
            <PhotoFrame
              key={`${photo.id}-${index}`}
              src={photo.image_url}
              alt={photo.title || "Gallery photo"}
              ratio={16 / 10}
              fillFrame
              onClick={() => handlePhotoClick(photo.id)}
              className={cn(
                "relative h-80 cursor-pointer transition-colors duration-150 hover:translate-y-0 hover:border-site-ink focus-visible:translate-y-0",
                index === 0
                  ? "lg:row-span-2 lg:h-full"
                  : "lg:h-full"
              )}
              imageClassName="object-cover duration-200 ease-out group-hover:scale-[1.025]"
            >
              <span className="absolute inset-x-[1.125rem] bottom-[1.125rem] h-px bg-site-ink/20" />
            </PhotoFrame>
          ))}
        </div>
      ) : (
        <div className="border-y border-site-line-strong py-12 text-site-muted">
          {t("gallery")}
        </div>
      )}

      {!isLoading && previewPhotos.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6 leading-[1.5] text-site-muted">
          <span>{t("galleryMeta")}</span>
          <Link
            href="/gallery"
            className="border-b border-site-ink text-site-ink transition-colors hover:text-site-ink-2"
          >
            {t("openGallery")}
          </Link>
        </div>
      )}

      <PhotoViewer
        photos={allPhotos}
        index={currentPhotoIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </SectionShell>
  );
};

export default GallerySection;
