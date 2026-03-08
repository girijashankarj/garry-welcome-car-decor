import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/data/guides';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/i18n/routing';

function buildFaqSchema(locale: Locale) {
  const t = getTranslations(locale, 'guidesPage');
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: t('faqOrderQ'), acceptedAnswer: { '@type': 'Answer', text: t('faqOrderA') } },
      { '@type': 'Question', name: t('faqDeliveryQ'), acceptedAnswer: { '@type': 'Answer', text: t('faqDeliveryA') } },
      { '@type': 'Question', name: t('faqPaymentQ'), acceptedAnswer: { '@type': 'Answer', text: t('faqPaymentA') } },
      { '@type': 'Question', name: t('faqReturnsQ'), acceptedAnswer: { '@type': 'Answer', text: t('faqReturnsA') } },
      { '@type': 'Question', name: t('faqCollaborationQ'), acceptedAnswer: { '@type': 'Answer', text: t('faqCollaborationA') } },
      { '@type': 'Question', name: t('faqCarServicesQ'), acceptedAnswer: { '@type': 'Answer', text: t('faqCarServicesA') } },
    ],
  };
}

interface GuidesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: GuidesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as Locale, 'guidesPage');
  return { description: t('metaDescription') };
}

export default async function GuidesPage({
  params,
}: GuidesPageProps) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale, 'guidesPage');
  const tCommon = getTranslations(locale as Locale, 'common');
  const tDetail = getTranslations(locale as Locale, 'guidesDetail');
  const faqSchema = buildFaqSchema(locale as Locale);

  return (
    <div className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="mb-2 text-2xl font-bold text-foreground">{t('title')}</h1>
      <p className="mb-8 text-muted-foreground">
        {t('intro')}
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('howToOrder')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('howToOrder1')}</p>
            <p>{t('howToOrder2')}</p>
            <p>{t('howToOrder3')}</p>
            <p>{t('howToOrder4')}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('delivery')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('delivery1')}</p>
            <p>{t('delivery2')}</p>
            <p>{t('delivery3')}</p>
            <p>{t('delivery4')}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('payment')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('payment1')}</p>
            <p>{t('payment2')}</p>
            <p>{t('payment3')}</p>
            <p>{t('payment4')}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('returns')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('returns1')}</p>
            <p>{t('returns2')}</p>
            <p>{t('returns3')}</p>
            <p>{t('returns4')}</p>
            <p>{t('returns5')}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('collaboration')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('collaborationText')}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('carServices')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('carServicesText')}</p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">{t('warranty')}</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>{t('warranty1')}</p>
            <p>{t('warranty2')}</p>
            <p>{t('warranty3')}</p>
          </div>
        </section>
      </div>

      <section className="mt-12 border-t border-border pt-10">
        <h2 className="mb-4 text-lg font-semibold text-foreground">{tCommon('moreGuides')}</h2>
        <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
          {getAllGuides().map((g) => {
            const title = tDetail(`${g.slug}-title`);
            const description = tDetail(`${g.slug}-description`);
            const displayTitle = title !== `${g.slug}-title` ? title : g.title;
            const displayDescription = description !== `${g.slug}-description` ? description : g.description;
            return (
              <li key={g.slug}>
                <Link
                  href={`/${locale}/guides/${g.slug}`}
                  className="block rounded-lg border border-border bg-card p-4 no-underline transition-colors hover:border-primary/30 hover:bg-muted/50 dark:border-white/10"
                >
                  <span className="font-medium text-foreground">{displayTitle}</span>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{displayDescription}</p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          {tCommon('getInTouch')}
        </Link>
        <Link href={`/${locale}`} className="text-primary hover:underline">
          {tCommon('backToHome')}
        </Link>
      </div>
    </div>
  );
}
