import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help & Support — FindVee',
  description: 'Get help as a FindVee customer or vendor across Udupi, Kundapura, and Manipal.',
};

const supportChannels = [
  {
    label: 'Support hours',
    value: '9 AM – 9 PM, Monday to Sunday',
  },
  {
    label: 'Phone',
    value: '+91 9731289898',
  },
  {
    label: 'Email',
    value: 'ask@findvee.com',
  },
];

export default function HelpPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">How can we help?</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">We are here for you</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Whether you are ordering coastal staples to your home in Udupi or onboarding your store in Kundapura, the FindVee crew is
            on call. Choose the guidance that matches your role, or reach out directly.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="glass-panel px-6 py-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">For customers</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <li className="glass-panel-muted p-4">
              Track medicine deliveries inside the app; ping support if monsoon delays affect your schedule.
            </li>
            <li className="glass-panel-muted p-4">
              Update delivery instructions in the order timeline—be specific about landmarks like temples or beach shacks.
            </li>
            <li className="glass-panel-muted p-4">
              For auto or taxi rides, use the live driver notes to share tide or roadblock alerts in real time.
            </li>
          </ul>
        </div>
        <div className="glass-panel px-6 py-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">For vendors & service partners</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-200">
            <li className="glass-panel-muted p-4">
              Keep your inventory and slot availability fresh—especially during college intake weekends in Manipal.
            </li>
            <li className="glass-panel-muted p-4">
              Use the vendor dashboard to highlight seasonal specials like mango pickles or coastal fish thalis.
            </li>
            <li className="glass-panel-muted p-4">
              Need onsite support? Schedule a field visit and we will drop by your outlet in Kundapura or Udupi.
            </li>
          </ul>
        </div>
      </section>

      <section className="glass-panel px-8 py-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Support channels</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          Prefer a direct human conversation? Reach out using the details below and a coastal specialist will respond.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {supportChannels.map((item) => (
            <div key={item.label} className="glass-panel-muted p-4">
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.label}</dt>
              <dd className="mt-2 text-sm text-slate-800 dark:text-slate-100">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
