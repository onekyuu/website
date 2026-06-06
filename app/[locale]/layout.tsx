import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ReactNode } from "react";
import { routing } from "@/i18n/config";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import QueryProvider from "@/providers/QueryProvider";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const fonts: { [K: string]: string } = {
    en: nunito.className,
    zh: nunito.className,
    ja: nunito.className,
  };

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={cn(fonts[locale])}>
        <SmoothScroll />
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <NextIntlClientProvider>
              <PageTransition>
                <Header />
                {children}
              </PageTransition>
            </NextIntlClientProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
