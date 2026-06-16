"use client";

/* Context & memory - staged build-up. Stage 1: the recalled order card drops
   in (live CRM context). Stage 2: the caller's voice note + the agent's
   memory-aware reply slide up. Re-animates whenever the step becomes active. */

import { motion } from "framer-motion";
import { Glasses } from "lucide-react";

const WAVE = [3, 6, 4, 9, 5, 11, 6, 8, 4, 10, 5, 7, 9, 4, 8, 5, 10, 6, 4, 7, 5, 9, 4, 6];

export function ContextMemoryVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Clean sky backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')"
        }}
      />

      <div className="relative flex h-full flex-col justify-center gap-3 p-4 md:p-5">
        {/* Stage 1 - recalled order card */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          <div className="mb-2.5 flex items-center justify-between">
            <span className="font-sans text-[9.5px] text-white/45">
              Order placed on · 2nd April
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-[2px] font-sans text-[9px] text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Payment received
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-[#dfe6ef] to-[#c2ccd8] text-ink/70">
              <Glasses size={22} strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <div className="font-sans text-[13px] font-semibold text-white">
                Vincent Chase Sunglasses
              </div>
              <div className="font-sans text-[11px] text-white/50">
                Black Frame · Medium · x01
              </div>
              <div className="mt-1.5 flex items-center gap-3 font-sans text-[10.5px] text-white/65">
                <span className="underline-offset-2 hover:underline">
                  Track Order
                </span>
                <span className="underline-offset-2 hover:underline">
                  Invoice
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stage 2 - voice note + memory-aware agent reply */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          {/* Voice note */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[8px] font-bold text-ink">
              VD
            </span>
            <span className="font-mono text-[9.5px] tabular-nums text-white/55">
              01:56
            </span>
            <span className="flex flex-1 items-center gap-[2px]">
              {WAVE.map((h, i) => {
                const lit = active;
                return (
                  <motion.span
                    key={i}
                    className="w-[2px] rounded-full bg-white/45"
                    initial={{ scaleY: 0.2 }}
                    animate={lit ? { scaleY: 1 } : { scaleY: 0.2 }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                      delay: 0.7 + i * 0.02
                    }}
                    style={{ height: `${h}px`, transformOrigin: "center" }}
                  />
                );
              })}
            </span>
          </div>

          {/* Agent reply */}
          <div className="mt-3 flex items-start gap-2.5 border-t border-white/[0.08] pt-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F77E5C] text-[10px] font-bold text-white">
              L
            </span>
            <div className="min-w-0">
              <div className="font-sans text-[9px] tracking-[0.12em] text-white/45">
                LENSKART AI AGENT
              </div>
              <p className="mt-1 font-sans text-[12px] leading-snug text-white/85">
                Our new sunglass collection just dropped, perfect with your
                Cloudscape tee.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
