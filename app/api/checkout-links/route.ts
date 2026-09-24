import { products } from "@/lib/catalog";
import { checkoutLinks } from "@/lib/server/db";

export const dynamic = "force-dynamic";

// Public: checkout links are public URLs anyway. Links saved in the dashboard
// override any written into the catalog.
export async function GET() {
  const fromCatalog = Object.fromEntries(products.filter((p) => p.checkoutUrl).map((p) => [p.slug, p.checkoutUrl!]));
  let saved: Record<string, string> = {};
  try {
    saved = await checkoutLinks();
  } catch (err) {
    console.error("checkout links unavailable", err);
  }
  return Response.json({ ...fromCatalog, ...saved }, { headers: { "cache-control": "public, max-age=30" } });
}
