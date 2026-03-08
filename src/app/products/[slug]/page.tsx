import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { products, getProductBySlug } from '@/data/products';
import { getCategoryById } from '@/data/categories';
import { formatPrice } from '@/lib/format';
import { assetPath } from '@/lib/assetPath';
import siteData from '@/data/site.json';
import ConnectWithUsCard from '@/app/components/ConnectWithUsCard';
import ProductJsonLd from '@/app/components/ProductJsonLd';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imagePath ? [{ url: assetPath(product.imagePath) }] : undefined,
    },
  };
}

function getWhatsAppUrl(phone: string, productName: string): string {
  const num = phone.replace(/\D/g, '');
  const text = encodeURIComponent(`Hi, I'm interested in ${productName}.`);
  return `https://wa.me/${num}?text=${text}`;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary hover:underline">
            Products
          </Link>
          <span>/</span>
          <span className="text-foreground">Product not found</span>
        </nav>
        <ConnectWithUsCard
          title="Product not available"
          backLink={{ href: '/products', text: 'Browse all products' }}
          whatsappMessage="Hi, I'm looking for a product that wasn't on your site. Can you help me get it at a great deal?"
        />
      </div>
    );
  }

  const category = getCategoryById(product.categoryId);
  const imgSrc = assetPath(product.imagePath || '/images/products/placeholder.svg');
  const contact = siteData.contact as { whatsapp?: string; phone?: string } | undefined;
  const whatsappNumber = contact?.whatsapp?.trim();
  const phoneNumber = contact?.phone?.trim();

  return (
    <>
      <ProductJsonLd product={product} />
      <div className="mx-auto max-w-4xl">
      <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-primary hover:underline">
          Categories
        </Link>
        {category && (
          <>
            <span>/</span>
            <Link
              href={`/categories/${category.slug}`}
              className="hover:text-primary hover:underline"
            >
              {category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg dark:border-white/10">
        <div className="grid gap-8 p-6 sm:grid-cols-2 sm:p-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
              priority
            />
          </div>
          <div>
            {product.vendor && (
              <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wide text-primary">
                {product.vendor}
              </span>
            )}
            <h1 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              {product.name}
            </h1>
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="mb-4 inline-block text-sm text-primary hover:underline"
              >
                {category.name}
              </Link>
            )}
            <p className="mb-6 text-muted-foreground">{product.description}</p>
            {product.price != null && (
              <p className="mb-6 text-2xl font-bold text-primary">
                {formatPrice(product.price)}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              {whatsappNumber ? (
                <a
                  href={getWhatsAppUrl(whatsappNumber, product.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white no-underline transition-opacity hover:opacity-90"
                  aria-label="Enquire on WhatsApp"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              ) : null}
              {phoneNumber ? (
                <a
                  href={`tel:${phoneNumber.startsWith('+') ? phoneNumber : `+91${phoneNumber.replace(/\D/g, '')}`}`}
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary no-underline transition-colors hover:bg-primary/10"
                  aria-label="Call us"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call
                </a>
              ) : null}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
              >
                Inquire Now
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href={category ? `/categories/${category.slug}` : '/categories'}
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to {category?.name ?? 'Categories'}
        </Link>
      </div>
    </div>
    </>
  );
}
