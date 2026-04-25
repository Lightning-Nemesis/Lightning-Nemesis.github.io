import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export const Footer = () => (
  <footer className="border-t border-border py-8">
    <div className="container flex flex-col items-center justify-between gap-4 sm:flex-row">
      <p className="font-mono text-xs text-muted-foreground">
        <span className="text-primary">$</span> echo "© {new Date().getFullYear()} {profile.name}"
      </p>
      <div className="flex items-center gap-4">
        <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary">
          <Github className="h-4 w-4" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary">
          <Linkedin className="h-4 w-4" />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email" className="text-muted-foreground hover:text-primary">
          <Mail className="h-4 w-4" />
        </a>
        <a href="#home" aria-label="Back to top" className="text-muted-foreground hover:text-primary">
          <ArrowUp className="h-4 w-4" />
        </a>
      </div>
    </div>
  </footer>
);
