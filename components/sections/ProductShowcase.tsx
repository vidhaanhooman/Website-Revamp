"use client";

import { motion } from "framer-motion";
import { Radio, MessageSquareText, Wand2, LineChart } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CallsListMock } from "@/components/mocks/showcase/CallsListMock";
import { TranscriptMock } from "@/components/mocks/showcase/TranscriptMock";
import { StudioMock } from "@/components/mocks/showcase/StudioMock";
import { InsightsMock } from "@/components/mocks/showcase/InsightsMock";

/* Highlighted word/phrase inside the dim prose */
function H({ children }: { children: ReactNode }) {
  return <span className="font-medium text-ink dark:text-white">{children}</span>;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
});

interface Slab {
  reverse?: boolean;
  icon: ReactNode;
  label: string;
  heading: string;
  prose: ReactNode;
  mock: ReactNode;
}

const SLABS: Slab[] = [
  {
    icon: <Radio size={12} strokeWidth={1.75} />,
    label: "Live console",
    heading: "Every call, on one screen.",
    prose: (
      <>
        <H>See every call live.</H> Filter by language, queue, agent, status.
        <H> Drop in</H> to listen. Redirect to a human <H>in one click.</H>{" "}
        Built for ops leads who actually run the floor - not for the dashboard
        that gets opened at the QBR.
      </>
    ),
    mock: <CallsListMock />
  },
  {
    reverse: true,
    icon: <MessageSquareText size={12} strokeWidth={1.75} />,
    label: "Transcript",
    heading: "Read every call like a chat.",
    prose: (
      <>
        Real-time transcripts with <H>per-utterance latency</H>, the
        language each side spoke, and a <H>seekable waveform</H> for the
        audio. Search across millions of calls in seconds.
      </>
    ),
    mock: <TranscriptMock />
  },
  {
    icon: <Wand2 size={12} strokeWidth={1.75} />,
    label: "Studio",
    heading: "Tune the agent like a teammate.",
    prose: (
      <>
        Pick the voice. Pick the languages. Slide <H>warmth</H>, <H>pace</H>,
        and <H>code-switch readiness</H> until it sounds like your front desk.
        Test a call in one tap - no redeploy, no waiting.
      </>
    ),
    mock: <StudioMock />
  },
  {
    reverse: true,
    icon: <LineChart size={12} strokeWidth={1.75} />,
    label: "Insights",
    heading: "Know why calls escalate.",
    prose: (
      <>
        Volume, CSAT, latency, and a <H>ranked list of escalation reasons</H>
        {" "}
        - derived from real transcripts, not survey replies. Spot the
        out-of-support languages, the off-script intents,
        <H> the patterns you can fix this week.</H>
      </>
    ),
    mock: <InsightsMock />
  }
];

export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-[#0E0C12] md:py-32">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(rgb(15_17_21/0.10)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black,transparent_75%)] dark:[background-image:radial-gradient(rgb(255_255_255/0.10)_1px,transparent_1px)]"
      />

      {/* ambient warm wash behind the section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_15%,rgba(247,126,92,0.08),transparent_70%)] dark:bg-[radial-gradient(60%_40%_at_50%_15%,rgba(247,126,92,0.12),transparent_70%)]"
      />

      <div className="container relative">
        {/* Intro */}
        <motion.header
          {...fadeUp(0)}
          className="mx-auto mb-20 flex max-w-2xl flex-col items-center gap-4 text-center md:mb-28"
        >
 <span className="font-sans text-[11px] tracking-[0.04em] text-ink/55 dark:text-white/55">
            Product
          </span>
          <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.5rem)] font-normal leading-[1.04] tracking-tight text-ink dark:text-white">
            Everything you need to ship a voice agent that actually picks up.
          </h2>
        </motion.header>

        {/* Slabs */}
        <div className="flex flex-col gap-24 md:gap-32">
          {SLABS.map((s, i) => (
            <motion.div
              key={s.label}
              {...fadeUp(i * 0.05)}
              className={cn(
                "grid items-center gap-10 md:grid-cols-2 md:gap-16",
                s.reverse && "md:[&>*:first-child]:order-2"
              )}
            >
              {/* Prose column */}
              <div>
                <h3 className="max-w-md font-sans text-[clamp(1.5rem,2.8vw,2.25rem)] font-medium leading-[1.1] tracking-snug text-ink dark:text-white">
                  {s.heading}
                </h3>
                <p className="mt-5 max-w-md text-[clamp(1rem,1.4vw,1.15rem)] leading-[1.55] text-ink/40 dark:text-white/40">
                  {s.prose}
                </p>

                <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-ink/12 bg-white/70 px-3 py-1.5 text-[11.5px] text-ink/80 backdrop-blur-sm dark:border-white/12 dark:bg-white/[0.04] dark:text-white/80">
                  <span className="flex h-4 w-4 items-center justify-center rounded-sm bg-ink/10 text-ink/90 dark:bg-white/10 dark:text-white/90">
                    {s.icon}
                  </span>
                  {s.label}
                </div>
              </div>

              {/* Mock column */}
              <div className="relative">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-6 rounded-3xl bg-[radial-gradient(closest-side,rgba(247,126,92,0.12),transparent_70%)] blur-2xl dark:bg-[radial-gradient(closest-side,rgba(247,126,92,0.18),transparent_70%)]"
                />
                <div className="relative">{s.mock}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
