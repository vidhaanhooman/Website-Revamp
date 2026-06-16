export interface AgentRate {
  /** Agent tier name (e.g. "Standard agent"). */
  label: string;
  /** Per-minute rate (e.g. "₹7.5"). */
  rate: string;
}

export interface PricingTier {
  id: "pay-as-you-go" | "enterprise";
  name: string;
  /** Short summary of who the tier is for. */
  blurb: string;
  /** Dual rate display - Standard + Premium per minute. */
  rates: AgentRate[];
  /** Optional small footnote under the rates (e.g. discount note). */
  rateNote?: string;
  /** Feature list. */
  features: string[];
  /** CTA button. */
  cta: { label: string; href: string };
  /** Whether this tier is the highlighted/recommended one. */
  highlight?: boolean;
}

export const tiers: PricingTier[] = [
  {
    id: "pay-as-you-go",
    name: "Pay as you go",
    blurb: "No commitment. Pay only for the minutes you actually use.",
    rates: [
      { label: "Standard agent", rate: "₹7.5" },
      { label: "Premium agent", rate: "₹10" }
    ],
    features: [
      "No commitment required",
      "Minimum recharge: ₹1,000",
      "Credits never expire",
      "Bonus credits on ₹10,000+ recharge",
      "5 concurrent call slots",
      "5K batch campaign limit"
    ],
    cta: { label: "Get started", href: "/signup" }
  },
  {
    id: "enterprise",
    name: "Enterprise",
    blurb: "Lower per-minute rate, dedicated support, annual commitment.",
    rates: [],
    rateNote: "Custom pricing, tailored to your volume and commitment.",
    features: [
      "Min ₹50K monthly spend",
      "Annual commitment",
      "20 concurrent call slots",
      "Dedicated Slack support",
      "QA & Simulation access",
      "50K batch campaign limit"
    ],
    cta: { label: "Talk to sales", href: "/#agent-demo" },
    highlight: true
  }
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "3.2×", label: "After-hours pickup" },
  { value: "+38%", label: "Completed bookings" },
  { value: "96.2%", label: "CSAT, last 30 days" },
  { value: "₹5", label: "Per-minute, Enterprise" }
];
