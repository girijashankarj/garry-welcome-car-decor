'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/data/products';
import { categories } from '@/data/categories';
import ProductCard from '@/app/components/ProductCard';

const DEBOUNCE_MS = 300;

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQ);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  const results = useMemo(() => searchProducts(debouncedQuery), [debouncedQuery]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Search</h1>
      <p className="mb-6 text-muted-foreground">
        Search products by name, description, or brand (e.g. Aegis, 70mai, Toreto).
      </p>
      <div className="mb-6">
        <label htmlFor="search-input" className="sr-only">
          Search products
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Type to search..."
          className="w-full max-w-md rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
          aria-describedby="search-results-count"
        />
      </div>
      {debouncedQuery.trim() === '' ? (
        <p id="search-results-count" className="text-muted-foreground">
          Enter a search term to see results.
        </p>
      ) : (
        <>
          <p id="search-results-count" className="mb-4 text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{debouncedQuery}&quot;
          </p>
          {results.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-8 dark:border-white/10">
              <p className="mb-4 text-muted-foreground">No products match your search.</p>
              <p className="mb-4 text-sm text-muted-foreground">Try browsing by category:</p>
              <ul className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary no-underline transition-colors hover:bg-primary/10"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/categories"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                View all categories →
              </Link>
            </div>
          ) : (
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => (
                <li key={product.id}>
                  <Link href={`/products/${product.slug}`} className="block no-underline">
                    <ProductCard product={product} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading search...</p>}>
      <SearchContent />
    </Suspense>
  );
}
