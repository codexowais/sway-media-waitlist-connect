"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SwayWordmark } from "@/components/brand/SwayWordmark";
import { Grain } from "@/components/effects/Grain";
import { OrbitalFrame } from "@/components/effects/OrbitalFrame";
import { Navigation } from "@/components/navigation/Navigation";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { BackgroundVideo } from "./BackgroundVideo";

export function Hero() {
  const reduced = useReducedMotion();

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 14 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.7,
      delay: reduced ? 0 : delay,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  });

  return (
    <section id="top" className="sway-hero">
      <BackgroundVideo />
      <Grain />
      <OrbitalFrame />
      <Navigation />

      <div className="sway-hero__content">
        {/* Large wordmark with editorial distortion */}
        <motion.div className="sway-hero__wordmark-wrap" {...reveal(0.5)}>
          <SwayWordmark className="sway-wordmark--hero sway-distortion" />
        </motion.div>

        {/* Headline */}
        <motion.h1 className="sway-hero__headline sway-heading" {...reveal(0.9)}>
          Building what&apos;s next.
        </motion.h1>

        {/* Supporting copy */}
        <motion.p className="sway-hero__subtext" {...reveal(1.15)}>
          Sway Media is a new-age media agency at the intersection of culture,
          creativity, technology and AI.
        </motion.p>

        {/* Waitlist CTA + inline form */}
        <motion.div {...reveal(1.4)}>
          <WaitlistForm />
        </motion.div>
      </div>

      {/* Subtle sparkle dot */}
      <motion.div
        className="sway-hero__sparkle"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 2, delay: reduced ? 0 : 1.8 }}
      />
    </section>
  );
}

