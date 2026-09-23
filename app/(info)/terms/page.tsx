import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/catalog";

export const metadata: Metadata = { title: "Terms", description: "Terms of use for PageNook and its PDFs." };

export default function TermsPage() {
  return (
    <div className="container">
      <div className="page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Terms</span></div>
        <h1>Terms of use</h1>
        <p className="updated">Last updated 23 September 2026</p>
      </div>
      <div className="doc">
        <p>These terms apply when you use pagenook.me or buy a PDF from PageNook, run by {site.owner}. By buying or using the site you agree to them.</p>
        <h2>Buying</h2>
        <p>
          Orders are processed by our payment partner, which acts as the seller of record. It handles payment, sales tax and
          delivery of your download link, and its own terms apply to the checkout. Prices are shown in US dollars.
        </p>
        <h2>Your licence</h2>
        <ul>
          <li>Each PDF is licensed to you for personal use. You may keep it, read it on your devices and print copies for yourself or your own household or classroom.</li>
          <li>You may not resell, share, upload or redistribute the file, in whole or in part, or claim it as your own work.</li>
          <li>All content remains the copyright of PageNook and its authors.</li>
        </ul>
        <h2>Accuracy</h2>
        <p>
          We work hard to keep every PDF accurate and up to date, but tools and websites change. Guides are for education
          and don&apos;t replace professional, legal, medical or financial advice.
        </p>
        <h2>Refunds</h2>
        <p>See our <Link href="/refunds">refund policy</Link>.</p>
        <h2>Changes and contact</h2>
        <p>We may update these terms; the date above shows the latest version. Questions: <strong>{site.email}</strong>.</p>
      </div>
    </div>
  );
}
