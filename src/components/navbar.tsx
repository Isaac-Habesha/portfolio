"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Send } from 'lucide-react';
import { siteConfig } from '@/data/portfolio';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Connect', href: '/connect' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/75 backdrop-blur-xl transition-colors dark:bg-[#07111f]/85">
      <div className="section-shell flex h-16 items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white transition hover:text-accent"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-accent/20 to-accent-2/20 text-sm font-extrabold text-accent shadow-glow transition group-hover:scale-105 group-hover:border-accent">
            BT
          </span>
          <span className="flex flex-col">
            <span className="leading-tight">{siteConfig.name}</span>
            <span className="text-[10px] font-medium tracking-wider text-accent">PORTFOLIO</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition duration-200 ${
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 rounded-full border border-accent/40 bg-accent/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Action & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/connect"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-slate-950 shadow-md shadow-accent/20 transition hover:-translate-y-0.5 hover:bg-[#8bf1e1] sm:inline-flex"
          >
            <Send className="h-3.5 w-3.5" />
            <span>Connect</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-white/10 bg-slate-950/95 px-4 pb-6 pt-2 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition ${
                      isActive
                        ? 'border border-accent/40 bg-accent/15 text-accent font-semibold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    {isActive && <Sparkles className="h-4 w-4 text-accent" />}
                  </Link>
                );
              })}

              <Link
                href="/connect"
                onClick={() => setMobileMenuOpen(false)}
                className="button-primary mt-3 w-full justify-center"
              >
                <Send className="mr-2 h-4 w-4" />
                Let's Connect
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
