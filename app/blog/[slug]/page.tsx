import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getAllSlugs, getPostBySlug } from "@/lib/queries";
import { urlFor } from "@/lib/sanity";
import { notFound } from "next/navigation";

export const revalidate = 300;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) return { title: "Post not found - HoomanLabs" };
  return {
    title: `${post.title} - HoomanLabs`,
    description: post.description
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/* Portable Text renderers - matches the dark theme + serif/sans rhythm. */
const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="mt-12 font-serif text-[36px] font-normal leading-[1.1] tracking-tight text-white md:text-[44px]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 font-serif text-[30px] font-normal leading-[1.15] tracking-tight text-white md:text-[36px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 font-sans text-[22px] font-semibold leading-[1.2] tracking-tight text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 font-sans text-[18px] font-semibold leading-[1.25] tracking-tight text-white">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mt-5 text-[16.5px] leading-[1.75] text-white/85">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 border-white/30 pl-5 font-serif text-[20px] italic text-white/85">
        {children}
      </blockquote>
    )
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-[16.5px] leading-[1.7] text-white/85">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-[16.5px] leading-[1.7] text-white/85">
        {children}
      </ol>
    )
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[14px] text-white/90">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline decoration-white/40 underline-offset-4 transition-colors hover:decoration-white"
      >
        {children}
      </a>
    )
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={urlFor(value).width(1200).fit("max").auto("format").url()}
          alt={value.alt ?? ""}
          className="mt-8 w-full rounded-2xl border border-white/10"
        />
      );
    }
  }
};

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug).catch(() => null);
  if (!post) notFound();

  return (
    <main className="relative min-h-screen bg-[#0a0a0d] text-white">
      <Navbar />

      <article className="relative mx-auto max-w-[760px] px-4 pb-24 pt-32 md:pt-40">
        <Link
          href="/blog"
 className="inline-flex items-center gap-1.5 font-sans text-[11.5px] font-medium tracking-[0.04em] text-white/55 transition-colors hover:text-white"
        >
          <ArrowLeft size={13} strokeWidth={2.25} />
          All posts
        </Link>

 <div className="mt-8 flex flex-wrap items-center gap-3 font-sans text-[11.5px] tracking-[0.04em] text-white/55">
          <span
            className="rounded-full px-2.5 py-1 font-medium"
            style={{
              color: post.thumbColor,
              backgroundColor: `${post.thumbColor}1a`,
              border: `1px solid ${post.thumbColor}33`
            }}
          >
            {post.category}
          </span>
          <span>{formatDate(post.date)}</span>
          <span className="text-white/40">·</span>
          <span>{post.readTime}</span>
        </div>

        <h1 className="mt-5 font-serif text-[clamp(2.25rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight text-white">
          {post.title}
        </h1>

        {post.description ? (
          <p className="mt-5 text-[17px] font-medium leading-[1.6] text-white/70">
            {post.description}
          </p>
        ) : null}

        {post.author ? (
          <div className="mt-7 flex items-center gap-3 border-t border-white/10 pt-6">
 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 font-sans text-[13px] font-semibold text-white">
              {post.author.name?.[0] ?? "?"}
            </div>
            <div>
              <div className="font-sans text-[13.5px] font-semibold text-white">
                {post.author.name}
              </div>
              {post.author.bio ? (
                <div className="font-sans text-[12px] text-white/55">
                  {post.author.bio}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="mt-10">
          <PortableText value={post.content} components={components} />
        </div>
      </article>

      <Footer />
    </main>
  );
}
