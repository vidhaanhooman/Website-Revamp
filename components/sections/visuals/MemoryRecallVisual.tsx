"use client";

/* Context & memory - the agent remembers the last conversation. Stage 1: the
   returning caller is recognised and prior-call facts surface one by one.
   Stage 2: the agent opens by referencing that memory. Re-animates on active. */

import { motion } from "framer-motion";
import { History } from "lucide-react";

const RECALL = [
  "Asked about EMI on a ₹3L loan",
  "Prefers Hindi",
  "Wanted a Tuesday callback"
];

export function MemoryRecallVisual({ active }: { active: boolean }) {
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
        {/* Stage 1 - returning caller + recalled memory */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          {/* Caller identity */}
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-sans text-[10px] font-semibold text-white/85">
              PN
            </span>
            <div className="min-w-0">
              <div className="font-sans text-[12.5px] font-semibold text-white">
                Priya Nair · returning
              </div>
              <div className="font-mono text-[9px] text-white/45">
                Last call · 12 days ago · Hindi
              </div>
            </div>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-white/[0.06] px-2 py-[2px] font-sans text-[9px] text-white/65">
              <History size={10} strokeWidth={2} />
              recognised
            </span>
          </div>

          {/* Recalled facts */}
          <div className="mt-3 border-t border-white/[0.08] pt-2.5">
            <div className="mb-1.5 font-sans text-[9px] tracking-[0.04em] text-white/40">
              Remembered from last call
            </div>
            <div className="space-y-1.5">
              {RECALL.map((r, i) => (
                <motion.div
                  key={r}
                  className="flex items-center gap-2 font-sans text-[11px] text-white/80"
                  initial={{ opacity: 0, x: -8 }}
                  animate={
                    active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                  }
                  transition={{
                    duration: 0.35,
                    ease: "easeOut",
                    delay: 0.45 + i * 0.18
                  }}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#F77E5C]" />
                  {r}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stage 2 - agent opens by referencing the memory */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
          className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
            <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#F77E5C]" />
          </span>
          <div className="min-w-0">
            <div className="font-sans text-[9px] tracking-[0.12em] text-white/45">
              MAYA · OPENING
            </div>
            <p className="mt-1 font-sans text-[12px] leading-snug text-white/85">
              Hi Priya! Last time you asked about EMI on a ₹3L loan - shall we
              pick up from there?
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
