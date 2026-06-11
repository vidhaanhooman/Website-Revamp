"use client";

import { Mic, MoreHorizontal } from "lucide-react";

const LINES: { who: "agent" | "patient"; lang: string; t: string; ms?: string }[] = [
  {
    who: "patient",
    lang: "हिन्दी",
    t: "हैलो, मुझे कल का अपॉइंटमेंट दूसरे दिन शिफ्ट करना है।"
  },
  {
    who: "agent",
    lang: "EN",
    ms: "276ms",
    t: "Of course — your 10:30 with Dr. Patel. Want Tuesday 2:15 PM instead?"
  },
  {
    who: "patient",
    lang: "Hinglish",
    t: "Tuesday 2:15 perfect hai. SMS bhej do please."
  },
  {
    who: "agent",
    lang: "EN",
    ms: "248ms",
    t: "Done — Tuesday 19th, 2:15 PM. Confirmation sent to your number."
  }
];

export function TranscriptMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-lift dark:border-white/10 dark:bg-[#15131A] dark:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.6)]">
      {/* Top chrome */}
      <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5 dark:border-white/8">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink/[0.06] dark:bg-white/[0.06]">
            <Mic size={11} strokeWidth={1.75} className="text-[#3B6BD8] dark:text-[#7AB6F0]" />
          </span>
          <div>
            <div className="text-[12.5px] font-medium text-ink dark:text-white">
              +91 98765 43210
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/50 dark:text-white/50">
              Maya · Brightside · 02:14
            </div>
          </div>
        </div>
        <button className="text-ink/55 transition-colors hover:text-ink dark:text-white/55 dark:hover:text-white">
          <MoreHorizontal size={14} />
        </button>
      </div>

      {/* Transcript */}
      <div className="flex flex-col gap-2.5 p-3.5">
        {LINES.map((l, i) => (
          <div
            key={i}
            className={
              "flex max-w-[88%] flex-col gap-1 " +
              (l.who === "patient"
                ? "items-start self-start"
                : "items-end self-end")
            }
          >
            <span
              className={
                "font-mono text-[9.5px] uppercase tracking-[0.16em] " +
                (l.who === "agent"
                  ? "text-[#3B6BD8] dark:text-[#7AB6F0]"
                  : "text-ink/55 dark:text-white/55")
              }
            >
              {l.who === "agent" ? "Maya" : "Patient"} · {l.lang}
              {l.ms ? (
                <span className="text-ink/45 dark:text-white/45"> · {l.ms}</span>
              ) : null}
            </span>
            <span
              className={
                "rounded-xl px-3 py-2 text-[12px] leading-snug " +
                (l.who === "agent"
                  ? "rounded-br-md bg-[#3B6BD8] text-white"
                  : "rounded-bl-md border border-hairline bg-ink/[0.03] text-ink/90 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/90")
              }
            >
              {l.t}
            </span>
          </div>
        ))}
      </div>

      {/* Waveform footer */}
      <div className="flex items-end gap-0.5 border-t border-hairline px-3.5 py-3 dark:border-white/8">
        {Array.from({ length: 42 }, (_, i) => {
          const h = 4 + Math.abs(Math.sin(i * 0.7 + 1.2) * Math.cos(i * 0.3)) * 18;
          return (
            <span
              key={i}
              className="w-[2px] rounded-sm bg-ink/40 dark:bg-white/30"
              style={{ height: `${h}px` }}
            />
          );
        })}
      </div>
    </div>
  );
}
