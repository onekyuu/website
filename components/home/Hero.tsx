"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import ContentContainer from "../ContentContainer";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { useRouter } from "@/i18n/navigations";
import { useScrollTo } from "@/hooks/useScrollTo";

const HeroSection = () => {
  const t = useTranslations();
  const router = useRouter();
  const { scrollToElement } = useScrollTo();

  return (
    <div className="w-full flex items-center justify-between relative z-0 h-screen">
      <div className="hero-bg absolute inset-0 z-[-1]"></div>
      <ContentContainer>
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between py-4 lg:py-12">
          <div className="flex flex-col font-bold text-4xl/11 md:text-5xl/17 lg:text-7xl/21 gap-4 mt-8 lg:mt-0 lg:w-1/2">
            <span className="text-(--color-gray-900)] dark:text-(--color-gray-50) text-center lg:text-start">
              {t("Home.greetingLineOne")}
            </span>
            <span className="hero-text-gradient bg-clip-text text-transparent text-center lg:text-start">
              {t("Home.greetingLineTwo")}
            </span>
            <span className="text-lg/6 lg:text-xl/7 mt-4 lg:mt-8 text-center lg:text-start font-light text-(--color-gray-600) dark:text-(--color-gray-300)">
              {t("Home.introduce")}
            </span>
            <div className="flex gap-8 mt-4 lg:mt-8 justify-center lg:justify-start">
              <Button
                className="h-12 px-3 py-2.5 md:h-14 md:px-5 md:py-3 md:text-lg md:font-normal lg:h-16 lg:text-xl lg:px-8 lg:py-5 rounded-xl md:rounded-2xl cursor-pointer"
                onClick={() => scrollToElement("contact-section")}
              >
                {t("Home.workWithMe")}
              </Button>
              <Button
                variant={"ghost"}
                className="h-12 px-3 py-5 md:h-14 md:px-5 md:py-3 md:text-lg md:font-normal lg:h-16 lg:text-xl lg:px-8 lg:py-5 rounded-xl md:rounded-2xl border-2 border-(--color-primary-700) cursor-pointer"
                onClick={() => router.push("/portfolio")}
              >
                {t("Home.myWork")}
              </Button>
            </div>
          </div>
          <div className="w-2/3 md:w-1/2 max-w-lg lg:w-1/2">
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
};

export default HeroSection;
