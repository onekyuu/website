"use client";

import { useLocale, useTranslations } from "next-intl";

import { SiteButton } from "@/components/site";
import { useScrollTo } from "@/hooks/useScrollTo";
import { Link } from "@/i18n/navigations";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const { scrollToElement } = useScrollTo();

  return (
    <section
      id="home"
      className="grid min-h-screen items-center border-b border-site-line bg-site-paper py-site-section text-site-ink scroll-mt-site-header"
    >
      <div className="mx-auto grid w-[var(--site-content-width)] gap-12 lg:grid-cols-[var(--site-home-hero-grid)] lg:items-end lg:gap-[4.5rem]">
        <div>
          <div className="mb-[1.375rem] flex items-center gap-3 text-site-control uppercase tracking-site-label text-site-muted before:h-px before:w-11 before:bg-site-muted">
            Homepage concept / 01
          </div>
          <h1
            className={cn(
              "max-w-[var(--site-hero-title-max)] text-site-ink [font-weight:var(--site-hero-title-weight)] [letter-spacing:var(--site-hero-title-tracking)] [line-height:var(--site-hero-title-leading)]",
              locale === "en" && "max-w-[var(--site-hero-title-max-en)]"
            )}
          >
            <span
              className={cn(
                "block whitespace-nowrap text-[length:var(--site-hero-intro-font-size)] leading-none",
                locale === "ja" && "text-[length:var(--site-hero-intro-font-size-ja)]"
              )}
            >
              {t("greetingLineOne")}
            </span>
            <span
              className={cn(
                "block text-[length:var(--site-hero-role-font-size)] leading-[0.94] text-transparent [-webkit-text-stroke:1.2px_var(--site-ink)]",
                locale === "ja" &&
                  "text-[length:var(--site-hero-role-font-size-ja)] leading-[var(--site-hero-role-leading-ja)]"
              )}
            >
              {t("greetingLineTwo")}
            </span>
          </h1>
          <p className="mt-[2.125rem] max-w-[38.125rem] text-[length:var(--site-hero-copy-font-size)] leading-[1.58] text-site-ink-2">
            {t("introduce")}
          </p>
          <div className="mt-[2.625rem] flex flex-wrap gap-3.5">
            <SiteButton onClick={() => scrollToElement("contact-section")}>
              {t("workWithMe")}
            </SiteButton>
            <SiteButton variant="outline" asChild>
              <Link href="#works">{t("myWork")}</Link>
            </SiteButton>
          </div>
        </div>

        <div className="border-y border-site-ink">
          <div>
            {[
              ["Focus", t("focus")],
              ["Now", t("now")],
              ["Also", t("also")],
            ].map(([label, value], index, rows) => (
              <div
                key={label}
                className={cn(
                  "grid grid-cols-[6.125rem_minmax(0,1fr)] gap-[1.375rem] py-5",
                  index < rows.length - 1 && "border-b border-site-line"
                )}
              >
                <div className="text-site-control uppercase tracking-site-label text-site-muted">
                  {label}
                </div>
                <div className="text-base leading-[1.45] text-site-ink">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-[2.375rem] flex items-center gap-3 text-[0.8125rem] leading-normal text-site-muted">
            <span
              aria-hidden="true"
              className="grid h-14 w-9 place-items-start justify-center border border-site-ink pt-2 before:block before:h-2.5 before:w-[3px] before:animate-[scroll-dot_1.5s_ease-in-out_infinite] before:bg-site-ink"
            />
            <p className="m-0">{t("scrollHint")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
