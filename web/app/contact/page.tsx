import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact FindVee',
  description: 'Reach the FindVee team in Coastal Karnataka for partnerships or support.',
};

const contactDetails = [
  {
    label: 'Office',
    value: 'Ashraya, Ankadakatte, NH66, Koteshwara, Kundapura, Karnataka – 576222',
  },
  {
    label: 'Phone',
    value: '+91 9731289898',
  },
  {
    label: 'Email',
    value: 'ask@findvee.com',
  },
  {
    label: 'Support hours',
    value: '9 AM – 9 PM, Monday to Sunday',
  },
];

export default function ContactPage() {
  return (
    <div className="space-y-12">
      <section className="glass-panel px-8 py-12">
        <div className="space-y-4">
          <span className="badge-soft">Say hello</span>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Let’s meet on the coast</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            FindVee operates out of Koteshwara, but we are constantly on the move between Kundapura, Udupi, and Manipal. Drop in for a
            coffee, call for a quick question, or send us an email and we will respond before the tide changes.
          </p>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactDetails.map((item) => (
          <div key={item.label} className="glass-panel-muted p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-3 text-sm text-slate-800 dark:text-slate-100">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="glass-panel px-8 py-12">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">On-ground coverage</h2>
        <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
          Need us to visit your store or society? Book a slot and we will schedule a field executive for Udupi town, the fishing
          harbours around Gangolli, or student hostels in Manipal. We adapt to your preferred language and timing.
        </p>
      </section>
    </div>
  );
}
