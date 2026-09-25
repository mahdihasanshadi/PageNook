import type { Metadata } from "next";
import Link from "next/link";
import { BundlePromoCard, CategoryCard } from "@/components/cards";
import { ShelfExplorer } from "@/components/shelf-explorer";
import { categories, formatPrice, MIN_PRICE, products, type CategorySlug } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All shelves",
  description: "Search and browse every PageNook PDF: parenting guides, kids' worksheets, study planners, coding guides, family organizers and money-saving bundles.",
};

export default async function ShelvesPage(props: PageProps<"/shelves">) {
  const sp = await props.searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const shelf = one(sp.shelf);
  const type = one(sp.type);
  const forSale = products.filter((p) => p.status === "available");

  return (
    <>
      <section className="shelves-hero">
        <div className="container">
          <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Shelves</span></div>
          <h1>Find the PDF your day needs</h1>
          <p className="lead">
            {forSale.length} printable guides, workbooks and planners across {categories.length} shelves. Every one from{" "}
            {formatPrice(MIN_PRICE)}, ready to download the moment you buy.
          </p>
          <ul className="hero-stats" aria-label="At a glance">
            <li><b>{forSale.filter((p) => !p.bundle).length}</b> PDFs</li>
            <li><b>{forSale.filter((p) => p.bundle).length}</b> money-saving bundles</li>
            <li><b>A4 + US Letter</b> for printables</li>
          </ul>
        </div>
      </section>

      <section className="section" id="browse" style={{ paddingTop: 28 }}>
        <div className="container">
          <ShelfExplorer
            initialQuery={one(sp.q)}
            initialShelf={categories.some((c) => c.slug === shelf) ? (shelf as CategorySlug) : "all"}
            initialKind={type === "bundle" || type === "pdf" ? type : "all"}
          />
        </div>
      </section>

      <section className="section" id="shelves" style={{ paddingTop: 12 }}>
        <div className="container">
          <div className="section-head"><h2>Walk the shelves</h2><p>Each shelf has its own page, with everything in one place.</p></div>
          <div className="shelf-grid">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
            <BundlePromoCard />
          </div>
        </div>
      </section>
    </>
  );
}
