import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ChevronRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Send,
  Code2,
  FolderGit2,
  Cpu,
  User,
  Star,
  CheckCircle2,
  ImageOff,
} from 'lucide-react';
import {
  projects,
  skills,
  siteConfig,
  testimonials,
} from '@/data/portfolio';
import { readProjectGalleryMap } from '@/lib/project-images';
import { FadeIn } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

export const dynamic = 'force-dynamic';

function buildStructuredData() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Full-Stack Developer & CS Graduate',
    url: siteUrl,
    sameAs: [siteConfig.github, siteConfig.linkedin],
    email: siteConfig.email,
    alumniOf: 'Computer Science',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Django', 'PostgreSQL', 'Tailwind CSS'],
  };
}

export default async function Home() {
  const featuredProjects = projects;
  const galleries = await readProjectGalleryMap();

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredData()) }}
      />

      {/* Hero Section */}
      <section className="section-shell relative overflow-hidden pb-16 pt-16 sm:pb-24 sm:pt-20 lg:pb-28">
        <div className="absolute inset-0 -z-10 bg-hero-grid bg-[size:32px_32px] opacity-25" />
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <FadeIn>
            <div className="flex flex-wrap gap-2.5">
              <span className="pill">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse mr-2" />
                Available for Roles & Projects
              </span>
              <span className="pill">Based in {siteConfig.location}</span>
            </div>

            <h1 className="mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Hi, I’m {siteConfig.name}.
              <span className="block text-accent">I build modern web applications that solve real-world problems.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Full-stack developer specialized in Python, Node.js, React, and Django — building fast, responsive web applications.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/projects" className="button-primary">
                View My Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/connect" className="button-secondary">
                Let’s Connect
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-white"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-white"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-accent/50 hover:text-white"
              >
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="relative">
            <div className="glass-card relative overflow-hidden rounded-[2rem] p-4 shadow-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-accent/10" />
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/70">
                <div className="aspect-[4/5] w-full">
                  <Image
                    src="/profile1.jpg"
                    alt={`${siteConfig.name} - Portrait`}
                    width={450}
                    height={300}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-slate-950/85 p-4 backdrop-blur-xl">
                  <p className="text-xs uppercase tracking-wider text-accent font-semibold">Value Proposition</p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    High-performance web applications designed for reliability, clarity, and seamless user interaction.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="section-shell py-8">
        <FadeIn>
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">100%</p>
              <p className="mt-1 text-sm font-semibold text-white">Responsive Design</p>
              <p className="mt-1 text-xs text-slate-300">Mobile-first, accessible user interfaces</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">Full-Stack</p>
              <p className="mt-1 text-sm font-semibold text-white">Development</p>
              <p className="mt-1 text-xs text-slate-300">React, Node.js & Django</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">End-to-End</p>
              <p className="mt-1 text-sm font-semibold text-white">Product Development</p>
              <p className="mt-1 text-xs text-slate-300">Frontend, backend & database integration</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-accent sm:text-3xl">&lt;24h</p>
              <p className="mt-1 text-sm font-semibold text-white">Response Time</p>
              <p className="mt-1 text-xs text-slate-300">Typical communication response target</p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Featured Projects Preview Section */}
      <section className="section-shell py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Work"
            title="Selected projects & case studies"
            copy="Real-world products architected and developed with attention to user experience, functionality, and technical quality."
          />
          <Link href="/projects" className="button-secondary self-start sm:self-auto">
            View All Projects
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8">
          {featuredProjects.map((project, idx) => {
            const coverImage = galleries[project.id]?.[0];
            return (
              <FadeIn key={project.id} delay={idx * 0.1}>
                <div className="glass-card overflow-hidden rounded-[2rem] transition hover:border-accent/40">
                  <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                            {project.category}
                          </span>
                          <span className="text-xs text-slate-400">{project.role}</span>
                        </div>
                        <h3 className="mt-4 text-2xl font-bold text-white">{project.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-300">{project.summary}</p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                        <Link href={`/projects/${project.id}`} className="button-primary text-xs">
                          View Project Details
                          <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>

                    <Link
                      href={`/projects/${project.id}`}
                      className="relative flex min-h-64 items-center justify-center border-t border-white/10 bg-slate-950/60 lg:border-l lg:border-t-0"
                    >
                      {coverImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={coverImage}
                          alt={`${project.title} cover screenshot`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-6 text-center">
                          <ImageOff className="h-7 w-7 text-slate-500" />
                          <p className="mt-2 text-xs font-medium text-slate-400">
                            No cover screenshot uploaded yet
                          </p>
                        </div>
                      )}
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Skills Teaser Section */}
      <section className="section-shell py-16 sm:py-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Capabilities"
            title="Core technical skills"
            copy="A well-rounded full-stack toolchain spanning modern frontend, backend systems, and DevOps."
          />
          <Link href="/skills" className="button-secondary self-start sm:self-auto">
            Explore All Skills
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Object.entries(skills).map(([group, items], index) => (
            <FadeIn key={group} delay={index * 0.06}>
              <div className="glass-card flex h-full flex-col justify-between rounded-[1.5rem] p-6 transition hover:border-accent/40">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-accent">{group}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <span key={skill} className="rounded-full border border-white/10 bg-slate-950/60 px-3 py-1 text-xs text-slate-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* About Teaser Section */}
      <section className="section-shell py-16 sm:py-20">
        <FadeIn>
          <div className="glass-card grid gap-8 rounded-[2rem] p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <SectionHeading
                eyebrow="About Me"
                title="A product-minded developer who cares about clarity, trust, and execution."
                copy="I build polished web experiences for founders, teams, and service businesses that need more than a simple landing page. I focus on thoughtful structure, clean UX, and fast delivery."
              />
              <div className="mt-6 flex flex-wrap gap-4">
                <Link href="/about" className="button-primary">
                  Read Full Bio & Journey
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
                <a href={siteConfig.resumeHref} className="button-secondary">
                  Download CV
                </a>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {['Fast Delivery', 'Clean UI Architecture', 'Scalable APIs', 'Clear Communication'].map((item) => (
                <div key={item} className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs font-semibold text-slate-200">
                  <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Testimonials */}
      <section className="section-shell py-16 sm:py-20">
        <SectionHeading
          eyebrow="Testimonials"
          title="What collaborators say"
          copy="Feedback from mentors and engineering peers on my approach to building software."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, idx) => (
            <FadeIn key={testimonial.author} delay={idx * 0.1}>
              <blockquote className="glass-card flex h-full flex-col justify-between rounded-[1.5rem] p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="mt-4 text-base italic leading-7 text-slate-100">“{testimonial.quote}”</p>
                </div>
                <footer className="mt-6 border-t border-white/10 pt-4 text-xs font-semibold text-accent">
                  — {testimonial.author}
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="section-shell py-16 pb-24 sm:py-20 sm:pb-28">
        <FadeIn>
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/15 via-accent-2/15 to-transparent" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to start a project?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              Let's connect to discuss how we can bring your next idea or product roadmap to life.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/connect" className="button-primary">
                Send a Message
                <Send className="ml-2 h-4 w-4" />
              </Link>
              <a href={siteConfig.calendly} target="_blank" rel="noreferrer" className="button-secondary">
                Book a Video Call
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
