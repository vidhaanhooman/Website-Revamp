"use client";

import { Sparkles, Wand2, Phone, Check } from "lucide-react";

const VOICES = [
  { name: "Maya", lang: "Hindi · English", active: true },
  { name: "Aarav", lang: "Tamil · English" },
  { name: "Priya", lang: "Marathi · Hindi" },
  { name: "Vivaan", lang: "English" }
];

export function StudioMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline bg-white shadow-lift dark:border-white/10 dark:bg-[#15131A] dark:shadow-[0_24px_60px_-10px_rgba(0,0,0,0.6)]">
      {/* Top chrome */}
      <div className="flex items-center justify-between border-b border-hairline px-3.5 py-2.5 dark:border-white/8">
        <div className="flex items-center gap-2 text-[12.5px] font-medium text-ink dark:text-white">
          <Wand2 size={12} strokeWidth={1.75} />
          Agent · Brightside Receptionist
        </div>
        <span className="rounded-md bg-ink px-2 py-0.5 text-[10.5px] font-semibold text-white dark:bg-white dark:text-[#15131A]">
          Saved
        </span>
      </div>

      {/* Voice picker */}
      <div className="border-b border-hairline px-3.5 py-3.5 dark:border-white/8">
 <div className="mb-2 font-sans text-[9.5px] tracking-[0.04em] text-ink/55 dark:text-white/55">
          Voice
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {VOICES.map((v) => (
            <div
              key={v.name}
              className={
                "flex items-center justify-between rounded-lg border px-2.5 py-2 " +
                (v.active
                  ? "border-[#3B6BD8]/40 bg-[#3B6BD8]/8 dark:border-[#7AB6F0]/40 dark:bg-[#7AB6F0]/8"
                  : "border-hairline bg-ink/[0.02] dark:border-white/10 dark:bg-white/[0.03]")
              }
            >
              <div>
                <div className="text-[11.5px] font-medium text-ink dark:text-white">
                  {v.name}
                </div>
                <div className="font-mono text-[9.5px] text-ink/55 dark:text-white/55">
                  {v.lang}
                </div>
              </div>
              {v.active ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3B6BD8] text-white dark:bg-[#7AB6F0] dark:text-[#15131A]">
                  <Check size={9} strokeWidth={3} />
                </span>
              ) : (
                <span className="h-4 w-4 rounded-full border border-ink/15 dark:border-white/15" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="border-b border-hairline px-3.5 py-3 dark:border-white/8">
        {[
          { label: "Warmth", value: 72 },
          { label: "Pace", value: 58 },
          { label: "Code-switch readiness", value: 84 }
        ].map((s) => (
          <div key={s.label} className="mt-2.5 first:mt-0">
            <div className="mb-1 flex items-center justify-between text-[10.5px] text-ink/75 dark:text-white/75">
              <span>{s.label}</span>
              <span className="font-mono text-ink/60 dark:text-white/60">{s.value}</span>
            </div>
            <div className="relative h-1 w-full rounded-full bg-ink/8 dark:bg-white/8">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-ink dark:bg-white"
                style={{ width: `${s.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Action row */}
      <div className="flex items-center justify-between px-3.5 py-3">
        <div className="flex items-center gap-1.5 text-[10.5px] text-ink/65 dark:text-white/65">
          <Sparkles size={11} strokeWidth={1.75} />
          Trained on 1,284 calls
        </div>
        <button className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[11.5px] font-semibold text-white dark:bg-white dark:text-[#15131A]">
          <Phone size={11} strokeWidth={2} />
          Test call
        </button>
      </div>
    </div>
  );
}
