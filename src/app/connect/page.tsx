"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  Calendar,
  Send,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';
import { siteConfig } from '@/data/portfolio';
import { FadeIn } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

const formSchema = z.object({
  name: z.string().min(2, 'Please enter your name (minimum 2 characters).'),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.string().min(3, 'Please add a brief subject line.'),
  message: z.string().min(10, 'Please write a message with at least 10 characters.'),
  company: z.string().max(0).optional(), // Honeypot
});

type FormValues = z.infer<typeof formSchema>;

const faqs = [
  {
    q: 'What is your current availability?',
    a: 'I am actively available for full-time software engineering roles, contract work, and freelance web development projects.',
  },
  {
    q: 'How quickly do you respond?',
    a: 'I typically respond within 12 to 24 hours on business days.',
  },
  {
    q: 'What services or project scopes do you take on?',
    a: 'Everything from end-to-end full-stack web applications (Next.js/React + Node/Django/PostgreSQL) to frontend redesigns, responsive UI systems, and REST API development.',
  },
  {
    q: 'Can we schedule a live call?',
    a: 'Yes! You can book a direct video consultation through Calendly using the link on this page.',
  },
];

export default function ConnectPage() {
  const [formState, setFormState] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', company: '' },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error('Submission failed');
      setFormState('success');
      reset();
    } catch {
      setFormState('error');
    }
  };

  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <section className="section-shell">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
              Available for Opportunities
            </span>
            <span className="pill">Location: {siteConfig.location}</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Let's connect and build something <span className="text-accent">extraordinary</span>.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Whether you have an exciting project inquiry, an open engineering position, or just want to exchange ideas, I’d love to hear from you.
          </p>
        </FadeIn>
      </section>

      {/* Main Form and Direct Contact Cards */}
      <section className="section-shell mt-12 sm:mt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Left Column: Direct Info Cards */}
          <FadeIn className="space-y-6">
            <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">Contact Details</h2>
              <p className="text-sm leading-6 text-slate-300">
                Reach out via email, schedule a direct calendar call, or connect with me on professional networks.
              </p>

              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-accent/40 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Email Address</p>
                    <p className="text-sm font-semibold text-white">{siteConfig.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Location</p>
                    <p className="text-sm font-semibold text-white">{siteConfig.location}</p>
                  </div>
                </div>

                <a
                  href={siteConfig.calendly}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-accent/40 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400">Schedule a Meeting</p>
                    <p className="text-sm font-semibold text-white">Book a 30-min Video Call</p>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Social Networks</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-accent/50 hover:text-white"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:border-accent/50 hover:text-white"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Interactive Form */}
          <FadeIn delay={0.15}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-5"
            >
              <div>
                <h2 className="text-2xl font-bold text-white">Send a Message</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Fill out the details below and I will get back to you promptly.
                </p>
              </div>

              {/* Honeypot anti-spam field */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
                {...register('company')}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Your Name *
                  </label>
                  <input
                    {...register('name')}
                    placeholder="e.g. Alex Morgan"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Email Address *
                  </label>
                  <input
                    {...register('email')}
                    placeholder="e.g. alex@company.com"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-rose-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Subject *
                </label>
                <input
                  {...register('subject')}
                  placeholder="e.g. Full-Stack Project Inquiry / Job Opportunity"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent"
                />
                {errors.subject && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Message *
                </label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="Share the details about your project goals, timelines, or opportunity..."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-accent"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-rose-400">{errors.message.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-accent" />
                  Replies within 24 hours
                </span>
              </div>

              {formState === 'success' && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>Thank you! Your message has been sent successfully. I will get back to you soon.</span>
                </div>
              )}

              {formState === 'error' && (
                <div className="flex items-center gap-3 rounded-xl border border-rose-400/40 bg-rose-500/10 p-4 text-sm text-rose-300">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>Something went wrong. Please reach out directly at {siteConfig.email}.</span>
                </div>
              )}
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="section-shell mt-20 sm:mt-28">
        <SectionHeading
          eyebrow="FAQs"
          title="Frequently Asked Questions"
          copy="Quick answers to common questions regarding collaboration, project timelines, and communication."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {faqs.map((faq, idx) => (
            <FadeIn key={faq.q} delay={idx * 0.08}>
              <div className="glass-card h-full rounded-[1.5rem] p-6 transition hover:border-accent/40">
                <div className="flex items-start gap-3">
                  <HelpCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="text-base font-bold text-white">{faq.q}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-300">{faq.a}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
