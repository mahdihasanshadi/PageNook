import { addSupportMessage } from "@/lib/server/db";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TOPICS = ["Download or file problem", "Payment or refund", "Printing help", "Question about a PDF", "Idea for a new PDF", "Something else"];

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Send the form as JSON." }, { status: 400 });
  }
  // Honeypot: people never see or fill the "company" field.
  if (typeof body.company === "string" && body.company.trim() !== "") return Response.json({ ok: true });

  const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const name = text(body.name, 80);
  const email = text(body.email, 254).toLowerCase();
  const topic = TOPICS.includes(text(body.topic, 60)) ? text(body.topic, 60) : "Something else";
  const orderRef = text(body.orderRef, 80) || null;
  const message = text(body.message, 4000);

  if (!name) return Response.json({ ok: false, error: "Please tell us your name." }, { status: 422 });
  if (!EMAIL.test(email)) return Response.json({ ok: false, error: "That email address doesn't look right." }, { status: 422 });
  if (message.length < 10) return Response.json({ ok: false, error: "Please add a little more detail to your message." }, { status: 422 });

  try {
    await addSupportMessage({ name, email, topic, orderRef, message });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("support message failed", err);
    return Response.json({ ok: false, error: "We couldn't send that right now. Please try again in a minute." }, { status: 500 });
  }
}
