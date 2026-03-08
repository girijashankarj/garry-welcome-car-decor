import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Car exterior decor and accessories – PPF, filming, chargers, headlights, speakers, dash cams. Browse by brand and model. India.',
};

export default function HomePage() {
  return <HomeContent />;
}
