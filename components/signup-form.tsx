"use client";

import { useState } from "react";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "ok"; isNew: boolean } | { kind: "error"; message: string };

export function SignupForm({
  id,
  source,
  light = false,
  sampleUrl = "/free/ship-it-with-claude-code-sample.pdf",
}: {
  id: string;
  source: string;
  light?: boolean;
  sampleUrl?: string;
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
        <p className="msg ok" role="status">
          {state.isNew ? "You're on the list! " : "You're already on the list. "}
          <a href={sampleUrl} download>Download your free sample now →</a>
        </p>
      )}
      {state.kind === "error" && <p className="msg err" role="alert">{state.message}</p>}
      <p className="fine">No spam. We only write when a new PDF lands. Unsubscribe anytime.</p>
    </form>
  );
}
