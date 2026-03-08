import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getProductsByCategoryId } from '@/data/products';
import ProductCard from '@/app/components/ProductCard';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description || `Browse ${category.name} – car accessories in India.`,
  };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategoryId(category.id);

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/categories" className="hover:text-primary hover:underline">
          Categories
        </Link>
        <span>/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">{category.name}</h1>
      {category.description && (
        <p className="mb-8 text-muted-foreground">{category.description}</p>
      )}

      {categoryProducts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center dark:border-white/10">
          <p className="mb-4 text-muted-foreground">No products in this category yet.</p>
          <Link
            href="/categories"
            className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
          >
            Browse Other Categories
          </Link>
        </div>
      ) : (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
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
