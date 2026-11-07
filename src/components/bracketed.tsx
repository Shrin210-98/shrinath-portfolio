import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Terminal-style "[ label ]". The brackets are decorative, so screen readers skip them. */
export function Bracketed({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      <span aria-hidden="true" className="opacity-70">
        [
      </span>
      {children}
      <span aria-hidden="true" className="opacity-70">
        ]
      </span>
    </span>
  );
}
