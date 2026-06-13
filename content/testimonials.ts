export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Two-letter initials for the avatar. */
  initials: string;
  /** Avatar gradient tone. */
  tone: "ember" | "violet" | "mint" | "rose" | "sky" | "amber";
  /** Short brand label shown at top of large cards. */
  brand?: string;
  /** Card size - large cards span 2 rows on desktop. */
  size?: "small" | "large";
  /** Accent style for large cards. */
  accent?: "white" | "coral";
}

export const testimonials: Testimonial[] = [
  // Large left - white accent
  {
    quote:
      "Maya handled three weeks of rescheduling without a single complaint. We stopped staffing the after-hours line entirely. Patients are talking to her in Hindi at 11pm and getting same-night confirmations.",
    author: "Priya N.",
    role: "Operations Lead",
    company: "Brightside Dental",
    initials: "PN",
    tone: "ember",
    brand: "Brightside",
    size: "large",
    accent: "white"
  },
  // Middle column - three small
  {
    quote:
      "Forwarded the main line on a Friday - queue was gone by Monday. The voice is genuinely warm. Patients haven't noticed.",
    author: "Marcus L.",
    role: "Founder",
    company: "Apex Home Services",
    initials: "ML",
    tone: "violet"
  },
  {
    quote:
      "Compliance review was the easiest part. BAA day one, audit trail per call, no PHI in logs. Live in a week.",
    author: "Dr. Lena F.",
    role: "Clinical Director",
    company: "Brookside Care",
    initials: "LF",
    tone: "mint"
  },
  {
    quote:
      "Code-switching Hindi-English mid-sentence was the dealbreaker for everyone else. HoomanLabs just handled it.",
    author: "Sanjay R.",
    role: "Head of Support",
    company: "RyderHealth",
    initials: "SR",
    tone: "sky"
  },
  // Right column top - small
  {
    quote:
      "We doubled volume without adding a single person. The dashboard is the only place I look on Monday morning.",
    author: "Aanya K.",
    role: "VP Operations",
    company: "Meridian Insurance",
    initials: "AK",
    tone: "rose"
  },
  // Bottom row left - small
  {
    quote:
      "Plugged in our existing Plivo line, picked the languages, gone live in a day. No procurement, no waiting.",
    author: "Rohan D.",
    role: "Engineering Lead",
    company: "PharmEasy",
    initials: "RD",
    tone: "amber"
  },
  // Large right - coral accent
  {
    quote:
      "We were paying ₹40 per call for an offshore team that couldn't speak Tamil. HoomanLabs is ₹0.40, picks up in three rings, and the patient never asks for a human.",
    author: "Vikram T.",
    role: "Founder",
    company: "StoneRidge Vet",
    initials: "VT",
    tone: "ember",
    brand: "StoneRidge",
    size: "large",
    accent: "coral"
  }
];
