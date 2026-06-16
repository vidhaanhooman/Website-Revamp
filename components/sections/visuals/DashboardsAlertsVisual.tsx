"use client";

/* Dashboards & alerts - the whole alert loop in one card: a live metric, a
   DRAGGABLE threshold, and routing that fires to Slack / on-call the moment the
   value breaches. Toggle Threshold vs Ratio rule. Drag the dashed line to set
   the trigger. Re-animates on `active`. */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Check, Hash, Phone, ChevronsUpDown } from "lucide-react";

type RuleId = "threshold" | "ratio";

type Rule = {
  tab: string;
  metric: string;
  min: number;
  max: number;
  current: number;
  thr: number;
  hist: number[];
  fmt: (v: number) => string;
  rule: (t: number) => string;
};

const RULES: Record<RuleId, Rule> = {
  threshold: {
    tab: "Threshold",
    metric: "p95 latency",
    min: 500,
    max: 1100,
    current: 760,
    thr: 820,
    hist: [740, 690, 775, 715, 800, 755, 730, 760],
    fmt: (v) => `${Math.round(v)} ms`,
    rule: (t) => `p95 latency > ${Math.round(t)} ms`
  },
  ratio: {
    tab: "Ratio",
    metric: "failed / total",
    min: 0,
    max: 10,
    current: 3.1,
    thr: 5,
    hist: [2.4, 3.0, 2.1, 3.5, 2.7, 3.6, 2.9, 3.1],
    fmt: (v) => `${v.toFixed(1)}%`,
    rule: (t) => `failed / total > ${t.toFixed(1)}%`
  }
};

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

