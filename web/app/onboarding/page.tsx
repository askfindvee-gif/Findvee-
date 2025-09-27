export default function OnboardingPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-primary)] opacity-80">Partner onboarding</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Partner with FindVee</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Bring your health, shopping, transport, pet care, or culinary service online with FindVee and reach customers across the
          Coastal Karnataka belt in minutes.
        </p>
      </header>
      <div className="glass-panel space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="glass-panel-muted space-y-2 p-4">
            <h2 className="text-sm font-semibold text-white">Why join</h2>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>Real-time dispatch and order alerts on mobile and web.</li>
              <li>Payments routed securely with Supabase-backed infra.</li>
              <li>Visibility across Udupi, Kundapura, Manipal, and beyond.</li>
            </ul>
          </div>
          <div className="glass-panel-muted space-y-2 p-4">
            <h2 className="text-sm font-semibold text-white">What we need</h2>
            <ul className="space-y-1 text-xs text-slate-400">
              <li>Basic KYC docs for your store, clinic, or fleet.</li>
              <li>Service menu with availability windows.</li>
              <li>A commitment to FindVee’s zero BS service charter.</li>
            </ul>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-sm text-slate-300">
            Drop your details at <a href="mailto:ask@findvee.com">ask@findvee.com</a> or message{' '}
            <a href="https://wa.me/919731289898" rel="noreferrer" target="_blank">
              +91 97312 89898
            </a>{' '}
            on WhatsApp. Our team will schedule a walkthrough within 24 hours.
          </p>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
            Coming soon: Recharge & Utility Bill Payments vendor pilots.
          </p>
        </div>
      </div>
    </section>
  );
}
