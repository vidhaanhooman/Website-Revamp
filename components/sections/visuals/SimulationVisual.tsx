"use client";

/* Simulate - many scenarios running in parallel, built with shadcn-style
   Card / Badge / Progress primitives. Re-animates when the step is active. */

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

type Status = "run" | "pass" | "fail";
type Scenario = { title: string; tag: string; status: Status; turns: number };

const SCENARIOS: Scenario[] = [
  { title: "Impatient caller", tag: "HI", status: "pass", turns: 9 },
  { title: "Code-switch mid-call", tag: "HI · EN", status: "pass", turns: 14 },
  { title: "Refuses to verify ID", tag: "EN", status: "run", turns: 6 },
  { title: "Noisy line", tag: "TA", status: "pass", turns: 11 },
  { title: "Off-script ask", tag: "EN", status: "fail", turns: 7 },
  { title: "Wrong number", tag: "HI", status: "run", turns: 4 }
];

function StatusBadge({ status }: { status: Status }) {
  if (status === "pass")
    return (
      <Badge variant="pass">
        <Check size={9} strokeWidth={3} />
        PASS
      </Badge>
    );
  if (status === "fail")
    return (
      <Badge variant="fail">
        <X size={9} strokeWidth={3} />
        FAIL
      </Badge>
    );
  return (
    <Badge variant="running">
      <span className="h-1 w-1 animate-pulse rounded-full bg-amber-400" />
      RUNNING
    </Badge>
  );
}

const FILL: Record<Status, string> = {
  pass: "bg-emerald-400",
  fail: "bg-[#E5413B]",
  run: "bg-amber-400"
};

export function SimulationVisual({ active }: { active: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Clean sky backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/journey/BackGround%20Journey%20Box.png')"
        }}
      />

      <div className="relative flex h-full items-center justify-center p-4 md:p-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <Card>
            <CardHeader>
              <span className="flex items-center gap-2 font-sans text-[11px] font-semibold text-white">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                Simulating
              </span>
              <span className="font-sans text-[9.5px] tracking-[0.12em] text-white/45">
                33 SCENARIOS · 99 RUNS
              </span>
            </CardHeader>

            <CardContent>
              <div className="divide-y divide-white/[0.05]">
                {SCENARIOS.map((s, i) => (
                  <motion.div
                    key={s.title}
                    className="grid grid-cols-[1fr_88px_72px] items-center gap-3 px-4 py-2.5"
                    initial={{ opacity: 0, x: -8 }}
                    animate={
                      active ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }
                    }
                    transition={{
                      duration: 0.35,
                      ease: "easeOut",
                      delay: 0.25 + i * 0.1
                    }}
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="truncate font-sans text-[11.5px] font-medium text-white/90">
                        {s.title}
                      </span>
                      <span className="shrink-0 font-sans text-[8.5px] tracking-[0.12em] text-white/35">
                        {s.tag}
                      </span>
                      <span className="shrink-0 font-mono text-[8.5px] text-white/30">
                        {s.turns} turns
                      </span>
                    </div>
                    <Progress
                      active={active}
                      indeterminate={s.status === "run"}
                      value={100}
                      indicatorClassName={FILL[s.status]}
                    />
                    <div className="justify-self-end">
                      <StatusBadge status={s.status} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="font-sans text-[10px]">
              <span className="text-emerald-300">3 passed</span>
              <span className="text-amber-300">2 running</span>
              <span className="text-[#FF8A7A]">1 failed</span>
              <span className="ml-auto text-white/40">93 left in queue</span>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
