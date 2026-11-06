import { ArrowUpRight } from "lucide-react";

import { ExternalLink } from "@/components/external-link";
import { Section } from "@/components/section";
import { resume } from "@/data/resume";

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Experience() {
  return (
    <Section id="experience" title="Experience">
      <ol className="relative space-y-12 border-l border-border pl-6 sm:pl-8">
        {resume.experience.map((job) => (
          <li key={job.company + job.start} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[calc(1.5rem+5px)] size-2.5 rounded-full bg-accent ring-4 ring-bg sm:-left-[calc(2rem+5px)]"
            />
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="font-bold text-text">
                {job.role} <span className="text-accent">· {job.company}</span>
              </h3>
              <p className="shrink-0 text-sm text-muted">
                <time>{job.start}</time> – <time>{job.end}</time>
              </p>
            </div>
            <p className="mt-1 text-sm text-muted">{job.location}</p>

            <ul className="mt-4 space-y-2">
              {job.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="text-accent">
                    ▹
                  </span>
                  <span className="max-w-[70ch]">{h}</span>
                </li>
              ))}
            </ul>

            {job.clientProjects?.length ? (
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-medium text-muted">Client projects</h4>
                <ul className="space-y-3 border-l border-border pl-4">
                  {job.clientProjects.map((p) => (
                    <li key={p.url}>
                      <ExternalLink
                        href={p.url}
                        className="group inline-flex items-center gap-1 rounded-sm font-medium text-accent hover:text-accent-hover hover:underline underline-offset-4"
                      >
                        {p.name}
                        <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </ExternalLink>
                      <span className="ml-2 text-sm text-muted">{hostname(p.url)}</span>
                      <p className="mt-0.5 text-sm">{p.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
