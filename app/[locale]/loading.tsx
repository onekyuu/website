"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { useEffect, useState } from "react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <DotLottiePlayer
        className="h-24 md:h-36 lg:h-48"
        src="/animations/loading.lottie"
        loop
        autoplay
      />
    </div>
  );
}
