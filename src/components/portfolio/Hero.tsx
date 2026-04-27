import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile, heroStats } from "@/data/portfolio";

const TYPED = `Hi, I'm ${profile.name}`;

export const Hero = () => {
  const [text, setText] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i++;
      setText(TYPED.slice(0, i));
      if (i >= TYPED.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="bg-grid absolute inset-0 -z-10 opacity-60" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-radial" aria-hidden />

      <div className="container">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs text-primary"
        >
          $ whoami
        </motion.p>

        <h1 className="terminal-cursor mt-3 font-mono text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {text}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-6 max-w-2xl"
        >
          <p className="text-lg text-muted-foreground sm:text-xl">
            <span className="text-gradient font-semibold">{profile.title}</span> — {profile.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <Button asChild size="lg" className="font-mono shadow-glow">
            <a href={profile.resumeUrl} download="Resume_Amrit_Mahajan.pdf">
              <Download className="h-4 w-4" /> Download Resume
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono">
            <a href="#contact">
              Get in touch <ArrowDown className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="GitHub">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="LinkedIn">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Email">
            <a href={`mailto:${profile.email}`}>
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Phone">
            <a href={`tel:${profile.phone.replace(/\D/g, "")}`}>
              <Phone className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          {heroStats.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border border-border bg-card/50 p-4 backdrop-blur glow-hover"
            >
              <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-1 font-mono text-sm font-semibold text-foreground sm:text-base">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
};
