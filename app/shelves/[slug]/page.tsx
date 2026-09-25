import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryCard, ProductCard } from "@/components/cards";
import { CategoryGlyph } from "@/components/icons";
import { categories, getCategory, productsIn } from "@/lib/catalog";
import { shelfPhotos } from "@/lib/photos";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: PageProps<"/shelves/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = getCategory(slug);
  return cat
    ? { title: cat.name, description: `${cat.blurb} PDFs from $0.99 on PageNook.`, openGraph: { images: [shelfPhotos[cat.slug].src] } }
    : {};
}

export default async function ShelfPage(props: PageProps<"/shelves/[slug]">) {
  const { slug } = await props.params;
  const cat = getCategory(slug);
  if (!cat) notFound();
  const photo = shelfPhotos[cat.slug];
  const items = productsIn(cat.slug).filter((p) => p.status === "available");
  const soon = productsIn(cat.slug).filter((p) => p.status !== "available");
  const bundles = items.filter((p) => p.bundle);
  const singles = items.filter((p) => !p.bundle);
  const others = categories.filter((c) => c.slug !== cat.slug).slice(0, 3);

  return (
    <>
      <section className="shelf-hero" style={{ ["--shelf" as string]: cat.color }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="shelf-hero-img" src={photo.src} alt={photo.alt} />
        <div className="shelf-hero-shade" />
        <div className="container shelf-hero-inner">
          <div className="crumbs light">
            <Link href="/">Home</Link><span>/</span><Link href="/shelves">Shelves</Link><span>/</span><span>{cat.name}</span>
          </div>
          <span className="shelf-hero-icon" style={{ background: cat.tint }}><CategoryGlyph category={cat} size={34} /></span>
          <h1>{cat.name}</h1>
          <p>{cat.blurb}</p>
          <div className="shelf-hero-meta">
            <span>{singles.length} PDF{singles.length === 1 ? "" : "s"}</span>
            {bundles.length > 0 && <span>{bundles.length} bundle{bundles.length === 1 ? "" : "s"}</span>}
            <Link href={`/shelves?shelf=${cat.slug}#browse`}>Search this shelf →</Link>
          </div>
        </div>
        <a className="photo-credit" href={photo.link} target="_blank" rel="noreferrer">Photo: {photo.credit} / Unsplash</a>
      </section>

      {bundles.length > 0 && (
        <section className="section" style={{ paddingBottom: 0 }}>
          <div className="container">
            <div className="section-head"><h2>Save with a bundle</h2><p>Several PDFs together, for less.</p></div>
            <div className="products">{bundles.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          {singles.length > 0 && (
            <div className="section-head"><h2>Every {cat.name.toLowerCase()} PDF</h2><p>Instant download, print at home.</p></div>
          )}
          {singles.length + soon.length > 0 ? (
            <div className="products">{[...singles, ...soon].map((p) => <ProductCard key={p.slug} product={p} />)}</div>
          ) : (
            <div className="empty">
              <h3>This shelf is being stocked</h3>
              <p>The first {cat.name.toLowerCase()} PDFs are on their way. Join the list and we&apos;ll tell you when they land.</p>
              <Link className="btn btn-primary" href="/free">Tell me when it&apos;s ready</Link>
            </div>
          )}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head"><h2>Other shelves</h2><Link href="/shelves">All shelves →</Link></div>
          <div className="shelf-grid three">{others.map((c) => <CategoryCard key={c.slug} category={c} />)}</div>
        </div>
      </section>
    </>
  );
}
