"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Mic,
  Phone,
  PhoneCall,
  MessageSquare,
  Smartphone,
  Globe
} from "lucide-react";

/* ─── Diagonal stripe edge (blueprint margin) ─────────────────── */
function StripeMargin({ side = "left" }: { side?: "left" | "right" }) {
  return (
    <div
      aria-hidden
      className={
        "pointer-events-none absolute top-0 hidden h-full w-24 md:block " +
        (side === "left" ? "left-0" : "right-0")
      }
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 12px)",
        WebkitMaskImage:
          side === "left"
            ? "linear-gradient(to right, black, transparent)"
            : "linear-gradient(to left, black, transparent)",
        maskImage:
          side === "left"
            ? "linear-gradient(to right, black, transparent)"
            : "linear-gradient(to left, black, transparent)"
      }}
    />
  );
}

/* ─── 1. BUILD - No-code agent builder canvas ─────────────────── */
function MockBuild() {
  return (
    <div className="w-full max-w-[540px]">
      <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0a0a0d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65)]">
        {/* macOS title bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28C841]" />
          </div>
          <span className="font-gilroy text-[11.5px] font-medium text-white/85">
            HoomanLabs No Code Agent Builder
          </span>
          <span className="font-mono text-[10px] text-white/40">100%</span>
        </div>

        {/* Canvas */}
        <div className="relative aspect-[5/3] overflow-hidden">
          {/* Dot grid */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.08) 0.8px, transparent 0.8px)",
              backgroundSize: "14px 14px"
            }}
          />

          {/* Connectors - viewBox 100×60 matches container 5:3 aspect.
              Y coords are (css_percent × 0.6) so they map to CSS top: percentages. */}
          <svg
            aria-hidden
            viewBox="0 0 100 60"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            {/* Trigger → AI Agent (green, horizontal at css y=50%) */}
            <line
              x1="24"
              y1="30"
              x2="40"
              y2="30"
              stroke="#34D399"
              strokeWidth="0.4"
            />
            <circle cx="24" cy="30" r="0.9" fill="#34D399" />
            <circle cx="32" cy="30" r="0.9" fill="#34D399" />
            <circle cx="40" cy="30" r="0.9" fill="#34D399" />

            {/* AI Agent single output (right side at css y=50%) */}
            <circle cx="70" cy="30" r="0.9" fill="#F77E5C" />

            {/* AI Agent → Result (css 26%) */}
            <line
              x1="70"
              y1="30"
              x2="78"
              y2="15.6"
              stroke="#4877D8"
              strokeWidth="0.4"
            />
            <circle cx="78" cy="15.6" r="0.9" fill="#4877D8" />

            {/* AI Agent → Handoff (css 74%) */}
            <line
              x1="70"
              y1="30"
              x2="78"
              y2="44.4"
              stroke="#4877D8"
              strokeWidth="0.4"
              strokeDasharray="1.4 0.9"
            />
            <circle cx="78" cy="44.4" r="0.9" fill="#4877D8" />
          </svg>

          {/* TRIGGER - right edge at x=24, center y=50 */}
          <div
            className="absolute"
            style={{
              left: "4%",
              top: "50%",
              width: "20%",
              transform: "translateY(-50%)"
            }}
          >
            <div className="rounded-md border border-white/15 bg-[#15151a] px-2 py-1.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#34D399] text-[8px] font-bold text-black">
                  ⚡
                </span>
                <span className="font-gilroy text-[10px] font-semibold text-white">
                  Trigger
                </span>
              </div>
              <div className="mt-1 border-t border-white/10 pt-1">
                <div className="font-gilroy text-[9.5px] font-medium text-white/90">
                  CRM
                </div>
                <div className="font-mono text-[8px] text-white/45">
                  received · Webhook
                </div>
              </div>
            </div>
          </div>

          {/* AI AGENT - left edge at x=40, right edge at x=70, center y=50 */}
          <div
            className="absolute"
            style={{
              left: "40%",
              top: "50%",
              width: "30%",
              transform: "translateY(-50%)"
            }}
          >
            <div className="rounded-md border-[1.5px] border-[#F77E5C] bg-[#15151a] px-2 py-1.5 shadow-[0_0_30px_-5px_rgba(247,126,92,0.55),0_8px_20px_-8px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#7257C7] text-[7px] font-bold text-white">
                  AI
                </span>
                <span className="font-gilroy text-[10px] font-semibold text-white">
                  AI Agent
                </span>
              </div>
              <div className="mt-1 border-t border-white/10 pt-1">
                <div className="font-gilroy text-[9.5px] font-medium text-white/90">
                  LLM
                </div>
                <div className="font-mono text-[8px] text-white/55">
                  Model · reasoning
                </div>
                <div className="font-mono text-[8px] text-white/55">
                  Tools: Search, Memory
                </div>
              </div>
            </div>
          </div>

          {/* RESULT - left edge at x=78, center y=26 */}
          <div
            className="absolute"
            style={{
              left: "78%",
              top: "26%",
              width: "20%",
              transform: "translateY(-50%)"
            }}
          >
            <div className="rounded-md border border-white/15 bg-[#15151a] px-2 py-1.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#4877D8] text-[9px] font-bold text-white">
                  #
                </span>
                <span className="font-gilroy text-[10px] font-semibold text-white">
                  Result
                </span>
              </div>
              <div className="mt-1 border-t border-white/10 pt-1">
                <div className="font-gilroy text-[9.5px] font-medium text-white/90">
                  CRM &amp; More
                </div>
                <div className="font-mono text-[8px] text-white/45">
                  Channel · #support
                </div>
              </div>
            </div>
          </div>

          {/* HUMAN HANDOFF - left edge at x=78, center y=74 */}
          <div
            className="absolute"
            style={{
              left: "78%",
              top: "74%",
              width: "20%",
              transform: "translateY(-50%)"
            }}
          >
            <div className="rounded-md border border-white/15 bg-[#15151a] px-2 py-1.5 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-sm bg-[#4877D8] text-[9px] font-bold text-white">
                  #
                </span>
                <span className="font-gilroy text-[10px] font-semibold text-white">
                  Human Handoff
                </span>
              </div>
              <div className="mt-1 border-t border-white/10 pt-1">
                <div className="font-gilroy text-[9.5px] font-medium text-white/90">
                  Agent
                </div>
                <div className="font-mono text-[8px] text-white/45">
                  Channel · #support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 2. SIMULATION - minimal waveform lanes ──────────────────── */
