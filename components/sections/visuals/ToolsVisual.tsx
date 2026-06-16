"use client";

/* Tools - an iOS-style vertical picker that scrolls tool chips through a
   centered focus, looping infinitely in one direction. The focused chip
   enlarges into a dark card with its coloured icon tile; neighbours shrink
   and fade by distance. The chip that scrolls off the top wraps seamlessly
   to the bottom (no rewind). Runs while the step is active. */

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  CalendarCheck,
  IndianRupee,
  ScanFace,
  ArrowLeftRight,
  MessageSquare,
  FileText,
  type LucideIcon
} from "lucide-react";

type Tool = { label: string; Icon: LucideIcon; color: string };

const TOOLS: Tool[] = [
  { label: "Fetch Details", Icon: FileText, color: "#64748B" },
  { label: "Take Payment", Icon: IndianRupee, color: "#34D399" },
  { label: "Verify ID", Icon: ScanFace, color: "#4877D8" },
  { label: "Pull Records", Icon: Download, color: "#A855F7" },
  { label: "Book Slot", Icon: CalendarCheck, color: "#2DA8A8" },
  { label: "Transfer Calls", Icon: ArrowLeftRight, color: "#F77E5C" },
  { label: "Send SMS", Icon: MessageSquare, color: "#EAB308" }
];

const N = TOOLS.length;
const ITEM_H = 64; // px between row centers
const SPAN = Math.floor(N / 2); // visible offset range: -SPAN..SPAN

/* Shortest signed distance from the focused index, wrapped into -SPAN..SPAN. */
function wrappedOffset(idx: number, focus: number) {
  let off = (((idx - focus) % N) + N) % N; // 0..N-1
  if (off > SPAN) off -= N; // -SPAN..SPAN
  return off;
}

export function ToolsVisual({ active }: { active: boolean }) {
  const [focus, setFocus] = useState(0);
  const prevOff = useRef<number[]>(TOOLS.map((_, i) => wrappedOffset(i, 0)));

  // Advance forever in one direction while active.
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setFocus((f) => f + 1), 650);
    return () => clearInterval(id);
  }, [active]);

  const offs = TOOLS.map((_, i) => wrappedOffset(i, focus));
  // An item "wraps" when its offset jumps by more than one slot - teleport it
  // (no transition) so it doesn't fly across the middle.
  const noAnim = offs.map(
    (o, i) => Math.abs(o - prevOff.current[i]) > 1
  );
  useEffect(() => {
    prevOff.current = offs;
  });

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Clean sky backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')"
        }}
      />

      {/* Picker */}
      <div className="relative h-full w-full">
        <div className="absolute left-1/2 top-1/2 w-[78%] max-w-[360px] -translate-x-1/2">
          {TOOLS.map((t, i) => {
            const off = offs[i];
            const ad = Math.abs(off);
            const isFocus = off === 0;
            const scale = isFocus ? 1 : Math.max(0.8, 1 - ad * 0.07);
            const opacity = ad > SPAN ? 0 : Math.max(0.22, 1 - ad * 0.24);
            return (
              <motion.div
                key={t.label}
                className="absolute inset-x-0"
                style={{ marginTop: -26 }}
                initial={false}
                animate={{ y: off * ITEM_H, scale, opacity }}
                transition={
                  noAnim[i]
                    ? { duration: 0 }
                    : { duration: 0.38, ease: [0.32, 0.72, 0, 1] }
                }
              >
                <div
                  className={
                    "mx-auto flex items-center gap-3 rounded-2xl px-4 " +
                    (isFocus
                      ? "bg-[#161619] py-3.5 shadow-[0_26px_55px_-18px_rgba(0,0,0,0.75)] ring-1 ring-white/10"
                      : "bg-black/30 py-3 backdrop-blur-sm")
                  }
                >
                  <span
                    className="flex shrink-0 items-center justify-center rounded-xl transition-all"
                    style={{
                      height: isFocus ? 38 : 30,
                      width: isFocus ? 38 : 30,
                      backgroundColor: isFocus
                        ? t.color
                        : "rgba(255,255,255,0.1)"
                    }}
                  >
                    <t.Icon
                      size={isFocus ? 19 : 15}
                      strokeWidth={2}
                      className={isFocus ? "text-white" : "text-white/70"}
                    />
                  </span>
                  <span
                    className={
                      "font-sans tracking-tight text-white " +
                      (isFocus
                        ? "text-[18px] font-semibold"
                        : "text-[14.5px] font-medium text-white/85")
                    }
                  >
                    {t.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Edge fades so chips dissolve into the sky */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(120,150,185,0.6) 0%, transparent 26%, transparent 74%, rgba(214,209,193,0.6) 100%)"
          }}
        />
      </div>
    </div>
  );
}
