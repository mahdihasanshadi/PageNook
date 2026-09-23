import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { endAdminSession, isAdmin, startAdminSession } from "@/lib/server/admin-session";
import { dashboardData } from "@/lib/server/db";

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

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

function money(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function AdminPage(props: PageProps<"/admin">) {
  if (!(await isAdmin())) {
    const { error } = await props.searchParams;
    return (
      <div className="container page-head">
        <h1>Shop admin</h1>
        <form action={login} className="login" style={{ marginTop: 20 }}>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
          {error === "wrong" && <p className="err">That password isn&apos;t right.</p>}
          {error === "not-configured" && (
            <p className="err">Admin isn&apos;t set up yet: add an ADMIN_PASSWORD secret (12+ characters).</p>
          )}
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    );
  }

  const d = await dashboardData();
  return (
    <div className="container">
      <div className="page-head" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap" }}>
        <h1>Shop admin</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <a className="btn btn-ghost" href="/admin/subscribers.csv">Export emails (CSV)</a>
          <form action={logout}><button className="btn btn-primary" type="submit">Sign out</button></form>
        </div>
      </div>
      <section className="section" style={{ display: "grid", gap: 28 }}>
        <div className="stats">
          <div className="stat"><b>{d.paidOrders}</b><span>Paid orders (live)</span></div>
          <div className="stat"><b>{money(d.revenueCents)}</b><span>Revenue before fees</span></div>
          <div className="stat"><b>{d.subscriberCount}</b><span>Email subscribers</span></div>
        </div>

        <div>
          <h2 style={{ marginBottom: 12, color: "var(--indigo)" }}>Recent orders</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Product</th><th>Email</th><th>Total</th><th>Status</th></tr></thead>
              <tbody>
                {d.orders.length === 0 && <tr><td colSpan={5}>No orders yet. They appear here as soon as the payment webhook is connected.</td></tr>}
                {d.orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.created_at.slice(0, 16)}</td>
                    <td>{o.product_name ?? "-"}</td>
                    <td>{o.email ?? "-"}</td>
                    <td>{money(o.total_cents)}</td>
                    <td>{o.status}{o.test_mode ? " (test)" : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: 12, color: "var(--indigo)" }}>Newest subscribers</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Date</th><th>Email</th><th>Signed up from</th></tr></thead>
              <tbody>
                {d.subscribers.length === 0 && <tr><td colSpan={3}>No subscribers yet.</td></tr>}
                {d.subscribers.map((s) => (
                  <tr key={s.id}><td>{s.created_at.slice(0, 16)}</td><td>{s.email}</td><td>{s.source}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
