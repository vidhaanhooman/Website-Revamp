"use client";

import { useEffect, useState } from "react";
import {
  Calendar,
  Target,
  Package,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  PhoneCall,
  Stethoscope
} from "lucide-react";

/* Baseline: on 2026-06-12 00:00 UTC the count is 45,000,000.
   Growth: 200,000 calls per day → ~2.315 calls per second. */
const BASE_DATE_UTC = Date.UTC(2026, 5, 12); // June = 5 (0-indexed)
const BASE_COUNT = 45_000_000;
const DAILY_GROWTH = 200_000;
const CALLS_PER_SECOND = DAILY_GROWTH / 86_400;

function getCurrentCount(): number {
  const secondsSinceBase = (Date.now() - BASE_DATE_UTC) / 1000;
  return Math.floor(
    BASE_COUNT + Math.max(0, secondsSinceBase) * CALLS_PER_SECOND
  );
}

const STATS = [
  { value: "<500ms", label: "Voice latency" },
  { value: "99.99%", label: "Platform uptime" },
  { value: "22", label: "Languages supported" },
  { value: "150+", label: "Cities connected" }
];

const USE_CASES = [
  { label: "Lead qualification", Icon: Target },
  { label: "Order tracking", Icon: Package },
  { label: "Payment collection", Icon: CreditCard },
  { label: "Feedback surveys", Icon: MessageSquare },
  { label: "Insurance verification", Icon: ShieldCheck },
  { label: "Appointments", Icon: Calendar },
  { label: "Follow-up calls", Icon: PhoneCall },
  { label: "Clinical triage", Icon: Stethoscope }
];

/* ─── Rolling odometer digit ──────────────────────────────────── */
function RollingDigit({ d }: { d: string }) {
  const n = parseInt(d, 10);
  return (
    <span
      className="relative inline-block overflow-hidden align-baseline tabular-nums"
      style={{ height: "1em", width: "0.6em" }}
    >
      <span
        className="flex flex-col transition-transform duration-700 ease-out"
        style={{ transform: `translateY(-${n * 10}%)` }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className="flex items-center justify-center leading-none"
            style={{ height: "1em" }}
          >
            {i}
          </span>
        ))}
      </span>
    </span>
  );
}

function RollingNumber({ value }: { value: number }) {
  const chars = value.toLocaleString("en-US").split("");
  return (
    <span className="inline-flex items-baseline">
      {chars.map((c, i) =>
        /\d/.test(c) ? (
          <RollingDigit key={i} d={c} />
        ) : (
          <span key={i} className="inline-block" style={{ width: "0.3em" }}>
            {c}
          </span>
        )
      )}
      <span className="text-white/30">+</span>
    </span>
  );
}

export function CallsCounter() {
  const [count, setCount] = useState<number>(BASE_COUNT);

  useEffect(() => {
    setCount(getCurrentCount());
    const id = setInterval(() => setCount(getCurrentCount()), 350);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-6 py-16 md:py-20">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.015]">
          {/* TOP - big rolling counter, left aligned */}
          <div className="relative px-7 pt-10 md:px-12 md:pt-14">
            {/* webcounter.png - large feature image anchored to the right,
                spans the full height of the counter block for more weight */}
            <div
              aria-hidden
              className="pointer-events-none absolute right-2 top-2 bottom-0 hidden w-[30%] bg-contain bg-right-bottom bg-no-repeat opacity-95 md:block lg:right-4 lg:w-[31%]"
              style={{
                backgroundImage: "url('/webcounter.png')",
                maskImage:
                  "linear-gradient(to right, transparent 0%, black 22%, black 100%), linear-gradient(to bottom, black 60%, transparent 95%)",
                maskComposite: "intersect",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, black 22%, black 100%), linear-gradient(to bottom, black 60%, transparent 95%)",
                WebkitMaskComposite: "source-in"
              }}
            />

 <p className="flex items-center gap-2 font-sans text-[10.5px] font-medium tracking-[0.04em] text-white/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live · ticking now
            </p>
            <div
              className="mt-4 font-dmsans font-bold leading-[0.95] tracking-[-0.03em] text-white"
              style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
              aria-live="polite"
            >
              <RollingNumber value={count} />
            </div>
            <p className="mt-3 max-w-md font-sans text-[15px] leading-[1.55] text-white/55 md:text-[16px]">
              minutes of customer conversations handled by HoomanLabs AI agents.
            </p>
          </div>

          {/* STATS - 4-column hairline grid */}
          <div className="relative mt-10 grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={
                  "px-7 py-6 md:px-7 md:py-7 " +
                  (i < STATS.length - 1
                    ? "md:border-r md:border-white/10 "
                    : "") +
                  (i < 2 ? "border-b border-white/10 md:border-b-0 " : "") +
                  (i % 2 === 0 ? "border-r border-white/10 md:border-r " : "")
                }
              >
                <div className="font-sans text-[24px] font-bold tracking-tight text-white md:text-[28px]">
                  {s.value}
                </div>
 <div className="mt-1.5 font-sans text-[10px] font-medium tracking-[0.04em] text-white/45">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* USE-CASE STRIP - infinite marquee */}
          <div
            className="relative overflow-hidden border-t border-white/10 py-4 md:py-5"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)"
            }}
          >
            <ul className="marquee-track flex w-max items-center gap-9 whitespace-nowrap md:gap-12 motion-reduce:animate-none">
              {[...USE_CASES, ...USE_CASES].map(({ label, Icon }, i) => (
                <li
                  key={`${label}-${i}`}
 className="flex shrink-0 items-center gap-2 font-sans text-[11px] font-medium tracking-[0.04em] text-white/55"
                  aria-hidden={i >= USE_CASES.length ? true : undefined}
                >
                  <Icon size={13} strokeWidth={1.75} className="text-[#F77E5C]/70" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
