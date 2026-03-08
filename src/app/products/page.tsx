import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllProducts } from '@/data/products';
import ProductsGrid from './ProductsGrid';

export const metadata: Metadata = {
  description: 'Browse all car accessories – PPF, chargers, headlights, speakers, dash cams, and more. Filter by category, sort by price.',
};

export default function ProductsPage() {
  const totalProducts = getAllProducts().length;

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">Products</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">Car Accessories</h1>
      <p className="mb-8 text-muted-foreground">
        {totalProducts} products. Filter by category, sort by price.
      </p>

      <Suspense fallback={<p className="text-muted-foreground">Loading products...</p>}>
        <ProductsGrid />
      </Suspense>
    </div>
  );
}
