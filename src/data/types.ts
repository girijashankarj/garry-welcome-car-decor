export interface Brand {
  id: string;
  name: string;
  slug: string;
  /** Path to brand logo image (e.g. /images/brands/maruti-suzuki.svg) */
  logoPath?: string;
  /** Tailwind class for logo/accent color (e.g. bg-primary/20, bg-secondary/20) */
  accentClass?: string;
}

export interface CarModel {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  /** Exterior colors offered by the manufacturer */
  colors?: string[];
}

export type ProductCategoryId =
  | 'filming'
  | 'chargers'
  | 'headlights'
  | 'speakers'
  | 'accessories'
  | 'dashcam';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: ProductCategoryId;
  /** Price in INR */
  price?: number;
  /** Manufacturer/vendor brand name */
  vendor?: string;
  brandId?: string;
  modelId?: string;
  imagePath?: string;
}

export interface Category {
  id: ProductCategoryId;
  name: string;
  slug: string;
  description?: string;
}
