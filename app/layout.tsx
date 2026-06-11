import type { Metadata } from "next";
import {
  Inter,
  JetBrains_Mono,
  Instrument_Serif,
  Manrope
} from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap"
});

// Manrope as a Gilroy-Medium substitute — closest free Google Fonts geometric
// humanist sans. Swap to a local Gilroy via @next/font/local if you license it.
const gilroy = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-gilroy",
  display: "swap"
});

export const metadata: Metadata = {
  title: "HoomanLabs — One platform for all your voice agents",
  description:
    "Build, test, deploy, and monitor production-grade AI voice agents. Orchestration, real-time monitoring, and enterprise-grade configurability for healthcare and service businesses.",
  metadataBase: new URL("https://hoomanlabs.ai"),
  openGraph: {
    title: "HoomanLabs",
    description:
      "One platform for all your voice agents. Build, test, deploy, monitor.",
    type: "website",
    url: "https://hoomanlabs.ai"
  }
};

// Dark mode is shipped behind a feature flag — every dark: Tailwind variant
// stays in the codebase but the .dark class never lands on <html>, so the
// site always renders in light mode for now. Flip ENABLE_DARK_MODE back on
// (and restore the bootstrap script in <head>) when ready.
const ENABLE_DARK_MODE = false;

const themeBootstrap = `
(function() {
  try {
    var s = localStorage.getItem('theme');
    var dark = s === 'dark' || (!s && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (dark) document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${serif.variable} ${gilroy.variable}`}
      suppressHydrationWarning
    >
      <head>
        {ENABLE_DARK_MODE ? (
          <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        ) : null}
      </head>
      <body className="bg-bg text-ink">{children}</body>
    </html>
  );
}
