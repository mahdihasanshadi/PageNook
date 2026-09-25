"use client";

import { useState } from "react";

const TOPICS = ["Download or file problem", "Payment or refund", "Printing help", "Question about a PDF", "Idea for a new PDF", "Something else"];

type State = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; message: string };

export function SupportForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(d.entries())),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Something went wrong.");
      setState({ kind: "ok" });
      form.reset();
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  if (state.kind === "ok") {
    return (
      <div className="support-sent" role="status">
        <h3>Thanks, your message is on its way</h3>
        <p>We usually reply within two working days, to the email you gave us.</p>
        <button type="button" className="btn btn-ghost" onClick={() => setState({ kind: "idle" })}>Send another message</button>
      </div>
    );
  }

  return (
    <form className="support-form" onSubmit={onSubmit}>
      <div className="row2">
        <label>
          <span>Your name</span>
          <input id="support-name" name="name" required autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input id="support-email" name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <div className="row2">
        <label>
          <span>What is it about?</span>
          <select id="support-topic" name="topic" defaultValue={TOPICS[0]}>
            {TOPICS.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label>
          <span>Order number <em>(optional)</em></span>
          <input id="support-order" name="orderRef" placeholder="From your receipt email" />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea id="support-message" name="message" required minLength={10} rows={6} placeholder="Tell us what happened, or what you need." />
      </label>
      <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      {state.kind === "error" && <p className="form-err" role="alert">{state.message}</p>}
      <button className="btn btn-primary btn-lg" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
