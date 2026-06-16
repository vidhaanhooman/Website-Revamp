"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { blogPosts, BLOG_TYPES, type BlogPost } from "@/content/blog";

const PAGE_BG = "#F6F6F7";
const INK = "#16151A";
const INK_MUTED = "rgba(22,21,26,0.6)";
const INK_FAINT = "rgba(22,21,26,0.42)";
const CORAL = "#F77E5C";
const PAGE_SIZE = 9;

/* Category pill palette - soft tint bg + readable text. */
const CAT_COLORS: Record<string, { bg: string; fg: string }> = {
  "Customer story": { bg: "#DCF5E6", fg: "#1B7A4B" },
  Engineering: { bg: "#E7E0FB", fg: "#5B3FB8" },
  Product: { bg: "#DDEBFD", fg: "#1F6FC4" },
  Industry: { bg: "#FCEFD3", fg: "#9A6B14" },
  News: { bg: "#FBE0EC", fg: "#B23A6E" }
};
const DEFAULT_CAT = { bg: "#ECECEF", fg: "#52525B" };
const catColor = (t: string) => CAT_COLORS[t] ?? DEFAULT_CAT;

function PageBtn({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      {...props}
      className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-35"
      style={{ color: INK_MUTED, borderColor: "rgba(22,21,26,0.14)" }}
    >
      {children}
    </button>
  );
}

function Pill({ label }: { label: string }) {
  const c = catColor(label);
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-[3px] font-sans text-[11px] font-medium"
      style={{ backgroundColor: c.bg, color: c.fg }}
    >
      {label}
    </span>
  );
}

function Thumb({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={"relative overflow-hidden " + (className ?? "")}
      style={{
        background: `linear-gradient(135deg, ${post.thumbColor} 0%, ${post.thumbAccent ?? post.thumbColor} 100%)`
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 75% 0%, rgba(255,255,255,0.22), transparent 60%)"
        }}
      />
    </div>
  );
}

function MetaRow({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Pill label={String(post.type)} />
      {post.topic ? <Pill label={post.topic} /> : null}
      <span className="font-sans text-[11px]" style={{ color: INK_FAINT }}>
        {post.readTime}
      </span>
    </div>
  );
}

/* Grid card - image on top, meta + title + excerpt below. */
function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Thumb post={post} className="aspect-[16/10] w-full rounded-xl" />
      <div className="mt-3.5">
        <MetaRow post={post} />
        <h3
          className="mt-2.5 font-sans text-[16.5px] font-semibold leading-[1.3] tracking-tight transition-colors group-hover:opacity-70"
          style={{ color: INK }}
        >
          {post.title}
        </h3>
        <p className="mt-2 font-sans text-[13px] leading-[1.55]" style={{ color: INK_MUTED }}>
          {post.description}
        </p>
      </div>
    </Link>
  );
}

interface BlogIndexProps {
  posts?: BlogPost[];
}

