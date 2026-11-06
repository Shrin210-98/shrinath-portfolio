import { Download, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";

import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { resume } from "@/data/resume";

const { profile } = resume;

function SocialLink({ href, label, external, children }: { href: string; label: string; external?: boolean; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" asChild>
          <a
            href={href}
            aria-label={external ? `${label} (opens in a new tab)` : label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-14 pb-6 sm:pt-24 sm:pb-10">
      <p className="mb-4 text-sm text-muted" aria-hidden="true">
        <span className="text-accent">~</span> $ whoami
      </p>
      <h1 id="hero-heading" className="text-3xl font-bold tracking-tight text-accent sm:text-5xl">
        {profile.name}
      </h1>
      <p className="mt-3 text-base font-medium text-text sm:text-lg">
        {profile.title}
        <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] animate-blink bg-accent" />
      </p>
      <p className="mt-6 text-muted">{profile.pitch}</p>
      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
        <MapPin className="size-4" aria-hidden="true" />
        {profile.location}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          <a href={profile.resumeUrl} download>
            <Download aria-hidden="true" />
            Download résumé
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#contact">
            <Mail aria-hidden="true" />
            Contact
          </a>
        </Button>
      </div>

      <ul className="mt-6 -ml-2 flex items-center gap-1" aria-label="Profiles">
        <li>
          <SocialLink href={profile.github} label="GitHub" external>
            <GithubIcon className="size-5" />
          </SocialLink>
        </li>
        <li>
          <SocialLink href={profile.linkedin} label="LinkedIn" external>
            <LinkedinIcon className="size-5" />
          </SocialLink>
        </li>
        <li>
          <SocialLink href={`mailto:${profile.email}`} label={`Email ${profile.email}`}>
            <Mail className="size-5" aria-hidden="true" />
          </SocialLink>
        </li>
      </ul>
    </section>
  );
}
