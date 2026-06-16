"use client";

/* Objective metrics - a live real-time monitor. A streaming line chart updates
   every tick; click a metric chip to retarget the chart (per-turn latency, talk
   ratio, pacing, EOU accuracy); toggle Inbound/Outbound to shift the baselines.
   Streaming runs only while `active`, and re-seeds on reveal. */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Mode = "inbound" | "outbound";
type Key = "latency" | "talk" | "pacing" | "eou";

const METRICS: Record<
  Key,
  {
    label: string;
    sub: string;
    color: string;
    min: number;
    max: number;
    jit: number;
    base: Record<Mode, number>;
    fmt: (v: number) => string;
    chip: (v: number) => string;
  }
> = {
  latency: {
    label: "Per-turn latency",
    sub: "p50 round-trip",
    color: "#5B9DF9",
    min: 0.6,
    max: 2.2,
    jit: 0.16,
    base: { inbound: 1.18, outbound: 1.34 },
    fmt: (v) => `${v.toFixed(2)}s`,
    chip: (v) => `${v.toFixed(2)}s`
  },
  talk: {
    label: "Talk ratio",
    sub: "agent : caller",
    color: "#F472B6",
    min: 30,
    max: 70,
    jit: 3,
    base: { inbound: 46, outbound: 58 },
    fmt: (v) => `${Math.round(v)} : ${100 - Math.round(v)}`,
    chip: (v) => `${Math.round(v)}:${100 - Math.round(v)}`
  },
  pacing: {
    label: "Pacing",
    sub: "words / min",
    color: "#34D399",
    min: 120,
    max: 200,
    jit: 7,
    base: { inbound: 168, outbound: 152 },
    fmt: (v) => `${Math.round(v)}`,
    chip: (v) => `${Math.round(v)}`
  },
  eou: {
    label: "EOU accuracy",
    sub: "end-of-utterance",
    color: "#F5A524",
    min: 95,
    max: 100,
    jit: 0.5,
    base: { inbound: 98.5, outbound: 97.9 },
    fmt: (v) => `${v.toFixed(1)}%`,
    chip: (v) => `${v.toFixed(1)}%`
  }
};

/* Sample call - agent turns carry small per-turn deltas so each shows a
   slightly different live latency / EOU reading. */
const TRANSCRIPT: { role: "caller" | "agent"; text: string; dl: number; de: number }[] = [
  { role: "caller", text: "Mujhe kal ka appointment cancel karna hai.", dl: 0, de: 0 },
  { role: "agent", text: "Theek hai, kal 5:30 ka slot cancel kar diya.", dl: -0.06, de: 0.1 },
  { role: "caller", text: "Aur Friday ko naya book kar do.", dl: 0, de: 0 },
  { role: "agent", text: "Friday 4 baje slot confirm kar diya. SMS bhej rahi hoon.", dl: 0.04, de: -0.2 }
];

const KEYS: Key[] = ["latency", "talk", "pacing", "eou"];
const N = 30;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const baseVals = (mode: Mode): Record<Key, number> => ({
  latency: METRICS.latency.base[mode],
  talk: METRICS.talk.base[mode],
  pacing: METRICS.pacing.base[mode],
  eou: METRICS.eou.base[mode]
});

