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
  { value: "1,200+", label: "Agents deployed" }
];

const USE_CASES = [
  { label: "Appointments", Icon: Calendar },
  { label: "Lead qualification", Icon: Target },
  { label: "Order tracking", Icon: Package },
  { label: "Payment collection", Icon: CreditCard },
  { label: "Feedback surveys", Icon: MessageSquare },
  { label: "Insurance verification", Icon: ShieldCheck },
  { label: "Follow-up calls", Icon: PhoneCall },
  { label: "Clinical triage", Icon: Stethoscope }
];

export function CallsCounter() {
  const [count, setCount] = useState<number>(BASE_COUNT);

  useEffect(() => {
    setCount(getCurrentCount());
    const id = setInterval(() => setCount(getCurrentCount()), 350);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative px-4 py-20 md:py-24">
      <div className="mx-auto max-w-[1240px]">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0d]">
          {/* TOP - image spans full width, fades smoothly into dark right side */}
          <div className="relative min-h-[300px] sm:min-h-[380px] md:min-h-[460px]">
            {/* Full-width image */}
            <div
              aria-hidden
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/counter.png')" }}
            />
            {/* Long horizontal scrim - gradual transparent→dark across the whole panel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, transparent 30%, rgba(10,10,13,0.45) 55%, rgba(10,10,13,0.88) 78%, rgba(10,10,13,1) 100%)"
              }}
            />
            {/* Content grid sits over the scrim - only the right column has copy */}
            <div className="relative grid h-full md:grid-cols-2">
              <div aria-hidden />
              <div className="flex flex-col items-center justify-center px-8 py-14 text-center md:items-end md:px-14 md:py-20 md:text-right">
                <p className="flex items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  Live · ticking now
                </p>
                <div
                  className="mt-5 font-serif font-normal leading-[0.92] tracking-tight text-white tabular-nums drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]"
                  style={{ fontSize: "clamp(3.25rem, 9vw, 6.5rem)" }}
                  aria-live="polite"
                >
                  {count.toLocaleString("en-US")}
                  <span>+</span>
                </div>
                <p className="mt-5 max-w-sm font-sans text-[14.5px] leading-[1.55] text-white/75">
                  minutes of customer conversations handled by HoomanLabs voice
                  agents.
                </p>
              </div>
            </div>
          </div>

          {/* STATS - 4-column hairline grid */}
          <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={
                  "px-6 py-7 md:px-8 md:py-9 " +
                  (i < STATS.length - 1
                    ? "md:border-r md:border-white/10 "
                    : "") +
                  (i < 2 ? "border-b border-white/10 md:border-b-0 " : "") +
                  (i % 2 === 0 ? "border-r border-white/10 md:border-r " : "")
                }
              >
                <div className="font-sans text-[28px] font-semibold tracking-tight text-white md:text-[32px]">
                  {s.value}
                </div>
                <div className="mt-2 font-sans text-[10.5px] font-medium uppercase tracking-[0.2em] text-white/50">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* USE-CASE CHIP STRIP - infinite marquee */}
          <div
            className="relative overflow-hidden border-t border-white/10 py-5 md:py-6"
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
                  className="flex shrink-0 items-center gap-2 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/60"
                  aria-hidden={i >= USE_CASES.length ? true : undefined}
                >
                  <Icon
                    size={13}
                    strokeWidth={1.75}
                    className="text-white/45"
                  />
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
