export type BlogType =
  | "Customer story"
  | "Engineering"
  | "Product"
  | "Industry"
  | "News";

export interface BlogPost {
  slug: string;
  type: BlogType;
  topic: string;
  industry: string;
  title: string;
  description: string;
  date: string; // ISO
  readTime: string;
  thumbColor: string; // hex - used for placeholder swatch
  thumbAccent?: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "brightside-dental-after-hours",
    type: "Customer story",
    topic: "Operations",
    industry: "Healthcare",
    title:
      "How Brightside Dental cut after-hours staffing by 84% with HoomanLabs.",
    description:
      "A 12-branch dental group switched its evening line over to Maya and recovered an entire FTE in three weeks - with zero patient complaints.",
    date: "2026-06-01",
    readTime: "6 min read",
    thumbColor: "#F77E5C",
    thumbAccent: "#FFD3BA"
  },
  {
    slug: "hindi-english-code-switching",
    type: "Engineering",
    topic: "Multilingual",
    industry: "All",
    title:
      "Why Hindi–English code-switching is the dealbreaker for voice AI in India.",
    description:
      "How callers actually talk: a teardown of 50,000 real conversations from healthcare, insurance, and service queues - and what it means for ASR.",
    date: "2026-05-22",
    readTime: "9 min read",
    thumbColor: "#7257C7",
    thumbAccent: "#C8B6FF"
  },
  {
    slug: "context-and-memory",
    type: "Product",
    topic: "Platform",
    industry: "All",
    title:
      "Context & Memory - tools, history, and a real knowledge base.",
    description:
      "The agent now reaches for the right tool, remembers the caller's last interaction, and answers from your indexed docs. Here's how it works.",
    date: "2026-05-14",
    readTime: "5 min read",
    thumbColor: "#3E9E72",
    thumbAccent: "#7AE1A4"
  },
  {
    slug: "dpdp-audit-trails",
    type: "Industry",
    topic: "Compliance",
    industry: "Healthcare",
    title: "DPDP-ready: audit trails, PHI redaction, and consent for India.",
    description:
      "What the DPDP Act actually requires from a voice platform - and the engineering decisions that make compliance the easy part, not the long part.",
    date: "2026-04-29",
    readTime: "7 min read",
    thumbColor: "#1F89C8",
    thumbAccent: "#7AB6F0"
  },
  {
    slug: "apex-home-services",
    type: "Customer story",
    topic: "Lead conversion",
    industry: "Service businesses",
    title:
      "Apex Home Services tripled after-hours pickup in seven days.",
    description:
      "Marcus L. forwarded his main line on a Friday. By Monday the queue was empty and bookings were up 3.2×. The week in his own words.",
    date: "2026-04-15",
    readTime: "4 min read",
    thumbColor: "#E5413B",
    thumbAccent: "#FF8A7A"
  },
  {
    slug: "sub-300ms-pipeline",
    type: "Engineering",
    topic: "Latency",
    industry: "All",
    title:
      "Engineering a sub-300ms voice agent pipeline across Indian carriers.",
    description:
      "The full stack - STT, LLM, TTS, telephony - and the four bottlenecks that took us from 1.2s to 248ms median time-to-first-word.",
    date: "2026-04-02",
    readTime: "12 min read",
    thumbColor: "#4877D8",
    thumbAccent: "#A6BFFF"
  },
  {
    slug: "series-a-announcement",
    type: "News",
    topic: "Company",
    industry: "All",
    title:
      "HoomanLabs raises Series A to scale India-first voice agents.",
    description:
      "We're scaling the team across engineering, ops, and India go-to-market. A note on what we're building, why now, and who we're hiring.",
    date: "2026-03-18",
    readTime: "3 min read",
    thumbColor: "#15131A",
    thumbAccent: "#5A3FB0"
  },
  {
    slug: "stoneridge-vet-rural",
    type: "Customer story",
    topic: "Operations",
    industry: "Healthcare",
    title:
      "₹0.40 per minute, three rings to pickup: StoneRidge Vet's rural rollout.",
    description:
      "How a Tamil Nadu veterinary practice moved off ₹40-per-call offshore staff to HoomanLabs - and what changed for the farmers calling in at 5am.",
    date: "2026-03-04",
    readTime: "5 min read",
    thumbColor: "#FFB02E",
    thumbAccent: "#FFD86F"
  },
  {
    slug: "byot-india-first",
    type: "Product",
    topic: "Telephony",
    industry: "All",
    title:
      "Bring your own telephony: Plivo, Exotel, Tata, and Twilio routing on day one.",
    description:
      "Why we built BYOT first instead of selling SIP minutes - and how teams plug in their existing DIDs in under an hour.",
    date: "2026-02-19",
    readTime: "6 min read",
    thumbColor: "#5B47E0",
    thumbAccent: "#9B89D8"
  },
  {
    slug: "real-time-transcripts",
    type: "Engineering",
    topic: "Observability",
    industry: "All",
    title:
      "Real-time transcripts with per-utterance latency - and a seekable waveform.",
    description:
      "How the live console renders speaker-attributed transcripts as the agent talks, with one click to redirect a call to a human.",
    date: "2026-02-05",
    readTime: "8 min read",
    thumbColor: "#3E9E72",
    thumbAccent: "#A8E0C0"
  }
];

export const BLOG_TYPES: ("All" | BlogType)[] = [
  "All",
  "Customer story",
  "Engineering",
  "Product",
  "Industry",
  "News"
];

export const BLOG_TOPICS = [
  "All",
  "Operations",
  "Multilingual",
  "Platform",
  "Compliance",
  "Latency",
  "Lead conversion",
  "Telephony",
  "Observability",
  "Company"
];

export const BLOG_INDUSTRIES = [
  "All",
  "Healthcare",
  "Service businesses",
  "Finance",
  "Insurance"
];
