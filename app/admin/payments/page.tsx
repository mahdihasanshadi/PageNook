import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { AdminLogin, AdminShell } from "@/components/admin-shell";
import { CopyText } from "@/components/copy-email";
import { products } from "@/lib/catalog";
import { saveWebhookSecret } from "@/lib/server/admin-actions";
import { isAdmin } from "@/lib/server/admin-session";
import { checkoutLinks, getSetting, webhookSecret } from "@/lib/server/db";

export const metadata: Metadata = { title: "Payments setup · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Step = { title: string; done: boolean; body: React.ReactNode };

export default async function AdminPayments(props: PageProps<"/admin/payments">) {
  const sp = await props.searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  if (!(await isAdmin())) return <AdminLogin next="/admin/payments" error={one(sp.error)} />;

  const h = await headers();
  const origin = `${h.get("x-forwarded-proto") ?? "https"}://${h.get("host")}`;
  const webhookUrl = `${origin}/api/webhooks/lemonsqueezy`;
  const [secret, links, lastRaw] = await Promise.all([webhookSecret(), checkoutLinks(), getSetting("last_webhook")]);
  const last = lastRaw ? (JSON.parse(lastRaw.value) as { event: string; at: string; test: boolean }) : null;
  const forSale = products.filter((p) => p.status === "available");
  const connected = forSale.filter((p) => links[p.slug] ?? p.checkoutUrl).length;
  const isLocal = origin.includes("localhost");

  const steps: Step[] = [
    {
      title: "Create your Lemon Squeezy store",
      done: connected > 0,
      body: <p>Sign up at lemonsqueezy.com, name the store <b>PageNook</b>, verify your identity and add your bank account for payouts.</p>,
    },
    {
      title: "Add your products and paste their checkout links",
      done: connected === forSale.length,
      body: (
        <p>
          Create each product in Lemon Squeezy (the upload guide has every name, price and description), then paste its
          checkout link on the <Link href="/admin/products">Products &amp; checkout</Link> page. {connected} of {forSale.length} done.
        </p>
      ),
    },
    {
      title: "Connect the webhook, so sales appear on this dashboard",
      done: Boolean(secret),
      body: (
        <>
          <p>In Lemon Squeezy go to <b>Settings → Webhooks → +</b> and fill in:</p>
          <ol className="steps-list">
            <li><b>Callback URL:</b> <CopyText text={webhookUrl} /></li>
            <li><b>Signing secret:</b> make up a password-like word (6–40 characters) and type the same one below.</li>
            <li><b>Events:</b> tick <code>order_created</code> and <code>order_refunded</code>, then save.</li>
          </ol>
          {isLocal && <p className="pa-err">You&apos;re on your own computer. Use the live website address for the webhook once the site is online.</p>}
          {secret?.source === "cloudflare" ? (
            <p className="pa-ok">The signing secret is set on the server. Nothing to do here.</p>
          ) : (
            <form action={saveWebhookSecret} className="pa-form">
              <label className="sr-only" htmlFor="secret">Signing secret</label>
              <input id="secret" name="secret" type="password" autoComplete="off" placeholder={secret ? "Saved. Type a new one to replace it" : "Signing secret"} />
              <button className="btn btn-primary" type="submit">{secret ? "Replace secret" : "Save secret"}</button>
              {one(sp.saved) === "secret" && <span className="pa-ok" role="status">Saved ✓</span>}
              {one(sp.error) === "secret" && <span className="pa-err" role="alert">Use 6 to 40 characters.</span>}
            </form>
          )}
        </>
      ),
    },
    {
      title: "Make a test purchase",
      done: Boolean(last),
      body: (
        <p>
          Turn on <b>Test mode</b> in Lemon Squeezy, buy one product on your shop with the test card{" "}
          <code>4242 4242 4242 4242</code> (any future date, any CVC), and check that the order shows up on the{" "}
          <Link href="/admin">Overview</Link> marked &ldquo;Test&rdquo;.{" "}
          {last ? <>Last message from Lemon Squeezy: <b>{last.event}</b> at {last.at.replace("T", " ").slice(0, 16)} UTC{last.test ? " (test)" : ""}.</> : "No message received yet."}
        </p>
      ),
    },
    {
      title: "Go live",
      done: false,
      body: <p>Switch Lemon Squeezy out of test mode once your store is approved. Payouts arrive twice a month, once your balance passes $50.</p>,
    },
  ];

  return (
    <AdminShell active="/admin/payments" title="Payments setup" intro="Follow these steps once. Each one turns green when it's done.">
      <ol className="setup-steps">
        {steps.map((s, i) => (
          <li key={s.title} className={s.done ? "done" : "todo"}>
            <span className="num" aria-hidden="true">{s.done ? "✓" : i + 1}</span>
            <div>
              <h2>{s.title}<span className="sr-only">{s.done ? " (done)" : " (not done yet)"}</span></h2>
              {s.body}
            </div>
          </li>
        ))}
      </ol>
    </AdminShell>
  );
}
