"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const MENU = [
  {
    label: "Product",
    items: [
      { label: "Build", href: "/features/details#build" },
      { label: "Simulate", href: "/features/details#simulate" },
      { label: "Deploy", href: "/features/details#deploy" },
      { label: "Observability", href: "/features/details#observability" }
    ]
  },
  {
    label: "Use cases",
    items: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Lending & Fintech", href: "/industries/lending" },
      { label: "Commerce & D2C", href: "/industries/commerce" },
      { label: "Education", href: "/industries/education" }
    ]
  },
  {
    label: "Discover",
    items: [
      { label: "Customer stories", href: "/blog?category=customer-story" },
      { label: "Changelog", href: "/changelog" },
      { label: "Docs", href: "/docs" }
    ]
  }
];

export function L2Navbar() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(27,18,9,0.10)] bg-[#F4EDDF]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-8 px-6 py-3.5 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-[#1B1209]"
        >
          HoomanLabs
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {MENU.map((m) => (
            <div
              key={m.label}
              className="relative"
              onMouseEnter={() => setOpen(m.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-[14px] font-medium text-[#1B1209]/85 hover:text-[#1B1209]">
                {m.label}
                <ChevronDown size={13} strokeWidth={2.25} className="opacity-60" />
              </button>
              {open === m.label && (
                <div className="absolute left-0 top-full w-[220px] pt-2">
                  <div className="overflow-hidden rounded-xl border border-[rgba(27,18,9,0.12)] bg-[#FBF6EC] py-2 shadow-[0_18px_50px_-12px_rgba(27,18,9,0.18)]">
                    {m.items.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        className="block px-4 py-2 text-[13.5px] text-[#1B1209]/85 hover:bg-[rgba(27,18,9,0.04)] hover:text-[#1B1209]"
                      >
                        {it.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            href="/pricing"
            className="rounded-md px-3 py-2 text-[14px] font-medium text-[#1B1209]/85 hover:text-[#1B1209]"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/book-demo"
            className="hidden rounded-full border border-[rgba(27,18,9,0.15)] px-4 py-2 text-[13.5px] font-medium text-[#1B1209] hover:bg-[rgba(27,18,9,0.04)] md:inline-flex"
          >
            Contact sales
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center rounded-full bg-[#1B1209] px-4 py-2 text-[13.5px] font-semibold text-[#F4EDDF] hover:bg-black"
          >
            Open app
          </Link>
        </div>
      </div>
    </header>
  );
}
