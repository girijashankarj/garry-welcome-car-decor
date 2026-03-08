'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import siteData from '@/data/site.json';

const DRAWER_WIDTH = 240;

const navIcons: Record<string, string> = {
  Home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  Products: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  Brands: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  Categories: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  Search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  Contact: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

function NavIcon({ name }: { name: string }) {
  const path = navIcons[name] || navIcons.Home;
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );
}

function SidebarContent() {
  const pathname = usePathname();
  const nav = siteData.navigation as { text: string; path: string }[];

  return (
    <div className="flex h-full flex-col bg-card">
      <nav className="flex-1 p-2" aria-label="Main navigation">
        <ul className="list-none space-y-1 p-0">
          {nav.map((item) => {
            const isActive =
              pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm no-underline transition-colors ${
                    isActive
                      ? 'border-l-4 border-primary bg-primary/10 font-semibold text-primary'
                      : 'border-l-4 border-transparent text-foreground hover:bg-muted hover:border-primary/30'
                  }`}
                >
                  <NavIcon name={item.text} />
                  {item.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);
  const nav = siteData.navigation as { text: string; path: string }[];
  const currentPage = nav.find((n) => n.path === pathname || (n.path !== '/' && pathname.startsWith(n.path)));
  const pageTitle = currentPage?.text ?? siteData.app.name;

  return (
    <div className="flex min-h-screen bg-background font-rajdhani">
      {/* Skip to main content - for keyboard users */}
      <a
        href="#main-content"
        className="absolute left-4 top-0 z-[100] -translate-y-full rounded-b-lg bg-primary px-4 py-2 font-medium text-primary-foreground no-underline transition-transform duration-200 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        Skip to main content
      </a>
      {/* Mobile menu button - visible only on small screens */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-lg p-2 text-foreground hover:bg-muted sm:hidden"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar - mobile drawer / persistent on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 transform border-r border-border bg-card transition-transform duration-200 sm:static sm:z-auto sm:block sm:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
        }`}
      >
        <div className="flex h-full w-60 flex-col">
          <Link href="/" className="flex items-center justify-between gap-3 border-b border-border p-4 no-underline sm:justify-start">
            <Image
              src="/images/branding/icon-512.png"
              alt=""
              width={36}
              height={36}
              className="shrink-0 rounded-lg"
            />
            <span className="text-lg font-bold text-primary">{siteData.app.name}</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded p-2 text-foreground hover:bg-muted sm:hidden"
              aria-label="Close menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Link>
          <SidebarContent />
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex min-h-screen flex-1 flex-col sm:ml-0">
        {/* AppBar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 sm:pl-8">
          <h1
            className="text-lg font-bold"
            style={{
              background: 'var(--color-gradient-text)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {pageTitle}
          </h1>
          <ThemeToggle />
        </header>

        {/* Page content */}
        <main id="main-content" className="flex-1 overflow-x-hidden px-4 py-6 sm:px-6" tabIndex={-1}>
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-border px-4 py-6 sm:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              {(siteData as { app?: { copyright?: string } }).app?.copyright ?? `© ${new Date().getFullYear()} ${siteData.app.name}`}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {((siteData as { footer?: { social?: { text: string; url: string }[] } }).footer?.social ?? []).map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground no-underline hover:text-primary"
                  aria-label={s.text}
                >
                  {s.text}
                </a>
              ))}
              <nav aria-label="Footer navigation">
                <ul className="flex list-none gap-6 p-0">
                  {((siteData as { footer?: { links?: { text: string; path: string }[] } }).footer?.links ?? []).map((link) => (
                    <li key={link.path}>
                      <Link
                        href={link.path}
                        className="text-sm text-muted-foreground no-underline hover:text-primary"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
