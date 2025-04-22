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

  if (pathname === "/en/sitemap.xml") {
    url.pathname = "/sitemap.xml";
    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Type", "application/xml");
    response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    return response;
  }

  const isStaticPath = STATIC_PATHS.includes(pathname);
  const isStaticExtension = STATIC_EXTENSIONS.some(ext => pathname.endsWith(ext));
  const isStaticFile = isStaticPath || isStaticExtension;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    isStaticFile
  ) {
    const response = NextResponse.next();
    if (isStaticFile) {
      response.headers.set("Cache-Control", "public, max-age=31536000, immutable");
    }
    return response;
  }

  const pathLocale = pathname.split("/")[1];
  
  if (!isSupportedLocale(pathLocale)) {
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|images|fonts|locales).*)",
  ],
};