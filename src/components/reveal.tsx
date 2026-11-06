import { inView } from "motion";
import { animate } from "motion/mini";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle fade/slide-in on scroll.
 *
 * The page is prerendered, so content is visible in the HTML by default. After hydration,
 * blocks that are still below the fold are hidden and animated in when they scroll into view.
 * Uses motion's tiny imperative API (CSSOM styles, so it's CSP-safe) and does nothing at all
 * when the user prefers reduced motion.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    el.style.opacity = "0";
    el.style.transform = "translateY(16px)";
    const stop = inView(
      el,
      () => {
        animate(el, { opacity: 1, transform: "translateY(0px)" }, { duration: 0.45, ease: "easeOut" });
      },
      { amount: 0.15 },
    );
    return () => {
      stop();
      el.style.opacity = "";
      el.style.transform = "";
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
