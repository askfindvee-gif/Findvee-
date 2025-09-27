import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About FindVee',
  description:
    'Learn how FindVee is building a hyper-local service network across Udupi, Kundapura, and Manipal.',
};

const liveModules = [
  {
    title: 'Health',
    description:
      'Order medicines from trusted Udupi pharmacies or lock in lab sample pickups before the monsoon humidity settles in.',
  },
  {
    title: 'Shopping',
    description:
      "Everyday groceries, fresh coastal produce, and supplies from Kundapura's supermarts—delivered the way each neighbourhood prefers.",
  },
  {
    title: 'Transport',
    description:
      'Tap into reliable autorickshaws and taxis that already know the bends between Manipal, Udupi, and the beachside suburbs.',
  },
  {
    title: 'Pet care',
    description:
      "Schedule vet visits, source meds, or book a grooming slot that works around your pet's beach runs.",
  },
  {
    title: 'Food',
    description:
      'From Kundapura ghee roast to Manipal midnight snacks—find the kitchens that deliver when cravings strike.',
  },
];

const upcoming = [
  'Recharge & Utility Bill Payments',
  'More regional language experiences',
  'Expanded vendor tools for seasonal tourism peaks',
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">Our story</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Born for Coastal Karnataka</h1>
          <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200">
            FindVee began as a neighbourhood initiative connecting students, families, and small businesses across Kundapura, Udupi,
            and Manipal. We learned that life on the coast runs on trust: knowing the chemist who answers late at night, the driver
            who reaches before the rain, the grocer who understands seasonal cravings. Our mission is to translate that trust into a
            multi-surface platform that feels personal, dependable, and distinctly coastal.
          </p>
        </div>
      </section>

      <section className="glass-panel px-8 py-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What is live today</h2>
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Each module is built with local partners and mapped to the daily rhythms of our coastal towns.
            </p>
          </div>
          <div className="space-y-4">
            {liveModules.map((module) => (
              <div
                key={module.title}
                className="glass-panel-muted p-6 transition-colors hover:border-[color:var(--color-primary)]/40"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{module.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{module.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">What is next</h2>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            We are scaling across the coast without losing the neighbourhood touch. Upcoming releases will bring:
          </p>
          <ul className="grid gap-4 sm:grid-cols-2">
            {upcoming.map((item) => (
              <li key={item} className="glass-panel-muted p-4 text-sm text-slate-700 dark:text-slate-200">
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            If you are building something that solves a coastal challenge, we would love to co-create.
          </p>
        </div>
      </section>
    </div>
  );
}
