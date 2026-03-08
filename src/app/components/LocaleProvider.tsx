'use client';

import { createContext, useContext, useMemo } from 'react';
import type { Locale } from '@/i18n/routing';
import { getMessagesSync } from '@/lib/i18n';

const LocaleContext = createContext<{ locale: Locale; t: (ns: string) => (key: string) => string } | null>(null);

export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const value = useMemo(() => {
    const messages = getMessagesSync(locale);
    const t = (ns: string) => {
      const nsData = (messages[ns] as Record<string, string>) || {};
      return (key: string) => nsData[key] ?? key;
    };
    return { locale, t };
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
