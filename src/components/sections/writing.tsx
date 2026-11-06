import { ArrowUpRight } from "lucide-react";

import { ExternalLink } from "@/components/external-link";
import { Section } from "@/components/section";
import { resume } from "@/data/resume";

function shortUrl(url: string) {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "") + u.pathname.replace(/\/[^/]+\/?$/, "");
  } catch {
    return url;
  }
}

export function Writing() {
  return (
    <Section id="writing" title="Writing">
      <ul className="grid gap-4 sm:grid-cols-2">
        {resume.writing.map((post) => (
          <li key={post.url}>
            <ExternalLink
              href={post.url}
              className="group flex h-full flex-col justify-between gap-6 rounded-lg border border-border bg-bg p-5 transition-colors hover:border-accent"
            >
              <span className="font-bold text-text group-hover:text-accent">{post.title}</span>
              <span className="flex items-center justify-between gap-2 text-sm text-muted">
                {shortUrl(post.url)}
                <ArrowUpRight
                  className="size-4 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </span>
            </ExternalLink>
          </li>
        ))}
      </ul>
    </Section>
  );
}
