# Welcome Car Decor

Dealer website for car exterior decor and accessories: car filming, chargers, headlights, speakers and more. Users can browse by car brand and model, by category, or search directly.

## Features

- **Browse by brand** – List car brands; select one to see models and compatible accessories.
- **Browse by model** – From a brand, select a model to see products for that model.
- **Categories** – Filming, Chargers, Headlights, Speakers, Accessories.
- **Search** – Search products by name or description (client-side, static data).

## Tech stack

- **Next.js 15** (App Router), **TypeScript**, **Tailwind CSS**
- Static export (`output: 'export'`) for hosting on S3, CloudFront, or any static host.

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

## Project structure

```
src/
├── app/              # Next.js App Router pages and layout
│   ├── brands/       # List brands, brand detail (models)
│   ├── models/       # Model detail (products)
│   ├── categories/   # List categories, category detail (products)
│   ├── search/       # Search page
│   └── components/   # Nav, etc.
├── data/             # Static data (brands, models, products, categories)
├── lib/              # Utilities
└── theme/            # CSS variables
```

## Deployment

The app is built as a static export. After `npm run build`, the `out/` directory contains the static site.

- **Option A – AWS**: Upload `out/` to an S3 bucket and optionally put CloudFront in front. Use the GitHub Action **Deploy – Web** (manual trigger) if you configure AWS credentials (e.g. `AWS_ROLE_ARN_TO_ASSUME` for OIDC).
- **Option B – Vercel/Netlify**: Connect the repo and use the framework preset for Next.js (static export).
- **Option C – Manual**: Run `aws s3 sync out/ s3://YOUR_BUCKET --delete` (or similar) after build.

## Environment

Optional: create `.env.local` from `.env.example`. No secrets required for the static site; use `NEXT_PUBLIC_SITE_URL` only if you need absolute URLs.

## License

ISC
