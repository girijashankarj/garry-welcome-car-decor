'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { assetPath } from '@/lib/assetPath';

interface FaqEmbedding {
  id: string;
  answer: string;
  link?: string;
  embedding: number[];
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) return 0;
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [embeddings, setEmbeddings] = useState<FaqEmbedding[] | null>(null);
  const [modelReady, setModelReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{ answer: string; link?: string; score: number }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const extractorRef = useRef<((text: string, opts: object) => Promise<unknown>) | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [embRes, { pipeline }] = await Promise.all([
          fetch(assetPath('/faq-embeddings.json')),
          import('@xenova/transformers'),
        ]);

        if (cancelled) return;
        if (!embRes.ok) throw new Error('Failed to load FAQ data');
        const data: FaqEmbedding[] = await embRes.json();
        setEmbeddings(data);

        if (cancelled) return;
        const pipe = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
          quantized: true,
        });
        if (cancelled) return;
        extractorRef.current = pipe;
        setModelReady(true);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (open && modelReady) inputRef.current?.focus();
  }, [open, modelReady]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const q = query.trim();
      if (!q || !embeddings || !extractorRef.current) return;

      setLoading(true);
      setError(null);
      try {
        const output = await extractorRef.current(q, { pooling: 'mean', normalize: true });
        let embedding: number[] = [];
        if (Array.isArray(output) && Array.isArray(output[0])) embedding = output[0];
        else if (output && typeof output === 'object' && 'data' in output)
          embedding = Array.from((output as { data: Iterable<number> }).data);
        else if (Array.isArray(output)) embedding = output;
        else embedding = Array.from(output as Iterable<number>);

        const scored = embeddings
          .map((item) => ({
            answer: item.answer,
            link: item.link,
            score: cosineSimilarity(item.embedding, embedding),
          }))
          .filter((x) => x.score > 0.3)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3);

        setResults(scored.length > 0 ? scored : [{ answer: "I couldn't find a close match. Please contact us directly – we'll help you!", link: '/contact', score: 1 }]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [query, embeddings]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:bottom-6"
        aria-label={open ? 'Close chat' : 'Open FAQ chat'}
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )}
      </button>

      {open && (
        <div
          className="fixed bottom-36 right-4 z-50 flex w-[calc(100vw-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl dark:border-white/10 sm:bottom-24"
          role="dialog"
          aria-label="FAQ chat"
        >
          <div className="border-b border-border bg-primary/10 px-4 py-3 dark:border-white/10">
            <h2 className="text-sm font-semibold text-foreground">FAQ & Guides</h2>
            <p className="text-xs text-muted-foreground">Ask about ordering, delivery, payment, returns</p>
          </div>

          <div className="flex max-h-80 flex-1 flex-col overflow-hidden">
            {loading && !modelReady ? (
              <div className="flex flex-1 items-center justify-center p-6">
                <p className="text-sm text-muted-foreground">Loading… (first time may take a moment)</p>
              </div>
            ) : error ? (
              <div className="p-4">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                <Link href="/contact" className="mt-2 inline-block text-sm text-primary hover:underline">
                  Contact us directly →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  {results.length > 0 ? (
                    <ul className="space-y-3">
                      {results.map((r, i) => (
                        <li key={i} className="rounded-lg bg-muted/50 p-3 text-sm">
                          <p className="text-foreground">{r.answer}</p>
                          {r.link && (
                            <Link href={r.link} className="mt-2 inline-block text-xs font-medium text-primary hover:underline">
                              Learn more →
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Ask a question about ordering, delivery, payment, or returns.
                    </p>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="border-t border-border p-3 dark:border-white/10">
                  <div className="flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. How do I order?"
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-white/10"
                      disabled={!modelReady || loading}
                      aria-label="Ask a question"
                    />
                    <button
                      type="submit"
                      disabled={!modelReady || loading || !query.trim()}
                      className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                    >
                      {loading ? '…' : 'Ask'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
