"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Read the active theme on mount - the layout's pre-hydration script
  // has already applied .dark to <html>, so this is just synchronising
  // React state with the DOM.
  useEffect(() => {
    if (typeof document === "undefined") return;
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* no-op */
    }
    setTheme(next);
  }

  // Until mounted we render a neutral placeholder so SSR + first-paint
  // markup match what the browser already shows.
  const isDark = theme === "dark";
  const Icon = isDark ? Sun : Moon;
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggle}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-hairline bg-white text-ink/85 transition-colors hover:text-ink",
        "dark:border-dark-edge dark:bg-dark-soft dark:text-dark-text/85 dark:hover:text-white",
        className
      )}
    >
      {theme === null ? (
        <span className="block h-3.5 w-3.5 rounded-full bg-current opacity-60" />
      ) : (
        <Icon size={15} strokeWidth={1.75} />
      )}
    </button>
  );
}
