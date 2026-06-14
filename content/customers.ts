/* Customer / partner logos shown in the Hero marquee.
   Each entry references an SVG inside /public/Logo/. Add new brands by
   dropping the SVG into /public/Logo/ and adding a row below. */
export interface CustomerLogo {
  name: string;
  src: string;
  /** Optional per-logo width override (px) so tall/short marks visually balance. */
  width?: number;
}

export const customerLogos: CustomerLogo[] = [
  { name: "Kalvium", src: "/Logo/Kalvium 1.svg", width: 120 },
  { name: "Wakefit", src: "/Logo/wakefit 1.svg", width: 110 },
  { name: "SaffronStays", src: "/Logo/Saffronstays 1.svg", width: 140 },
  { name: "ApnaMart", src: "/Logo/apnamartLogoNew 1.svg", width: 120 },
  { name: "Jodo", src: "/Logo/jodo 1.svg", width: 90 },
  { name: "Netwave", src: "/Logo/netwave 1.svg", width: 110 }
];

/* Legacy text-only names kept for any consumers that still want strings. */
export const customers = customerLogos.map((c) => c.name);
