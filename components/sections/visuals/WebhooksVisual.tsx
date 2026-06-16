"use client";

/* Webhooks - staged build-up. Stage 1: the call-outcome card lands. Stage 2:
   the webhook deliveries fire one by one (each row flips to 200 OK), pushing
   the structured result into the customer's stack. Re-animates when active. */

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const DELIVERIES = [
  { method: "POST", target: "crm.brightside.com/contacts", ms: "142ms" },
  { method: "POST", target: "hooks.slack.com/T0…/ops", ms: "98ms" },
  { method: "POST", target: "sheets.googleapis.com/v4", ms: "210ms" }
];

export function WebhooksVisual({ active }: { active: boolean }) {
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
        {/* Stage 1 - call outcome */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          <div className="font-sans text-[9px] tracking-[0.04em] text-white/40">
            Call ended · structured outcome
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="font-sans text-[12.5px] font-semibold text-white">
              outcome: booking_confirmed
            </span>
            <span className="rounded-sm border border-emerald-400/30 bg-emerald-500/10 px-1.5 py-[1px] font-sans text-[8.5px] tracking-[0.04em] text-emerald-300">
              ready
            </span>
          </div>
        </motion.div>

        {/* Stage 2 - webhook deliveries */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          <div className="mb-2 font-sans text-[9px] tracking-[0.04em] text-white/40">
            Webhooks · firing
          </div>
          <div className="space-y-1.5">
            {DELIVERIES.map((d, i) => (
              <div
                key={d.target}
                className="flex items-center gap-2 font-mono text-[10px]"
              >
                <span className="rounded-sm border border-white/10 bg-white/[0.05] px-1.5 py-[1px] text-white/70">
                  {d.method}
                </span>
                <span className="min-w-0 flex-1 truncate text-white/65">
                  {d.target}
                </span>
                <span className="tabular-nums text-white/35">{d.ms}</span>
                <motion.span
                  className="flex items-center gap-1 text-emerald-300"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={
                    active
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.6 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: "backOut",
                    delay: 0.75 + i * 0.25
                  }}
                >
                  <Check size={10} strokeWidth={3} />
                  200
                </motion.span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
