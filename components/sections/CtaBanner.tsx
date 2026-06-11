"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { DotsField } from "@/components/ui/DotsField";

export function CtaBanner() {
  return (
    <section className="relative py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-5xl bg-grad-ember"
        >
          {/* warm radial wash so the dots glow into a halo */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(closest-side_at_75%_50%,rgba(255,224,180,0.55),transparent_60%)]"
          />

          <div className="relative grid items-stretch gap-0 md:grid-cols-2">
            {/* LEFT — copy */}
            <div className="relative z-10 px-8 py-10 sm:px-10 sm:py-12 md:px-14 md:py-16 lg:px-16">
              <h2 className="text-balance font-sans text-[clamp(1.75rem,3.6vw,2.5rem)] font-medium leading-[1.08] tracking-snug text-white">
                See HoomanLabs answer your line in under five minutes.
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-[1.6] text-white/85">
                Innovative, infrastructure-grade voice agents — built for the
                calls that drive your business forward.
              </p>
              <div className="mt-7">
                <a
                  href="#demo"
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[13.5px] font-medium text-white transition-colors hover:bg-ink-soft"
                >
                  Explore
                  <ArrowRight size={13} strokeWidth={2.25} />
                </a>
              </div>
            </div>

            {/* RIGHT — dot field panel */}
            <div className="relative flex min-h-[260px] items-center justify-center px-6 py-8 sm:min-h-[300px] md:min-h-[360px]">
              <div className="absolute inset-4 sm:inset-6">
                <DotsField rows={11} cols={15} dot={6} gap={14} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
