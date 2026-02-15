import React from 'react';
import { motion } from 'framer-motion';
export function Footer() {
  return (
    <motion.footer
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        delay: 0.5
      }}
      className="w-full py-8 text-center text-amber-900/60">

      <p className="text-sm">
        Fait avec <span className="text-rose-500 animate-pulse">❤️</span> pour
        toi
      </p>
    </motion.footer>);

}