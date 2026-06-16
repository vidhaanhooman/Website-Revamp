"use client";

/* Go live - one node fanning out calls to many leads at once, interactive.
   A central "Send Batch Calls" hub fires signals along curved spokes to a
   column of lead nodes. Hover a lead to spotlight its spoke and reveal the
   call detail; hover the hub to pulse them all. Re-animates on `active`.

   Geometry: SVG viewBox 0 0 100 75 (4:3) + preserveAspectRatio="none" inside a
   4:3 card => SVG x == % width, SVG y == (y/75)*100 % height. Each avatar is
   placed at left:n.x% / top:(n.y) and centred with translate(-50%,-50%), so it
   self-aligns to its spoke endpoint regardless of its rendered size. */

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";

type Status = "ring" | "picked" | "voicemail" | "success";

const NODES: {
  x: number;
  y: number;
  initials: string;
  grad: string;
  label: string;
  detail: string;
  status: Status;
}[] = [
  { x: 60, y: 9, initials: "AK", grad: "from-rose-300 to-rose-400", label: "Voicemail", detail: "No answer · left VM", status: "voicemail" },
  { x: 60, y: 22, initials: "RS", grad: "from-fuchsia-300 to-violet-400", label: "Ringing…", detail: "Dialing · 0:06", status: "ring" },
  { x: 60, y: 37, initials: "MV", grad: "from-sky-300 to-blue-400", label: "Picked up", detail: "On call · 1:12", status: "picked" },
  { x: 60, y: 52, initials: "JP", grad: "from-amber-300 to-orange-400", label: "Picked up", detail: "On call · 0:48", status: "picked" },
  { x: 60, y: 66, initials: "DV", grad: "from-emerald-300 to-teal-400", label: "Successful", detail: "Booked demo · 2:31", status: "success" }
];

const HUB = { x: 22, y: 37.5 };

const PILL: Record<Status, string> = {
  ring: "bg-amber-400/12 text-amber-300",
  picked: "bg-emerald-500/12 text-emerald-300",
  voicemail: "bg-white/[0.06] text-white/50",
  success: "bg-emerald-500/12 text-emerald-300"
};
const DOT: Record<Status, string> = {
  ring: "bg-amber-500",
  picked: "bg-emerald-500",
  voicemail: "bg-slate-400",
  success: "bg-emerald-500"
};

const top = (y: number) => `${(y / 75) * 100}%`;