export function ObjectiveMetricsVisual({ active }: { active: boolean }) {
  const [mode, setMode] = useState<Mode>("inbound");
  const [metric, setMetric] = useState<Key>("latency");
  const [vals, setVals] = useState<Record<Key, number>>(() => baseVals("inbound"));
  const [series, setSeries] = useState<number[]>(() =>
    Array(N).fill(METRICS.latency.base.inbound)
  );
  const valsRef = useRef(vals);
  valsRef.current = vals;

  // reset baselines when the mode flips
  useEffect(() => {
    const bv = baseVals(mode);
    valsRef.current = bv;
    setVals(bv);
    setSeries(Array(N).fill(bv[metric]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // reseed the chart when the tracked metric changes
  useEffect(() => {
    setSeries(Array(N).fill(valsRef.current[metric]));
  }, [metric]);

  // stream new readings while active
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const cur = valsRef.current;
      const next = { ...cur };
      KEYS.forEach((k) => {
        const m = METRICS[k];
        const drift = (m.base[mode] - cur[k]) * 0.2 + (Math.random() - 0.5) * m.jit;
        next[k] = clamp(cur[k] + drift, m.min, m.max);
      });
      valsRef.current = next;
      setVals(next);
      setSeries((s) => [...s.slice(1), next[metric]]);
    }, 900);
    return () => clearInterval(id);
  }, [active, mode, metric]);

  const m = METRICS[metric];
  const seg = series.map((v, i) => {
    const x = (i / (N - 1)) * 100;
    const y = 40 - clamp((v - m.min) / (m.max - m.min), 0, 1) * 38 - 1;
    return { x, y };
  });
  const poly = seg.map((p) => `${p.x},${p.y}`).join(" ");
  const areaD = `M0,40 L ${poly} L 100,40 Z`;
  const lastY = seg[seg.length - 1].y;

  // Tooltip marker - pinned to an inset point so it never clips the edge.
  const markerIdx = Math.round((N - 1) * 0.78);
  const markerX = (markerIdx / (N - 1)) * 100;
  const markerY = seg[markerIdx].y;
  const X_LABELS = ["8a", "10a", "12p", "2p", "4p", "6p", "now"];
  const HI_LABEL = 5;

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
          className="w-[90%] rounded-2xl bg-[#0c0c11] p-5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)]"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-sans text-[12px] font-medium text-white/90">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              Live · {mode}
            </span>
            <div className="flex rounded-full bg-white/[0.06] p-0.5">
              {(["inbound", "outbound"] as Mode[]).map((mm) => (
                <button
                  key={mm}
                  type="button"
                  onClick={() => setMode(mm)}
                  className={
                    "rounded-full px-2.5 py-1 font-sans text-[10px] font-medium capitalize transition-colors " +
                    (mode === mm ? "bg-white text-slate-900" : "text-white/55 hover:text-white/80")
                  }
                >
                  {mm}
                </button>
              ))}
            </div>
          </div>

          {/* Call strip - who's on the line */}
          <div className="mt-4 flex items-center gap-2.5 border-b border-white/[0.08] pb-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 font-sans text-[10px] font-semibold text-white/85">
              PN
            </span>
            <div className="min-w-0">
              <div className="font-sans text-[12.5px] font-semibold text-white">
                +91 98765 43210
              </div>
              <div className="font-mono text-[9px] text-white/45">
                {mode} · Mumbai · Hindi
              </div>
            </div>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2 py-[3px] font-mono text-[9px] tabular-nums text-white/65">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              01:42
            </span>
          </div>

          {/* Transcript - chat style, per-turn metrics on each agent turn */}
          <div className="mt-3.5 space-y-3.5">
            {TRANSCRIPT.map((t, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5"
                initial={{ opacity: 0, y: 8 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 + i * 0.18 }}
              >
                {/* avatar */}
                {t.role === "agent" ? (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <span className="h-2.5 w-2.5 rotate-45 rounded-[2px] bg-[#F77E5C]" />
                  </span>
                ) : (
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 font-sans text-[9px] font-semibold text-white/70">
                    PN
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                      {t.role === "agent" ? "Maya · agent" : "Caller"}
                    </span>
                    {t.role === "agent" && (
                      <>
                        <span className="rounded-full bg-[#5B9DF9]/12 px-1.5 py-[1px] font-mono text-[8.5px] tabular-nums text-[#5B9DF9]">
                          ⟳ {METRICS.latency.fmt(vals.latency + t.dl)}
                        </span>
                        <span className="rounded-full bg-[#F5A524]/12 px-1.5 py-[1px] font-mono text-[8.5px] tabular-nums text-[#F5A524]">
                          EOU {METRICS.eou.fmt(vals.eou + t.de)}
                        </span>
                      </>
                    )}
                  </div>
                  <p className="mt-1 font-sans text-[12px] leading-snug text-white/85">
                    {t.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Metric chips - click to retarget the chart */}
          <div className="mt-3 grid grid-cols-4 gap-2">
            {KEYS.map((k) => {
              const mm = METRICS[k];
              const on = metric === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setMetric(k)}
                  className={
                    "rounded-xl px-2.5 py-2 text-left transition-colors " +
                    (on ? "bg-white/[0.07]" : "bg-white/[0.02] hover:bg-white/[0.04]")
                  }
                  style={on ? { boxShadow: `inset 0 0 0 1px ${mm.color}55` } : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: mm.color, opacity: on ? 1 : 0.5 }}
                    />
                    <span className="font-sans text-[8.5px] tracking-[0.02em] text-white/45">
                      {mm.label}
                    </span>
                  </div>
                  <div
                    className="mt-1 font-sans text-[14px] font-semibold tabular-nums"
                    style={{ color: on ? mm.color : "rgba(255,255,255,0.82)" }}
                  >
                    {mm.chip(vals[k])}
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
