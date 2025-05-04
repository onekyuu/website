import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const SUPPORTED_LOCALES: string[] = ["zh", "en", "ja"];

const intlMiddleware = createMiddleware({
  locales: SUPPORTED_LOCALES,
  defaultLocale: "en",
  localeDetection: true,
});

function detectLocaleFromAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return "en";
  const language = acceptLanguage.split(",")[0].split("-")[0];
  return SUPPORTED_LOCALES.includes(language) ? language : "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language");
    const locale = detectLocaleFromAcceptLanguage(acceptLanguage);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(zh|en|ja)/:path*"],
};
