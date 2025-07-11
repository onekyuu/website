"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import Header from "../Header";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";

export default function Hero() {
  const t = useTranslations();
  return (
    <div className="w-full flex items-center justify-between relative z-0">
      <div className="hero-bg absolute inset-0 z-[-1] opacity-30"></div>
      <ContentContainer>
        <Header />
        <section className="flex flex-col md:flex-row items-center justify-between py-12">
          <div className="flex flex-col font-bold text-7xl/21 gap-4">
            <span className="text-[var(--color-gray-900)]">
              {t("Home.greetingLineOne")}
            </span>
            <span className="hero-text-gradient bg-clip-text text-transparent">
              {t("Home.greetingLineTwo")}
            </span>
          </div>
          <div className="w-2/3 md:w-1/2 max-w-lg">
            <DotLottiePlayer
              className="w-full"
              src="/animations/coding.lottie"
              loop
              autoplay
            />
          </div>
        </section>
      </ContentContainer>
    </div>
  );
}
