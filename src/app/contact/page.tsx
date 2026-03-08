import ContactSection from '@/app/components/ContactSection';

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Contact Us</h1>
      <p className="mb-8 text-muted-foreground">
        For product inquiries, bulk orders, or installation support, reach out to us.
      </p>

      <ContactSection />

      <p className="mt-8 text-sm text-muted-foreground">
        Products: PPF, vinyl wraps, car chargers, LED headlights, dash cams, speakers, and accessories. We serve customers across India.
      </p>
    </div>
  );
}
