import type { Category } from './types';

export const categories: Category[] = [
  {
    id: 'filming',
    name: 'PPF & Car Filming',
    slug: 'filming',
    description: 'Paint protection film, vinyl wraps, and car filming solutions. Protect your car\'s paint from scratches, UV, and minor abrasions.',
  },
  {
    id: 'chargers',
    name: 'Car Chargers',
    slug: 'chargers',
    description: 'Fast car chargers, wireless charging mounts, and power solutions for smartphones and devices on the go.',
  },
  {
    id: 'headlights',
    name: 'Headlights & Lighting',
    slug: 'headlights',
    description: 'LED headlight bulbs, DRL strips, fog lamps, and auxiliary lighting for better visibility and style.',
  },
  {
    id: 'speakers',
    name: 'Speakers & Audio',
    slug: 'speakers',
    description: 'Car speakers, subwoofers, amplifiers, and audio upgrades for premium in-car sound.',
  },
  {
    id: 'dashcam',
    name: 'Dash Cams',
    slug: 'dashcam',
    description: 'Front, rear, and 360° dash cameras with parking mode, night vision, and GPS. Record your drives safely.',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Car organisers, sunshades, phone holders, vacuum cleaners, and essential accessories.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
