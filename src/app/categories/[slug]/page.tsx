import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '@/data/categories';
import { getProductsByCategoryId } from '@/data/products';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategoryId(category.id);

  return (
    <>
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/categories" className="hover:underline">
          Categories
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{category.name}</span>
      </nav>
      <h1 className="mb-4 text-2xl font-bold text-foreground">{category.name}</h1>
      <p className="mb-6 text-muted-foreground">
        All products in this category.
      </p>
      {categoryProducts.length === 0 ? (
        <p className="text-muted-foreground">No products in this category yet.</p>
      ) : (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <li key={product.id}>
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                <h2 className="mb-1 font-semibold text-card-foreground">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
