import { SITE } from '@/lib/site';
import { assetPath } from '@/lib/assetPath';
import type { Product } from '@/data/types';

interface ProductJsonLdProps {
  product: Product;
}

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const baseUrl = SITE.url.replace(/\/$/, '');
  const path = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const productUrl = `${baseUrl}${path}/products/${product.slug}`;
  const imageUrl = product.imagePath ? `${baseUrl}${assetPath(product.imagePath)}` : undefined;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    url: productUrl,
    ...(imageUrl && { image: imageUrl }),
    ...(product.price != null && {
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
