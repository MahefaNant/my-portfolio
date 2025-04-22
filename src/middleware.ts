import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLngs, defaultLocale } from "@/config/i18n";

type SupportedLocale = "fr" | "en";

function isSupportedLocale(locale: string): locale is SupportedLocale {
  return supportedLngs.includes(locale as SupportedLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclure les fichiers statiques et le sitemap
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    /\.(png|jpg|jpeg|webp|json|ico|svg|woff2?|xml|txt)$/i.test(pathname) ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/favicon.ico" ||
    pathname === "/googled80e1742b77bf486.html"
  ) {
    return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|assets|images|robots.txt|sitemap.xml|favicon.ico|googled80e1742b77bf486.html).*)",
  ],
};