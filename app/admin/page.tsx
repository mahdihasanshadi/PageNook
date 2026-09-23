import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { formatPrice, products } from "@/lib/catalog";
import { endAdminSession, isAdmin, startAdminSession } from "@/lib/server/admin-session";
import { dashboardData, dbIsUp, getEnv, type DailySales } from "@/lib/server/db";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

// Lemon Squeezy's standard fee: 5% + 50¢ per order. Payout and bank charges are extra.
const FEE_RATE = 0.05;
const FEE_FIXED_CENTS = 50;

async function login(formData: FormData) {
  "use server";
  const result = await startAdminSession(String(formData.get("password") ?? ""));
  redirect(result === "ok" ? "/admin" : `/admin?error=${result}`);
}

async function logout() {
  "use server";
  await endAdminSession();
  redirect("/admin");
}

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;

function last30Days(rows: DailySales[]) {
  const byDay = new Map(rows.map((r) => [r.day, r]));
  const days: DailySales[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    const key = d.toISOString().slice(0, 10);
    days.push(byDay.get(key) ?? { day: key, orders: 0, cents: 0 });
  }
  return days;
}

function shortDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

function SalesChart({ rows }: { rows: DailySales[] }) {
  const days = last30Days(rows);
  const max = Math.max(...days.map((d) => d.cents));
  // Round the axis top up to a friendly number of dollars.
  const top = max === 0 ? 100 : Math.ceil(max / 100 / 2) * 2 * 100;
  const total = days.reduce((s, d) => s + d.cents, 0);
  const count = days.reduce((s, d) => s + d.orders, 0);
  return (
    <div className="panel">
      <div className="panel-head">
        <div>
          <h2>Sales, last 30 days</h2>
          <p>{count} order{count === 1 ? "" : "s"} · {money(total)} before fees</p>
        </div>
      </div>
      <div className="chart" role="img" aria-label={`Daily sales for the last 30 days, ${money(total)} in total`}>
        <div className="chart-y" aria-hidden="true">
          <span>{money(top)}</span>
          <span>{money(top / 2)}</span>
          <span>$0</span>
        </div>
        <div className="chart-plot">
          <div className="chart-grid" aria-hidden="true"><i /><i /><i /></div>
          <div className="chart-bars">
            {days.map((d) => (
              <div className="bar-col" key={d.day} tabIndex={0} aria-label={`${shortDate(d.day)}: ${d.orders} orders, ${money(d.cents)}`}>
                <div className="bar" style={{ height: `${(d.cents / top) * 100}%` }} />
                <div className="tip" role="tooltip">
                  <b>{shortDate(d.day)}</b>
                  {d.orders} order{d.orders === 1 ? "" : "s"} · {money(d.cents)}
                </div>
              </div>
            ))}
          </div>
          <div className="chart-x" aria-hidden="true">
            <span>{shortDate(days[0].day)}</span>
            <span>{shortDate(days[15].day)}</span>
            <span>Today</span>
          </div>
        </div>
      </div>
      {count === 0 && <p className="chart-empty">No live sales yet. Bars appear here as orders come in.</p>}
    </div>
  );
}