type TestLane = {
  label: string;
  status: "pass" | "fail" | "run";
  progress?: number; // 0-1, only for running tests
};

function Wave({
  idx,
  status,
  progress
}: {
  idx: number;
  status: TestLane["status"];
  progress?: number;
}) {
  const W = 100;
  const H = 22;
  const SAMPLES = 72;

  // Deterministic organic-looking waveform - sum of sines at multiple frequencies
  const points = Array.from({ length: SAMPLES }, (_, i) => {
    const x = (i / (SAMPLES - 1)) * W;
    const s = idx * 31 + i;
    const amp =
      Math.sin(s * 0.32) * 0.5 +
      Math.sin(s * 0.71) * 0.25 +
      Math.cos(s * 1.13) * 0.15;
    const y = H / 2 + amp * (H / 2 - 2);
    return { x, y };
  });

  const linePath = points
    .map(
      (p, i) =>
        (i === 0 ? "M" : "L") + ` ${p.x.toFixed(2)} ${p.y.toFixed(2)}`
    )
    .join(" ");
  const fillPath = `${linePath} L ${W} ${H} L 0 ${H} Z`;

  const lineColor =
    status === "fail"
      ? "rgba(229,65,59,0.55)"
      : "rgba(255,255,255,0.32)";
  const fillColor =
    status === "fail"
      ? "rgba(229,65,59,0.08)"
      : "rgba(255,255,255,0.04)";

  const playhead = progress !== undefined ? progress * W : null;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="block h-6 w-full"
      aria-hidden
    >
      {/* Played portion (running only) - soft amber wash */}
      {playhead !== null ? (
        <>
          <defs>
            <clipPath id={`played-${idx}`}>
              <rect x="0" y="0" width={playhead} height={H} />
            </clipPath>
          </defs>
          <path
            d={fillPath}
            fill="rgba(252,211,77,0.14)"
            clipPath={`url(#played-${idx})`}
          />
          <path
            d={linePath}
            stroke="rgba(252,211,77,0.7)"
            strokeWidth="0.55"
            fill="none"
            strokeLinejoin="round"
            clipPath={`url(#played-${idx})`}
          />
        </>
      ) : null}

      {/* Base waveform */}
      <path d={fillPath} fill={fillColor} />
      <path
        d={linePath}
        stroke={lineColor}
        strokeWidth="0.5"
        fill="none"
        strokeLinejoin="round"
      />

      {/* Playhead line */}
      {playhead !== null ? (
        <line
          x1={playhead}
          y1="0"
          x2={playhead}
          y2={H}
          stroke="rgba(252,211,77,0.95)"
          strokeWidth="0.3"
        />
      ) : null}

    </svg>
  );
}

