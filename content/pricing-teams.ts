export type BillingPeriod = "yearly" | "monthly";

export interface TeamSubPlan {
  name: string;
  /** Monthly equivalent when billing is yearly (the "discounted" rate). */
  yearlyMonthlyPrice: number;
  /** Sticker monthly rate (used both as the active price when toggled to
   *  Monthly and as the strikethrough on the yearly view). */
  monthlyPrice: number;
  description: string;
  cta: { label: string; href: string };
}

export const freePlan = {
  name: "Free",
  description:
    "Start exploring. Try HoomanLabs voice agents with limited monthly minutes.",
  tag: "STARTER",
  price: "₹0",
  details:
    "100 minutes per month. Build, simulate, and demo your first agent. No credit card.",
  cta: { label: "Sign up", href: "/signup" }
};

export const proHeader = {
  brand: "HOOMAN",
  badge: "PRO",
  description:
    "For your daily workflow. Pick the team size that matches your front desk."
};

export const proSubPlans: TeamSubPlan[] = [
  {
    name: "SOLO",
    yearlyMonthlyPrice: 999,
    monthlyPrice: 1499,
    description: "One agent — full-featured, no minute limit. Ideal for a single practice.",
    cta: { label: "Get Started", href: "/signup?plan=solo" }
  },
  {
    name: "PRACTICE",
    yearlyMonthlyPrice: 3999,
    monthlyPrice: 5499,
    description:
      "Bundle of 2 to 6 agents in a single subscription. Shared analytics and roles.",
    cta: { label: "Get Started", href: "/signup?plan=practice" }
  },
  {
    name: "TEAM",
    yearlyMonthlyPrice: 9999,
    monthlyPrice: 13999,
    description:
      "Up to 15 agents in a single subscription. Multi-clinic coverage with SSO.",
    cta: { label: "Get Started", href: "/signup?plan=team" }
  }
];

export const biggerGroup = {
  label: "Bigger group?",
  cta: { label: "Contact us", href: "#demo" }
};
