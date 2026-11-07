import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Status = "idle" | "copied" | "failed";

/** Copies `value` to the clipboard; the result is announced to screen readers via a live region. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 2000);
  };

  const message = status === "copied" ? "Copied!" : status === "failed" ? "Couldn't copy, please select the text" : "";

  return (
    <span className="inline-flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="size-8" onClick={copy} aria-label={label}>
            {status === "copied" ? <Check aria-hidden="true" className="text-accent" /> : <Copy aria-hidden="true" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
      <span role="status" aria-live="polite" className="text-sm text-muted">
        {message}
      </span>
    </span>
  );
}
