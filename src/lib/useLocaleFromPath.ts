'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { getMessagesSync } from '@/lib/i18n';
import { locales, defaultLocale, type Locale } from '@/i18n/routing';

/** Extract locale from pathname (e.g. /en/... or /mr/...) - for use in root error/not-found */
export function useLocaleFromPath(): Locale {
  const pathname = usePathname();
  return useMemo(() => {
    const seg = pathname?.split('/')[1];
    return (locales as readonly string[]).includes(seg ?? '') ? (seg as Locale) : defaultLocale;
  }, [pathname]);
}

/** Get t function for a namespace - for use in root error/not-found where LocaleProvider may not exist */
export function useTranslationsFromPath(namespace: string) {
  const locale = useLocaleFromPath();
  return useMemo(() => {
    const messages = getMessagesSync(locale);
    const ns = (messages[namespace] as Record<string, string>) || {};
    return (key: string) => ns[key] ?? key;
  }, [locale, namespace]);
}
