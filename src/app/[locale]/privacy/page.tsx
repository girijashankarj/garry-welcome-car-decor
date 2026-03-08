import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from '@/lib/i18n';
import type { Locale } from '@/i18n/routing';

export const metadata: Metadata = {
  description: 'Privacy policy for Welcome Car Decor. How we collect, use, and protect your information.',
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as Locale, 'privacyPage');
  const tCommon = getTranslations(locale as Locale, 'common');

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-foreground">{t('title')}</h1>
      <p className="mb-4 text-sm text-muted-foreground">{t('lastUpdated')}</p>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">{t('section1Title')}</h2>
          <p>{t('section1Text')}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">{t('section2Title')}</h2>
          <p>{t('section2Text')}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">{t('section3Title')}</h2>
          <p>{t('section3Text')}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">{t('section4Title')}</h2>
          <p>{t('section4Text')}</p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">{t('section5Title')}</h2>
          <p>
            {t('section5Text')}{' '}
            <a href="mailto:contact@welcomecardecor.com" className="text-primary hover:underline">
              contact@welcomecardecor.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link href={`/${locale}`} className="text-primary hover:underline">
          {tCommon('backToHome')}
        </Link>
      </div>
    </div>
  );
}
