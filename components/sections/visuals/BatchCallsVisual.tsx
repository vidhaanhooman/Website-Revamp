"use client";

/* Go live - one source node fanning out to many concurrent calls. A single
   phone node on the left connects to N call nodes on the right; pulses travel
   out along the active lines. Sits directly on the wallpaper (no card). */

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

type Status = "ring" | "connected" | "voicemail" | "done";

type Call = {
  initials: string;
  grad: string;
  status: Status;
  label: string;
  y: number; // vertical anchor, % of panel
};

const CALLS: Call[] = [
  { initials: "AK", grad: "from-rose-300 to-rose-400", status: "voicemail", label: "Voicemail", y: 15 },
  { initials: "RS", grad: "from-fuchsia-300 to-violet-400", status: "ring", label: "Ringing…", y: 33 },
  { initials: "MV", grad: "from-sky-300 to-blue-400", status: "connected", label: "Picked up", y: 51 },
  { initials: "JP", grad: "from-amber-300 to-orange-400", status: "connected", label: "Picked up", y: 69 },
  { initials: "DV", grad: "from-emerald-300 to-teal-400", status: "done", label: "Successful", y: 87 }
];

const TXT: Record<Status, string> = {
  ring: "text-amber-300",
  connected: "text-emerald-300",
  voicemail: "text-white/50",
  done: "text-emerald-300"
};
const DOT: Record<Status, string> = {
  ring: "bg-amber-400",
  connected: "bg-emerald-400",
  voicemail: "bg-slate-400",
  done: "bg-emerald-400"
};
const LINE: Record<Status, string> = {
  ring: "#FBBF24",
  connected: "#34D399",
  voicemail: "rgba(203,213,225,0.8)",
  done: "rgba(52,211,153,0.85)"
};

// Single source node geometry, in % of the panel.
const ROOT_CX = 22; // disc centre x
const ROOT_CY = 44; // disc centre y (sits above the label)
const CALL_X = 60; // call node left edge

// SVG coords - viewBox 400×300 matches the 4:3 panel, so no distortion.
// Lines originate from the disc CENTRE (hidden behind it, z-20) so they read
// as fanning out of the node itself.
const VB_OX = ROOT_CX * 4; // origin x (disc centre)
const VB_OY = ROOT_CY * 3; // origin y (disc centre)
const VB_CX = CALL_X * 4; // call node x

export function BatchCallsVisual({ active }: { active: boolean }) {
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!active) {
      setT(0);
      return;
    }
    const id = setInterval(() => setT((x) => x + 1), 1000);
    return () => clearInterval(id);
  }, [active]);

  const live = Math.min(1200, 612 + t * 4);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')" }}
      />

      {/* Connector lines - curved fan from the disc, dashed slate + dots. */}
      <svg
        className="absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 400 300"
        preserveAspectRatio="none"
        fill="none"
      >
        {(() => {
          const NEUTRAL = "rgba(71,85,105,0.9)";
          return (
            <>
              {CALLS.map((c) => {
                const liveLine = c.status === "connected" || c.status === "ring";
                const cy = c.y * 3;
                const d = `M ${VB_OX} ${VB_OY} C ${VB_OX + 62} ${VB_OY}, ${VB_CX - 62} ${cy}, ${VB_CX} ${cy}`;
                return liveLine ? (
                  <motion.path
                    key={c.initials}
                    d={d}
                    stroke={NEUTRAL}
                    strokeWidth={1.75}
                    strokeDasharray="6 7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    animate={active ? { strokeDashoffset: [0, -13] } : { strokeDashoffset: 0 }}
                    transition={{
                      duration: c.status === "ring" ? 0.7 : 1.1,
                      ease: "linear",
                      repeat: Infinity
                    }}
                  />
                ) : (
                  <path
                    key={c.initials}
                    d={d}
                    stroke={NEUTRAL}
                    strokeWidth={1.75}
                    strokeDasharray="6 7"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* origin + endpoint dots */}
              <circle cx={VB_OX} cy={VB_OY} r={3} fill={NEUTRAL} />
              {CALLS.map((c) => {
                const cy = c.y * 3;
                return (
                  <circle key={c.initials} cx={VB_CX} cy={cy} r={3.4} fill={LINE[c.status]} />
                );
              })}
            </>
          );
        })()}
      </svg>

      {/* Source node - single phone hub with the label inside, anchored where
          the lines leave. */}
      <motion.div
        className="absolute z-20 flex h-[98px] w-[98px] flex-col items-center justify-center gap-1 rounded-full bg-[#15151b] ring-1 ring-white/20 shadow-[0_10px_34px_-6px_rgba(0,0,0,0.55)]"
        style={{ left: `${ROOT_CX}%`, top: `${ROOT_CY}%` }}
        initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
        animate={
          active
            ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
            : { opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Phone size={32} strokeWidth={2} className="text-white" />
        <span className="font-sans text-[12.5px] font-semibold tracking-tight text-white">
          Go live
        </span>
      </motion.div>

      {/* Call nodes - boxed cards */}
      {CALLS.map((c, i) => (
        <motion.div
          key={c.initials}
          className="absolute z-20 flex items-center gap-3 rounded-2xl bg-[#0e0e13]/85 px-3 py-2.5 ring-1 ring-white/10 backdrop-blur-sm shadow-[0_14px_36px_-16px_rgba(0,0,0,0.65)]"
          style={{ left: `${CALL_X}%`, top: `${c.y}%`, width: "34%" }}
          initial={{ opacity: 0, x: 12, y: "-50%" }}
          animate={active ? { opacity: 1, x: 0, y: "-50%" } : { opacity: 0, x: 12, y: "-50%" }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 + i * 0.09 }}
        >
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.grad} font-sans text-[11px] font-semibold text-white`}
          >
            {c.initials}
          </span>
          <span className={`flex items-center gap-2 font-sans text-[13.5px] font-medium ${TXT[c.status]}`}>
            <span
              className={`h-2 w-2 rounded-full ${DOT[c.status]} ${c.status === "ring" ? "animate-pulse" : ""}`}
            />
            {c.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
