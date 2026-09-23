import { addSubscriber } from "@/lib/server/db";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; source?: unknown; company?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Send the form as JSON." }, { status: 400 });
  }

  // Honeypot: real people never see or fill the "company" field.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return Response.json({ ok: true, isNew: false });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL.test(email) || email.length > 254) {
    return Response.json({ ok: false, error: "That email address doesn't look right." }, { status: 422 });
  }
  const source = typeof body.source === "string" ? body.source.slice(0, 40) : "site";

  try {
    const isNew = await addSubscriber(email, source);
    return Response.json({ ok: true, isNew });
  } catch (err) {
    console.error("subscribe failed", err);
    return Response.json({ ok: false, error: "We couldn't save that right now. Please try again." }, { status: 500 });
  }
}
