import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { FeatureDetailSection } from "@/components/sections/FeatureDetailHero";
import { BuildVisual } from "@/components/sections/visuals/BuildVisual";
import { DeployVisual } from "@/components/sections/visuals/DeployVisual";
import { ObservabilityVisual } from "@/components/sections/visuals/ObservabilityVisual";
import { SimulateVisual } from "@/components/sections/visuals/SimulateVisual";

export const metadata: Metadata = {
  title: "Features — HoomanLabs",
  description:
    "Build, simulate, deploy, and observe production-grade voice agents on one platform."
};

const FEATURES = [
  {
    id: "build",
    eyebrow: "Build",
    title: "Build production-ready agents with no experience.",
    description:
      "Four things make HoomanLabs feel like cheating: a no-code agent builder, prompts you never touch, context the agent actually uses, and memory that follows every caller. Compose what your team needs in plain language — we handle the rest.",
    visual: <BuildVisual />,
    sections: [
      {
        label: "No-code AI agent.",
        description:
          "Drag, drop, ship. The visual builder turns triggers, LLM reasoning, tools, and routing into a deployable voice agent — no engineering team, no prompt-spaghetti, no manual model wrangling."
      },
      {
        label: "Prompts you don't have to write.",
        description:
          "Describe the behaviour in plain English or Hindi — HoomanLabs composes, versions, and A/B tests the underlying prompts so you tune outcomes, not strings. Roll back a regression in one click."
      },
      {
        label: "Context the agent actually uses.",
        description:
          "Plug in SOPs, FAQs, CRM, calendar, EHR. The agent retrieves the latest truth on every call — not a stale prompt baked in last month, not a Notion link buried five clicks deep."
      },
      {
        label: "Memory that follows every caller.",
        description:
          "Per-caller memory across every channel and every session. The agent picks up Tuesday's conversation on Friday, remembers the patient's history, and never asks the same question twice."
      }
    ]
  },
  {
    id: "simulate",
    eyebrow: "Simulate",
    title: "Run every scenario. Vibe-check the tone. Ship with confidence.",
    description:
      "Every change runs through 16,000+ conversational scenarios — interruptions, code-switches, noisy lines, off-script asks. Then a side-by-side vibe-check so you hear the difference, not just read the diff. Promote only when the numbers and the vibe both pass.",
    visual: <SimulateVisual />,
    sections: [
      {
        label: "Scenario simulation at scale.",
        description:
          "16,000+ deterministic conversations run on every agent change — interruptions, code-switches, noisy lines, off-script asks. Every category tracked, every regression caught."
      },
      {
        label: "Side-by-side vibe-check.",
        description:
          "Play the same scenario through the old version and the new one back-to-back. Hear the difference, not just read the diff. Promote only when the tone passes too."
      },
      {
        label: "Regression detection.",
        description:
          "Compare pass-rate and latency between versions, flag the categories that slipped, block the promotion until fixed."
      },
      {
        label: "Custom scenario authoring.",
        description:
          "Drop a transcript, mark the expected outcome, the simulator turns it into a permanent test case the whole fleet runs forever after."
      }
    ]
  },
  {
    id: "deploy",
    eyebrow: "Deploy",
    title: "Live in minutes. Our telephony or yours.",
    description:
      "Two ways to go live. Spin up a HoomanLabs number and you're routing calls in minutes — or plug your existing Plivo, Exotel, Tata, or Twilio line in directly. Either way, same agent, same SIP, no procurement, no migration.",
    visual: <DeployVisual />,
    sections: [
      {
        label: "Live in minutes.",
        description:
          "From signed contract to first real call in under two minutes. Pick a number, point us at your knowledge base, and the agent is on the line — no procurement, no SIP tickets, no firmware."
      },
      {
        label: "HoomanLabs Telephony.",
        description:
          "Managed Indian numbers across Mumbai, Bengaluru, Chennai, Delhi, and 40+ circles. We handle SIP, DIDs, carrier failover, and 99.99% routing — billed by the minute, no setup fee."
      },
      {
        label: "Bring your own telephony.",
        description:
          "Already on Plivo, Exotel, Tata, or Twilio? Plug your existing trunk straight in — keep your DIDs, keep your pricing, keep your contracts. Same agent, same SIP, no migration."
      }
    ]
  },
  {
    id: "observability",
    eyebrow: "Observability",
    title: "See exactly what happens, every time.",
    description:
      "Watch every call in real time — flagged moments, tool calls, audit-grade event log for enterprise QA. Transcript search across millions of calls, full attribution by agent version.",
    visual: <ObservabilityVisual />,
    sections: [
      {
        label: "The live event log.",
        description:
          "Every greeting, tool call, hand-off, and SMS is timestamped and queryable in real time — no waiting for a daily roll-up."
      },
      {
        label: "Transcript search across millions of calls.",
        description:
          "Search by intent, language, agent, or outcome. Find the 0.3% of calls that didn't resolve in seconds."
      },
      {
        label: "Audit trail for compliance teams.",
        description:
          "Every action attributable to a version, every PII redaction logged, exported on demand for DPDP and HIPAA reviews."
      }
    ]
  }
];

export default function FeaturesDetailsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-dark text-dark-text">
      <Navbar />

      {/* Page header — back link + jump-to nav */}
      <header className="relative px-4 pb-2 pt-32 md:pt-36">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/features"
              className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-medium uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-white"
            >
              <ArrowLeft size={13} strokeWidth={2.25} />
              All features
            </Link>

            <nav
              aria-label="Feature sections"
              className="flex flex-wrap items-center gap-1"
            >
              {FEATURES.map((f) => (
                <a
                  key={f.id}
                  href={`#${f.id}`}
                  className="rounded-full border border-white/10 bg-white/[0.025] px-3.5 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-white/65 transition-colors hover:border-white/25 hover:text-white"
                >
                  {f.eyebrow}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {FEATURES.map((f, i) => (
        <FeatureDetailSection key={f.id} {...f} showDivider={i > 0} />
      ))}

      <Footer />
    </main>
  );
}
