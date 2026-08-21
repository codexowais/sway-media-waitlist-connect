"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

const CAPABILITIES = ["Strategy", "Creative", "Content", "AI", "Growth"];

export function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="sway-capabilities"
      aria-label="Capabilities"
    >
      <ul className="sway-capabilities__list" role="list">
        {CAPABILITIES.map((item, i) => (
          <motion.li
            key={item}
            className="sway-capabilities__item sway-display"
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduced ? 0 : 24 }}
            transition={{
              duration: reduced ? 0 : 0.7,
              delay: reduced ? 0 : 0.15 * i,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
