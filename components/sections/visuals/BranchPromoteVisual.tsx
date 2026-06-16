"use client";

/* Branch · A/B · promote - version rows (stable / live / candidate) inside a
   dark console, with an A/B traffic split. Click "promote" and the candidate
   becomes live at 100% while the previous live demotes to stable; click
   "rollback" to revert. Re-animates and resets on `active`. */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Check, RotateCcw } from "lucide-react";

type State = "stable" | "live" | "candidate";
type Row = { branch: string; ver: string; state: State };

const CORAL = "#F77E5C";

export function BranchPromoteVisual({ active }: { active: boolean }) {
  const [promoted, setPromoted] = useState(false);
  const [userActed, setUserActed] = useState(false);

  useEffect(() => {
    if (!active) setPromoted(false);
  }, [active]);

  // AUTO-DEMO: promote almost immediately on reveal, then roll back and loop -
  // until the user clicks.
  useEffect(() => {
    if (!active || userActed) return;
    const first = setTimeout(() => setPromoted(true), 650);
    const id = setInterval(() => setPromoted((p) => !p), 3000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, [active, userActed]);

  const rows: Row[] = promoted
    ? [
        { branch: "main", ver: "v1.2.4", state: "stable" },
        { branch: "main", ver: "v1.3.0", state: "stable" },
        { branch: "main", ver: "v1.3.1", state: "live" }
      ]
    : [
        { branch: "main", ver: "v1.2.4", state: "stable" },
        { branch: "main", ver: "v1.3.0", state: "live" },
        { branch: "candidate", ver: "v1.3.1", state: "candidate" }
      ];

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
          className="w-[92%] rounded-2xl bg-[#0a0a0e] p-4 shadow-[0_28px_70px_-20px_rgba(0,0,0,0.85)]"
        >
          {/* Version rows */}
          <div className="space-y-2.5">
            {rows.map((r, i) => {
              const cand = r.state === "candidate";
              const live = r.state === "live";
              return (
                <motion.div
                  key={r.ver}
                  layout
                  initial={{ opacity: 0, x: 14 }}
                  animate={
                    active
                      ? { opacity: 1, x: 0, backgroundColor: cand ? CORAL : "#16161c" }
                      : { opacity: 0, x: 14, backgroundColor: "#16161c" }
                  }
                  transition={{
                    opacity: { duration: 0.4, delay: 0.15 + i * 0.1 },
                    x: { duration: 0.4, delay: 0.15 + i * 0.1 },
                    backgroundColor: { duration: 0.5, ease: "easeOut" },
                    layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                  }}
                  className={
                    "flex items-center justify-between rounded-xl px-4 py-3 " +
                    (cand
                      ? "shadow-[0_0_30px_-6px_rgba(247,126,92,0.7)]"
                      : "ring-1 ring-white/[0.07]")
                  }
                >
                  <span className="flex items-center gap-2 font-mono text-[14px] tracking-tight">
                    {live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
                    <span style={{ color: cand ? "#3a1505" : "rgba(255,255,255,0.5)" }}>
                      {r.branch}
                    </span>
                    <span style={{ color: cand ? "#1c0d03" : "#ffffff" }}>· {r.ver}</span>
                  </span>

                  {cand ? (
                    <motion.button
                      type="button"
                      onClick={() => {
                        setUserActed(true);
                        setPromoted(true);
                      }}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="relative flex items-center gap-1.5 rounded-lg bg-[#16110e] px-3 py-1.5 font-mono text-[13px] font-medium text-[#FF8E6B]"
                    >
                      {/* invite-to-click pulse */}
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 rounded-lg ring-1 ring-[#FF8E6B]"
                        animate={{ opacity: [0.6, 0, 0.6], scale: [1, 1.12, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      <CheckCircle2 size={13} />
                      promote
                      <ArrowUpRight size={13} />
                    </motion.button>
                  ) : live ? (
                    <span className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 font-mono text-[12px] text-emerald-300">
                      {promoted && <Check size={11} strokeWidth={3} />}
                      live · 100%
                    </span>
                  ) : (
                    <span className="rounded-lg border border-white/12 px-2.5 py-1 font-mono text-[12px] text-white/40">
                      stable
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* A/B traffic split - now on the dark panel, fully legible */}
          <motion.div layout className="mt-4 px-1">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span className="text-white/45">A/B traffic</span>
              <span>
                {promoted ? (
                  <span className="text-emerald-300">live · 100%</span>
                ) : (
                  <>
                    <span className="text-emerald-300">live 90%</span>
                    <span className="text-white/30"> · </span>
                    <span className="text-[#FF8E6B]">candidate 10%</span>
                  </>
                )}
              </span>
            </div>
            <div className="mt-2 flex h-[7px] w-full overflow-hidden rounded-full bg-white/[0.07]">
              <motion.div
                className="h-full bg-emerald-400"
                initial={{ width: "0%" }}
                animate={active ? { width: promoted ? "100%" : "90%" } : { width: "0%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              />
              <motion.div
                className="h-full"
                style={{ backgroundColor: CORAL }}
                initial={{ width: "0%" }}
                animate={active ? { width: promoted ? "0%" : "10%" } : { width: "0%" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              />
            </div>

            {/* footer: hint -> result + rollback */}
            <div className="mt-3 flex min-h-[18px] items-center justify-between">
              {promoted ? (
                <>
                  <span className="flex items-center gap-1.5 font-sans text-[11px] text-emerald-300">
                    <Check size={12} strokeWidth={3} />
                    Promoted · zero downtime
                  </span>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setUserActed(true);
                      setPromoted(false);
                    }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-1.5 font-mono text-[11px] text-white/50 hover:text-white/80"
                  >
                    <RotateCcw size={11} />
                    rollback
                  </motion.button>
                </>
              ) : (
                <span className="font-sans text-[11px] text-white/40">
                  Candidate is A/B testing at 10% — promote to ship to everyone.
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
