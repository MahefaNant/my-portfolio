"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const PortfolioFeatureCard = () => {

  const {t} = useTranslation("projects");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-8"
    >
      <Card className="w-full bg-gradient-to-br from-muted/60 to-background border border-border shadow-xl rounded-2xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold">{t("portfolio.title")}</CardTitle>
            <CardDescription>{t("portfolio.description")}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="pt-0 pb-6 px-6 text-muted-foreground text-sm leading-relaxed space-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>{t("portfolio.techno")} <strong>Next.js</strong> & <strong>TypeScript</strong></li>
            <li>{t("portfolio.v")} <strong>GitHub</strong></li>
            <li>{t("portfolio.deploye")} <strong>Vercel</strong></li>
            <li>{t("portfolio.form")} <strong>{t("portfolio.email")}</strong> & <strong>reCAPTCHA</strong> {t("portfolio.security")}</li>
            <li>{t("portfolio.language")} <strong>English / French</strong></li>
            <li>{t("portfolio.theme")} <strong>mode Black & White</strong></li>
            <li>{t("portfolio.animation")} <strong>Framer Motion</strong></li>
            <li><strong>{"SEO (Search Engine Optimization)"} </strong></li>
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PortfolioFeatureCard;
