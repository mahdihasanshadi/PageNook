import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/cards";
import { CategoryIcon } from "@/components/icons";
import { categories, getCategory, productsIn } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/shelves/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = getCategory(slug);
  return cat ? { title: cat.name, description: `${cat.blurb} Every PDF $0.99 on PageNook.` } : {};
}

export default async function ShelfPage(props: PageProps<"/shelves/[slug]">) {
  const { slug } = await props.params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const items = productsIn(cat.slug);

  return (
    <>
      <div className="container page-head">
        <div className="crumbs">
          <Link href="/">Home</Link><span>/</span><Link href="/shelves">Shelves</Link><span>/</span><span>{cat.name}</span>
        </div>
        <div className="shelf-title">
          <CategoryIcon category={cat} />
          <h1>{cat.name}</h1>
        </div>
        <p className="lead">{cat.blurb}</p>
      </div>
      <section className="section">
        <div className="container">
          {items.length > 0 ? (
            <div className="products">
              {items.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          ) : (
            <div className="empty">
              <h3>This shelf is being stocked</h3>
              <p>The first {cat.name.toLowerCase()} PDFs are on their way. Join the list and we&apos;ll tell you when they land.</p>
              <Link className="btn btn-primary" href="/free">Tell me when it&apos;s ready</Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
