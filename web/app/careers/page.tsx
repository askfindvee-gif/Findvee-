import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at FindVee',
  description: 'Build the next generation platform for Coastal Karnataka with FindVee.',
};

const roles = [
  {
    title: 'Community Launch Partner',
    location: 'Udupi & Kundapura',
    summary:
      'Build and nurture relationships with pharmacies, fisherfolk collectives, auto unions, and local associations. You love fieldwork and can switch between Kannada, Tulu, or Konkani with ease.',
  },
  {
    title: 'Product Engineer (Full-stack)',
    location: 'Hybrid — Manipal',
    summary:
      'Shape a multi-surface experience across web and Flutter. You care about performance on patchy networks and can ship thoughtful integrations with Supabase.',
  },
  {
    title: 'Growth & Partnerships Strategist',
    location: 'Coastal Karnataka',
    summary:
      'Design campaigns that speak to homestays, student communities, and retail clusters. You are data-informed but grounded in field conversations.',
  },
];

export default function CareersPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">Hiring now</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Join the FindVee crew</h1>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            We are building a platform that understands the pulse of Coastal Karnataka. Our team combines technologists, community champions, and logistics experts who wake up thinking about tides, traffic, and the next batch of neer dosas. If that sounds like you, come shape the ecosystem the coast deserves.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-3">
        {roles.map((role) => (
          <article
            key={role.title}
            className="glass-panel-muted flex flex-col gap-3 p-6 transition-colors hover:border-[color:var(--color-primary)]/40"
          >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{role.title}</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{role.location}</p>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{role.summary}</p>
            <button type="button" className="sharp-button mt-2 inline-flex items-center justify-center">
              Express interest
            </button>
          </article>
        ))}
      </section>

      <section className="glass-panel px-8 py-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Do not see a role?</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          We are always meeting builders, storytellers, and operators. Send your profile to{' '}
          <a
            href="mailto:ask@findvee.com"
            className="text-[color:var(--color-primary)] underline decoration-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] underline-offset-4"
          >
            ask@findvee.com
          </a>{' '}
          with a note on how you want to shape the future of coastal services.
        </p>
      </section>
    </div>
  );
}
