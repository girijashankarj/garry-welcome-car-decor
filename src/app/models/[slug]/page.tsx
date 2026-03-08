import type { Metadata } from 'next';
import Link from 'next/link';
import { models, getModelBySlug } from '@/data/models';
import ConnectWithUsCard from '@/app/components/ConnectWithUsCard';
import { getBrandById } from '@/data/brands';
import { getProductsByModelId, getAllProducts } from '@/data/products';
import { getCategoryById } from '@/data/categories';
import ProductCard from '@/app/components/ProductCard';

const SLUG_ALIASES: Record<string, string> = {
  innova: 'innova-crysta',
  scorpio: 'scorpio-n',
};

export function generateStaticParams() {
  const base = models.map((m) => ({ slug: m.slug }));
  const aliases = [{ slug: 'innova' }, { slug: 'scorpio' }];
  return [...base, ...aliases];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] ?? slug;
  const model = getModelBySlug(resolvedSlug);
  const brand = model ? getBrandById(model.brandId) : null;
  if (!model) return {};
  return {
    description: model.colors
      ? `${model.name} available in ${model.colors.length} colors. Browse compatible car accessories – PPF, chargers, headlights, dash cams.`
      : `Browse accessories for ${brand?.name ?? ''} ${model.name}.`,
  };
}

export default async function ModelDetailPage({ params }: Props) {
  const { slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] ?? slug;
  const model = getModelBySlug(resolvedSlug);

  if (!model) {
    return (
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/brands" className="hover:text-primary hover:underline">
            Brands
          </Link>
          <span>/</span>
          <span className="text-foreground">Model not found</span>
        </nav>
        <ConnectWithUsCard
          title="Model not found"
          backLink={{ href: '/brands', text: 'Browse all brands' }}
        />
      </div>
    );
  }

  const brand = getBrandById(model.brandId);
  const modelProducts = getProductsByModelId(model.id);
  const universalProducts = getAllProducts().filter((p) => !p.modelId).slice(0, 6);

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/brands" className="hover:text-primary hover:underline">
          Brands
        </Link>
        {brand && (
          <>
            <span>/</span>
            <Link href={`/brands/${brand.slug}`} className="hover:text-primary hover:underline">
              {brand.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{model.name}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
        {brand?.name} {model.name}
      </h1>
      <p className="mb-8 text-muted-foreground">
        Accessories compatible with this model. Select a category to browse all products.
      </p>

      {model.colors && model.colors.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-foreground">Available Colors</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Exterior colors offered by {brand?.name ?? 'the manufacturer'} for the {model.name}.
          </p>
          <ul className="flex flex-wrap gap-2">
            {model.colors.map((color) => (
              <li
                key={color}
                className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground dark:border-white/10"
              >
                {color}
              </li>
            ))}
          </ul>
        </section>
      )}

      {modelProducts.length > 0 ? (
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Model-Specific Accessories</h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {modelProducts.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`} className="block no-underline">
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mb-10 rounded-xl border border-border bg-card p-6 dark:border-white/10">
          <p className="mb-2 text-muted-foreground">
            No model-specific accessories listed yet.
          </p>
          <p className="mb-4 font-medium text-foreground">
            Connect with us – we will get it for you at a great deal price.
          </p>
          <div className="flex flex-wrap gap-3">
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
              Browse all categories
            </Link>
          </div>
        </section>
      )}

      {universalProducts.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-semibold text-foreground">Popular Accessories (All Cars)</h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {universalProducts.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`} className="block no-underline">
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href="/categories"
              className="text-sm font-medium text-primary hover:underline"
            >
              View all categories →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
