"use client";

/* Telephony - interactive carrier map (BYOT). A compact HoomanLabs hub sits in
   the centre, wired to SIP carriers in two rows over animated dotted trunks.
   Hover a carrier to spotlight its trunk; click it to "provision a number".
   Re-animates on `active`.

   Geometry: SVG viewBox 0 0 100 75 (4:3) + preserveAspectRatio="none" inside a
   4:3 card => x == % width, y == (y/75)*100 % height; HTML nodes share the same
   coordinates so the trunks meet each carrier. */

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

function HoomanMark({ size = 30 }: { size?: number }) {
  const w = Math.round((size * 86) / 95);
  return (
    <svg width={w} height={size} viewBox="0 0 86 95" fill="none" aria-hidden>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M85.2106 7.55578V94.6962H52.1341C50.1303 94.6962 48.2085 93.9002 46.7916 92.4833C45.3746 91.0663 44.5786 89.1446 44.5786 87.1407V53.3927C44.5786 52.0568 44.0479 50.7756 43.1033 49.831C42.1587 48.8863 40.8775 48.3556 39.5416 48.3556H7.13675C6.69145 48.3556 6.26439 48.5325 5.94951 48.8474C5.63464 49.1623 5.45774 49.5894 5.45774 50.0347C5.45774 50.48 5.63464 50.907 5.94951 51.2219C6.26439 51.5368 6.69145 51.7137 7.13675 51.7137H38.5342C39.2467 51.7137 39.93 51.9967 40.4338 52.5005C40.9376 53.0043 41.2206 53.6876 41.2206 54.4001V94.6962H8.14416C6.1403 94.6962 4.21853 93.9002 2.80159 92.4833C1.38465 91.0663 0.588623 89.1446 0.588623 87.1407V0.000244141H33.6651C35.6689 0.000244141 37.5907 0.796273 39.0076 2.21321C40.4246 3.63015 41.2206 5.55192 41.2206 7.55578V41.1359C41.2206 42.4718 41.7513 43.753 42.6959 44.6976C43.6405 45.6423 44.9217 46.1729 46.2576 46.1729H78.6625C79.1078 46.1729 79.5348 45.996 79.8497 45.6812C80.1646 45.3663 80.3415 44.9392 80.3415 44.4939C80.3415 44.0486 80.1646 43.6216 79.8497 43.3067C79.5348 42.9918 79.1078 42.8149 78.6625 42.8149H47.265C46.5525 42.8149 45.8692 42.5319 45.3654 42.0281C44.8616 41.5243 44.5786 40.841 44.5786 40.1285V0.000244141H77.655C79.6589 0.000244141 81.5807 0.796273 82.9976 2.21321C84.4146 3.63015 85.2106 5.55192 85.2106 7.55578Z"
        fill="currentColor"
      />
    </svg>
  );
}

type Carrier = {
  id: string;
  name: string;
  x: number;
  y: number;
  side: "left" | "right";
  logo?: string;
  number: string;
};

// Hub is a perfect square: width 27% of W, height 36% of H (= 27% × 4/3 in a
// 4:3 panel). Centred → spans x 36.5–63.5%, y ~32–68%.
const HUB_L = 37;
const HUB_R = 63;
const EDGE = 6; // carrier-circle half-width in % — where its trunk begins

const CARRIERS: Carrier[] = [
  { id: "plivo", name: "Plivo", x: 15, y: 25, side: "left", logo: "/Brand/Plivo.svg", number: "+91 80 4567 1201" },
  { id: "exotel", name: "Exotel", x: 15, y: 50, side: "left", logo: "/Brand/exotel-seeklogo.svg", number: "+91 80 4567 1202" },
  { id: "tata", name: "Tata", x: 85, y: 25, side: "right", logo: "/Brand/tata.svg", number: "+91 22 6789 3301" },
  { id: "twilio", name: "Twilio", x: 85, y: 50, side: "right", logo: "/Brand/twilio-icon.svg", number: "+1 415 555 0142" }
];

