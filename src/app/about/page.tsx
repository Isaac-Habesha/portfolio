import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  Award,
  Sparkles,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Code2,
  Cpu,
  Compass,
  Star,
} from 'lucide-react';
import { siteConfig, timeline, testimonials } from '@/data/portfolio';
import { FadeIn } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';

export const metadata: Metadata = {
  title: 'About Me',
  description: `Learn more about ${siteConfig.name} - Computer Science graduate, background, journey, and engineering philosophy.`,
};

const philosophyCards = [
  {
    icon: Code2,
    title: 'Clean, Pragmatic Code',
    description: 'Writing maintainable TypeScript and scalable component architectures that teams can build upon reliably without technical debt.',
  },
  {
    icon: Compass,
    title: 'User-First Clarity',
    description: 'Prioritizing intuitive navigation, accessible UI patterns, and frictionless flows that convert visitors into active users.',
  },
  {
    icon: Cpu,
    title: 'End-to-End Delivery',
    description: 'Bridging modern frontend frameworks with robust backend APIs, database design, and cloud deployment pipelines.',
  },
];

const highlights = [
  {
    label: 'Full-Stack Development',
    description: 'Practical experience with React, Node.js, Express.js, Python, and Django.',
  },
  {
    label: 'Database Management',
    description: 'Experience working with PostgreSQL and relational database design.',
  },
  {
    label: 'User-Centered Development',
    description: 'Focus on responsive interfaces, usability, accessibility, and clean UI design.',
  },
  {
    label: 'Practical Problem-Solving',
    description: 'Experience translating real-world requirements into functional web applications.',
  },
  {
    label: 'Continuous Growth',
    description: 'Passionate about learning modern technologies, improving development workflows, and building better software.',
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="py-12 sm:py-16 lg:py-20">
      {/* Hero Header */}
      <section className="section-shell">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">
              <GraduationCap className="mr-2 h-4 w-4 text-accent" />
              CS Graduate & Product Builder
            </span>
            <span className="pill">Based in {siteConfig.location}</span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Passionate about transforming ideas into <span className="text-accent">high-impact digital products</span>.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            I am a Computer Science graduate dedicated to crafting modern web applications that blend clean visual aesthetics with solid engineering principles. I focus on building software that solves practical problems, earns user trust, and delivers quantifiable value.
          </p>
        </FadeIn>
      </section>

      {/* Main Story & Profile Grid */}
      <section className="section-shell mt-16 sm:mt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <FadeIn className="space-y-6 text-slate-300 leading-relaxed">
            <div className="glass-card rounded-[2rem] p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl font-bold text-white">My Journey & Background</h2>
              <p>
                My journey into software engineering began with a curiosity about how technology can solve real-world problems and make everyday experiences simpler. Through my Computer Science studies, I developed a strong foundation in programming, data structures, algorithms, database systems, software engineering, and computer networking.
              </p>
              <p>
                Beyond academics, I have focused on applying what I learn by designing and building practical software solutions. My experience includes developing web applications such as hotel management and digital menu platforms, student grade portals, dental clinic systems, and marketplace solutions for buying, selling, and renting services.
              </p>
              <p>
                I enjoy working across the full development lifecycle from understanding requirements and designing user interfaces to building backend services, integrating databases, and deploying applications. My primary technologies include React, JavaScript, Node.js, Express.js, Python, Django, and PostgreSQL, with a strong interest in writing clean, maintainable, and practical code.
              </p>
              <p>
                My internship experience in the IT Support Department at Commercial Bank of Ethiopia also strengthened my understanding of real-world IT operations, network maintenance, troubleshooting, and technical support.
              </p>
              <p>
                I am continuously learning, improving my engineering skills, and exploring better ways to build reliable, user-friendly software that addresses meaningful problems.
              </p>

              <div className="pt-2">
                <h3 className="text-base font-semibold text-white">What I Bring to Every Project</h3>
                <ul className="mt-3 space-y-2.5">
                  {highlights.map((item) => (
                    <li key={item.label} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>
                        <strong className="font-semibold text-white">{item.label}:</strong> {item.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a href={siteConfig.resumeHref} className="button-primary">
                  Download CV / Resume
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </a>
                <Link href="/connect" className="button-secondary">
                  Let's Connect
                  <Send className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15} className="space-y-6">
            <div className="glass-card relative overflow-hidden rounded-[2rem] p-4 shadow-glow">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80"
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="mt-4 rounded-xl border border-white/10 bg-slate-950/80 p-4">
                <p className="text-xs uppercase tracking-wider text-accent font-semibold">Core Philosophy</p>
                <p className="mt-1 text-sm font-medium text-white">
                  "Great software is not just written code; it is a seamless bridge between a problem and its simplest solution."
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Engineering Philosophy Cards */}
      <section className="section-shell mt-20 sm:mt-28">
        <SectionHeading
          eyebrow="Principles"
          title="How I approach engineering and product design"
          copy="Principles that guide my daily work and help ensure delivered products are performant, maintainable, and user-centric."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {philosophyCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <FadeIn key={card.title} delay={idx * 0.1}>
                <div className="glass-card h-full rounded-[1.5rem] p-6 transition hover:border-accent/40 hover:-translate-y-1">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{card.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-shell mt-20 sm:mt-28">
        <SectionHeading
          eyebrow="Timeline & Milestones"
          title="A chronological look at my journey"
          copy="Key milestones that have shaped my technical foundation and problem-solving abilities."
        />

        <div className="mt-10 grid gap-4">
          {timeline.map((item, index) => (
            <FadeIn key={item.title} delay={index * 0.08}>
              <div className="glass-card grid gap-4 rounded-[1.5rem] p-6 sm:grid-cols-[140px_1fr] sm:items-start transition hover:border-accent/40">
                <div className="flex items-center gap-2">
                  <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
                    {item.year}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-shell mt-20 sm:mt-28">
        <SectionHeading
          eyebrow="Testimonials"
          title="Feedback from mentors & collaborators"
          copy="What peers and project leaders have noted about my work ethic and attention to detail."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item, idx) => (
            <FadeIn key={item.author} delay={idx * 0.1}>
              <div className="glass-card flex h-full flex-col justify-between rounded-[1.5rem] p-6 sm:p-8">
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-base italic leading-7 text-slate-200">
                    “{item.quote}”
                  </blockquote>
                </div>
                <footer className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold text-accent">
                  — {item.author}
                </footer>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section-shell mt-20 sm:mt-28">
        <FadeIn>
          <div className="glass-card relative overflow-hidden rounded-[2rem] p-8 text-center sm:p-12">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/10 via-accent-2/10 to-transparent" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Interested in working together?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300">
              I am open for full-time roles, freelance projects, and collaborations. Let's create something exceptional.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/connect" className="button-primary">
                Get In Touch
                <Send className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/projects" className="button-secondary">
                Explore Projects
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
