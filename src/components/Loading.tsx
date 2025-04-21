"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Loading() {
  const { theme } = useTheme();
  return (
    <div role="status" aria-live="polite" className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center space-y-8"
      >
        <div className="relative w-24 h-24">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 0px rgba(0,0,0,0)",
                `0 0 20px ${theme === "dark" ? "#fff" : "#000"}`,
                "0 0 0px rgba(0,0,0,0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-full h-full rounded-full flex items-center justify-center"
          >
            <Image
              src="/static/images/mahefa-logo.png"
              alt="MAHEFA"
              className="object-cover"
              fill={true}
              priority={true}
              unoptimized={true}
            />
          </motion.div>

          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full border-4 border-primary/30"
          />
        </div>

        <motion.div
          className="w-64 h-1 bg-muted rounded-full overflow-hidden"
        >
          <motion.div
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-full w-1/2 bg-gradient-to-r from-primary to-secondary"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="text-sm text-muted-foreground"
        >
          Loading...
        </motion.p>
      </motion.div>
    </div>
  );
}
