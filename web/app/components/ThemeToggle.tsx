'use client';

import { useEffect, useMemo, useState } from 'react';

type Theme = 'dark' | 'night';

const STORAGE_KEY = 'fv_theme';

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  if (theme === 'night') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  window.localStorage.setItem(STORAGE_KEY, theme);
  window.dispatchEvent(
    new CustomEvent('fv-theme-change', {
      detail: { theme },
    }),
  );
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
      const initialTheme: Theme = stored === 'night' ? 'night' : 'dark';
      applyTheme(initialTheme);
      setTheme(initialTheme);
    } catch (error) {
      console.warn('Failed to initialise FindVee theme', error);
    } finally {
      setMounted(true);
    }
  }, []);

  const isNight = theme === 'night';

  const toggleTheme = () => {
    const nextTheme: Theme = isNight ? 'dark' : 'night';
    setTheme(nextTheme);
    try {
      applyTheme(nextTheme);
    } catch (error) {
      console.warn('Failed to persist FindVee theme', error);
    }
  };

  const trackClasses = useMemo(
    () =>
      [
        'relative flex h-[28px] w-14 items-center rounded-full border transition-colors duration-300 ease-out',
        isNight
          ? 'border-transparent bg-[color:var(--color-primary)] shadow-[0_8px_24px_rgba(5,125,240,0.28)]'
          : 'border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] shadow-[0_10px_30px_rgba(15,20,30,0.08)]',
      ].join(' '),
    [isNight],
  );

  const knobTransform = useMemo(() => (isNight ? 'translateX(28px)' : 'translateX(0px)'), [isNight]);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group relative flex h-11 w-16 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-0)] text-[color:var(--text-strong)] shadow-[0_12px_32px_rgba(5,125,240,0.12)] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
      aria-label="Toggle theme"
      aria-pressed={isNight}
      disabled={!mounted}
    >
      <span className="pointer-events-none" aria-hidden="true">
        <span className={trackClasses}>
          <span
            className="absolute inset-y-1 left-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--surface-0)] shadow-[0_4px_12px_rgba(12,18,38,0.25)] transition-transform duration-300 ease-out"
            style={{ transform: knobTransform, opacity: mounted ? 1 : 0 }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full bg-[color:var(--text-strong)] transition-opacity duration-200"
              style={{ opacity: isNight ? 0.85 : 0.55 }}
            />
          </span>
        </span>
      </span>
    </button>
  );
}
