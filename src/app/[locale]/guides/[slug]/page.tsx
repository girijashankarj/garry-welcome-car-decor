import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug, getAllGuides } from '@/data/guides';
import { getTranslations } from '@/lib/i18n';
import { locales, type Locale } from '@/i18n/routing';

export function generateStaticParams() {
  return guides.flatMap((g) => locales.map((locale) => ({ locale, slug: g.slug })));
}

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const t = getTranslations(locale as Locale, 'guidesDetail');
  const title = t(`${slug}-title`);
  const description = t(`${slug}-description`);
  return {
    title: title !== `${slug}-title` ? title : guide.title,
    description: description !== `${slug}-description` ? description : guide.description,
  };
}

function parseInlineBold(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.match(/\*\*(.+?)\*\*/) ? (
      <strong key={i} className="text-foreground">
        {part.replace(/\*\*/g, '')}
      </strong>
    ) : (
      part
    )
  );
}

function renderGuideContent(content: string) {
  const blocks = content.split('\n\n');
  let key = 0;
  const out: ReactNode[] = [];
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    const lines = trimmed.split('\n');
    const firstLine = lines[0]?.trim() ?? '';
    const rest = lines.slice(1).join('\n').trim();

    if (firstLine.startsWith('**') && firstLine.endsWith('**')) {
      out.push(
        <h2 key={key++} className="mb-2 mt-6 text-lg font-semibold text-foreground first:mt-0">
          {firstLine.replace(/\*\*/g, '')}
        </h2>
      );
      if (rest && rest.startsWith('- ')) {
        const items = rest.split('\n').filter((l) => l.trim().startsWith('- '));
        out.push(
          <ul key={key++} className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground">
            {items.map((item, j) => (
              <li key={j}>{parseInlineBold(item.replace(/^- /, ''))}</li>
            ))}
          </ul>
        );
        continue;
      }
      if (rest) {
        out.push(
          <p key={key++} className="mb-4 text-muted-foreground">
            {parseInlineBold(rest)}
          </p>
        );
      }
      continue;
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter((l) => l.trim().startsWith('- '));
      out.push(
        <ul key={key++} className="mb-4 list-disc space-y-1 pl-6 text-muted-foreground">
          {items.map((item, j) => (
            <li key={j}>{parseInlineBold(item.replace(/^- /, ''))}</li>
          ))}
        </ul>
      );
      continue;
    }
    out.push(
      <p key={key++} className="mb-4 text-muted-foreground">
        {parseInlineBold(trimmed)}
      </p>
    );
  }
  return out;
}

export default async function GuideDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const tNav = getTranslations(locale as Locale, 'nav');
  const tCommon = getTranslations(locale as Locale, 'common');
  const tDetail = getTranslations(locale as Locale, 'guidesDetail');

  const title = tDetail(`${slug}-title`);
  const description = tDetail(`${slug}-description`);
  const content = tDetail(`${slug}-content`);
  const displayTitle = title !== `${slug}-title` ? title : guide.title;
  const displayDescription = description !== `${slug}-description` ? description : guide.description;
  const displayContent = content !== `${slug}-content` ? content : guide.content;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: displayTitle,
    description: displayDescription,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:text-primary hover:underline">
          {tNav('home')}
        </Link>
        <span>/</span>
        <Link href={`/${locale}/guides`} className="hover:text-primary hover:underline">
          {tNav('howToOrder')}
        </Link>
        <span>/</span>
        <span className="text-foreground">{displayTitle}</span>
      </nav>

      <article>
        <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{displayTitle}</h1>
        <p className="mb-8 text-muted-foreground">{displayDescription}</p>
        <div className="max-w-none">
          {renderGuideContent(displayContent)}
        </div>
      </article>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/${locale}/contact`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          {tCommon('getInTouch')}
        </Link>
        <Link href={`/${locale}/guides`} className="text-primary hover:underline">
          ← {tCommon('allGuides')}
        </Link>
      </div>
    </div>
  );
}
