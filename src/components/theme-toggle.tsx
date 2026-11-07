import { Moon, Sun } from "lucide-react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

/**
 * Vertical sun/moon switch. The knob position and icon colours are driven by the `dark` class
 * on <html> via CSS, so the prerendered HTML is already correct before React hydrates.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const label =
    theme === null ? "Toggle colour theme" : theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          className={cn(
            "group relative flex h-20 w-10 shrink-0 flex-col items-center justify-between rounded-full border border-border bg-chip p-1 transition-colors hover:border-accent",
            className,
          )}
        >
          {/* Sliding knob: top = light, bottom = dark. */}
          <span
            aria-hidden="true"
            className="absolute top-1 left-1 size-8 rounded-full bg-accent shadow-[2px_2px_0_0_var(--border)] transition-transform duration-200 ease-out dark:translate-y-[2.375rem]"
          />
          {/* Each icon sits in a knob-sized slot, so the knob lands exactly behind it. */}
          <span aria-hidden="true" className="relative flex size-8 items-center justify-center">
            <Sun className="size-4 text-bg transition-colors dark:text-muted" />
          </span>
          <span aria-hidden="true" className="relative flex size-8 items-center justify-center">
            <Moon className="size-4 text-muted transition-colors dark:text-bg" />
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}
