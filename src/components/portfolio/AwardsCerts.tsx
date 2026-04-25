import { Award, BadgeCheck, ExternalLink } from "lucide-react";
import { Section } from "./Section";
import { awards, certifications } from "@/data/portfolio";

export const AwardsCerts = () => (
  <Section
    id="awards"
    eyebrow="cat achievements.log"
    title="Awards & Certifications"
  >
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="flex items-center gap-2 font-mono text-sm text-primary">
          <Award className="h-4 w-4" /> AWARDS
        </h3>
        <ul className="mt-4 space-y-4">
          {awards.map((a) => (
            <li key={a.title} className="border-l-2 border-accent/40 pl-4">
              <p className="font-medium">{a.title}</p>
              <p className="text-sm text-muted-foreground">{a.detail}</p>
              <p className="mt-1 font-mono text-[10px] text-primary">{a.date}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="flex items-center gap-2 font-mono text-sm text-primary">
          <BadgeCheck className="h-4 w-4" /> CERTIFICATIONS
        </h3>
        <ul className="mt-4 space-y-4">
          {certifications.map((c) => (
            <li key={c.title} className="border-l-2 border-primary/40 pl-4">
              <p className="font-medium">
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-primary"
                  >
                    {c.title} <ExternalLink className="h-3 w-3" />
                  </a>
                ) : (
                  c.title
                )}
              </p>
              <p className="text-sm text-muted-foreground">{c.issuer}</p>
              <p className="mt-1 font-mono text-[10px] text-primary">
                {c.date}
                {c.credId ? ` · ID ${c.credId}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);
