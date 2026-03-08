'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold text-foreground">Something went wrong</h1>
      <p className="mb-6 text-center text-muted-foreground">
        An unexpected error occurred. Please try again.
      </p>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-border px-4 py-2 font-semibold no-underline transition-colors hover:bg-muted"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
