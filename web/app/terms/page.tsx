import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use — FindVee',
  description: 'Understand the ground rules for using FindVee across Coastal Karnataka.',
};

const terms = [
  {
    title: 'Using the platform',
    body:
      'Create an account with accurate contact details. Keep your address and payment information updated so deliveries reach you without delays.',
  },
  {
    title: 'Respectful conduct',
    body:
      'Treat delivery partners, store owners, and support staff with courtesy. Report issues immediately so we can resolve them fairly.',
  },
  {
    title: 'Orders & payments',
    body:
      'All orders are subject to partner availability. Charges are shown before you confirm. Failed payments will automatically roll back services.',
  },
  {
    title: 'Liability',
    body:
      'We coordinate services through verified partners but are not responsible for losses beyond the value of the order. We help mediate disputes quickly.',
  },
  {
    title: 'Dispute resolution',
    body:
      'Email ask@findvee.com or call +91 9731289898 within 48 hours. We aim to settle concerns amicably, but unresolved matters fall under Karnataka jurisdiction.',
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">Plain-language terms</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Simple rules for a smoother life</h1>
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            These guidelines keep FindVee fair for customers, vendors, and partners across the coast.
          </p>
        </div>
      </section>
      <section className="space-y-4">
        {terms.map((item) => (
          <article key={item.title} className="glass-panel-muted p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h2>
            <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
