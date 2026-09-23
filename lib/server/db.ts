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

export async function dashboardData() {
  const db = await getDb();
  const [subs, orders, subCount, sales] = await db.batch([
    db.prepare("SELECT * FROM subscribers ORDER BY created_at DESC, id DESC LIMIT 50"),
    db.prepare("SELECT * FROM orders ORDER BY created_at DESC, id DESC LIMIT 50"),
    db.prepare("SELECT COUNT(*) AS n FROM subscribers"),
    db.prepare(
      "SELECT COUNT(*) AS n, COALESCE(SUM(total_cents), 0) AS cents FROM orders WHERE status = 'paid' AND test_mode = 0",
    ),
  ]);
  return {
    subscribers: subs.results as Subscriber[],
    orders: orders.results as Order[],
    subscriberCount: (subCount.results[0] as { n: number }).n,
    paidOrders: (sales.results[0] as { n: number; cents: number }).n,
    revenueCents: (sales.results[0] as { n: number; cents: number }).cents,
  };
}

export async function allSubscribers() {
  const db = await getDb();
  const res = await db.prepare("SELECT email, source, created_at FROM subscribers ORDER BY id").all();
  return res.results as Pick<Subscriber, "email" | "source" | "created_at">[];
}
