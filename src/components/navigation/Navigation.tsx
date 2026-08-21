"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SwayLogo } from "@/components/brand/SwayLogo";

export function Navigation() {
  const reduced = useReducedMotion();

  return (
    <motion.nav
      aria-label="Primary navigation"
      className="sway-nav"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2 }}
    >
      <a href="#top" aria-label="SWAY MEDIA — back to top">
        <SwayLogo />
      </a>
      <span className="sway-label sway-nav__status">Launching Soon</span>
    </motion.nav>
  );
}
