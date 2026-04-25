import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export const Section = ({ id, eyebrow, title, subtitle, children }: Props) => (
  <section id={id} className="scroll-mt-20 py-20 sm:py-28">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-xs text-primary">$ {eyebrow}</p>
        <h2 className="mt-2 font-mono text-2xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 max-w-2xl text-muted-foreground">{subtitle}</p>}
      </motion.div>

      <div className="mt-10">{children}</div>
    </div>
  </section>
);
