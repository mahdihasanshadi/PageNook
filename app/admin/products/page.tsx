import type { Metadata } from "next";
import Link from "next/link";
import { AdminLogin, AdminShell } from "@/components/admin-shell";
import { bundleItems, formatPrice, getCategory, products } from "@/lib/catalog";
import { saveCheckoutLink } from "@/lib/server/admin-actions";
import { isAdmin } from "@/lib/server/admin-session";
import { checkoutLinks } from "@/lib/server/db";

export const metadata: Metadata = { title: "Products · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminProducts(props: PageProps<"/admin/products">) {
  const sp = await props.searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  if (!(await isAdmin())) return <AdminLogin next="/admin/products" error={one(sp.error)} />;

  const links = await checkoutLinks();
  const forSale = products.filter((p) => p.status === "available");
  const linkFor = (slug: string, fallback?: string) => links[slug] ?? fallback ?? "";
  const connected = forSale.filter((p) => linkFor(p.slug, p.checkoutUrl)).length;
  const saved = one(sp.saved);
  const badSlug = one(sp.error) === "badlink" ? one(sp.slug) : undefined;

  return (
    <AdminShell
      active="/admin/products"
      title="Products & checkout"
      intro="Paste each product's Lemon Squeezy checkout link here. The Buy button on the shop goes live within a minute. No code needed."
    >
      <div className="kpis kpis-3">
        <div className="kpi"><span>For sale</span><b>{forSale.length}</b><small>{forSale.filter((p) => p.bundle).length} of them are bundles</small></div>
        <div className="kpi"><span>Checkout links added</span><b>{connected} / {forSale.length}</b><small>{forSale.length - connected} still to add</small></div>
        <div className="kpi"><span>Where to find a link</span><b className="kpi-text">Products → ⋯ → Share</b><small>In your Lemon Squeezy dashboard</small></div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <div><h2>All products</h2><p>A link looks like https://yourstore.lemonsqueezy.com/buy/1a2b3c…</p></div>
        </div>
        <ul className="product-admin">
          {forSale.map((p) => {
            const link = linkFor(p.slug, p.checkoutUrl);
            const cat = getCategory(p.category);
            return (
              <li key={p.slug} id={p.slug} className={saved === p.slug ? "just-saved" : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {p.cover && <img src={p.cover} alt="" loading="lazy" />}
                <div className="pa-info">
                  <Link href={`/pdf/${p.slug}`} target="_blank">{p.title}</Link>
                  <div className="pa-meta">
                    <span>{formatPrice(p.price)}</span>
                    <span>{cat?.name}</span>
                    <span>{p.bundle ? `Bundle of ${bundleItems(p).length}` : `${p.pages} pages`}</span>
                    <span className={`pill ${link ? "pill-good" : "pill-warn"}`}>{link ? "Selling" : "Needs link"}</span>
                  </div>
                </div>
                <form action={saveCheckoutLink} className="pa-form">
                  <input type="hidden" name="slug" value={p.slug} />
                  <label className="sr-only" htmlFor={`url-${p.slug}`}>Checkout link for {p.title}</label>
                  <input id={`url-${p.slug}`} name="url" type="url" defaultValue={link} placeholder="Paste checkout link" />
                  <button className="btn btn-primary" type="submit">Save</button>
                  {saved === p.slug && <span className="pa-ok" role="status">Saved ✓</span>}
                  {badSlug === p.slug && (
                    <span className="pa-err" role="alert">That isn&apos;t a Lemon Squeezy checkout link. It should contain lemonsqueezy.com/buy/.</span>
                  )}
                </form>
              </li>
            );
          })}
        </ul>
        <p className="muted">To stop selling something, clear its link and press Save. The Buy button changes back to &ldquo;Checkout opens soon&rdquo;.</p>
      </div>
    </AdminShell>
  );
}
