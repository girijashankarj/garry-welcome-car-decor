'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { LocaleLink } from '@/lib/locale-link';
import { useLocale } from './LocaleProvider';
import siteData from '@/data/site.json';
import { assetPath } from '@/lib/assetPath';

const pathToNavKey: Record<string, string> = {
  '/': 'home',
  '/products': 'products',
  '/categories': 'categories',
  '/brands': 'brands',
  '/search': 'search',
  '/guides': 'howToOrder',
  '/contact': 'contact',
};

const navIcons: Record<string, string> = {
  home: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  products: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
  brands: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  categories: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
  search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
  howToOrder: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  contact: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
};

function NavIcon({ navKey }: { navKey: string }) {
  const path = navIcons[navKey] || navIcons.home;
  return (
    <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
    </svg>
  );
}

/** Top nav - desktop only */
function TopNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  const pathWithoutLocale = pathname.replace(/^\/(en|mr)/, '') || '/';
  const nav = siteData.navigation as { text: string; path: string }[];

  return (
    <nav className="hidden flex-wrap items-center gap-1 sm:flex md:gap-2" aria-label={t('aria')('mainNav')}>
      {nav.map((item) => {
        const navKey = pathToNavKey[item.path] ?? (item.path.slice(1) || 'home');
        const isActive =
          pathWithoutLocale === item.path || (item.path !== '/' && pathWithoutLocale.startsWith(item.path));
        return (
          <LocaleLink
            key={item.path}
            href={item.path}
            className={`rounded-lg px-3 py-2 text-sm font-medium no-underline transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('nav')(navKey)}
          </LocaleLink>
        );
      })}
    </nav>
  );
}

/** Mobile bottom nav */
function BottomNav() {
  const pathname = usePathname();
  const { t } = useLocale();
  const pathWithoutLocale = pathname.replace(/^\/(en|mr)/, '') || '/';
  const navItems = [
    { path: '/', navKey: 'home' },
    { path: '/products', navKey: 'products' },
    { path: '/categories', navKey: 'categories' },
    { path: '/brands', navKey: 'brands' },
    { path: '/search', navKey: 'search' },
    { path: '/guides', navKey: 'howToOrder' },
    { path: '/contact', navKey: 'contact' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-card/95 py-2 backdrop-blur-md sm:hidden"
      aria-label={t('aria')('mobileNav')}
    >
      {navItems.map((item) => {
        const isActive = pathWithoutLocale === item.path || (item.path !== '/' && pathWithoutLocale.startsWith(item.path));
        return (
          <LocaleLink
            key={item.path}
            href={item.path}
            className={`flex flex-col items-center gap-1 rounded-lg px-3 py-2 text-xs no-underline transition-colors ${
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <NavIcon navKey={item.navKey} />
            {t('nav')(item.navKey)}
          </LocaleLink>
        );
      })}
    </nav>
  );
}

const pathToFooterKey: Record<string, string> = {
  '/guides': 'howToOrder',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/contact': 'contact',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { t } = useLocale();

  return (
    <div className="flex min-h-screen flex-col bg-background antialiased">
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="absolute left-4 top-0 z-[100] -translate-y-full rounded-b-lg bg-primary px-4 py-2 font-medium text-white no-underline transition-transform duration-200 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      >
        {t('nav')('skipToContent')}
      </a>

      {/* Header - top nav bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-md sm:px-6">
        <LocaleLink href="/" className="flex shrink-0 items-center gap-2.5 no-underline">
          <Image
            src={assetPath('/images/branding/icon-512.png')}
            alt=""
            width={36}
            height={36}
            className="shrink-0 rounded-lg"
          />
          <span className="hidden font-bold tracking-tight text-foreground sm:inline">{siteData.app.name}</span>
        </LocaleLink>

        <TopNav />

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1 overflow-x-hidden px-4 py-6 pb-24 sm:pb-6 sm:px-6" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="text-sm text-muted-foreground">
              {t('footer')('copyright')}
            </p>
            {((siteData as { contact?: { phone?: string } }).contact?.phone) && (
              <a
                href={`tel:+91${(siteData.contact as { phone?: string }).phone?.replace(/\D/g, '')}`}
                className="text-sm font-medium text-primary hover:underline"
                aria-label={t('aria')('callUs')}
              >
                +91 {(siteData.contact as { phone?: string }).phone?.replace(/\D/g, '')}
              </a>
            )}
          </div>
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
            <nav aria-label={t('aria')('footerNav')}>
              <ul className="flex list-none gap-6 p-0">
                {((siteData as { footer?: { links?: { text: string; path: string }[] } }).footer?.links ?? []).map((link) => {
                  const footerKey = pathToFooterKey[link.path];
                  const label = footerKey ? (footerKey === 'howToOrder' || footerKey === 'contact' ? t('nav')(footerKey) : t('footer')(footerKey)) : link.text;
                  return (
                    <li key={link.path}>
                      <LocaleLink
                        href={link.path}
                        className="text-sm text-muted-foreground no-underline hover:text-primary"
                      >
                        {label}
                      </LocaleLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </footer>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}
