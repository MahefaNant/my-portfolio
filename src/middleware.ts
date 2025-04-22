import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLngs, defaultLocale } from "@/config/i18n";

type SupportedLocale = "fr" | "en";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLngs.includes(locale as SupportedLocale);
}

const STATIC_PATHS = [
  "/sitemap.xml",
  "/robots.txt",
  "/favicon.ico",
  "/googled80e1742b77bf486.html"
];

const STATIC_EXTENSIONS = [
  ".png", ".jpg", ".jpeg", ".webp", 
  ".json", ".ico", ".svg", ".woff", ".woff2"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  const isStaticPath = STATIC_PATHS.includes(pathname);
  const isStaticExtension = STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext));
  const isStaticFile = isStaticPath || isStaticExtension;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    isStaticFile
  ) {
    if (pathname === "/en/sitemap.xml") {
      url.pathname = "/sitemap.xml";
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  const pathLocale = pathname.split("/")[1];
  if (!isSupportedLocale(pathLocale)) {
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|fonts|locales).*)",
  ],
};