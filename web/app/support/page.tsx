import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partner Support — FindVee',
  description: 'Operational support for residents, vendors, and partners on FindVee.',
};

const responsePlaybooks = [
  {
    title: 'Residents & families',
    notes: [
      'Tap “Need help” inside any order to escalate deliveries, reschedule lab pickups, or request follow-ups.',
      'Share apartment gate codes or local cues so our runners can navigate coastal lanes faster.',
      'Prefer conversations in Kannada, Tulu, or Konkani? Let us know and we will respond accordingly.',
    ],
  },
  {
    title: 'Vendors & riders',
    notes: [
      'Use the vendor console to flag inventory gaps or surge pricing during festive weekends.',
      'Sync your service radius so we can dispatch only to reachable neighbourhoods.',
      'Report incidents within 30 minutes; our field leads coordinate on-site resolutions across Udupi, Kundapura, and Manipal.',
    ],
  },
];

const escalationLanes = [
  {
    label: 'Phone',
    value: '+91 9731289898',
  },
  {
    label: 'Email',
    value: 'ask@findvee.com',
  },
  {
    label: 'Service window',
    value: '9 AM – 9 PM, every day',
  },
];

export default function SupportPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">Operational support</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">Real humans. Real-time answers.</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Our support desk is headquartered in Koteshwara with specialists stationed across Udupi, Kundapura, and Manipal. We
            respond with context, not canned scripts.
          </p>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        {responsePlaybooks.map((block) => (
          <div key={block.title} className="glass-panel px-6 py-8">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{block.title}</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700 dark:text-slate-200">
              {block.notes.map((note) => (
                <li key={note} className="glass-panel-muted p-4">
                  {note}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="glass-panel px-8 py-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Escalation lanes</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          Ping us on any channel below for priority routing. We log every interaction in Supabase so your history follows you across
          surfaces.
        </p>
        <dl className="mt-6 grid gap-4 sm:grid-cols-3">
          {escalationLanes.map((lane) => (
            <div key={lane.label} className="glass-panel-muted p-4">
              <dt className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{lane.label}</dt>
              <dd className="mt-2 text-sm text-slate-800 dark:text-slate-100">{lane.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
