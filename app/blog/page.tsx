import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { getAllPosts } from "@/lib/queries";
import { blogPosts as staticPosts } from "@/content/blog";

export const metadata = {
  title: "Blog - HoomanLabs",
  description:
    "Field notes from building voice agents in India - customer stories, engineering deep-dives, and product updates."
};

/* ISR: revalidate at most once per minute. Sanity-side webhooks can purge sooner. */
export const revalidate = 60;

export default async function BlogPage() {
  let posts;
  try {
    const fromSanity = await getAllPosts();
    posts =
      fromSanity.length > 0
        ? fromSanity.map((p) => ({
            slug: p.slug,
            type: p.category,
            title: p.title,
            description: p.description,
            date: p.date,
            readTime: p.readTime,
            thumbColor: p.thumbColor,
            thumbAccent: p.thumbAccent
          }))
        : staticPosts;
  } catch (err) {
    // If the Sanity fetch fails (env not set, network), fall back to the
    // static array so the page never errors in build or at runtime.
    console.warn("[blog] Sanity fetch failed, using static fallback:", err);
    posts = staticPosts;
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <BlogIndex posts={posts} />
      <Footer />
    </main>
  );
}
