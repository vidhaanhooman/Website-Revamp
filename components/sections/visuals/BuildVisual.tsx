"use client";

/* Build feature visual - real product screenshots: the no-code Agent Flow
   canvas + the Analysis & actions panel, stacked. Glides in left → right
   and eases to a stop on scroll into view. */

import { motion } from "framer-motion";

const SHOTS = [
  {
    src: "/journey/Agent%20Flow.png",
    alt: "HoomanLabs no-code agent flow builder"
  },
  {
    src: "/journey/Analysis%20%26%20actions.png",
    alt: "Analysis and call actions"
  }
];

export function BuildVisual() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -88 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
    >
      {SHOTS.map((shot) => (
        <div
          key={shot.src}
          className="overflow-hidden rounded-2xl border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shot.src} alt={shot.alt} className="block h-auto w-full" />
        </div>
      ))}
    </motion.div>
  );
}
