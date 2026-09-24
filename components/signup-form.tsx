"use client";

import { useState } from "react";

export const FREE_SAMPLES = [
  { label: "Big Feelings starter pack (parenting, 5 pages)", url: "/free/big-feelings-starter-pack.pdf" },
  { label: "Ship It with Claude Code sample (coding, 8 pages)", url: "/free/ship-it-with-claude-code-sample.pdf" },
];

type State = { kind: "idle" } | { kind: "sending" } | { kind: "ok"; isNew: boolean } | { kind: "error"; message: string };

export function SignupForm({
  id,
  source,
  light = false,
}: {
  id: string;
  source: string;
  light?: boolean;
}) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: data.get("email"), company: data.get("company"), source }),
      });
      const json = (await res.json()) as { ok: boolean; isNew?: boolean; error?: string };
      if (!json.ok) throw new Error(json.error ?? "Something went wrong.");
      setState({ kind: "ok", isNew: Boolean(json.isNew) });
      form.reset();
    } catch (err) {
      setState({ kind: "error", message: err instanceof Error ? err.message : "Something went wrong." });
    }
  }

  return (
    <form className={`signup${light ? " light" : ""}`} onSubmit={onSubmit} noValidate={false}>
      <label htmlFor={`${id}-email`} className="sr-only">Email address</label>
      <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
      <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <button className="btn btn-sun" type="submit" disabled={state.kind === "sending"}>
        {state.kind === "sending" ? "Sending…" : "Get my free PDF"}
      </button>
      {state.kind === "ok" && (
        <div className="msg ok" role="status">
          <p>{state.isNew ? "You're on the list! Pick your free PDF:" : "You're already on the list. Pick your free PDF:"}</p>
          <ul className="sample-links">
            {FREE_SAMPLES.map((s) => (
              <li key={s.url}><a href={s.url} download>{s.label} →</a></li>
            ))}
          </ul>
        </div>
      )}
      {state.kind === "error" && <p className="msg err" role="alert">{state.message}</p>}
      <p className="fine">No spam. We only write when a new PDF lands. Unsubscribe anytime.</p>
    </form>
  );
}
