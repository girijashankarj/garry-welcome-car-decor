'use client';

import ContactSection from '@/app/components/ContactSection';
import { useLocale } from '@/app/components/LocaleProvider';

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">{t('contactPage')('title')}</h1>
      <p className="mb-8 text-muted-foreground">
        {t('contactPage')('intro')}
      </p>

      <ContactSection />

      <div className="mt-8 space-y-2 text-sm text-muted-foreground">
        <p>{t('contactPage')('productsNote')}</p>
        <p>{t('contactPage')('deliveryNote')}</p>
      </div>
    </div>
  );
}
