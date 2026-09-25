import Link from "next/link";
import {
  bundleItems,
  bundleValue,
  FEATURED_CATEGORY,
  formatPrice,
  getCategory,
  products,
  productsIn,
  type Category,
  type Product,
} from "@/lib/catalog";
import { shelfPhotos } from "@/lib/photos";
import { Gift } from "@phosphor-icons/react/ssr";
import { CategoryGlyph } from "./icons";

function shelfCount(category: Category) {
  const items = productsIn(category.slug).filter((p) => p.status === "available");
  const bundles = items.filter((p) => p.bundle).length;
  const pdfs = items.length - bundles;
  if (items.length === 0) return "Coming soon";
  return [pdfs ? `${pdfs} PDF${pdfs > 1 ? "s" : ""}` : "", bundles ? `${bundles} bundle${bundles > 1 ? "s" : ""}` : ""].filter(Boolean).join(" · ");
}

/** Photo card for a shelf. The featured shelf spans two columns. */
export function CategoryCard({ category }: { category: Category }) {
  const photo = shelfPhotos[category.slug];
  const featured = category.slug === FEATURED_CATEGORY;
  return (
    <Link className={`shelf-card${featured ? " featured" : ""}`} href={`/shelves/${category.slug}`} style={{ ["--shelf" as string]: category.color }}>
      <div className="shelf-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.src} alt={photo.alt} loading="lazy" />
        {featured && <span className="shelf-flag">Featured shelf</span>}
      </div>
      <div className="shelf-body">
        <span className="shelf-icon" style={{ background: category.tint }}>
          <CategoryGlyph category={category} size={featured ? 30 : 26} />
        </span>
        <div>
          <h3>{category.name}</h3>
          <p>{category.blurb}</p>
          <span className="shelf-count">{shelfCount(category)} <span aria-hidden="true">→</span></span>
        </div>
      </div>
    </Link>
  );
}

/** Fills the last slot of the shelf grid with a pointer to the bundles. */
export function BundlePromoCard() {
  const bundles = products.filter((p) => p.bundle && p.status === "available");
  if (bundles.length === 0) return null;
  const cheapest = Math.min(...bundles.map((b) => b.price));
  const best = Math.max(...bundles.map((b) => bundleValue(b) - b.price));
  return (
    <Link className="promo-card" href="/shelves?type=bundle#browse">
      <span className="promo-icon"><Gift size={30} weight="duotone" aria-hidden="true" /></span>
      <span className="promo-kicker">Bundles &amp; deals</span>
      <h3>{bundles.length} money-saving bundles</h3>
      <p>Several PDFs in one download, from {formatPrice(cheapest)}. Save up to {formatPrice(best)} compared with buying one by one.</p>
      <div className="promo-covers" aria-hidden="true">
        {bundles.slice(0, 3).map((b) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={b.slug} src={b.cover} alt="" />
        ))}
      </div>
      <span className="promo-cta">See all bundles <span aria-hidden="true">→</span></span>
    </Link>
  );
}

export function Cover({ product }: { product: Product }) {
  const cat = getCategory(product.category);
  if (product.cover) {
    return (
      <div className="cover has-image">
        <span className="tag">{cat?.name}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.cover} alt={`Cover of ${product.title}`} loading="lazy" />
      </div>
    );
  }
  const [a, b] = product.coverGradient;
  return (
    <div className="cover" style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}>
      <span className="tag">{cat?.name}</span>
      <div>
        <h3>{product.title}</h3>
        <small>{product.subtitle}</small>
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const ready = product.status === "available";
  return (
    <Link className="product" href={`/pdf/${product.slug}`}>
      <Cover product={product} />
      <div className="body">
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        <div className="foot">
          <span className="price">
            {formatPrice(product.price)}
            {product.bundle && <s className="was">{formatPrice(bundleValue(product))}</s>}
          </span>
          {product.bundle ? (
            <span className="badge badge-bundle">Bundle · {bundleItems(product).length} PDFs</span>
          ) : (
            <span className={`badge ${ready ? "badge-ready" : "badge-soon"}`}>{ready ? "Instant download" : "Coming soon"}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
