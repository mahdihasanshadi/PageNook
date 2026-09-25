import type { Metadata } from "next";
import Link from "next/link";
import { ChatCircleDots, CreditCard, DownloadSimple, Lightbulb, Printer } from "@phosphor-icons/react/ssr";
import { CopyEmail } from "@/components/copy-email";
import { SupportForm } from "@/components/support-form";
import { site } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Support",
  description: "Help with downloads, payments, refunds and printing, or send the PageNook team a message.",
};

const topics = [
  { icon: DownloadSimple, title: "Downloads", text: "Where your PDF is, and how to download it again.", href: "#downloads" },
  { icon: CreditCard, title: "Payments & refunds", text: "Payment methods, receipts and our 14-day promise.", href: "#payments" },
  { icon: Printer, title: "Printing", text: "Getting the size right on A4 or US Letter.", href: "#printing" },
  { icon: Lightbulb, title: "Ideas & requests", text: "Tell us which PDF you'd love to see next.", href: "#contact" },
];

const faqs: { id: string; group: string; items: { q: string; a: React.ReactNode }[] }[] = [
  {
    id: "downloads",
    group: "Downloads",
    items: [
      { q: "Where is my PDF after I pay?", a: "The download button appears on screen straight after payment, and the same link is emailed to you with your receipt." },
      { q: "I lost the file. Can I download it again?", a: "Yes. Open the receipt email from our payment partner and use the download link again. If you can't find the email, send us a message with the email you used at checkout." },
      { q: "I didn't get the email.", a: "Check your spam or promotions folder for a receipt from our payment partner (Lemon Squeezy). Still nothing after 15 minutes? Message us and we'll sort it out." },
      { q: "Which files do I get?", a: "Guides are one PDF. Printables come in two sizes: A4 (most of the world) and US Letter (USA and Canada). Bundles include every file of every PDF inside." },
    ],
  },
  {
    id: "payments",
    group: "Payments & refunds",
    items: [
      { q: "How can I pay?", a: "By card or PayPal. Payments are handled securely by our payment partner, which also takes care of any sales tax. We never see your card details." },
      { q: "What's your refund policy?", a: <>If a file is faulty, won&apos;t open, or isn&apos;t what the description says, tell us within 14 days and we&apos;ll fix it or refund you. See the full <Link href="/refunds">refund policy</Link>.</> },
      { q: "Can I get an invoice?", a: "Your receipt email works as a proof of purchase. If you need a formal invoice, message us with your order number." },
    ],
  },
  {
    id: "printing",
    group: "Printing",
    items: [
      { q: "The pages print too small or cut off.", a: "In your print settings choose “Actual size” or “100%”, not “Fit”. Use the A4 file on A4 paper and the US Letter file on Letter paper." },
      { q: "How can I reuse worksheets?", a: "Slip pages into a clear plastic sleeve or laminate them, and use a dry-erase marker. Or simply print another copy: you can print as many as you need for your family or class." },
      { q: "Can I use the PDFs in my classroom?", a: "Yes, for your own single classroom. Please don't share the files online or resell them." },
    ],
  },
];

export default function SupportPage() {
  return (
    <>
      <section className="support-hero">
        <div className="container">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Support</span></div>
          <h1>How can we help?</h1>
          <p className="lead">Most answers are right here. If not, send us a message and a real person will reply, usually within two working days.</p>
          <div className="help-topics">
            {topics.map((t) => (
              <a key={t.title} className="help-topic" href={t.href}>
                <t.icon size={30} weight="duotone" aria-hidden="true" />
                <b>{t.title}</b>
                <span>{t.text}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container support-layout">
          <div className="support-faq">
            {faqs.map((g) => (
              <div key={g.id} id={g.id} className="faq-group">
                <h2>{g.group}</h2>
                <div className="faq">
                  {g.items.map((f) => (
                    <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="support-contact" id="contact">
            <div className="card">
              <div className="support-contact-head">
                <ChatCircleDots size={34} weight="duotone" aria-hidden="true" />
                <div>
                  <h2>Send us a message</h2>
                  <p>For order questions, include the email you used at checkout.</p>
                </div>
              </div>
              <SupportForm />
            </div>
            <div className="card support-email">
              <p>Prefer email?</p>
              <CopyEmail email={site.email} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
