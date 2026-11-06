import { Section } from "@/components/section";
import { Badge } from "@/components/ui/badge";
import { resume } from "@/data/resume";

export function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="space-y-6">
        {resume.skills.map((group) => (
          <div key={group.label} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="text-sm font-medium text-muted sm:pt-0.5">{group.label}</dt>
            <dd>
              <ul className="flex flex-wrap gap-2" aria-label={group.label}>
                {group.items.map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
