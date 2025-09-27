import Link from 'next/link';

const linkGroups: Array<{ title: string; items: Array<{ href: string; label: string }> }> = [
  {
    title: 'Product',
    items: [
      { href: '/', label: 'Overview' },
      { href: '/onboarding', label: 'Partner onboarding' },
      { href: '/help', label: 'Help centre' },
    ],
  },
  {
    title: 'Company',
    items: [
      { href: '/about', label: 'About FindVee' },
      { href: '/careers', label: 'Careers' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { href: '/privacy', label: 'Privacy policy' },
      { href: '/terms', label: 'Terms of use' },
      { href: '/support', label: 'Support' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-[color:var(--border-subtle)] bg-[color:var(--surface-0)]/95 backdrop-blur-xl transition-colors duration-300">
      <div className="mx-auto w-full max-w-6xl px-0 py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div className="space-y-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-1)] text-sm font-semibold uppercase tracking-[0.38em] text-[color:var(--color-primary)]">
              FV
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-[color:var(--text-muted)]">
              FindVee is the ambient platform for modern neighbourhoods, blending live specialists with AI to coordinate hyperlocal services without the friction.
            </p>
            <div className="space-y-1 text-xs font-semibold uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
              <p>ask@findvee.com</p>
              <p>+91 9731289898</p>
            </div>
          </div>
          {linkGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[color:var(--text-muted)]">{group.title}</p>
              <ul className="space-y-3 text-sm text-[color:var(--text-muted)] transition-colors">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[color:var(--color-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--color-primary)]"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[color:var(--border-subtle)] pt-6 text-[11px] uppercase tracking-[0.32em] text-[color:var(--text-muted)]">
          © {new Date().getFullYear()} FindVee. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
