"use client";

import { useState, useId, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";

interface AccordionItem {
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  defaultOpen?: number | null;
}

export function Accordion({ items, className, defaultOpen = null }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-hairline border-y border-hairline", className)}>
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const buttonId = `${baseId}-button-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200"
              >
                <span className="text-[15px] font-medium text-ink">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-hairline bg-white text-ink transition-transform duration-300 ease-out",
                    expanded && "rotate-45"
                  )}
                >
                  <Plus size={14} strokeWidth={1.75} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="pb-5 pr-9 text-[14px] leading-[1.6] text-muted"
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
