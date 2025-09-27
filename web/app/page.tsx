import Link from 'next/link';
import GlobalSearch from '../components/GlobalSearch';

const heroParagraph =
  'FindVee pairs human specialists with AI copilots to deliver frictionless experiences for residents, property teams, and local partners. Discover services, approve in a tap, and trust that every detail is handled.';

const wowResidentsFeatures = [
  {
    title: 'Resident-grade sourcing',
    description:
      'Dispatch FindVee experts to research, vet, and schedule — whether it is a glazing fix, home maintenance, or last-minute gifting.',
    href: '/support',
  },
  {
    title: 'Neighborhood intelligence',
    description:
      'Discover trusted providers, curated schedules, and hidden gems powered by insights from residents and FindVee’s knowledge engine.',
    href: '/about',
  },
  {
    title: 'Automated follow-through',
    description:
      'Track updates, approvals, and invoices in a unified hub so nothing slips through the cracks during busy resident cycles.',
    href: '/help',
  },
];

export default function HomePage() {
  return (
    <>
      <section className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-6 text-left">
          <span className="badge-soft w-fit">Introducing FindVee across Coastal Karnataka</span>
          <h1 className="text-4xl font-semibold tracking-tight text-[color:var(--text-strong)] sm:text-5xl">
            Orchestrate every hyperlocal service from one intelligent hub
          </h1>
          <p className="text-base leading-relaxed text-[color:var(--text-muted)] sm:text-lg">{heroParagraph}</p>
          <div className="flex flex-col gap-2 text-sm text-[color:var(--text-muted)] sm:text-base">
            <p>
              Ask for medicines, groceries, transport, pet care, or meals in plain language — FindVee routes the request to the
              right partner instantly.
            </p>
            <p>
              Need to talk to someone? Our team is on standby every day from 9 AM to 9 PM to coordinate anything that needs a
              human touch.
            </p>
          </div>
        </div>
      </section>

      <div className="global-search-sticky w-full max-w-4xl">
        <GlobalSearch />
      </div>

      <section className="w-full border-t border-[color:var(--border-subtle)] bg-[color:var(--surface-0)]/92 py-16 sm:py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-0">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-[color:var(--text-strong)] sm:text-4xl">
              Everything you need to wow residents
            </h2>
            <p className="text-base leading-relaxed text-[color:var(--text-muted)] sm:text-lg">
              Activate AI-assisted workflows, pre-vetted partners, and proactive insights in minutes.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {wowResidentsFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex h-full flex-col justify-between gap-8 border border-[color:var(--border-subtle)] bg-[color:var(--surface-0)]/94 px-6 py-8 text-left backdrop-blur-xl"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-[color:var(--text-strong)]">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-[color:var(--text-muted)]">{feature.description}</p>
                </div>
                <Link
                  href={feature.href}
                  className="inline-flex items-center text-sm font-semibold text-[color:var(--color-primary)] hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
                >
                  Explore capabilities
                  <span aria-hidden className="ml-2 text-base">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
