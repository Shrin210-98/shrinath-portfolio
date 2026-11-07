import { GraduationCap } from "lucide-react";

import { Section } from "@/components/section";
import { resume } from "@/data/resume";

export function About() {
  return (
    <Section id="about" title="About" collapsible className="border-t">
      <p>{resume.summary}</p>

      <h3 className="mt-10 mb-4 text-sm font-bold text-text">Education</h3>
      <ul className="space-y-3">
        {resume.education.map((edu) => (
          <li key={edu.degree + edu.institution} className="flex gap-3">
            <GraduationCap className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="font-medium">
                {edu.degree} · {edu.institution}
              </p>
              <p className="text-sm text-muted">
                {edu.start}–{edu.end} · {edu.grade}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
