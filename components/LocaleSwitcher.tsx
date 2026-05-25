"use client";

import { FC } from "react";
import { useLocale } from "next-intl";

import { Button } from "@/components/ui/button";
import { localeItems, usePathname, useRouter } from "@/i18n/navigations";
import { cn } from "@/lib/utils";

const localeLabels: Record<string, string> = {
  zh: "中",
  en: "EN",
  ja: "日",
};

const LocaleSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
  };

  return (
    <div
      className="flex items-center gap-1 border border-site-line bg-site-paper p-[var(--site-lang-switch-padding)]"
      aria-label="Language"
    >
      {localeItems.map((item) => {
        const isActive = locale === item.code;

        return (
          <Button
            key={item.code}
            type="button"
            variant="ghost"
            onClick={() => handleChange(item.code)}
            aria-pressed={isActive}
            className={cn(
              "h-auto rounded-none px-2.5 py-1.5 [font-size:var(--site-control-font-size)] uppercase tracking-normal text-site-muted hover:bg-site-paper-2 hover:text-site-ink",
              isActive && "bg-site-ink text-site-paper hover:bg-site-ink hover:text-site-paper"
            )}
          >
            {localeLabels[item.code] ?? item.code.toUpperCase()}
          </Button>
        );
      })}
    </div>
  );
};

export default LocaleSwitcher;
