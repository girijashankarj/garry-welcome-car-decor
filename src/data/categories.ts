import type { Category } from './types';

export const categories: Category[] = [
  { id: 'filming', name: 'Car Filming', slug: 'filming' },
  { id: 'chargers', name: 'Chargers', slug: 'chargers' },
  { id: 'headlights', name: 'Headlights', slug: 'headlights' },
  { id: 'speakers', name: 'Speakers', slug: 'speakers' },
  { id: 'accessories', name: 'Accessories', slug: 'accessories' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
