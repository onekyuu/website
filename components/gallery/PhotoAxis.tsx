"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { GalleryPhoto } from "@/types/gallery";

type PhotoAxisProps = {
  photos: GalleryPhoto[];
  onPhotoClick: (photo: GalleryPhoto, index: number, originRect: DOMRect) => void;
};

export function PhotoAxis({ photos, onPhotoClick }: PhotoAxisProps) {
  const t = useTranslations("Gallery");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const entryRefs = React.useRef<(HTMLElement | null)[]>([]);

  React.useEffect(() => {
    const updateActive = () => {
      const center = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      entryRefs.current.forEach((ref, index) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const distance = Math.abs(mid - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, []);

  return (
    <section className="photo-axis">
      <ul className="axis-list">
        {photos.map((photo, index) => {
          const isLeft = index % 2 === 0;
          const isActive = activeIndex === index;
          const label =
            photo.title ||
            photo.location_info?.location ||
            photo.slug;
          const year = photo.taken_at
            ? new Date(photo.taken_at).getFullYear().toString()
            : "";
          const aspectRatio = "1 / 1";
          const titleX = isLeft ? "6px" : "-6px";

          return (
            <li
              key={photo.slug}
              ref={(el) => {
                entryRefs.current[index] = el;
              }}
              className={`axis-entry ${isLeft ? "is-left" : "is-right"}`}
              data-state={isActive ? "active" : undefined}
              style={
                {
                  "--axis-title-x": isActive ? titleX : "0",
                } as React.CSSProperties
              }
            >
              <div
                className="axis-photo-wrap"
                style={{ "--axis-width": "32.5rem" } as React.CSSProperties}
              >
                <button
                  type="button"
                  className="axis-photo"
                  style={
                    { "--axis-ratio": aspectRatio } as React.CSSProperties
                  }
                  onClick={(e) => onPhotoClick(photo, index, (e.currentTarget as HTMLButtonElement).getBoundingClientRect())}
                  aria-label={label}
                >
                  <Image
                    src={photo.image_url}
                    alt={label}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </button>
              </div>

              <div className="axis-copy">
                {year && <span className="axis-year">{year}</span>}
                <h2>{label}</h2>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
