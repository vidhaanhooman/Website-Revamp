"use client";

import Link from "next/link";

const COLS = [
  {
    heading: "Product",
    links: [
      { label: "Studio", href: "/features" },
      { label: "API", href: "/docs" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
      { label: "Status", href: "https://status.hoomanlabs.ai" }
    ]
  },
  {
    heading: "Use cases",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Lending & Fintech", href: "/industries/lending" },
      { label: "Commerce & D2C", href: "/industries/commerce" },
      { label: "Education", href: "/industries/education" }
    ]
  },
  {
    heading: "Discover",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customer stories", href: "/blog?category=customer-story" },
      { label: "Newsletter", href: "/newsletter" },
      { label: "Press", href: "/press" }
    ]
  },
  {
    heading: "Resources",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "API reference", href: "/docs/api" },
      { label: "Voice gallery", href: "/voices" },
      { label: "Brand kit", href: "/brand" }
    ]
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Security", href: "/security" },
      { label: "Contact", href: "/contact" }
    ]
  }
];

const SOCIAL = [
  { label: "X", href: "https://x.com/hoomanlabs" },
  { label: "LinkedIn", href: "https://linkedin.com/company/hoomanlabs" },
  { label: "GitHub", href: "https://github.com/hoomanlabs" },
  { label: "YouTube", href: "https://youtube.com/@hoomanlabs" }
];

export function L2Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-white">
      <div className="mx-auto max-w-[1400px] px-6 pb-12 pt-20 lg:px-10 lg:pt-24">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[1.4fr_repeat(5,_1fr)]">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="text-[20px] font-semibold tracking-[-0.02em]">
              HoomanLabs
            </div>
            <p className="mt-4 max-w-[280px] text-[13.5px] leading-[1.6] text-white/55">
              The voice operating system for India.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-[12.5px] text-white/55">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1.5 hover:border-white/35 hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.heading}>
 <div className="text-[11px] font-semibold tracking-[0.04em] text-white/45">
                {col.heading}
              </div>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-white/75 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-[12px] text-white/45">
          <div>&copy; {new Date().getFullYear()} HoomanLabs Technologies Pvt. Ltd.</div>
          <div className="flex gap-5">
            <Link href="/legal/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white">Terms</Link>
            <Link href="/legal/dpa" className="hover:text-white">DPA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
