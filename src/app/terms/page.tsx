import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'Terms of service for Welcome Car Decor. Use of our website and services.',
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Terms of Service</h1>
      <p className="mb-4 text-sm text-muted-foreground">Last updated: March 2026</p>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Acceptance</h2>
          <p>
            By using the Welcome Car Decor website, you agree to these terms. If you do not agree,
            please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Informational Purpose</h2>
          <p>
            This website provides information about car accessories, brands, models, and products.
            Product availability, prices, and specifications are subject to change. Contact us
            directly for current pricing and availability.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. No Warranties</h2>
          <p>
            The site is provided &quot;as is&quot;. We do not warrant accuracy of product
            information or compatibility. Always verify with the manufacturer or seller before
            purchase.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Limitation of Liability</h2>
          <p>
            Welcome Car Decor is not liable for any damages arising from use of this site or reliance
            on its content. Product purchases are between you and the respective seller.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Contact</h2>
          <p>
            For questions about these terms, contact{' '}
            <a href="mailto:contact@welcomecardecor.com" className="text-primary hover:underline">
              contact@welcomecardecor.com
            </a>
            .
          </p>
        </section>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
