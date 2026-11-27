import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FolderGit2,
  ArrowUpRight,
  Images,
  ImageOff,
  Send,
} from 'lucide-react';
import { projects } from '@/data/portfolio';
import { readProjectGalleryMap } from '@/lib/project-images';
import { FadeIn } from '@/components/motion';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore full-stack web applications and software engineering projects.',
};

export default async function ProjectsPage() {
  const galleries = await readProjectGalleryMap();

  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <section className="section-shell">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="pill">
                <FolderGit2 className="mr-2 h-4 w-4 text-accent" />
                Featured Portfolio
              </span>
              <span className="pill">6 Selected Projects</span>
            </div>

            <Link href="/projects/manage" className="button-secondary text-xs">
              <Images className="mr-2 h-4 w-4" />
              Manage Screenshots
            </Link>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Selected projects built for <span className="text-accent">reliability, usability & performance</span>.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Explore real-world web applications designed and built across hospitality, education, and service operations. Select any project to view its full overview and screenshot gallery.
          </p>
        </FadeIn>
      </section>

      {/* Responsive Project Cards Grid */}
      <section className="section-shell mt-12 sm:mt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const projectImages = galleries[project.id] ?? [];
            const coverImage = projectImages[0];

            return (
              <FadeIn key={project.id} delay={index * 0.05}>
                <article className="glass-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 transition hover:-translate-y-1 hover:border-accent/40">
                  {/* Cover Screenshot */}
                  <Link
                    href={`/projects/${project.id}`}
                    className="relative block aspect-[16/10] w-full overflow-hidden border-b border-white/10 bg-slate-950/60"
                  >
                    {coverImage ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={coverImage}
                        alt={`${project.title} cover screenshot`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
                        <ImageOff className="h-7 w-7 text-slate-500" />
                        <p className="mt-2 text-xs font-medium text-slate-400">
                          No cover screenshot uploaded yet
                        </p>
                      </div>
                    )}
                  </Link>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-accent">
                          {project.category}
                        </span>
                        {projectImages.length > 0 && (
                          <span className="text-[11px] font-medium text-slate-400">
                            {projectImages.length} {projectImages.length === 1 ? 'image' : 'images'}
                          </span>
                        )}
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-white">
                          <Link href={`/projects/${project.id}`} className="transition hover:text-accent">
                            {project.title}
                          </Link>
                        </h2>
                        <p className="mt-2.5 text-sm leading-6 text-slate-300">
                          {project.summary}
                        </p>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 border-t border-white/10 pt-4">
                      <Link
                        href={`/projects/${project.id}`}
                        className="button-primary w-full justify-center text-xs"
                      >
                        View Project Details
                        <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
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
                Let&apos;s Build Together
                <Send className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
