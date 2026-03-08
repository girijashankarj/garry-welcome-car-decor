import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { getProductsByCategoryId } from '@/data/products';
import { categoryIcons } from '@/lib/category-icons';
import type { ProductCategoryId } from '@/data/types';

export const metadata: Metadata = {
  description: 'Browse car accessories by category – PPF & filming, chargers, headlights, speakers, dash cams, and more.',
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Categories</h1>
      <p className="mb-8 text-muted-foreground">
        Browse accessories by category – PPF & filming, chargers, headlights, speakers, dash cams and more.
      </p>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const productCount = getProductsByCategoryId(cat.id).length;
          const icon = categoryIcons[cat.id as ProductCategoryId];
          return (
            <li key={cat.id}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group block rounded-xl border border-border bg-card p-6 no-underline shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:shadow-black/10"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  {icon}
                </div>
                <h2 className="mb-2 text-xl font-semibold text-card-foreground">{cat.name}</h2>
                {cat.description && (
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
                )}
                <span className="text-xs font-medium text-primary">
                  {productCount} product{productCount !== 1 ? 's' : ''}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
