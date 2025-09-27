'use client';

import { useEffect, useState } from 'react';

type LanguageCode = 'en' | 'kn' | 'hi';

type LanguageOption = {
  code: LanguageCode;
  label: string;
};

const STORAGE_KEY = 'findvee-language';

const languageOptions: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'kn', label: 'Kannada' },
  { code: 'hi', label: 'Hindi' },
];

function applyLanguagePreference(code: LanguageCode) {
  const root = document.documentElement;
  root.lang = code;
  root.setAttribute('data-language', code);
  window.localStorage.setItem(STORAGE_KEY, code);
}

export function LanguageToggle() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      const initial = languageOptions.some((option) => option.code === stored) ? stored! : 'en';
      setLanguage(initial);
      applyLanguagePreference(initial);
    } catch (error) {
      console.warn('FindVee language toggle failed to read storage', error);
    } finally {
      setMounted(true);
    }
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    try {
      applyLanguagePreference(code);
    } catch (error) {
      console.warn('FindVee language toggle failed to persist language', error);
    }
  };

  return (
    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
      <span>Languages</span>
      <div className="flex gap-1">
        {languageOptions.map((option) => {
          const isActive = option.code === language;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => handleSelect(option.code)}
              disabled={!mounted}
              aria-pressed={isActive}
              aria-label={`Switch to ${option.label}`}
              className={`rounded-full px-3 py-1 transition-colors duration-200 ${
                isActive
                  ? 'bg-[color:var(--color-primary)] text-white shadow-[0_12px_32px_rgba(5,125,240,0.24)]'
                  : 'border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] text-[color:var(--text-muted)] hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
