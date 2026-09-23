import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuyButton } from "@/components/buy-button";
import { ProductCard } from "@/components/cards";
import { formatPrice, getCategory, getProduct, products, site } from "@/lib/catalog";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/pdf/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: `${p.summary} ${formatPrice(p.price)} PDF, instant download.`,
    openGraph: { title: p.title, description: p.summary, images: p.cover ? [p.cover] : undefined },
  };
}

const faqs = [
  { q: "How do I get my PDF?", a: "Right after payment, the download link appears on screen and is emailed to you. You can download it again from that email at any time." },
  { q: "Can I print it?", a: "Yes. Every PDF is made to look good on screen and on paper, for personal use." },
  { q: "What if something is wrong with my file?", a: "Email us within 14 days and we'll fix it or refund you. See the refund policy for details." },
  { q: "Which payment methods can I use?", a: "Cards and PayPal, handled by our payment partner, which also takes care of any sales tax. We never see your card details." },
];

export default async function ProductPage(props: PageProps<"/pdf/[slug]">) {
  const { slug } = await props.params;
  const p = getProduct(slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const ready = p.status === "available";
  const related = products.filter((x) => x.slug !== p.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.title,
    description: p.summary,
    image: p.cover ? `${site.url}${p.cover}` : undefined,
    brand: { "@type": "Brand", name: "PageNook" },
    offers: {
      "@type": "Offer",
      price: p.price.toFixed(2),
      priceCurrency: "USD",
      availability: ready ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      url: `${site.url}/pdf/${p.slug}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="container" style={{ paddingTop: 28 }}>
        <div className="crumbs">
          <Link href="/">Home</Link><span>/</span><Link href={`/shelves/${cat.slug}`}>{cat.name}</Link><span>/</span><span>{p.title}</span>
        </div>
        <div className="pdp">
          <div className="pdp-cover">
            <div className="frame">
              {p.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.cover} alt={`Cover of ${p.title}`} />
              ) : (
                <div className="drawn" style={{ background: `linear-gradient(135deg, ${p.coverGradient[0]}, ${p.coverGradient[1]})` }}>
                  <span style={{ fontWeight: 700, fontSize: ".85rem" }}>{cat.name}</span>
                  <div>
                    <h2>{p.title}</h2>
                    <p style={{ marginTop: 8, opacity: 0.9 }}>{p.subtitle}</p>
                  </div>
                </div>
              )}
            </div>
            {p.freeSample && <a className="sample-link" href={p.freeSample} download>Download a free sample (PDF) →</a>}
          </div>

          <div className="pdp-info">
            <span className="kicker">{cat.name}</span>
            <h1>{p.title}</h1>
            <p className="sub">{p.subtitle}</p>

            <div className="buy-box">
              <div className="buy-row">
                <span className="price">{formatPrice(p.price)}</span>
                <span className={`badge ${ready ? "badge-ready" : "badge-soon"}`}>{ready ? "Instant download" : "Coming soon"}</span>
              </div>
              <div className="buy-row"><BuyButton product={p} /></div>
              <div className="facts">
                {p.pages && <span>{p.pages} pages</span>}
                <span>{p.format}</span>
                <span>By {p.author}</span>
              </div>
              <p className="buy-note">One-time payment. Yours to keep, including future fixes to this edition.</p>
            </div>

            <div className="prose">
              {p.description.map((d) => <p key={d.slice(0, 24)}>{d}</p>)}
              <h2>What&apos;s inside</h2>
              <ul className="ticks">{p.inside.map((i) => <li key={i}>{i}</li>)}</ul>
              <h2>Who it&apos;s for</h2>
              <ul className="ticks">{p.forWho.map((i) => <li key={i}>{i}</li>)}</ul>
            </div>
          </div>
        </div>
      </div>

      {p.previews && (
        <section className="section">
          <div className="container">
            <div className="section-head"><h2>Look inside</h2><p>Real pages from the PDF.</p></div>
            <div className="previews">
              {p.previews.map((pv) => (
                <figure key={pv.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pv.src} alt={pv.alt} loading="lazy" />
                  <figcaption>{pv.alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>Questions</h2></div>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><h2>More from the nook</h2><Link href="/shelves">All shelves →</Link></div>
          <div className="products">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
        </div>
      </section>
    </>
  );
}
