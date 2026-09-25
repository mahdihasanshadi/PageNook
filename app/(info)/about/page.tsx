import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/catalog";

export const metadata: Metadata = { title: "About", description: "Who makes PageNook PDFs, and why they cost from just $0.99." };

export default function AboutPage() {
  return (
    <div className="container">
      <div className="page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>About</span></div>
        <h1>About PageNook</h1>
        <p className="lead">A small shop with one rule: every PDF should be worth keeping.</p>
      </div>
      <div className="doc">
        <p>
          PageNook is run by {site.owner}, a computer science student and builder. It started with a simple frustration:
          the internet is full of PDFs that are long, padded, and forgotten the day you download them.
        </p>
        <p>
          So every PDF here is made to be <strong>used</strong>: clear structure, real examples, checklists you can act on,
          and a design that&apos;s pleasant on a screen and on paper. The shop covers many shelves (parenting, kids&apos;
          learning, study, tech, careers, home life and planners) and each shelf is stocked slowly, one good PDF at a time.
        </p>
        <h2>Why so cheap?</h2>
        <p>Because a good guide shouldn&apos;t be a big decision. Short PDFs cost $0.99 and our longest guides $1.49, so you can try one without a second thought.</p>
        <h2>How the PDFs are made</h2>
        <p>
          PDFs are written, designed and checked by hand, with the help of modern tools including AI assistants.
          Anything technical is tested for real before it goes in a guide.
        </p>
        <p>Questions or ideas for a PDF you&apos;d like to see? <Link href="/support">Get in touch</Link>.</p>
      </div>
    </div>
  );
}
