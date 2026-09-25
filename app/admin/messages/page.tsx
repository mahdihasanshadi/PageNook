import type { Metadata } from "next";
import { AdminLogin, AdminShell } from "@/components/admin-shell";
import { markMessage } from "@/lib/server/admin-actions";
import { isAdmin } from "@/lib/server/admin-session";
import { supportMessages } from "@/lib/server/db";

export const metadata: Metadata = { title: "Messages · Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminMessages(props: PageProps<"/admin/messages">) {
  const sp = await props.searchParams;
  if (!(await isAdmin())) return <AdminLogin next="/admin/messages" error={typeof sp.error === "string" ? sp.error : undefined} />;
  const messages = await supportMessages();
  const open = messages.filter((m) => m.status === "new").length;

  return (
    <AdminShell active="/admin/messages" title="Messages" intro="Everything customers send from the Support page. Reply by email, then mark it done.">
      {messages.length === 0 ? (
        <div className="empty"><h3>No messages yet</h3><p>When someone uses the form on the Support page, it appears here.</p></div>
      ) : (
        <>
          <p className="muted">{open} waiting for a reply · {messages.length - open} done</p>
          <ul className="messages">
            {messages.map((m) => (
              <li key={m.id} className={m.status === "done" ? "is-done" : undefined}>
                <div className="msg-head">
                  <div>
                    <b>{m.name}</b> <span className="muted">&lt;{m.email}&gt;</span>
                    <div className="msg-meta">
                      <span className="pill pill-muted">{m.topic}</span>
                      {m.order_ref && <span>Order: {m.order_ref}</span>}
                      <span>{m.created_at.slice(0, 16)} UTC</span>
                    </div>
                  </div>
                  <div className="msg-actions">
                    <a className="btn btn-ghost btn-sm" href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.topic} (PageNook)`)}`}>Reply by email</a>
                    <form action={markMessage}>
                      <input type="hidden" name="id" value={m.id} />
                      <input type="hidden" name="status" value={m.status === "done" ? "new" : "done"} />
                      <button className={`btn btn-sm ${m.status === "done" ? "btn-ghost" : "btn-primary"}`} type="submit">
                        {m.status === "done" ? "Reopen" : "Mark done"}
                      </button>
                    </form>
                  </div>
                </div>
                <p className="msg-body">{m.message}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </AdminShell>
  );
}
