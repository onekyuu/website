"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Camera, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ContentContainer from "../ContentContainer";
import PhotoViewer from "../gallery/PhotoViewer";
import { GalleryPhoto } from "@/types/gallery";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface GalleryParallaxSectionProps {
  galleryList: GalleryPhoto[];
  isLoading: boolean;
  isError?: boolean;
  error?: Error | null;
}

const CARD_COLORS = [
  "bg-[#d9c7bb] text-[#1e1714]",
  "bg-[#b9c9c2] text-[#12201d]",
  "bg-[#d0d5e8] text-[#141827]",
  "bg-[#d7c7a5] text-[#211b10]",
  "bg-[#c9b8c5] text-[#221821]",
];

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

const GalleryParallaxSection: FC<GalleryParallaxSectionProps> = ({
  galleryList,
  isLoading,
}) => {
  const t = useTranslations("Home");
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const photos = useMemo(
    () =>
      galleryList.map((photo) => ({
        id: photo.id,
        slug: photo.slug,
        img: photo.image_url,
        title: photo.title,
        description: photo.description,
        exif: photo.exif_summary,
        thumbnail: photo.thumbnail_url,
      })),
    [galleryList]
  );

  useEffect(() => {
    if (prefersReducedMotion || galleryList.length === 0) return;

    const context = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

      if (cards.length && containerRef.current) {
        gsap.fromTo(
          cards,
          { scale: 1 },
          {
            scale: (index) =>
              Math.max(0.78, 1 - (galleryList.length - index) * 0.045),
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      imageRefs.current.forEach((image, index) => {
        const shell = shellRefs.current[index];

        if (!image || !shell) return;

        gsap.fromTo(
          image,
          { scale: 1.55 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      context.revert();
    };
  }, [galleryList.length, prefersReducedMotion]);

  const handlePhotoClick = (photoId: number) => {
    const index = photos.findIndex((photo) => photo.id === photoId);
    setCurrentPhotoIndex(Math.max(index, 0));
    setViewerOpen(true);
  };

  if (isLoading) {
    return (
      <section className="min-h-screen py-24">
        <ContentContainer>
          <div className="h-10 w-48 rounded bg-[var(--color-gray-200)] dark:bg-[var(--color-gray-800)] animate-pulse" />
          <div className="mt-12 h-[68vh] rounded-lg bg-[var(--color-gray-200)] dark:bg-[var(--color-gray-900)] animate-pulse" />
        </ContentContainer>
      </section>
    );
  }

  if (galleryList.length === 0) return null;

  return (
    <>
      <section
        ref={containerRef}
        className="relative min-h-screen py-16 md:py-24"
      >
        <ContentContainer className="mb-8 md:mb-14">
          <div className="text-3xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)] md:text-4xl lg:text-5xl">
            {t("gallery")}
          </div>
        </ContentContainer>

        {galleryList.map((photo, index) => {
          const location = photo.location_info.location;
          const takenDate = photo.taken_at
            ? dayjs(photo.taken_at).format("YYYY-MM-DD")
            : "";

          return (
            <div
              key={photo.id}
              ref={(node) => {
                shellRefs.current[index] = node;
              }}
              className="sticky top-0 flex min-h-screen w-full items-center justify-center px-4 py-10 md:py-12"
            >
              <article
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                className={cn(
                  "relative top-0 grid w-full max-w-6xl transform-gpu overflow-hidden rounded-lg shadow-2xl will-change-transform [backface-visibility:hidden] md:grid-cols-[0.9fr_1.25fr]",
                  "min-h-[72vh]",
                  CARD_COLORS[index % CARD_COLORS.length]
                )}
                style={{
                  top: `calc(-5vh + ${index * 22}px)`,
                }}
              >
                <div className="flex flex-col justify-between gap-8 p-6 md:p-10 lg:p-12">
                  <div className="space-y-4">
                    <div className="text-sm font-semibold uppercase tracking-[0.22em] opacity-60">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(galleryList.length).padStart(2, "0")}
                    </div>
                    <h3 className="text-3xl font-bold leading-tight md:text-5xl">
                      {photo.title || photo.slug}
                    </h3>
                    {photo.description && (
                      <p className="max-w-md text-sm leading-7 opacity-75 md:text-base">
                        {photo.description}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 text-sm md:text-base">
                    {(location || takenDate) && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 flex-none" />
                        <span>
                          {[location, takenDate].filter(Boolean).join(" - ")}
                        </span>
                      </div>
                    )}
                    {(photo.camera_make ||
                      photo.camera_model ||
                      photo.exif_summary) && (
                      <div className="flex items-start gap-2">
                        <Camera className="mt-0.5 h-4 w-4 flex-none" />
                        <span>
                          {[
                            photo.camera_make,
                            photo.camera_model,
                            photo.exif_summary,
                          ]
                            .filter(Boolean)
                            .join(" - ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="group relative min-h-[42vh] overflow-hidden bg-black text-left md:min-h-full"
                  onClick={() => handlePhotoClick(photo.id)}
                  aria-label={photo.title || "Open gallery photo"}
                >
                  <div
                    ref={(node) => {
                      imageRefs.current[index] = node;
                    }}
                    className={cn(
                      "absolute inset-0 transform-gpu will-change-transform [backface-visibility:hidden]",
                      prefersReducedMotion && "scale-100"
                    )}
                  >
                    <Image
                      src={photo.image_url}
                      alt={photo.title || "Gallery image"}
                      fill
                      priority={index < 4}
                      decoding="async"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 58vw, 680px"
                    />
                  </div>
                </button>
              </article>
            </div>
          );
        })}
      </section>

      <PhotoViewer
        photos={photos}
        index={currentPhotoIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
};

export default GalleryParallaxSection;
