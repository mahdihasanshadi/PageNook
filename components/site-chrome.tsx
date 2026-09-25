import Link from "next/link";
import { Gift } from "@phosphor-icons/react/ssr";
import { categories, site } from "@/lib/catalog";
import { LogoMark, SearchIcon } from "./icons";

export function Header() {
  return (
    <header className="topbar">
      <div className="container">
        <Link className="brand" href="/" aria-label="PageNook home">
          <LogoMark />
          <span>
            Page<b>Nook</b>
          </span>
        </Link>
        <nav className="nav" aria-label="Main">
          <Link href="/shelves">Shelves</Link>
          <Link href="/#new">New</Link>
          <Link href="/free">Free samples</Link>
          <Link href="/about">About</Link>
        </nav>
        <form className="header-search" action="/shelves" role="search">
          <label htmlFor="header-q" className="sr-only">Search PDFs</label>
          <input id="header-q" name="q" type="search" placeholder="Search PDFs…" />
          <button type="submit" aria-label="Search"><SearchIcon /></button>
        </form>
        <Link className="btn btn-primary btn-deals" href="/shelves?type=bundle#browse">
          <Gift size={18} weight="duotone" aria-hidden="true" /> Bundles &amp; deals
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div>
          <Link className="brand" href="/" aria-label="PageNook home">
            <LogoMark />
            <span>
              Page<b>Nook</b>
            </span>
          </Link>
          <p style={{ marginTop: 12, maxWidth: "30em" }}>
            {site.tagline} Carefully made PDFs for parents, kids, students, builders and everyday life. From $0.99.
          </p>
        </div>
        <div>
          <h4>Shelves</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.slug}><Link href={`/shelves/${c.slug}`}>{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><Link href="/support">Support &amp; contact</Link></li>
            <li><Link href="/support#downloads">Download help</Link></li>
            <li><Link href="/free">Free samples</Link></li>
            <li><Link href="/refunds">Refund policy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <p className="legal">
          © {new Date().getFullYear()} PageNook · Made by {site.owner}. Payments are processed securely by our payment partner.
          Shelf photos from Unsplash.
        </p>
      </div>
    </footer>
  );
}
