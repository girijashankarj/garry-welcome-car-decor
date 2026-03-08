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
}

export type ProductCategoryId =
  | 'filming'
  | 'chargers'
  | 'headlights'
  | 'speakers'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  categoryId: ProductCategoryId;
  brandId?: string;
  modelId?: string;
  imagePath?: string;
}

export interface Category {
  id: ProductCategoryId;
  name: string;
  slug: string;
}
