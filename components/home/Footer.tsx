"use client";

import React, { FC } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigations";
import { HeaderMenu, SocialMediaMap } from "@/lib/constants";
import { Marquee } from "@/components/site";
import { Separator } from "@/components/ui/separator";

const FooterSection: FC = () => {
  const t = useTranslations("Home");
  const year = new Date().getFullYear();

  return (
    <div className="bg-site-paper text-site-ink">
      <footer className="border-t border-site-line bg-site-paper py-site-footer">
        <div className="mx-auto grid w-[var(--site-content-width)] gap-10 lg:grid-cols-[var(--site-footer-grid)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <div className="text-site-footer-brand font-extrabold leading-none text-site-ink">
              <span className="grid size-7 place-items-center border border-site-ink text-xs">
                九
              </span>
              <span className="mt-4 block">OneKyuu</span>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col gap-4">
            <div className="text-site-control uppercase tracking-site-label text-site-muted">
              Navigation
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {HeaderMenu.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="w-fit border-b border-transparent pb-0.5 text-site-footer-link leading-tight text-site-ink transition-colors hover:border-site-ink"
                >
                  {t(item.key)}
                </Link>
              ))}
            </div>
          </nav>

          <div className="flex flex-col gap-6">
            <div className="grid gap-6">
              <div className="flex flex-col gap-3">
                <div className="text-site-control uppercase tracking-site-label text-site-muted">
                  Socials
                </div>
                <div className="flex flex-wrap gap-3">
                  {SocialMediaMap.map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      aria-label={social.name}
                      className="grid size-9 place-items-center border border-site-line text-site-ink transition-colors hover:border-site-line-strong hover:bg-site-paper-2"
                    >
                      <social.icon data-icon="icon" className="size-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2 text-sm text-site-muted sm:flex-row sm:justify-between lg:flex-col">
              <span>Full-stack development, interface systems, writing, and photography.</span>
              <span>© {year}. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>

      <Marquee
        items={["OneKyuu", "Full-Stack Developer", "Photography", "Blog"]}
      />
    </div>
  );
};

export default FooterSection;
