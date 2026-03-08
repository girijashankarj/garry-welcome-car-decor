import ContactSection from '@/app/components/ContactSection';

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <h1 className="mb-4 text-2xl font-bold text-foreground">Contact Us</h1>
      <p className="mb-8 text-muted-foreground">
        For product inquiries, bulk orders, or installation support, reach out to us.
      </p>

      <ContactSection />

      <div className="mt-8 space-y-2 text-sm text-muted-foreground">
        <p>Products: PPF, vinyl wraps, car chargers, LED headlights, dash cams, speakers, and accessories.</p>
        <p>We provide delivery all over India. We are open for collaboration to keep your products in stock for sale. We also provide references for car-related services – insurance, garages, manufacturers, and more.</p>
      </div>
    </div>
  );
}
