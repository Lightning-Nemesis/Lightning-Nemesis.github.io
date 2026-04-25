import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "./Section";
import { Project, ProjectCategory, projects } from "@/data/portfolio";

const CATEGORIES: ("All" | ProjectCategory)[] = ["All", "GenAI", "ML", "Cloud/MLOps", "Research"];

const categoryColor: Record<ProjectCategory, string> = {
  GenAI: "bg-primary/15 text-primary border-primary/40",
  ML: "bg-accent/15 text-accent border-accent/40",
  "Cloud/MLOps": "bg-purple-500/15 text-purple-300 border-purple-500/40",
  Research: "bg-orange-500/15 text-orange-300 border-orange-500/40",
};

export const Projects = () => {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [active, setActive] = useState<Project | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <Section
      id="projects"
      eyebrow="ls projects/"
      title="Projects"
      subtitle="A selection of research, applied ML, and Gen AI work — click any card for the full case study."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-all ${
              filter === c
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <motion.button
            key={p.title}
            onClick={() => setActive(p)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: (i % 6) * 0.04 }}
            className="group flex flex-col rounded-lg border border-border bg-card p-5 text-left glow-hover"
          >
            <div className="mb-3 flex items-center justify-between">
              <Badge variant="outline" className={`font-mono text-[10px] ${categoryColor[p.category]}`}>
                {p.category}
              </Badge>
              {p.award && <Award className="h-4 w-4 text-accent" aria-label="Award winner" />}
            </div>
            <h3 className="font-semibold leading-snug group-hover:text-primary transition-colors">
              {p.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
            <div className="mt-4 flex flex-wrap gap-1">
              {p.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] text-muted-foreground/80"
                >
                  #{t}
                </span>
              ))}
              {p.tags.length > 4 && (
                <span className="font-mono text-[10px] text-muted-foreground/60">
                  +{p.tags.length - 4}
                </span>
              )}
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
              Open case study →
            </span>
          </motion.button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto scrollbar-thin">
          {active && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={`font-mono text-[10px] ${categoryColor[active.category]}`}>
                    {active.category}
                  </Badge>
                  {active.award && (
                    <Badge variant="outline" className="font-mono text-[10px] border-accent/40 bg-accent/10 text-accent">
                      <Award className="mr-1 h-3 w-3" /> Award
                    </Badge>
                  )}
                </div>
                <DialogTitle className="mt-2 text-xl">{active.title}</DialogTitle>
                <DialogDescription>{active.summary}</DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-2 text-sm">
                {active.award && (
                  <p className="rounded-md border border-accent/30 bg-accent/5 px-3 py-2 text-xs text-accent">
                    🏆 {active.award}
                  </p>
                )}
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary">Problem</h4>
                  <p className="mt-1 text-muted-foreground">{active.problem}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary">Approach</h4>
                  <p className="mt-1 text-muted-foreground">{active.approach}</p>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary">Results</h4>
                  <ul className="mt-1 space-y-1.5">
                    {active.results.map((r, i) => (
                      <li key={i} className="flex gap-2 text-muted-foreground">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-mono text-xs uppercase tracking-wider text-primary">Stack</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {active.tags.map((t) => (
                      <Badge key={t} variant="outline" className="font-mono text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>
                {active.link && (
                  <Button asChild variant="outline" className="font-mono">
                    <a href={active.link} target="_blank" rel="noreferrer">
                      View project <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  );
};
