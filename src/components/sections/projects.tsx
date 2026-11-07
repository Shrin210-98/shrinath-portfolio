import { ArrowUpRight, FileText, Star } from "lucide-react";

import { Bracketed } from "@/components/bracketed";
import { GithubIcon } from "@/components/brand-icons";
import { ExternalLink } from "@/components/external-link";
import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { resume, type Project } from "@/data/resume";
import { cn } from "@/lib/utils";

// Long labels (e.g. the demo repo) must be able to wrap on narrow screens.
const footerButton = "h-auto min-h-8 max-w-full shrink py-1.5 text-left whitespace-normal";

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      className={cn(
        project.featured &&
          // Hard offset "stacked" shadow, nudged further on hover.
          "border-accent/60 shadow-[6px_6px_0_0_var(--accent)] transition-[translate,box-shadow] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_0_var(--accent)]",
      )}
    >
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          {project.featured ? (
            <Badge variant="accent">
              <Bracketed>
                <Star aria-hidden="true" className="size-3" />
                Featured
              </Bracketed>
            </Badge>
          ) : null}
          {project.version ? <Badge variant="outline">{project.version}</Badge> : null}
          {project.note ? (
            <Badge variant="outline">
              <Bracketed>{project.note}</Bracketed>
            </Badge>
          ) : null}
        </div>
        <CardTitle className={cn("mt-2", project.featured && "text-lg sm:text-xl")}>
          {project.url ? (
            <ExternalLink
              href={project.url}
              className="group inline-flex items-center gap-1 rounded-sm text-accent hover:text-accent-hover hover:underline underline-offset-4"
            >
              {project.name}
              <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </ExternalLink>
          ) : (
            project.name
          )}
        </CardTitle>
        <CardDescription>{project.tagline}</CardDescription>
      </CardHeader>

      <CardContent>
        {project.points.length ? (
          <ul className="space-y-2">
            {project.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="text-accent">
                  ▹
                </span>
                <span className="max-w-[70ch]">{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <ul className="flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>

      {project.url || project.writeUps?.length || project.repo ? (
        <CardFooter className="border-t border-border pt-4">
          {project.url ? (
            <Button asChild size="sm" className={footerButton}>
              <ExternalLink href={project.url}>
                <ArrowUpRight aria-hidden="true" />
                Live app
              </ExternalLink>
            </Button>
          ) : null}
          {project.repo ? (
            <Button asChild size="sm" variant="outline" className={footerButton}>
              <ExternalLink href={project.repo.href}>
                <GithubIcon className="size-4" />
                {project.repo.label}
              </ExternalLink>
            </Button>
          ) : null}
          {project.writeUps?.map((w) => (
            <Button key={w.href} asChild size="sm" variant="outline" className={footerButton}>
              <ExternalLink href={w.href}>
                <FileText aria-hidden="true" />
                {w.label}
              </ExternalLink>
            </Button>
          ))}
        </CardFooter>
      ) : null}
    </Card>
  );
}

export function Projects() {
  const sorted = [...resume.projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  return (
    <Section id="projects" title="Projects">
      <div className="space-y-6">
        {sorted.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
