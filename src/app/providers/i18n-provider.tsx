"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/config/i18n";
import { usePathname } from "next/navigation";
import { supportedLngs } from "@/config/i18n";

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    const segments = pathname.split("/");
    const lng = segments[1];
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (supportedLngs.includes(lng as any)) {
      i18n.changeLanguage(lng);
    }
  }, [pathname]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};