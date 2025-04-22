import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLngs, defaultLocale } from "@/config/i18n";

type SupportedLocale = "fr" | "en";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLngs.includes(locale as SupportedLocale);
}

const staticExtensions = [".png", ".jpg", ".jpeg", ".webp", ".json", ".ico", ".svg", ".woff", ".woff2"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isStaticFile = staticExtensions.some((ext) => pathname.endsWith(ext));

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    isStaticFile ||
    ["/robots.txt", "/sitemap.xml", "/favicon.ico", "/googled80e1742b77bf486.html"]
      .includes(pathname)
  ) {
    return NextResponse.next();
  }

  if (pathname === "/sitemap.xml" || pathname === "/en/sitemap.xml") {
    const url = request.nextUrl.clone();
    url.pathname = "/sitemap.xml";
    return NextResponse.rewrite(url);
  }

  const pathLocale = pathname.split("/")[1];

  if (!isSupportedLocale(pathLocale)) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|fonts|locales).*)",
  ],
};