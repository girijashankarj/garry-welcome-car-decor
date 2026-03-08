import Image from 'next/image';
import type { Product } from '@/data/types';
import { getCategoryById } from '@/data/categories';
import { formatPrice } from '@/lib/format';

const PLACEHOLDER_IMG = '/images/products/placeholder.svg';

interface ProductCardProps {
  product: Product;
  /** When true, shows "View details" affordance */
  showViewDetails?: boolean;
}

export default function ProductCard({ product, showViewDetails = true }: ProductCardProps) {
  const category = getCategoryById(product.categoryId);
  const imgSrc = product.imagePath || PLACEHOLDER_IMG;

  return (
    <article
      className="group rounded-xl border border-border bg-card overflow-hidden shadow-md transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:shadow-black/20"
      style={{
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        {product.vendor && (
          <span className="mb-2 inline-block text-xs font-medium uppercase tracking-wide text-primary">
            {product.vendor}
          </span>
        )}
        <h2 className="mb-2 text-lg font-semibold text-card-foreground">{product.name}</h2>
        {category && (
          <p className="mb-2 text-xs text-muted-foreground">{category.name}</p>
        )}
        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between gap-2">
          {product.price != null && (
            <p className="text-base font-semibold text-primary">{formatPrice(product.price)}</p>
          )}
          {showViewDetails && (
            <span className="text-sm font-medium text-primary">
              View details →
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
