"use client";

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextTheme = stored ? stored === 'dark' : prefersDark;
    setDark(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme);
    document.documentElement.classList.toggle('light', !nextTheme);
  }, []);

  const toggle = () => {
    setDark((current) => {
      const next = !current;
      document.documentElement.classList.toggle('dark', next);
      document.documentElement.classList.toggle('light', !next);
      window.localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-full border border-white/10 bg-white/5 opacity-50" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:border-accent/60 hover:bg-white/10 hover:text-white"
      aria-label="Toggle light and dark mode"
      title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      {dark ? <Sun className="h-4 w-4 text-amber-300" /> : <Moon className="h-4 w-4 text-cyan-300" />}
    </button>
  );
}
