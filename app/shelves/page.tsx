import type { Metadata } from "next";
import Link from "next/link";
import { CategoryCard, ProductCard } from "@/components/cards";
import { categories, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "All shelves",
  description: "Browse every PageNook shelf: kids' learning, study and exams, tech and coding, careers, home life and planners.",
};

export default function ShelvesPage() {
  return (
    <>
      <div className="container page-head">
        <div className="crumbs"><Link href="/">Home</Link><span>/</span><span>Shelves</span></div>
        <h1>All shelves</h1>
        <p className="lead">Seven corners of the nook. PDFs from $0.99.</p>
      </div>
      <section className="section">
        <div className="container">
          <div className="cats">
            {categories.map((c) => <CategoryCard key={c.slug} category={c} />)}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><h2>Every PDF</h2><p>{products.length} titles and counting</p></div>
          <div className="products">
            {products.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}
