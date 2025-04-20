import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export function Info () {

  const {t} = useTranslation("hero");

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
          {t("hello")}
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold tracking-tight"
      >
        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          [Mahefa Nantenaina]
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
      >
        {t("description")}
      </motion.p>
    </>
  );
}