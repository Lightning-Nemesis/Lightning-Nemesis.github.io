import { Section } from "./Section";
import { profile } from "@/data/portfolio";

export const About = () => (
  <Section
    id="about"
    eyebrow="cat about.md"
    title="About"
    subtitle="A quick intro before we dive into the work."
  >
    <div className="grid gap-6 md:grid-cols-3">
      {profile.about.map((p, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  </Section>
);
