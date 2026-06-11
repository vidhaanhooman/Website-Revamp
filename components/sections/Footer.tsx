"use client";

import {
  Linkedin,
  Twitter,
  Github,
  Youtube,
  ShieldCheck,
  Lock,
  Globe
} from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";

const COLS = [
  {
    label: "Platform",
    items: [
      { label: "Agents", href: "/agents" },
      { label: "Integrations", href: "#integrations" },
      { label: "Telephony", href: "#telephony" },
      { label: "Security", href: "#security" }
    ]
  },
  {
    label: "Industries",
    items: [
      { label: "Healthcare", href: "#healthcare" },
      { label: "Insurance", href: "#insurance" },
      { label: "Home Services", href: "#home-services" },
      { label: "Financial Services", href: "#fintech" }
    ]
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Documentation", href: "#docs" },
      { label: "Changelog", href: "#changelog" },
      { label: "Status", href: "#status" }
    ]
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
      { label: "Pricing", href: "/pricing" }
    ]
  }
];

const TRUST = [
  { label: "HIPAA", icon: <ShieldCheck size={14} strokeWidth={1.75} /> },
  { label: "SOC 2 · Type II", icon: <Lock size={14} strokeWidth={1.75} /> },
  { label: "GDPR · DPA", icon: <Globe size={14} strokeWidth={1.75} /> }
];

export function Footer() {
  return (
    <footer className="relative mt-12 bg-dark text-dark-text">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr] md:gap-16">
          {/* Brand col */}
          <div>
            <Wordmark tone="dark" />
            <p className="mt-5 max-w-xs text-[14px] leading-[1.55] text-dark-muted">
              AI voice agents for healthcare and service teams. Built so every
              call gets answered, every hour.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Github, label: "GitHub" },
                { Icon: Youtube, label: "YouTube" }
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-edge text-dark-text/85 transition-colors hover:bg-dark-edge hover:text-white"
                >
                  <Icon size={15} strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLS.map((col) => (
              <div key={col.label}>
                <div className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-dark-muted">
                  {col.label}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        className="text-[14px] text-dark-text/85 transition-colors hover:text-white"
                      >
                        {it.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-dark-edge pt-8 md:flex-row md:items-center">
          <p className="text-[12.5px] text-dark-muted">
            © {new Date().getFullYear()} HoomanLabs Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {TRUST.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-dark-edge px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dark-text/85"
              >
                {t.icon}
                {t.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
