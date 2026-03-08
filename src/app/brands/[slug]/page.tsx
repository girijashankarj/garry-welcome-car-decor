import type { Metadata } from 'next';
import Image from 'next/image';
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return {
    description: `Browse ${brand.name} car models, available colors, and compatible accessories. PPF, chargers, headlights, dash cams and more.`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const brandModels = getModelsByBrandId(brand.id);

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/brands" className="hover:text-primary hover:underline">
          Brands
        </Link>
        <span>/</span>
        <span className="text-foreground">{brand.name}</span>
      </nav>

      <div className="mb-6 flex items-center gap-4">
        {brand.logoPath && (
          <div className="relative flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-3 dark:bg-white/10">
            <Image
              src={brand.logoPath}
              alt=""
              width={128}
              height={80}
              className="object-contain"
              unoptimized
            />
          </div>
        )}
        <h1 className="mb-0 text-2xl font-bold text-foreground md:text-3xl">{brand.name}</h1>
      </div>
      <p className="mb-8 text-muted-foreground">
        Select a model to see available colors and compatible accessories.
      </p>

      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {brandModels.map((model) => (
          <li key={model.id}>
            <Link
              href={`/models/${model.slug}`}
              className="block rounded-xl border border-border bg-card p-5 no-underline shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:border-white/10"
            >
              <span className="font-semibold text-card-foreground">{model.name}</span>
              {model.colors && model.colors.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {model.colors.length} colors available
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
