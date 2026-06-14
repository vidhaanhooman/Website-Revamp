import { groq } from "next-sanity";
import { sanity } from "./sanity";

/* ─── Types ─────────────────────────────────────────────────── */

export interface SanityImage {
  asset?: { _ref: string; _type: "reference" };
  hotspot?: unknown;
}

export interface SanityAuthor {
  name: string;
  slug: string;
  bio?: string;
  socialLinks?: { linkedin?: string; github?: string };
}

export interface SanityBlogPostCard {
  slug: string;
  title: string;
  description: string; // sourced from excerpt
  date: string; // publishedAt ISO
  readTime: string; // derived
  category: string; // category->title, used as "type" filter
  categorySlug: string;
  thumbColor: string; // derived from category
  thumbAccent?: string;
  author?: SanityAuthor;
}

export interface SanityBlogPostFull extends SanityBlogPostCard {
  content: unknown[]; // Portable Text blocks
}

/* ─── Helpers - colors + read time ─────────────────────────── */

const CATEGORY_PALETTE: Record<string, { color: string; accent: string }> = {
  "Customer Story": { color: "#F77E5C", accent: "#FFD3BA" },
  Engineering: { color: "#7257C7", accent: "#C8B6FF" },
  Product: { color: "#4877D8", accent: "#A7C0F5" },
  Industry: { color: "#3E9E72", accent: "#A8E0C4" },
  News: { color: "#E5572E", accent: "#FFBFA1" }
};

function palette(category: string | null | undefined) {
  if (category && CATEGORY_PALETTE[category]) return CATEGORY_PALETTE[category];
  return { color: "#F77E5C", accent: "#FFD3BA" };
}

/** Walk Portable Text and estimate read time at ~225 wpm. */
function estimateReadTime(content: unknown[] | null | undefined): string {
  if (!Array.isArray(content) || content.length === 0) return "3 min read";
  let words = 0;
  for (const block of content) {
    if (
      block &&
      typeof block === "object" &&
      "children" in block &&
      Array.isArray((block as { children?: unknown }).children)
    ) {
      for (const child of (block as { children: { text?: string }[] }).children) {
        if (typeof child.text === "string") {
          words += child.text.trim().split(/\s+/).filter(Boolean).length;
        }
      }
    }
  }
  const minutes = Math.max(1, Math.round(words / 225));
  return `${minutes} min read`;
}

/* ─── Queries ───────────────────────────────────────────────── */

const ALL_POSTS = groq`
  *[_type == "blogPost" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    "slug": slug.current,
    title,
    "description": coalesce(description, excerpt, ""),
    "date": coalesce(publishedAt, _createdAt),
    "category": category->title,
    "categorySlug": category->slug.current,
    "author": author->{
      name,
      "slug": slug.current,
      bio,
      socialLinks
    },
    "wordCount": count(content[].children[].text)
  }
`;

const POST_BY_SLUG = groq`
  *[_type == "blogPost" && slug.current == $slug][0]{
    "slug": slug.current,
    title,
    "description": coalesce(description, excerpt, ""),
    "date": coalesce(publishedAt, _createdAt),
    "category": category->title,
    "categorySlug": category->slug.current,
    "author": author->{
      name,
      "slug": slug.current,
      bio,
      socialLinks
    },
    content
  }
`;

const ALL_SLUGS = groq`
  *[_type == "blogPost" && defined(slug.current)].slug.current
`;

/* ─── Fetchers ──────────────────────────────────────────────── */

interface RawCard {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string | null;
  categorySlug: string | null;
  author?: SanityAuthor;
  wordCount?: number;
}

function decorate(raw: RawCard, content?: unknown[]): SanityBlogPostCard {
  const { color, accent } = palette(raw.category);
  const readTime = content
    ? estimateReadTime(content)
    : raw.wordCount
      ? `${Math.max(1, Math.round(raw.wordCount / 225))} min read`
      : "3 min read";
  return {
    slug: raw.slug,
    title: raw.title,
    description: raw.description,
    date: raw.date,
    readTime,
    category: raw.category ?? "Article",
    categorySlug: raw.categorySlug ?? "article",
    thumbColor: color,
    thumbAccent: accent,
    author: raw.author
  };
}

export async function getAllPosts(): Promise<SanityBlogPostCard[]> {
  const raws = await sanity.fetch<RawCard[]>(
    ALL_POSTS,
    {},
    { next: { revalidate: 60 } }
  );
  return raws.map((r) => decorate(r));
}

export async function getPostBySlug(
  slug: string
): Promise<SanityBlogPostFull | null> {
  const doc = await sanity.fetch<(RawCard & { content: unknown[] }) | null>(
    POST_BY_SLUG,
    { slug },
    { next: { revalidate: 60 } }
  );
  if (!doc) return null;
  const card = decorate(doc, doc.content);
  return { ...card, content: doc.content ?? [] };
}

export async function getAllSlugs(): Promise<string[]> {
  return sanity.fetch<string[]>(ALL_SLUGS, {}, { next: { revalidate: 300 } });
}
