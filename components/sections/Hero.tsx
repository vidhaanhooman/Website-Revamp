"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { heroContent } from "@/content/hero";
import { customerLogos } from "@/content/customers";

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
        {/* Full-bleed background image - runs edge-to-edge, no rounded card. */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.photo.src ?? "/HeroNew.png"}
            alt={c.photo.alt}
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 62%" }}
          />
        </div>

        {/* Spacer that drives the section height */}
        <div className="h-[100svh] min-h-[640px] w-full" aria-hidden />

        {/* Left-side scrim - keeps the left-aligned headline legible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.45) 25%, rgba(0,0,0,0.22) 50%, rgba(0,0,0,0.05) 75%, transparent 100%)"
          }}
        />
        {/* Bottom fade - anchors the marquee and CTAs */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[40%] bg-gradient-to-t from-black/45 via-black/15 to-transparent"
        />

        {/* Customer marquee - floats over the bottom of the image */}
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
            <ul className="marquee-track flex w-max items-center gap-14 whitespace-nowrap py-1 motion-reduce:animate-none">
              {[...customerLogos, ...customerLogos].map((logo, i) => (
                <li
                  key={`${logo.name}-${i}`}
                  className="flex shrink-0 select-none items-center"
                  aria-hidden={i >= customerLogos.length ? true : undefined}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    style={{
                      width: logo.width ? `${logo.width}px` : undefined
                    }}
                    className="h-7 w-auto object-contain opacity-75 brightness-0 invert transition-opacity hover:opacity-100 md:h-8"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Left-aligned content stack - sits over the image */}
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
          <motion.p
            {...fadeUp(0)}
            className="mb-5 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#F77E5C]" />
            The voice agent platform
          </motion.p>

          <motion.h1
            {...fadeUp(0.05)}
            className="font-dmsans text-[clamp(2rem,4.6vw,4rem)] font-bold leading-[1.04] tracking-[-0.03em] text-white drop-shadow-[0_2px_22px_rgba(0,0,0,0.55)]"
          >
            One prompt to
            <br />
            <span className="font-display font-normal italic tracking-[-0.01em]">
              a million calls.
            </span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.15)}
            className="mt-5 max-w-[34rem] text-[16px] font-normal leading-[1.6] text-white/80 drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] sm:text-[17px]"
          >
            {c.description}
          </motion.p>

          <motion.div
            {...fadeUp(0.25)}
            className="mt-8 flex flex-wrap items-center gap-2.5"
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
