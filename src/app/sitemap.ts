import { SITE } from '@/lib/site';
import { brands } from '@/data/brands';
import { categories } from '@/data/categories';
import { models } from '@/data/models';
import { products } from '@/data/products';

export const dynamic = 'force-static';

export default function sitemap() {
  const base = SITE.url;

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/brands`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/search`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const brandPages = brands.map((b) => ({
    url: `${base}/brands/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const modelPages = models.map((m) => ({
    url: `${base}/models/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const productPages = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...brandPages, ...categoryPages, ...modelPages, ...productPages];
}
