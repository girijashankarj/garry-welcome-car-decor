import { SITE } from '@/lib/site';

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  telephone: '+918888770071',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Near Bhandari Petrol Pump, Mumbai-Pune Road, Kasarwadi',
    addressLocality: 'Pune',
    postalCode: '411034',
    addressRegion: 'Maharashtra',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 18.604031782505785,
    longitude: 73.82186457606728,
  },
  sameAs: [
    'https://www.instagram.com/welcome_car_decor/',
    'https://youtube.com/@welcomecardecor',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
    />
  );
}
