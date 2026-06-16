"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative px-6 py-20 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0d] shadow-[0_40px_80px_-30px_rgba(20,15,10,0.5)]"
        >
          <div className="relative grid items-stretch gap-0 md:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT - copy */}
            <div className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
                Try HoomanLabs
              </p>
              <h2 className="mt-5 max-w-md font-dmsans text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
                See HoomanLabs answer your line in under five minutes.
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-[1.6] text-white/60">
                Infrastructure-grade voice agents built for the calls that
                drive your business forward.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-2">
                <a
                  href="/#agent-demo"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-sans text-[13.5px] font-medium text-ink transition-colors hover:bg-white/85"
                >
                  Hear a live demo
                  <ArrowUpRight size={14} strokeWidth={2.25} />
                </a>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-transparent px-5 py-2.5 font-sans text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.06]"
                >
                  See pricing
                </a>
              </div>
            </div>

            {/* RIGHT - image */}
            <div className="relative min-h-[280px] sm:min-h-[340px] md:min-h-[420px]">
              <div
                aria-hidden
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url('/Footer.png')"
                }}
              />
              {/* Left-edge fade - blends image into dark copy panel */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(10,10,13,1) 0%, rgba(10,10,13,0.55) 18%, rgba(10,10,13,0.1) 38%, transparent 55%)"
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
