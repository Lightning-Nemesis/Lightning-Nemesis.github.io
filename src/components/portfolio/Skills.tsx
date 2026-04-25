import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Section } from "./Section";
import { skillTabs } from "@/data/portfolio";

const tabKeys = Object.keys(skillTabs) as (keyof typeof skillTabs)[];

export const Skills = () => (
  <Section
    id="skills"
    eyebrow="cat skills.json"
    title="Skills"
    subtitle="Switch tabs to see how my stack maps to different roles."
  >
    <Tabs defaultValue={tabKeys[0]} className="w-full">
      <TabsList className="font-mono">
        {tabKeys.map((k) => (
          <TabsTrigger key={k} value={k}>
            {k}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabKeys.map((k) => {
        const groups = skillTabs[k];
        return (
          <TabsContent key={k} value={k} className="mt-6">
            <div className="grid gap-4 md:grid-cols-3">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group} className="rounded-lg border border-border bg-card p-5 glow-hover">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-primary">{group}</h3>
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
          </TabsContent>
        );
      })}
    </Tabs>
  </Section>
);
