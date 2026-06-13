"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, ArrowUpRight } from "lucide-react";
import {
  blogPosts,
  BLOG_TYPES,
  BLOG_TOPICS,
  BLOG_INDUSTRIES,
  type BlogPost
} from "@/content/blog";

const INK = "#FFFFFF";
const INK_MUTED = "rgba(255,255,255,0.65)";
const INK_FAINT = "rgba(255,255,255,0.45)";
const BORDER = "rgba(255,255,255,0.1)";
const BORDER_STRONG = "rgba(255,255,255,0.18)";
const SURFACE = "rgba(255,255,255,0.04)";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function FilterDropdown({
  label,
  options,
  value,
  onChange
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-left"
        style={{ color: INK }}
      >
        <span>
          <span
            className="block text-[10px] uppercase tracking-[0.22em]"
            style={{ color: INK_FAINT }}
          >
            {label}
          </span>
          <span
            className="mt-0.5 block text-[13.5px] font-medium"
            style={{ color: INK }}
          >
            {value}
          </span>
        </span>
        <ChevronDown
          size={14}
          className={
            "shrink-0 transition-transform duration-200 " +
            (open ? "rotate-180" : "")
          }
          style={{ color: INK_FAINT }}
        />
      </button>
      {open ? (
        <ul className="pb-3" role="listbox">
          {options.map((opt) => {
            const active = opt === value;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={
                    "block w-full rounded-md px-2 py-1.5 text-left text-[13px] transition-colors hover:bg-white/[0.06]"
                  }
                  style={{ color: active ? INK : "rgba(255,255,255,0.7)" }}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function PostThumb({ post }: { post: BlogPost }) {
  return (
    <div
      className="hidden h-[120px] w-[260px] shrink-0 overflow-hidden rounded-2xl md:block"
      style={{
        background: `linear-gradient(135deg, ${post.thumbColor} 0%, ${post.thumbAccent ?? post.thumbColor} 100%)`
      }}
    >
      {/* Subtle inner gradient overlay for depth */}
      <div
        aria-hidden
        className="h-full w-full"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(255,255,255,0.18), transparent 60%)"
        }}
      />
    </div>
  );
}

export function BlogIndex() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return blogPosts.filter((p) => {
      if (typeFilter !== "All" && p.type !== typeFilter) return false;
      if (topicFilter !== "All" && p.topic !== topicFilter) return false;
      if (industryFilter !== "All" && p.industry !== industryFilter)
        return false;
      if (q) {
        const hay = `${p.title} ${p.description} ${p.type} ${p.topic} ${p.industry}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [search, typeFilter, topicFilter, industryFilter]);

  return (
    <section
      className="relative min-h-screen"
      style={{ backgroundColor: "#0a0a0d", color: INK }}
    >
      {/* HERO STRIP */}
      <div className="relative overflow-hidden">
        {/* Background image — masked to fade out cleanly at the bottom edge */}
        <div
          aria-hidden
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/BlogBG.png')",
            WebkitMaskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)",
            maskImage:
              "linear-gradient(180deg, black 0%, black 55%, transparent 100%)"
          }}
        />
        {/* Scrim — ramps to solid page bg by the bottom so there's no seam */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,13,0.5) 0%, rgba(10,10,13,0.35) 40%, rgba(10,10,13,0.85) 80%, #0a0a0d 100%)"
          }}
        />

        <div className="relative mx-auto max-w-[1240px] px-4 pb-12 pt-24 md:pb-16 md:pt-28">
          <p
            className="font-sans text-[11px] font-medium uppercase tracking-[0.22em]"
            style={{ color: INK_FAINT }}
          >
            [Resources] &nbsp; Blog &amp; field notes
          </p>
          <div className="mt-6 grid items-end gap-8 md:grid-cols-2 md:gap-14">
            <h1
              className="font-serif font-normal leading-[1] tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]"
              style={{
                fontSize: "clamp(2.25rem, 5.6vw, 4.5rem)",
                color: "#FFFFFF"
              }}
            >
              Everything you need,
              <br />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                in one place.
              </span>
            </h1>
            <p
              className="max-w-md text-[15px] leading-[1.6] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)] md:ml-auto"
              style={{ color: "rgba(255,255,255,0.78)" }}
            >
              Field notes from building voice agents in India - customer
              stories, engineering deep-dives, and the choices that shape a
              product. Organized for clarity, built to help you ship faster.
            </p>
          </div>
        </div>
      </div>

      {/* BODY - sidebar + list */}
      <div className="mx-auto max-w-[1240px] px-4 pb-32">
        <div className="grid items-start gap-10 md:grid-cols-[260px_1fr] md:gap-16">
          {/* Sidebar */}
          <aside className="md:sticky md:top-28 md:self-start">
            {/* Search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: INK_FAINT }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full rounded-full border px-9 py-2.5 text-[13.5px] outline-none transition-colors"
                style={{
                  backgroundColor: SURFACE,
                  borderColor: BORDER,
                  color: INK
                }}
              />
            </div>

            {/* Filters */}
            <div className="mt-5 border-t border-white/10">
              <FilterDropdown
                label="Type"
                options={BLOG_TYPES}
                value={typeFilter}
                onChange={setTypeFilter}
              />
              <FilterDropdown
                label="Topic"
                options={BLOG_TOPICS}
                value={topicFilter}
                onChange={setTopicFilter}
              />
              <FilterDropdown
                label="Industry"
                options={BLOG_INDUSTRIES}
                value={industryFilter}
                onChange={setIndustryFilter}
              />
            </div>

            {/* Reset */}
            {(typeFilter !== "All" ||
              topicFilter !== "All" ||
              industryFilter !== "All" ||
              search !== "") ? (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setTypeFilter("All");
                  setTopicFilter("All");
                  setIndustryFilter("All");
                }}
                className="mt-5 text-[12px] underline"
                style={{ color: INK_MUTED }}
              >
                Reset filters
              </button>
            ) : null}

            <p
              className="mt-8 text-[11px] uppercase tracking-[0.22em]"
              style={{ color: INK_FAINT }}
            >
              {filtered.length} {filtered.length === 1 ? "post" : "posts"}
            </p>
          </aside>

          {/* Article list */}
          <div className="divide-y divide-white/10 border-t border-white/10">
            {filtered.length === 0 ? (
              <div
                className="py-20 text-center text-[14px]"
                style={{ color: INK_MUTED }}
              >
                No posts match those filters.
              </div>
            ) : (
              filtered.map((post) => (
                <article
                  key={post.slug}
                  className="group grid grid-cols-1 gap-6 py-10 md:grid-cols-[1fr_auto] md:gap-10"
                >
                  <div>
                    <p
                      className="text-[11px] font-medium uppercase tracking-[0.22em]"
                      style={{ color: INK_FAINT }}
                    >
                      {post.type}{" "}
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>{" "}
                      <span style={{ color: INK_MUTED }}>
                        {formatDate(post.date)}
                      </span>{" "}
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>{" "}
                      <span style={{ color: INK_MUTED }}>
                        {post.readTime}
                      </span>
                    </p>
                    <h2
                      className="mt-4 font-sans text-[22px] font-semibold leading-[1.2] tracking-tight md:text-[24px]"
                      style={{ color: INK }}
                    >
                      <a
                        href={`/blog/${post.slug}`}
                        className="transition-colors hover:opacity-70"
                      >
                        {post.title}
                      </a>
                    </h2>
                    <p
                      className="mt-3 max-w-2xl text-[14.5px] leading-[1.55]"
                      style={{ color: INK_MUTED }}
                    >
                      {post.description}
                    </p>
                    <a
                      href={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium"
                      style={{ color: INK }}
                    >
                      Read more
                      <ArrowUpRight size={12} strokeWidth={2.25} />
                    </a>
                  </div>
                  <PostThumb post={post} />
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