export function BatchCallsVisual({ active }: { active: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const [hubHover, setHubHover] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')" }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-[7%] rounded-2xl bg-[#0c0c11] shadow-[0_30px_70px_-25px_rgba(0,0,0,0.85)]"
      >
        {/* Spokes */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 75"
          preserveAspectRatio="none"
          fill="none"
        >
          {NODES.map((n, i) => {
            // Radiate from the hub toward each node, then flatten to land
            // horizontally under the avatar - gives a clean fan, not a cluster.
            const dx = n.x - HUB.x;
            const dy = n.y - HUB.y;
            const d = `M${HUB.x},${HUB.y} C${HUB.x + dx * 0.35},${HUB.y + dy * 0.4} ${HUB.x + dx * 0.62},${n.y} ${n.x},${n.y}`;
            const stroke = n.status === "voicemail" ? "#CBD5E1" : "#34D399";
            // spotlight logic
            const focused = hover === i || hubHover;
            const dimmed = (hover !== null && hover !== i) && !hubHover;
            return (
              <motion.g
                key={n.initials}
                animate={{ opacity: dimmed ? 0.18 : 1 }}
                transition={{ duration: 0.25 }}
              >
                {/* base line draws in */}
                <motion.path
                  d={d}
                  stroke={focused ? stroke : "rgba(255,255,255,0.16)"}
                  strokeWidth={focused ? 1.8 : 1.2}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  animate={active ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 + i * 0.08 }}
                />
                {/* signal pulse flows hub -> node */}
                {active && (
                  <motion.path
                    d={d}
                    stroke={stroke}
                    strokeWidth={focused ? 2.6 : 1.8}
                    strokeLinecap="round"
                    strokeDasharray="6 150"
                    vectorEffect="non-scaling-stroke"
                    initial={{ strokeDashoffset: 156 }}
                    animate={{ strokeDashoffset: [156, 0] }}
                    transition={{
                      duration: focused ? 0.9 : 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      delay: 0.9 + i * 0.18
                    }}
                  />
                )}
              </motion.g>
            );
          })}
        </svg>

        {/* Hub circle - centre pinned exactly to the spoke origin (HUB.x, HUB.y) */}
        <div
          className="absolute z-30 h-12 w-12 cursor-pointer"
          style={{ left: `${HUB.x}%`, top: top(HUB.y), transform: "translate(-50%,-50%)" }}
          onMouseEnter={() => setHubHover(true)}
          onMouseLeave={() => setHubHover(false)}
        >
          {/* pulse rings */}
          {active &&
            [0, 0.6].map((d) => (
              <motion.span
                key={d}
                className="absolute inset-0 rounded-full border border-emerald-400/50"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.4, opacity: 0 }}
                transition={{
                  duration: hubHover ? 1.1 : 1.8,
                  ease: "easeOut",
                  repeat: Infinity,
                  delay: d
                }}
              />
            ))}
          <motion.span
            className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#17171d] shadow-lg ring-1 ring-white/10"
            animate={{ scale: hubHover ? 1.08 : 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <Phone size={18} className="text-white" />
          </motion.span>
        </div>

        {/* Hub label - sits below the circle */}
        <div
          className="absolute z-30 flex flex-col items-center"
          style={{ left: `${HUB.x}%`, top: `calc(${top(HUB.y)} + 34px)`, transform: "translateX(-50%)" }}
        >
          <div className="whitespace-nowrap font-sans text-[11px] font-semibold tracking-tight text-white">
            Go live
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/12 px-2 py-[2px] font-sans text-[9px] font-medium text-emerald-300"
          >
            <span className="h-1 w-1 animate-pulse rounded-full bg-emerald-500" />
            1,200 calls / min · at scale
          </motion.span>
        </div>

        {/* Lead nodes - rectangular cards; the card's left edge meets the spoke
            endpoint (n.x, n.y) so the line connects to the card. */}
        {NODES.map((n, i) => {
          const dimmed = (hover !== null && hover !== i) && !hubHover;
          return (
            <motion.div
              key={n.initials}
              className="absolute z-20 flex cursor-pointer items-center gap-2 rounded-xl bg-[#16161c] px-2 py-1.5 ring-1 ring-white/[0.07] shadow-[0_10px_28px_-12px_rgba(0,0,0,0.7)]"
              style={{ left: `${n.x}%`, top: top(n.y) }}
              initial={{ opacity: 0, x: 8, y: "-50%", scale: 0.9 }}
              animate={
                active
                  ? { opacity: dimmed ? 0.4 : 1, x: 0, y: "-50%", scale: hover === i ? 1.05 : 1 }
                  : { opacity: 0, x: 8, y: "-50%", scale: 0.9 }
              }
              transition={{ duration: 0.3, ease: "easeOut", delay: active ? 0.7 + i * 0.12 : 0 }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${n.grad} font-sans text-[8.5px] font-semibold text-white`}
              >
                {n.initials}
              </span>
              <div className="flex flex-col items-start gap-0.5">
                <span
                  className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-[2px] font-sans text-[9px] font-medium ${PILL[n.status]}`}
                >
                  <span
                    className={`h-[5px] w-[5px] rounded-full ${DOT[n.status]} ${n.status === "ring" ? "animate-pulse" : ""}`}
                  />
                  {n.label}
                </span>
                <motion.span
                  initial={false}
                  animate={{
                    opacity: hover === i ? 1 : 0,
                    height: hover === i ? "auto" : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden whitespace-nowrap pl-0.5 font-sans text-[8px] text-white/40"
                >
                  {n.detail}
                </motion.span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
