'use client';

import { useState } from 'react';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const FALLBACK_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@welcomecardecor.com';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string) || '';
    const emailVal = (formData.get('email') as string) || '';
    const subject = (formData.get('subject') as string) || '';
    const message = (formData.get('message') as string) || '';

    if (!FORMSPREE_ID) {
      const body = `Name: ${name}\nEmail: ${emailVal}\n\nMessage:\n${message}`;
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-card p-6 dark:border-white/10"
    >
      <h2 className="text-lg font-semibold text-foreground">Send us a Message</h2>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
          Name <span className="text-primary">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
          placeholder="Your name"
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
          Email <span className="text-primary">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
          placeholder="your@email.com"
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="subject" className="mb-1 block text-sm font-medium text-foreground">
          Subject <span className="text-primary">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
          placeholder="Product inquiry, bulk order, etc."
          disabled={status === 'submitting'}
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-foreground">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10"
          placeholder="Your message..."
          disabled={status === 'submitting'}
        />
      </div>
      {status === 'success' && (
        <p className="text-sm text-green-600 dark:text-green-400">Thank you! We&apos;ll get back to you soon.</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-600 dark:text-red-400">Something went wrong. Please try emailing us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
