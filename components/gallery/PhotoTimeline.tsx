"use client";

import React, { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GalleryTimelineResponse } from "@/types/gallery";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import ContentContainer from "../ContentContainer";
import PhotoViewer from "./PhotoViewer";

interface Photo {
  id: number;
  slug: string;
  img: string;
  url: string;
  height: number;
  year: number;
  date: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  exif?: string;
  cameraInfo?: string;
}

interface YearGroup {
  year: string;
  photos: Photo[];
}

interface PhotoTimelineProps {
  data?: GalleryTimelineResponse;
  className?: string;
  showStats?: boolean;
}

const PhotoTimeline: FC<PhotoTimelineProps> = ({
  data,
  className,
  showStats = true,
}) => {
  const [groupedPhotos, setGroupedPhotos] = useState<YearGroup[]>([]);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    if (!data?.timeline) {
      setGroupedPhotos([]);
      return;
    }

    const groups: YearGroup[] = Object.entries(data.timeline)
      .map(([yearStr, yearData]) => {
        const convertedPhotos: Photo[] = yearData.photos.map((photo) => ({
          id: photo.id,
          slug: photo.slug,
          img: photo.image_url,
          url: `/gallery/${photo.slug}`,
          height: photo.photo_properties.height,
          year: Number(yearData.year),
          date: photo.taken_at,
          title: photo.title,
          description: photo.description,
          thumbnail: photo.thumbnail_url,
          exif: photo.exif_summary,
          cameraInfo:
            photo.camera_make && photo.camera_model
              ? `${photo.camera_make} ${photo.camera_model}`
              : undefined,
        }));

        return {
          year: yearData.year,
          photos: convertedPhotos,
        };
      })
      .sort((a, b) => Number(b.year) - Number(a.year));

    groups.forEach((group) => {
      group.photos.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });

    setGroupedPhotos(groups);
  }, [data]);

  const allPhotos = groupedPhotos.flatMap((group) => group.photos);

  const handlePhotoClick = (photo: Photo) => {
    const index = allPhotos.findIndex((p) => p.id === photo.id);
    setCurrentPhotoIndex(index);
    setViewerOpen(true);
  };

  if (!data || groupedPhotos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-[var(--color-gray-500)] dark:text-[var(--color-gray-400)]">
          No photos found
        </p>
      </div>
    );
  }

  return (
    <>
      <ContentContainer className={cn("py-8", className)}>
        {showStats && (
          <div className="mb-12 md:mb-16 flex flex-col md:flex-row flex-wrap gap-4 justify-center">
            <div className="px-6 py-4 rounded-2xl bg-[var(--color-gray-100)] dark:bg-[var(--color-gray-900)] border border-[var(--color-gray-200)] dark:border-[var(--color-gray-800)]">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-400)]">
                {data.total_photos}
              </div>
              <div className="text-sm md:text-base text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)] mt-1">
                Total Photos
              </div>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-[var(--color-gray-100)] dark:bg-[var(--color-gray-900)] border border-[var(--color-gray-200)] dark:border-[var(--color-gray-800)]">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-400)]">
                {data.total_years}
              </div>
              <div className="text-sm md:text-base text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)] mt-1">
                Years
              </div>
            </div>
            <div className="px-6 py-4 rounded-2xl bg-[var(--color-gray-100)] dark:bg-[var(--color-gray-900)] border border-[var(--color-gray-200)] dark:border-[var(--color-gray-800)]">
              <div className="text-3xl md:text-4xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-400)]">
                {groupedPhotos[0]?.year || new Date().getFullYear()}
              </div>
              <div className="text-sm md:text-base text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)] mt-1">
                Latest Year
              </div>
            </div>
          </div>
        )}

        {groupedPhotos.map((group) => (
          <div key={group.year} className="space-y-8 md:space-y-12">
            <div className="grid grid-cols-[20px_1fr] gap-4">
              <div className="flex flex-col items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-[var(--color-primary-900)] border-4 border-white dark:border-[var(--color-gray-950)] flex-shrink-0" />
                <div className="w-4 flex flex-1 min-h-8 items-center justify-center">
                  <div className="w-0.5 h-full bg-gradient-to-b from-[var(--color-primary-900)] to-[var(--color-primary-300)]" />
                </div>
              </div>
              <div className="pb-12">
                <div className="md:px-6 mb-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-primary-900)] dark:text-[var(--color-primary-50)]">
                    {group.year}
                  </h2>
                  <p className="text-sm md:text-base text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)] mt-1">
                    {group.photos.length}{" "}
                    {group.photos.length === 1 ? "photo" : "photos"}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:ml-8">
                  {group.photos.map((photo) => (
                    <Card
                      key={photo.slug}
                      className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                      onClick={() => handlePhotoClick(photo)}
                    >
                      <CardHeader className="p-0">
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={photo.thumbnail || photo.img}
                            alt={photo.title || photo.slug}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          />
                        </div>
                      </CardHeader>

                      {(photo.title || photo.exif) && (
                        <CardContent className="p-3 space-y-1">
                          {photo.title && (
                            <p className="font-medium text-sm truncate text-[var(--color-primary-900)] ">
                              {photo.title}
                            </p>
                          )}
                          {photo.exif && (
                            <p className="text-xs text-[var(--color-gray-600)] dark:text-[var(--color-gray-400)] truncate">
                              {photo.exif}
                            </p>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </ContentContainer>

      <PhotoViewer
        photos={allPhotos}
        index={currentPhotoIndex}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
      />
    </>
  );
};

export default PhotoTimeline;
