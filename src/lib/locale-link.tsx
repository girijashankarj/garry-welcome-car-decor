'use client';

import Link from 'next/link';
import { useLocale } from '@/app/components/LocaleProvider';
import type { Locale } from '@/i18n/routing';

export function getLocalePath(locale: Locale, path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${p}`;
}

interface LocaleLinkProps extends Omit<React.ComponentProps<typeof Link>, 'href'> {
  href: string;
}

export function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { locale } = useLocale();
  const localeHref = getLocalePath(locale, href);
  return <Link href={localeHref} {...props} />;
}
