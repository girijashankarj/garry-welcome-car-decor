import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { brands, getBrandBySlug } from '@/data/brands';
import { assetPath } from '@/lib/assetPath';
import { getModelsByBrandId } from '@/data/models';
import ConnectWithUsCard from '@/app/components/ConnectWithUsCard';
import { getTranslations } from '@/lib/i18n';
import { locales, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return brands.flatMap((b) => locales.map((locale) => ({ locale, slug: b.slug })));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  const t = getTranslations(locale as Locale, 'brandsDetail');
  const name = (() => {
    const v = t(`${slug}-name`);
    return v !== `${slug}-name` ? v : brand.name;
  })();
  return {
    description: `Browse ${name} car models, available colors, and compatible accessories. PPF, chargers, headlights, dash cams and more.`,
  };
}

export default async function BrandDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const brand = getBrandBySlug(slug);
  const t = getTranslations(locale as Locale, 'brandDetail');
  const tNav = getTranslations(locale as Locale, 'nav');
  const tCommon = getTranslations(locale as Locale, 'common');
  const tBrands = getTranslations(locale as Locale, 'brandsDetail');

  if (!brand) {
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
          <span className="text-foreground">{t('brandNotFound')}</span>
        </nav>
        <ConnectWithUsCard
          title={t('brandNotFound')}
          backLink={{ href: '/brands', text: tCommon('backToBrands') }}
        />
      </div>
    );
  }

  const brandModels = getModelsByBrandId(brand.id);
  const brandName = (() => {
    const v = tBrands(`${brand.slug}-name`);
    return v !== `${brand.slug}-name` ? v : brand.name;
  })();

  return (
    <div className="mx-auto max-w-6xl">
      <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}/brands`} className="hover:text-primary hover:underline">
          {tNav('brands')}
        </Link>
        <span>/</span>
        <span className="text-foreground">{brandName}</span>
      </nav>

      <div className="mb-6 flex items-center gap-4">
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
        <h1 className="mb-0 text-2xl font-bold text-foreground md:text-3xl">{brandName}</h1>
      </div>
      <p className="mb-8 text-muted-foreground">
        {t('selectModel')}
      </p>

      {brandModels.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center dark:border-white/10">
          <p className="mb-2 text-muted-foreground">{t('noModels')}</p>
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
              href={`/${locale}/brands`}
              className="inline-block rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary no-underline transition-colors hover:bg-primary/10"
            >
              {tCommon('browseOtherBrands')}
            </Link>
          </div>
        </div>
      ) : (
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {brandModels.map((model) => (
          <li key={model.id}>
            <Link
              href={`/${locale}/models/${model.slug}`}
              className="block rounded-xl border border-border bg-card p-5 no-underline shadow-sm transition-all hover:border-primary/30 hover:shadow-md dark:border-white/10"
            >
              <span className="font-semibold text-card-foreground">{model.name}</span>
              {model.colors && model.colors.length > 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {model.colors.length} {t('colorsAvailable')}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
}
