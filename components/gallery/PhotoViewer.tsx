"use client";

import React, { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface Photo {
  id: number;
  slug: string;
  img: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  exif?: string;
  location?: string;
  camera?: string;
  lens?: string;
  settings?: string;
}

interface PhotoViewerProps {
  photos: Photo[];
  index: number;
  open: boolean;
  onClose: () => void;
}

const PhotoViewer: FC<PhotoViewerProps> = ({
  photos,
  index,
  open,
  onClose,
}) => {
  const [activeIndex, setActiveIndex] = useState(index);

  useEffect(() => {
    if (open) setActiveIndex(index);
  }, [index, open]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const header = document.querySelector<HTMLElement>("header");
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyOverflow = document.body.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyTop = document.body.style.top;
    const originalBodyWidth = document.body.style.width;
    const originalBodyLeft = document.body.style.left;
    const originalBodyRight = document.body.style.right;
    const originalBodyOverscrollBehavior =
      document.body.style.overscrollBehavior;
    const originalHeaderPosition = header?.style.position;
    const originalHeaderTop = header?.style.top;
    const originalHeaderLeft = header?.style.left;
    const originalHeaderRight = header?.style.right;
    const originalHeaderWidth = header?.style.width;
    const originalHeaderZIndex = header?.style.zIndex;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overscrollBehavior = "none";

    if (header) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.left = "0";
      header.style.right = "0";
      header.style.width = "100%";
      header.style.zIndex = "50";
    }

    const preventPageScroll = (event: Event) => {
      const viewer = document.querySelector("[data-photo-viewer]");
      const target = event.target;

      if (target instanceof Node && viewer?.contains(target)) return;
      event.preventDefault();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          photos.length ? (current - 1 + photos.length) % photos.length : 0
        );
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          photos.length ? (current + 1) % photos.length : 0
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", preventPageScroll, { passive: false });
    window.addEventListener("touchmove", preventPageScroll, { passive: false });

    return () => {
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.overflow = originalBodyOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.top = originalBodyTop;
      document.body.style.left = originalBodyLeft;
      document.body.style.right = originalBodyRight;
      document.body.style.width = originalBodyWidth;
      document.body.style.overscrollBehavior = originalBodyOverscrollBehavior;
      if (header) {
        header.style.position = originalHeaderPosition ?? "";
        header.style.top = originalHeaderTop ?? "";
        header.style.left = originalHeaderLeft ?? "";
        header.style.right = originalHeaderRight ?? "";
        header.style.width = originalHeaderWidth ?? "";
        header.style.zIndex = originalHeaderZIndex ?? "";
      }
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", preventPageScroll);
      window.removeEventListener("touchmove", preventPageScroll);
    };
  }, [onClose, open, photos.length]);

  const activePhoto = photos[activeIndex];
  const specs = useMemo(
    () => [
      ["Location", activePhoto?.location],
      ["Camera", activePhoto?.camera],
      ["Lens", activePhoto?.lens],
      ["Settings", activePhoto?.settings || activePhoto?.exif],
    ],
    [activePhoto]
  );

  if (!open || !activePhoto) return null;

  const label = activePhoto.title || activePhoto.slug;

  return (
    <div
      data-photo-viewer
      className="fixed inset-x-0 bottom-0 top-[var(--site-header-height)] z-40 grid overflow-auto overscroll-contain border-t border-site-ink bg-site-paper text-site-ink lg:grid-cols-[minmax(0,1.25fr)_minmax(22.5rem,0.75fr)]"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div
        data-photo-viewer-visual
        className="relative m-4 min-h-[48vh] overflow-hidden border border-site-line-strong bg-site-paper-2 lg:m-[clamp(1rem,3vw,2.125rem)] lg:min-h-0"
      >
        <Image
          src={activePhoto.img}
          alt={label}
          fill
          sizes="(max-width: 1024px) 100vw, 68vw"
          className="object-contain"
          priority
        />
        <div className="absolute left-[1.375rem] top-5 text-site-control uppercase tracking-[0.12em] text-site-ink">
          {label}
        </div>
        <span className="absolute inset-x-[1.375rem] bottom-[1.375rem] h-px bg-site-ink/20" />
      </div>

      <aside className="flex flex-col justify-between gap-9 border-t border-site-ink p-6 lg:border-l lg:border-t-0 lg:p-[clamp(1.5rem,4vw,3.25rem)]">
        <div className="flex items-center justify-between gap-4">
          <span className="text-site-control uppercase tracking-[0.14em] text-site-muted">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(photos.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="min-h-10 border border-site-ink bg-transparent px-3.5 text-site-nav text-site-ink transition-colors hover:bg-site-ink hover:text-site-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-ink"
          >
            Close
          </button>
        </div>

        <div>
          <div className="text-site-control uppercase tracking-[0.14em] text-site-muted">
            Photo detail
          </div>
          <h3 className="mt-3 text-[clamp(2.625rem,5vw,4.75rem)] leading-[0.95] tracking-[-0.04em]">
            {label}
          </h3>
          {activePhoto.description && (
            <p className="mt-[1.375rem] max-w-[32.5rem] leading-[1.62] text-site-ink-2">
              {activePhoto.description}
            </p>
          )}
        </div>

        <div>
          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) =>
                  (current - 1 + photos.length) % photos.length
                )
              }
              className="min-h-10 border border-site-ink bg-transparent px-3.5 text-site-nav text-site-ink transition-colors hover:bg-site-ink hover:text-site-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-ink"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current + 1) % photos.length)
              }
              className="min-h-10 border border-site-ink bg-transparent px-3.5 text-site-nav text-site-ink transition-colors hover:bg-site-ink hover:text-site-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-site-ink"
            >
              Next
            </button>
          </div>
          <div className="border-t border-site-ink">
            {specs.map(([key, value]) => (
              <div
                key={key}
                className={cn(
                  "grid gap-[1.125rem] border-b border-site-line py-4",
                  "sm:grid-cols-[8.125rem_1fr]"
                )}
              >
                <span className="text-site-control uppercase tracking-[0.12em] text-site-muted">
                  {key}
                </span>
                <span>{value || "-"}</span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default PhotoViewer;
