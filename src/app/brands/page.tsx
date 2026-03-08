import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { brands } from '@/data/brands';
import { assetPath } from '@/lib/assetPath';
import { getModelsByBrandId } from '@/data/models';

export const metadata: Metadata = {
  description: 'Browse car brands – Maruti Suzuki, Hyundai, Honda, Toyota, Tata, Mahindra, Kia, MG. See models, colors, and compatible accessories.',
};

export default function BrandsPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Browse by Brand</h1>
      <p className="mb-8 text-muted-foreground">
        Select a car brand to see models, available colors, and compatible accessories.
      </p>
      <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => {
          const modelCount = getModelsByBrandId(brand.id).length;
          return (
            <li key={brand.id}>
              <Link
                href={`/brands/${brand.slug}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-6 no-underline shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:shadow-black/10"
              >
                {brand.logoPath && (
                  <div className="relative flex h-20 w-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-3 dark:bg-white/10">
                    <Image
                      src={assetPath(brand.logoPath)}
                      alt=""
                      width={128}
                      height={80}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                <div>
                  <h2 className="mb-2 text-xl font-semibold text-card-foreground">{brand.name}</h2>
                  <span className="text-sm text-muted-foreground">
                    {modelCount} model{modelCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
