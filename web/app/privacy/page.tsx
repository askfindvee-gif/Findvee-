import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — FindVee',
  description: 'Understand how FindVee protects your information in Coastal Karnataka.',
};

const statements = [
  {
    title: 'Data we collect',
    body:
      'We capture your name, contact details, delivery addresses, and order preferences so we can serve you quickly. Location pings are used only to match you with nearby riders.',
  },
  {
    title: 'How we use it',
    body:
      'Your details help us coordinate medicines, groceries, rides, pet services, and meals across Udupi, Kundapura, and Manipal. We never sell your data or share it with advertisers.',
  },
  {
    title: 'Where it is stored',
    body:
      'All data sits in secure Supabase infrastructure with access controls. Vendor teams see only the information required to complete your order.',
  },
  {
    title: 'Your choices',
    body:
      'You can request a data download or deletion anytime by emailing ask@findvee.com. We aim to confirm actions within two working days.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">Privacy first</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Privacy that respects your pace</h1>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            We designed FindVee to handle sensitive errands with care. This short policy explains the essentials in plain language.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2">
        {statements.map((item) => (
          <article key={item.title} className="glass-panel-muted p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="glass-panel px-8 py-12 text-sm text-[color:var(--text-muted)]">
        <p>
          Have questions? Reach our privacy desk at{' '}
          <a
            href="mailto:ask@findvee.com"
            className="text-[color:var(--color-primary)] underline decoration-[color-mix(in_srgb,var(--color-primary)_60%,transparent)] underline-offset-4"
          >
            ask@findvee.com
          </a>{' '}
          or call +91 9731289898. We respond between 9 AM and 9 PM every day.
        </p>
      </section>
    </div>
  );
}
