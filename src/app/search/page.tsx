'use client';

import { useCallback, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/data/products';
import { getCategoryById } from '@/data/categories';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);

  const results = useMemo(() => searchProducts(query), [query]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Search</h1>
      <p className="mb-6 text-muted-foreground">
        Search products by name or description.
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
          className="w-full max-w-md rounded-md border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          aria-describedby="search-results-count"
        />
      </div>
      {query.trim() === '' ? (
        <p id="search-results-count" className="text-muted-foreground">
          Enter a search term to see results.
        </p>
      ) : (
        <>
          <p id="search-results-count" className="mb-4 text-muted-foreground">
            {results.length} result{results.length !== 1 ? 's' : ''} for &quot;{query}&quot;
          </p>
          {results.length === 0 ? (
            <p className="text-muted-foreground">No products match your search.</p>
          ) : (
            <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((product) => {
                const category = getCategoryById(product.categoryId);
                return (
                  <li key={product.id}>
                    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                      <h2 className="mb-1 font-semibold text-card-foreground">
                        {product.name}
                      </h2>
                      {category && (
                        <p className="mb-2 text-xs text-muted-foreground">
                          {category.name}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-muted-foreground">Loading search...</p>}>
      <SearchContent />
    </Suspense>
  );
}
