# Welcome Car Decor

Dealer website for car exterior decor and accessories: PPF, filming, chargers, headlights, speakers, dash cams and more. Users can browse by car brand and model, by category, or search directly.

## Features

- **Browse by brand** – Maruti Suzuki, Hyundai, Honda, Toyota, Tata, Mahindra, Kia, MG with models and colors
- **Browse by model** – See available colors and compatible accessories per model
- **Categories** – PPF & filming, Chargers, Headlights, Speakers, Dash Cams, Accessories
- **Search** – Search products by name, description, or vendor (client-side, static data)
- **Contact** – Email for inquiries
- **SEO** – Per-page metadata, sitemap, robots.txt, Open Graph, JSON-LD
- **Production-ready** – Error boundary, loading states, favicon, analytics support

## Tech stack

- **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**, **Framer Motion**
- Static export (`output: 'export'`) for hosting on S3, CloudFront, Vercel, or any static host

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `npm run dev` | Start dev server         |
| `npm run build` | Build static export to `out/` |
| `npm run start` | Serve production build   |
| `npm run lint` | Run ESLint               |
| `npm run lint:fix` | Fix lint issues      |

## Environment

Copy `.env.example` to `.env.local` and optionally set:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public site URL (for sitemap, OG tags). Default: `https://welcomecardecor.com` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Contact email. Default: `contact@welcomecardecor.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (e.g. `G-XXXXXXXXXX`). Omit to disable analytics |

## Project structure

```
src/
├── app/              # Next.js App Router
│   ├── brands/       # List brands, brand detail (models)
│   ├── categories/   # List categories, category detail (products)
│   ├── models/       # Model detail (colors, products)
│   ├── search/       # Search page
│   ├── contact/      # Contact page
│   ├── privacy/      # Privacy policy
│   ├── terms/        # Terms of service
│   └── components/   # AppLayout, ProductCard, ThemeToggle, etc.
├── data/             # Static data (brands, models, products, categories, site)
├── lib/              # Utilities (format, site config)
└── theme/            # CSS variables
```

## Deployment

The app is built as a static export. After `npm run build`, the `out/` directory contains the static site.

- **AWS**: Upload `out/` to an S3 bucket; optionally use CloudFront. Use the GitHub Action **Deploy – Web** if configured.
- **Vercel/Netlify**: Connect the repo and use the Next.js preset (static export).
- **Manual**: `aws s3 sync out/ s3://YOUR_BUCKET --delete` (or equivalent).

## License

ISC
