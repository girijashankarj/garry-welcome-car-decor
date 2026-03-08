/**
 * Site config for SEO, URLs, etc.
 * Use NEXT_PUBLIC_SITE_URL for production.
 */
export const SITE = {
  name: 'Welcome Car Decor',
  description: 'Car exterior decor and accessories – PPF, filming, chargers, headlights, speakers, dash cams and more. Browse by brand and model.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://welcomecardecor.com',
} as const;
