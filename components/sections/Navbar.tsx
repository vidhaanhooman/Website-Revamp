"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { navLinks } from "@/content/nav";
import { cn } from "@/lib/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Two separate floating pills, Giga-style — left holds brand + links,
  // right holds the CTAs. On scroll both deepen their glass slightly.
  const pillBase =
    "flex items-center rounded-full border backdrop-blur-md transition-all duration-300 ease-out";
  const pillSurface = scrolled
    ? "border-dark-edge bg-dark-soft/85 shadow-nav backdrop-blur-xl"
    : "border-white/15 bg-black/35";

  return (
    <div className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3">
        {/* LEFT PILL — brand + primary nav */}
        <motion.nav
          aria-label="Primary"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className={cn(pillBase, pillSurface, "gap-2 pl-3 pr-2 py-2 md:pl-4 md:py-2")}
        >
          <a href="#" className="flex shrink-0 items-center pr-1">
            <Wordmark tone="dark" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="rounded-full px-3.5 py-1.5 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger lives in the left pill so the right pill stays clean */}
          <button
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </motion.nav>

        {/* RIGHT PILL — CTAs (hidden on mobile, mobile uses drawer) */}
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className={cn(
            pillBase,
            pillSurface,
            "hidden gap-1 p-1.5 lg:flex"
          )}
        >
          <a href="#demo">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full bg-transparent text-white hover:bg-white/10"
            >
              Book a Demo
            </Button>
          </a>
          <a href="/signup">
            <Button
              variant="primary"
              size="sm"
              className="rounded-full bg-white text-ink hover:bg-white/90"
            >
              Sign Up
            </Button>
          </a>
        </motion.div>
      </div>

      {mobileOpen ? (
        <div className="absolute inset-x-4 top-[68px] rounded-3xl border border-dark-edge bg-dark-soft p-4 shadow-lift lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-3 py-2.5 text-[15px] font-medium text-dark-text hover:bg-dark-edge"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-3 grid gap-2">
              <a href="#demo">
                <Button variant="outline" size="sm" className="w-full">
                  Book a Demo
                </Button>
              </a>
              <a href="/signup">
                <Button variant="primary" size="sm" className="w-full">
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
