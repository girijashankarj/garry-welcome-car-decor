import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from './components/ThemeContext';
import AppLayout from './components/AppLayout';
import { SITE } from '@/lib/site';
import Analytics from './components/Analytics';
import JsonLd from './components/JsonLd';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: ['car accessories', 'PPF', 'car filming', 'car charger', 'LED headlights', 'dash cam', 'car speakers', 'India'],
  authors: [{ name: SITE.name }],
  icons: {
    icon: '/images/branding/icon-512.png',
    apple: '/images/branding/icon-512.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.name,
    description: SITE.description,
    images: [{ url: '/images/branding/og-image.png', width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.description,
    images: ['/images/branding/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('theme');
                if (stored === 'dark') document.documentElement.classList.add('dark');
                else document.documentElement.classList.remove('dark');
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-rajdhani antialiased">
        <JsonLd />
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
