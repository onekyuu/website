"use client";
import { FC } from "react";
import { useLocale } from "next-intl";
import { localeItems, usePathname, useRouter } from "@/i18n/navigations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LocaleSwitcher: FC = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
  };

  return (
    <div>
      <Select defaultValue={locale} value={locale} onValueChange={handleChange}>
        <SelectTrigger className="w-20 lg:w-24 px-2 py-1 lg:px-3 lg:py-2 cursor-pointer font-light text-xs lg:text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {localeItems.map((item) => {
            return (
              <SelectItem
                key={item.code}
                value={item.code}
                className="cursor-pointer font-light text-xs lg:text-sm"
              >
                {item.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocaleSwitcher;
