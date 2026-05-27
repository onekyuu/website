"use client";

import { ArrowRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useMemo, useState } from "react";

import { PhotoAxis } from "@/components/gallery/PhotoAxis";
import { PhotoViewer } from "@/components/gallery/PhotoViewer";
import { PageHero } from "@/components/layout/PageHero";
import { SiteButton } from "@/components/site/SiteButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGalleryTimeline } from "@/hooks/useGallery";
import { Link } from "@/i18n/navigations";
import { GalleryPhoto } from "@/types/gallery";

export default function GalleryPage() {
  const t = useTranslations("Gallery");
  const { data, isLoading } = useGalleryTimeline();

  const [viewerOpen, setViewerOpen] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const photos = useMemo<GalleryPhoto[]>(() => {
    if (!data?.timeline) return [];
    return Object.values(data.timeline)
      .sort((a, b) => Number(b.year) - Number(a.year))
      .flatMap((yearData) =>
        [...yearData.photos].sort(
          (a, b) =>
            new Date(b.taken_at).getTime() - new Date(a.taken_at).getTime()
        )
      );
  }, [data]);

  const [clickRect, setClickRect] = useState<DOMRect | null>(null);

  const handlePhotoClick = (photo: GalleryPhoto, index: number, rect: DOMRect) => {
    setClickRect(rect);
    setActivePhotoIndex(index);
    setViewerOpen(true);
  };

  return (
    <main className="bg-site-paper text-site-ink">
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        aside={
          <div className="flex flex-col gap-6">
            <p className="text-[length:var(--site-section-copy-font-size)] leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-wrap gap-3">
              <SiteButton asChild variant="outline" className="self-start">
                <Link href="/">
                  {t("backHome")}
                  <ArrowRightIcon data-icon="inline-end" />
                </Link>
              </SiteButton>
            </div>
          </div>
        }
      />

      <div id="axis-start" className="border-t border-site-line">
        {isLoading ? (
          <div className="mx-auto w-[var(--site-content-width)] py-24">
            <div className="grid gap-20">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-[420px] rounded-none" />
              ))}
            </div>
          </div>
        ) : photos.length === 0 ? (
          <p className="py-20 text-center text-site-muted">{t("noPhotos")}</p>
        ) : (
          <PhotoAxis photos={photos} onPhotoClick={handlePhotoClick} />
        )}
      </div>

      <PhotoViewer
        photos={photos.map((p) => ({
          id: p.id,
          slug: p.slug,
          img: p.image_url,
          thumbnail: p.thumbnail_url,
          title: p.title,
          description: p.description,
          exif: p.exif_summary,
          location: p.location_info?.location,
          camera:
            p.camera_make && p.camera_model
              ? `${p.camera_make} ${p.camera_model}`
              : undefined,
          lens: p.lens_model,
          settings: [
            p.shooting_params?.shutter_speed,
            p.shooting_params?.aperture,
            p.shooting_params?.iso ? `ISO ${p.shooting_params.iso}` : undefined,
          ]
            .filter(Boolean)
            .join(" · "),
        }))}
        index={activePhotoIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </main>
  );
}
