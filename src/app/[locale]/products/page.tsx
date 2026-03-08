import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { getAllProducts } from '@/data/products';
import ProductsGrid from './ProductsGrid';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  description: 'Browse all car accessories – PPF, chargers, headlights, speakers, dash cams, and more. Filter by category, sort by price.',
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const totalProducts = getAllProducts().length;
  const t = getTranslations(locale as Locale, 'productsPage');
  const tNav = getTranslations(locale as Locale, 'nav');

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:text-primary hover:underline">
          {tNav('home')}
        </Link>
        <span>/</span>
        <span className="text-foreground">{tNav('products')}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{t('title')}</h1>
      <p className="mb-8 text-muted-foreground">
        {t('intro').replace('{count}', String(totalProducts))}
      </p>

      <Suspense fallback={<p className="text-muted-foreground">{t('loading')}</p>}>
        <ProductsGrid />
      </Suspense>
    </div>
  );
}
