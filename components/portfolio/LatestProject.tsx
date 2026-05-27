import * as React from "react";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

import { Eyebrow } from "@/components/layout/Eyebrow";
import { SiteButton } from "@/components/site/SiteButton";
import { Link } from "@/i18n/navigations";

type LatestProjectProps = {
  kicker: string;
  title: string;
  description: string;
  image?: string;
  openLabel: string;
  openHref: string;
};

export function LatestProject({
  kicker,
  title,
  description,
  image,
  openLabel,
  openHref,
}: LatestProjectProps) {
  return (
    <div className="mt-10 grid gap-4 lg:grid-cols-[var(--site-portfolio-latest-grid)]">
      <div className="flex min-h-site-latest-copy flex-col justify-between border border-site-ink p-7">
        <div>
          <Eyebrow withLine={false}>{kicker}</Eyebrow>
          <h3 className="mt-5 text-[length:var(--site-section-title-font-size)] font-bold leading-[0.92] tracking-[var(--site-section-title-tracking)]">
            {title}
          </h3>
          <p className="mt-6 text-base leading-relaxed text-site-ink-2">{description}</p>
        </div>
        <div className="mt-8">
          <SiteButton asChild variant="default">
            <Link href={openHref}>
              {openLabel}
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
          </SiteButton>
        </div>
      </div>
      <div className="relative min-h-site-latest-visual overflow-hidden border border-site-line-strong bg-site-paper-2">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
        ) : null}
      </div>
    </div>
  );
}
