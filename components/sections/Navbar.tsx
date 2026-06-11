"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
// import { ThemeToggle } from "@/components/ui/ThemeToggle";
// Theme toggle hidden while dark mode ships behind a flag — see app/layout.tsx.
import { navLinks, industries } from "@/content/nav";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDD, setOpenDD] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <motion.nav
        aria-label="Primary"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={cn(
          "flex w-full max-w-[1180px] items-center justify-between gap-4 rounded-full border border-hairline bg-white/85 shadow-nav backdrop-blur-xl transition-all duration-300 ease-out",
          "dark:border-dark-edge dark:bg-dark-soft/85",
          scrolled ? "px-3 py-2 md:px-4 md:py-2" : "px-4 py-2.5 md:px-5 md:py-3"
        )}
      >
        <a href="#" className="flex shrink-0 items-center pl-1.5">
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-2 lg:flex">
          {navLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-ink/85 transition-colors hover:text-ink dark:text-dark-text/85 dark:hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li
            className="relative"
            onMouseEnter={() => setOpenDD(true)}
            onMouseLeave={() => setOpenDD(false)}
          >
            <button
              className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-[14px] font-medium text-ink/85 transition-colors hover:text-ink dark:text-dark-text/85 dark:hover:text-white"
              aria-expanded={openDD}
            >
              Industries
              <ChevronDown size={13} strokeWidth={2.25} className="opacity-60" />
            </button>
            {openDD ? (
              <div className="absolute left-1/2 top-full z-50 min-w-[300px] -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-hairline bg-white p-1.5 shadow-lift dark:border-dark-edge dark:bg-dark-soft">
                  {industries.map((it) => (
                    <a
                      key={it.label}
                      href={it.href}
                      className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-bg-soft dark:hover:bg-dark-edge"
                    >
                      <div className="text-[13.5px] font-medium text-ink dark:text-dark-text">
                        {it.label}
                      </div>
                      <div className="mt-0.5 text-[12.5px] text-muted dark:text-dark-muted">
                        {it.description}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </li>
        </ul>

        <div className="hidden items-center gap-1.5 lg:flex">
          <a href="#demo">
            <Button variant="outline" size="sm">
              Book a Demo
            </Button>
          </a>
          <span className="mx-1 h-5 w-px bg-hairline dark:bg-dark-edge" aria-hidden />
          <a href="/dashboard">
            <Button variant="outline" size="sm">
              Dashboard
            </Button>
          </a>
          <a href="/signup">
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white dark:border-dark-edge dark:bg-dark-soft dark:text-dark-text"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.nav>

      {mobileOpen ? (
        <div className="absolute inset-x-4 top-[68px] rounded-3xl border border-hairline bg-white p-4 shadow-lift lg:hidden dark:border-dark-edge dark:bg-dark-soft">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink hover:bg-bg-soft dark:text-dark-text dark:hover:bg-dark-edge"
              >
                {l.label}
              </a>
            ))}
            <details className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 text-[15px] font-medium text-ink hover:bg-bg-soft dark:text-dark-text dark:hover:bg-dark-edge">
                Industries
                <ChevronDown
                  size={14}
                  className="transition-transform group-open:rotate-180"
                />
              </summary>
              <div className="space-y-1 pb-1 pl-2">
                {industries.map((it) => (
                  <a
                    key={it.label}
                    href={it.href}
                    className="block rounded-lg px-3 py-2 text-[14px] text-muted hover:bg-bg-soft dark:text-dark-muted dark:hover:bg-dark-edge"
                  >
                    {it.label}
                  </a>
                ))}
              </div>
            </details>
            <div className="mt-3 grid gap-2">
              <Button variant="outline" size="sm">
                Book a Demo
              </Button>
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
              <Button variant="primary" size="sm">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
