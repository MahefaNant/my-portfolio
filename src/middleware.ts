import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { supportedLngs, defaultLocale } from "@/config/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || 
    pathname.includes("/api/") ||
    /\.(png|jpg|json)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathLocale = pathname.split("/")[1];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (supportedLngs.includes(pathLocale as any)) {
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};