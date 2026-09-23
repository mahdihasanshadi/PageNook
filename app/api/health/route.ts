import { getDb } from "@/lib/server/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await (await getDb()).prepare("SELECT 1").first();
    return Response.json({ ok: true, db: "up" });
  } catch {
    return Response.json({ ok: false, db: "down" }, { status: 503 });
  }
}
