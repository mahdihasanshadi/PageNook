import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

type Secrets = {
  ADMIN_PASSWORD?: string;
  LEMONSQUEEZY_WEBHOOK_SECRET?: string;
};

export async function getEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env as CloudflareEnv & Secrets;
}

export async function getDb() {
  return (await getEnv()).DB;
}

export type Subscriber = { id: number; email: string; source: string; created_at: string };
export type Order = {
  id: number;
  provider_order_id: string;
  email: string | null;
  product_name: string | null;
  total_cents: number;
  currency: string;
  status: string;
  test_mode: number;
  created_at: string;
};

/** Returns true when the email is new, false when it was already on the list. */
export async function addSubscriber(email: string, source: string) {
  const db = await getDb();
  const res = await db
    .prepare("INSERT INTO subscribers (email, source) VALUES (?1, ?2) ON CONFLICT(email) DO NOTHING")
    .bind(email, source)
    .run();
  return (res.meta.changes ?? 0) > 0;
}

export async function upsertOrder(o: {
  providerOrderId: string;
  email: string | null;
  productName: string | null;
  totalCents: number;
  currency: string;
  status: string;
  testMode: boolean;
}) {
  const db = await getDb();
  await db
    .prepare(
      `INSERT INTO orders (provider_order_id, email, product_name, total_cents, currency, status, test_mode)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
       ON CONFLICT(provider_order_id) DO UPDATE SET
         status = excluded.status, updated_at = datetime('now')`,
    )
    .bind(o.providerOrderId, o.email, o.productName, o.totalCents, o.currency, o.status, o.testMode ? 1 : 0)
    .run();
}

export type DailySales = { day: string; orders: number; cents: number };
export type ProductSales = { product_name: string; orders: number; cents: number };

export async function dashboardData() {
  const db = await getDb();
  const live = "status = 'paid' AND test_mode = 0";
  const [subs, orders, subCount, sales, refunds, newSubs, daily, byProduct, testOrders] = await db.batch([
    db.prepare("SELECT * FROM subscribers ORDER BY created_at DESC, id DESC LIMIT 25"),
    db.prepare("SELECT * FROM orders ORDER BY created_at DESC, id DESC LIMIT 25"),
    db.prepare("SELECT COUNT(*) AS n FROM subscribers"),
    db.prepare(`SELECT COUNT(*) AS n, COALESCE(SUM(total_cents), 0) AS cents FROM orders WHERE ${live}`),
    db.prepare("SELECT COUNT(*) AS n, COALESCE(SUM(total_cents), 0) AS cents FROM orders WHERE status = 'refunded' AND test_mode = 0"),
    db.prepare("SELECT COUNT(*) AS n FROM subscribers WHERE created_at >= datetime('now', '-7 days')"),
    db.prepare(
      `SELECT date(created_at) AS day, COUNT(*) AS orders, SUM(total_cents) AS cents FROM orders
       WHERE ${live} AND created_at >= date('now', '-29 days') GROUP BY day ORDER BY day`,
    ),
    db.prepare(
      `SELECT COALESCE(product_name, 'Unknown') AS product_name, COUNT(*) AS orders, SUM(total_cents) AS cents
       FROM orders WHERE ${live} GROUP BY product_name ORDER BY cents DESC`,
    ),
    db.prepare("SELECT COUNT(*) AS n FROM orders WHERE test_mode = 1"),
  ]);
  const one = (r: D1Result) => r.results[0] as { n: number; cents?: number };
  return {
    subscribers: subs.results as Subscriber[],
    orders: orders.results as Order[],
    subscriberCount: one(subCount).n,
    newSubscribers7d: one(newSubs).n,
    paidOrders: one(sales).n,
    revenueCents: one(sales).cents ?? 0,
    refundedOrders: one(refunds).n,
    refundedCents: one(refunds).cents ?? 0,
    testOrders: one(testOrders).n,
    daily: daily.results as DailySales[],
    byProduct: byProduct.results as ProductSales[],
  };
}

export async function dbIsUp() {
  try {
    await (await getDb()).prepare("SELECT 1").first();
    return true;
  } catch {
    return false;
  }
}

// ---------- settings managed from the dashboard ----------

export async function getSetting(key: string) {
  const row = await (await getDb()).prepare("SELECT value, updated_at FROM settings WHERE key = ?1").bind(key).first<{ value: string; updated_at: string }>();
  return row ?? null;
}

export async function setSetting(key: string, value: string) {
  await (await getDb())
    .prepare("INSERT INTO settings (key, value) VALUES (?1, ?2) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = datetime('now')")
    .bind(key, value)
    .run();
}

/** The webhook signing secret: a Cloudflare secret wins, otherwise the one saved in the dashboard. */
export async function webhookSecret() {
  const { LEMONSQUEEZY_WEBHOOK_SECRET } = await getEnv();
  if (LEMONSQUEEZY_WEBHOOK_SECRET) return { secret: LEMONSQUEEZY_WEBHOOK_SECRET, source: "cloudflare" as const };
  const saved = await getSetting("ls_webhook_secret");
  return saved ? { secret: saved.value, source: "dashboard" as const } : null;
}

// ---------- checkout links ----------

export async function checkoutLinks() {
  const res = await (await getDb()).prepare("SELECT slug, checkout_url FROM product_links").all<{ slug: string; checkout_url: string }>();
  return Object.fromEntries(res.results.map((r) => [r.slug, r.checkout_url])) as Record<string, string>;
}

export async function setCheckoutLink(slug: string, url: string | null) {
  const db = await getDb();
  if (url) {
    await db
      .prepare("INSERT INTO product_links (slug, checkout_url) VALUES (?1, ?2) ON CONFLICT(slug) DO UPDATE SET checkout_url = excluded.checkout_url, updated_at = datetime('now')")
      .bind(slug, url)
      .run();
  } else {
    await db.prepare("DELETE FROM product_links WHERE slug = ?1").bind(slug).run();
  }
}

export async function allSubscribers() {
  const db = await getDb();
  const res = await db.prepare("SELECT email, source, created_at FROM subscribers ORDER BY id").all();
  return res.results as Pick<Subscriber, "email" | "source" | "created_at">[];
}
