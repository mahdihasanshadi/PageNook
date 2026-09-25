import Link from "next/link";
import { login, logout } from "@/lib/server/admin-actions";
import { newSupportCount } from "@/lib/server/db";

const tabs = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products & checkout" },
  { href: "/admin/payments", label: "Payments setup" },
  { href: "/admin/messages", label: "Messages" },
];

export function AdminLogin({ next, error }: { next: string; error?: string }) {
  return (
    <div className="container admin-login">
      <div className="card login">
        <h1>Shop admin</h1>
        <p>Sign in to manage your sales, products and payments.</p>
        <form action={login} style={{ display: "grid", gap: 12 }}>
          <input type="hidden" name="next" value={next} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required autoComplete="current-password" />
          {error === "wrong" && <p className="err">That password isn&apos;t right.</p>}
          {error === "not-configured" && <p className="err">Admin isn&apos;t set up yet: add an ADMIN_PASSWORD secret (12+ characters).</p>}
          <button className="btn btn-primary" type="submit">Sign in</button>
        </form>
      </div>
    </div>
  );
}

export async function AdminShell({ active, title, intro, children }: { active: string; title: string; intro?: string; children: React.ReactNode }) {
  const unread = await newSupportCount();
  return (
    <div className="container admin">
      <div className="admin-head">
        <div>
          <span className="kicker">PageNook admin</span>
          <h1>{title}</h1>
          {intro && <p className="admin-intro">{intro}</p>}
        </div>
        <div className="admin-actions">
          <Link className="btn btn-ghost" href="/">View shop</Link>
          <form action={logout}><button className="btn btn-primary" type="submit">Sign out</button></form>
        </div>
      </div>
      <nav className="admin-tabs" aria-label="Admin sections">
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} aria-current={t.href === active ? "page" : undefined}>
            {t.label}
            {t.href === "/admin/messages" && unread > 0 && <span className="tab-badge">{unread} new</span>}
          </Link>
        ))}
      </nav>
      {children}
    </div>
  );
}
