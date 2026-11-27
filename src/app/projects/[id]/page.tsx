import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Images,
  Send,
} from 'lucide-react';
import { projects } from '@/data/portfolio';
import { getProjectImages } from '@/lib/project-images';
import { ProjectDetailGallery } from '@/components/project-detail-gallery';
import { FadeIn } from '@/components/motion';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) {
    return { title: 'Project Not Found' };
  }
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const currentIndex = projects.findIndex((item) => item.id === id);
  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];
  const images = await getProjectImages(project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      <section className="section-shell space-y-10">
        {/* Top Navigation */}
        <FadeIn>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link href="/projects" className="button-secondary text-xs">
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              Back to Projects
            </Link>

            <Link href="/projects/manage" className="button-secondary text-xs">
              <Images className="mr-1.5 h-3.5 w-3.5" />
              Manage Screenshots
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                {project.category}
              </span>
              <span className="text-xs font-medium text-slate-400">{project.role}</span>
            </div>

            <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            <p className="max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {project.summary}
            </p>
          </div>
        </FadeIn>

        {/* Main Cover + Showcase Gallery + Lightbox */}
        <FadeIn delay={0.05}>
          <ProjectDetailGallery title={project.title} images={images} />
        </FadeIn>

        {/* Overview, Problem, Solution, Key Features & Tech Stack */}
        <FadeIn delay={0.1}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Project Overview</h2>
                <p className="text-sm leading-7 text-slate-300 sm:text-base">
                  {project.overview}
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="glass-card rounded-[2rem] p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">The Problem</p>
                  <p className="text-sm leading-6 text-slate-300">{project.problem}</p>
                </div>

                <div className="glass-card rounded-[2rem] p-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">The Solution</p>
                  <p className="text-sm leading-6 text-slate-300">{project.solution}</p>
                </div>
              </div>

              <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-4">
                <h2 className="text-xl font-bold text-white">Key Features</h2>
                <ul className="space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">Technology Stack</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <p className="text-xs font-semibold text-slate-300">
                    Interested in a similar solution?
                  </p>
                  <Link href="/connect" className="button-primary mt-4 w-full justify-center text-xs">
                    Let&apos;s Discuss Your Project
                    <Send className="ml-2 h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </FadeIn>

        {/* Previous / Next Project Navigation */}
        <FadeIn delay={0.15}>
          <div className="grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.id}`}
                className="glass-card group flex items-center justify-between rounded-2xl p-5 transition hover:border-accent/40"
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Previous Project
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white group-hover:text-accent">
                    {prevProject.title}
                  </p>
                </div>
                <ArrowLeft className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-x-1 group-hover:text-accent" />
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="glass-card group flex items-center justify-between rounded-2xl p-5 text-right transition hover:border-accent/40"
              >
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-accent" />
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Next Project
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white group-hover:text-accent">
                    {nextProject.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
