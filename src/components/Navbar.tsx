"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { MenuButton } from "./navbar/MenuButton";
import { useTranslation } from "react-i18next";
import { LanguageButton } from "./navbar/LanguageButton";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, setTheme } = useTheme();

  const { t } = useTranslation("navigation");

  const links = useMemo(() => [
    { name: t("home"), href: "home" },
    { name: t("skills"), href: "skills" },
    { name: t("timeline"), href: "timeline" },
    { name: t("education"), href: "education" },
    { name: t("projects"), href: "projects" },
    { name: t("contact"), href: "contact" },
  ], [t]);

  const handleClick = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const scrollPosition = window.scrollY + 100;
      
      for (const link of links) {
        const element = document.getElementById(link.href);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(link.href);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  if (!mounted) return null;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex">
          <MenuButton 
            links={links.map(l => ({...l, href: `#${l.href}`}))} 
            activeSection={activeSection} 
            setActiveSection={setActiveSection}
            handleClick={handleClick}
          />
          <button
            onClick={() => handleClick("home")}
            className="flex items-center gap-2"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 rounded-full flex items-center justify-center"
            >
              <Image 
                src="/static/images/mahefa-logo.png"
                alt="MAHEFA"
                className="object-cover"
                width={100}
                height={100}
                priority={true}
              />
            </motion.div>
            <span className="font-bold text-xl hidden sm:inline-block">Mahefa</span>
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.name}>
                <button
                  className={`relative px-2 py-1 transition-colors hover:text-primary ${
                    activeSection === link.href ? "text-primary" : "text-foreground"
                  }`}
                  onClick={() => handleClick(link.href)}
                >
                  {link.name}
                  {activeSection === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute left-0 top-full h-0.5 w-full bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <LanguageButton />

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}