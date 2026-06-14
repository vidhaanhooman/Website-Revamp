"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function L2Banner() {
  return (
    <div className="w-full bg-[#1B1209] text-[#F4EDDF]">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-3 px-6 py-2.5 text-[12.5px] font-medium">
 <span className="rounded-full bg-[#E25B12] px-2 py-0.5 text-[10.5px] font-semibold tracking-[0.04em] text-white">
          New
        </span>
        <span className="text-[#F4EDDF]/85">
          HoomanLabs MCP is now live - your agents, in any LLM client.
        </span>
        <Link
          href="/blog/mcp-launch"
          className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
        >
          Read the announcement <ArrowRight size={13} strokeWidth={2.25} />
        </Link>
      </div>
    </div>
  );
}
