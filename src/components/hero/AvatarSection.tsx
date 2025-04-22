import { motion } from "motion/react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export function AvatarSection() {

  const {t} = useTranslation("hero");
  return(
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative order-1 lg:order-2 mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
    >
      {/* Frame */}
      <div className="absolute inset-0 border-4 border-primary/20 rounded-full animate-spin-slow [animation-duration:20s]" />
      <div className="absolute inset-4 border-4 border-primary/10 rounded-full animate-spin-slow [animation-duration:15s] [animation-direction:reverse]" />
          
      {/* MAHEFA-avatar */}
      <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
        <Image
          src="/static/images/mahefa.png"
          alt="MAHEFA"
          fill={true}
          className="object-cover"
          priority={true}
          unoptimized={true}
        />
      </div>
          
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute -bottom-4 -right-4 bg-background px-4 py-2 rounded-full shadow-lg border"
      >
        <span className="font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {t("badge")}
        </span>
      </motion.div>
    </motion.div>
  );
}