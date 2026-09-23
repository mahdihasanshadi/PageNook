import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/catalog";

export const metadata: Metadata = { title: "Refund policy", description: "PageNook's refund policy for digital PDFs." };

export default function RefundsPage() {
  return (
    <div className="container">
      <div className="page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Refund policy</span></div>
        <h1>Refund policy</h1>
        <p className="updated">Last updated 23 September 2026</p>
      </div>
      <div className="doc">
        <p>PageNook sells digital PDFs that you can download straight away. We want you to be happy with every one.</p>
        <h2>When you can get a refund</h2>
        <ul>
          <li>The file is damaged, won&apos;t open, or is missing pages.</li>
          <li>The PDF is clearly different from its description on our site.</li>
          <li>You were charged twice for the same PDF by mistake.</li>
        </ul>
        <p>Email <strong>{site.email}</strong> within <strong>14 days</strong> of your purchase with your order email and what went wrong. We&apos;ll either send a fixed file or refund you in full.</p>
        <h2>When we can&apos;t refund</h2>
        <p>Because PDFs are delivered instantly and can&apos;t be returned, we don&apos;t offer refunds simply for a change of mind after downloading. If you&apos;re unsure, read the free sample and preview pages first.</p>
        <h2>How refunds are paid</h2>
        <p>Refunds go back to your original payment method through our payment partner. It can take 5–10 business days to appear, depending on your bank.</p>
      </div>
    </div>
  );
}
