'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { VoiceController } from '../lib/voice/createVoiceController';

type SearchResult = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  score: number;
  badges?: string[];
  distance_m: number | null;
  category: string;
  primary_action?: { label: string; href: string } | null;
  highlight: string[];
};

type SearchResponse = {
  query: string;
  exact: boolean;
  results: SearchResult[];
  didYouMean: string | null;
};

type VoiceState = 'idle' | 'listening' | 'processing';

const DEBOUNCE_MS = 110;

function highlightText(text: string, tokens: string[]): Array<{ key: string; value: string; highlight: boolean }> {
  if (!tokens.length || !text) {
    return [{ key: text, value: text, highlight: false }];
  }

  const escapedTokens = Array.from(new Set(tokens.filter(Boolean))).map((token) =>
    token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
  );

  if (escapedTokens.length === 0) {
    return [{ key: text, value: text, highlight: false }];
  }

  const regex = new RegExp(`(${escapedTokens.join('|')})`, 'gi');
  const segments: Array<{ key: string; value: string; highlight: boolean }> = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const slice = text.slice(lastIndex, match.index);
      segments.push({ key: `${slice}-${segments.length}`, value: slice, highlight: false });
    }
    const value = match[0];
    segments.push({ key: `${value}-${segments.length}`, value, highlight: true });
    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    const slice = text.slice(lastIndex);
    segments.push({ key: `${slice}-${segments.length}`, value: slice, highlight: false });
  }

  return segments.length > 0 ? segments : [{ key: text, value: text, highlight: false }];
}

