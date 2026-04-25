import { useEffect } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Skills } from "@/components/portfolio/Skills";
import { Education } from "@/components/portfolio/Education";
import { AwardsCerts } from "@/components/portfolio/AwardsCerts";
import { Chess } from "@/components/portfolio/Chess";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { profile } from "@/data/portfolio";

const Index = () => {
  useEffect(() => {
    // Ensure dark mode default on first load
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
    }

    // Inject Person JSON-LD for SEO
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.title,
      email: `mailto:${profile.email}`,
      url: typeof window !== "undefined" ? window.location.origin : undefined,
      sameAs: [profile.linkedin, profile.github],
      address: { "@type": "PostalAddress", addressLocality: profile.location },
    });
    document.head.appendChild(ld);
    return () => {
      document.head.removeChild(ld);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <AwardsCerts />
        <Chess />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
