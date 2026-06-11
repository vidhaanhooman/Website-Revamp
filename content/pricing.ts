export interface PricingRow {
  label: string;
  value: string;
}

export interface Plan {
  name: string;
  description: string;
  pricing: PricingRow[];
  /** Optional small footnote rendered under the pricing block. */
  pricingNote?: string;
  features: string[];
  cta: { label: string; href: string };
  tint: "neutral" | "violet";
}

export const plans: Plan[] = [
  {
    name: "Pay as you go",
    description: "No commitment. Pay only for the minutes you use.",
    pricing: [
      { label: "Standard Agent", value: "₹7.5/min" },
      { label: "Premium Agent", value: "₹10/min" }
    ],
    features: [
      "No commitment required",
      "Minimum recharge: ₹1,000",
      "Credits never expire",
      "Bonus credits on ₹10,000+ recharge",
      "5 concurrent call slots",
      "5K batch campaign limit"
    ],
    cta: { label: "Get Started", href: "/signup" },
    tint: "neutral"
  },
  {
    name: "Enterprise",
    description: "Lower per-minute rate, dedicated support, annual commit.",
    pricing: [
      { label: "Standard Agent", value: "₹5/min" },
      { label: "Premium Agent", value: "₹6.75/min" }
    ],
    pricingNote: "Price drops further with higher commitment.",
    features: [
      "Min ₹50K monthly spend",
      "Annual commitment",
      "20 concurrent call slots",
      "Dedicated Slack support",
      "QA & Simulation access",
      "50K batch campaign limit"
    ],
    cta: { label: "Contact Sales", href: "#demo" },
    tint: "violet"
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
  { value: "₹0.40", label: "Per-minute, all-in" }
];
