'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from './LocaleProvider';
import { locales, type Locale } from '@/i18n/routing';

const localeNames: Record<Locale, string> = {
  en: 'English',
  mr: 'मराठी',
};

export default function LanguageSwitcher() {
  const { locale } = useLocale();
  const pathname = usePathname();

  const pathWithoutLocale = pathname.replace(/^\/(en|mr)/, '') || '/';

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 px-2 py-1 dark:border-white/10">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={`/${loc}${pathWithoutLocale || ''}`}
          className={`rounded px-2 py-1 text-xs font-medium no-underline transition-colors ${
            locale === loc ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
          aria-label={`Switch to ${localeNames[loc]}`}
        >
          {localeNames[loc]}
        </Link>
      ))}
    </div>
  );
}
