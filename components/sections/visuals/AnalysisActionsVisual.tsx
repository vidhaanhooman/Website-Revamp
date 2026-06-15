"use client";

/* Analysis & actions - staged build-up visual for the Build journey step.
   Stage 1: sky-gradient backdrop. Stage 2: the live transcript card drops in.
   Stage 3: the latency-cascade + subsystems panel slides up. Re-animates
   every time the step becomes active (driven by the `active` prop). */

import { motion } from "framer-motion";

const SUBSYSTEMS = [
  { label: "LLM #1", dot: "#34D399", a: ["Provider", "openai"], b: ["Model", "gpt-4.1"] },
  { label: "TTS", dot: "#F472B6", a: ["Provider", "elevenlabs"], b: ["Voice", "0Bh891V…"] },
  { label: "STT", dot: "#60A5FA", a: ["Provider", "soniox"], b: ["Model", "stt-rt-v4"] }
];

const BARS = [
  { label: "EOU", color: "#4F9BFF", left: 6, width: 30 },
  { label: "LLM", color: "#34D77A", left: 40, width: 42 },
  { label: "TTS", color: "#F472B6", left: 82, width: 16 }
];

export function AnalysisActionsVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Backdrop image */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')"
        }}
      />

      <div className="relative flex h-full flex-col justify-center gap-3 p-4 md:p-5">
        {/* Stage 2 - transcript card */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          <div className="mb-2 flex items-center gap-1.5 font-sans text-[9.5px] tracking-[0.12em] text-white/55">
            <span className="text-white/35">02</span>
            <span className="mx-1 text-white/20">·</span>
            USER
            <span className="rounded border border-white/15 px-1 py-[1px] text-[8.5px] text-white/70">
              EN
            </span>
          </div>
          <p className="font-sans text-[12px] text-white/85">सॉरी, हु इज दिस?</p>
          <p className="mt-0.5 font-mono text-[8.5px] text-white/35">
            0:09 → 0:10 · 0.8s
          </p>

          <div className="mt-3 flex items-center gap-1.5 font-sans text-[9.5px] tracking-[0.12em] text-white/55">
            ASSISTANT
            <span className="rounded border border-white/15 px-1 py-[1px] text-[8.5px] text-white/70">
              HI
            </span>
          </div>
          <p className="mt-1 font-sans text-[12px] leading-snug text-white/85">
            मैं Rohan हूँ, Hooman Labs से एक AI assistant. आपने हमारी वेबसाइट पर
            callback request किया था, इसलिए…
          </p>
          <p className="mt-0.5 font-mono text-[8.5px] text-white/35">
            0:13 → 0:17 · 5.0s
          </p>
        </motion.div>

        {/* Stage 3 - latency cascade + subsystems */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="rounded-xl border border-white/10 bg-[#0b0b0e]/95 p-3.5 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)] backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <span className="font-sans text-[12px] font-semibold text-white">
              Latency cascade
            </span>
            <span className="font-mono text-[8.5px] text-white/45">
              user-perceived <span className="text-white/80">2.16s</span>
            </span>
          </div>

          {/* Bars */}
          <div className="mt-2.5 space-y-1.5">
            {BARS.map((b, i) => (
              <div key={b.label} className="flex items-center gap-2">
                <span className="w-7 shrink-0 font-mono text-[8px] tracking-[0.12em] text-white/45">
                  {b.label}
                </span>
                <div className="relative h-[5px] flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.span
                    className="absolute inset-y-0 rounded-full"
                    style={{ left: `${b.left}%`, backgroundColor: b.color }}
                    initial={{ width: 0 }}
                    animate={active ? { width: `${b.width}%` } : { width: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: 0.7 + i * 0.12
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Subsystems */}
          <div className="mt-3 border-t border-white/[0.08] pt-3">
            <div className="mb-2 font-sans text-[11px] font-semibold text-white/90">
              Subsystems
            </div>
            <div className="space-y-1.5">
              {SUBSYSTEMS.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <span
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: s.dot }}
                  />
                  <span className="w-12 shrink-0 font-mono text-[9px] text-white/80">
                    {s.label}
                  </span>
                  <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-[1px] font-mono text-[8px] text-white/55">
                    {s.a[0]}
                    <span className="ml-1 text-white/80">{s.a[1]}</span>
                  </span>
                  <span className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-[1px] font-mono text-[8px] text-white/55">
                    {s.b[0]}
                    <span className="ml-1 text-white/80">{s.b[1]}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
