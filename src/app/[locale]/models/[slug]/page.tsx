import type { Metadata } from 'next';
import Link from 'next/link';
import { models, getModelBySlug } from '@/data/models';
import ConnectWithUsCard from '@/app/components/ConnectWithUsCard';
import { getBrandById } from '@/data/brands';
import { getProductsByModelId, getAllProducts } from '@/data/products';
import { getCategoryById } from '@/data/categories';
import ProductCard from '@/app/components/ProductCard';
import { getTranslations } from '@/lib/i18n';
import { locales, type Locale } from '@/i18n/routing';

const SLUG_ALIASES: Record<string, string> = {
  innova: 'innova-crysta',
  scorpio: 'scorpio-n',
};

export function generateStaticParams() {
  const base = models.flatMap((m) => locales.map((locale) => ({ locale, slug: m.slug })));
  const aliases = locales.flatMap((locale) => [
    { locale, slug: 'innova' },
    { locale, slug: 'scorpio' },
  ]);
  return [...base, ...aliases];
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
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
  const { locale, slug } = await params;
  const resolvedSlug = SLUG_ALIASES[slug] ?? slug;
  const model = getModelBySlug(resolvedSlug);
  const t = getTranslations(locale as Locale, 'modelDetail');
  const tNav = getTranslations(locale as Locale, 'nav');
  const tCommon = getTranslations(locale as Locale, 'common');
  const tBrands = getTranslations(locale as Locale, 'brandsDetail');

  if (!model) {
    return (
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href={`/${locale}`} className="hover:text-primary hover:underline">
            {tNav('home')}
          </Link>
          <span>/</span>
          <Link href={`/${locale}/brands`} className="hover:text-primary hover:underline">
            {tNav('brands')}
          </Link>
          <span>/</span>
          <span className="text-foreground">{t('modelNotFound')}</span>
        </nav>
        <ConnectWithUsCard
          title={t('modelNotFound')}
          backLink={{ href: '/brands', text: tCommon('backToBrands') }}
        />
      </div>
    );
  }

  const brand = getBrandById(model.brandId);
  const modelProducts = getProductsByModelId(model.id);
  const universalProducts = getAllProducts().filter((p) => !p.modelId).slice(0, 6);
  const brandName = brand
    ? (() => {
        const v = tBrands(`${brand.slug}-name`);
        return v !== `${brand.slug}-name` ? v : brand.name;
      })()
    : null;

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}/brands`} className="hover:text-primary hover:underline">
          {tNav('brands')}
        </Link>
        {brand && (
          <>
            <span>/</span>
            <Link href={`/${locale}/brands/${brand.slug}`} className="hover:text-primary hover:underline">
              {brandName}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{model.name}</span>
      </nav>

      <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
        {brandName ?? brand?.name} {model.name}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {t('accessoriesCompatible')}
      </p>

      {model.colors && model.colors.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('availableColors')}</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            {t('colorsOffered').replace('{brand}', brand?.name ?? 'the manufacturer').replace('{model}', model.name)}
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
          <h2 className="mb-4 text-lg font-semibold text-foreground">{t('modelSpecificAccessories')}</h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {modelProducts.map((product) => (
              <li key={product.id}>
                <Link href={`/${locale}/products/${product.slug}`} className="block no-underline">
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mb-10 rounded-xl border border-border bg-card p-6 dark:border-white/10">
          <p className="mb-2 text-muted-foreground">
            {t('noModelSpecific')}
          </p>
          <p className="mb-4 font-medium text-foreground">
            {tCommon('connectWithUs')}
          </p>
          <div className="flex flex-wrap gap-3">
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
              {tCommon('browseAllCategories')}
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
                <Link href={`/${locale}/products/${product.slug}`} className="block no-underline">
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Link
              href={`/${locale}/categories`}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t('viewAllCategories')}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
