import type { Brand } from './types';

export const brands: Brand[] = [
  { id: 'br1', name: 'Maruti Suzuki', slug: 'maruti-suzuki', logoPath: '/images/brands/maruti-suzuki.svg', accentClass: 'bg-primary/15' },
  { id: 'br2', name: 'Hyundai', slug: 'hyundai', logoPath: '/images/brands/hyundai.svg', accentClass: 'bg-secondary/15' },
  { id: 'br3', name: 'Honda', slug: 'honda', logoPath: '/images/brands/honda.svg', accentClass: 'bg-accent/15' },
  { id: 'br4', name: 'Toyota', slug: 'toyota', logoPath: '/images/brands/toyota.svg', accentClass: 'bg-tertiary/15' },
  { id: 'br5', name: 'Tata', slug: 'tata', logoPath: '/images/brands/tata.svg', accentClass: 'bg-primary/15' },
  { id: 'br6', name: 'Mahindra', slug: 'mahindra', logoPath: '/images/brands/mahindra.svg', accentClass: 'bg-secondary/15' },
  { id: 'br7', name: 'Kia', slug: 'kia', logoPath: '/images/brands/kia.svg', accentClass: 'bg-accent/15' },
  { id: 'br8', name: 'MG', slug: 'mg', logoPath: '/images/brands/mg.svg', accentClass: 'bg-tertiary/15' },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getBrandById(id: string): Brand | undefined {
  return brands.find((b) => b.id === id);
}
