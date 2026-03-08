import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { guides, getGuideBySlug, getAllGuides } from '@/data/guides';

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
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
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-primary hover:underline">
          Guides
        </Link>
        <span>/</span>
        <span className="text-foreground">{guide.title}</span>
      </nav>

      <article>
        <h1 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">{guide.title}</h1>
        <p className="mb-8 text-muted-foreground">{guide.description}</p>
        <div className="max-w-none">
          {renderGuideContent(guide.content)}
        </div>
      </article>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
        <Link href="/guides" className="text-primary hover:underline">
          ← All guides
        </Link>
      </div>
    </div>
  );
}
