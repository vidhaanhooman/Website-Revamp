"use client";

import { Phone, Search, Radio } from "lucide-react";

const ROWS = [
  {
    caller: "+91 98765 43210",
    label: "Patient · Brightside Dental",
    agent: "Maya",
    lang: "हिन्दी → EN",
    dur: "01:42",
    status: "live"
  },
  {
    caller: "+91 99887 12298",
    label: "New lead · Apex Plumbing",
    agent: "Aarav",
    lang: "EN",
    dur: "00:38",
    status: "live"
  },
  {
    caller: "+91 70200 54091",
    label: "Reschedule · Brookside Care",
    agent: "Maya",
    lang: "तमिल → EN",
    dur: "02:11",
    status: "live"
  },
  {
    caller: "+91 88229 11023",
    label: "Insurance · Meridian",
    agent: "Priya",
    lang: "मराठी",
    dur: "00:54",
    status: "queued"
  },
  {
    caller: "+91 91011 88720",
    label: "Follow-up · RyderHealth",
    agent: "Maya",
    lang: "EN",
    dur: "03:07",
    status: "live"
  }
];

export function CallsListMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-lift dark:border-white/10 dark:bg-[#15131A] dark:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.6)]">
      {/* Top chrome */}
      <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5 dark:border-white/8">
        <div className="flex items-center gap-2 text-[12px] text-ink/65 dark:text-white/65">
          <Search size={12} strokeWidth={1.75} />
          Filter by number, agent, language
        </div>
 <div className="flex items-center gap-1.5 rounded-md bg-ink/5 px-2 py-1 font-sans text-[10px] tracking-[0.04em] text-ink/70 dark:bg-white/[0.04] dark:text-white/70">
          <Radio size={10} strokeWidth={2} className="text-[#3B6BD8] dark:text-[#7AB6F0]" />
          Live · 14
        </div>
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between px-3.5 pt-3 text-[11px]">
        <span className="text-ink/75 dark:text-white/75">Active</span>
        <span className="text-ink/45 dark:text-white/45">5 of 14</span>
      </div>

      {/* Rows */}
      <ul className="px-2 py-2">
        {ROWS.map((r, i) => (
          <li
            key={r.caller}
            className={
              "flex items-center justify-between rounded-md px-2.5 py-2.5 text-[12px]" +
              (i === 0 ? " bg-ink/[0.04] dark:bg-white/[0.04]" : "")
            }
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-ink/[0.06] dark:bg-white/[0.06]">
                <Phone size={11} strokeWidth={1.75} className="text-ink/80 dark:text-white/80" />
              </span>
              <div className="min-w-0">
                <div className="truncate font-medium text-ink dark:text-white">
                  {r.caller}
                </div>
                <div className="truncate text-[10.5px] text-ink/55 dark:text-white/55">
                  {r.label}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-[10.5px]">
              <span className="hidden font-mono text-ink/60 sm:inline dark:text-white/60">
                {r.lang}
              </span>
              <span className="font-mono text-ink/75 dark:text-white/75">{r.dur}</span>
              <span
                className={
 "rounded-md border px-1.5 py-0.5 font-sans text-[9.5px] tracking-[0.04em] " +
                  (r.status === "live"
                    ? "border-[#3B6BD8]/40 bg-[#3B6BD8]/12 text-[#3B6BD8] dark:border-[#7AB6F0]/40 dark:bg-[#7AB6F0]/12 dark:text-[#7AB6F0]"
                    : "border-ink/15 bg-ink/[0.04] text-ink/70 dark:border-white/15 dark:bg-white/[0.04] dark:text-white/70")
                }
              >
                {r.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