export default function GlobalSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const voiceControllerRef = useRef<VoiceController | null>(null);
  const geolocationRequested = useRef(false);

  const [value, setValue] = useState('');
  const [interim, setInterim] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [voiceMessage, setVoiceMessage] = useState<string | null>(null);
  const [geo, setGeo] = useState<{ lat: number; lng: number } | null>(null);

  const displayValue = interim || value;

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === '/' && !event.defaultPrevented) {
        const target = event.target as HTMLElement | null;
        if (target && ['input', 'textarea'].includes(target.tagName.toLowerCase())) {
          return;
        }
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(0);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  useEffect(() => {
    if (!focused || geolocationRequested.current || typeof navigator === 'undefined') {
      return;
    }
    if (!navigator.geolocation) {
      geolocationRequested.current = true;
      return;
    }
    geolocationRequested.current = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeo({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        setGeo(null);
      },
      { enableHighAccuracy: false, maximumAge: 300000, timeout: 3000 },
    );
  }, [focused]);

  useEffect(() => {
    if (!value.trim()) {
      setResults([]);
      setDidYouMean(null);
      setOpen(false);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    const timer = window.setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: value.trim(), limit: '20' });
        if (geo) {
          params.set('lat', geo.lat.toString());
          params.set('lng', geo.lng.toString());
        }

        const response = await fetch(`/api/search?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('search_failed');
        }
        const payload = (await response.json()) as SearchResponse;
        setResults(payload.results);
        setDidYouMean(payload.didYouMean);
        setOpen(payload.results.length > 0);
        setActiveIndex(0);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          setResults([]);
          setOpen(false);
        }
      } finally {
        setLoading(false);
        setVoiceState((state) => (state === 'processing' ? 'idle' : state));
      }
    }, DEBOUNCE_MS);

    return () => {
      controller.abort();
      window.clearTimeout(timer);
    };
  }, [value, geo]);

  useEffect(() => {
    return () => {
      voiceControllerRef.current?.stop();
    };
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open || results.length === 0) {
        if (event.key === 'Escape') {
          setValue('');
          setInterim('');
          setOpen(false);
        }
        return;
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % results.length);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((index) => (index - 1 + results.length) % results.length);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        const target = results[activeIndex] ?? results[0];
        if (target) {
          router.push(target.href);
          setOpen(false);
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        setOpen(false);
        setActiveIndex(0);
        setValue('');
        setInterim('');
        inputRef.current?.blur();
      }
    },
    [activeIndex, open, results, router],
  );

  const startVoice = useCallback(async () => {
    try {
      setVoiceMessage(null);
      setVoiceState('listening');
      const { createVoiceController } = await import('../lib/voice/createVoiceController');
      const controller = await createVoiceController({
        onInterim: (text) => setInterim(text),
        onFinal: (text) => {
          setInterim('');
          setVoiceState('processing');
          setValue(text);
          setOpen(true);
          inputRef.current?.focus();
        },
        onError: (error) => {
          setInterim('');
          setVoiceState('idle');
          setVoiceMessage(error.message);
        },
        lang: document.documentElement.lang || 'en-US',
      });
      voiceControllerRef.current = controller;
      controller.start();
    } catch (error) {
      setVoiceState('idle');
      setVoiceMessage(error instanceof Error ? error.message : 'Voice search unavailable');
    }
  }, []);

  const stopVoice = useCallback(() => {
    voiceControllerRef.current?.stop();
    setVoiceState('processing');
  }, []);

  const toggleVoice = useCallback(() => {
    if (voiceState === 'listening') {
      stopVoice();
      return;
    }
    startVoice();
  }, [startVoice, stopVoice, voiceState]);

  const highlightedResults = useMemo(() => {
    return results.map((result) => ({
      ...result,
      segments: {
        title: highlightText(result.title, result.highlight),
        subtitle: result.subtitle ? highlightText(result.subtitle, result.highlight) : null,
        description: highlightText(result.description, result.highlight),
      },
    }));
  }, [results]);

  return (
    <div ref={containerRef} className="flex w-full flex-col gap-4">
      <div
        className="flex items-center gap-3 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-0)] px-5 py-3 shadow-[0_18px_48px_rgba(5,125,240,0.12)] transition focus-within:border-[color:var(--color-primary)] focus-within:shadow-[0_22px_60px_rgba(5,125,240,0.2)]"
      >
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-[color:var(--text-muted)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-3.56a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          value={displayValue}
          placeholder="Search services, support, or pages"
          onChange={(event) => {
            setValue(event.target.value);
            setInterim('');
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setFocused(true);
            if (results.length > 0) {
              setOpen(true);
            }
          }}
          onBlur={() => setFocused(false)}
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="global-search-results"
          className="w-full bg-transparent text-lg text-[color:var(--text-strong)] outline-none placeholder:text-[color:var(--text-muted)]"
        />
        <span className="hidden rounded-md border border-[color:var(--border-subtle)] px-2 py-0.5 text-xs font-medium text-[color:var(--text-muted)] sm:inline-flex">
          /
        </span>
        <button
          type="button"
          aria-label="Search by voice"
          onClick={toggleVoice}
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-subtle)] text-[color:var(--text-strong)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)] ${voiceState === 'listening' ? 'animate-pulse border-[color:var(--color-primary)] text-[color:var(--color-primary)]' : ''}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 14a3 3 0 003-3V7a3 3 0 10-6 0v4a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 0013.9 1H17zM11 19h2v3h-2z"
            />
          </svg>
          {voiceState === 'processing' ? (
            <span className="absolute -bottom-2 text-[11px] font-medium text-[color:var(--text-muted)]">…</span>
          ) : null}
        </button>
        {displayValue && (
          <button
            type="button"
            onClick={() => {
              setValue('');
              setInterim('');
              setResults([]);
              setOpen(false);
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full text-sm text-[color:var(--text-muted)] transition hover:text-[color:var(--text-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
          >
            ×
          </button>
        )}
      </div>
      {voiceMessage ? (
        <p className="text-xs text-[color:var(--text-muted)]">{voiceMessage}</p>
      ) : null}
      {didYouMean ? (
        <p className="text-sm text-[color:var(--text-muted)]">
          Showing results for{' '}
          <button
            type="button"
            className="font-medium text-[color:var(--color-primary)] underline"
            onClick={() => {
              setValue(didYouMean);
              setInterim('');
            }}
          >
            {didYouMean}
          </button>
        </p>
      ) : null}
      {open ? (
        <div
          id="global-search-results"
          role="listbox"
          className="flex max-h-[420px] flex-col overflow-hidden rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] shadow-[0_24px_70px_rgba(5,125,240,0.16)]"
        >
          {loading ? (
            <div className="px-6 py-6 text-sm text-[color:var(--text-muted)]">Searching…</div>
          ) : null}
          {highlightedResults.map((result, index) => {
            const isActive = index === activeIndex;
            return (
              <Link
                key={result.id}
                href={result.href}
                role="option"
                aria-selected={isActive}
                className={`flex flex-col gap-2 border-b border-[color:var(--border-subtle)] px-6 py-4 text-[color:var(--text-strong)] transition ${
                  isActive ? 'bg-[color:var(--surface-0)]' : 'hover:bg-[color:var(--surface-0)]/70'
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(event) => {
                  event.preventDefault();
                  router.push(result.href);
                  setOpen(false);
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 text-left">
                    <p className="text-base font-semibold">
                      {result.segments.title.map((segment) =>
                        segment.highlight ? (
                          <mark key={segment.key} className="bg-transparent text-[color:var(--color-primary)]">
                            {segment.value}
                          </mark>
                        ) : (
                          <span key={segment.key}>{segment.value}</span>
                        ),
                      )}
                    </p>
                    {result.segments.subtitle ? (
                      <p className="text-sm text-[color:var(--text-muted)]">
                        {result.segments.subtitle.map((segment) =>
                          segment.highlight ? (
                            <mark key={segment.key} className="bg-transparent text-[color:var(--color-primary)]">
                              {segment.value}
                            </mark>
                          ) : (
                            <span key={segment.key}>{segment.value}</span>
                          ),
                        )}
                      </p>
                    ) : null}
                    <p className="text-sm text-[color:var(--text-muted)]">
                      {result.segments.description.map((segment) =>
                        segment.highlight ? (
                          <mark key={segment.key} className="bg-transparent text-[color:var(--color-primary)]">
                            {segment.value}
                          </mark>
                        ) : (
                          <span key={segment.key}>{segment.value}</span>
                        ),
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
                      <span>{result.category}</span>
                      {result.badges?.map((badge) => (
                        <span key={badge}>{badge}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-right text-[color:var(--text-muted)]">
                    <span className="text-sm font-semibold text-[color:var(--color-primary)]">{result.score.toFixed(1)}</span>
                    {typeof result.distance_m === 'number' ? (
                      <span className="text-xs">{(result.distance_m / 1000).toFixed(1)} km</span>
                    ) : null}
                    {result.primary_action ? (
                      <span className="text-xs font-medium">{result.primary_action.label}</span>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })}
          {highlightedResults.length === 0 && !loading ? (
            <div className="px-6 py-6 text-sm text-[color:var(--text-muted)]">
              No matches yet. Try searching for a service like “groceries” or “lab tests”.
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
