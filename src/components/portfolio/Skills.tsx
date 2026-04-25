import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { skills } from "@/data/portfolio";

export const Skills = () => (
  <Section
    id="skills"
    eyebrow="cat skills.json"
    title="Skills"
    subtitle="The full stack I reach for across data science, ML engineering, and Gen AI work."
  >
    <div className="grid gap-4 md:grid-cols-2">
      {Object.entries(skills).map(([group, items]) => (
        <div
          key={group}
          className="rounded-lg border border-border bg-card p-5 glow-hover"
        >
          <h3 className="font-mono text-xs uppercase tracking-wider text-primary">
            {group}
          </h3>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {(items as readonly string[]).map((s) => (
              <Badge key={s} variant="secondary" className="font-mono text-[11px]">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  </Section>
);
