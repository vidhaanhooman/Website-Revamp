export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Two-letter initials for the avatar. */
  initials: string;
  /** Tailwind-ready bg + text class for the avatar circle. */
  tone: "ember" | "violet" | "mint" | "rose";
  /** Bottom outcome chip — keep short, one line. */
  metric: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Maya handled three weeks of rescheduling without a single complaint. We stopped staffing the after-hours line entirely.",
    author: "Priya N.",
    role: "Operations Lead",
    company: "Brightside Dental",
    initials: "PN",
    tone: "ember",
    metric: "−84% missed appointments"
  },
  {
    quote:
      "We forwarded the main line on a Friday and the queue was gone by Monday. The voice is genuinely warm — patients haven't noticed.",
    author: "Marcus L.",
    role: "Founder",
    company: "Apex Home Services",
    initials: "ML",
    tone: "violet",
    metric: "+3.2× after-hours pickup"
  },
  {
    quote:
      "Compliance review was the easiest part. BAA on day one, audit trail per call, no PHI in logs. We were live in a week.",
    author: "Dr. Lena F.",
    role: "Clinical Director",
    company: "Brookside Care",
    initials: "LF",
    tone: "mint",
    metric: "Live in 6 days"
  }
];
