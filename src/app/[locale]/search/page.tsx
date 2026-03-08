'use client';

import { LocaleLink } from '@/lib/locale-link';
import { useLocale } from '@/app/components/LocaleProvider';
import { useCallback, useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/app/components/ProductCard';

const DEBOUNCE_MS = 300;

function SearchContent() {
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const initialQ = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQ);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => searchProducts(debouncedQuery), [debouncedQuery]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">{t('searchPage')('title')}</h1>
      <p className="mb-6 text-muted-foreground">
        {t('searchPage')('intro')}
      </p>
      <div className="mb-6">
        <label htmlFor="search-input" className="sr-only">
          {t('searchPage')('title')}
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder={t('searchPage')('placeholder')}
          className="w-full max-w-md rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
          aria-describedby="search-results-count"
        />
      </div>
      {debouncedQuery.trim() === '' ? (
        <p id="search-results-count" className="text-muted-foreground">
          {t('searchPage')('enterSearch')}
        </p>
      ) : (
        <>
          <p id="search-results-count" className="mb-4 text-muted-foreground">
            {t('searchPage')('resultsFor').replace('{count}', String(results.length)).replace('{query}', debouncedQuery)}
          </p>
          {results.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 dark:border-white/10">
              <p className="mb-2 text-muted-foreground">{t('searchPage')('noResults')}</p>
              <p className="mb-4 font-medium text-foreground">
                {t('common')('connectWithUs')}
              </p>
              <p className="mb-4 text-sm text-muted-foreground">{t('searchPage')('tryBrowsing')}</p>
              <ul className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <LocaleLink
                      href={`/categories/${cat.slug}`}
                      className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary no-underline transition-colors hover:bg-primary/10"
                    >
                      {cat.name}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-3">
                <LocaleLink
                  href="/contact"
                  className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
                >
                  {t('common')('contactUs')}
                </LocaleLink>
                <LocaleLink
                  href="/categories"
                  className="inline-block text-sm font-medium text-primary hover:underline"
                >
                  {t('searchPage')('viewAllCategories')}
                </LocaleLink>
              </div>
            </div>
          ) : (
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <li key={product.id}>
                  <LocaleLink href={`/products/${product.slug}`} className="block no-underline">
                    <ProductCard product={product} />
                  </LocaleLink>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

function SearchPageFallback() {
  const { t } = useLocale();
  return <p className="text-muted-foreground">{t('searchPage')('loading')}</p>;
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageFallback />}>
      <SearchContent />
    </Suspense>
  );
}
