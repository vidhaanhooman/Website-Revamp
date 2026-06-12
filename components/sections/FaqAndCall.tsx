"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { faqs } from "@/content/faqs";

export function FaqAndCall() {
  return (
    <section
      className="relative bg-bg-warm py-20 md:py-28"
      style={{ backgroundColor: "#FBF6F0", color: "#15131A" }}
    >
      <div className="container">
        <div className="grid items-start gap-10 md:grid-cols-[300px_1fr] md:gap-14">
          {/* Left: book-a-call card */}
          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-hairline bg-white p-6 shadow-[0_20px_50px_-30px_rgba(20,15,10,0.18)]"
          >
            <div
              className="text-[14px] font-medium"
              style={{ color: "#15131A" }}
            >
              We believe in meaningful conversations.
            </div>
            <p
              className="mt-3 text-[14px] leading-[1.55]"
              style={{ color: "rgba(21,19,26,0.6)" }}
            >
              To help you out, we provide a free{" "}
              <span className="font-medium" style={{ color: "#15131A" }}>
                20-minute call
              </span>{" "}
              to answer your questions.
            </p>
            <a
              href="#demo"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[13.5px] font-medium text-white transition-colors hover:bg-ink-soft"
            >
              <Calendar size={13} strokeWidth={1.75} />
              Book a free call
              <ArrowRight size={13} strokeWidth={2.25} className="ml-0.5" />
            </a>
          </motion.aside>

          {/* Right: FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <Accordion items={faqs} defaultOpen={0} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
