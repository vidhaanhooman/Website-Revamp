"use client";

import Link from "next/link";

export function L2Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 80% -5%, #FAF4EA 0%, #F4EDDF 45%, #EEE5D4 100%)"
      }}
    >
      {/* HERO_BG — swap for <Image fill /> (1600x900) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 50% 80%, rgba(226,91,18,0.16), transparent 55%)"
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] opacity-60 [mask-image:linear-gradient(to_top,black,transparent)]">
        {/* <Image src="/landing2/hero-art.png" fill alt="" className="object-cover object-bottom" /> */}
      </div>

      <div className="relative mx-auto max-w-[1180px] px-6 pb-32 pt-28 text-center lg:pb-44 lg:pt-36">
        <h1 className="mx-auto max-w-[920px] text-[clamp(2.6rem,6.6vw,5.2rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-[#1B1209]">
          The voice operating system for India&apos;s next billion calls.
        </h1>
        <p className="mx-auto mt-7 max-w-[620px] text-[17.5px] leading-[1.55] text-[#6B6052]">
          Build, simulate, deploy, and observe AI voice agents in 22 languages -
          all from a single workspace.
        </p>
        <div className="mt-9 flex items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center rounded-full bg-[#1B1209] px-6 py-3.5 text-[14.5px] font-semibold text-[#F4EDDF] hover:bg-black"
          >
            Start building free
          </Link>
          <Link
            href="/book-demo"
            className="inline-flex items-center rounded-full border border-[rgba(27,18,9,0.15)] px-6 py-3.5 text-[14.5px] font-medium text-[#1B1209] hover:bg-[rgba(27,18,9,0.04)]"
          >
            Book a demo
          </Link>
        </div>
      </div>
    </section>
  );
}
