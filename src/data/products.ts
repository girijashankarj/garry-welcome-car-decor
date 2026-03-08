import type { Product } from './types';

export const products: Product[] = [
  // PPF & Filming
  {
    id: 'p1',
    name: 'Aegis PPF – Self-Healing Paint Protection',
    slug: 'aegis-ppf-self-healing',
    description: 'Triple-extrusion technology, nano-level UV shield, self-healing properties. 8-10 year warranty. Available at 125+ CarzSpa detailers across India.',
    categoryId: 'filming',
    price: 45000,
    vendor: 'Aegis',
    imagePath: '/images/products/ppf.jpg',
  },
  {
    id: 'p2',
    name: 'UltrashieldX PPF – Estane TPU',
    slug: 'ultrashieldx-ppf',
    description: 'India\'s first PPF with genuine Estane TPU by Lubrizol. 8-10 year warranty, hydrophobic, self-healing. Premium protection.',
    categoryId: 'filming',
    price: 52000,
    vendor: 'UltrashieldX',
    imagePath: '/images/products/ppf.jpg',
  },
  {
    id: 'p3',
    name: 'Ultraguard Matte PPF',
    slug: 'ultraguard-matte-ppf',
    description: 'Matte finish paint protection. Up to 7 years warranty. Clear, Matte, Colored, and Texture options available.',
    categoryId: 'filming',
    price: 38000,
    vendor: 'Ultraguard',
    imagePath: '/images/products/ppf.jpg',
  },
  {
    id: 'p4',
    name: 'Matte Black Vinyl Wrap',
    slug: 'matte-black-vinyl-wrap',
    description: 'Premium matte black vinyl for car exterior. UV resistant, durable, easy to remove. Full car wrap or accents.',
    categoryId: 'filming',
    price: 25000,
    vendor: 'Metaflix',
    imagePath: '/images/products/vinyl.jpg',
  },
  // Chargers
  {
    id: 'p5',
    name: 'Toreto Turbo Light 145W Dual Port',
    slug: 'toreto-turbo-light-145w',
    description: '145W dual-port fast car charger. Flash & SuperVOOC support. Compatible with smartphones, power banks, speakers, laptops.',
    categoryId: 'chargers',
    price: 799,
    vendor: 'Toreto',
    imagePath: '/images/products/charger.jpg',
  },
  {
    id: 'p6',
    name: 'UBON CH-291 65W Fast Car Charger',
    slug: 'ubon-65w-car-charger',
    description: '65W fast charging with Type-C and USB. Overheating and overcharging protection. Compact design.',
    categoryId: 'chargers',
    price: 749,
    vendor: 'UBON',
    imagePath: '/images/products/charger.jpg',
  },
  {
    id: 'p7',
    name: 'Wireless Car Charger Mount',
    slug: 'wireless-car-charger-mount',
    description: 'Qi wireless charging 15W. Vent/dashboard mount. Auto-clamping, compatible with most smartphones.',
    categoryId: 'chargers',
    price: 1299,
    vendor: 'UBON',
    imagePath: '/images/products/wireless-charger.jpg',
  },
  // Headlights
  {
    id: 'p8',
    name: 'Metaflix 200W LED Headlight Kit',
    slug: 'metaflix-200w-led-headlight',
    description: '200W smart LED headlight. Plug-and-play, 6000K white light. Brighter output, longer life than halogen.',
    categoryId: 'headlights',
    price: 11999,
    vendor: 'Metaflix',
    imagePath: '/images/products/headlight.jpg',
  },
  {
    id: 'p9',
    name: 'Metaflix 260W LED Headlight Kit',
    slug: 'metaflix-260w-led-headlight',
    description: '260W premium LED headlight. Maximum brightness, heat sink design. Ideal for highways and long drives.',
    categoryId: 'headlights',
    price: 15499,
    vendor: 'Metaflix',
    imagePath: '/images/products/headlight.jpg',
  },
  {
    id: 'p10',
    name: 'LED DRL Strip – Daytime Running Light',
    slug: 'led-drl-strip',
    description: 'Daytime running light strip. Easy installation, multiple modes. Enhances visibility and style.',
    categoryId: 'headlights',
    price: 899,
    vendor: 'Toreto',
    imagePath: '/images/products/drl.jpg',
  },
  // Speakers
  {
    id: 'p11',
    name: '6.5" Coaxial Car Speakers (Pair)',
    slug: 'coaxial-car-speakers',
    description: '6.5" coaxial speakers. Drop-in replacement for most cars. Balanced sound, easy installation.',
    categoryId: 'speakers',
    price: 3499,
    vendor: 'JBL',
    brandId: 'br1',
    modelId: 'm1',
    imagePath: '/images/products/speaker.jpg',
  },
  {
    id: 'p12',
    name: 'Component Speaker Set with Crossovers',
    slug: 'component-speaker-set',
    description: 'Tweeters and woofers with crossovers. Premium sound staging. For audiophiles.',
    categoryId: 'speakers',
    price: 8999,
    vendor: 'JBL',
    imagePath: '/images/products/speaker.jpg',
  },
  // Dash Cams
  {
    id: 'p13',
    name: '70mai A810S 4K Dash Cam',
    slug: '70mai-a810s-4k-dashcam',
    description: '4K UHD dash cam with Sony STARVIS 2 sensor. Wi-Fi, GPS, parking mode. 140° wide angle.',
    categoryId: 'dashcam',
    price: 12999,
    vendor: '70mai',
    imagePath: '/images/products/dashcam.jpg',
  },
  {
    id: 'p14',
    name: '70mai T800 3-Channel 4K Dash Cam',
    slug: '70mai-t800-3channel',
    description: '3-channel 4K (front + cabin + rear). 360° coverage. Parking surveillance, night vision.',
    categoryId: 'dashcam',
    price: 24999,
    vendor: '70mai',
    imagePath: '/images/products/dashcam.jpg',
  },
  {
    id: 'p15',
    name: 'Qubo Dashcam Pro 4K UHD',
    slug: 'qubo-dashcam-pro-4k',
    description: '4K UHD with GPS and Wi-Fi. Super night vision, loop recording. Compact design.',
    categoryId: 'dashcam',
    price: 8999,
    vendor: 'Qubo',
    imagePath: '/images/products/dashcam.jpg',
  },
  {
    id: 'p16',
    name: 'Metaflix 360° Bird View Camera',
    slug: 'metaflix-360-bird-view',
    description: '360° bird view camera system. Front, rear, left, right coverage. Parking assist, HD display.',
    categoryId: 'dashcam',
    price: 16499,
    vendor: 'Metaflix',
    imagePath: '/images/products/dashcam.jpg',
  },
  // Accessories
  {
    id: 'p17',
    name: 'Car Organiser Tray',
    slug: 'car-organiser-tray',
    description: 'Dashboard and console organiser. Non-slip, multiple compartments. Keeps cabin tidy.',
    categoryId: 'accessories',
    price: 499,
    vendor: 'UBON',
    imagePath: '/images/products/organiser.jpg',
  },
  {
    id: 'p18',
    name: 'Reflective Windshield Sunshade',
    slug: 'sunshade-reflective',
    description: 'Windshield sunshade. Reflects heat, keeps cabin cool. Folding design, universal fit.',
    categoryId: 'accessories',
    price: 399,
    vendor: 'UBON',
    imagePath: '/images/products/sunshade.jpg',
  },
  {
    id: 'p19',
    name: 'UBON CRH-521 Magnetic Phone Holder',
    slug: 'ubon-magnetic-phone-holder',
    description: 'Magnetic vent/dashboard phone holder. Strong grip, 360° rotation. Compatible with all phones.',
    categoryId: 'accessories',
    price: 349,
    vendor: 'UBON',
    imagePath: '/images/products/holder.jpg',
  },
  {
    id: 'p20',
    name: 'Car Vacuum Cleaner – Cordless',
    slug: 'car-vacuum-cordless',
    description: 'Portable cordless car vacuum. Strong suction, HEPA filter. USB rechargeable.',
    categoryId: 'accessories',
    price: 1999,
    vendor: 'UBON',
    imagePath: '/images/products/vacuum.jpg',
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
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.vendor && p.vendor.toLowerCase().includes(q))
  );
}

export function getAllProducts(): Product[] {
  return products;
}