export function DashboardsAlertsVisual({ active }: { active: boolean }) {
  const [ruleId, setRuleId] = useState<RuleId>("threshold");
  const r = RULES[ruleId];

  const [threshold, setThreshold] = useState(r.thr);
  const [current, setCurrent] = useState(r.current);
  const [userDragged, setUserDragged] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  // reset when the rule type changes
  useEffect(() => {
    setThreshold(RULES[ruleId].thr);
    setCurrent(RULES[ruleId].current);
  }, [ruleId]);

  // AUTO-DEMO: drift the threshold down to fire the alert, then recover -
  // until the user grabs it themselves.
  useEffect(() => {
    if (!active || userDragged) return;
    setThreshold(r.thr);
    let firing = false;
    let target = r.thr;
    const fireTarget = r.current - (r.max - r.min) * 0.06; // dips below the value
    const flip = setInterval(() => {
      firing = !firing;
      target = firing ? fireTarget : r.thr;
    }, 2600);
    const ease = setInterval(() => {
      if (draggingRef.current) return;
      setThreshold((t) => {
        const d = target - t;
        return Math.abs(d) < 0.4 ? target : t + d * 0.1;
      });
    }, 30);
    return () => {
      clearInterval(flip);
      clearInterval(ease);
    };
  }, [active, userDragged, r]);

  // gentle live jitter on the current reading
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => {
      const span = (r.max - r.min) * 0.012;
      setCurrent((c) => clamp(r.current + (Math.random() - 0.5) * span * 2, r.min, r.max));
    }, 1100);
    return () => clearInterval(id);
  }, [active, r]);

  // drag the threshold line
  useEffect(() => {
    function move(e: PointerEvent) {
      if (!draggingRef.current || !chartRef.current) return;
      const rect = chartRef.current.getBoundingClientRect();
      const pct = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      setThreshold(clamp(r.max - pct * (r.max - r.min), r.min, r.max));
    }
    function up() {
      draggingRef.current = false;
    }
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [r]);

  const valToPct = (v: number) => ((r.max - v) / (r.max - r.min)) * 100;
  const firing = current > threshold;
  const accent = firing ? "#F77E5C" : "#34D399";

  // sparkline path (viewBox 0..100), last point = current
  const pts = [...r.hist.slice(0, -1), current];
  const line = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100} ${valToPct(v)}`)
    .join(" ");
  const area = `${line} L 100 100 L 0 100 Z`;

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
          className="flex w-[88%] flex-col rounded-2xl bg-[#0c0c11] p-5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)]"
        >
          {/* Header: metric + value + rule toggle */}
          <div className="flex items-start justify-between">
            <div>
              <div className="font-sans text-[10px] tracking-[0.04em] text-white/40">
                {r.metric}
              </div>
              <div
                className="mt-1 font-sans text-[26px] font-semibold leading-none tabular-nums tracking-tight"
                style={{ color: accent }}
              >
                {r.fmt(current)}
              </div>
            </div>
            <div className="flex rounded-full bg-white/[0.06] p-0.5">
              {(["threshold", "ratio"] as RuleId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRuleId(id)}
                  className={
                    "rounded-full px-2.5 py-1 font-sans text-[10px] font-medium transition-colors " +
                    (ruleId === id ? "bg-white text-slate-900" : "text-white/55 hover:text-white/80")
                  }
                >
                  {RULES[id].tab}
                </button>
              ))}
            </div>
          </div>

          {/* Chart with draggable threshold */}
          <div ref={chartRef} className="relative mt-3 h-[120px] w-full select-none">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <path d={area} fill={accent} fillOpacity={0.08} />
              <motion.path
                key={ruleId + (active ? "on" : "off")}
                d={line}
                stroke={accent}
                strokeWidth={1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </svg>

            {/* live current dot */}
            <span
              className="absolute right-0 h-2 w-2 -translate-y-1/2 translate-x-1/2 rounded-full"
              style={{ top: `${valToPct(current)}%`, backgroundColor: accent, boxShadow: `0 0 8px ${accent}` }}
            />

            {/* draggable threshold line */}
            <div
              className="absolute inset-x-0 -translate-y-1/2 cursor-ns-resize"
              style={{ top: `${valToPct(threshold)}%` }}
              onPointerDown={(e) => {
                e.preventDefault();
                draggingRef.current = true;
                setUserDragged(true);
              }}
            >
              <div
                className="h-0 border-t border-dashed"
                style={{ borderColor: firing ? "rgba(247,126,92,0.7)" : "rgba(255,255,255,0.4)" }}
              />
              <span
                className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-md px-1.5 py-[2px] font-mono text-[9px] font-medium shadow-sm"
                style={{
                  backgroundColor: firing ? "rgba(247,126,92,0.16)" : "rgba(255,255,255,0.1)",
                  color: firing ? "#F77E5C" : "rgba(255,255,255,0.7)"
                }}
              >
                <ChevronsUpDown size={9} />
                {r.fmt(threshold)}
              </span>
            </div>

            <span className="absolute left-0 top-1 font-mono text-[8.5px] text-white/30">
              drag threshold ↕
            </span>
          </div>

          {/* Alert routing card - flips healthy <-> firing on breach */}
          <div
            className="mt-4 flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors"
            style={{ backgroundColor: firing ? "rgba(247,126,92,0.08)" : "rgba(52,211,153,0.07)" }}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
              style={{
                backgroundColor: firing ? "rgba(247,126,92,0.14)" : "rgba(52,211,153,0.14)",
                color: accent
              }}
            >
              {firing ? <AlertTriangle size={13} strokeWidth={2} /> : <Check size={13} strokeWidth={2.5} />}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-sans text-[12px] font-medium text-white">
                {firing ? r.rule(threshold) : "All clear · within threshold"}
              </div>
              <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-white/45">
                {firing ? (
                  <>
                    <span className="flex items-center gap-1">
                      <Hash size={10} strokeWidth={2} /> Slack #ops-voice
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1">
                      <Phone size={10} strokeWidth={2} /> on-call paged
                    </span>
                  </>
                ) : (
                  <span>routing armed · Slack · on-call</span>
                )}
              </div>
            </div>
            <span
              className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em]"
              style={{ color: accent }}
            >
              {firing ? "firing" : "healthy"}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
