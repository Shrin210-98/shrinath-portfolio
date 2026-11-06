import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { resume } from "@/data/resume";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
] as const;

const NAV_IDS = NAV_ITEMS.map((item) => item.id);

export function Header() {
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape or when growing past the mobile breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const linkClass = (id: string) =>
    cn(
      "rounded-sm text-sm font-medium transition-colors hover:text-accent",
      active === id ? "text-accent" : "text-muted",
    );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6">
        <a
          href="#top"
          className="rounded-sm text-lg font-bold tracking-tight text-accent hover:text-accent-hover"
          aria-label={`${resume.profile.name} — back to top`}
        >
          {resume.profile.initials}
        </a>

        <div className="flex items-center gap-1 md:gap-6">
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={linkClass(item.id)} aria-current={active === item.id ? "true" : undefined}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Primary mobile" hidden={!open} className="border-t border-border md:hidden">
        <ul className="mx-auto flex max-w-4xl flex-col px-4 py-2 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={cn(linkClass(item.id), "block py-3")}
                aria-current={active === item.id ? "true" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
