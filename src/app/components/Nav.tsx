'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/brands', label: 'Brands' },
  { href: '/categories', label: 'Categories' },
  { href: '/search', label: 'Search' },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <nav className="border-b border-border bg-muted px-6 py-4" aria-label="Main navigation">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="text-lg font-bold text-foreground no-underline">
          Welcome Car Decor
        </Link>
        <ul className="flex list-none gap-4 p-0">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`rounded-md px-3 py-2 text-sm no-underline transition-colors ${
                  pathname === href || (href !== '/' && pathname.startsWith(href))
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : 'text-foreground hover:bg-border'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
