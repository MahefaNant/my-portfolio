"use client";
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
import { myInfos } from "@/constants/me";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Footer() {
  const { t } = useTranslation(["navigation", "hero", "skills", "common"]);

  const links = [
    { name: t("home"), href: "home" },
    { name: t("skills"), href: "skills" },
    { name: t("timeline"), href: "timeline" },
    { name: t("education"), href: "education" },
    { name: t("projects"), href: "projects" },
    { name: t("contact"), href: "contact" },
  ];

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <button 
              onClick={() => handleNavigation("home")}
              className="flex items-center gap-2"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"
              >
                <Image
                  src="/static/images/mahefa-logo.png"
                  alt="MAHEFA"
                  width={32}
                  height={32}
                  priority={true}
                  unoptimized={true}
                />
              </motion.div>
              <span className="font-bold">Mahefa</span>
            </button>
            <p className="text-sm text-muted-foreground">
              {t("hero:description")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">{t("navigation:skills")}</h3>
            <ul className="space-y-2">
              {["Frontend", "Backend", t("skills:bdd"), t("skills:environment")].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavigation("skills")}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                  >
                    {item}
                  </button>
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
            <motion.a
              href={myInfos.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <Linkedin className="h-5 w-5" />
            </motion.a>
            <motion.a
              href={myInfos.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ y: -2 }}
            >
              <Github className="h-5 w-5" />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}