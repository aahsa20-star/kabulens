"use client";

import { useState, useRef, useEffect } from "react";
import { financialTerms } from "@/lib/financial-terms";

interface Props {
  term: string;
  ja?: string;
  children: React.ReactNode;
}

export default function FinancialTermTooltip({ term, ja, children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const termData = financialTerms[term];
  const jaText = ja || termData?.ja || term;
  const description = termData?.description || "";

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open]);

  return (
    <span
      ref={ref}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      <span className="border-b border-dashed border-accent cursor-help">
        {children}
      </span>

      {open && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 pointer-events-none">
          <span className="block bg-navy text-white rounded-lg shadow-lg p-3 text-left">
            <span className="block text-xs font-bold text-accent-light mb-1">
              {term}
            </span>
            <span className="block text-sm font-semibold mb-1">{jaText}</span>
            {description && (
              <span className="block text-[11px] text-gray-300 leading-relaxed">
                {description}
              </span>
            )}
          </span>
          {/* Arrow */}
          <span className="block w-0 h-0 mx-auto border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-navy" />
        </span>
      )}
    </span>
  );
}
