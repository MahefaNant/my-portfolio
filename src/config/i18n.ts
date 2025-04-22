// config/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";

export const supportedLngs = ["en", "fr"] as const;
export type Language = typeof supportedLngs[number];
export const defaultLocale: Language = "en";

// Typage des namespaces
i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLocale,
    supportedLngs,
    preload: [...supportedLngs],
    ns: ["navigation", "common", "hero", "skills", "timeline", "projects", "education", "contact"],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    }
  });

export default i18n;