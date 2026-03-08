import Link from 'next/link';
import { brands } from '@/data/brands';

export default function BrandsPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Browse by Brand</h1>
      <p className="mb-6 text-muted-foreground">
        Select a car brand to see models and compatible accessories.
      </p>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <li key={brand.id}>
            <Link
              href={`/brands/${brand.slug}`}
              className="block rounded-lg border border-border bg-card p-4 text-card-foreground no-underline shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="font-semibold">{brand.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
