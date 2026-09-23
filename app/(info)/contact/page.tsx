import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "@/components/copy-email";
import { site } from "@/lib/catalog";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with PageNook." };

export default function ContactPage() {
  return (
    <div className="container">
      <div className="page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Contact</span></div>
        <h1>Say hello</h1>
        <p className="lead">Questions about an order, a problem with a file, or an idea for a new PDF? Email us.</p>
      </div>
      <div className="doc">
        <div className="card"><CopyEmail email={site.email} /></div>
        <p>We usually reply within two working days. For order questions, include the email you used at checkout.</p>
        <p>Looking for a refund? See the <Link href="/refunds">refund policy</Link>.</p>
      </div>
    </div>
  );
}
