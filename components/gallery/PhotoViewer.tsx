"use client";

import React, { FC } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";

interface Photo {
  id: number;
  slug: string;
  img: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  exif?: string;
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
  const slides = photos.map((photo) => ({
    src: photo.img,
    alt: photo.title || photo.slug,
    title: photo.title,
    description: [photo.description, photo.exif].filter(Boolean).join(" • "),
  }));

  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Zoom, Fullscreen, Thumbnails, Captions]}
      zoom={{
        maxZoomPixelRatio: 3,
        zoomInMultiplier: 2,
        doubleTapDelay: 300,
        doubleClickDelay: 300,
        doubleClickMaxStops: 2,
        keyboardMoveDistance: 50,
        wheelZoomDistanceFactor: 100,
        pinchZoomDistanceFactor: 100,
      }}
      carousel={{
        finite: false,
        preload: 2,
      }}
      animation={{
        fade: 250,
        swipe: 500,
      }}
      controller={{
        closeOnBackdropClick: true,
        closeOnPullDown: true,
        closeOnPullUp: false,
      }}
    />
  );
};

export default PhotoViewer;
