import type { Metadata } from "next";
import Link from "next/link";
import { SignupForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Free sample",
  description: "Get a free PageNook PDF: a Big Feelings starter pack for parents or a Claude Code sample for builders.",
};

export default function FreePage() {
  return (
    <>
      <div className="container page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Free sample</span></div>
        <h1>A free PDF from the nook</h1>
        <p className="lead">
          Leave your email and pick a free PDF to download right away: a 5-page <em>Big Feelings</em> starter pack
          for parents (feelings chart, feelings thermometer and calm-down cards), or an 8-page sample of{" "}
          <em>Ship It with Claude Code</em>.
        </p>
      </div>
      <section className="section">
        <div className="container">
          <div className="card" style={{ maxWidth: 640 }}>
            <SignupForm id="free" source="free-page" light />
          </div>
          <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: 640 }}>
            You&apos;ll also get one short email when a new PDF lands. That&apos;s it. Read how we handle your email in our{" "}
            <Link href="/privacy">privacy policy</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