const topPct = (y: number) => `${(y / 75) * 100}%`;

export function TelephonyVisual({ active }: { active: boolean }) {
  const [hover, setHover] = useState<string | null>(null);
  const [hubHover, setHubHover] = useState(false);
  const [prov, setProv] = useState<Record<string, boolean>>({});

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')" }}
      />

      {/* Trunks - manifold routing. Each carrier runs horizontally to a vertical
          bus, which turns and joins the hub at its centre. viewBox 400×300 = the
          4:3 panel, so strokes/dashes stay uniform. */}
      {(() => {
        // px coords in the 400×300 viewBox
        const Y_TOP = 100;
        const Y_BOT = 200;
        const Y_MID = 150;
        const X_CARR_L = (15 + EDGE) * 4; // 84
        const X_CARR_R = (85 - EDGE) * 4; // 316
        const X_BUS_L = 120;
        const X_BUS_R = 280;
        const X_HUB_L = HUB_L * 4; // 148
        const X_HUB_R = HUB_R * 4; // 252
        const flow = (key: string, d: string, color: string, dim: boolean) => (
          <motion.path
            key={key}
            d={d}
            stroke={color}
            strokeWidth={1.4}
            strokeDasharray="4 5"
            strokeLinecap="round"
            fill="none"
            style={{ opacity: dim ? 0.3 : 1 }}
            animate={active ? { strokeDashoffset: [0, -18] } : { strokeDashoffset: 0 }}
            transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
          />
        );
        const anyHover = hover !== null && !hubHover;
        const busColor = "rgba(255,255,255,0.55)";
        return (
          <svg
            className="absolute inset-0 z-10 h-full w-full"
            viewBox="0 0 400 300"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* vertical buses + hub connectors (neutral) */}
            {flow("bus-l", `M ${X_BUS_L} ${Y_TOP} L ${X_BUS_L} ${Y_BOT}`, busColor, anyHover)}
            {flow("con-l", `M ${X_BUS_L} ${Y_MID} L ${X_HUB_L} ${Y_MID}`, busColor, anyHover)}
            {flow("bus-r", `M ${X_BUS_R} ${Y_TOP} L ${X_BUS_R} ${Y_BOT}`, busColor, anyHover)}
            {flow("con-r", `M ${X_BUS_R} ${Y_MID} L ${X_HUB_R} ${Y_MID}`, busColor, anyHover)}

            {/* per-carrier horizontal stubs (colour by state) */}
            {CARRIERS.map((c) => {
              const provisioned = prov[c.id];
              const focused = hover === c.id || hubHover;
              const color = provisioned
                ? "#34D399"
                : focused
                ? "#F77E5C"
                : "rgba(255,255,255,0.9)";
              const left = c.side === "left";
              const cy = (c.y / 75) * 300;
              const cx = left ? X_CARR_L : X_CARR_R;
              const bx = left ? X_BUS_L : X_BUS_R;
              const dim = anyHover && hover !== c.id;
              return (
                <g key={c.id}>
                  {flow(`stub-${c.id}`, `M ${cx} ${cy} L ${bx} ${cy}`, color, dim)}
                  {/* junction dots */}
                  <circle cx={cx} cy={cy} r={2.4} fill={color} opacity={dim ? 0.3 : 1} />
                  <circle cx={bx} cy={cy} r={1.8} fill={busColor} opacity={dim ? 0.3 : 1} />
                </g>
              );
            })}

            {/* hub entry dots */}
            <circle cx={X_HUB_L} cy={Y_MID} r={2.2} fill={busColor} />
            <circle cx={X_HUB_R} cy={Y_MID} r={2.2} fill={busColor} />
          </svg>
        );
      })()}

      {/* Hub - compact rounded square, centred */}
      <motion.div
        className="absolute z-20 flex flex-col items-center justify-center rounded-[20px] bg-[#1b1b1f] shadow-[0_28px_64px_-24px_rgba(0,0,0,0.7)]"
        style={{ left: "50%", top: topPct(37.5), width: "27%", height: "36%" }}
        initial={{ opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }}
        animate={
          active
            ? { opacity: 1, scale: 1, x: "-50%", y: "-50%" }
            : { opacity: 0, scale: 0.85, x: "-50%", y: "-50%" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHubHover(true)}
        onMouseLeave={() => setHubHover(false)}
      >
        {/* animated stroke - faint full ring + a light tracing the border */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[20px]"
          style={{ boxShadow: "0 0 26px -6px rgba(56,189,248,0.45)" }}
        />
        <svg
          aria-hidden
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <rect
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="13"
            stroke="rgba(56,189,248,0.3)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          <motion.rect
            x="1.5"
            y="1.5"
            width="97"
            height="97"
            rx="13"
            stroke="#7DD3FC"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="0.25 0.75"
            initial={{ strokeDashoffset: 0 }}
            animate={active ? { strokeDashoffset: [0, -1] } : { strokeDashoffset: 0 }}
            transition={{ duration: 2.4, ease: "linear", repeat: Infinity }}
            style={{ filter: "drop-shadow(0 0 4px rgba(125,211,252,0.8))" }}
          />
        </svg>
        <span className="text-white">
          <HoomanMark size={46} />
        </span>
        <span className="mt-3 font-sans text-[14px] font-medium tracking-tight text-white/90">
          Telephony
        </span>
      </motion.div>

      {/* Carriers */}
      {CARRIERS.map((c, i) => {
        const provisioned = prov[c.id];
        const dim = hover !== null && hover !== c.id && !hubHover;
        return (
          <motion.div
            key={c.id}
            className="absolute z-20 flex flex-col items-center"
            style={{ left: `${c.x}%`, top: topPct(c.y) }}
            initial={{ opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }}
            animate={
              active
                ? { opacity: dim ? 0.45 : 1, scale: hover === c.id ? 1.1 : 1, x: "-50%", y: "-50%" }
                : { opacity: 0, scale: 0.6, x: "-50%", y: "-50%" }
            }
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 18,
              delay: active ? 0.3 + i * 0.1 : 0
            }}
          >
            <button
              type="button"
              onClick={() => setProv((p) => ({ ...p, [c.id]: !p[c.id] }))}
              onMouseEnter={() => setHover(c.id)}
              onMouseLeave={() => setHover(null)}
              className={
                "relative flex h-[66px] w-[66px] cursor-pointer items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-12px_rgba(15,23,42,0.55)] " +
                (provisioned ? "ring-2 ring-emerald-400" : "")
              }
            >
              {c.logo ? (
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={38}
                  height={38}
                  unoptimized
                  draggable={false}
                  className="h-[38px] w-[38px] object-contain"
                />
              ) : (
                <span className="font-sans text-[14px] font-bold tracking-tight text-[#1A75CF]">
                  TATA
                </span>
              )}
              {provisioned && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white"
                >
                  ✓
                </motion.span>
              )}
            </button>

            {/* status chip - absolute so it never shifts the circle off-centre */}
            <motion.span
              initial={false}
              animate={{
                opacity: provisioned || hover === c.id ? 1 : 0,
                x: "-50%",
                y: provisioned || hover === c.id ? 0 : -4
              }}
              transition={{ duration: 0.2 }}
              className={
                "pointer-events-none absolute left-1/2 top-full mt-2 whitespace-nowrap rounded-full px-2 py-[2px] font-sans text-[8.5px] font-medium shadow-sm " +
                (provisioned ? "bg-emerald-50 text-emerald-700" : "bg-white/90 text-slate-500")
              }
            >
              {provisioned ? `${c.number} · live` : "Click to provision"}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
}
