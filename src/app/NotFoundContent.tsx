'use client';

import Link from 'next/link';
import { useLocaleFromPath, useTranslationsFromPath } from '@/lib/useLocaleFromPath';

export default function NotFoundContent() {
  const locale = useLocaleFromPath();
  const t = useTranslationsFromPath('notFoundPage');

  return (
    <div className="py-12 text-center">
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('title')}</h1>
      <p className="mb-6 text-muted-foreground">
        {t('message')}
      </p>
      <Link
        href={`/${locale}`}
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground no-underline hover:opacity-90"
      >
        {t('backToHome')}
      </Link>
    </div>
  );
}