export default async function AdminPage(props: PageProps<"/admin">) {
  if (!(await isAdmin())) {
    const { error } = await props.searchParams;
    return (
      <div className="container admin-login">
        <div className="card login">
          <h1>Shop admin</h1>
          <p>Sign in to see your sales and subscribers.</p>
          <form action={login} style={{ display: "grid", gap: 12 }}>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" />
            {error === "wrong" && <p className="err">That password isn&apos;t right.</p>}
            {error === "not-configured" && (
              <p className="err">Admin isn&apos;t set up yet: add an ADMIN_PASSWORD secret (12+ characters).</p>
            )}
            <button className="btn btn-primary" type="submit">Sign in</button>
          </form>
        </div>
      </div>
    );
  }

  const [d, env, dbUp] = await Promise.all([dashboardData(), getEnv(), dbIsUp()]);
  const feesCents = Math.round(d.revenueCents * FEE_RATE) + d.paidOrders * FEE_FIXED_CENTS;
  const netCents = Math.max(0, d.revenueCents - feesCents);
  const forSale = products.filter((p) => p.status === "available");
  const connected = forSale.filter((p) => p.checkoutUrl).length;
  const maxProduct = Math.max(1, ...d.byProduct.map((p) => p.cents));

  const setup = [
    { done: dbUp, label: "Database connected" },
    { done: Boolean(env.LEMONSQUEEZY_WEBHOOK_SECRET), label: "Payment webhook secret set" },
    { done: forSale.length > 0 && connected === forSale.length, label: `Checkout links connected (${connected} of ${forSale.length} PDFs)` },
    { done: d.paidOrders > 0, label: "First live sale" },
  ];

  return (
    <div className="container admin">
      <div className="admin-head">
        <div>
          <span className="kicker">PageNook</span>
          <h1>Shop admin</h1>
        </div>
        <div className="admin-actions">
          <Link className="btn btn-ghost" href="/">View shop</Link>
          <a className="btn btn-ghost" href="/admin/subscribers.csv">Export emails</a>
          <form action={logout}><button className="btn btn-primary" type="submit">Sign out</button></form>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi hero-kpi">
          <span>Your estimated earnings</span>
          <b>{money(netCents)}</b>
          <small>After Lemon Squeezy fees (5% + 50¢ per order). Bank charges not included.</small>
        </div>
        <div className="kpi"><span>Sales before fees</span><b>{money(d.revenueCents)}</b><small>{money(feesCents)} in fees</small></div>
        <div className="kpi"><span>Paid orders</span><b>{d.paidOrders}</b><small>{d.refundedOrders} refunded{d.testOrders ? ` · ${d.testOrders} test` : ""}</small></div>
        <div className="kpi"><span>Email subscribers</span><b>{d.subscriberCount}</b><small>+{d.newSubscribers7d} in the last 7 days</small></div>
      </div>

      <div className="admin-grid">
        <SalesChart rows={d.daily} />
        <div className="panel">
          <div className="panel-head"><div><h2>Store setup</h2><p>What&apos;s ready to take money</p></div></div>
          <ul className="setup">
            {setup.map((s) => (
              <li key={s.label} className={s.done ? "done" : "todo"}>
                <span className="dot" aria-hidden="true">{s.done ? "✓" : "!"}</span>
                <span>{s.label}</span>
                <span className="sr-only">{s.done ? "done" : "not done yet"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="admin-grid">
        <div className="panel">
          <div className="panel-head"><div><h2>Sales by PDF</h2><p>Live orders only</p></div></div>
          {d.byProduct.length === 0 ? (
            <p className="muted">No sales yet.</p>
          ) : (
            <ul className="by-product">
              {d.byProduct.map((p) => (
                <li key={p.product_name}>
                  <div className="row"><span>{p.product_name}</span><b>{money(p.cents)}</b></div>
                  <div className="track"><i style={{ width: `${(p.cents / maxProduct) * 100}%` }} /></div>
                  <small>{p.orders} order{p.orders === 1 ? "" : "s"}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="panel">
          <div className="panel-head"><div><h2>Catalog</h2><p>{products.length} PDFs · {forSale.length} on sale</p></div></div>
          <ul className="catalog-list">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/pdf/${p.slug}`}>{p.title}</Link>
                <span className="price-sm">{formatPrice(p.price)}</span>
                <span className={`pill ${p.status === "available" ? (p.checkoutUrl ? "pill-good" : "pill-warn") : "pill-muted"}`}>
                  {p.status === "available" ? (p.checkoutUrl ? "Selling" : "Needs checkout link") : "Coming soon"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><div><h2>Recent orders</h2><p>Newest first</p></div></div>
        <div className="table-wrap flat">
          <table>
            <thead><tr><th>Date</th><th>PDF</th><th>Buyer</th><th className="num">Total</th><th>Status</th></tr></thead>
            <tbody>
              {d.orders.length === 0 && <tr><td colSpan={5} className="muted">No orders yet. They appear here as soon as the payment webhook is connected.</td></tr>}
              {d.orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.created_at.slice(0, 16)}</td>
                  <td>{o.product_name ?? "-"}</td>
                  <td>{o.email ?? "-"}</td>
                  <td className="num">{money(o.total_cents)}</td>
                  <td>
                    <span className={`pill ${o.test_mode ? "pill-muted" : o.status === "paid" ? "pill-good" : o.status === "refunded" ? "pill-bad" : "pill-warn"}`}>
                      {o.test_mode ? "Test" : o.status === "paid" ? "Paid" : o.status === "refunded" ? "Refunded" : o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head"><div><h2>Newest subscribers</h2><p>{d.subscriberCount} in total</p></div></div>
        <div className="table-wrap flat">
          <table>
            <thead><tr><th>Date</th><th>Email</th><th>Signed up from</th></tr></thead>
            <tbody>
              {d.subscribers.length === 0 && <tr><td colSpan={3} className="muted">No subscribers yet.</td></tr>}
              {d.subscribers.map((s) => (
                <tr key={s.id}><td>{s.created_at.slice(0, 16)}</td><td>{s.email}</td><td>{s.source}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
