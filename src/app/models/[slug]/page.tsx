import Link from 'next/link';
import { notFound } from 'next/navigation';
import { models, getModelBySlug } from '@/data/models';
import { getBrandById } from '@/data/brands';
import { getProductsByModelId } from '@/data/products';
import { getCategoryById } from '@/data/categories';

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) notFound();

  const brand = getBrandById(model.brandId);
  const modelProducts = getProductsByModelId(model.id);

  return (
    <>
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/brands" className="hover:underline">
          Brands
        </Link>
        {brand && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/brands/${brand.slug}`} className="hover:underline">
              {brand.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-foreground">{model.name}</span>
      </nav>
      <h1 className="mb-4 text-2xl font-bold text-foreground">
        {brand?.name} {model.name}
      </h1>
      <p className="mb-6 text-muted-foreground">
        Accessories compatible with this model.
      </p>
      {modelProducts.length === 0 ? (
        <p className="text-muted-foreground">No products linked to this model yet.</p>
      ) : (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {modelProducts.map((product) => {
            const category = getCategoryById(product.categoryId);
            return (
              <li key={product.id}>
                <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                  <h2 className="mb-1 font-semibold text-card-foreground">{product.name}</h2>
                  {category && (
                    <p className="mb-2 text-xs text-muted-foreground">{category.name}</p>
                  )}
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
