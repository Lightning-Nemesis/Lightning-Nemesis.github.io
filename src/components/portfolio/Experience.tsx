import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { experiences } from "@/data/portfolio";

export const Experience = () => (
  <Section
    id="experience"
    eyebrow="ls experience/"
    title="Experience"
    subtitle="From production-scale ML on a 40M+ user app to GenAI prototyping at Wells Fargo."
  >
    <ol className="relative space-y-8 border-l border-border pl-6 sm:pl-8">
      {experiences.map((exp, i) => (
        <motion.li
          key={`${exp.company}-${exp.role}`}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, delay: i * 0.05 }}
          className="relative"
        >
          <span className="absolute -left-[33px] sm:-left-[41px] top-1 grid h-4 w-4 place-items-center rounded-full bg-background ring-2 ring-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          </span>

          <div className="rounded-lg border border-border bg-card p-5 sm:p-6 glow-hover">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-semibold text-lg">{exp.role}</h3>
              <span className="font-mono text-xs text-primary">
                {exp.start} → {exp.end}
              </span>
            </div>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{exp.company}</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {exp.location}
              </span>
            </p>
            <ul className="mt-4 space-y-2">
              {exp.bullets.map((b, j) => (
                <li key={j} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {exp.tags.map((t) => (
                <Badge key={t} variant="outline" className="font-mono text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  </Section>
);
