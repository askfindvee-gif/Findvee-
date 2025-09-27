'use client';

import Link from 'next/link';

import { Logo } from '../../components/Logo';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border-subtle)] bg-[color:var(--surface-0)]/95 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-0">
        <Link
          href="/"
          aria-label="FindVee home"
          className="flex items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
        >
          <Logo className="transition-[color,filter] duration-300" />
        </Link>
        <nav className="flex items-center gap-3 md:gap-4" aria-label="Primary">
          <Link
            href="/login"
            className="flex h-12 min-w-[44px] items-center justify-center rounded-full px-5 text-sm font-semibold text-[color:var(--text-muted)] transition-colors hover:text-[color:var(--text-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
          >
            Login
          </Link>
          <ThemeToggle />
          <Link
            href="/onboarding"
            className="flex h-12 min-w-[44px] items-center justify-center rounded-full bg-[color:var(--color-primary)] px-6 text-sm font-semibold text-white shadow-[0_14px_40px_rgba(5,125,240,0.32)] transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
          >
            Partner with us
          </Link>
        </nav>
      </div>
    </header>
  );
}
