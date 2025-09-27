import Link from 'next/link';

import { getTrending } from '../lib/search/engine';

const trendingItems = getTrending(8);

export function Trending() {
  return (
    <section className="w-full max-w-5xl" aria-labelledby="trending-heading">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2
          id="trending-heading"
          className="text-lg font-semibold text-[color:var(--text-strong)]"
        >
          Trending in Coastal Karnataka
        </h2>
        <span className="text-xs uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
          Updated daily
        </span>
      </div>
      <div
        className="mt-4 flex flex-wrap gap-3 overflow-hidden rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] p-4"
        style={{ maxHeight: '280px' }}
      >
        {trendingItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group flex min-h-[56px] min-w-[140px] flex-1 basis-[140px] items-start justify-between gap-3 rounded-lg border border-transparent bg-[color:var(--surface-0)] px-4 py-3 text-left transition hover:border-[color:var(--color-primary)] hover:text-[color:var(--color-primary)]"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold leading-tight text-[color:var(--text-strong)] group-hover:text-[color:var(--color-primary)]">
                {item.title}
              </p>
              {item.subtitle ? (
                <p className="text-xs text-[color:var(--text-muted)]">{item.subtitle}</p>
              ) : null}
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
              {item.category}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
