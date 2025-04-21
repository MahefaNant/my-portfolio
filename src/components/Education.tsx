// components/Education.tsx
"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { BookOpen, Award, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface EducationItem {
  id: number
  title: string
  institution: string
  date: string
  description: string
  type: "formation" | "certification"
  badge?: string
  link?: string
}

export default function Education() {

  const {t} = useTranslation("education");

  const educationData: EducationItem[] = [
    {
      id: 4,
      title: t("ed-4.title"),
      institution: t("ed-4.institution"),
      date: t("ed-4.year"),
      description: t("ed-4.description"),
      type: "formation",
      badge: t("ed-4.badge"),
      link: "https://drive.google.com/file/d/1HXAqwD1Fmah12jgv8piNSQ-tJbZe5WH_/view?usp=sharing"
    },
    {
      id: 3,
      title: t("ed-3.title"),
      institution: t("ed-3.institution"),
      date: t("ed-3.year"),
      description: t("ed-3.description"),
      type: "certification",
      badge: t("ed-3.badge"),
    },
    {
      id: 2,
      title: t("ed-2.title"),
      institution: t("ed-2.institution"),
      date: t("ed-2.year"),
      description: t("ed-2.description"),
      type: "certification",
      badge: t("ed-2.badge"),
    },
    {
      id: 1,
      title: t("ed-1.title"),
      institution: t("ed-1.institution"),
      date: t("ed-1.year"),
      description: t("ed-1.description"),
      type: "certification",
      badge: t("ed-1.badge"),
      link: "https://www.freecodecamp.org/certification/MahefaNant/foundational-c-sharp-with-microsoft"
    },
  ];

  return (
    <section id="education" className="py-20 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("section")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-[calc(50%-12px)] max-w-[500px]"
            >
              <Card className="h-full w-full hover:shadow-lg transition-shadow group">
                <CardHeader className="flex flex-row items-start justify-between pb-3 space-y-0">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${
                      item.type === "formation" 
                        ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300"
                        : "bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300"
                    }`}>
                      {item.type === "formation" ? (
                        <BookOpen className="h-6 w-6" />
                      ) : (
                        <Award className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold leading-none tracking-tight">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.institution}</p>
                    </div>
                  </div>
                  {item.badge && (
                    <Badge variant="outline" className="shrink-0">
                      {item.badge}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{item.date}</span>
                    {item.link && (
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                      >
                        Voir
                        <ExternalLink className="ml-1 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground text-sm">
            {t("description2")}
          </p>
        </motion.div>
      </div>
    </section>
  );
}