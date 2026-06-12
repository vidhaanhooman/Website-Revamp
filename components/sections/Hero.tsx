"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroContent } from "@/content/hero";
import { customers } from "@/content/customers";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
});

export function Hero() {
  const c = heroContent;

  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate w-full overflow-hidden"
      >
        {/* Full-bleed background image — runs edge-to-edge, no rounded card. */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Hero.png"
            alt={c.photo.alt}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Spacer that drives the section height */}
        <div className="h-[100svh] min-h-[640px] w-full" aria-hidden />

        {/* Very soft bottom fade — just enough to anchor the buttons on the
            grass without making the image read as dark */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%] bg-gradient-to-t from-black/30 via-black/10 to-transparent"
        />

        {/* Customer marquee — floats over the bottom of the image */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-30 md:bottom-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-mono text-[12px] italic text-white/80"
          >
            Trusted by care &amp; service teams answering millions of calls
          </motion.p>

          <div
            className="relative mt-5 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)"
            }}
          >
            <ul className="marquee-track flex w-max items-center gap-12 whitespace-nowrap py-1 motion-reduce:animate-none">
              {[...customers, ...customers].map((name, i) => (
                <li
                  key={`${name}-${i}`}
                  className="select-none text-[16px] font-medium tracking-snug text-white/65"
                  aria-hidden={i >= customers.length ? true : undefined}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Centered content stack — sits over the image */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
          <motion.h1
            {...fadeUp(0.05)}
            className="max-w-5xl font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[0.98] tracking-tight text-white"
          >
            {c.headline}
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="mt-6 max-w-xl text-[15.5px] font-medium leading-[1.55] text-white sm:text-[16px]"
          >
            {c.description}
          </motion.p>

          <motion.div
            {...fadeUp(0.25)}
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            <a href={c.primary.href}>
              <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[14px] font-medium text-white shadow-[0_8px_24px_-8px_rgba(0,0,0,0.4)] transition-colors hover:bg-ink-soft">
                {c.primary.label}
                <ArrowRight size={14} strokeWidth={2.25} />
              </button>
            </a>
            <a href={c.secondary.href}>
              <button className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/20 px-5 py-2.5 text-[14px] font-medium text-white shadow-[0_4px_18px_-6px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:bg-white/30">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-ink">
                  <Play size={8} fill="currentColor" />
                </span>
                {c.secondary.label}
              </button>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
