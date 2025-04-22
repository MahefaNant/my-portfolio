"use client";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Languages, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GB, FR } from "country-flag-icons/react/3x2";
import { usePathname, useRouter } from "next/navigation";
import { supportedLngs } from "@/config/i18n";


export function LanguageButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { t,i18n } = useTranslation("common");
  
  const languages = [
    { code: "en", label: t("en"), Flag: GB },
    { code: "fr", label: t("fr"), Flag: FR },
  ] as const;

  type Language = typeof languages[number]["code"];

  const currentLang = i18n.language as Language;

  const handleChangeLanguage = (lang: Language) => {
    i18n.changeLanguage(lang);
    
    const segments = pathname.split("/");
    if (supportedLngs.includes(segments[1] as Language)) {
      segments[1] = lang;
    } else {
      segments.splice(1, 0, lang);
    }
    router.push(segments.join("/"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-muted transition-colors"
        >
          <Languages size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-40 z-50 max-w-[calc(100vw-20px)]">
        {languages.map(({ code, label, Flag }) => (
          <DropdownMenuItem
            key={code}
            onClick={() => handleChangeLanguage(code)}
            className="flex justify-between items-center"
            disabled={currentLang === code}
          >
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-auto rounded-sm" />
              <span>{label}</span>
            </div>
            {currentLang === code && <Check size={16} className="text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
