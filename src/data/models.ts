import type { CarModel } from './types';

export const models: CarModel[] = [
  { id: 'm1', name: 'Swift', slug: 'swift', brandId: 'br1' },
  { id: 'm2', name: 'Baleno', slug: 'baleno', brandId: 'br1' },
  { id: 'm3', name: 'Dzire', slug: 'dzire', brandId: 'br1' },
  { id: 'm4', name: 'Ertiga', slug: 'ertiga', brandId: 'br1' },
  { id: 'm5', name: 'i20', slug: 'i20', brandId: 'br2' },
  { id: 'm6', name: 'Creta', slug: 'creta', brandId: 'br2' },
  { id: 'm7', name: 'Verna', slug: 'verna', brandId: 'br2' },
  { id: 'm8', name: 'City', slug: 'city', brandId: 'br3' },
  { id: 'm9', name: 'Amaze', slug: 'amaze', brandId: 'br3' },
  { id: 'm10', name: 'Innova', slug: 'innova', brandId: 'br4' },
  { id: 'm11', name: 'Fortuner', slug: 'fortuner', brandId: 'br4' },
  { id: 'm12', name: 'Nexon', slug: 'nexon', brandId: 'br5' },
  { id: 'm13', name: 'Punch', slug: 'punch', brandId: 'br5' },
  { id: 'm14', name: 'XUV700', slug: 'xuv700', brandId: 'br6' },
  { id: 'm15', name: 'Scorpio', slug: 'scorpio', brandId: 'br6' },
  { id: 'm16', name: 'Seltos', slug: 'seltos', brandId: 'br7' },
  { id: 'm17', name: 'Sonet', slug: 'sonet', brandId: 'br7' },
  { id: 'm18', name: 'Hector', slug: 'hector', brandId: 'br8' },
];

export function getModelsByBrandId(brandId: string): CarModel[] {
  return models.filter((m) => m.brandId === brandId);
}

export function getModelBySlug(slug: string): CarModel | undefined {
  return models.find((m) => m.slug === slug);
}

export function getModelById(id: string): CarModel | undefined {
  return models.find((m) => m.id === id);
}
