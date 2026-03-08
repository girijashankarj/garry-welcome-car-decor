import ContactForm from '@/app/contact/ContactForm';
import siteData from '@/data/site.json';

const contact = siteData.contact as {
  instagram?: string;
  youtube?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  mapEmbedUrl?: string;
  mapDirectionsUrl?: string;
  mapPlaceUrl?: string;
} | undefined;

function getWhatsAppUrl(phone: string, message = 'Hi, I would like to know more about your car accessories.') {
  const num = phone.replace(/\D/g, '');
  return `https://wa.me/${num}?text=${encodeURIComponent(message)}`;
}

const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@welcomecardecor.com';
const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || contact?.instagram;
const youtubeUrl = process.env.NEXT_PUBLIC_YOUTUBE_URL || contact?.youtube;

export default function ContactSection() {
  return (
    <>
      {/* Get in Touch & Send us a Message - full width like map */}
      <div className="-mx-4 w-[calc(100%+2rem)] space-y-6 px-4 sm:-mx-6 sm:w-[calc(100%+3rem)] sm:px-6">
        <div className="rounded-xl border border-border bg-card p-6 dark:border-white/10">
          <h2 className="mb-4 text-lg font-semibold text-foreground">Get in Touch</h2>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Email:</strong>{' '}
              <a href={`mailto:${email}`} className="text-primary hover:underline">
                {email}
              </a>
            </p>
            {contact?.phone && (
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Phone:</strong>{' '}
                <a href={`tel:+91${contact.phone.replace(/\D/g, '')}`} className="text-primary hover:underline">
                  +91 {contact.phone.replace(/\D/g, '')}
                </a>
              </p>
            )}
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
                  @welcome_car_decor
                </a>
              </p>
            )}
            {youtubeUrl && (
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">YouTube:</strong>{' '}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Our channel
                </a>
              </p>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {(contact?.whatsapp || contact?.phone) && (
              <a
                href={getWhatsAppUrl(contact?.whatsapp || contact?.phone || '')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                aria-label="Chat on WhatsApp"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
            )}
            {contact?.phone && (
              <a
                href={`tel:+91${contact.phone.replace(/\D/g, '')}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium no-underline transition-colors hover:bg-muted dark:border-white/10"
                aria-label="Call us"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1v3.15c0 .31.2.6.5.72.33.12.66.04.92-.12l2.2-2.2z" />
                </svg>
                Call
              </a>
            )}
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
            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium no-underline transition-colors hover:bg-muted dark:border-white/10"
                aria-label="Visit our YouTube channel"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                YouTube
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

        <ContactForm />
      </div>

      {/* Google Maps - full width */}
      {contact?.mapEmbedUrl && (
        <div className="-mx-4 mt-8 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)]">
          {(contact?.mapPlaceUrl || contact?.mapDirectionsUrl) && (
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6">
              <p className="text-sm text-muted-foreground">
                View reviews, get directions, or open in Google Maps for navigation.
              </p>
              <div className="flex flex-wrap gap-2">
                {contact?.mapPlaceUrl && (
                  <a
                    href={contact.mapPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium no-underline transition-colors hover:bg-muted dark:border-white/10"
                    aria-label="View on Google Maps"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                    View on Google Maps
                  </a>
                )}
                {contact?.mapDirectionsUrl && (
                  <a
                    href={contact.mapDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
                    aria-label="Get directions"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M21.71 11.29l-9-9a1 1 0 00-1.42 1.42l7.3 7.29H3a1 1 0 000 2h15.59l-7.3 7.29a1 1 0 000 1.42 1 1 0 001.42 0l9-9a1 1 0 000-1.42z" />
                    </svg>
                    Get Directions
                  </a>
                )}
              </div>
            </div>
          )}
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
    </>
  );
}
