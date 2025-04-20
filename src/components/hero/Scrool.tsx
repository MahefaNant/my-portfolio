import { motion } from "motion/react";

export function Scrool() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <div className="animate-bounce flex flex-col items-center">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <div className="w-6 h-6 border-2 border-foreground rounded-full" />
      </div>
    </motion.div>
  );
}