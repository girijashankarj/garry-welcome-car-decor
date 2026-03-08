export interface Brand {
  id: string;
  name: string;
  slug: string;
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
