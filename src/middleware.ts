import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLngs, defaultLocale } from "@/config/i18n";

type SupportedLocale = "fr" | "en";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLngs.includes(locale as SupportedLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/sitemap.xml") {
    return NextResponse.next();
  }

  const STATIC_PATHS = [
    "/robots.txt",
    "/favicon.ico", 
    "/googled80e1742b77bf486.html"
  ];

  const STATIC_EXTENSIONS = [
    ".png", ".jpg", ".jpeg", ".webp",
    ".json", ".ico", ".svg", ".woff", ".woff2"
  ];

  const isStaticPath = STATIC_PATHS.includes(pathname);
  const isStaticExtension = STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext));
  const isStaticFile = isStaticPath || isStaticExtension;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    isStaticFile
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  const pathLocale = pathname.split("/")[1];
  
  if (!isSupportedLocale(pathLocale)) {
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|fonts|locales|sitemap.xml).*)",
  ],
};