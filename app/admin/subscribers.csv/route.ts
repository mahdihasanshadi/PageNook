import { isAdmin } from "@/lib/server/admin-session";
import { allSubscribers } from "@/lib/server/db";

export const dynamic = "force-dynamic";

function cell(v: string) {
  // Quote every cell and neutralise spreadsheet formulas.
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) return new Response("Not signed in", { status: 401 });
  const rows = await allSubscribers();
  const csv = ["email,source,created_at", ...rows.map((r) => [r.email, r.source, r.created_at].map(cell).join(","))].join(
    "\n",
  );
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="pagenook-subscribers.csv"',
      "cache-control": "no-store",
    },
  });
}
