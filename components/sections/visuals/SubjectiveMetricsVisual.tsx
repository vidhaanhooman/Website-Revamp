"use client";

/* Subjective metrics - LLM-as-judge scorecard. Deliberately restrained: one
   quality number, three dimension rows, one quiet regression note. Re-animates
   on `active`. */

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

type Dim = { label: string; score: number; warn?: boolean };

const DIMS: Dim[] = [
  { label: "Empathy", score: 92 },
  { label: "Policy adherence", score: 76, warn: true },
  { label: "Resolution", score: 94 }
];

function CountUp({ to, active, delay }: { to: number; active: boolean; delay: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    const controls = animate(0, to, {
      duration: 1,
      ease: "easeOut",
      delay,
      onUpdate: (v) => setN(Math.round(v))
    });
    return () => controls.stop();
  }, [active, to, delay]);
  return <>{n}</>;
}

export function SubjectiveMetricsVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')" }}
      />

      <div className="relative flex h-full items-center justify-center p-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-[80%] rounded-2xl bg-[#0c0c11] p-7 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between font-sans text-[10.5px] tracking-[0.04em] text-white/40">
            <span>LLM-as-judge</span>
            <span>nightly · 02:00</span>
          </div>

          {/* Hero score */}
          <div className="mt-5">
            <div className="flex items-baseline gap-2">
              <span className="font-sans text-[46px] font-semibold leading-none tracking-tight text-white">
                <CountUp to={87} active={active} delay={0.25} />
              </span>
              <span className="font-sans text-[14px] text-white/35">/ 100</span>
            </div>
            <div className="mt-2 flex items-center gap-2 font-sans text-[12px] text-white/45">
              Quality score
              <span className="text-white/25">·</span>
              <span className="text-[#F5A524]">↓ 4 vs last run</span>
            </div>
          </div>

          {/* Dimensions */}
          <div className="mt-6 space-y-4 border-t border-white/[0.07] pt-5">
            {DIMS.map((d, i) => {
              const color = d.warn ? "#F5A524" : "#34D399";
              return (
                <div
                  key={d.label}
                  className="grid grid-cols-[140px_1fr_auto] items-center gap-4"
                >
                  <span className="font-sans text-[13px] text-white/75">{d.label}</span>
                  <span className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.08]">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{ backgroundColor: color }}
                      initial={{ width: 0 }}
                      animate={active ? { width: `${d.score}%` } : { width: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 + i * 0.12 }}
                    />
                  </span>
                  <span
                    className="w-9 text-right font-sans text-[13px] font-medium tabular-nums"
                    style={{ color: d.warn ? "#F5A524" : "rgba(255,255,255,0.85)" }}
                  >
                    <CountUp to={d.score} active={active} delay={0.4 + i * 0.12} />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Quiet regression note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="mt-5 font-sans text-[10.5px] text-white/35"
          >
            Regression in policy adherence, alert routed to #voice-quality
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
