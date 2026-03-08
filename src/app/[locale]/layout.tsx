import { notFound } from 'next/navigation';
import { locales, defaultLocale, type Locale } from '@/i18n/routing';
import { LocaleProvider } from '@/app/components/LocaleProvider';
import AppLayout from '@/app/components/AppLayout';
import Chatbot from '@/app/components/Chatbot';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <LocaleProvider locale={locale as Locale}>
      <AppLayout>{children}</AppLayout>
      <Chatbot />
    </LocaleProvider>
  );
}
