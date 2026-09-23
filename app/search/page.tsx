import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/cards";
import { SearchIcon } from "@/components/icons";
import { searchProducts } from "@/lib/catalog";

export const metadata: Metadata = { title: "Search", robots: { index: false } };

export default async function SearchPage(props: PageProps<"/search">) {
  const sp = await props.searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q ?? "").trim().slice(0, 100);
  const results = q ? searchProducts(q) : [];

  return (
    <>
      <div className="container page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Search</span></div>
        <h1>{q ? <>Results for &ldquo;{q}&rdquo;</> : "Search the nook"}</h1>
        <form className="search" action="/search" role="search">
          <label htmlFor="search-q" className="sr-only">Search PDFs</label>
          <input id="search-q" name="q" type="search" defaultValue={q} placeholder="Try: kids, thesis, coding…" />
          <button className="btn btn-sun" type="submit"><SearchIcon /> Search</button>
        </form>
      </div>
      <section className="section">
        <div className="container">
          {q && results.length === 0 && (
            <div className="empty">
              <h3>Nothing on the shelves for that yet</h3>
              <p>Try a broader word, or browse the shelves. New PDFs arrive regularly.</p>
              <Link className="btn btn-primary" href="/shelves">Browse all shelves</Link>
            </div>
          )}
          {results.length > 0 && (
            <>
              <p style={{ color: "var(--muted)", marginBottom: 18, fontWeight: 600 }}>
                {results.length} PDF{results.length > 1 ? "s" : ""} found
              </p>
              <div className="products">{results.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
