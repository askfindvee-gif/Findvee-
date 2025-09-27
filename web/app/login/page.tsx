export default function LoginPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-primary)] opacity-80">Access FindVee</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Login</h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Sign in to manage your orders, track service partners, and stay updated on every booking happening across Udupi,
          Kundapura, and Manipal.
        </p>
      </header>
      <div className="glass-panel space-y-6 p-6">
        <p className="text-sm text-slate-300">
          Authentication is coming soon. Until then, reach our crew at <a href="mailto:ask@findvee.com">ask@findvee.com</a> or call{' '}
          <a href="tel:+919731289898">+91 97312 89898</a> to update your account.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="glass-panel-muted space-y-2 p-4">
            <h2 className="text-sm font-semibold text-white">Coastal customers</h2>
            <p className="text-xs text-slate-400">
              Track medicines, groceries, transport rides, pet care, and hot meals as they move through your neighbourhood.
            </p>
          </div>
          <div className="glass-panel-muted space-y-2 p-4">
            <h2 className="text-sm font-semibold text-white">Vendors & crews</h2>
            <p className="text-xs text-slate-400">
              Coordinate with FindVee dispatch, confirm slots, and unlock early access to Recharge & Utility bill pilots.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