function StatusLabel({ status }: { status: TestLane["status"] }) {
  const map = {
    pass: { label: "Pass", color: "text-emerald-400" },
    fail: { label: "Fail", color: "text-[#FF8A7A]" },
    run: { label: "Running", color: "text-amber-300" }
  };
  const { label, color } = map[status];
  return (
    <span
      className={
        "shrink-0 font-sans text-[10px] font-medium uppercase tracking-[0.2em] " +
        color
      }
    >
      {status === "run" ? (
        <span className="mr-1.5 inline-block h-1 w-1 animate-pulse rounded-full bg-amber-300 align-middle" />
      ) : null}
      {label}
    </span>
  );
}

function MockSimulation() {
  const tests: TestLane[] = [
    { label: "Patient interrupts mid-sentence", status: "pass" },
    { label: "Insurance verification timeout", status: "fail" },
    { label: "Tamil speaker over noisy line", status: "run", progress: 0.55 }
  ];

  return (
    <div className="space-y-6">
      {/* Quiet header strip */}
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 font-sans text-[10.5px] uppercase tracking-[0.2em]">
        <span className="flex items-center gap-1.5 text-white/55">
          <span className="h-1 w-1 animate-pulse rounded-full bg-amber-300" />
          Simulating · live
        </span>
        <span className="text-white/45">
          <span className="font-semibold text-white/90">16,231</span> scenarios
        </span>
      </div>

      {/* Waveform lanes */}
      <div className="space-y-5">
        {tests.map((t, i) => (
          <div key={t.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <span className="truncate font-sans text-[12.5px] font-medium text-white/90">
                {t.label}
              </span>
              <StatusLabel status={t.status} />
            </div>
            <Wave idx={i} status={t.status} progress={t.progress} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── OBSERVABILITY - compact event log ───────────────────────── */
function MockObservability() {
  // Deterministic 24-step sparkline data - call volume across last 24h.
  const SPARK = Array.from({ length: 24 }, (_, i) => {
    const s = i;
    const v =
      0.45 +
      0.35 * Math.abs(Math.sin(s * 0.38)) +
      0.25 * Math.abs(Math.cos(s * 0.71 + 1)) +
      (i > 14 && i < 19 ? 0.18 : 0); // afternoon peak
    return Math.min(1, v);
  });
  const SPARK_W = 100;
  const SPARK_H = 22;
  const points = SPARK.map((v, i) => ({
    x: (i / (SPARK.length - 1)) * SPARK_W,
    y: SPARK_H - v * (SPARK_H - 2) - 1
  }));
  const linePath = points
    .map((p, i) => (i === 0 ? "M" : "L") + ` ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(" ");
  const fillPath = `${linePath} L ${SPARK_W} ${SPARK_H} L 0 ${SPARK_H} Z`;

  return (
    <div className="relative space-y-3">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 0.8px, transparent 0.8px)",
          backgroundSize: "12px 12px"
        }}
      />

      {/* Event log */}
      <div className="relative space-y-3 rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] tabular-nums text-white/45">
            12:37:16
          </span>
          <span className="flex items-center gap-1.5 font-sans text-[9.5px] uppercase tracking-[0.22em] text-emerald-300/85">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>

        <div>
          <h4 className="font-sans text-[14px] font-semibold leading-[1.3] tracking-tight text-emerald-300">
            Booked Tuesday 2:15 PM with Dr. Patel.
          </h4>
          <p className="mt-1 font-sans text-[12px] leading-[1.5] text-white/55">
            SMS sent to +91 98765 43210.
          </p>
        </div>

        <ul className="space-y-1 border-t border-white/[0.06] pt-3">
          {[
            { t: "12:34:47", msg: "Greeted patient in Hindi." },
            { t: "12:35:14", msg: "Verified caller identity." },
            { t: "12:35:58", msg: "Pulled appointment with Dr. Patel." },
            { t: "12:36:21", msg: "Offered Tuesday 2:15 PM slot." },
            { t: "12:37:14", msg: "Patient confirmed slot." }
          ].map((e) => (
            <li key={e.t} className="flex gap-2.5 font-sans text-[11.5px]">
              <span className="w-14 shrink-0 tabular-nums text-white/40">
                {e.t}
              </span>
              <span className="truncate text-white/75">{e.msg}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Metrics summary - fills the space below the log */}
      <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] p-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/45">
            Calls · last 24h
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] tabular-nums text-emerald-300/75">
            ↑ 12.4%
          </span>
        </div>
        <div className="mt-1.5 flex items-end justify-between gap-3">
          <span className="font-sans text-[22px] font-semibold tabular-nums tracking-tight text-white">
            1,284
          </span>
          <svg
            viewBox={`0 0 ${SPARK_W} ${SPARK_H}`}
            preserveAspectRatio="none"
            className="block h-8 w-[68%]"
            aria-hidden
          >
            <path d={fillPath} fill="rgba(255,255,255,0.06)" />
            <path
              d={linePath}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="0.45"
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-white/[0.06] pt-3">
          <div>
            <div className="font-sans text-[13px] font-semibold tabular-nums text-white">
              96.2%
            </div>
            <div className="font-sans text-[9.5px] uppercase tracking-[0.18em] text-white/40">
              CSAT
            </div>
          </div>
          <div>
            <div className="font-sans text-[13px] font-semibold tabular-nums text-white">
              248ms
            </div>
            <div className="font-sans text-[9.5px] uppercase tracking-[0.18em] text-white/40">
              Latency
            </div>
          </div>
          <div>
            <div className="font-sans text-[13px] font-semibold tabular-nums text-white">
              98.1%
            </div>
            <div className="font-sans text-[9.5px] uppercase tracking-[0.18em] text-white/40">
              Resolved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── DEPLOY - two telephony paths: HoomanLabs or BYO ─────────── */
function HoomanMarkChip({ size = "md" }: { size?: "sm" | "md" }) {
  const px = size === "sm" ? 5 : 6;
  const iconPx = size === "sm" ? 8 : 9;
  return (
    <span
      className={`flex h-${px} w-${px} items-center justify-center rounded-md bg-white text-ink`}
      style={{
        height: `${px * 4}px`,
        width: `${px * 4}px`
      }}
    >
      <svg
        width={iconPx}
        height={iconPx + 1}
        viewBox="0 0 86 95"
        fill="currentColor"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M85.2106 7.55578V94.6962H52.1341C50.1303 94.6962 48.2085 93.9002 46.7916 92.4833C45.3746 91.0663 44.5786 89.1446 44.5786 87.1407V53.3927C44.5786 52.0568 44.0479 50.7756 43.1033 49.831C42.1587 48.8863 40.8775 48.3556 39.5416 48.3556H7.13675C6.69145 48.3556 6.26439 48.5325 5.94951 48.8474C5.63464 49.1623 5.45774 49.5894 5.45774 50.0347C5.45774 50.48 5.63464 50.907 5.94951 51.2219C6.26439 51.5368 6.69145 51.7137 7.13675 51.7137H38.5342C39.2467 51.7137 39.93 51.9967 40.4338 52.5005C40.9376 53.0043 41.2206 53.6876 41.2206 54.4001V94.6962H8.14416C6.1403 94.6962 4.21853 93.9002 2.80159 92.4833C1.38465 91.0663 0.588623 89.1446 0.588623 87.1407V0.000244141H33.6651C35.6689 0.000244141 37.5907 0.796273 39.0076 2.21321C40.4246 3.63015 41.2206 5.55192 41.2206 7.55578V41.1359C41.2206 42.4718 41.7513 43.753 42.6959 44.6976C43.6405 45.6423 44.9217 46.1729 46.2576 46.1729H78.6625C79.1078 46.1729 79.5348 45.996 79.8497 45.6812C80.1646 45.3663 80.3415 44.9392 80.3415 44.4939C80.3415 44.0486 80.1646 43.6216 79.8497 43.3067C79.5348 42.9918 79.1078 42.8149 78.6625 42.8149H47.265C46.5525 42.8149 45.8692 42.5319 45.3654 42.0281C44.8616 41.5243 44.5786 40.841 44.5786 40.1285V0.000244141H77.655C79.6589 0.000244141 81.5807 0.796273 82.9976 2.21321C84.4146 3.63015 85.2106 5.55192 85.2106 7.55578Z"
        />
      </svg>
    </span>
  );
}

function MockDeploy() {
  const carriers = [
    { label: "Plivo", short: "P", color: "#7B6AE5" },
    { label: "Exotel", short: "E", color: "#3FA8E3" },
    { label: "Tata Tele", short: "T", color: "#4076CB" },
    { label: "Twilio", short: "T", color: "#F0354A" }
  ];

  return (
    <div className="space-y-4">
      {/* Header - speed indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="flex items-center gap-1.5 font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/60">
          <span className="h-1 w-1 animate-pulse rounded-full bg-white" />
          Routed & live
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-white/55">
          Ready in{" "}
          <span className="font-semibold tracking-tight text-white">
            ~2 min
          </span>
        </span>
      </div>

      {/* PREFERRED - HoomanLabs Telephony at the top of the list */}
      <div className="relative overflow-hidden rounded-xl border-[1.5px] border-white/25 bg-white/[0.05] p-3.5 shadow-[0_10px_30px_-15px_rgba(255,255,255,0.18)]">
        {/* Subtle neutral glow from corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.08), transparent 55%)"
          }}
        />

        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <HoomanMarkChip />
              <div>
                <div className="font-sans text-[13px] font-semibold text-white">
                  HoomanLabs Telephony
                </div>
                <div className="font-sans text-[10.5px] text-white/60">
                  Managed Indian numbers · 50+ circles
                </div>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/35 bg-white/10 px-2 py-[3px] font-sans text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white">
              <Check size={9} strokeWidth={3} />
              Preferred
            </span>
          </div>

          {/* Active call mini-display */}
          <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-black/40 px-3 py-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-white/60">
                <PhoneCall size={9} strokeWidth={2.5} />
                Active call
              </div>
              <div className="mt-0.5 font-sans text-[14px] font-semibold tabular-nums tracking-tight text-white">
                +91 98765 43210
              </div>
              <div className="font-sans text-[10px] text-white/55">
                Mumbai · Brightside Dental
              </div>
            </div>
            <div className="flex items-end gap-[2px]">
              {[3, 5, 7, 9].map((h, i) => (
                <span
                  key={i}
                  className="w-[2px] rounded-sm bg-white/70"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* OR section header */}
      <div className="flex items-center gap-3 font-sans text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
        <span>Or bring your own</span>
        <span className="h-px flex-1 bg-white/[0.07]" />
      </div>

      {/* Carrier list - vertical, divided, BYO options */}
      <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        {carriers.map((c) => (
          <li
            key={c.label}
            className="flex items-center gap-3 px-3.5 py-2.5"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.04]"
              style={{
                boxShadow: `inset 0 -8px 14px -10px ${c.color}88`
              }}
            >
              <span
                className="font-sans text-[13px] font-bold leading-none"
                style={{ color: c.color }}
              >
                {c.short}
              </span>
            </span>
            <span className="font-sans text-[12.5px] font-medium text-white/90">
              {c.label}
            </span>
            <span className="ml-auto flex items-center gap-1.5 font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
              <span className="h-1 w-1 rounded-full bg-white/50" />
              Plug in
            </span>
          </li>
        ))}
      </ul>

      {/* Benefits row */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10.5px] text-white/55">
        <span className="flex items-center gap-1">
          <Check size={10} strokeWidth={2.5} className="text-white/70" />
          Keep DIDs
        </span>
        <span className="flex items-center gap-1">
          <Check size={10} strokeWidth={2.5} className="text-white/70" />
          Keep pricing
        </span>
        <span className="flex items-center gap-1">
          <Check size={10} strokeWidth={2.5} className="text-white/70" />
          No migration
        </span>
      </div>
    </div>
  );
}

/* ─── INTEGRATIONS - 3x3 logo grid ────────────────────────────── */
function MockIntegrations() {
  const logos: { label: string; color: string; mono?: boolean }[] = [
    { label: "HubSpot", color: "#FF7A59" },
    { label: "Salesforce", color: "#00A1E0" },
    { label: "Slack", color: "#4A154B" },
    { label: "Cal.com", color: "#FFFFFF", mono: true },
    { label: "WhatsApp", color: "#25D366" },
    { label: "Zapier", color: "#FF4F00" },
    { label: "Zoho", color: "#E1432B" },
    { label: "Notion", color: "#FFFFFF", mono: true },
    { label: "Razorpay", color: "#3D7EF7" }
  ];
  return (
    <div className="grid grid-cols-3 gap-2">
      {logos.map((l) => (
        <div
          key={l.label}
          className="flex aspect-square items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
        >
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full font-sans text-[13px] font-bold"
            style={{
              backgroundColor: l.color,
              color: l.mono ? "#000" : "#FFF"
            }}
          >
            {l.label[0]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─── BYOT - bring your own telephony ─────────────────────────── */
function MockBYOT() {
  const carriers = [
    { label: "Plivo", color: "#5B47E0" },
    { label: "Exotel", color: "#1F89C8" },
    { label: "Tata", color: "#1E5BBA" },
    { label: "Twilio", color: "#E1162D" }
  ];
  return (
    <div className="space-y-4">
      {/* Carrier pills row */}
      <div className="grid grid-cols-4 gap-2">
        {carriers.map((c) => (
          <div
            key={c.label}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-3"
          >
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full font-sans text-[11px] font-bold text-white"
              style={{ backgroundColor: c.color }}
            >
              {c.label[0]}
            </span>
            <span className="font-sans text-[10px] font-medium text-white/70">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Converging lines */}
      <svg
        aria-hidden
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
        className="h-7 w-full"
      >
        <path
          d="M12.5 0 Q 12.5 16 50 22"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M37.5 0 Q 37.5 14 50 22"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M62.5 0 Q 62.5 14 50 22"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M87.5 0 Q 87.5 16 50 22"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>

      {/* HoomanLabs hub */}
      <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink">
          <svg
            width="11"
            height="12"
            viewBox="0 0 86 95"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M85.2106 7.55578V94.6962H52.1341C50.1303 94.6962 48.2085 93.9002 46.7916 92.4833C45.3746 91.0663 44.5786 89.1446 44.5786 87.1407V53.3927C44.5786 52.0568 44.0479 50.7756 43.1033 49.831C42.1587 48.8863 40.8775 48.3556 39.5416 48.3556H7.13675C6.69145 48.3556 6.26439 48.5325 5.94951 48.8474C5.63464 49.1623 5.45774 49.5894 5.45774 50.0347C5.45774 50.48 5.63464 50.907 5.94951 51.2219C6.26439 51.5368 6.69145 51.7137 7.13675 51.7137H38.5342C39.2467 51.7137 39.93 51.9967 40.4338 52.5005C40.9376 53.0043 41.2206 53.6876 41.2206 54.4001V94.6962H8.14416C6.1403 94.6962 4.21853 93.9002 2.80159 92.4833C1.38465 91.0663 0.588623 89.1446 0.588623 87.1407V0.000244141H33.6651C35.6689 0.000244141 37.5907 0.796273 39.0076 2.21321C40.4246 3.63015 41.2206 5.55192 41.2206 7.55578V41.1359C41.2206 42.4718 41.7513 43.753 42.6959 44.6976C43.6405 45.6423 44.9217 46.1729 46.2576 46.1729H78.6625C79.1078 46.1729 79.5348 45.996 79.8497 45.6812C80.1646 45.3663 80.3415 44.9392 80.3415 44.4939C80.3415 44.0486 80.1646 43.6216 79.8497 43.3067C79.5348 42.9918 79.1078 42.8149 78.6625 42.8149H47.265C46.5525 42.8149 45.8692 42.5319 45.3654 42.0281C44.8616 41.5243 44.5786 40.841 44.5786 40.1285V0.000244141H77.655C79.6589 0.000244141 81.5807 0.796273 82.9976 2.21321C84.4146 3.63015 85.2106 5.55192 85.2106 7.55578Z"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <div className="font-sans text-[12.5px] font-semibold text-white">
            HoomanLabs
          </div>
          <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/45">
            Your SIP, your numbers
          </div>
        </div>
        <span className="ml-auto flex items-center gap-1.5 font-sans text-[9.5px] uppercase tracking-[0.18em] text-emerald-300/85">
          <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
          Routed
        </span>
      </div>
    </div>
  );
}

/* ─── 4. OMNICHANNEL - phone mockup with channel tabs ─────────── */
function MockOmniCall() {
  const channels = [
    { label: "Voice", Icon: Phone, active: true },
    { label: "WhatsApp", Icon: Smartphone },
    { label: "SMS", Icon: MessageSquare },
    { label: "Web", Icon: Globe }
  ];
  return (
    <div className="relative h-full min-h-[440px]">
      {/* Cinematic backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #4a1a2b 0%, #c43c1a 35%, #e8702a 65%, #6e2952 100%)"
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 25%, rgba(255,210,150,0.35), transparent 55%)"
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 100 30"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[28%] w-full"
      >
        <polygon
          points="0,30 0,18 12,8 24,16 36,4 50,14 64,6 78,16 90,10 100,18 100,30"
          fill="rgba(0,0,0,0.45)"
        />
      </svg>

      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 md:p-10">
        {/* Floating channel toggle */}
        <div className="flex items-center gap-1 rounded-full border border-white/20 bg-black/40 p-1 backdrop-blur-md">
          {channels.map(({ label, Icon, active }) => (
            <span
              key={label}
              className={
                "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] " +
                (active
                  ? "bg-white text-ink"
                  : "text-white/65 hover:text-white")
              }
            >
              <Icon size={11} />
              {label}
            </span>
          ))}
        </div>

        {/* Phone */}
        <div className="relative h-[420px] w-[226px] rounded-[2.4rem] border-[3px] border-black bg-black shadow-[0_40px_80px_-20px_rgba(0,0,0,0.85)]">
          <div className="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-black" />
          <div className="absolute inset-[6px] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#160c1a] via-[#0b0510] to-black">
            <div className="px-4 pt-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-white">9:32</span>
                <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live
                </span>
              </div>
              <div className="mt-5">
                <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45">
                  Incoming · हिंदी
                </div>
                <div className="mt-1 font-gilroy text-[15px] font-semibold text-white">
                  +91 98765 43210
                </div>
                <div className="font-mono text-[10px] text-white/50">
                  Patient · Brightside Dental
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="relative">
                  <span className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gradient-to-br from-[#E5572E] to-[#7B294C] text-[18px] font-semibold text-white shadow-[0_0_0_4px_rgba(255,255,255,0.06)]">
                    M
                  </span>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-emerald-400/40 bg-emerald-400/15 px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300">
                    Maya
                  </span>
                </div>
              </div>
              <div className="mt-6 space-y-1.5">
                <div className="rounded-md bg-white/[0.05] p-2">
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-white/45">
                    Patient · हिं
                  </div>
                  <div className="mt-0.5 font-gilroy text-[10.5px] leading-snug text-white/85">
                    मेरा अपॉइंटमेंट मंगलवार को?
                  </div>
                </div>
                <div className="rounded-md border border-[#4877D8]/30 bg-[#4877D8]/15 p-2">
                  <div className="font-mono text-[8.5px] uppercase tracking-[0.15em] text-[#7AB6F0]">
                    Maya · EN · 248ms
                  </div>
                  <div className="mt-0.5 font-gilroy text-[10.5px] leading-snug text-white/90">
                    Tuesday 19th, 2:15 PM with Dr. Patel.
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-x-4 bottom-4 flex justify-around">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <Mic size={14} />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white"
              >
                <Phone size={14} className="rotate-[135deg]" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
              >
                <MessageSquare size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CONTEXT & MEMORY - tools + history + knowledgebase ──────── */
function MockContextMemory() {
  const tools = [
    { label: "Search", color: "#7AB6F0" },
    { label: "Calendar", color: "#F77E5C" },
    { label: "Memory", color: "#7257C7" },
    { label: "Payments", color: "#3E9E72" },
    { label: "Verification", color: "#FFD166" }
  ];
  const history = [
    { when: "3 days ago", what: "Confirmed Tuesday slot · Hindi" },
    { when: "11 days ago", what: "Rescheduled to Dr. Patel" },
    { when: "1 month ago", what: "Filed insurance claim" }
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* TOOLS */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
            Tools
          </span>
          <span className="font-sans text-[10.5px] tabular-nums text-white/45">
            5 active
          </span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {tools.map((t) => (
            <li
              key={t.label}
              className="flex items-center gap-2 rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5"
            >
              <span
                className="h-1.5 w-1.5 rounded-sm"
                style={{ backgroundColor: t.color }}
              />
              <span className="font-sans text-[12.5px] font-medium text-white/80">
                {t.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* HISTORY */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
            History
          </span>
          <span className="font-sans text-[10.5px] tabular-nums text-white/45">
            +91 98765 43210
          </span>
        </div>
        <ul className="mt-3 space-y-3">
          {history.map((h) => (
            <li key={h.when} className="border-l-2 border-white/15 pl-3">
              <div className="font-sans text-[10px] uppercase tracking-[0.18em] text-white/40">
                {h.when}
              </div>
              <div className="mt-0.5 font-sans text-[12.5px] font-medium leading-snug text-white/80">
                {h.what}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* KNOWLEDGEBASE */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
        <div className="flex items-center justify-between">
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/55">
            Knowledgebase
          </span>
          <span className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.18em] text-emerald-300/85">
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-400" />
            Synced
          </span>
        </div>
        <div className="mt-3 space-y-2.5">
          <div>
            <div className="font-sans text-[26px] font-semibold tabular-nums tracking-tight text-white">
              1,247
            </div>
            <div className="font-sans text-[10.5px] uppercase tracking-[0.18em] text-white/45">
              documents indexed
            </div>
          </div>
          <ul className="space-y-1.5 border-t border-white/[0.06] pt-2.5">
            {[
              { label: "Brightside SOP", chunks: 342 },
              { label: "Pricing & plans", chunks: 128 },
              { label: "Compliance notes", chunks: 89 }
            ].map((d) => (
              <li
                key={d.label}
                className="flex items-center justify-between font-sans text-[11.5px]"
              >
                <span className="truncate text-white/75">{d.label}</span>
                <span className="ml-2 shrink-0 tabular-nums text-white/40">
                  {d.chunks}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ─── Page composition ────────────────────────────────────────── */

export function FeatureBento() {
  return (
    <section className="relative px-4 pb-24 pt-32 md:pt-40">
      <StripeMargin side="left" />
      <StripeMargin side="right" />

      <div className="mx-auto max-w-[1240px]">
        {/* HERO STRIP - single column with image bg */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-white/10"
        >
          {/* Background image */}
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/FeatureHeader.png')"
            }}
          />
          {/* Dark scrim - keeps text legible over any image */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.45) 100%)"
            }}
          />
          <div className="relative flex flex-col px-6 py-14 md:px-12 md:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/65">
              [01] &nbsp; Features
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.25rem,4.6vw,3.5rem)] font-normal leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]">
              Conversations without borders.
            </h1>
            <p className="mt-5 max-w-xl text-[15px] font-medium leading-[1.6] text-white/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              Real-time voice AI engineered for global scale: 100+ languages,
              sub-second latency, 99.99% uptime. Wherever your customers are,
              we&apos;re already there.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <a
                href="/#agent-demo"
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 font-gilroy text-[13.5px] font-medium text-ink transition-colors hover:bg-white/85"
              >
                Try a live demo
                <ArrowUpRight size={14} strokeWidth={2.25} />
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-black/30 px-5 py-2.5 font-gilroy text-[13.5px] font-medium text-white backdrop-blur-sm hover:bg-black/50"
              >
                See pricing
              </a>
            </div>
          </div>
        </motion.div>

        {/* 2 × 2 grid - Build, Simulate, Deploy, Observability.
            Typography-led overview. Rich mocks live on /features/details. */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 md:auto-rows-fr">
          {[
            {
              eyebrow: "Build",
              title: "Ship a production-ready agent in an afternoon.",
              description:
                "Describe what you want in plain English or Hindi. HoomanLabs writes the prompts, wires up the tools, and remembers every caller - your ops team launches the same day, no engineers.",
              href: "/features/details#build",
              cta: "See how it works"
            },
            {
              eyebrow: "Simulate",
              title: "Run every scenario. Vibe-check the tone.",
              description:
                "Every change runs through 16,000+ conversational scenarios. A side-by-side vibe-check so you hear the difference, not just read the diff.",
              href: "/features/details#simulate",
              cta: "See the simulator"
            },
            {
              eyebrow: "Deploy",
              title: "Live in minutes. Our telephony or yours.",
              description:
                "Pick a HoomanLabs number and route calls in minutes - or plug your Plivo, Exotel, Tata, or Twilio line straight in. Same agent, same SIP, no migration.",
              href: "/features/details#deploy",
              cta: "See deployment"
            },
            {
              eyebrow: "Observability",
              title: "See exactly what happens, every time.",
              description:
                "Watch every call in real time - flagged moments, tool calls, full audit trail. Search across millions of conversations.",
              href: "/features/details#observability",
              cta: "See the dashboard"
            }
          ].map((card) => (
            <Link
              key={card.eyebrow}
              href={card.href}
              className="group relative block h-full"
            >
              <article className="relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-8 transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.035] md:min-h-[320px] md:p-10">
                {/* Arrow chip - subtle by default, lights up on hover */}
                <span className="absolute right-5 top-5 z-10 flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-black/30 text-white/45 transition-all duration-300 group-hover:border-white/35 group-hover:bg-black/55 group-hover:text-white">
                  <ArrowUpRight size={13} strokeWidth={2.2} />
                </span>

                {/* Content block */}
                <div>
                  <p className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-4 max-w-md pr-10 font-sans text-[22px] font-semibold leading-[1.15] tracking-tight text-white md:text-[26px]">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-md text-[14.5px] leading-[1.6] text-white/65">
                    {card.description}
                  </p>
                </div>

                {/* Quiet CTA at the bottom */}
                <span className="mt-8 inline-flex items-center gap-1.5 font-sans text-[12.5px] font-medium uppercase tracking-[0.18em] text-white/55 transition-all duration-300 group-hover:gap-2 group-hover:text-white">
                  {card.cta}
                  <ArrowUpRight size={13} strokeWidth={2.25} />
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
