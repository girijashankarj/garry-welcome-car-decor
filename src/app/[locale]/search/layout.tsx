import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'Search car accessories by name, description, or brand. PPF, chargers, headlights, dash cams, speakers and more.',
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
