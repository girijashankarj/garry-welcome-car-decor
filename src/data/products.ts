import type { Product } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Matte Black Vinyl Wrap',
    slug: 'matte-black-vinyl-wrap',
    description: 'Premium matte black vinyl for car exterior. UV resistant, durable.',
    categoryId: 'filming',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p2',
    name: 'Gloss PPF Film',
    slug: 'gloss-ppf-film',
    description: 'Paint protection film with gloss finish. Scratch-resistant.',
    categoryId: 'filming',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p3',
    name: 'USB Car Charger Dual Port',
    slug: 'usb-car-charger-dual',
    description: 'Fast charging dual USB port. Compatible with all cars.',
    categoryId: 'chargers',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p4',
    name: 'Wireless Car Charger Mount',
    slug: 'wireless-car-charger-mount',
    description: 'Qi wireless charging with vent/dashboard mount.',
    categoryId: 'chargers',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p5',
    name: 'LED Headlight Bulb Set',
    slug: 'led-headlight-bulb-set',
    description: 'Plug-and-play LED headlight bulbs. Brighter, longer life.',
    categoryId: 'headlights',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p6',
    name: 'LED DRL Strip',
    slug: 'led-drl-strip',
    description: 'Daytime running light strip. Easy installation.',
    categoryId: 'headlights',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p7',
    name: 'Coaxial Car Speakers (Pair)',
    slug: 'coaxial-car-speakers',
    description: '6.5" coaxial speakers. Drop-in replacement for most cars.',
    categoryId: 'speakers',
    brandId: 'br1',
    modelId: 'm1',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p8',
    name: 'Component Speaker Set',
    slug: 'component-speaker-set',
    description: 'Tweeters and woofers with crossovers. Premium sound.',
    categoryId: 'speakers',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p9',
    name: 'Car Organiser Tray',
    slug: 'car-organiser-tray',
    description: 'Dashboard and console organiser. Non-slip.',
    categoryId: 'accessories',
    imagePath: '/images/placeholder.svg',
  },
  {
    id: 'p10',
    name: 'Sunshade Reflective',
    slug: 'sunshade-reflective',
    description: 'Windshield sunshade. Keeps cabin cool.',
    categoryId: 'accessories',
    imagePath: '/images/placeholder.svg',
  },
];

export function getProductsByCategoryId(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getProductsByBrandId(brandId: string): Product[] {
  return products.filter((p) => p.brandId === brandId);
}

export function getProductsByModelId(modelId: string): Product[] {
  return products.filter((p) => p.modelId === modelId);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );
}

export function getAllProducts(): Product[] {
  return products;
}
