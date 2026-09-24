import { setSetting, upsertOrder, webhookSecret } from "@/lib/server/db";
import { verifyHmacHex } from "@/lib/server/crypto";

// Lemon Squeezy signs each webhook body with the signing secret you set in
// Settings → Webhooks, and sends the hex HMAC-SHA256 in the X-Signature header.

type OrderEvent = {
  meta?: { event_name?: string; test_mode?: boolean };
  data?: {
    id?: string;
    attributes?: {
      user_email?: string;
      total?: number;
      currency?: string;
      status?: string;
      first_order_item?: { product_name?: string; variant_name?: string };
    };
  };
};

const HANDLED = new Set(["order_created", "order_refunded"]);

export async function POST(request: Request) {
  const configured = await webhookSecret();
  if (!configured) return new Response("Webhook secret not configured", { status: 503 });
  const { secret } = configured;

  const raw = await request.text();
  const signature = request.headers.get("x-signature") ?? "";
  if (!(await verifyHmacHex(secret, raw, signature))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let event: OrderEvent;
  try {
    event = JSON.parse(raw);
  } catch {
    return new Response("Invalid JSON", { status: 400 });
  }

  const name = event.meta?.event_name ?? "";
  // Shown on the dashboard's Payments page so the owner can see the connection works.
  await setSetting("last_webhook", JSON.stringify({ event: name, at: new Date().toISOString(), test: Boolean(event.meta?.test_mode) }));
  if (!HANDLED.has(name)) return Response.json({ ok: true, ignored: name });

  const a = event.data?.attributes ?? {};
  const id = event.data?.id;
  if (!id) return new Response("Missing order id", { status: 400 });

  await upsertOrder({
    providerOrderId: String(id),
    email: a.user_email ?? null,
    productName: a.first_order_item?.product_name ?? null,
    totalCents: typeof a.total === "number" ? a.total : 0,
    currency: a.currency ?? "USD",
    status: name === "order_refunded" ? "refunded" : (a.status ?? "paid"),
    testMode: Boolean(event.meta?.test_mode),
  });

  return Response.json({ ok: true });
}
