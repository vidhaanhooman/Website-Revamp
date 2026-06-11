"use client";

import { motion } from "framer-motion";
import { customers } from "@/content/customers";

export function CustomerCarousel() {
  // Duplicate the list so the marquee can loop seamlessly via -50% translate.
  const track = [...customers, ...customers];

  return (
    <section
      aria-label="Customers using HoomanLabs"
      className="relative py-16 md:py-24"
    >
      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-mono text-[12px] italic text-ink/60 dark:text-dark-text/65"
        >
          Trusted by care &amp; service teams answering millions of calls
        </motion.p>
      </div>

      {/* Marquee */}
      <div
        className="group relative mt-9 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)"
        }}
      >
        <ul className="marquee-track flex w-max items-center gap-12 whitespace-nowrap py-1 motion-reduce:animate-none">
          {track.map((name, i) => (
            <li
              key={`${name}-${i}`}
              className="select-none text-[18px] font-medium tracking-snug text-ink/55 transition-colors duration-200 hover:text-ink/85 dark:text-dark-text/55 dark:hover:text-dark-text/95"
              aria-hidden={i >= customers.length ? true : undefined}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
