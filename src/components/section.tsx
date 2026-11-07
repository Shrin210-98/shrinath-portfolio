import { animate } from "motion/mini";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash;
const getServerHash = () => "";

function Heading({ title }: { title: string }) {
  return (
    <>
      <span aria-hidden="true" className="mr-2 font-medium text-muted">
        ##
      </span>
      {title}
    </>
  );
}

/**
 * Page section with an "## Title" heading. With `collapsible`, the heading becomes a disclosure
 * button (WAI-ARIA accordion pattern) and the content starts closed. It opens when clicked,
 * when the URL hash targets it (e.g. /#experience), or when find-in-page matches text inside it.
 */
export function Section({
  id,
  title,
  children,
  className,
  collapsible = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
  collapsible?: boolean;
}) {
  const headingId = `${id}-heading`;
  const panelId = `${id}-panel`;
  const panelRef = useRef<HTMLDivElement>(null);

  // null = untouched by the user → open only if deep-linked.
  const [userOpen, setUserOpen] = useState<boolean | null>(null);
  const hash = useSyncExternalStore(subscribeHash, getHash, getServerHash);
  const open = !collapsible || (userOpen ?? hash === `#${id}`);

  // Re-open when an in-page link targets this section again.
  useEffect(() => {
    if (!collapsible) return;
    const onHash = () => {
      if (window.location.hash === `#${id}`) setUserOpen(true);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [collapsible, id]);

  // Closed panels use hidden="until-found" so the browser's find-in-page can reveal them.
  // (React only renders a boolean `hidden`, so the value is set here after hydration.)
  useEffect(() => {
    const panel = panelRef.current;
    if (!collapsible || !panel) return;
    if (!open) panel.setAttribute("hidden", "until-found");
    const onBeforeMatch = () => setUserOpen(true);
    panel.addEventListener("beforematch", onBeforeMatch);
    return () => panel.removeEventListener("beforematch", onBeforeMatch);
  }, [collapsible, open]);

  const toggle = () => {
    const next = !open;
    setUserOpen(next);
    const panel = panelRef.current;
    if (next && panel && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => {
        animate(panel, { opacity: [0, 1], transform: ["translateY(-6px)", "translateY(0px)"] }, { duration: 0.25, ease: "easeOut" });
      });
    }
  };

  if (!collapsible) {
    return (
      <section id={id} aria-labelledby={headingId} className={cn("py-12 sm:py-16", className)}>
        <Reveal>
          <h2 id={headingId} className="mb-8 text-lg font-bold text-accent sm:text-xl">
            <Heading title={title} />
          </h2>
          {children}
        </Reveal>
      </section>
    );
  }

  return (
    <section id={id} aria-labelledby={headingId} className={cn("border-b border-border", className)}>
      <Reveal>
        <h2 id={headingId} className="text-lg font-bold text-accent sm:text-xl">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={toggle}
            className="group flex w-full items-center justify-between gap-4 rounded-sm py-5 text-left hover:text-accent-hover sm:py-6"
          >
            <span>
              <Heading title={title} />
            </span>
            <span aria-hidden="true" className="text-sm font-medium text-muted group-hover:text-accent">
              [{open ? "−" : "+"}]
            </span>
          </button>
        </h2>
        <div id={panelId} ref={panelRef} role="region" aria-labelledby={headingId} hidden={!open}>
          {/* Padding lives on an inner box: hidden="until-found" keeps the panel's own box rendered. */}
          <div className="pt-2 pb-10">{children}</div>
        </div>
      </Reveal>
    </section>
  );
}
