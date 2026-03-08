'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';
import siteData from '@/data/site.json';
import { brands } from '@/data/brands';
import { categories } from '@/data/categories';
import { getProductsByCategoryId } from '@/data/products';
import { getModelsByBrandId } from '@/data/models';
import { getAllProducts } from '@/data/products';
import { categoryImages } from '@/lib/category-icons';
import { assetPath } from '@/lib/assetPath';
import type { ProductCategoryId } from '@/data/types';
import ProductCard from './components/ProductCard';
import ContactSection from './components/ContactSection';
import { LocaleLink, getLocalePath } from '@/lib/locale-link';
import { useLocale } from './components/LocaleProvider';

const MotionDiv = motion.div;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function HomeContent() {
  const router = useRouter();
  const { locale, t } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const featuredProducts = getAllProducts().slice(0, 12);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const path = searchQuery.trim() ? `/search?q=${encodeURIComponent(searchQuery.trim())}` : '/search';
    router.push(getLocalePath(locale, path));
  };

  return (
    <div className="min-h-screen">
      {/* Hero - full-screen, bold, minimal */}
      <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden sm:min-h-[90vh]">
        <div className="absolute inset-0">
          <Image
            src={assetPath((siteData.home as { heroImage?: string })?.heroImage ?? '/images/products/ppf.jpg')}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/20" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 pb-24 pt-32 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {t('home')('heroTitle')}
            <br />
            <span className="text-primary">{t('home')('heroTitleHighlight')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mb-2 text-lg text-white/80 sm:text-xl"
          >
            {t('home')('heroSubtitle')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-10 text-sm font-medium text-white/90 sm:text-base"
          >
            {t('home')('heroTagline')}
          </motion.p>

          {/* Search - primary CTA */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-xl"
          >
            <div className="flex gap-2 rounded-2xl bg-white/95 p-2 shadow-soft-xl backdrop-blur-sm dark:bg-white/10">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('home')('searchPlaceholder')}
                className="flex-1 rounded-xl bg-transparent px-5 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label={t('home')('searchPlaceholder')}
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-6 py-3.5 font-semibold text-white transition-all hover:opacity-95 active:scale-[0.98]"
              >
                {t('home')('search')}
              </button>
            </div>
          </motion.form>

          {/* Quick CTAs - minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <LocaleLink
              href="/products"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t('home')('shopAll')}
            </LocaleLink>
            <LocaleLink
              href="/categories"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t('home')('categories')}
            </LocaleLink>
            <LocaleLink
              href="/brands"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t('home')('byCar')}
            </LocaleLink>
            <LocaleLink
              href="/contact"
              className="rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
            >
              {t('home')('contact')}
            </LocaleLink>
          </motion.div>
        </div>
      </section>

      {/* Product feed - image-first, Instagram-like */}
      <section className="relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{t('home')('featured')}</h2>
              <p className="mt-1 text-muted-foreground">{t('home')('handpicked')}</p>
            </div>
            <LocaleLink
              href="/products"
              className="hidden text-sm font-medium text-primary hover:underline sm:block"
            >
              {t('home')('viewAll')} →
            </LocaleLink>
          </div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
            className="grid list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4"
          >
            {featuredProducts.map((product) => (
              <motion.li key={product.id} variants={itemVariants}>
                <LocaleLink href={`/products/${product.slug}`} className="block no-underline">
                  <ProductCard product={product} />
                </LocaleLink>
              </motion.li>
            ))}
          </motion.ul>

          <LocaleLink
            href="/products"
            className="mt-8 inline-block rounded-xl bg-primary px-8 py-3.5 font-semibold text-white transition-all hover:opacity-95 active:scale-[0.98] sm:hidden"
          >
            {t('home')('viewAllProducts')}
          </LocaleLink>
        </div>
      </section>

      {/* Categories - horizontal scroll on mobile, compact grid on desktop */}
      <section className="border-y border-border bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">{t('home')('shopByCategory')}</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
            {categories.map((cat) => {
              const imgSrc = categoryImages[cat.id as ProductCategoryId];
              const count = getProductsByCategoryId(cat.id).length;
              return (
                <LocaleLink
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group flex min-w-[140px] shrink-0 flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg md:min-w-0"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={assetPath(imgSrc)}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 140px, 200px"
                    />
                  </div>
                  <div className="p-3">
                    <span className="block truncate text-sm font-semibold text-foreground">{cat.name}</span>
                    <span className="text-xs text-muted-foreground">{count} {t('common')('products')}</span>
                  </div>
                </LocaleLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands - compact pill strip */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">{t('home')('browseByCar')}</h2>
          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => {
              const modelCount = getModelsByBrandId(brand.id).length;
              const brandName = (() => {
                const v = t('brandsDetail')(`${brand.slug}-name`);
                return v !== `${brand.slug}-name` ? v : brand.name;
              })();
              return (
                <LocaleLink
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-soft-lg dark:border-white/10"
                >
                  {brand.logoPath && (
                    <div className="relative flex h-14 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 dark:bg-white/10">
                      <Image
                        src={assetPath(brand.logoPath)}
                        alt=""
                        width={96}
                        height={56}
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                  <div>
                    <span className="block text-sm font-semibold text-foreground">{brandName}</span>
                    <span className="text-xs text-muted-foreground">{modelCount} {t('common')('models')}</span>
                  </div>
                </LocaleLink>
              );
            })}
          </div>
          <LocaleLink href="/brands" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            {t('home')('viewAllBrands')} →
          </LocaleLink>
        </div>
      </section>

      {/* What we offer */}
      <section className="border-t border-border py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-6 text-xl font-bold tracking-tight text-foreground">{t('home')('whatWeOffer')}</h2>
          <ul className="grid list-none gap-4 p-0 sm:grid-cols-3">
            <li className="rounded-xl border border-border bg-card p-4 dark:border-white/10">
              <h3 className="mb-2 font-semibold text-foreground">{t('home')('deliveryIndia')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home')('deliveryIndiaDesc')}
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-4 dark:border-white/10">
              <h3 className="mb-2 font-semibold text-foreground">{t('home')('collaboration')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home')('collaborationDesc')}
              </p>
            </li>
            <li className="rounded-xl border border-border bg-card p-4 dark:border-white/10">
              <h3 className="mb-2 font-semibold text-foreground">{t('home')('carServices')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('home')('carServicesDesc')}
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact - Get in Touch, Send us a Message, Google Maps */}
      <section className="border-t border-border bg-primary/5 py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">{t('home')('getInTouch')}</h2>
          <p className="mb-8 text-muted-foreground">
            {t('home')('reachOut')}{' '}
            <LocaleLink href="/guides" className="text-primary hover:underline">
              {t('home')('howToOrderLink')}
            </LocaleLink>
          </p>
          <ContactSection />
        </div>
      </section>
    </div>
  );
}