export function BlogIndex({ posts }: BlogIndexProps = {}) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [page, setPage] = useState(1);
  const source = posts ?? blogPosts;

  // Back to page 1 whenever the filters change.
  useEffect(() => {
    setPage(1);
  }, [search, cat]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return source.filter((p) => {
      if (cat !== "All" && p.type !== cat) return false;
      if (q) {
        const hay = `${p.title} ${p.description} ${p.type} ${p.topic ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, cat, source]);

  const featured = filtered[0];
  const rest = filtered.slice(1);
  const promo = source.find((p) => p.type === "Product") ?? source[0];

  const totalPages = Math.max(1, Math.ceil(rest.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = rest.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const goToPage = (n: number) => {
    setPage(n);
    document.getElementById("blog-posts")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative" style={{ backgroundColor: PAGE_BG, color: INK }}>
      {/* HERO */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, #EEEEF1 0%, #F3F3F5 45%, #F6F6F7 100%)"
        }}
      >
        <div className="mx-auto max-w-[1180px] px-5 pb-28 pt-28 text-center md:pb-36 md:pt-32">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: CORAL }}
          >
            HoomanLabs Blog
          </p>
          <h1
            className="mx-auto mt-5 max-w-[900px] text-balance font-dmsans font-bold leading-[1.06] tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.3rem,5vw,3.6rem)", color: INK }}
          >
            Voice AI insight that drives real customer impact.
          </h1>
        </div>
      </div>

      {/* BODY */}
      <div className="mx-auto max-w-[1180px] px-5">
        {/* Details on top - search + categories + promo (newsletter removed) */}
        <div className="grid items-start gap-10 border-b pb-12 pt-12 md:grid-cols-[1.3fr_0.85fr] md:gap-14" style={{ borderColor: "rgba(22,21,26,0.1)" }}>
          {/* Search + category pills */}
          <div>
            <div className="relative max-w-md">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: INK_FAINT }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the blog"
                className="w-full rounded-full border bg-white px-10 py-2.5 font-sans text-[13.5px] outline-none"
                style={{ borderColor: "rgba(22,21,26,0.14)", color: INK }}
              />
            </div>
            <p className="mt-6 font-sans text-[12px] font-medium" style={{ color: INK_FAINT }}>
              Featured Categories
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {BLOG_TYPES.map((t) => {
                const on = cat === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setCat(t)}
                    className="rounded-full border px-3.5 py-1.5 font-sans text-[13px] transition-colors"
                    style={
                      on
                        ? { backgroundColor: INK, color: "#fff", borderColor: INK }
                        : { color: INK_MUTED, borderColor: "rgba(22,21,26,0.14)" }
                    }
                  >
                    {t === "All" ? "All posts" : t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Promo card */}
          {promo ? (
            <Link
              href={`/blog/${promo.slug}`}
              className="group block overflow-hidden rounded-2xl"
              style={{ background: "linear-gradient(150deg,#FCE0D4 0%,#F6E7DC 100%)" }}
            >
              <div className="p-5">
                <div className="flex h-20 items-center justify-center rounded-xl bg-white/60 font-mono text-[10px] uppercase tracking-[0.16em]" style={{ color: INK_FAINT }}>
                  Voice AI playbook · 2026
                </div>
                <h4 className="mt-4 font-sans text-[15px] font-semibold leading-[1.25] tracking-tight" style={{ color: INK }}>
                  How to build a world-class AI customer service team
                </h4>
                <p className="mt-2 font-sans text-[12px] leading-[1.5]" style={{ color: INK_MUTED }}>
                  Templates and guidance on building a team that uses AI and
                  humans to their fullest potential.
                </p>
                <span
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-sans text-[12px] font-medium text-white transition-transform group-hover:translate-x-0.5"
                  style={{ backgroundColor: CORAL }}
                >
                  Learn more
                  <ArrowUpRight size={12} />
                </span>
              </div>
            </Link>
          ) : null}
        </div>

        {/* Featured article */}
        {featured ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-12 block overflow-hidden rounded-3xl bg-white p-3 shadow-[0_30px_70px_-30px_rgba(20,20,40,0.35)]"
          >
            <div className="grid items-center gap-5 md:grid-cols-2">
              <Thumb post={featured} className="aspect-[4/3] w-full rounded-2xl" />
              <div className="p-3 md:p-6">
                <MetaRow post={featured} />
                <h2
                  className="mt-4 font-sans font-semibold leading-[1.15] tracking-tight"
                  style={{ fontSize: "clamp(1.5rem,2.6vw,2rem)", color: INK }}
                >
                  {featured.title}
                </h2>
                <p
                  className="mt-3 max-w-md font-sans text-[14px] leading-[1.6]"
                  style={{ color: INK_MUTED }}
                >
                  {featured.description}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-2 font-sans text-[13px] font-medium"
                  style={{ color: INK }}
                >
                  Read
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-full text-white transition-transform group-hover:translate-x-0.5"
                    style={{ backgroundColor: CORAL }}
                  >
                    <ArrowRight size={13} />
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ) : null}

        {/* All posts */}
        {rest.length > 0 ? (
          <div className="pb-28">
            <div id="blog-posts" className="mt-14 grid gap-x-7 gap-y-10 scroll-mt-24 sm:grid-cols-2 md:grid-cols-3">
              {pageItems.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 ? (
              <nav className="mt-16 flex items-center justify-center gap-1.5" aria-label="Blog pagination">
                <PageBtn
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage === 1}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={15} />
                </PageBtn>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
                  const on = n === safePage;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => goToPage(n)}
                      aria-current={on ? "page" : undefined}
                      className="flex h-9 min-w-9 items-center justify-center rounded-full border px-3 font-sans text-[13px] font-medium transition-colors"
                      style={
                        on
                          ? { backgroundColor: INK, color: "#fff", borderColor: INK }
                          : { color: INK_MUTED, borderColor: "rgba(22,21,26,0.14)" }
                      }
                    >
                      {n}
                    </button>
                  );
                })}
                <PageBtn
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage === totalPages}
                  aria-label="Next page"
                >
                  <ChevronRight size={15} />
                </PageBtn>
              </nav>
            ) : null}
          </div>
        ) : (
          <div className="py-16" />
        )}

        {filtered.length === 0 ? (
          <div className="pb-28 pt-4 text-center font-sans text-[14px]" style={{ color: INK_MUTED }}>
            No posts match those filters.
          </div>
        ) : null}
      </div>
    </section>
  );
}
