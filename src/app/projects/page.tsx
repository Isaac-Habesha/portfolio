"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderGit2,
  ArrowUpRight,
  Github,
  Sparkles,
  ExternalLink,
  Layers,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { projects, siteConfig } from '@/data/portfolio';
import { FadeIn } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => activeCategory === 'All' || p.category === activeCategory);
  }, [activeCategory]);

  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <section className="section-shell">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">
              <FolderGit2 className="mr-2 h-4 w-4 text-accent" />
              Featured Portfolio
            </span>
            <span className="pill">Production Case Studies</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Selected projects built for <span className="text-accent">reliability, usability & performance</span>.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Each project represents a practical solution built to solve specific operational, discovery, or conversion challenges. Explore the architecture, stack, and real outcomes below.
          </p>
        </FadeIn>
      </section>

      {/* Projects List with Filter */}
      <section className="section-shell mt-12 sm:mt-16">
        {/* Category Pills */}
        <FadeIn>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                  activeCategory === category
                    ? 'bg-accent text-slate-950 shadow-md shadow-accent/20'
                    : 'border border-white/10 bg-white/5 text-slate-300 hover:border-accent/40 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Project Cards */}
        <div className="mt-10 space-y-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="glass-card overflow-hidden rounded-[2rem] border border-white/10 transition hover:border-accent/40"
              >
                <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                  {/* Left content */}
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                          {project.category}
                        </span>
                        <span className="text-xs font-medium text-slate-400">{project.role}</span>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-white sm:text-3xl">{project.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">{project.summary}</p>
                      </div>

                      {/* Problem / Solution / Impact Matrix */}
                      <div className="grid gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4 sm:grid-cols-2">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">The Problem</p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-300">{project.problem}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">The Solution</p>
                          <p className="mt-1.5 text-xs leading-5 text-slate-300">{project.solution}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">Key Impact</p>
                          <p className="mt-1.5 text-xs font-medium leading-5 text-slate-200">{project.impact}</p>
                        </div>
                      </div>

                      {/* Tech Stack Badges */}
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Technologies Used</p>
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                      <Link href="/connect" className="button-primary">
                        Discuss Project
                        <ArrowUpRight className="ml-1.5 h-4 w-4" />
                      </Link>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        Source Code
                      </a>
                    </div>
                  </div>

                  {/* Right screenshots */}
                  <div className="grid grid-rows-2 gap-0 border-t border-white/10 bg-slate-950/40 lg:border-l lg:border-t-0">
                    {project.screenshots.map((src, imgIdx) => (
                      <div key={src} className="relative min-h-60 overflow-hidden border-b border-white/10 last:border-b-0">
                        <Image
                          src={src}
                          alt={`${project.title} screenshot ${imgIdx + 1}`}
                          fill
                          className="object-cover transition duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-shell mt-20 sm:mt-28">
        <FadeIn>
          <div className="glass-card rounded-[2rem] p-8 text-center sm:p-12">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Have an idea or custom requirement?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              I can help architect, design, and ship high-quality web applications tailored to your business goals.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/connect" className="button-primary">
                Let's Build Together
                <Send className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
