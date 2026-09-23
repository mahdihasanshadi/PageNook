# PageNook

Pages worth keeping: a digital store for carefully made PDFs, from kids' worksheets to coding guides. Every PDF is $0.99.

Built with Next.js 16 and deployed free on Cloudflare Workers, with a Cloudflare D1 database for the email list and orders.

## Run it locally

```bash
npm install
cp .dev.vars.example .dev.vars   # then set ADMIN_PASSWORD (12+ characters)
npm run db:migrate:local
npm run dev
```

Open http://localhost:3000. The admin dashboard is at `/admin`.

## Go live (one-time setup, all free)

1. Create a free Cloudflare account, then log in from this folder:
   ```bash
   npx wrangler login
   ```
2. Create the database and paste the printed `database_id` into `wrangler.jsonc`:
   ```bash
   npx wrangler d1 create pagenook-db
   npm run db:migrate:remote
   ```
3. Set the secrets:
   ```bash
   npx wrangler secret put ADMIN_PASSWORD
   npx wrangler secret put LEMONSQUEEZY_WEBHOOK_SECRET
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```
   The site goes live at `https://pagenook.<your-subdomain>.workers.dev`. Add the custom domain (e.g. pagenook.me) under **Workers & Pages → pagenook → Settings → Domains & Routes**.

## Start selling a PDF

1. In Lemon Squeezy, create a product at $0.99 and upload the PDF file.
2. Copy its checkout link into `checkoutUrl` for that product in `lib/catalog.ts`, then redeploy.
3. In Lemon Squeezy **Settings → Webhooks**, add `https://<your-domain>/api/webhooks/lemonsqueezy` with the events `order_created` and `order_refunded`, and the same signing secret you set as `LEMONSQUEEZY_WEBHOOK_SECRET`. Orders then appear in `/admin`.

## Add a PDF to the shop

Add an entry to `products` in `lib/catalog.ts` (title, shelf, summary, cover, previews). Shelf pages, search, the sitemap and the product page update automatically.
