import ContactForm from './ContactForm';
import siteData from '@/data/site.json';

const contact = siteData.contact as {
  instagram?: string;
  address?: string;
  mapEmbedUrl?: string;
  mapDirectionsUrl?: string;
} | undefined;

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@welcomecardecor.com';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || contact?.instagram;

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Contact Us</h1>
      <p className="mb-8 text-muted-foreground">
        For product inquiries, bulk orders, or installation support, reach out to us.
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Contact info & form */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 dark:border-white/10">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Get in Touch</h2>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Email:</strong>{' '}
                <a href={`mailto:${email}`} className="text-primary hover:underline">
                  {email}
                </a>
              </p>
              {contact?.address && (
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Address:</strong> {contact.address}
                </p>
              )}
              {instagramUrl && (
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Instagram:</strong>{' '}
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @welcomecardecor
                  </a>
                </p>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium no-underline transition-colors hover:bg-muted dark:border-white/10"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              )}
              {contact?.mapDirectionsUrl && (
                <a
                  href={contact.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
                  aria-label="Get directions on Google Maps"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  Get Directions
                </a>
              )}
            </div>
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>

        {/* Placeholder for grid balance - map goes full width below */}
        <div className="hidden lg:block" aria-hidden />
      </div>

      {/* Google Maps - full width */}
      {contact?.mapEmbedUrl && (
        <div className="-mx-4 mt-8 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)]">
          <iframe
            src={contact.mapEmbedUrl}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Welcome Car Decor location"
            className="block w-full"
          />
        </div>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Products: PPF, vinyl wraps, car chargers, LED headlights, dash cams, speakers, and accessories. We serve customers across India.
      </p>
    </div>
  );
}
