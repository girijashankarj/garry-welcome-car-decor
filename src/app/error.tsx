'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useLocaleFromPath, useTranslationsFromPath } from '@/lib/useLocaleFromPath';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = useLocaleFromPath();
  const t = useTranslationsFromPath('errorPage');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('title')}</h1>
      <p className="mb-6 text-center text-muted-foreground">
        {t('message')}
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t('tryAgain')}
        </button>
        <Link
          href={`/${locale}`}
          className="rounded-lg border border-border px-4 py-2 font-semibold no-underline transition-colors hover:bg-muted"
        >
          {t('goHome')}
        </Link>
      </div>
    </div>
  );
}
