import { ExternalLink } from "@/components/external-link";
import { Separator } from "@/components/ui/separator";
import { resume } from "@/data/resume";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto max-w-4xl px-4 pb-10 sm:px-6">
      <Separator />
      <div className="flex flex-col gap-2 pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        {/* Prerendered at build time; the year may update on hydration. */}
        <p suppressHydrationWarning>
          © {year} {resume.profile.name}
        </p>
        <p>
          Built with React, Tailwind &amp; Cloudflare Pages ·{" "}
          <ExternalLink
            href={resume.profile.sourceUrl}
            className="rounded-sm text-accent underline underline-offset-4 hover:text-accent-hover"
          >
            source
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
}
