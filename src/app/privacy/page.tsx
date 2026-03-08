import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'Privacy policy for Welcome Car Decor. How we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Privacy Policy</h1>
      <p className="mb-4 text-sm text-muted-foreground">Last updated: March 2024</p>

      <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            Welcome Car Decor is a static informational website. We do not collect personal data
            through forms or accounts. If you contact us via email, we may retain your email address
            and message content for the purpose of responding to your inquiry.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">2. Analytics</h2>
          <p>
            We may use analytics services (e.g. Google Analytics) to understand how visitors use our
            site. This may include anonymised data such as pages visited, device type, and general
            location. You can opt out via your browser settings or analytics opt-out tools.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">3. Cookies</h2>
          <p>
            We use minimal cookies – for example, to remember your theme preference (dark/light
            mode). No tracking or advertising cookies are used by default.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">4. Third-Party Links</h2>
          <p>
            Our site may link to external websites. We are not responsible for their privacy
            practices. Please review their policies before sharing any information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-lg font-semibold text-foreground">5. Contact</h2>
          <p>
            For privacy-related questions, contact us at{' '}
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
