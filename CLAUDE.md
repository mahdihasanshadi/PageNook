@AGENTS.md

# PageNook

Digital store selling PDFs ("Pages worth keeping.") to international buyers. Owner: Mahdi Hasan Shadi.
Every PDF costs $0.99 (`PRICE_USD` in `lib/catalog.ts`).

## Stack
- Next.js 16 App Router, TypeScript, plain CSS in `app/globals.css` (no Tailwind)
- Hosted on Cloudflare Workers via `@opennextjs/cloudflare`; database is Cloudflare D1 (`DB` binding)
- Checkout: Lemon Squeezy overlay (`checkoutUrl` per product). Lemon Squeezy hosts and delivers the paid files.

## Layout
- `lib/catalog.ts`: shelves (categories) and products, the single source of truth for the shop
- `lib/server/`: D1 queries, HMAC helpers, admin session cookie
- `app/api/subscribe`, `app/api/webhooks/lemonsqueezy`, `app/api/health`: backend routes
- `app/admin`: password-protected dashboard (orders, subscribers, CSV export)
- `migrations/`: D1 schema. `pdfs/`: PDF sources + `build.py` (gitignored while the repo is public)
- `public/covers`, `public/previews`, `public/free`: product images and the free sample. Never put paid PDFs in `public/`.

## Commands
- `npm run dev`: local dev (uses local D1 and `.dev.vars` secrets)
- `npm run db:migrate:local` / `db:migrate:remote`: apply migrations
- `npm run preview`: build and run the real Worker locally
- `npm run deploy`: build and deploy to Cloudflare

## Rules
- Never invent reviews, ratings, sales counts or testimonials
- Before creating a new PDF, confirm its title and purpose with the owner
- Must work at 375px wide with no sideways scroll
- Paid PDF files never go in `public/` or the public repo
- Commits go out under the owner's name only
