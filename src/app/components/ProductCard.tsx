import Image from 'next/image';
import type { Product } from '@/data/types';
import { getCategoryById } from '@/data/categories';
import { formatPrice } from '@/lib/format';
import { assetPath } from '@/lib/assetPath';

const PLACEHOLDER_IMG = '/images/products/placeholder.svg';

interface ProductCardProps {
  product: Product;
  /** When true, shows "View details" affordance */
  showViewDetails?: boolean;
}

export default function ProductCard({ product, showViewDetails = true }: ProductCardProps) {
  const category = getCategoryById(product.categoryId);
  const imgSrc = assetPath(product.imagePath || PLACEHOLDER_IMG);

  return (
    <article className="group overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
        <Image
          src={imgSrc}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="p-4">
        {product.vendor && (
          <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-primary">
            {product.vendor}
          </span>
        )}
        <h2 className="mb-1 line-clamp-2 text-base font-semibold text-foreground">{product.name}</h2>
        {category && (
          <p className="mb-2 text-xs text-muted-foreground">{category.name}</p>
        )}
        <div className="flex items-center justify-between gap-2">
          {product.price != null && (
            <p className="text-base font-bold text-foreground">{formatPrice(product.price)}</p>
          )}
          {showViewDetails && (
            <span className="text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
              View →
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
