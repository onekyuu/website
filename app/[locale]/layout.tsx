import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { ReactNode } from "react";
import { routing } from "@/i18n/config";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import QueryProvider from "@/providers/QueryProvider";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

const nunito = localFont({
  src: "../fonts/nunito-latin-variable.woff2",
  variable: "--font-nunito",
  display: "swap",
  style: "normal",
  weight: "200 1000",
});

const localeFontClasses: Record<string, string> = {
  en: nunito.className,
  zh: "font-noto-sans-sc",
  ja: "font-noto-sans-jp",
};

export default async function LocaleLayout({ children, params }: Props) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <body className={localeFontClasses[locale]}>
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
