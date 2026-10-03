import Link from 'next/link';
import { Github, Linkedin, Mail, ArrowUpRight, Heart } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';

const footerNav = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Connect', href: '/connect' },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/60 backdrop-blur-lg">
      <div className="section-shell py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-xl font-bold tracking-tight text-white hover:text-accent">
              {siteConfig.name}
            </Link>
            <p className="text-sm leading-6 text-slate-400">
              Computer Science graduate & full-stack product builder based in {siteConfig.location}.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-accent hover:text-white"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-accent hover:text-white"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-accent hover:text-white"
                aria-label="Email Contact"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Navigation</p>
            <ul className="mt-4 space-y-2 text-sm">
              {footerNav.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-slate-400 transition hover:text-white">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Featured Capabilities */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core Focus</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-400">
              <li>Full-Stack Web Development</li>
              <li>Next.js & React Applications</li>
              <li>API Design & Integration</li>
              <li>UI/UX & High Conversion Layouts</li>
              <li>Database & Cloud Deployment</li>
            </ul>
          </div>

          {/* Column 4: Get in Touch */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Get In Touch</p>
            <p className="mt-4 text-sm text-slate-400">Have a project idea or an opportunity? Let's discuss.</p>
            <Link
              href="/connect"
              className="button-primary mt-4 inline-flex text-xs"
            >
              Start a Conversation
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with Next.js, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
