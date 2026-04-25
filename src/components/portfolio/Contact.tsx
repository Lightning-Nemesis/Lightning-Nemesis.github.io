import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Section } from "./Section";
import { profile } from "@/data/portfolio";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "At least 10 characters").max(1500),
});

type FormValues = z.infer<typeof schema>;

export const Contact = () => {
  const [sending, setSending] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (v: FormValues) => {
    setSending(true);
    const subject = encodeURIComponent(`Portfolio contact from ${v.name}`);
    const body = encodeURIComponent(`${v.message}\n\n— ${v.name} (${v.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      reset();
      toast({
        title: "Email draft opened",
        description: "Your default email client should now be open with the message ready to send.",
      });
    }, 600);
  };

  return (
    <Section
      id="contact"
      eyebrow="./contact.sh"
      title="Get in touch"
      subtitle="Open to full-time ML / AI engineering roles starting May 2026, and interesting collaborations any time."
    >
      <div className="grid gap-8 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border border-border bg-card p-6 lg:col-span-3"
          noValidate
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="name" className="font-mono text-xs">Name</Label>
              <Input id="name" {...register("name")} className="mt-1.5" placeholder="Jane Doe" maxLength={100} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email" className="font-mono text-xs">Email</Label>
              <Input id="email" type="email" {...register("email")} className="mt-1.5" placeholder="jane@company.com" maxLength={255} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <Label htmlFor="message" className="font-mono text-xs">Message</Label>
            <Textarea id="message" {...register("message")} rows={6} className="mt-1.5" placeholder="What's on your mind?" maxLength={1500} />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
          </div>
          <Button type="submit" className="font-mono shadow-glow" disabled={sending}>
            <Send className="h-4 w-4" /> {sending ? "Opening…" : "Send message"}
          </Button>
          <p className="font-mono text-[10px] text-muted-foreground">
            Submitting opens your email client with the message pre-filled.
          </p>
        </form>

        <div className="space-y-3 lg:col-span-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 glow-hover"
          >
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
              <Mail className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Email</p>
              <p className="truncate text-sm">{profile.email}</p>
            </div>
          </a>
          <a
            href={`tel:${profile.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 glow-hover"
          >
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Phone</p>
              <p className="text-sm">{profile.phone}</p>
            </div>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 glow-hover"
          >
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
              <Linkedin className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">LinkedIn</p>
              <p className="text-sm">/in/amrit-mahajan</p>
            </div>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 glow-hover"
          >
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
              <Github className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">GitHub</p>
              <p className="text-sm">Lightning-Nemesis</p>
            </div>
          </a>
          <div className="flex items-center gap-3 rounded-lg border border-border bg-card p-4">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
              <MapPin className="h-4 w-4" />
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Location</p>
              <p className="text-sm">{profile.location}</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
