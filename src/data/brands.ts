import type { Brand } from './types';

export const brands: Brand[] = [
  { id: 'br1', name: 'Maruti Suzuki', slug: 'maruti-suzuki' },
  { id: 'br2', name: 'Hyundai', slug: 'hyundai' },
  { id: 'br3', name: 'Honda', slug: 'honda' },
  { id: 'br4', name: 'Toyota', slug: 'toyota' },
  { id: 'br5', name: 'Tata', slug: 'tata' },
  { id: 'br6', name: 'Mahindra', slug: 'mahindra' },
  { id: 'br7', name: 'Kia', slug: 'kia' },
  { id: 'br8', name: 'MG', slug: 'mg' },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}
