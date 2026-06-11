"use client";

import { LineChart, TrendingUp, AlertCircle } from "lucide-react";

const BARS = [
  { d: "Mon", v: 0.55 },
  { d: "Tue", v: 0.71 },
  { d: "Wed", v: 0.66 },
  { d: "Thu", v: 0.84 },
  { d: "Fri", v: 0.78 },
  { d: "Sat", v: 0.42 },
  { d: "Sun", v: 0.36 }
];

const TRENDS = [88, 89, 91, 90, 92, 93, 92, 94, 95, 95, 96, 96, 96];

const REASONS = [
  { label: "Patient asked for human", count: "143" },
  { label: "Off-script: insurance verification", count: "62" },
  { label: "Caller spoke Bengali (out of support)", count: "31" }
];

export function InsightsMock() {
  const max = Math.max(...TRENDS);
  const min = Math.min(...TRENDS);
  const span = max - min || 1;
  const points = TRENDS.map((v, i) => {
    const x = (i / (TRENDS.length - 1)) * 240;
    const y = 8 + (1 - (v - min) / span) * 36;
    return [x, y] as const;
  });
  const linePath = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");
  const areaPath = `${linePath} L${points[points.length - 1][0]},52 L${points[0][0]},52 Z`;

  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-lift dark:border-white/10 dark:bg-[#15131A] dark:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5 dark:border-white/8">
        <div className="flex items-center gap-2 text-[12.5px] font-medium text-ink dark:text-white">
          <LineChart size={12} strokeWidth={1.75} />
          Insights · last 14 days
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 dark:text-white/55">
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3.5">
        {/* Call volume */}
        <div className="rounded-lg border border-hairline bg-ink/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 dark:text-white/55">
            Calls / day
          </div>
          <div className="mt-1 text-[15px] font-medium text-ink dark:text-white">9,142</div>
          <div className="mt-2 flex items-end gap-1">
            {BARS.map((b) => (
              <div key={b.d} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm bg-ink/60 dark:bg-white/60"
                  style={{ height: `${b.v * 36}px` }}
                />
                <span className="font-mono text-[8.5px] text-ink/45 dark:text-white/45">
                  {b.d}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CSAT trend */}
        <div className="rounded-lg border border-hairline bg-ink/[0.02] p-3 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 dark:text-white/55">
            CSAT
          </div>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-[15px] font-medium text-ink dark:text-white">96.2%</span>
            <span className="inline-flex items-center gap-0.5 font-mono text-[9.5px] text-[#3B6BD8] dark:text-[#7AB6F0]">
              <TrendingUp size={9} strokeWidth={2.5} />
              +2.4
            </span>
          </div>
          <svg
            viewBox="0 0 240 56"
            width="100%"
            height="56"
            className="mt-1"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="csat-grad-2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.45" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="text-[#3B6BD8] dark:text-[#7AB6F0]">
              <path d={areaPath} fill="url(#csat-grad-2)" />
              <path
                d={linePath}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>
      </div>

      {/* Reasons list */}
      <div className="border-t border-hairline px-3.5 pb-3.5 pt-2 dark:border-white/8">
        <div className="mb-2 flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-ink/55 dark:text-white/55">
          <AlertCircle size={10} strokeWidth={1.75} />
          Why calls escalated
        </div>
        <ul className="grid gap-1">
          {REASONS.map((r) => (
            <li
              key={r.label}
              className="flex items-center justify-between rounded-md border border-hairline bg-ink/[0.02] px-2.5 py-1.5 text-[11px] dark:border-white/10 dark:bg-white/[0.03]"
            >
              <span className="text-ink/85 dark:text-white/85">{r.label}</span>
              <span className="font-mono text-ink/55 dark:text-white/55">{r.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
