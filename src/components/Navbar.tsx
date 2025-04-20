"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

  const links = [
    { name: t("home"), href: "#home" },
    { name: t("skills"), href: "#skills" },
    { name: t("timeline"), href: "#timeline" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      const sections = links.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && hash !== activeSection) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [activeSection]);

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
          <MenuButton links={links} activeSection={activeSection} setActiveSection={setActiveSection} />
          <Link 
            href="#home" 
            className="flex items-center gap-2"
            onClick={() => setActiveSection("home")}
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
                unoptimized={true}
              />
              {/* <span className={`${theme === "dark" ? "text-black" : "text-white"} font-bold text-xl`}>M</span> */}
            </motion.div>
            <span className="font-bold text-xl hidden sm:inline-block">Mahefa</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const section = link.href.substring(1);
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`relative px-2 py-1 transition-colors hover:text-primary ${
                      activeSection === section ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setActiveSection(section)}
                  >
                    {link.name}
                    {activeSection === section && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute left-0 top-full h-0.5 w-full bg-primary"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
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