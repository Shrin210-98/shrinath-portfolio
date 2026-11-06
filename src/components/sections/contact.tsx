import { Mail } from "lucide-react";
import type { ReactNode } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExternalLink } from "@/components/external-link";
import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { resume } from "@/data/resume";

const { profile } = resume;

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
      <span className="flex w-28 items-center gap-2 text-sm text-muted">
        {icon}
        {label}
      </span>
      {children}
    </li>
  );
}

const linkClass = "rounded-sm break-all text-accent underline-offset-4 hover:text-accent-hover hover:underline";

export function Contact() {
  return (
    <Section id="contact" title="Contact">
      <p>{resume.contactBlurb}</p>

      <Button asChild size="lg" className="mt-6">
        <a href={`mailto:${profile.email}`}>
          <Mail aria-hidden="true" />
          Say hello
        </a>
      </Button>

      <ul className="mt-8 space-y-4">
        <Row icon={<Mail className="size-4" aria-hidden="true" />} label="Email">
          <a href={`mailto:${profile.email}`} className={linkClass}>
            {profile.email}
          </a>
        </Row>
        <Row icon={<LinkedinIcon className="size-4" />} label="LinkedIn">
          <ExternalLink href={profile.linkedin} className={linkClass}>
            {profile.linkedin.replace(/^https:\/\/(www\.)?/, "")}
          </ExternalLink>
        </Row>
        <Row icon={<GithubIcon className="size-4" />} label="GitHub">
          <ExternalLink href={profile.github} className={linkClass}>
            {profile.github.replace(/^https:\/\//, "")}
          </ExternalLink>
        </Row>
      </ul>
    </Section>
  );
}
