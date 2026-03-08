import type { Metadata } from 'next';
import Link from 'next/link';
import { categories, getCategoryBySlug } from '@/data/categories';
import ConnectWithUsCard from '@/app/components/ConnectWithUsCard';
import { getProductsByCategoryId } from '@/data/products';
import ProductCard from '@/app/components/ProductCard';
import { getTranslations } from '@/lib/i18n';
import { locales, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return categories.flatMap((c) => locales.map((locale) => ({ locale, slug: c.slug })));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  const t = getTranslations(locale as Locale, 'categoriesDetail');
  const name = (() => {
    const v = t(`${slug}-name`);
    return v !== `${slug}-name` ? v : category.name;
  })();
  const desc = (() => {
    const v = t(`${slug}-description`);
    return v !== `${slug}-description` ? v : category.description;
  })();
  return { description: desc || `Browse ${name} – car accessories in India.` };
}

export default async function CategoryDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const category = getCategoryBySlug(slug);
  const t = getTranslations(locale as Locale, 'categoryDetail');
  const tNav = getTranslations(locale as Locale, 'nav');
  const tCommon = getTranslations(locale as Locale, 'common');
  const tCategories = getTranslations(locale as Locale, 'categoriesDetail');

  if (!category) {
    return (
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-primary hover:underline">
            {tNav('home')}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/categories`} className="hover:text-primary hover:underline">
            {tNav('categories')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{t('categoryNotFound')}</span>
        </nav>
        <ConnectWithUsCard
          title={t('categoryNotFound')}
          backLink={{ href: '/categories', text: tCommon('browseAllCategories') }}
        />
      </div>
    );
  }

  const categoryProducts = getProductsByCategoryId(category.id);
  const categoryName = (() => {
    const v = tCategories(`${category.slug}-name`);
    return v !== `${category.slug}-name` ? v : category.name;
  })();
  const categoryDesc = (() => {
    const v = tCategories(`${category.slug}-description`);
    return v !== `${category.slug}-description` ? v : category.description;
  })();

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}/categories`} className="hover:text-primary hover:underline">
          {tNav('categories')}
        </Link>
        <span>/</span>
        <span className="text-foreground">{categoryName}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">{categoryName}</h1>
      {categoryDesc && <p className="mb-8 text-muted-foreground">{categoryDesc}</p>}

      {categoryProducts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center dark:border-white/10">
          <p className="mb-2 text-muted-foreground">{t('noProducts')}</p>
          <p className="mb-4 font-medium text-foreground">
            {tCommon('connectWithUs')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${locale}/contact`}
              className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
            >
              {tCommon('contactUs')}
            </Link>
            <Link
              href={`/${locale}/categories`}
              className="inline-block rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/10"
            >
              {tCommon('browseOtherCategories')}
            </Link>
          </div>
        </div>
      ) : (
        <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <li key={product.id}>
              <Link href={`/${locale}/products/${product.slug}`} className="block no-underline">
                <ProductCard product={product} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
