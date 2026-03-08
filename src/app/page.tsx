import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <section className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-foreground">Welcome Car Decor</h1>
        <p className="text-lg text-muted-foreground">
          Your dealer for car exterior decor and accessories – filming, chargers, headlights,
          speakers and more.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/brands"
          className="rounded-lg border border-border bg-card p-6 text-card-foreground no-underline shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-semibold">Browse by Brand</h2>
          <p className="text-sm text-muted-foreground">
            Find accessories by car brand and model.
          </p>
        </Link>
        <Link
          href="/categories"
          className="rounded-lg border border-border bg-card p-6 text-card-foreground no-underline shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground">
            Filming, chargers, headlights, speakers and more.
          </p>
        </Link>
        <Link
          href="/search"
          className="rounded-lg border border-border bg-card p-6 text-card-foreground no-underline shadow-sm transition-shadow hover:shadow-md"
        >
          <h2 className="mb-2 text-xl font-semibold">Search</h2>
          <p className="text-sm text-muted-foreground">
            Search products by name or description.
          </p>
        </Link>
      </section>
    </>
  );
}
