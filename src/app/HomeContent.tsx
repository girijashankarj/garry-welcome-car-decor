'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import siteData from '@/data/site.json';
import { brands } from '@/data/brands';
import { categories } from '@/data/categories';
import { getProductsByCategoryId } from '@/data/products';
import { getModelsByBrandId } from '@/data/models';
import { getAllProducts } from '@/data/products';
import { categoryIcons } from '@/lib/category-icons';
import type { ProductCategoryId } from '@/data/types';
import ProductCard from './components/ProductCard';
import ContactForm from './contact/ContactForm';

const MotionDiv = motion.div;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const TRUST_ITEMS = [
  {
    label: 'Quality Products',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  {
    label: 'Pune-based',
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    label: 'Trusted Brands',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];

export default function HomeContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const home = siteData.home as { title: string; tagline: string };
  const mission = siteData.mission as { title: string; statement: string };
  const contact = siteData.contact as { instagram?: string } | undefined;
  const nav = siteData.navigation as { text: string; path: string }[];
  const testimonials = (siteData as { testimonials?: { quote: string; author: string; location?: string }[] }).testimonials ?? [];
  const featuredProducts = getAllProducts().slice(0, 8);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero - with background image and trust bar */}
      <section className="relative -mx-4 overflow-hidden py-20 sm:-mx-6">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/products/ppf.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1
            className="mb-3 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            }}
          >
            {home.title}
          </h1>
          <p className="mb-8 text-lg text-white/90">{home.tagline}</p>

          <form onSubmit={handleSearch} className="mx-auto max-w-xl">
            <div className="flex gap-2 rounded-xl border border-white/20 bg-white/95 p-2 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-black/40">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, brands..."
                className="flex-1 rounded-lg bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Search
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/brands"
              className="rounded-lg border-2 border-white/80 bg-white/10 px-4 py-2 text-sm font-semibold text-white no-underline backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Brands
            </Link>
            <Link
              href="/categories"
              className="rounded-lg border-2 border-white/80 bg-white/10 px-4 py-2 text-sm font-semibold text-white no-underline backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Categories
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border-2 border-white/80 bg-white/10 px-4 py-2 text-sm font-semibold text-white no-underline backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Trust bar */}
        <div className="relative z-10 border-t border-white/10 bg-black/30 py-4 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8 px-6">
            {TRUST_ITEMS.map((item) => (
              <span
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium text-white/90"
              >
                <span className="text-primary [&>svg]:shrink-0">{item.icon}</span>
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="relative py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Car Brands</h2>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {brands.map((brand) => {
              const modelCount = getModelsByBrandId(brand.id).length;
              return (
                <MotionDiv key={brand.id} variants={itemVariants}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="block rounded-xl border border-border bg-card p-5 shadow-md no-underline transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:shadow-black/10"
                  >
                    <span className="font-semibold text-card-foreground">{brand.name}</span>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {modelCount} model{modelCount !== 1 ? 's' : ''}
                    </p>
                  </Link>
                </MotionDiv>
              );
            })}
          </MotionDiv>
          <Link href="/brands" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            View all brands →
          </Link>
        </div>
      </section>

      {/* Categories - with icons */}
      <section className="relative py-16">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Categories</h2>
          <MotionDiv
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((cat) => {
              const productCount = getProductsByCategoryId(cat.id).length;
              const icon = categoryIcons[cat.id as ProductCategoryId];
              return (
                <MotionDiv key={cat.id} variants={itemVariants}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="group block rounded-xl border border-border bg-card p-5 shadow-md no-underline transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:shadow-black/10"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                      {icon}
                    </div>
                    <h3 className="font-semibold text-card-foreground">{cat.name}</h3>
                    {cat.description && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{cat.description}</p>
                    )}
                    <p className="mt-2 text-xs font-medium text-primary">
                      {productCount} product{productCount !== 1 ? 's' : ''}
                    </p>
                  </Link>
                </MotionDiv>
              );
            })}
          </MotionDiv>
          <Link href="/categories" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            View all categories →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Featured Products</h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <li key={product.id}>
                <Link href={`/products/${product.slug}`} className="block no-underline">
                  <ProductCard product={product} />
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/categories" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Browse all products →
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="relative py-16">
          <div className="absolute inset-0 -z-10 bg-muted/40" />
          <div className="mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground">What Our Customers Say</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {testimonials.slice(0, 2).map((t, i) => (
                <blockquote
                  key={i}
                  className="rounded-xl border border-border bg-card p-6 shadow-md dark:border-white/10"
                >
                  <p className="mb-4 text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="text-sm font-medium text-foreground">
                    — {t.author}
                    {t.location && <span className="text-muted-foreground">, {t.location}</span>}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission - with visual emphasis */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-muted/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23E53935\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-xl font-semibold text-foreground">{mission.title}</h2>
          <p className="text-lg text-muted-foreground">"{mission.statement}"</p>
        </div>
      </section>

      {/* Contact form & navigation */}
      <section className="relative py-16">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Get in Touch</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <ContactForm />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Links</h3>
                <nav aria-label="Quick navigation">
                  <ul className="space-y-2">
                    {nav.map((item) => (
                      <li key={item.path}>
                        <Link
                          href={item.path}
                          className="block rounded-lg border border-border px-4 py-3 font-medium text-foreground no-underline transition-colors hover:border-primary/30 hover:bg-muted dark:border-white/10"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              {contact?.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-semibold text-primary no-underline transition-colors hover:bg-primary/10"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
