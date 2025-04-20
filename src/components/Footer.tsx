"use client";
import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { myInfos } from "@/constants/me";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Footer() {

  const {t} = useTranslation(["navigation", "hero", "skills", "common"]);

  const links = [
    { name: t("home"), href: "#home" },
    { name: t("skills"), href: "#skills" },
    { name: t("timeline"), href: "#timeline" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ]; 

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Image
                  src="/static/images/mahefa-logo.png"
                  alt="MAHEFA"
                  className="object-cover"
                  width={100}
                  height={100}
                  priority={true}
                  unoptimized={true}
                />
              </div>
              <span className="font-bold">Mahefa</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {t("hero:description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">{t("navigation:skills")}</h3>
            <ul className="space-y-2">
              {["Frontend", "Backend", t("skills:bdd"), t("skills:environment")].map((item) => (
                <li key={item}>
                  <Link
                    href="#skills"
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${myInfos.email}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                  {myInfos.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href={`tel:${myInfos.phone}`} className="hover:underline">
                  {myInfos.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {myInfos.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mahefa Nantenaina. {t("common:copyright")}
          </p>
          <div className="flex gap-4">
            <Link
              href={myInfos.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              href={myInfos.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}