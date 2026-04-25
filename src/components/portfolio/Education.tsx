import { GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { education } from "@/data/portfolio";

export const Education = () => (
  <Section id="education" eyebrow="ls education/" title="Education">
    <div className="grid gap-6 md:grid-cols-2">
      {education.map((e) => (
        <div key={e.school} className="rounded-lg border border-border bg-card p-6 glow-hover">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{e.school}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">{e.degree}</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-primary">
                <span>{e.period}</span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {e.location}
                </span>
              </p>
              <p className="mt-2 font-mono text-xs text-accent">{e.detail}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Relevant Coursework
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {e.courses.map((c) => (
                <Badge key={c} variant="outline" className="font-mono text-[10px]">
                  {c}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);
