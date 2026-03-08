import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-12 text-center">
      <h1 className="mb-2 text-2xl font-bold text-foreground">Page not found</h1>
      <p className="mb-6 text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground no-underline hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
