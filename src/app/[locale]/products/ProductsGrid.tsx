'use client';

import { useMemo, useState } from 'react';
import { LocaleLink, getLocalePath } from '@/lib/locale-link';
import { useLocale } from '@/app/components/LocaleProvider';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/categories';
import { getAllProducts, getProductsByCategoryId } from '@/data/products';
import ProductCard from '@/app/components/ProductCard';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'name';

export default function ProductsGrid() {
  const router = useRouter();
  const { locale, t } = useLocale();
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
          {filteredProducts.length} {t('common')('products')}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label htmlFor="category-filter" className="sr-only">
              {t('productsGrid')('filterByCategory')}
            </label>
            <select
              id="category-filter"
              value={categorySlug}
              onChange={(e) => {
                const val = e.target.value;
                const params = new URLSearchParams(searchParams.toString());
                if (val) params.set('category', val);
                else params.delete('category');
                router.push(getLocalePath(locale, `/products?${params.toString()}`));
              }}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
            >
              <option value="">{t('productsGrid')('allCategories')}</option>
              {categories.map((cat) => {
                const catName = (() => {
                  const v = t('categoriesDetail')(`${cat.slug}-name`);
                  return v !== `${cat.slug}-name` ? v : cat.name;
                })();
                return (
                  <option key={cat.id} value={cat.slug}>
                    {catName} ({getProductsByCategoryId(cat.id).length})
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="sort" className="sr-only">
              {t('productsGrid')('sortBy')}
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
            >
              <option value="featured">{t('productsGrid')('featured')}</option>
              <option value="price-asc">{t('productsGrid')('priceAsc')}</option>
              <option value="price-desc">{t('productsGrid')('priceDesc')}</option>
              <option value="name">{t('productsGrid')('alphabetically')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center dark:border-white/10">
          <p className="mb-2 text-muted-foreground">{t('productsGrid')('noProducts')}</p>
          <p className="mb-4 font-medium text-foreground">
            {t('common')('connectWithUs')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <LocaleLink
              href="/contact"
              className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
            >
              {t('common')('contactUs')}
            </LocaleLink>
            <LocaleLink
              href="/categories"
              className="inline-block rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/10"
            >
              {t('productsGrid')('browseCategories')}
            </LocaleLink>
          </div>
        </div>
      ) : (
        <ul className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <LocaleLink href={`/products/${product.slug}`} className="block no-underline">
                <ProductCard product={product} />
              </LocaleLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
