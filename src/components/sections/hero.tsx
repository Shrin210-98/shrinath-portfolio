import { Download, Mail, MapPin } from "lucide-react";
import type { ReactNode } from "react";

import { Bracketed } from "@/components/bracketed";
import { ThemeToggle } from "@/components/theme-toggle";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ExternalLink } from "@/components/external-link";
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

function Avatar({ className }: { className?: string }) {
  const { avatar, handle } = profile;
  return (
    <figure className={className}>
      <img
        src={avatar.src}
        srcSet={avatar.srcSet}
        sizes="(min-width: 640px) 165px, 90px"
        width={avatar.width}
        height={avatar.height}
        alt={avatar.alt}
        fetchPriority="high"
        decoding="async"
        className="h-auto w-24 rounded-lg border border-border shadow-[4px_4px_0_0_var(--accent)] sm:w-44"
      />
      {/* On mobile the handle is shown beside the image instead (see Hero). */}
      <figcaption className="mt-3 hidden text-center text-sm text-muted sm:block">
        <Bracketed>{handle}</Bracketed>
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="pt-14 pb-6 sm:pt-24 sm:pb-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
        <div className="order-2 min-w-0 sm:order-1">
          {/* Name, title and pitch are visually hidden; screen readers and search engines still get them. */}
          <div className="sr-only">
            <h1 id="hero-heading">{profile.name}</h1>
            <p>{profile.title}</p>
          </div>

          <p aria-hidden="true" className="mb-4 text-sm text-muted">
            <span className="text-accent">~</span> $ whoami
          </p>
          <div className="text-base leading-[1.6] font-medium text-text sm:text-lg md:text-xl lg:text-2xl">
            {profile.whoami.map((line, i) => (
              <p key={line.text}>
                {line.text}
                {line.link ? (
                  <ExternalLink
                    href={line.link.href}
                    className="rounded-sm font-bold text-accent underline decoration-2 underline-offset-4 hover:text-accent-hover"
                  >
                    {line.link.label}
                  </ExternalLink>
                ) : null}
                {i === profile.whoami.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-[1.1em] w-[0.6ch] translate-y-[0.2em] animate-blink bg-accent"
                  />
                ) : null}
              </p>
            ))}
          </div>
          <p className="mt-6 hidden items-center gap-1.5 text-sm text-muted sm:flex">
            <MapPin className="size-4" aria-hidden="true" />
            {profile.location}
          </p>
        </div>

        {/* Mobile: avatar, handle and location centred, theme switch in the top-right corner.
            Desktop: avatar + switch side by side on the right. */}
        <div className="relative order-1 flex shrink-0 flex-col items-center gap-3 sm:order-2 sm:flex-row sm:items-start sm:gap-3 sm:self-center">
          <Avatar />
          <div className="flex flex-col items-center gap-1 text-center sm:hidden">
            <p className="font-bold text-accent">
              <Bracketed>{profile.handle}</Bracketed>
            </p>
            <p className="flex items-center gap-1.5 text-sm text-muted">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              {profile.location}
            </p>
          </div>
          {/* Must stay positioned (absolute/relative): the switch's sliding knob is positioned inside it. */}
          <ThemeToggle className="absolute top-0 right-0 sm:relative" />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button asChild size="lg">
          {/* External résumé page opens in a new tab; a local /public file is downloaded. */}
          {/^https?:\/\//.test(profile.resumeUrl) ? (
            <ExternalLink href={profile.resumeUrl}>
              <Download aria-hidden="true" />
              Download résumé
            </ExternalLink>
          ) : (
            <a href={profile.resumeUrl} download>
              <Download aria-hidden="true" />
              Download résumé
            </a>
          )}
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
