import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/catalog";

export const metadata: Metadata = { title: "Privacy", description: "What PageNook collects and how it's used." };

export default function PrivacyPage() {
  return (
    <div className="container">
      <div className="page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Privacy</span></div>
        <h1>Privacy policy</h1>
        <p className="updated">Last updated 23 September 2026</p>
      </div>
      <div className="doc">
        <p>We collect as little as possible, and we never sell your data.</p>
        <h2>What we collect</h2>
        <ul>
          <li><strong>Your email</strong>, if you join the list for the free sample. We store it with the date you joined.</li>
          <li><strong>Order details</strong> (order number, email, product, amount, status) that our payment partner sends us when you buy, so we can help with your order.</li>
          <li>Basic technical logs from our hosting provider, such as request times and errors, used to keep the site running.</li>
        </ul>
        <h2>What we don&apos;t collect</h2>
        <p>We never see or store your card details. Payment is handled entirely by our payment partner. We don&apos;t use advertising trackers.</p>
        <h2>How we use it</h2>
        <ul>
          <li>To send the free sample and occasional emails about new PDFs (you can unsubscribe anytime).</li>
          <li>To answer questions about orders and handle refunds.</li>
        </ul>
        <h2>Your choices</h2>
        <p>Email <strong>{site.email}</strong> to unsubscribe, see what we hold about you, or have it deleted. We&apos;ll act on it within 30 days.</p>
        <p>See also our <Link href="/terms">terms</Link>.</p>
      </div>
    </div>
  );
}
