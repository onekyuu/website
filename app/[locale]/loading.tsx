"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <DotLottiePlayer
        className="h-[10vh]"
        src="/animations/loading.lottie"
        loop
        autoplay
      />
    </div>
  );
}
