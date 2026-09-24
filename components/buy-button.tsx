"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  slug: string;
  price: string; // already formatted, e.g. "$0.99"
  available: boolean;
  freeSample?: string;
};

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
  }
}

let linksPromise: Promise<Record<string, string>> | null = null;
function loadLinks() {
  linksPromise ??= fetch("/api/checkout-links").then((r) => (r.ok ? r.json() : {})).catch(() => ({}));
  return linksPromise;
}

function loadLemonJs() {
  if (document.querySelector("script[data-lemon]")) {
    window.createLemonSqueezy?.();
    return;
  }
  const s = document.createElement("script");
  s.src = "https://app.lemonsqueezy.com/js/lemon.js";
  s.defer = true;
  s.dataset.lemon = "1";
  s.onload = () => window.createLemonSqueezy?.();
  document.body.appendChild(s);
}

export function BuyButton({ slug, price, available, freeSample }: Props) {
  // undefined = still loading, null = no checkout link yet
  const [url, setUrl] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!available) return;
    let alive = true;
    loadLinks().then((links) => alive && setUrl(links[slug] ?? null));
    return () => {
      alive = false;
    };
  }, [slug, available]);

  useEffect(() => {
    if (url) loadLemonJs();
  }, [url]);

  const sample = freeSample && (
    <a className="btn btn-ghost" href={freeSample} download>
      Free sample
    </a>
  );

  if (!available) {
    return (
      <Link className="btn btn-primary btn-lg" href="/free">
        Notify me when it&apos;s ready
      </Link>
    );
  }
  if (url) {
    const sep = url.includes("?") ? "&" : "?";
    return (
      <>
        {/* lemon.js turns this into an overlay checkout; without it, the link opens the checkout page. */}
        <a className="btn btn-primary btn-lg lemonsqueezy-button" href={`${url}${sep}embed=1&media=0`}>
          Buy now · {price}
        </a>
        {sample}
      </>
    );
  }
  return (
    <>
      <button className="btn btn-primary btn-lg" type="button" disabled>
        {url === undefined ? "Loading…" : `Checkout opens soon · ${price}`}
      </button>
      {sample}
    </>
  );
}
