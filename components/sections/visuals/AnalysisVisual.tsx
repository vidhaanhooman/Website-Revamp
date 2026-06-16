"use client";

/* Analysis - post-call output we deliver: call summary, outcome, objective and
   structured extraction. Two solid, straight cards on the sky backdrop; click a
   card to expand it for the full detail. Re-animates on `active`. */

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";

const FIELDS: [string, string, number][] = [
  ["intent", "loan_enquiry", 98],
  ["product", "personal_loan_3L", 95],
  ["language", "hi-IN", 99],
  ["callback_at", "2026-06-18T14:15", 92]
];

const FIELDS_MORE: [string, string, number][] = [
  ["emi_tenure", "24_months", 96],
  ["advisor", "adv_4821", 99]
];

const MOMENTS = [
  ["0:42", "Asked about EMI on a ₹3L loan"],
  ["1:58", "Compared 12- vs 24-month tenure"],
  ["3:10", "Booked Tuesday 2:15 PM callback"]
];

function FieldRow({
  k,
  v,
  conf,
  active,
  delay
}: {
  k: string;
  v: string;
  conf: number;
  active: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="grid grid-cols-[auto_1fr_46px] items-center gap-3 font-mono text-[11.5px]"
      initial={{ opacity: 0, x: -8 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
    >
      <span className="text-[#F77E5C]">{k}</span>
      <span className="truncate text-right tabular-nums text-white/85">
        &ldquo;{v}&rdquo;
      </span>
      <span className="relative h-[3px] overflow-hidden rounded-full bg-white/[0.1]">
        <motion.span
          className="absolute inset-y-0 left-0 rounded-full bg-emerald-400"
          initial={{ width: 0 }}
          animate={active ? { width: `${conf}%` } : { width: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: delay + 0.15 }}
        />
      </span>
    </motion.div>
  );
}

export function AnalysisVisual({ active }: { active: boolean }) {
  const [open, setOpen] = useState<null | "summary" | "extract">(null);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Sky backdrop - same as the other journey visuals */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')" }}
      />

      {/* Call summary card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        onClick={() => setOpen((o) => (o === "summary" ? null : "summary"))}
        className={
          "absolute left-[5%] top-[6%] w-[62%] cursor-pointer rounded-2xl bg-[#0c0c11] p-5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)] " +
          (open === "summary" ? "z-30" : "z-20")
        }
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 font-sans text-[11px] tracking-[0.12em] text-[#F77E5C]">
            <Sparkles size={12} strokeWidth={2} />
            CALL SUMMARY
          </span>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-[2px] font-sans text-[10px] text-emerald-300">
              Qualified
            </span>
            <ChevronDown
              size={15}
              className={
                "text-white/40 transition-transform duration-300 " +
                (open === "summary" ? "rotate-180" : "")
              }
            />
          </div>
        </div>

        <p className="mt-3 font-sans text-[14px] leading-relaxed text-white/90">
          Caller compared EMI options on a ₹3L personal loan and booked a
          Tuesday 2:15 PM callback with an advisor.
        </p>

        <div className="mt-4 space-y-1.5">
          <div className="font-sans text-[12px] text-white/55">
            Outcome · <span className="text-white/80">callback booked</span>
          </div>
          <div className="font-sans text-[12px] text-white/55">
            Objective · <span className="text-white/80">qualify lead ✓</span>
          </div>
        </div>

        {/* Expanded detail */}
        <motion.div
          initial={false}
          animate={{
            height: open === "summary" ? "auto" : 0,
            opacity: open === "summary" ? 1 : 0
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-4 border-t border-white/10 pt-3">
            <div className="mb-2 flex items-center justify-between font-sans text-[11px] text-white/45">
              <span>Sentiment</span>
              <span className="text-emerald-300">Positive · 84%</span>
            </div>
            <div className="relative h-[6px] rounded-full">
              <div
                className="absolute inset-0 rounded-full opacity-80"
                style={{ background: "linear-gradient(to right,#E5413B,#EAB308,#34D399)" }}
              />
              <span className="absolute left-[84%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0c0c11] bg-white" />
            </div>

            <div className="mt-4 font-sans text-[11px] text-white/45">Key moments</div>
            <div className="mt-2 space-y-1.5">
              {MOMENTS.map(([t, label]) => (
                <div key={t} className="flex items-center gap-3 font-sans text-[12px]">
                  <span className="font-mono text-[10.5px] text-[#F77E5C]">{t}</span>
                  <span className="text-white/75">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Structured extraction card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        onClick={() => setOpen((o) => (o === "extract" ? null : "extract"))}
        className={
          "absolute bottom-[6%] right-[3%] w-[60%] cursor-pointer rounded-2xl bg-[#0c0c11] p-5 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.9)] " +
          (open === "extract" ? "z-30" : "z-10")
        }
      >
        <div className="mb-3 flex items-center justify-between font-sans text-[11px] text-white/50">
          <span>Structured extraction</span>
          <div className="flex items-center gap-2">
            <span className="text-white/35">confidence</span>
            <ChevronDown
              size={15}
              className={
                "text-white/40 transition-transform duration-300 " +
                (open === "extract" ? "rotate-180" : "")
              }
            />
          </div>
        </div>

        <div className="space-y-2.5">
          {FIELDS.map(([k, v, conf], i) => (
            <FieldRow key={k} k={k} v={v} conf={conf} active={active} delay={0.7 + i * 0.12} />
          ))}
        </div>

        {/* Expanded detail */}
        <motion.div
          initial={false}
          animate={{
            height: open === "extract" ? "auto" : 0,
            opacity: open === "extract" ? 1 : 0
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-2.5 space-y-2.5 border-t border-white/10 pt-3">
            {FIELDS_MORE.map(([k, v, conf]) => (
              <FieldRow key={k} k={k} v={v} conf={conf} active delay={0} />
            ))}
            <div className="flex items-center gap-1.5 pt-1 font-sans text-[11px] text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Synced to CRM · webhook 200
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
