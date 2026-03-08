import type { CarModel } from './types';

export const models: CarModel[] = [
  // Maruti Suzuki
  {
    id: 'm1',
    name: 'Swift',
    slug: 'swift',
    brandId: 'br1',
    colors: ['Sizzling Red', 'Luster Blue', 'Novel Orange', 'Magma Grey', 'Splendid Silver', 'Pearl Arctic White'],
  },
  {
    id: 'm2',
    name: 'Baleno',
    slug: 'baleno',
    brandId: 'br1',
    colors: ['Arctic White', 'Splendid Silver', 'Magma Grey', 'Nutmeg Brown', 'Alluring Blue', 'Gallant Red', 'Bluish Black'],
  },
  {
    id: 'm3',
    name: 'Dzire',
    slug: 'dzire',
    brandId: 'br1',
    colors: ['Arctic White', 'Splendid Silver', 'Magma Grey', 'Nutmeg Brown', 'Alluring Blue', 'Gallant Red', 'Bluish Black'],
  },
  {
    id: 'm4',
    name: 'Ertiga',
    slug: 'ertiga',
    brandId: 'br1',
    colors: ['Arctic White', 'Splendid Silver', 'Magma Grey', 'Nutmeg Brown', 'Gallant Red', 'Bluish Black'],
  },
  // Hyundai
  {
    id: 'm5',
    name: 'i20',
    slug: 'i20',
    brandId: 'br2',
    colors: ['Atlas White', 'Abyss Black Pearl', 'Fiery Red', 'Titan Grey', 'Polar White', 'Phantom Black'],
  },
  {
    id: 'm6',
    name: 'Creta',
    slug: 'creta',
    brandId: 'br2',
    colors: ['Atlas White', 'Abyss Black Pearl', 'Fiery Red', 'Ranger Khaki', 'Robust Emerald Pearl', 'Titan Grey'],
  },
  {
    id: 'm7',
    name: 'Verna',
    slug: 'verna',
    brandId: 'br2',
    colors: ['Atlas White', 'Abyss Black Pearl', 'Fiery Red', 'Titan Grey', 'Robust Emerald Pearl'],
  },
  {
    id: 'm8',
    name: 'Venue',
    slug: 'venue',
    brandId: 'br2',
    colors: ['Atlas White', 'Abyss Black Pearl', 'Fiery Red', 'Titan Grey', 'Polar White', 'Denim Blue'],
  },
  // Honda
  {
    id: 'm9',
    name: 'City',
    slug: 'city',
    brandId: 'br3',
    colors: ['Obsidian Blue Pearl', 'Radiant Red Metallic', 'Platinum White Pearl', 'Golden Brown Metallic', 'Meteoroid Gray Metallic', 'Lunar Silver Metallic'],
  },
  {
    id: 'm10',
    name: 'Amaze',
    slug: 'amaze',
    brandId: 'br3',
    colors: ['Obsidian Blue Pearl', 'Radiant Red Metallic', 'Platinum White Pearl', 'Golden Brown Metallic', 'Meteoroid Gray Metallic', 'Lunar Silver Metallic'],
  },
  {
    id: 'm11',
    name: 'Elevate',
    slug: 'elevate',
    brandId: 'br3',
    colors: ['Obsidian Blue Pearl', 'Radiant Red Metallic', 'Platinum White Pearl', 'Golden Brown Metallic', 'Meteoroid Gray Metallic', 'Lunar Silver Metallic'],
  },
  // Toyota
  {
    id: 'm12',
    name: 'Innova Crysta',
    slug: 'innova-crysta',
    brandId: 'br4',
    colors: ['Silver Metallic', 'Avant Garde Bronze', 'Attitude Black', 'Super White', 'Platinum White Pearl'],
  },
  {
    id: 'm13',
    name: 'Innova Hycross',
    slug: 'innova-hycross',
    brandId: 'br4',
    colors: ['Blackish Ageha Glass Flake', 'Platinum White Pearl', 'Silver Metallic', 'Avant-Garde Bronze Metallic', 'Attitude Black Mica', 'Super White'],
  },
  {
    id: 'm14',
    name: 'Fortuner',
    slug: 'fortuner',
    brandId: 'br4',
    colors: ['Sparkling Black Crystal Shine', 'Attitude Black', 'Avant Garde Bronze', 'Silver Metallic', 'Super White', 'White Pearl Crystal Shine', 'Phantom Brown', 'Grey Metallic'],
  },
  // Tata
  {
    id: 'm15',
    name: 'Nexon',
    slug: 'nexon',
    brandId: 'br5',
    colors: ['Oberon Black', 'Coral Red', 'Daytona Grey', 'Purely White', 'Creative Ocean', 'Starlight Blue', 'Fearless Purple'],
  },
  {
    id: 'm16',
    name: 'Punch',
    slug: 'punch',
    brandId: 'br5',
    colors: ['Oberon Black', 'Coral Red', 'Daytona Grey', 'Purely White', 'Creative Ocean', 'Starlight Blue'],
  },
  {
    id: 'm17',
    name: 'Harrier',
    slug: 'harrier',
    brandId: 'br5',
    colors: ['Oberon Black', 'Coral Red', 'Daytona Grey', 'Purely White', 'Starlight Blue', 'Fearless Purple'],
  },
  {
    id: 'm18',
    name: 'Safari',
    slug: 'safari',
    brandId: 'br5',
    colors: ['Oberon Black', 'Coral Red', 'Daytona Grey', 'Purely White', 'Starlight Blue', 'Fearless Purple'],
  },
  // Mahindra
  {
    id: 'm19',
    name: 'XUV700',
    slug: 'xuv700',
    brandId: 'br6',
    colors: ['Midnight Black', 'Red Rage', 'Dazzling Silver', 'Everest White', 'Adventure Red', 'Nexa Blue'],
  },
  {
    id: 'm20',
    name: 'Scorpio N',
    slug: 'scorpio-n',
    brandId: 'br6',
    colors: ['Midnight Black', 'Red Rage', 'Dazzling Silver', 'Everest White', 'Adventure Red', 'Nexa Blue'],
  },
  // Kia
  {
    id: 'm21',
    name: 'Seltos',
    slug: 'seltos',
    brandId: 'br7',
    colors: ['Aurora Black Pearl', 'Pewter Olive', 'Glacier White Pearl', 'Intense Red', 'Gravity Grey', 'Sparkling Silver', 'Imperial Blue'],
  },
  {
    id: 'm22',
    name: 'Sonet',
    slug: 'sonet',
    brandId: 'br7',
    colors: ['Pewter Olive', 'Glacier White Pearl', 'Sparkling Silver', 'Gravity Grey', 'Aurora Black Pearl', 'Intense Red', 'Imperial Blue', 'Clear White'],
  },
  // MG
  {
    id: 'm23',
    name: 'Hector',
    slug: 'hector',
    brandId: 'br8',
    colors: ['Starry Black', 'Candy White', 'Aurora Silver', 'Burgundy Red', 'Glaze Red', 'Dune Brown'],
  },
  {
    id: 'm24',
    name: 'Hector Plus',
    slug: 'hector-plus',
    brandId: 'br8',
    colors: ['Starry Black', 'Candy White', 'Aurora Silver', 'Burgundy Red', 'Glaze Red', 'Dune Brown'],
  },
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
