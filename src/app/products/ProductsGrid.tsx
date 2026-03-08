'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import { getAllProducts, getProductsByCategoryId } from '@/data/products';
import ProductCard from '@/app/components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

export default function ProductsGrid() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categorySlug = searchParams.get('category') ?? '';
  const [sort, setSort] = useState<SortOption>('featured');

  const filteredProducts = useMemo(() => {
    const category = categories.find((c) => c.slug === categorySlug);
    let products = category ? getProductsByCategoryId(category.id) : getAllProducts();

    if (sort === 'price-asc') {
      products = [...products].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sort === 'price-desc') {
      products = [...products].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sort === 'name') {
      products = [...products].sort((a, b) => a.name.localeCompare(b.name));
    }

    return products;
  }, [categorySlug, sort]);

  return (
    <div className="space-y-6">
      {/* Filter and sort bar (like Galio) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="category-filter" className="sr-only">
              Filter by category
            </label>
            <select
              id="category-filter"
              value={categorySlug}
              onChange={(e) => {
                const val = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (val) params.set('category', val);
                else params.delete('category');
                router.push(`/products?${params.toString()}`);
              }}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name} ({getProductsByCategoryId(cat.id).length})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="sr-only">
              Sort by
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Alphabetically</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center dark:border-white/10">
          <p className="mb-2 text-muted-foreground">No products match your selection.</p>
          <p className="mb-4 font-medium text-foreground">
            Connect with us – we will get it for you at a great deal price.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/categories"
              className="inline-block rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/10"
            >
              Browse categories
            </Link>
          </div>
        </div>
      ) : (
        <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/products/${product.slug}`} className="block no-underline">
                <ProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
