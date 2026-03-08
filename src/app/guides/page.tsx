import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'How to order, delivery, returns, payment and more. Your guide to buying car accessories from Welcome Car Decor.',
};

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-2 text-2xl font-bold text-foreground">Buying Guide</h1>
      <p className="mb-8 text-muted-foreground">
        Everything you need to know about ordering, delivery, payments, and returns.
      </p>

      <div className="space-y-10">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">How to Order</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">1. Browse & choose</strong> – Explore our products by category or car brand. Check compatibility with your vehicle model.
            </p>
            <p>
              <strong className="text-foreground">2. Contact us</strong> – Reach out via WhatsApp, phone, or the contact form. Share the product name, quantity, and your car model if relevant.
            </p>
            <p>
              <strong className="text-foreground">3. Confirm</strong> – We’ll confirm availability, price, and delivery options. Payment details will be shared once the order is confirmed.
            </p>
            <p>
              <strong className="text-foreground">4. Installation (optional)</strong> – For PPF, filming, and similar services, we can arrange installation at our Pune location. Ask us for details.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Delivery</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Pune & nearby</strong> – We deliver in Pune and surrounding areas. Delivery charges may apply based on distance.
            </p>
            <p>
              <strong className="text-foreground">All India</strong> – We ship across India via courier. Shipping cost depends on product size, weight, and destination.
            </p>
            <p>
              <strong className="text-foreground">Pickup</strong> – You can collect orders from our store at Near Bhandari Petrol Pump, Mumbai-Pune Road, Kasarwadi, Pune.
            </p>
            <p>
              <strong className="text-foreground">Timeline</strong> – In-stock items are usually dispatched within 1–3 business days. Installation services are scheduled separately.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Payment</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Accepted methods</strong> – Cash on delivery (COD), UPI, bank transfer, and card payment at our store.
            </p>
            <p>
              <strong className="text-foreground">Advance payment</strong> – For shipped orders, we may request partial or full advance payment. Details will be shared at the time of order.
            </p>
            <p>
              <strong className="text-foreground">COD</strong> – Available for select areas. Full payment is collected at the time of delivery.
            </p>
            <p>
              <strong className="text-foreground">Installation</strong> – Payment for PPF, filming, and similar services is typically collected after completion or as agreed.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Return & Refund Policy</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Defective products</strong> – If you receive a defective or damaged item, contact us within 24–48 hours of delivery. We will arrange a replacement or refund as applicable.
            </p>
            <p>
              <strong className="text-foreground">Wrong item</strong> – If you receive the wrong product, inform us immediately. We will correct the order at no extra cost.
            </p>
            <p>
              <strong className="text-foreground">Change of mind</strong> – Unopened, unused items may be returned within 7 days of delivery, subject to inspection. A restocking fee may apply.
            </p>
            <p>
              <strong className="text-foreground">Installation services</strong> – PPF, filming, and similar services are generally non-refundable once work has begun. Discuss any concerns before we start.
            </p>
            <p>
              <strong className="text-foreground">Refund timeline</strong> – Refunds are processed within 5–7 business days after approval. The amount will be credited to the original payment method.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Warranty & Support</h2>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Product warranty</strong> – Many products come with manufacturer warranty. We will share warranty details at the time of purchase.
            </p>
            <p>
              <strong className="text-foreground">PPF & filming</strong> – We stand behind our installation work. Ask us about warranty coverage for PPF and filming services.
            </p>
            <p>
              <strong className="text-foreground">Support</strong> – For any queries, reach us on WhatsApp or phone. We’re happy to help with product selection, installation, or after-sales support.
            </p>
          </div>
        </section>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground no-underline transition-opacity hover:opacity-90"
        >
          Get in touch
        </Link>
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
