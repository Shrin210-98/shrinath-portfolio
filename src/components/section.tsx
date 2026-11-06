import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
      <Reveal>
        <h2 id={headingId} className="mb-8 text-lg font-bold text-accent sm:text-xl">
          <span aria-hidden="true" className="mr-2 font-medium text-muted">
            ##
          </span>
          {title}
        </h2>
        {children}
      </Reveal>
    </section>
  );
}
