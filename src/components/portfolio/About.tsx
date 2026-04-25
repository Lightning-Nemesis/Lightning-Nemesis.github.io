import { Section } from "./Section";
import { profile } from "@/data/portfolio";
import profilePhoto from "@/assets/profile-formal.png";

export const About = () => (
  <Section
    id="about"
    eyebrow="cat about.md"
    title="About"
    subtitle="A quick intro before we dive into the work."
  >
    <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-10 items-start">
      <div className="mx-auto md:mx-0">
        <img
          src={profilePhoto}
          alt={`${profile.name} — ${profile.title}`}
          className="h-40 w-40 md:h-[200px] md:w-[200px] rounded-2xl object-cover ring-1 ring-primary/40 shadow-[0_0_40px_-10px_hsl(var(--primary)/0.4)]"
          loading="lazy"
        />
      </div>
      <div className="space-y-4">
        {profile.about.map((p, i) => (
          <p key={i} className="text-muted-foreground leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  </Section>
);
