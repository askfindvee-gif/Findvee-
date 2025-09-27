import '../styles/globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { Footer } from '../components/Footer';
import { Header } from './components/Header';

const themeInitScript = `!function(){try{var e=localStorage.getItem('fv_theme')||'dark';document.documentElement.dataset.theme=e;var t=document.documentElement.classList;t[e==='night'?'add':'remove']('dark');}catch(o){}}();`;

export const metadata: Metadata = {
  title: 'FindVee — One platform for every coastal need',
  description:
    'FindVee connects every surface with sharp, glassy design and Supabase-powered coordination for Coastal Karnataka.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans">
        <div
          id="lp"
          className="mx-auto flex min-h-[var(--lp-target-h)] w-full max-w-6xl flex-1 flex-col px-4 sm:px-6 lg:px-8"
        >
          <Header />
          <main className="flex flex-1 flex-col items-center gap-16 pb-20 pt-16 sm:pb-24 sm:pt-24">{children}</main>
          <div className="lp-spacer" aria-hidden="true" />
          <Footer />
        </div>
      </body>
    </html>
  );
}
