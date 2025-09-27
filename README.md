# FindVee Starter (Web + Mobile)

FindVee is a multi-surface service platform. This repository ships a sharp, glass-inspired starter for web (Next.js 14) and mobile (Flutter) so new surfaces can come online quickly.

## Repository layout

```
.
├── web/        # Next.js 14 app router project wired with Supabase client
├── mobile/     # Flutter app with go_router + Supabase
├── tokens/     # Shared design tokens (colors, spacing, blur)
└── .github/    # CI pipelines for both surfaces
```

## Prerequisites

- Node.js 18+
- pnpm 9+
- Flutter 3.19+
- Supabase project (for environment variables)

## Web setup

```bash
cd web
pnpm install
cp .env.example .env.local  # add NEXT_PUBLIC_SUPABASE_URL + NEXT_PUBLIC_SUPABASE_ANON_KEY
pnpm dev
```

The development server runs at http://localhost:3000. The header displays the FindVee logo and links to the public pages.

## Mobile setup

```bash
cd mobile
flutter pub get
cp assets/.env.sample assets/.env  # add SUPABASE_URL + SUPABASE_ANON_KEY
flutter run
```

The Android/iOS app loads with a FindVee-branded AppBar, sharp Material 3 theme, and navigation powered by `go_router`.

## Environment configuration

- `web/.env.example` — placeholders for Supabase URL and anon key used by the Next.js client.
- `mobile/assets/.env.sample` — mirrored placeholders consumed by `flutter_dotenv` and `supabase_flutter`.

Never commit real credentials. Copy the samples locally and keep them out of version control.

## Continuous integration

- `.github/workflows/web-ci.yml` installs dependencies with pnpm and builds the Next.js app.
- `.github/workflows/mobile-ci.yml` installs Flutter, fetches packages, and builds a debug APK.

## Design system

The starter leans on shared tokens in `tokens/design-tokens.json` to promote sharp edges, glass panels, and a dark-neutral base. Extend these tokens as new themes emerge.

## Deployment

Vercel is configured via `vercel.json` to build the web app from the `web` directory. Adjust or remove this file if you deploy elsewhere.
