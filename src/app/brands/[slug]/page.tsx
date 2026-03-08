import Link from 'next/link';
import { notFound } from 'next/navigation';
import { brands, getBrandBySlug } from '@/data/brands';
import { getModelsByBrandId } from '@/data/models';

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const brandModels = getModelsByBrandId(brand.id);

  return (
    <>
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link href="/brands" className="hover:underline">
          Brands
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{brand.name}</span>
      </nav>
      <h1 className="mb-4 text-2xl font-bold text-foreground">{brand.name}</h1>
      <p className="mb-6 text-muted-foreground">
        Select a model to see compatible accessories.
      </p>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {brandModels.map((model) => (
          <li key={model.id}>
            <Link
              href={`/models/${model.slug}`}
              className="block rounded-lg border border-border bg-card p-4 text-card-foreground no-underline shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="font-semibold">{model.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
