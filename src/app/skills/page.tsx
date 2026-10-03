"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Code,
  Layers,
  Wrench,
  Cloud,
  Database,
  Sparkles,
  CheckCircle2,
  ArrowUpRight,
  Send,
  Terminal,
  Cpu,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { siteConfig } from '@/data/portfolio';
import { FadeIn } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

type SkillItem = {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Tools' | 'Cloud & DevOps';
  description: string;
  proficiency: 'Advanced' | 'Proficient' | 'Familiar';
};

const detailedSkills: SkillItem[] = [
  // Languages
  { name: 'TypeScript', category: 'Languages', description: 'Type-safe scalable systems, generic interfaces, and strict compiler configurations.', proficiency: 'Advanced' },
  { name: 'JavaScript (ES6+)', category: 'Languages', description: 'Modern asynchronous programming, closures, event loop, and modular architecture.', proficiency: 'Advanced' },
  { name: 'Python', category: 'Languages', description: 'Data processing, backend scripting, Django REST framework, and automation.', proficiency: 'Proficient' },
  { name: 'SQL', category: 'Languages', description: 'Relational database schema modeling, complex queries, indexing, and optimizations.', proficiency: 'Proficient' },

  // Frontend
  { name: 'React', category: 'Frontend', description: 'Hooks, custom state management, performance memoization, and component composition.', proficiency: 'Advanced' },
  { name: 'Next.js (App Router)', category: 'Frontend', description: 'Server Components, SSR/SSG, route handlers, metadata SEO, and fast bundle generation.', proficiency: 'Advanced' },
  { name: 'Tailwind CSS', category: 'Frontend', description: 'Utility-first modern design systems, custom themes, dark mode, and responsive layouts.', proficiency: 'Advanced' },
  { name: 'Framer Motion', category: 'Frontend', description: 'Micro-interactions, layout transitions, exit animations, and spring physics.', proficiency: 'Proficient' },
  { name: 'React Hook Form & Zod', category: 'Frontend', description: 'Schema-driven form validation, type inference, and streamlined error handling.', proficiency: 'Advanced' },

  // Backend
  { name: 'Node.js', category: 'Backend', description: 'Event-driven server runtime, stream processing, and non-blocking I/O operations.', proficiency: 'Advanced' },
  { name: 'Express.js', category: 'Backend', description: 'RESTful API endpoints, middleware pipelines, authentication, and error handlers.', proficiency: 'Advanced' },
  { name: 'Django & DRF', category: 'Backend', description: 'Model-view-controller patterns, ORM relationships, authentication, and admin portals.', proficiency: 'Proficient' },
  { name: 'PostgreSQL', category: 'Backend', description: 'Relational data modeling, foreign keys, transactions, and migration strategies.', proficiency: 'Proficient' },
  { name: 'REST APIs & GraphQL', category: 'Backend', description: 'API contract design, status codes, payload serialization, and client integrations.', proficiency: 'Advanced' },

  // Cloud & DevOps
  { name: 'Docker', category: 'Cloud & DevOps', description: 'Containerization of applications, multi-stage Dockerfiles, and reproducible environments.', proficiency: 'Proficient' },
  { name: 'Vercel & Cloudflare', category: 'Cloud & DevOps', description: 'Edge deployment, continuous integration, DNS management, and CDN caching.', proficiency: 'Advanced' },
  { name: 'Linux / Bash', category: 'Cloud & DevOps', description: 'Server administration, shell scripting, environment variables, and CLI workflows.', proficiency: 'Proficient' },
  { name: 'Git & GitHub', category: 'Tools', description: 'Version control, feature branching, pull request workflows, and collaborative reviews.', proficiency: 'Advanced' },
  { name: 'Postman', category: 'Tools', description: 'API testing, automated request collections, and endpoint documentation.', proficiency: 'Proficient' },
];

const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Cloud & DevOps', 'Tools'] as const;

const workflows = [
  {
    step: '01',
    title: 'Architecture & Modeling',
    description: 'Defining data models, system boundaries, and component hierarchies before writing code to prevent technical debt.',
  },
  {
    step: '02',
    title: 'Clean Implementation',
    description: 'Writing strictly-typed TypeScript, modular reusable components, and resilient error-handling logic.',
  },
  {
    step: '03',
    title: 'Polish & Interaction',
    description: 'Enhancing the user experience with fluid micro-interactions, dark mode, keyboard navigation, and responsive layouts.',
  },
  {
    step: '04',
    title: 'Testing & Deployment',
    description: 'Ensuring fast Lighthouse scores, SEO metadata completeness, and automated deployment to modern cloud platforms.',
  },
];

export default function SkillsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = useMemo(() => {
    return detailedSkills.filter((skill) => {
      const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <section className="section-shell">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">
              <Cpu className="mr-2 h-4 w-4 text-accent" />
              Technical Stack & Capabilities
            </span>
            <span className="pill">Full-Stack Spectrum</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Modern tools & frameworks I use to <span className="text-accent">build robust products</span>.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            From strictly typed frontends to resilient APIs and cloud deployments, here is a breakdown of my technical toolkit and how I apply each technology in real-world environments.
          </p>
        </FadeIn>
      </section>

      {/* Filter and Search Bar */}
      <section className="section-shell mt-12 sm:mt-16">
        <FadeIn>
          <div className="glass-card flex flex-col gap-4 rounded-[1.5rem] p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition ${
                    selectedCategory === cat
                      ? 'bg-accent text-slate-950 shadow-md shadow-accent/20'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:border-accent/40 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-white/10 bg-slate-950/70 py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-500 focus:border-accent/60"
              />
            </div>
          </div>
        </FadeIn>

        {/* Skills Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSkills.map((skill, index) => (
            <FadeIn key={skill.name} delay={index * 0.03}>
              <div className="glass-card flex h-full flex-col justify-between rounded-[1.5rem] p-5 transition hover:-translate-y-1 hover:border-accent/40">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      {skill.category}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                      {skill.proficiency}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-white">{skill.name}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{skill.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="glass-card mt-8 rounded-[1.5rem] p-8 text-center text-slate-400">
            No skills matched your search. Try resetting the filters.
          </div>
        )}
      </section>

      {/* Engineering Workflow Section */}
      <section className="section-shell mt-20 sm:mt-28">
        <SectionHeading
          eyebrow="Workflow"
          title="How I turn concepts into production code"
          copy="A disciplined, repeatable process that ensures high code quality, performance, and predictable project milestones."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workflows.map((wf, idx) => (
            <FadeIn key={wf.step} delay={idx * 0.08}>
              <div className="glass-card relative flex h-full flex-col justify-between rounded-[1.5rem] p-6 transition hover:border-accent/40">
                <div>
                  <span className="font-display text-2xl font-black text-accent/60">{wf.step}</span>
                  <h3 className="mt-3 text-lg font-bold text-white">{wf.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{wf.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-shell mt-20 sm:mt-28">
        <FadeIn>
          <div className="glass-card rounded-[2rem] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">See these skills in action</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Explore real-world projects and case studies where these tools solved actual business problems.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/projects" className="button-primary">
                View Projects Showcase
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/connect" className="button-secondary">
                Discuss a Project
                <Send className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
