"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import {
  ShaderBg,
  CORAL_PRESET,
  PINK_PRESET,
  VIOLET_PRESET,
  type ShaderBgPreset
} from "@/components/ui/ShaderBg";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
});

/* ------------------------------------------------------------- */
/*  Painterly card surface                                       */
/* ------------------------------------------------------------- */
function CardSurface({
  className,
  shader,
  baseColor,
  children
}: {
  className?: string;
  /** Live ShaderGradient preset for the card background. */
  shader: ShaderBgPreset;
  /** Solid fallback colour painted under the shader (visible while the canvas
   *  mounts client-side; also bleeds at the edges of the water-plane). */
  baseColor: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative isolate flex aspect-[460/560] flex-col overflow-hidden rounded-[28px] shadow-[0_24px_60px_-10px_rgba(0,0,0,0.45)]",
        className
      )}
      style={{ backgroundColor: baseColor }}
    >
      {/* Live shader-gradient surface */}
      <ShaderBg preset={shader} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#808080] opacity-20 mix-blend-overlay"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-b from-transparent via-black/35 to-black/75"
      />
      {/* Coarser overlay grain - gives the gradient analog film texture */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.14] mix-blend-overlay"
      >
        <filter id="card-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.85 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#card-grain)" />
      </svg>
      {/* Finer secondary noise - keeps the texture from looking blocky */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.06] mix-blend-soft-light"
      >
        <filter id="card-grain-fine">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.6"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#card-grain-fine)" />
      </svg>

      <div className="relative z-20 flex h-full flex-col justify-between p-7">
        {children}
      </div>
    </div>
  );
}

function CardCta({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/30 bg-white/15 px-4 py-2 font-sans text-[12.5px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25">
      {label}
      <ArrowUpRight size={13} strokeWidth={2.25} />
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="px-2 text-center font-sans text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-[1.02] tracking-tight text-white">
      {children}
    </h3>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[13.5px] font-medium leading-[1.5] tracking-[0.005em] text-white/95">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------- */
/*  Card 1 - Bring Your Own Telephony                            */
/* ------------------------------------------------------------- */
function TelephonyTile({
  children,
  label
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <span
      className="flex h-[52px] min-w-0 flex-1 items-center justify-center rounded-[14px] border border-white/30 bg-white/15 px-2 backdrop-blur-sm"
      title={label}
      aria-label={label}
    >
      {children}
    </span>
  );
}

function TelephonyCard() {
  return (
    <CardSurface shader={CORAL_PRESET} baseColor="#C2392A">
      {/* Top: title */}
      <div className="pt-3">
        <CardTitle>
          Bring Your
          <br />
          Own Telephony
        </CardTitle>
      </div>

      {/* Middle: brand row - real SVG logos, whitewashed via CSS filter */}
      <div className="flex w-full items-stretch gap-1.5">
        <TelephonyTile label="Plivo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Brand/Plivo.svg"
            alt=""
            className="h-6 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </TelephonyTile>
        <TelephonyTile label="Exotel">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Brand/exotel-seeklogo.svg"
            alt=""
            className="h-5 w-auto object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </TelephonyTile>
        <TelephonyTile label="Tata Tele">
          {/* Tata wordmark - no SVG provided so we letterform it */}
          <span className="font-serif text-[18px] font-normal leading-none tracking-[-0.02em] text-white">
            TATA
          </span>
        </TelephonyTile>
        <TelephonyTile label="Twilio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Brand/twilio-icon.svg"
            alt=""
            className="h-6 w-6 object-contain"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </TelephonyTile>
      </div>

      {/* Bottom: copy + cta */}
      <div className="flex flex-col gap-4">
        <CardBody>
          Connect Plivo, Exotel, Tata Tele, Twilio or any carrier over SIP.
          Keep your numbers, zero migration.
        </CardBody>
        <CardCta label="Explore Telephony" />
      </div>
    </CardSurface>
  );
}

/* ------------------------------------------------------------- */
/*  Card 2 - Self Evaluations                                    */
/* ------------------------------------------------------------- */
function EvaluationsCard() {
  return (
    <CardSurface
      shader={PINK_PRESET}
      baseColor="#A22A6A"
    >
      {/* Top: title */}
      <div className="pt-4">
        <CardTitle>Self Evaluations</CardTitle>
      </div>

      {/* Middle: status mock */}
      <div className="-mt-2 rounded-[14px] border border-white/15 bg-[rgba(44,40,36,0.7)] p-3.5 backdrop-blur-md">
        <p className="text-[12.5px] font-medium leading-[1.4] text-[rgba(245,239,231,0.95)]">
          Auto simulations &amp; evals, real-time observability and continuous
          learning.
        </p>
        <div className="mt-3 flex items-center justify-between">
          <span className="rounded-md bg-white px-2.5 py-1 text-[11.5px] font-semibold text-[#1A1422]">
            Accuracy 96%
          </span>
          <span className="inline-flex items-center gap-1 rounded-md border border-white bg-[#1C1A17] px-2.5 py-1 text-[11.5px] font-semibold text-white">
            ✓ Passed
          </span>
        </div>
      </div>

      {/* Bottom: copy + cta */}
      <div className="flex flex-col gap-4">
        <CardBody>
          Every call grades itself against your rubric, surfacing failures and
          edge cases automatically.
        </CardBody>
        <CardCta label="See evaluations" />
      </div>
    </CardSurface>
  );
}

/* ------------------------------------------------------------- */
/*  Card 3 - Lowest Latency                                      */
/* ------------------------------------------------------------- */
function LatencyCard() {
  return (
    <CardSurface
      shader={VIOLET_PRESET}
      baseColor="#6F4ED0"
    >
      {/* Top: title */}
      <div className="pt-4">
        <CardTitle>Lowest&nbsp;&nbsp;Latency</CardTitle>
      </div>

      {/* Middle: benchmark mock */}
      <div className="-mt-2 rounded-[14px] border border-white/25 bg-white/15 p-3.5 backdrop-blur-md">
 <div className="font-sans text-[10px] tracking-[0.04em] text-white/80">
          p50 · last 24h
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="font-serif text-[28px] leading-none text-white">
            298ms
          </span>
          <span className="font-mono text-[10.5px] text-white/85">
            −42ms wk
          </span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["First word", "187ms"],
            ["Mid utt.", "246ms"],
            ["End-of-turn", "298ms"]
          ].map(([k, v]) => (
            <div
              key={k}
              className="rounded-md border border-white/25 bg-white/10 px-2 py-1.5"
            >
 <div className="text-[9.5px] tracking-[0.04em] text-white/75">
                {k}
              </div>
              <div className="font-mono text-[11.5px] text-white">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: copy + cta */}
      <div className="flex flex-col gap-4">
        <CardBody>
          Sub-second, human turn-taking - agents reply in ~300ms with no awkward
          pauses.
        </CardBody>
        <CardCta label="View benchmarks" />
      </div>
    </CardSurface>
  );
}

/* ------------------------------------------------------------- */
/*  Section                                                      */
/* ------------------------------------------------------------- */
export function Categories() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container">
        <div className="grid gap-6 md:grid-cols-3 md:gap-7">
          {[
            <TelephonyCard key="t" />,
            <EvaluationsCard key="e" />,
            <LatencyCard key="l" />
          ].map((card, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)}>
              {card}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
