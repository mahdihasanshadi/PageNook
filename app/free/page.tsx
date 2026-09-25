import type { Metadata } from "next";
import Link from "next/link";
import { DownloadSimple, EnvelopeSimple, ShieldCheck } from "@phosphor-icons/react/ssr";
import { SignupForm } from "@/components/signup-form";
import { pagePhotos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Free PDFs",
  description: "Two free PageNook PDFs: a Big Feelings starter pack for parents and a Claude Code sample for builders. Download instantly.",
};

const samples = [
  {
    tag: "For parents",
    title: "Big Feelings starter pack",
    pages: "5 pages",
    cover: "/covers/big-feelings-toolkit.jpg",
    from: "/pdf/big-feelings-toolkit",
    fromTitle: "The Big Feelings Toolkit",
    points: ["A grown-ups guide to emotion coaching", "A 16-face feelings chart", "The “How big is my feeling?” thermometer", "6 calm-down cards to cut out"],
    color: "#B8456F",
  },
  {
    tag: "For builders",
    title: "Ship It with Claude Code sample",
    pages: "8 pages",
    cover: "/covers/ship-it-with-claude-code.jpg",
    from: "/pdf/ship-it-with-claude-code",
    fromTitle: "Ship It with Claude Code",
    points: ["How Claude Code actually works", "Ten prompt patterns that get better results", "The one-page cheat sheet", "The full table of contents"],
    color: "#2C68CF",
  },
];

export default function FreePage() {
  return (
    <>
      <section className="free-hero">
        <div className="container free-hero-inner">
          <div>
            <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Free PDFs</span></div>
            <span className="kicker">Free, no card needed</span>
            <h1>Two free PDFs, <em>yours in seconds</em></h1>
            <p className="lead">
              Try PageNook before you buy. Leave your email and download either sample straight away, or both. They&apos;re
              real pages from our PDFs, not a teaser.
            </p>
            <ul className="free-perks">
              <li><DownloadSimple size={22} weight="duotone" aria-hidden="true" /> Instant download, no waiting for an email</li>
              <li><ShieldCheck size={22} weight="duotone" aria-hidden="true" /> No spam. One short note when a new PDF lands</li>
              <li><EnvelopeSimple size={22} weight="duotone" aria-hidden="true" /> Unsubscribe any time with one email</li>
            </ul>
          </div>
          <div className="free-collage" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="c1" src={pagePhotos.freeParents.src} alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="c2" src={pagePhotos.freeKids.src} alt="" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="c3" src="/covers/big-feelings-toolkit.jpg" alt="" />
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 24 }}>
        <div className="container free-layout">
          <div className="free-samples">
            {samples.map((s) => (
              <article key={s.title} className="sample-card" style={{ ["--accent" as string]: s.color }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.cover} alt={`Cover of ${s.fromTitle}`} loading="lazy" />
                <div>
                  <span className="sample-tag">{s.tag} · {s.pages}</span>
                  <h2>{s.title}</h2>
                  <ul className="ticks">{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                  <Link className="sample-from" href={s.from}>From: {s.fromTitle} →</Link>
                </div>
              </article>
            ))}
          </div>

          <aside className="free-form card" id="get">
            <h2>Get your free PDFs</h2>
            <p>Enter your email, then pick which sample to download.</p>
            <SignupForm id="free" source="free-page" light />
            <p className="free-small">
              We use your email only to send new-PDF news. See our <Link href="/privacy">privacy policy</Link>.
            </p>
          </aside>
        </div>
      </section>

      <p className="container photo-credits">
        Photos: <a href={pagePhotos.freeParents.link} target="_blank" rel="noreferrer">{pagePhotos.freeParents.credit}</a> and{" "}
        <a href={pagePhotos.freeKids.link} target="_blank" rel="noreferrer">{pagePhotos.freeKids.credit}</a> on Unsplash
      </p>
    </>
  );
}
