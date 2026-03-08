import Link from 'next/link';
import { categories } from '@/data/categories';

export default function CategoriesPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold text-foreground">Categories</h1>
      <p className="mb-6 text-muted-foreground">
        Browse accessories by category – filming, chargers, headlights, speakers and more.
      </p>
      <ul className="grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <li key={cat.id}>
            <Link
              href={`/categories/${cat.slug}`}
              className="block rounded-lg border border-border bg-card p-4 text-card-foreground no-underline shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="font-semibold">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
